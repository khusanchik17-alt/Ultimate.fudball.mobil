#!/usr/bin/env python3
"""
Ultimate Football Mobile - original app icon generator.

Draws the UFM badge (shield + stylised ball + monogram) with Pillow and writes
the Android mipmap densities plus a store/README preview image.

The artwork is 100% original: it is composed from primitives (polygons, circles,
gradients) so the project ships no third-party / licensed imagery.

Usage:  python3 tools/make_icons.py
"""
from __future__ import annotations

import math
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ANDROID_RES = os.path.join(ROOT, "android", "app", "src", "main", "res")
PREVIEW_DIR = os.path.join(ROOT, "docs")

DENSITIES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}

# Brand palette (original)
NAVY_TOP = (10, 22, 44)
NAVY_BOTTOM = (4, 10, 22)
TEAL = (0, 214, 190)
GOLD = (255, 199, 64)
WHITE = (245, 250, 255)


def _font(size: int, bold: bool = True):
    """Best-effort font lookup with a safe fallback."""
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:  # pragma: no cover - defensive
                continue
    try:
        return ImageFont.load_default(size=size)
    except Exception:  # pragma: no cover - very old Pillow
        return ImageFont.load_default()


def vertical_gradient(size, top, bottom):
    grad = Image.new("RGB", (1, size[1]))
    px = grad.load()
    for y in range(size[1]):
        t = y / max(1, size[1] - 1)
        px[0, y] = (
            int(top[0] + (bottom[0] - top[0]) * t),
            int(top[1] + (bottom[1] - top[1]) * t),
            int(top[2] + (bottom[2] - top[2]) * t),
        )
    return grad.resize(size, Image.BILINEAR)


def shield_polygon(w, h, inset=0.045):
    """Rounded shield silhouette (flat top corners, pointed bottom)."""
    pad = w * inset
    left, right = pad, w - pad
    top, bottom = pad, h - pad
    shoulder = top + (bottom - top) * 0.46
    cx = w / 2
    pts = [
        (left + (right - left) * 0.06, top),
        (right - (right - left) * 0.06, top),
        (right, shoulder - (bottom - top) * 0.06),
        (right - (right - left) * 0.10, bottom - (bottom - top) * 0.20),
        (cx + (right - left) * 0.14, bottom),
        (cx, bottom - (bottom - top) * 0.012),
        (cx - (right - left) * 0.14, bottom),
        (left + (right - left) * 0.10, bottom - (bottom - top) * 0.20),
        (left, shoulder - (bottom - top) * 0.06),
        (left + (right - left) * 0.06, top),
    ]
    return pts


def draw_ball(draw: ImageDraw.ImageDraw, cx, cy, r, body=WHITE, patch=(18, 26, 40)):
    """Classic truncated-icosahedron look reduced to a clean flat design."""
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=body)
    # centre pentagon
    pent = []
    for i in range(5):
        a = -math.pi / 2 + i * 2 * math.pi / 5
        pent.append((cx + math.cos(a) * r * 0.42, cy + math.sin(a) * r * 0.42))
    draw.polygon(pent, fill=patch)
    # outer patches
    for i in range(5):
        a = -math.pi / 2 + (i + 0.5) * 2 * math.pi / 5
        px = cx + math.cos(a) * r * 0.80
        py = cy + math.sin(a) * r * 0.80
        pr = r * 0.20
        draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=patch)
    # seam lines
    for i in range(5):
        a = -math.pi / 2 + i * 2 * math.pi / 5
        draw.line(
            [cx + math.cos(a) * r * 0.42, cy + math.sin(a) * r * 0.42,
             cx + math.cos(a) * r * 0.92, cy + math.sin(a) * r * 0.92],
            fill=patch, width=max(1, int(r * 0.07)),
        )
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=patch, width=max(1, int(r * 0.09)))


