#!/usr/bin/env python3
"""Generates the original Ultimate Football Mobile launcher icons (no external assets).

Outputs:
  android/app/src/main/res/mipmap-*/ic_launcher.png         (legacy square)
  android/app/src/main/res/mipmap-*/ic_launcher_round.png   (legacy round)
  android/app/src/main/res/mipmap-*/ic_launcher_foreground.png (adaptive foreground)
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), '..', 'android', 'app', 'src', 'main', 'res')
S = 1024  # master size


def vgrad(size, c_top, c_bottom):
    img = Image.new('RGBA', (size, size))
    d = ImageDraw.Draw(img)
    for y in range(size):
        t = y / (size - 1)
        col = tuple(int(a + (b - a) * t) for a, b in zip(c_top, c_bottom))
        d.line([(0, y), (size, y)], fill=col + (255,))
    return img


def radial_glow(size, center, radius, color, alpha):
    wh = size if isinstance(size, tuple) else (size, size)
    glow = Image.new('RGBA', wh, (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    steps = 40
    for i in range(steps, 0, -1):
        r = radius * i / steps
        a = int(alpha * (1 - i / steps) ** 1.6)
        d.ellipse([center[0] - r, center[1] - r, center[0] + r, center[1] + r],
                  fill=color + (a,))
    return glow


def shield_points(cx, cy, w, h):
    """Shield outline: broad shoulders tapering to a bottom tip."""
    pts = []
    # top edge (slight dip in the middle)
    n = 24
    for i in range(n + 1):
        t = i / n
        x = cx - w / 2 + w * t
        dip = math.sin(t * math.pi) * h * 0.045
        pts.append((x, cy - h / 2 + dip + h * 0.06))
    # right side down to tip
    for i in range(1, n + 1):
        t = i / n
        x = cx + w / 2 - (w / 2) * (t ** 1.35)
        y = cy - h / 2 + h * 0.06 + (h * 0.94) * (t ** 0.92)
        pts.append((x, y))
    # left side back up
    for i in range(n, 0, -1):
        t = i / n
        x = cx - w / 2 + (w / 2) * (t ** 1.35)
        y = cy - h / 2 + h * 0.06 + (h * 0.94) * (t ** 0.92)
        pts.append((x, y))
    return pts


def pentagon(cx, cy, r, rot=0):
    return [(cx + math.cos(rot + i * 2 * math.pi / 5) * r,
             cy + math.sin(rot + i * 2 * math.pi / 5) * r) for i in range(5)]


def star(cx, cy, r_outer, r_inner):
    pts = []
    for i in range(10):
        r = r_outer if i % 2 == 0 else r_inner
        a = -math.pi / 2 + i * math.pi / 5
        pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
    return pts


def draw_ball(img, cx, cy, r):
    d = ImageDraw.Draw(img)
    # ball base with soft shading
    ball = Image.new('RGBA', img.size, (0, 0, 0, 0))
    bd = ImageDraw.Draw(ball)
    bd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(250, 250, 250, 255))
    shade = radial_glow(img.size, (cx - r * 0.35, cy - r * 0.35), r * 1.5, (255, 255, 255), 70)
    ball = Image.alpha_composite(ball, shade)
    # dark rim
    rim = Image.new('RGBA', img.size, (0, 0, 0, 0))
    rd = ImageDraw.Draw(rim)
    rd.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(20, 24, 30, 200), width=max(3, int(r * 0.05)))
    ball = Image.alpha_composite(ball, rim)
    # pentagon pattern clipped to the ball
    pat = Image.new('RGBA', img.size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(pat)
    dark = (22, 26, 33, 255)
    pd.polygon(pentagon(cx, cy, r * 0.34, -math.pi / 2), fill=dark)
    for i in range(5):
        a = -math.pi / 2 + i * 2 * math.pi / 5
        px = cx + math.cos(a) * r * 0.86
        py = cy + math.sin(a) * r * 0.86
        pd.polygon(pentagon(px, py, r * 0.30, a + math.pi), fill=dark)
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)
    # clip pattern to the ball circle
    clipped = Image.composite(pat, Image.new('RGBA', img.size, (0, 0, 0, 0)), mask)
    ball = Image.alpha_composite(ball, clipped)
    img.alpha_composite(ball)


def render_emblem(canvas, cx, cy, scale):
    """Shield + star + ball emblem centered at (cx, cy), scale ~ overall width in px."""
    d = ImageDraw.Draw(canvas)
    w = scale
    h = scale * 1.16
    pts = shield_points(cx, cy, w, h)

    # shield fill: vertical gradient inside shield mask
    fill = vgrad(S, (34, 138, 76), (7, 45, 24))
    glow = radial_glow(S, (cx, cy - h * 0.18), w * 0.75, (120, 220, 150), 60)
    fill = Image.alpha_composite(fill, glow)
    mask = Image.new('L', (S, S), 0)
    ImageDraw.Draw(mask).polygon(pts, fill=255)
    canvas.alpha_composite(Image.composite(fill, Image.new('RGBA', (S, S), (0, 0, 0, 0)), mask))

    # gold rim
    d = ImageDraw.Draw(canvas)
    d.polygon(pts, outline=(245, 197, 66, 255))
    d.line(pts + [pts[0]], fill=(245, 197, 66, 255), width=max(6, int(scale * 0.035)))
    inner = shield_points(cx, cy, w * 0.90, h * 0.90)
    d.line(inner + [inner[0]], fill=(255, 230, 150, 120), width=max(2, int(scale * 0.012)))

    # star above ball
    d.polygon(star(cx, cy - h * 0.30, w * 0.115, w * 0.046), fill=(245, 197, 66, 255))
    # ball
    draw_ball(canvas, cx, cy + h * 0.06, w * 0.27)


def main():
    # ---------- full icon with background ----------
    icon = vgrad(S, (16, 74, 38), (3, 17, 9))
    icon.alpha_composite(radial_glow(S, (S // 2, int(S * 0.42)), int(S * 0.52), (60, 160, 90), 90))
    # pitch lines hint
    d = ImageDraw.Draw(icon)
    d.line([(0, int(S * 0.86)), (S, int(S * 0.86))], fill=(255, 255, 255, 26), width=6)
    d.ellipse([S * 0.5 - S * 0.16, S * 0.86 - S * 0.16, S * 0.5 + S * 0.16, S * 0.86 + S * 0.16],
              outline=(255, 255, 255, 26), width=6)
    render_emblem(icon, S // 2, int(S * 0.47), int(S * 0.60))
    # soft vignette
    vig = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vig)
    for i in range(60):
        t = i / 60
        vd.rectangle([i * 4, i * 4, S - i * 4, S - i * 4], outline=(0, 0, 0, int(3 * t)))
    icon = Image.alpha_composite(icon, vig)
    icon = icon.convert('RGB')

    densities = {  # folder: legacy px
        'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192
    }
    fg_sizes = {'mipmap-mdpi': 108, 'mipmap-hdpi': 162, 'mipmap-xhdpi': 216,
                'mipmap-xxhdpi': 324, 'mipmap-xxxhdpi': 432}

    # round mask for legacy round icons
    round_mask = Image.new('L', (S, S), 0)
    ImageDraw.Draw(round_mask).ellipse([8, 8, S - 8, S - 8], fill=255)

    for folder, px in densities.items():
        outdir = os.path.join(ROOT, folder)
        os.makedirs(outdir, exist_ok=True)
        sq = icon.resize((px, px), Image.LANCZOS)
        sq.save(os.path.join(outdir, 'ic_launcher.png'))
        rd = Image.new('RGBA', (S, S), (0, 0, 0, 0))
        rd.paste(icon, (0, 0))
        rd.putalpha(round_mask)
        rd.resize((px, px), Image.LANCZOS).save(os.path.join(outdir, 'ic_launcher_round.png'))
        # adaptive foreground: emblem on transparent bg, scaled to the 66% safe zone
        fg = Image.new('RGBA', (S, S), (0, 0, 0, 0))
        render_emblem(fg, S // 2, int(S * 0.50), int(S * 0.42))
        fg.resize((fg_sizes[folder], fg_sizes[folder]), Image.LANCZOS).save(
            os.path.join(outdir, 'ic_launcher_foreground.png'))
        print(f'wrote {folder}: {px}px legacy, {fg_sizes[folder]}px foreground')

    print('icons done')


if __name__ == '__main__':
    main()
