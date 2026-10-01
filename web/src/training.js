// Training mode: free shooting range with target rings.
import * as THREE from 'three';
import { HALF_LEN, HALF_W, GOAL_HALF, PITCH } from './config.js';
import { clamp, el, vibrate } from './utils.js';
import { sfx } from './audio.js';
import { buildStadium, setupLights, makeBall, buildFigures } from './scene3d.js';
import { t } from './i18n.js';
import { getSave, persistSoon, addCoins, addXp } from './save.js';

const TARGETS = [
  { z: -2.7, y: 0.9 }, { z: 2.7, y: 0.9 },
  { z: -1.1, y: 2.0 }, { z: 1.1, y: 2.0 }
];

export class TrainingGame {
  constructor(canvas, opts = {}) {
    this.opts = opts;
    this.renderer = opts.renderer;
    this.home = opts.home;
    this.onFinish = opts.onFinish || (() => {});
    this.disposed = false;
    this.timeLeft = 60;
    this.score = 0;
    this.best = getSave().training.best || 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.3, 500);
    setupLights(this.scene, !!opts.night);
    buildStadium(this.scene, { quality: opts.quality || 'medium', night: !!opts.night });
    this.figures = buildFigures(this.scene);

    // rings
    this.rings = [];
    const ringGeo = new THREE.TorusGeometry(0.85, 0.09, 8, 24);
    for (const tp of TARGETS) {
      const mat = new THREE.MeshBasicMaterial({ color: 0xf5c542 });
      const ring = new THREE.Mesh(ringGeo, mat);
      ring.position.set(HALF_LEN - 0.3, tp.y, tp.z);
      ring.rotation.y = Math.PI / 2;
      this.scene.add(ring);
      this.rings.push({ mesh: ring, ...tp, flash: 0 });
    }

    // striker
    this.strikerFig = this.figures.allocate();
    this.figures.setColor(this.strikerFig, { jersey: this.home.color, socks: this.home.color2, skin: '#d8a878' });
    this.player = { x: HALF_LEN - 22, z: 0, facing: 0, phase: 0, speed01: 0, kick: 0 };

    this.ball = makeBall();
    this.scene.add(this.ball);
    this._respawnBall();

    this.camera.position.set(this.player.x - 8, 4.5, 0);
    this._look = new THREE.Vector3(HALF_LEN, 1.2, 0);

