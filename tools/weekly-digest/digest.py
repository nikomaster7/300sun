#!/usr/bin/env python3
"""Valencia this week: the weekly digest for cruise passengers and visitors.

Every Monday (GitHub Actions, .github/workflows/weekly-digest.yml):
  1. Weather for the next 7 days from Open-Meteo (free, no key).
  2. Claude researches the week with web search: ships in port, events,
     news that matters to a visitor (strikes, closures, holidays).
  3. Claude turns the notes into structured data; this script scores every
     item with the Port Day Score and keeps the top 10.
  4. Writes site/valencia-this-week/index.html and an archive JSON.
  5. Posts the summary to the Telegram channel (if the secrets are set).

Usage:
  python3 tools/weekly-digest/digest.py              # full run
  python3 tools/weekly-digest/digest.py --no-post    # don't post to Telegram
  python3 tools/weekly-digest/digest.py --from-json tools/weekly-digest/archive/2026-11-23.json
                                                     # re-render a saved week, no API calls
  python3 tools/weekly-digest/digest.py --placeholder  # the page before the first issue

Secrets (GitHub repository secrets, or env vars locally):
  ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (e.g. @valenciathisweek)
Optional: TELEGRAM_CHANNEL_URL (e.g. https://t.me/valenciathisweek) shows a "Get it on Telegram" link.
"""

import argparse
import datetime as dt
import html
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
PAGE = ROOT / "site" / "valencia-this-week" / "index.html"
TEMPLATE = HERE / "template.html"
ARCHIVE = HERE / "archive"
TZ = ZoneInfo("Europe/Madrid")
MODEL = "claude-opus-5-5"
SITE = "https://300sun.com"

# Where Claude may search. Agenda, press, the port, venues and cruise schedules.
SOURCES = [
    "visitvalencia.com", "valencia.es", "valenciasecreta.com", "au-agenda.com",
    "lasprovincias.es", "levante-emv.com", "elperiodic.com", "valenciaplaza.com",
    "valenciaport.com", "cac.es", "lesarts.com", "palauvalencia.com",
    "valenciacf.com", "levanteud.com", "metrovalencia.es", "emtvalencia.es",
    "cruisemapper.com", "cruisetimetables.com", "crew-center.com",
]

# ---------------------------------------------------------------- scoring
# Port Day Score, 0-100. Our version of Hacker News "points".
WEIGHTS = {"coverage": 30, "port_day": 25, "nearby": 20, "cost": 15, "interest": 10}
COST_POINTS = {"free": 1.0, "cheap": 0.6, "paid": 0.2}


def port_day_score(item):
    coverage = min(max(int(item.get("sources_count", 1)), 1), 4)  # 1 source = 0, 4+ = full
    s = WEIGHTS["coverage"] * (coverage - 1) / 3
    s += WEIGHTS["port_day"] * (1.0 if item.get("on_ship_day") else 0.0)
    s += WEIGHTS["nearby"] * (1.0 if item.get("near_old_town") else 0.3)
    s += WEIGHTS["cost"] * COST_POINTS.get(item.get("cost"), 0.2)
    s += WEIGHTS["interest"] * min(max(int(item.get("search_interest", 0)), 0), 3) / 3
    if item.get("category") == "heads-up":  # strikes, closures: useful whatever the score
        s = max(s, 60)
    return round(s)


# ---------------------------------------------------------------- weather
WMO = {0: "Sunny", 1: "Mostly sunny", 2: "Partly cloudy", 3: "Cloudy", 45: "Fog", 48: "Fog",
       51: "Drizzle", 53: "Drizzle", 55: "Drizzle", 61: "Rain", 63: "Rain", 65: "Heavy rain",
       80: "Showers", 81: "Showers", 82: "Heavy showers", 95: "Storms", 96: "Storms", 99: "Storms"}


