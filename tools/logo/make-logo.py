#!/usr/bin/env python3
"""Build the 300sun sun-3 symbol as SVG files.

The "3" is the real glyph from Instrument Serif (the site's display font, OFL),
made a little heavier with a stroke; the three rays are round-capped lines that
point back to the waist of the 3, like a half sun.

    python3 tools/logo/make-logo.py      (needs: pip install fonttools brotli)

-> brand/300sun-symbol*.svg and site/favicon.svg
"""
import math
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[2]
SUN, INK, PAPER = "#e9a23b", "#1a1a1a", "#f5f5f3"

font = TTFont(ROOT / "site/assets/fonts/instrument-serif.woff2")
glyphs = font.getGlyphSet()
pen = SVGPathPen(glyphs)
glyphs[font.getBestCmap()[ord("3")]].draw(pen)
THREE = pen.getCommands()          # font units, y up; bounds about x 20..341, y -9..730

BOLD = 26                          # extra weight on the glyph outline
RAY_W = 58                         # ray thickness
CX, CY = 210, 360                  # the waist of the 3: where the rays point back to
R1, R2 = 250, 365                  # rays start / end distance from that point
ANGLES = (-38, 0, 38)


def rays(color, ray_w=RAY_W):
    out = []
    for a in ANGLES:
        t = math.radians(a)
        x1, y1 = CX + R1 * math.cos(t), CY + R1 * math.sin(t)
        x2, y2 = CX + R2 * math.cos(t), CY + R2 * math.sin(t)
        out.append(f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}"/>')
    return f'<g stroke="{color}" stroke-width="{ray_w}" stroke-linecap="round">{"".join(out)}</g>'


def symbol(color, pad=40, bold=BOLD, ray_w=RAY_W):
    # Flip font coordinates (y up) into SVG (y down) inside one group
    x0, y0, x1, y1 = 20 - bold - pad, -9 - bold - pad, CX + R2 + ray_w / 2 + pad, 730 + bold + pad
    w, h = x1 - x0, y1 - y0
    body = (f'<g transform="translate({-x0:.0f} {y1:.0f}) scale(1 -1)">'
            f'<path d="{THREE}" fill="{color}" stroke="{color}" stroke-width="{bold}" stroke-linejoin="round"/>'
            f'{rays(color, ray_w)}</g>')
    return w, h, body


def write(path, svg):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg + "\n", encoding="utf-8")
    print(path.relative_to(ROOT))


for name, color in (("", SUN), ("-ink", INK), ("-paper", PAPER)):
    w, h, body = symbol(color)
    write(ROOT / f"brand/300sun-symbol{name}.svg",
          f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}">{body}</svg>')

# Round avatar (Instagram, WhatsApp): paper symbol on an ink circle
w, h, body = symbol(PAPER, pad=0)
s = 1000; k = 0.56 * s / h
write(ROOT / "brand/300sun-avatar.svg",
      f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {s} {s}"><circle cx="{s/2}" cy="{s/2}" r="{s/2}" fill="{INK}"/>'
      f'<g transform="translate({(s - w*k)/2 + 0.02*s:.1f} {(s - h*k)/2:.1f}) scale({k:.4f})">{body}</g></svg>')

# Favicon: sun symbol on an ink rounded square, bigger in the frame so it reads at 16 px
w, h, body = symbol(SUN, pad=0, bold=70, ray_w=95)
s = 32; k = 0.74 * s / h
write(ROOT / "site/favicon.svg",
      f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {s} {s}"><rect width="{s}" height="{s}" rx="7" fill="{INK}"/>'
      f'<g transform="translate({(s - w*k)/2:.2f} {(s - h*k)/2:.2f}) scale({k:.5f})">{body}</g></svg>')
