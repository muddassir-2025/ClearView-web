"""
Generates public/og.png (1200x630) — the social share card.

Run from the project root:  python tools/make-og.py
Only needs Pillow and numpy. Fonts are downloaded once into tools/.fonts.
"""

import os
import urllib.request

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
INK = (11, 18, 20)
TEAL = (0, 224, 210)
MIST = (231, 239, 238)
DIM = (140, 163, 161)
BEZEL = (23, 32, 33)

FONT_DIR = os.path.join(os.path.dirname(__file__), '.fonts')
os.makedirs(FONT_DIR, exist_ok=True)

SOURCES = {
    'Montserrat.ttf': (
        'https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/'
        'Montserrat%5Bwght%5D.ttf'
    ),
    'Inter.ttf': (
        'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/'
        'Inter%5Bopsz%2Cwght%5D.ttf'
    ),
}
# Fallbacks if the download is unavailable (Windows / macOS / Linux system fonts).
FALLBACKS = [
    'C:/Windows/Fonts/segoeuib.ttf',
    'C:/Windows/Fonts/arialbd.ttf',
    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
]


def font_path(name):
    local = os.path.join(FONT_DIR, name)
    if not os.path.exists(local):
        try:
            urllib.request.urlretrieve(SOURCES[name], local)
        except Exception as exc:  # offline or blocked
            print(f'! could not download {name}: {exc}')
            for fallback in FALLBACKS:
                if os.path.exists(fallback):
                    return fallback
            raise
    return local


def font(name, size, weight=None):
    fnt = ImageFont.truetype(font_path(name), size)
    if weight is not None:
        try:
            fnt.set_variation_by_axes([weight])  # variable font: pick the instance
        except Exception:
            pass  # static fallback font: ignore the axis
    return fnt


def wrap(draw, text, fnt, max_width):
    """Greedy word wrap measured with the real font metrics."""
    lines, line = [], ''
    for word in text.split():
        candidate = f'{line} {word}'.strip()
        if draw.textlength(candidate, font=fnt) <= max_width:
            line = candidate
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def radial_glow(size, center, radius, color):
    """Soft radial gradient returned as an RGBA layer."""
    w, h = size
    ys, xs = np.mgrid[0:h, 0:w]
    dist = np.sqrt((xs - center[0]) ** 2 + (ys - center[1]) ** 2) / radius
    alpha = np.clip(1.0 - dist, 0, 1) ** 2 * 255 * 0.85
    layer = np.zeros((h, w, 4), dtype=np.uint8)
    layer[..., 0], layer[..., 1], layer[..., 2] = color
    layer[..., 3] = alpha.astype(np.uint8)
    return Image.fromarray(layer, 'RGBA')


def phone(screenshot_path, size, radius, rotate):
    """One screenshot inside a thin bezel, rotated and rounded."""
    pw, ph = size
    shot = Image.open(screenshot_path).convert('RGB').resize((pw, ph), Image.LANCZOS)

    mask = Image.new('L', (pw, ph), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw - 1, ph - 1], radius=radius, fill=255)
    shot.putalpha(mask)

    bezel = Image.new('RGBA', (pw + 12, ph + 12), (0, 0, 0, 0))
    ImageDraw.Draw(bezel).rounded_rectangle(
        [0, 0, pw + 11, ph + 11], radius=radius + 6, fill=BEZEL + (255,)
    )
    bezel.alpha_composite(shot, (6, 6))
    return bezel.rotate(rotate, expand=True, resample=Image.BICUBIC)


canvas = Image.new('RGBA', (W, H), INK + (255,))

# Teal halo behind the phones on the right.
canvas.alpha_composite(radial_glow((W, H), (880, 380), 560, TEAL))

# Two overlapping phones, cropped by the bottom edge like a product render.
canvas.alpha_composite(phone('public/images/protection.jpeg', (262, 524), 26, 5), (836, 132))
canvas.alpha_composite(phone('public/images/media-feed.jpeg', (250, 500), 26, -5), (742, 186))

draw = ImageDraw.Draw(canvas)

# --- Wordmark ---------------------------------------------------------------
draw.ellipse([70, 66, 100, 96], outline=TEAL, width=4)
draw.ellipse([79, 75, 91, 87], fill=TEAL)
draw.text((114, 63), 'ClearView', font=font('Montserrat.ttf', 30, 700), fill=MIST)

# --- Headline ---------------------------------------------------------------
headline = font('Montserrat.ttf', 60, 800)
y = 150
for line in wrap(draw, 'Watch what you want, not what they want.', headline, 610):
    draw.text((70, y), line, font=headline, fill=MIST)
    y += 68

# --- Subline ----------------------------------------------------------------
subline = font('Inter.ttf', 26, 500)
y += 18
for line in wrap(
    draw,
    'Safer browsing, focused media, productivity and everyday tools. In one Android app.',
    subline,
    580,
):
    draw.text((70, y), line, font=subline, fill=DIM)
    y += 38

# --- Teal pill --------------------------------------------------------------
label = font('Montserrat.ttf', 22, 700)
text = 'Get it on Google Play'
text_width = draw.textlength(text, font=label)
pill_top = y + 26
draw.rounded_rectangle([70, pill_top, 70 + text_width + 58, pill_top + 56], radius=28, fill=TEAL)
draw.polygon(
    [(70 + 27, pill_top + 17), (70 + 43, pill_top + 28), (70 + 27, pill_top + 39)],
    fill=(4, 25, 26),
)
draw.text((70 + 54, pill_top + 15), text, font=label, fill=(4, 25, 26))

canvas.convert('RGB').save('public/og.png', 'PNG', optimize=True)
print('wrote public/og.png', canvas.size)