def weather(start, days=7):
    end = start + dt.timedelta(days=days - 1)
    url = ("https://api.open-meteo.com/v1/forecast?latitude=39.47&longitude=-0.376"
           "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
           f"&timezone=Europe%2FMadrid&start_date={start}&end_date={end}")
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            d = json.load(r)["daily"]
    except Exception as e:  # weather is nice to have, never block the digest
        print(f"weather: skipped ({e})", file=sys.stderr)
        return {}
    out = {}
    for i, day in enumerate(d["time"]):
        out[day] = {
            "sky": WMO.get(d["weather_code"][i], "Mixed"),
            "max": round(d["temperature_2m_max"][i]),
            "min": round(d["temperature_2m_min"][i]),
            "rain": d["precipitation_probability_max"][i],
        }
    return out


# ---------------------------------------------------------------- Claude
RESEARCH_PROMPT = """You research the week ahead in Valencia, Spain, for cruise passengers and short-stay visitors.
Week: Monday {start} to Sunday {end}. Today is {today}.

Find, using web search (and web fetch to read the pages you find):
1. SHIPS IN PORT: every cruise ship calling at the Port of Valencia each day of this week,
   with cruise line and arrival/departure times. Use cruise schedule sites and Valenciaport.
2. EVENTS: what's on this week and this month in the city: festivals, concerts, exhibitions,
   markets, sport (Valencia CF, Levante UD), food events, free museum days, holidays.
   Prefer things in or near the old town (Ciutat Vella), Ruzafa, the Turia gardens,
   the City of Arts and Sciences and the beach.
3. HEADS-UP: anything that changes a visitor's day: metro, taxi or transport strikes,
   closures, works, street cuts, public holidays, demonstrations, weather warnings.

For every item, note EVERY source that mentions it (site name and URL). Several sources
covering the same thing means it matters: keep them together under one item.
Only report what you found on a page this week. Never invent dates, times, prices or ships.
If something is unclear (no time given), say so. Write plain notes, in English."""

SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["intro", "ships", "items", "tips"],
    "properties": {
        "intro": {"type": "string", "description": "Two short sentences on the week, friendly, in English."},
        "ships": {"type": "array", "items": {
            "type": "object", "additionalProperties": False,
            "required": ["date", "ship", "line", "arrive", "depart", "source_url"],
            "properties": {
                "date": {"type": "string", "description": "YYYY-MM-DD"},
                "ship": {"type": "string"}, "line": {"type": "string"},
                "arrive": {"type": "string", "description": "HH:MM or empty if unknown"},
                "depart": {"type": "string", "description": "HH:MM or empty if unknown"},
                "source_url": {"type": "string"}}}},
        "items": {"type": "array", "items": {
            "type": "object", "additionalProperties": False,
            "required": ["title", "when", "where", "summary", "port_day_note", "category", "cost",
                         "on_ship_day", "near_old_town", "search_interest", "sources_count", "sources"],
            "properties": {
                "title": {"type": "string", "description": "Short headline in English"},
                "when": {"type": "string", "description": "e.g. 'Sat 28 Nov, 10:00-14:00' or 'All week'"},
                "where": {"type": "string"},
                "summary": {"type": "string", "description": "One or two short sentences, in your own words"},
                "port_day_note": {"type": "string", "description": "One line for a cruise passenger: does it fit a port day, how long, what to watch. Use cruise words (port day, all aboard, DIY port day) where natural."},
                "category": {"type": "string", "enum": ["event", "food", "culture", "sport", "market", "heads-up"]},
                "cost": {"type": "string", "enum": ["free", "cheap", "paid"]},
                "on_ship_day": {"type": "boolean", "description": "True if it happens on a day a cruise ship is in port"},
                "near_old_town": {"type": "boolean", "description": "Old town, Ruzafa, Turia, City of Arts and Sciences, beach"},
                "search_interest": {"type": "integer", "description": "0-3: how much people are talking or searching about it"},
                "sources_count": {"type": "integer", "description": "How many different sites mention it"},
                "sources": {"type": "array", "items": {
                    "type": "object", "additionalProperties": False, "required": ["name", "url"],
                    "properties": {"name": {"type": "string"}, "url": {"type": "string"}}}}}}},
        "tips": {"type": "array", "items": {"type": "string"},
                 "description": "3-4 short port day tips for THIS week, in English, using cruise words where natural"},
    },
}

