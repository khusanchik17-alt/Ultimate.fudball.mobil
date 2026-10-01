/**
 * Procedural textures - everything is drawn on a canvas at runtime so the game
 * ships no third-party image assets and stays tiny.
 */
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, LinearFilter, ClampToEdgeWrapping } from 'three';
import { clamp, mulberry32 } from '../core/util.js';

function makeCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function finish(canvas, { repeat = null, srgb = true, wrap = RepeatWrapping, filter = LinearFilter } = {}) {
  const texture = new CanvasTexture(canvas);
  texture.wrapS = wrap;
  texture.wrapT = wrap;
  texture.magFilter = filter;
  texture.minFilter = filter === LinearFilter ? LinearFilter : undefined;
  if (repeat) texture.repeat.set(repeat[0], repeat[1]);
  if (srgb) texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 2;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Pitch texture: mowing stripes, all field markings, penalty spots, corner arcs.
 * Drawn in real proportions so lines land exactly where the physics expects.
 */
export function createPitchTexture(quality = 'medium') {
  const px = quality === 'high' ? 2048 : quality === 'medium' ? 1024 : 512;
  const W = px;
  const H = Math.round(px * (68 / 105));       // markup area 105 x 68
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const rng = mulberry32(20240914);

  const sx = W / 105;                            // pixels per metre
  const sy = H / 68;
  const mx = (m) => (m + 52.5) * sx;
  const my = (m) => (m + 34) * sy;

  // base grass with mowing stripes
  ctx.fillStyle = '#20512a';
  ctx.fillRect(0, 0, W, H);
  const stripes = 14;
  for (let i = 0; i < stripes; i += 1) {
    ctx.fillStyle = i % 2 === 0 ? '#276033' : '#1f4c28';
    ctx.fillRect((i * W) / stripes, 0, W / stripes + 1, H);
  }
  // subtle grass noise
  const noiseCount = quality === 'low' ? 3000 : 9000;
  for (let i = 0; i < noiseCount; i += 1) {
    const x = rng() * W;
    const y = rng() * H;
    const a = 0.03 + rng() * 0.05;
    ctx.fillStyle = rng() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  // wear patches in front of the goals
  for (const side of [-1, 1]) {
    const g = ctx.createRadialGradient(mx(side * 45), my(0), 10, mx(side * 45), my(0), 18 * sx);
    g.addColorStop(0, 'rgba(120,100,60,0.30)');
    g.addColorStop(1, 'rgba(120,100,60,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // markings
  ctx.strokeStyle = 'rgba(255,255,255,0.92)';
  ctx.lineWidth = Math.max(2, 0.12 * sx);
  ctx.lineCap = 'butt';

  const rect = (x1, z1, x2, z2) => {
    ctx.beginPath();
    ctx.rect(mx(x1), my(z1), (x2 - x1) * sx, (z2 - z1) * sy);
    ctx.stroke();
  };

  // outline + halfway line
  rect(-52.5, -34, 52.5, 34);
  ctx.beginPath();
  ctx.moveTo(mx(0), my(-34));
  ctx.lineTo(mx(0), my(34));
  ctx.stroke();
  // centre circle + spot
  ctx.beginPath();
  ctx.ellipse(mx(0), my(0), 9.15 * sx, 9.15 * sy, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(mx(0), my(0), Math.max(2, 0.2 * sx), 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fill();

  for (const side of [-1, 1]) {
    // penalty area
    rect(side * 52.5, -20.16, side * (52.5 - 16.5), 20.16);
    // goal area
    rect(side * 52.5, -9.16, side * (52.5 - 5.5), 9.16);
    // penalty spot
    ctx.beginPath();
    ctx.arc(mx(side * (52.5 - 11)), my(0), Math.max(2, 0.2 * sx), 0, Math.PI * 2);
    ctx.fill();
    // penalty arc
    ctx.beginPath();
    const arcStart = Math.PI - Math.acos(5.5 / 9.15);
    ctx.ellipse(mx(side * (52.5 - 11)), my(0), 9.15 * sx, 9.15 * sy, 0,
      side > 0 ? Math.PI / 2 + (Math.PI / 2 - arcStart) : -Math.PI / 2 - (Math.PI / 2 - arcStart),
      side > 0 ? Math.PI * 1.5 - (Math.PI / 2 - arcStart) : Math.PI / 2 + (Math.PI / 2 - arcStart));
    ctx.stroke();
    // corner arcs
    for (const zs of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(mx(side * 52.5), my(zs * 34), 1 * sx, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  return finish(canvas, { srgb: true, wrap: ClampToEdgeWrapping });
}

/** Grass for the surrounding area (outside the markings). */
export function createOutfieldTexture() {
  const size = 512;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#173c20';
  ctx.fillRect(0, 0, size, size);
  const rng = mulberry32(7);
  for (let i = 0; i < 2600; i += 1) {
    const x = rng() * size;
    const y = rng() * size;
    ctx.fillStyle = rng() > 0.5 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.05)';
    ctx.fillRect(x, y, 2, 2);
  }
  return finish(canvas, { repeat: [26, 26] });
}

/** Goal net: transparent texture with a grid, used as both map and alphaMap. */
export function createNetTexture() {
  const size = 128;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(255,255,255,0.85)';
  ctx.lineWidth = 2;
  const step = size / 8;
  for (let i = 0; i <= 8; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * step);
    ctx.lineTo(size, i * step);
    ctx.stroke();
  }
  return finish(canvas, { repeat: [6, 3] });
}

/** Advertising boards with original sponsor names (all invented for this game). */
export function createAdBoardTexture(label, primary = '#0fd6be', secondary = '#04121f') {
  const W = 512;
  const H = 96;
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, secondary);
  grad.addColorStop(0.5, primary);
  grad.addColorStop(1, secondary);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, H - 10, W, 10);
  ctx.fillStyle = '#031016';
  ctx.font = 'bold 46px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, W / 2, H / 2 - 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, W - 8, H - 8);
  return finish(canvas, { srgb: true, wrap: ClampToEdgeWrapping });
}

/** A single crowd member sprite (used by the instanced crowd shader). */
export function createCrowdTexture() {
  const W = 32;
  const H = 48;
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const rng = mulberry32(99);
  ctx.clearRect(0, 0, W, H);
  // body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(6, H);
  ctx.lineTo(7, 22);
  ctx.quadraticCurveTo(W / 2, 12, 25, 22);
  ctx.lineTo(26, H);
  ctx.closePath();
  ctx.fill();
  // head
  const skin = ['#f0c9a0', '#d9a273', '#b57a4e', '#8a5433', '#5f3a22'][Math.floor(rng() * 5)];
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(W / 2, 13, 8, 0, Math.PI * 2);
  ctx.fill();
  // arms
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillRect(1, 24, 5, 14);
  ctx.fillRect(W - 6, 24, 5, 14);
  return finish(canvas, { srgb: true, wrap: ClampToEdgeWrapping });
}

/** Ball texture: classic pentagon/hexagon look drawn procedurally. */
export function createBallTexture() {
  const W = 512;
  const H = 256;
  const canvas = makeCanvas(W, H);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f7fbff';
  ctx.fillRect(0, 0, W, H);

  const patch = (cx, cy, r, rot = 0) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const a = rot + i * (Math.PI * 2 / 5);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#16202c';
    ctx.fill();
  };

  // black pentagons arranged like the classic ball
  patch(W * 0.5, H * 0.5, 34);
  patch(W * 0.5, H * 0.12, 26, 0.4);
  patch(W * 0.5, H * 0.88, 26, 0.9);
  patch(W * 0.16, H * 0.32, 26, 0.2);
  patch(W * 0.84, H * 0.32, 26, 0.6);
  patch(W * 0.16, H * 0.7, 26, 1.1);
  patch(W * 0.84, H * 0.7, 26, 1.5);

  // seams
  ctx.strokeStyle = 'rgba(20,28,38,0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.5);
  ctx.lineTo(W, H * 0.5);
  ctx.stroke();
  return finish(canvas, { srgb: true, wrap: ClampToEdgeWrapping });
}

/** Scoreboard canvas: kept in memory and redrawn only when the text changes. */
export function createScoreboardCanvas(width = 1024, height = 256) {
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 2;
  return { canvas, ctx, texture };
}

export function drawScoreboard(ctx, canvas, { home, away, score, clock, period, primary = '#0fd6be', secondary = '#04121f', flash = 0 }) {
  const W = canvas.width;
  const H = canvas.height;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#061423');
  g.addColorStop(1, '#0b2233');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = primary;
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, W - 8, H - 8);

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#e9f6ff';
  ctx.font = `bold ${Math.round(H * 0.30)}px sans-serif`;
  ctx.fillText(home.slice(0, 12).toUpperCase(), W * 0.22, H * 0.36);

  ctx.font = `bold ${Math.round(H * 0.42)}px sans-serif`;
  ctx.fillStyle = flash > 0 ? '#ffdf6b' : '#ffffff';
  ctx.fillText(String(score[0]), W * 0.44, H * 0.44);
  ctx.fillText('-', W * 0.5, H * 0.44);
  ctx.fillText(String(score[1]), W * 0.56, H * 0.44);

  ctx.fillStyle = '#e9f6ff';
  ctx.font = `bold ${Math.round(H * 0.30)}px sans-serif`;
  ctx.fillText(away.slice(0, 12).toUpperCase(), W * 0.78, H * 0.36);

  ctx.fillStyle = primary;
  ctx.fillRect(W * 0.36, H * 0.76, W * 0.28, H * 0.16);
  ctx.fillStyle = secondary;
  ctx.font = `bold ${Math.round(H * 0.20)}px sans-serif`;
  ctx.fillText(clock, W * 0.5, H * 0.84);
  ctx.fillStyle = '#9fd6e8';
  ctx.font = `bold ${Math.round(H * 0.13)}px sans-serif`;
  ctx.fillText(period, W * 0.5, H * 0.66);
  ctx.textAlign = 'right';
  ctx.fillText('UFM', W - 22, H * 0.12);
}

/** Sky gradient for the stadium backdrop. */
export function createSkyTexture(topColor, bottomColor) {
  const canvas = makeCanvas(8, 256);
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, topColor);
  g.addColorStop(1, bottomColor);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 256);
  return finish(canvas, { wrap: ClampToEdgeWrapping });
}

export function createLogoTexture() {
  const size = 512;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  const g = ctx.createLinearGradient(0, 0, 0, size);
  g.addColorStop(0, '#0a1626');
  g.addColorStop(1, '#04101e');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.46, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0fd6be';
  ctx.lineWidth = 14;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size / 2, size * 0.44, size * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#16202c';
  ctx.beginPath();
  for (let i = 0; i < 5; i += 1) {
    const a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
    const x = size / 2 + Math.cos(a) * size * 0.085;
    const y = size * 0.44 + Math.sin(a) * size * 0.085;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffc940';
  ctx.font = `bold ${Math.round(size * 0.2)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('UFM', size / 2, size * 0.78);
  return finish(canvas, { wrap: ClampToEdgeWrapping });
}

/** Simple utility used by the crowd/particles for stable randomness. */
export function jitter(seed, index, amount) {
  const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return (value - Math.floor(value)) * amount;
}

export { clamp };