def render_icon(size: int, ss: int = 4) -> Image.Image:
    """Render the badge at `size` with supersampling factor `ss`."""
    S = size * ss
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))

    # outer glow ring
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([S * 0.02, S * 0.02, S * 0.98, S * 0.98], fill=(0, 214, 190, 38))
    img.alpha_composite(glow)

    # shield body with gradient + teal rim
    body = vertical_gradient((S, S), NAVY_TOP, NAVY_BOTTOM).convert("RGBA")
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).polygon(shield_polygon(S, S), fill=255)
    img.paste(body, (0, 0), mask)

    d = ImageDraw.Draw(img)
    pts = shield_polygon(S, S)
    d.line(pts + [pts[0]], fill=TEAL, width=max(2, int(S * 0.022)), joint="curve")

    # pitch stripes hint (bottom part of the shield)
    stripe = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    sd = ImageDraw.Draw(stripe)
    for i in range(6):
        x = -S * 0.2 + i * S * 0.28
        sd.polygon([(x, S * 0.30), (x + S * 0.12, S * 0.30), (x + S * 0.02, S * 0.94), (x - S * 0.10, S * 0.94)],
                   fill=(255, 255, 255, 10))
    img.alpha_composite(Image.composite(stripe, Image.new("RGBA", (S, S), (0, 0, 0, 0)), mask))

    # ball + monogram
    draw_ball(d, S * 0.5, S * 0.40, S * 0.185)

    f = _font(int(S * 0.235), bold=True)
    text = "UFM"
    bbox = d.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((S * 0.5 - tw / 2 - bbox[0], S * 0.60 - th / 2 - bbox[1]), text, font=f, fill=GOLD)

    sub = _font(int(S * 0.072), bold=True)
    label = "ULTIMATE FOOTBALL"
    bbox2 = d.textbbox((0, 0), label, font=sub)
    d.text((S * 0.5 - (bbox2[2] - bbox2[0]) / 2 - bbox2[0], S * 0.755), label, font=sub, fill=(214, 226, 240))

    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    master = render_icon(512, ss=2)
    os.makedirs(PREVIEW_DIR, exist_ok=True)
    master.save(os.path.join(PREVIEW_DIR, "icon-512.png"))

    for folder, px in DENSITIES.items():
        out_dir = os.path.join(ANDROID_RES, folder)
        os.makedirs(out_dir, exist_ok=True)
        icon = master.resize((px, px), Image.LANCZOS)
        icon.save(os.path.join(out_dir, "ic_launcher.png"))
        # round variant: circular crop of the same badge artwork
        round_icon = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        badge = icon.resize((int(px * 0.86), int(px * 0.86)), Image.LANCZOS)
        circle = Image.new("L", badge.size, 0)
        ImageDraw.Draw(circle).ellipse([0, 0, badge.size[0] - 1, badge.size[1] - 1], fill=255)
        off = (px - badge.size[0]) // 2
        round_icon.paste(badge, (off, off), circle)
        round_icon.save(os.path.join(out_dir, "ic_launcher_round.png"))
        print(f"  {folder}/ic_launcher.png ({px}px)")

    # Adaptive icon foreground: badge drawn inside the 66% safe zone
    for folder, px in DENSITIES.items():
        out_dir = os.path.join(ANDROID_RES, folder)
        os.makedirs(out_dir, exist_ok=True)
        inner = int(px * 0.66)
        canvas = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        badge = master.resize((inner, inner), Image.LANCZOS)
        off = (px - inner) // 2
        canvas.paste(badge, (off, off), badge)
        canvas.save(os.path.join(out_dir, "ic_launcher_foreground.png"))
    print("  mipmap-*/ic_launcher_foreground.png (adaptive icon)")

    # Splash logo (transparent, larger, used by the Activity window background)
    drawable_dir = os.path.join(ANDROID_RES, "drawable")
    os.makedirs(drawable_dir, exist_ok=True)
    splash = render_icon(1024, ss=1)
    splash.save(os.path.join(drawable_dir, "splash_logo.png"))
    print("  drawable/splash_logo.png (1024px)")


if __name__ == "__main__":
    main()
