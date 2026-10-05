#!/usr/bin/env python3
"""Turn an original photo into the web sizes the site expects, with the 300sun look.

    python3 tools/prepare-photos.py ~/Downloads/church.jpg valencia 300sun-valencia-iglesia-san-nicolas

-> site/images/valencia/300sun-valencia-iglesia-san-nicolas-640.jpg (and -1280)

Every photo gets the same edit, so the site looks like one set: a gentle level
stretch, a little lift in the shadows, slightly warmer and richer colour, and a
light sharpen after resizing. Location and camera data (EXIF/GPS) are removed.
Needs Pillow: pip install pillow
"""
import sys
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

SIZES = (640, 1280)


def grade(im):
    im = ImageOps.exif_transpose(im).convert("RGB")
    im = ImageOps.autocontrast(im, cutoff=(0.4, 0.2), preserve_tone=True)
    # Lift the shadows a little so dark interiors keep their detail
    lut = [round(255 * ((i / 255) ** 0.92)) for i in range(256)]
    im = im.point(lut * 3)
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.08)
    # Warm, Mediterranean light: a touch more red, a touch less blue
    r, g, b = im.split()
    r = r.point(lambda v: min(255, round(v * 1.025)))
    b = b.point(lambda v: round(v * 0.97))
    return Image.merge("RGB", (r, g, b))


def export(im, out, width):
    if im.width != width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    im.save(out, "JPEG", quality=84, optimize=True, progressive=True)  # no exif passed: metadata stripped


def main():
    if len(sys.argv) != 4:
        sys.exit("usage: prepare-photos.py <photo> <paella|hostels|valencia> <file-name-without-size>")
    src, folder, name = sys.argv[1:]
    out_dir = Path(__file__).resolve().parent.parent / "site" / "images" / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    im = grade(Image.open(src))
    for w in SIZES:
        out = out_dir / f"{name}-{w}.jpg"
        export(im, out, w)
        print(out.relative_to(out_dir.parent.parent.parent), f"{out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
