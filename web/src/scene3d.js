// 3D stadium, player figures (GPU-instanced) and ball — all procedural, zero assets.
import * as THREE from 'three';
import { PITCH, HALF_LEN, HALF_W, GOAL_HALF, QUALITY } from './config.js';
import { mulberry32 } from './utils.js';

// ---------------------------------------------------------------- renderer
export function makeRenderer(canvas, quality) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: quality === 'high', powerPreference: 'high-performance' });
  const q = QUALITY[quality] || QUALITY.medium;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.pixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  if (q.shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
  }
  return renderer;
}

// ---------------------------------------------------------------- textures
function canvasOf(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

export function makePitchTexture(hires) {
  const W = hires ? 2048 : 1024;
  const H = Math.round(W * (PITCH.width + 14) / (PITCH.length + 14));
  const c = canvasOf(W, H);
  const g = c.getContext('2d');
  const apron = (14 / (PITCH.length + 14)) * W * 0.5;
  // grass apron (darker)
  g.fillStyle = '#0a4423';
  g.fillRect(0, 0, W, H);
  // mowed stripes
  const stripes = 14;
  const px = apron, pw = W - apron * 2;
  for (let i = 0; i < stripes; i++) {
    g.fillStyle = i % 2 ? '#0f6a35' : '#0c5c2e';
    g.fillRect(px + (pw / stripes) * i, (7 / (PITCH.width + 14)) * H, pw / stripes + 1, H - 2 * (7 / (PITCH.width + 14)) * H);
  }
  // subtle noise for grass feel
  const rng = mulberry32(7);
  g.globalAlpha = 0.05;
  for (let i = 0; i < (hires ? 2600 : 900); i++) {
    g.fillStyle = rng() > 0.5 ? '#128044' : '#08391d';
    g.fillRect(rng() * W, rng() * H, 2.2, 2.2);
  }
  g.globalAlpha = 1;
  // markings
  const sx = pw / PITCH.length, sy = (H - 2 * (7 / (PITCH.width + 14)) * H) / PITCH.width;
  const X = x => px + (x + HALF_LEN) * sx;
  const Y = z => (7 / (PITCH.width + 14)) * H + (z + HALF_W) * sy;
  g.strokeStyle = 'rgba(255,255,255,0.92)';
  g.lineWidth = Math.max(2, W * 0.0024);
  g.strokeRect(X(-HALF_LEN), Y(-HALF_W), PITCH.length * sx, PITCH.width * sy);
  // halfway line + center circle
  g.beginPath(); g.moveTo(X(0), Y(-HALF_W)); g.lineTo(X(0), Y(HALF_W)); g.stroke();
  g.beginPath(); g.arc(X(0), Y(0), 9.15 * sx, 0, Math.PI * 2); g.stroke();
  g.fillStyle = 'rgba(255,255,255,0.92)';
  g.beginPath(); g.arc(X(0), Y(0), 0.35 * sx, 0, Math.PI * 2); g.fill();
  // boxes, spots, arcs
  for (const dir of [-1, 1]) {
    const gx = dir * HALF_LEN;
    g.strokeRect(Math.min(X(gx), X(gx - dir * PITCH.boxD)), Y(-PITCH.boxW / 2), PITCH.boxD * sx, PITCH.boxW * sy);
    g.strokeRect(Math.min(X(gx), X(gx - dir * PITCH.box6D)), Y(-PITCH.boxW / 2 * 0.45), PITCH.box6D * sx, PITCH.boxW * sy * 0.45);
    g.beginPath(); g.arc(X(gx - dir * 11), Y(0), 0.3 * sx, 0, Math.PI * 2); g.fill();
    g.beginPath();
    g.arc(X(gx - dir * 11), Y(0), 9.15 * sx, dir === 1 ? Math.PI * 0.68 : -Math.PI * 0.32, dir === 1 ? Math.PI * 0.32 : Math.PI * 0.68, dir === -1);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

const AD_TEXTS = ['UFM SPORT', 'ZAFAR AIR', 'OLTIN BANK', 'BAHOR TEA', 'CHIQMOQ ENERGY', 'DARYO WATER', 'QUYOSH SOLAR', 'TEKNO PLUS'];
export function makeAdTexture(hires) {
  const c = canvasOf(hires ? 1024 : 512, 64);
  const g = c.getContext('2d');
  g.fillStyle = '#0b1526'; g.fillRect(0, 0, c.width, c.height);
  const rng = mulberry32(99);
  const colors = ['#f5c542', '#ffffff', '#3e9bff', '#ff8a1e', '#2fae5c'];
  let x = 8;
  const cell = c.width / 4;
  for (let i = 0; i < 4; i++) {
    g.fillStyle = colors[Math.floor(rng() * colors.length)];
    g.font = `900 ${Math.round(c.height * 0.46)}px Arial`;
    g.textBaseline = 'middle';
    g.fillText(AD_TEXTS[(i + Math.floor(rng() * 8)) % AD_TEXTS.length], i * cell + 14, c.height / 2 + 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

function drawBoard(g, w, h, home, away, clock, night) {
  g.fillStyle = night ? '#050b16' : '#0b1526';
  g.fillRect(0, 0, w, h);
  g.strokeStyle = '#f5c542'; g.lineWidth = h * 0.03;
  g.strokeRect(g.lineWidth, g.lineWidth, w - g.lineWidth * 2, h - g.lineWidth * 2);
  g.fillStyle = '#ffffff';
  g.font = `900 ${h * 0.34}px Arial`;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(`${home}  ${away}`, w / 2, h * 0.34);
  g.fillStyle = '#f5c542';
  g.font = `900 ${h * 0.30}px Arial`;
  g.fillText(clock, w / 2, h * 0.72);
}

export function makeScoreboard(home, away, night) {
  const c = canvasOf(512, 160);
  const g = c.getContext('2d');
  drawBoard(g, 512, 160, home, away, "00:00", night);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: tex });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 5), mat);
  mesh.userData.update = (hTxt, aTxt, clock) => {
    drawBoard(g, 512, 160, hTxt, aTxt, clock, night);
    tex.needsUpdate = true;
  };
  return mesh;
}

// ---------------------------------------------------------------- stadium
export function buildStadium(scene, opts) {
  const { quality = 'medium', night = false } = opts;
  const q = QUALITY[quality] || QUALITY.medium;
  const group = new THREE.Group();

  // pitch
  const pitchTex = makePitchTexture(quality === 'high');
  const pitch = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH.length + 14, PITCH.width + 14),
    new THREE.MeshLambertMaterial({ map: pitchTex })
  );
  pitch.rotation.x = -Math.PI / 2;
  if (q.shadows) pitch.receiveShadow = true;
  group.add(pitch);

  // goals
  const postMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const netMat = new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: true, transparent: true, opacity: 0.28 });
  for (const dir of [-1, 1]) {
    const goal = new THREE.Group();
    const gx = dir * HALF_LEN;
    const postGeo = new THREE.CylinderGeometry(0.07, 0.07, PITCH.goalHeight, 6);
    for (const s of [-1, 1]) {
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(gx, PITCH.goalHeight / 2, s * GOAL_HALF);
      goal.add(post);
    }
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, PITCH.goalWidth + 0.14, 6), postMat);
    bar.rotation.x = Math.PI / 2;
    bar.position.set(gx, PITCH.goalHeight, 0);
    goal.add(bar);
    // net: slanted back plane + side planes (wireframe)
    const back = new THREE.Mesh(new THREE.PlaneGeometry(PITCH.goalWidth, PITCH.goalHeight, 12, 5), netMat);
    back.position.set(gx + dir * PITCH.goalDepth, PITCH.goalHeight / 2, 0);
    back.rotation.y = dir * Math.PI / 2;
    goal.add(back);
    const top = new THREE.Mesh(new THREE.PlaneGeometry(PITCH.goalDepth, PITCH.goalWidth, 5, 12), netMat);
    top.rotation.x = Math.PI / 2; top.rotation.z = Math.PI / 2;
    top.position.set(gx + dir * PITCH.goalDepth / 2, PITCH.goalHeight, 0);
    goal.add(top);
    for (const s of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.PlaneGeometry(PITCH.goalDepth, PITCH.goalHeight, 5, 5), netMat);
      side.rotation.y = dir * Math.PI / 2;
      side.position.set(gx + dir * PITCH.goalDepth / 2, PITCH.goalHeight / 2, s * GOAL_HALF);
      goal.add(side);
    }
    group.add(goal);
  }

  // stands (four stepped blocks) + crowd
  const standMat = new THREE.MeshLambertMaterial({ color: night ? 0x232a38 : 0x39424f });
  const crowdGeo = new THREE.BoxGeometry(0.42, 0.55, 0.32);
  const crowdMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const crowdCount = q.crowd;
  const crowd = new THREE.InstancedMesh(crowdGeo, crowdMat, crowdCount);
  crowd.frustumCulled = false;
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const rng = mulberry32(4242);
  const palette = ['#e5484d', '#3e9bff', '#f5c542', '#2fae5c', '#ffffff', '#ff8a1e', '#8b5cf6', '#16a3b8', '#d9d9d9', '#20242a'];
  let ci = 0;

  function addStand(width, cx, cz, rotY) {
    const depth = 17, hBack = 15, hFront = 2;
    const stand = new THREE.Mesh(new THREE.BoxGeometry(width, 1, depth), standMat);
    // sloped stand: shear via rotation
    stand.geometry = new THREE.BoxGeometry(width, hBack - hFront, depth);
    stand.position.set(cx, (hBack + hFront) / 2, cz);
    stand.rotation.y = rotY;
    stand.rotation.x = rotY === 0 ? 0 : 0;
    // tilt towards pitch
    const tilt = 0.42;
    stand.rotation.x = Math.cos(rotY) * -tilt;
    stand.rotation.z = Math.sin(rotY) * tilt;
    group.add(stand);
    // crowd rows on the slope
    const rows = 9, perRow = Math.floor(crowdCount / 4 / rows);
    for (let r = 0; r < rows && ci < crowdCount; r++) {
      for (let i = 0; i < perRow && ci < crowdCount; i++) {
        const tRow = r / (rows - 1);
        const lateral = (i / perRow - 0.5) * width * 0.94 + (rng() - 0.5) * 1.2;
        const back = 1.2 + tRow * (depth - 2.5) + (rng() - 0.5) * 0.9;
        const h = hFront + 0.9 + tRow * (hBack - hFront - 1.2);
        // local → world depending on stand orientation
        let wx, wz, ry;
        if (rotY === 0) { wx = cx + lateral; wz = cz - Math.cos(0) * (cz > 0 ? back : -back); ry = cz > 0 ? Math.PI : 0; wz = cz > 0 ? cz - back : cz + back; }
        else { wz = cz + lateral; wx = cx > 0 ? cx - back : cx + back; ry = cx > 0 ? -Math.PI / 2 : Math.PI / 2; }
        dummy.position.set(wx, h, wz);
        dummy.rotation.set(0, ry + (rng() - 0.5) * 0.5, 0);
        dummy.scale.setScalar(0.85 + rng() * 0.5);
        dummy.updateMatrix();
        crowd.setMatrixAt(ci, dummy.matrix);
        color.set(palette[Math.floor(rng() * palette.length)]);
        crowd.setColorAt(ci, color);
        ci++;
      }
    }
  }
  addStand(PITCH.length + 34, 0, -(HALF_W + 17.5), 0);
  addStand(PITCH.length + 34, 0, (HALF_W + 17.5), 0);
  addStand(PITCH.width + 22, -(HALF_LEN + 17.5), 0, Math.PI / 2);
  addStand(PITCH.width + 22, (HALF_LEN + 17.5), 0, Math.PI / 2);
  crowd.instanceMatrix.needsUpdate = true;
  if (crowd.instanceColor) crowd.instanceColor.needsUpdate = true;
  group.add(crowd);

  // ad boards
  const adTex = makeAdTexture(quality === 'high');
  const boardMat = new THREE.MeshBasicMaterial({ map: adTex });
  const mkBoard = (w, x, z, ry) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.0), boardMat);
    m.position.set(x, 0.5, z);
    m.rotation.y = ry;
    group.add(m);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.0), boardMat);
    back.position.set(x, 0.5, z);
    back.rotation.y = ry + Math.PI;
    group.add(back);
  };
  const bOff = 1.2;
  adTex.repeat.set(PITCH.length / 16, 1);
  mkBoard(PITCH.length + 8, 0, -(HALF_W + bOff), 0);
  mkBoard(PITCH.length + 8, 0, (HALF_W + bOff), Math.PI);
  mkBoard(PITCH.width + 6, -(HALF_LEN + bOff), 0, Math.PI / 2);
  mkBoard(PITCH.width + 6, (HALF_LEN + bOff), 0, -Math.PI / 2);

  // floodlights
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x9aa3ad });
  const headMat = new THREE.MeshBasicMaterial({ color: night ? 0xfff6d8 : 0xcfd6dd });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const px = sx * (HALF_LEN + 12), pz = sz * (HALF_W + 12);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, 30, 6), poleMat);
    pole.position.set(px, 15, pz);
    group.add(pole);
    const head = new THREE.Mesh(new THREE.BoxGeometry(5.4, 3.0, 0.8), headMat);
    head.position.set(px, 30.5, pz);
    head.lookAt(0, 0, 0);
    group.add(head);
  }

  // scoreboard on north stand
  const board = makeScoreboard('HOME', 'AWAY', night);
  board.position.set(0, 18.5, -(HALF_W + 20));
  group.add(board);

  scene.add(group);
  return { board, crowd };
}

