#!/usr/bin/env python3
"""Write FAQ structured data (schema.org FAQPage) into pages, from their own FAQ.

Every page with the markers <!-- FAQ:BEGIN ... --> and <!-- FAQ:END --> in its <head> gets a
JSON-LD block built from the <details><summary>Question</summary><p>Answer</p></details>
items on that page. Google and AI search can then quote the answers directly.

    python3 tools/faq-schema.py        (run it after changing any FAQ)
"""
import html
import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent / "site"
ITEM = re.compile(r"<details><summary>(.*?)</summary><p>(.*?)</p></details>", re.S)
BLOCK = re.compile(r"(<!-- FAQ:BEGIN[^>]*-->)(.*?)(\s*<!-- FAQ:END -->)", re.S)


def text(fragment):
    return html.unescape(re.sub(r"<[^>]+>", "", fragment)).strip()


for page in sorted(SITE.rglob("*.html")):
    src = page.read_text(encoding="utf-8")
    if "<!-- FAQ:BEGIN" not in src:
        continue
    faqs = [{"@type": "Question", "name": text(q),
             "acceptedAnswer": {"@type": "Answer", "text": text(a)}} for q, a in ITEM.findall(src)]
    data = json.dumps({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs},
                      ensure_ascii=False, indent=2)
    block = '\n  <script type="application/ld+json">\n' + "\n".join("  " + l for l in data.splitlines()) + "\n  </script>"
    out = BLOCK.sub(lambda m: m.group(1) + block + m.group(3), src)
    page.write_text(out, encoding="utf-8")
    print(f"{page.relative_to(SITE.parent)}: {len(faqs)} questions")
