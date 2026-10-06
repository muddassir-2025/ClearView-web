"""
Builds the ClearView brand assets from the uploaded logo (temp/1.jpeg).

The uploaded file is the app mark on a plain white background: a heart split
down the middle, black on the left and red on the right. Per the brief the mark
keeps its white background, so every asset here is the heart re-centred on a
clean white tile rather than cut out to transparency.

Outputs (into public/):
  logo.png              300x300 white tile, used for the header/footer wordmark
  favicon-32.png         32x32 white tile with rounded corners
  apple-touch-icon.png  180x180 white tile (iOS applies its own corner mask)

Run from the project root:  python tools/make-logo.py
"""

from PIL import Image, ImageDraw
import numpy as np
import os

SRC = "temp/1.jpeg"
OUT_DIR = "public"

TILE = 300          # master tile size, in px
HEART_FILL = 0.78   # how much of the tile height the heart occupies
BACKGROUND = (255, 255, 255, 255)

BLACK = np.array([0.0, 0.0, 0.0])
RED = np.array([197.0, 40.0, 40.0])
WHITE = 255.0


def extract_heart():
    """Return the heart as RGBA, cropped tight to its ink, on transparent."""
    a = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float64)

    dist = np.linalg.norm(WHITE - a, axis=2)
    ys, xs = np.where(dist > 26)
    pad = 8
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + 1 + pad, a.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + 1 + pad, a.shape[1])
    crop = a[y0:y1, x0:x1]

    r, g, b = crop[:, :, 0], crop[:, :, 1], crop[:, :, 2]
    # The red half has a much higher red channel than green/blue; the black
    # half does not. That is enough to split the two tones cleanly.
    is_red = (r - (g + b) / 2.0) > 40.0

    # Recover alpha by un-mixing each pixel against the white background,
    # using whichever channel carries the most contrast for that tone.
    black_alpha = 1.0 - crop.mean(axis=2) / WHITE
    red_alpha = (WHITE - g) / (WHITE - RED[1])
    alpha = np.where(is_red, red_alpha, black_alpha)
    alpha = np.clip(alpha, 0.0, 1.0)

    # JPEG ringing leaves a faint haze over the whole frame; drop it and
    # re-stretch so the heart stays solid instead of washing out at the edges.
    alpha[alpha < 0.12] = 0.0
    alpha = np.clip((alpha - 0.12) / 0.88, 0.0, 1.0)

    rgba = np.zeros(crop.shape[:2] + (4,), dtype=np.uint8)
    tone = np.where(is_red[:, :, None], RED.reshape(1, 1, 3), BLACK.reshape(1, 1, 3))
    rgba[:, :, :3] = np.clip(tone, 0, 255).astype(np.uint8)
    rgba[:, :, 3] = np.round(alpha * 255).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def build_tile(heart, size):
    """Centre the heart on a white square tile of `size` px."""
    target_h = round(size * HEART_FILL)
    target_w = round(target_h * heart.width / heart.height)
    scaled = heart.resize((target_w, target_h), Image.LANCZOS)

    tile = Image.new("RGBA", (size, size), BACKGROUND)
    tile.alpha_composite(scaled, ((size - target_w) // 2, (size - target_h) // 2))
    return tile


def rounded(tile, size, radius_ratio=0.22):
    """Copy of the tile with rounded corners, for the favicon."""
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=round(size * radius_ratio), fill=255
    )
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(tile, (0, 0), mask)
    return out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    heart = extract_heart()
    print(f"heart: {heart.width}x{heart.height}")

    master = build_tile(heart, TILE)
    master.convert("RGB").save(f"{OUT_DIR}/logo.png", optimize=True)

    fav = rounded(master.resize((32, 32), Image.LANCZOS), 32)
    fav.save(f"{OUT_DIR}/favicon-32.png", optimize=True)

    master.resize((180, 180), Image.LANCZOS).convert("RGB").save(
        f"{OUT_DIR}/apple-touch-icon.png", optimize=True
    )

    for name in ("logo.png", "favicon-32.png", "apple-touch-icon.png"):
        path = os.path.join(OUT_DIR, name)
        print(f"{name}: {Image.open(path).size} {os.path.getsize(path)}B")


if __name__ == "__main__":
    main()