// ---------------------------------------------------------------- lighting & sky
export function setupLights(scene, night) {
  const hemi = new THREE.HemisphereLight(night ? 0x33415e : 0xbfdcff, night ? 0x0a1408 : 0x1c4423, night ? 0.75 : 1.0);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(night ? 0xcfdcff : 0xfff2d0, night ? 1.05 : 1.25);
  sun.position.set(-38, 55, 24);
  scene.add(sun);
  if (night) {
    const fill = new THREE.DirectionalLight(0x8fa8ff, 0.35);
    fill.position.set(40, 40, -30);
    scene.add(fill);
  }
  scene.background = new THREE.Color(night ? 0x060d1c : 0x87c4ec);
  scene.fog = new THREE.Fog(night ? 0x060d1c : 0x87c4ec, 120, 320);
  return { hemi, sun };
}

// ---------------------------------------------------------------- ball
export function makeBall() {
  const c = canvasOf(256, 256);
  const g = c.getContext('2d');
  g.fillStyle = '#f8f8f8'; g.fillRect(0, 0, 256, 256);
  g.fillStyle = '#14181d';
  const rng = mulberry32(5);
  for (let i = 0; i < 14; i++) {
    const x = rng() * 256, y = rng() * 256, r = 14 + rng() * 10;
    g.beginPath();
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2 - Math.PI / 2 + rng();
      const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
      if (k === 0) g.moveTo(px, py); else g.lineTo(px, py);
    }
    g.closePath(); g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 14, 12),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  return mesh;
}