    this._buildHUD();
    this._bindSwipe();
    this._last = performance.now();
    this._loop = this._loop.bind(this);
    this._raf = requestAnimationFrame(this._loop);
  }

  _respawnBall() {
    this.ballState = { x: HALF_LEN - 18 - Math.random() * 8, z: (Math.random() * 2 - 1) * 14, flight: null };
    this.ball.position.set(this.ballState.x, 0.24, this.ballState.z);
    this.player.x = this.ballState.x - 1.4;
    this.player.z = this.ballState.z + 0.4;
  }

  _buildHUD() {
    const root = this.opts.hudRoot || document.getElementById('hud-root');
    this.hud = el('div');
    this.hud.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    root.appendChild(this.hud);
    this.info = el('div');
    this.info.style.cssText = 'position:absolute;top:12px;left:50%;transform:translateX(-50%);display:flex;gap:10px;';
    this.info.innerHTML = `
      <span class="chip gold">🎯 <span id="tr-score">0</span></span>
      <span class="chip">⏱ <span id="tr-time">60</span></span>
      <span class="chip">${t('best')}: <span id="tr-best">${this.best}</span></span>`;
    this.hud.appendChild(this.info);
    this.hint = el('div', 'muted center');
    this.hint.style.cssText = 'position:absolute;bottom:16px;left:0;right:0;font-weight:700;text-shadow:0 2px 6px #000;';
    this.hint.textContent = '⇡ Swipe toward the goal to shoot';
    this.hud.appendChild(this.hint);
    this.msg = el('div', 'match-msg'); this.msg.style.display = 'none';
    this.hud.appendChild(this.msg);
  }

  _bindSwipe() {
    this._down = null;
    const dn = (e) => { this._down = { x: e.clientX, y: e.clientY, t: performance.now() }; };
    const up = (e) => {
      if (!this._down || this.ballState.flight) return;
      const dx = e.clientX - this._down.x;
      const dy = e.clientY - this._down.y;
      const len = Math.hypot(dx, dy);
      this._down = null;
      if (len < 36) return;
      const power = clamp(len / 240, 0.3, 1);
      // swipe up = shoot; horizontal offset steers
      const steer = clamp(dx / 160, -1, 1);
      this._shoot(power, steer, dy < 0);
    };
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    this._unSwipe = () => { window.removeEventListener('pointerdown', dn); window.removeEventListener('pointerup', up); };
  }

  _shoot(power, steer, upward) {
    const b = this.ballState;
    const dist = HALF_LEN - b.x;
    const targetZ = clamp(steer * (GOAL_HALF + 1.2), -GOAL_HALF - 1.4, GOAL_HALF + 1.4);
    const targetY = clamp(power * (upward ? 2.6 : 1.6) - 0.2, 0.3, PITCH.goalHeight + 0.8);
    b.flight = { t: 0, dur: clamp(dist / (16 + power * 14), 0.35, 0.9), from: { x: b.x, z: b.z }, to: { x: HALF_LEN + 0.4, z: targetZ, y: targetY } };
    this.player.kick = 0.0001;
    sfx.kick(power);
    vibrate(15);
  }

  _flash(msg) {
    this.msg.innerHTML = `<div class="big" style="font-size:30px">${msg}</div>`;
    this.msg.style.display = 'block';
    clearTimeout(this._mt);
    this._mt = setTimeout(() => { this.msg.style.display = 'none'; }, 900);
  }

  _loop(now) {
    if (this.disposed) return;
    this._raf = requestAnimationFrame(this._loop);
    const dt = Math.min(0.05, (now - this._last) / 1000);
    this._last = now;

    if (this.timeLeft > 0) {
      this.timeLeft -= dt;
      const te = this.hud.querySelector('#tr-time');
      if (te) te.textContent = Math.max(0, Math.ceil(this.timeLeft));
      if (this.timeLeft <= 0) this._end();
    }

    const b = this.ballState;
    if (b.flight) {
      const f = b.flight;
      f.t += dt / f.dur;
      const k = clamp(f.t, 0, 1);
      const x = f.from.x + (f.to.x - f.from.x) * k;
      const z = f.from.z + (f.to.z - f.from.z) * k;
      const y = 0.24 + (f.to.y - 0.24) * k + Math.sin(k * Math.PI) * 1.1;
      this.ball.position.set(x, y, z);
      this.ball.rotation.x += dt * 16;
      if (k >= 1) {
        b.flight = null;
        // check rings
        let hit = false;
        for (const r of this.rings) {
          if (Math.abs(f.to.z - r.z) < 0.95 && Math.abs(f.to.y - r.y) < 0.95 && f.to.y < PITCH.goalHeight + 0.5) {
            hit = true; r.flash = 1;
            break;
          }
        }
        if (hit) {
          this.score++;
          const se = this.hud.querySelector('#tr-score');
          if (se) se.textContent = this.score;
          sfx.goal();
          this._flash('+1 ' + t('targets'));
          vibrate(30);
        } else {
          sfx.bounce();
        }
        setTimeout(() => { if (!this.disposed && this.timeLeft > 0) this._respawnBall(); }, 550);
      }
    }

    // ring flash decay + idle pulse
    for (const r of this.rings) {
      if (r.flash > 0) { r.flash -= dt * 1.6; r.mesh.material.color.setHex(0x41d17a); }
      else r.mesh.material.color.setHex(0xf5c542);
      r.mesh.scale.setScalar(1 + Math.sin(now / 400 + r.z) * 0.05 + r.flash * 0.3);
    }

    if (this.player.kick > 0 && this.player.kick < 1) this.player.kick += dt * 2.8;
    this.figures.setFigure(this.strikerFig, { x: this.player.x, z: this.player.z, facing: this.player.facing, speed01: 0, phase: this.player.phase, kick: this.player.kick, dive: 0 });
    this.figures.flush();

    this.camera.position.x = this.ballState.x - 8;
    this.camera.position.z = this.ballState.z * 0.3;
    this.camera.lookAt(this._look.x, this._look.y, this.ballState.z * 0.4);

    this.renderer.render(this.scene, this.camera);
  }

  _end() {
    const save = getSave();
    if (this.score > (save.training.best || 0)) save.training.best = this.score;
    const coins = this.score * 15 + 20;
    addCoins(coins);
    addXp(30 + this.score * 3);
    persistSoon();
    this.onFinish({ score: this.score, coins, best: save.training.best });
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this._raf);
    if (this._unSwipe) this._unSwipe();
    clearTimeout(this._mt);
    if (this.hud && this.hud.parentNode) this.hud.parentNode.removeChild(this.hud);
    this.scene.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of ms) { if (m.map) m.map.dispose(); m.dispose(); }
      }
    });
  }
}