WRITE_PROMPT = """Turn these research notes into the week's digest data for "Valencia this week".
Readers: cruise passengers (mostly American) with one port day, and short-stay visitors.
Tone: a friendly local, short lines, plain English. No hype, no emojis.
Never say "guided tour" or "tour guide": say "walk" or "private walk with a local".
Keep only items with at least one source URL from the notes. Include up to 15 items,
and every heads-up. Do not add anything that is not in the notes.

Weather this week (Open-Meteo): {weather}

Research notes:
{notes}"""


def claude_digest(start, end):
    import anthropic  # only needed for a live run

    client = anthropic.Anthropic()
    tools = [
        {"type": "web_search_20260209", "name": "web_search", "max_uses": 25, "allowed_domains": SOURCES},
        {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": 20},
    ]
    today = dt.datetime.now(TZ).date()
    messages = [{"role": "user", "content": RESEARCH_PROMPT.format(start=start, end=end, today=today)}]

    # 1. Research with web search. Server tools may pause a long turn: send it back to continue.
    for _ in range(6):
        with client.beta.messages.stream(
            model=MODEL, max_tokens=64000, tools=tools, messages=messages,
            output_config={"effort": "high"},
            betas=["server-side-fallback-2026-07-01"], fallbacks="default",
        ) as stream:
            response = stream.get_final_message()
        messages.append({"role": "assistant", "content": response.content})
        if response.stop_reason != "pause_turn":
            break
    if response.stop_reason == "refusal":
        sys.exit("research: the model declined the request")
    notes = "\n".join(b.text for m in messages if m["role"] == "assistant"
                      for b in m["content"] if getattr(b, "type", "") == "text")
    if not notes.strip():
        sys.exit("research: no notes came back")
    return notes


def claude_structure(notes, wx):
    import anthropic

    client = anthropic.Anthropic()
    with client.beta.messages.stream(
        model=MODEL, max_tokens=32000,
        messages=[{"role": "user", "content": WRITE_PROMPT.format(weather=json.dumps(wx), notes=notes)}],
        output_config={"effort": "medium", "format": {"type": "json_schema", "schema": SCHEMA}},
        betas=["server-side-fallback-2026-07-01"], fallbacks="default",
    ) as stream:
        response = stream.get_final_message()
    if response.stop_reason == "refusal":
        sys.exit("structure: the model declined the request")
    if response.stop_reason == "max_tokens":
        sys.exit("structure: output was cut off (max_tokens)")
    text = "".join(b.text for b in response.content if b.type == "text")
    return json.loads(text)


# ---------------------------------------------------------------- rendering
def e(s):
    return html.escape(str(s or ""), quote=True)


def safe_url(u):
    u = str(u or "").strip()
    return u if u.startswith(("https://", "http://")) else ""


def day_label(iso):
    d = dt.date.fromisoformat(iso)
    return d.strftime("%a %-d %b")


def pick_top(items, n=10):
    keep = [i for i in items if any(safe_url(s.get("url")) for s in i.get("sources", []))]
    for i in keep:
        i["score"] = port_day_score(i)
    keep.sort(key=lambda i: i["score"], reverse=True)
    return keep[:n]


def render_ships(ships, wx):
    if not ships:
        return '<p class="fine">No cruise calls found for this week.</p>'
    rows = []
    for s in sorted(ships, key=lambda s: (s["date"], s.get("arrive", ""))):
        w = wx.get(s["date"])
        sky = f'{e(w["sky"])}, {w["max"]}°C' + (f' · rain {w["rain"]}%' if w["rain"] >= 30 else "") if w else ""
        times = " – ".join(t for t in (s.get("arrive"), s.get("depart")) if t) or "times tbc"
        rows.append(f'<tr><td>{e(day_label(s["date"]))}</td><td><b>{e(s["ship"])}</b>'
                    f'<span class="sub">{e(s["line"])}</span></td><td>{e(times)}</td><td>{sky}</td></tr>')
    return ('<div class="table-scroll"><table class="ships"><thead><tr><th>Day</th><th>Ship</th>'
            '<th>In port</th><th>Weather</th></tr></thead><tbody>' + "".join(rows) + "</tbody></table></div>")


def render_items(items):
    out = []
    for n, i in enumerate(items, 1):
        srcs = [s for s in i["sources"] if safe_url(s.get("url"))]
        link = safe_url(srcs[0]["url"])
        names = " · ".join(f'<a href="{e(safe_url(s["url"]))}" target="_blank" rel="noopener">{e(s["name"])}</a>' for s in srcs)
        out.append(
            f'<li><span class="score" title="Port Day Score">{i["score"]}</span><div>'
            f'<h3><a href="{e(link)}" target="_blank" rel="noopener">{e(i["title"])}</a></h3>'
            f'<p class="meta">{e(i["when"])} · {e(i["where"])}</p>'
            f'<p>{e(i["summary"])}</p>'
            f'<p class="note"><b>Port day:</b> {e(i["port_day_note"])}</p>'
            f'<p class="src">{names}</p></div></li>')
    return '<ol class="digest">' + "".join(out) + "</ol>"


def render_page(data, start, end, placeholder=False):
    tpl = TEMPLATE.read_text()
    tg = os.environ.get("TELEGRAM_CHANNEL_URL", "").strip()
    telegram = (f'<a class="btn" href="{e(tg)}" target="_blank" rel="noopener">Get it every Monday on Telegram</a>'
                if tg.startswith("https://t.me/") else "")
    rng = f'{start.strftime("%-d %b")} – {end.strftime("%-d %b %Y")}'
    if placeholder:
        weekly = ('<section class="block" id="top10"><div class="wrap"><div class="head">'
                  '<span class="label">Coming soon</span><h2>The first issue lands <span class="it">on Monday.</span></h2>'
                  '</div><div class="cols"><div class="c-8 rise" style="grid-column: 3 / span 8;">'
                  '<p class="lede">Every Monday we list the ships in port, the ten things worth your time '
                  'and anything that could change your plans, like a strike or a holiday.</p></div></div></div></section>')
        intro, label, facts = ("Ships in port, the best things on, and what could change your plans. "
                               "Every Monday, from Valencia.", "Every Monday", "")
    else:
        top = pick_top(data["items"])
        ships = data.get("ships", [])
        wx = data.get("weather", {})
        days = sorted({s["date"] for s in ships})
        temps = [w["max"] for w in wx.values()]
        facts = ('<ul class="facts rise" aria-label="This week at a glance">'
                 f'<li><b>{len(ships)}</b><span>cruise calls <br>this week</span></li>'
                 f'<li><b>{len(days)}</b><span>days with a ship <br>in port</span></li>'
                 + (f'<li><b>{min(temps)}–{max(temps)}°C</b><span>daytime highs <br>this week</span></li>' if temps else "")
                 + f'<li><b>{len(top)}</b><span>things worth <br>your time</span></li></ul>')
        tips = "".join(f"<li>{e(t)}</li>" for t in data.get("tips", []))
        weekly = (
            '<section class="block" id="ships"><div class="wrap"><div class="head"><span class="label">In port</span>'
            '<h2>Ships in Valencia <span class="it">this week.</span></h2></div><div class="cols">'
            f'<div class="c-10 rise" style="grid-column: 2 / span 10;">{render_ships(ships, wx)}'
            '<p class="fine" style="margin-top: 12px;">Times come from public cruise schedules and can change. '
            'Your all-aboard time, from your cruise line, is the one that counts.</p></div></div></div></section>'
            '<section class="block" id="top10"><div class="wrap"><div class="head"><span class="label">Top 10</span>'
            '<h2>Worth your time <span class="it">this week.</span></h2></div><div class="cols">'
            f'<div class="c-8 rise" style="grid-column: 3 / span 8;">{render_items(top)}</div></div></div></section>'
            + (('<section class="block" id="tips"><div class="wrap"><div class="head"><span class="label">Port day tips</span>'
                '<h2>Before you <span class="it">go ashore.</span></h2></div><div class="cols">'
                f'<div class="c-8 rise" style="grid-column: 3 / span 8;"><ol class="steps">{tips}</ol></div></div></div></section>')
               if tips else ""))
        intro, label = data.get("intro", ""), f"Valencia this week · {rng}"
    return (tpl.replace("{{LABEL}}", e(label)).replace("{{INTRO}}", e(intro))
               .replace("{{FACTS}}", facts).replace("{{WEEKLY}}", weekly)
               .replace("{{TELEGRAM}}", telegram).replace("{{RANGE}}", e(rng))
               .replace("{{UPDATED}}", e(dt.datetime.now(TZ).strftime("%-d %B %Y"))))


# ---------------------------------------------------------------- Telegram
def telegram_text(data, start, end):
    top = pick_top(data["items"])
    while True:
        text = _telegram_lines(data, top, start, end)
        if len(text) <= 4000 or not top:  # Telegram limit is 4096 characters
            return text
        top = top[:-1]


def _telegram_lines(data, top, start, end):
    lines = [f"<b>Valencia this week · {start.strftime('%-d %b')} – {end.strftime('%-d %b')}</b>",
             f"<i>{e(data.get('intro', ''))}</i>", ""]
    ships = sorted(data.get("ships", []), key=lambda s: (s["date"], s.get("arrive", "")))
    if ships:
        lines.append("<b>Ships in port</b>")
        for s in ships:
            times = "–".join(t for t in (s.get("arrive"), s.get("depart")) if t)
            lines.append(f"• {e(day_label(s['date']))}: {e(s['ship'])}" + (f" ({e(times)})" if times else ""))
        lines.append("")
    lines.append("<b>Worth your time</b>")
    for i in top:
        url = next(safe_url(s["url"]) for s in i["sources"] if safe_url(s.get("url")))
        lines.append(f'• <a href="{e(url)}">{e(i["title"])}</a> · {e(i["when"])} · {i["score"]} pts')
    lines += ["", f"Full week, with weather and port day tips: {SITE}/valencia-this-week/",
              "", "Port day in Valencia? A private walk with a local, planned backwards from all-aboard: "
                  f"{SITE}/cruise/?ref=telegram"]
    return "\n".join(lines)


def post_telegram(text):
    token, chat = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CHAT_ID")
    if not (token and chat):
        print("telegram: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set, not posting")
        return
    body = urllib.parse.urlencode({"chat_id": chat, "text": text, "parse_mode": "HTML",
                                   "disable_web_page_preview": "true"}).encode()
    with urllib.request.urlopen(f"https://api.telegram.org/bot{token}/sendMessage", body, timeout=30) as r:
        if not json.load(r).get("ok"):
            sys.exit("telegram: post failed")
    print("telegram: posted")


# ---------------------------------------------------------------- main
def week_of(today):
    start = today - dt.timedelta(days=today.weekday())  # Monday
    return start, start + dt.timedelta(days=6)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-post", action="store_true")
    ap.add_argument("--from-json")
    ap.add_argument("--placeholder", action="store_true")
    a = ap.parse_args()

    start, end = week_of(dt.datetime.now(TZ).date())
    if a.placeholder:
        PAGE.write_text(render_page(None, start, end, placeholder=True))
        print(f"wrote {PAGE.relative_to(ROOT)} (placeholder)")
        return
    if a.from_json:
        data = json.loads(Path(a.from_json).read_text())
        start, end = dt.date.fromisoformat(data["week_start"]), dt.date.fromisoformat(data["week_end"])
    else:
        wx = weather(start)
        notes = claude_digest(start, end)
        data = claude_structure(notes, wx)
        data.update(week_start=str(start), week_end=str(end), weather=wx, notes=notes)
        ARCHIVE.mkdir(exist_ok=True)
        (ARCHIVE / f"{start}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False))
    PAGE.write_text(render_page(data, start, end))
    print(f"wrote {PAGE.relative_to(ROOT)}: {len(pick_top(data['items']))} items, {len(data.get('ships', []))} ships")
    if not a.no_post and not a.from_json:
        post_telegram(telegram_text(data, start, end))


if __name__ == "__main__":
    main()