// ---------------------------------------------------------------- instanced player figures
const MAX_FIGURES = 26; // 22 players + GK jersey variants handled by color, + spares

export function buildFigures(scene) {
  const torsoGeo = new THREE.CapsuleGeometry(0.17, 0.36, 3, 8);
  const headGeo = new THREE.SphereGeometry(0.115, 8, 8);
  const limbGeo = new THREE.CapsuleGeometry(0.052, 0.30, 3, 6);
  const shadowGeo = new THREE.CircleGeometry(0.32, 12);

  const white = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const skinMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x181c22 });
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 });

  const parts = {
    torso: new THREE.InstancedMesh(torsoGeo, white, MAX_FIGURES),
    head: new THREE.InstancedMesh(headGeo, skinMat, MAX_FIGURES),
    armL: new THREE.InstancedMesh(limbGeo, white, MAX_FIGURES),
    armR: new THREE.InstancedMesh(limbGeo, white, MAX_FIGURES),
    legL: new THREE.InstancedMesh(limbGeo, darkMat, MAX_FIGURES),
    legR: new THREE.InstancedMesh(limbGeo, darkMat, MAX_FIGURES),
    shadow: new THREE.InstancedMesh(shadowGeo, shadowMat, MAX_FIGURES)
  };
  for (const k in parts) {
    parts[k].frustumCulled = false;
    parts[k].count = 0;
    scene.add(parts[k]);
  }
  const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
  for (let i = 0; i < MAX_FIGURES; i++) for (const k in parts) parts[k].setMatrixAt(i, ZERO);

  const _m = new THREE.Matrix4();
  const _m2 = new THREE.Matrix4();
  const _p = new THREE.Vector3();
  const _q = new THREE.Quaternion();
  const _e = new THREE.Euler();
  const _s = new THREE.Vector3(1, 1, 1);
  const _col = new THREE.Color();

  function setPart(mesh, i, x, y, z, rx, ry, rz, sx = 1, sy = 1, sz = 1) {
    _p.set(x, y, z);
    _e.set(rx, ry, rz);
    _q.setFromEuler(_e);
    _s.set(sx, sy, sz);
    _m.compose(_p, _q, _s);
    mesh.setMatrixAt(i, _m);
  }

  return {
    MAX: MAX_FIGURES,
    meshes: parts,
    allocIndex: 0,
    allocate() { const i = this.allocIndex++; for (const k in parts) parts[k].count = this.allocIndex; return i; },
    setColor(i, { jersey, shorts, skin, socks }) {
      if (jersey) { _col.set(jersey); parts.torso.setColorAt(i, _col); parts.armL.setColorAt(i, _col); parts.armR.setColorAt(i, _col); }
      if (shorts) { /* legs use sock color below hip; approximate with socks */ }
      if (socks) { _col.set(socks); parts.legL.setColorAt(i, _col); parts.legR.setColorAt(i, _col); }
      if (skin) { _col.set(skin); parts.head.setColorAt(i, _col); }
      for (const k in parts) if (parts[k].instanceColor) parts[k].instanceColor.needsUpdate = true;
    },
    // state: {x,z,facing,speed01,phase,kick,dive,y}
    setFigure(i, st) {
      const hipH = 0.55;
      const bob = Math.abs(Math.cos(st.phase)) * 0.04 * st.speed01;
      const y = (st.y || 0) + bob;
      const lean = 0.14 * st.speed01 + (st.kick > 0 ? -0.1 : 0);
      const f = st.facing;

      if (st.dive > 0) {
        // goalkeeper dive: rotate whole body sideways
        const d = Math.min(1, st.dive);
        const rz = st.diveDir * (1.35 * d);
        const cy = 0.55 - 0.35 * d;
        setPart(parts.torso, i, st.x, cy + 0.12, st.z, 0, f, rz, 1, 1, 1);
        setPart(parts.head, i, st.x - Math.sin(rz) * 0.42, cy + 0.45 * Math.cos(rz), st.z, 0, f, rz);
        const armUp = -2.4 * d;
        setPart(parts.armL, i, st.x, cy + 0.3, st.z, 0, f, rz + armUp);
        setPart(parts.armR, i, st.x, cy + 0.3, st.z, 0, f, rz + armUp);
        setPart(parts.legL, i, st.x + Math.sin(rz) * 0.3, cy - 0.28, st.z, 0, f, rz, 1, 0.8, 1);
        setPart(parts.legR, i, st.x + Math.sin(rz) * 0.3, cy - 0.28, st.z, 0, f, rz, 1, 0.8, 1);
        setPart(parts.shadow, i, st.x, 0.02, st.z, -Math.PI / 2, 0, 0, 1 + d, 1, 1);
        return;
      }

      const swing = Math.sin(st.phase) * (0.35 + st.speed01 * 0.75);
      const kickR = st.kick > 0 ? Math.sin(Math.min(st.kick, 1) * Math.PI) : 0;
      // torso
      setPart(parts.torso, i, st.x, y + hipH + 0.26, st.z, lean, f, 0);
      // head
      const hx = st.x + Math.sin(f) * Math.sin(lean) * 0.4;
      setPart(parts.head, i, hx, y + hipH + 0.56, st.z, lean * 0.5, f, 0);
      // arms (pivot at shoulder height)
      const shY = y + hipH + 0.42;
      const off = 0.235;
      const lx = st.x + Math.cos(f) * -off, lz = st.z + Math.sin(f) * -off * -1;
      const rx = st.x + Math.cos(f) * off, rz = st.z + Math.sin(f) * off;
      setPart(parts.armL, i, lx, shY - 0.16 + Math.sin(swing) * 0.06, lz, -swing * 0.8 + lean, f, 0.12);
      setPart(parts.armR, i, rx, shY - 0.16 - Math.sin(swing) * 0.06, rz, swing * 0.8 + lean, f, -0.12);
      // legs (pivot at hip)
      const legSwingL = swing;
      const legSwingR = st.kick > 0 ? (1.1 - 2.5 * kickR) : -swing;
      setPart(parts.legL, i, st.x + Math.cos(f) * -0.095, y + hipH - 0.2, st.z - Math.sin(f) * -0.095 * -1, legSwingL, f, 0);
      setPart(parts.legR, i, st.x + Math.cos(f) * 0.095, y + hipH - 0.2, st.z + Math.sin(f) * 0.095 * -1, legSwingR, f, 0);
      // shadow
      setPart(parts.shadow, i, st.x, 0.02, st.z, -Math.PI / 2, 0, 0);
    },
    hide(i) { for (const k in parts) parts[k].setMatrixAt(i, ZERO); },
    flush() { for (const k in parts) parts[k].instanceMatrix.needsUpdate = true; }
  };
}

// ---------------------------------------------------------------- referee (single simple figure)
export function makeReferee() {
  const g = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color: 0xf2d43c });
  const dark = new THREE.MeshLambertMaterial({ color: 0x181c22 });
  const skin = new THREE.MeshLambertMaterial({ color: 0xc98d5e });
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.36, 3, 8), mat); torso.position.y = 0.95; g.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 8, 8), skin); head.position.y = 1.45; g.add(head);
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.052, 0.3, 3, 6), dark);
    leg.position.set(s * 0.095, 0.32, 0); g.add(leg);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.048, 0.26, 3, 6), mat);
    arm.position.set(s * 0.24, 1.05, 0); arm.rotation.z = s * 0.25; g.add(arm);
  }
  return g;
}
