#!/usr/bin/env python3
"""
Builds the Kiran Nikam Consulting logo as pure vector artwork.

Text is converted to outlined SVG paths (no font dependency), using the
brand typefaces (Cormorant Garamond + Manrope, SIL Open Font License).

Usage:
  python3 scripts/build-logo.py <cormorant-variable.ttf> <manrope-variable.ttf>

Outputs:
  public/images/brand/logo.svg            primary (navy + gold) for light backgrounds
  public/images/brand/logo-dark.svg       single-colour midnight navy, for light backgrounds
  public/images/brand/logo-light.svg      ivory + gold, for dark backgrounds
  public/images/brand/logo-stacked.svg    stacked lock-up (navy + gold)
  public/images/brand/logo-mark.svg       monogram only (gold)
  public/images/brand/favicon.svg         favicon (gold monogram on navy)
  src/components/brand/logo-paths.ts      the same paths, for the React <Logo /> component
"""
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
NAVY, GOLD, IVORY = "#101C2C", "#C6A46C", "#F7F5F0"


def load(path, wght):
    font = TTFont(path)
    return instantiateVariableFont(font, {"wght": wght})


def text_path(font, text, size, x, baseline, tracking_em=0.0):
    """Return (svg path d, advance width) for text set at `size` px."""
    upm = font["head"].unitsPerEm
    scale = size / upm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font["hmtx"]
    pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    cursor = x
    for i, ch in enumerate(text):
        gname = cmap[ord(ch)]
        tpen = TransformPen(pen, (scale, 0, 0, -scale, cursor, baseline))
        gs[gname].draw(tpen)
        cursor += hmtx[gname][0] * scale
        if i < len(text) - 1:
            cursor += tracking_em * size
    return pen.getCommands(), cursor - x


# Monogram: an architectural "KN" — the K's arms meet the N's first stem,
# forming a gable-like triangle; framed like a doorway, set on a plinth line.
# Designed on a 48 x 60 grid.
MONO_STROKES = [
    "M12 13V47",          # K stem
    "M12 30L24 13",       # K upper arm -> top of N stem
    "M12 30L24 47",       # K lower arm -> foot of N stem
    "M24 13V47",          # N first stem
    "M24 13L36 47",       # N diagonal
    "M36 13V47",          # N second stem
]
MONO_FRAME = "M1.5 1.5H46.5V58.5H1.5Z"
MONO_PLINTH = "M8 53H40"


def monogram(color, ox=0.0, oy=0.0, scale=1.0, frame=True):
    t = f' transform="translate({ox} {oy}) scale({scale})"' if (ox or oy or scale != 1) else ""
    strokes = "".join(f'<path d="{d}"/>' for d in MONO_STROKES)
    out = (
        f'<g{t} fill="none" stroke="{color}" stroke-linecap="square" stroke-linejoin="miter">'
        f'<g stroke-width="2.4">{strokes}</g>'
    )
    if frame:
        out += f'<path d="{MONO_FRAME}" stroke-width="1.2"/><path d="{MONO_PLINTH}" stroke-width="1.2"/>'
    return out + "</g>"


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" '
        f'width="{w:.0f}" height="{h:.0f}" role="img" aria-labelledby="t">'
        f"<title id=\"t\">{title}</title>{body}</svg>\n"
    )


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    serif = load(sys.argv[1], 600)
    sans = load(sys.argv[2], 600)

    # ---------- Horizontal lock-up ----------
    text_x = 66
    name_d, name_w = text_path(serif, "KIRAN NIKAM", 25, text_x, 33, tracking_em=0.07)
    sub_d, sub_w = text_path(sans, "CONSULTING", 8.6, text_x + 1, 50, tracking_em=0.52)
    width = text_x + max(name_w, sub_w) + 2
    height = 60
    divider = f'<path d="M56 10V50" stroke="{GOLD}" stroke-width="0.8"/>'

    def horizontal(word, sub, mark):
        return (
            monogram(mark)
            + divider.replace(GOLD, mark)
            + f'<path fill="{word}" d="{name_d}"/>'
            + f'<path fill="{sub}" d="{sub_d}"/>'
        )

    title = "Kiran Nikam Consulting"
    brand = ROOT / "public/images/brand"
    brand.mkdir(parents=True, exist_ok=True)
    (brand / "logo.svg").write_text(svg(width, height, horizontal(NAVY, GOLD, GOLD), title))
    (brand / "logo-dark.svg").write_text(svg(width, height, horizontal(NAVY, NAVY, NAVY), title))
    (brand / "logo-light.svg").write_text(svg(width, height, horizontal(IVORY, GOLD, GOLD), title))

    # ---------- Stacked lock-up ----------
    s_name_d, s_name_w = text_path(serif, "KIRAN NIKAM", 28, 0, 0, tracking_em=0.07)
    s_sub_d, s_sub_w = text_path(sans, "CONSULTING", 9.5, 0, 0, tracking_em=0.52)
    sw = max(s_name_w, s_sub_w) + 8
    # re-set text centred
    s_name_d, _ = text_path(serif, "KIRAN NIKAM", 28, (sw - s_name_w) / 2, 104, tracking_em=0.07)
    s_sub_d, _ = text_path(sans, "CONSULTING", 9.5, (sw - s_sub_w) / 2 + 2, 124, tracking_em=0.52)
    stacked = (
        monogram(GOLD, ox=(sw - 48 * 1.15) / 2, oy=2, scale=1.15)
        + f'<path fill="{NAVY}" d="{s_name_d}"/><path fill="{GOLD}" d="{s_sub_d}"/>'
    )
    (brand / "logo-stacked.svg").write_text(svg(sw, 132, stacked, title))

    # ---------- Mark + favicon ----------
    (brand / "logo-mark.svg").write_text(svg(48, 60, monogram(GOLD), title))
    fav = (
        f'<rect width="64" height="64" rx="12" fill="{NAVY}"/>'
        + monogram(GOLD, ox=8.5, oy=2.5, scale=0.98, frame=False).replace('stroke-width="2.4"', 'stroke-width="4.2"')
        + f'<path d="M14 56H50" stroke="{GOLD}" stroke-width="2.4"/>'
    )
    fav_svg = svg(64, 64, fav, title)
    (brand / "favicon.svg").write_text(fav_svg)
    (ROOT / "src/app/icon.svg").write_text(fav_svg)

    # ---------- TS module for the React component ----------
    ts = ROOT / "src/components/brand/logo-paths.ts"
    ts.parent.mkdir(parents=True, exist_ok=True)
    ts.write_text(
        "// AUTO-GENERATED by scripts/build-logo.py — do not edit by hand.\n"
        f"export const LOGO_VIEWBOX = \"0 0 {width:.0f} {height}\";\n"
        f"export const LOGO_NAME_PATH = \"{name_d}\";\n"
        f"export const LOGO_SUB_PATH = \"{sub_d}\";\n"
        f"export const MONO_STROKES = {MONO_STROKES!r};\n".replace("'", '"')
        + f"export const MONO_FRAME = \"{MONO_FRAME}\";\n"
        f"export const MONO_PLINTH = \"{MONO_PLINTH}\";\n"
    )
    print(f"Logo built: {width:.0f}x{height} (horizontal), {sw:.0f}x132 (stacked)")


if __name__ == "__main__":
    main()
