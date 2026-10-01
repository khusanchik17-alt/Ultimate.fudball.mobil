// Penalty shootout mode.
import * as THREE from 'three';
import { HALF_LEN, GOAL_HALF, PITCH } from './config.js';
import { clamp, el, vibrate } from './utils.js';
import { sfx, crowdExcitement } from './audio.js';
import { buildStadium, setupLights, makeBall, buildFigures } from './scene3d.js';
import { DIFFICULTIES } from './data.js';
import { t } from './i18n.js';
import { applyMatchResult } from './meta.js';

const ZONES = [ // [z, y] target points inside the goal (attacking +x)
  [-2.5, 0.7], [0, 0.7], [2.5, 0.7],
  [-2.2, 1.9], [0, 1.9], [2.2, 1.9]
];

export class PenaltyGame {
  constructor(canvas, opts = {}) {
    this.opts = opts;
    this.renderer = opts.renderer;
    this.diff = DIFFICULTIES[opts.difficulty] || DIFFICULTIES.normal;
    this.home = opts.home; this.away = opts.away;
    this.onFinish = opts.onFinish || (() => {});
    this.disposed = false;

    this.kicks = [];              // {by: 0|1, result: 'goal'|'saved'|'miss'}
    this.totalPerSide = 5;
    this.phase = 'ready';         // ready | flight | result | done
    this.userToShoot = true;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.3, 500);
    setupLights(this.scene, !!opts.night);
    buildStadium(this.scene, { quality: opts.quality || 'medium', night: !!opts.night });
    this.figures = buildFigures(this.scene);

    this.spot = { x: HALF_LEN - 11, z: 0 };
    const skins = '#d8a878';
    this.keeperFig = this.figures.allocate();
    this.figures.setColor(this.keeperFig, { jersey: this.away.color, socks: this.away.color2, skin: skins });
    this.strikerFig = this.figures.allocate();
    this.figures.setColor(this.strikerFig, { jersey: this.home.color, socks: this.home.color2, skin: skins });

    this.gk = { x: HALF_LEN - 0.4, z: 0, facing: Math.PI, diveT: 0, diveDir: 1, phase: 0, speed01: 0, kick: 0 };
    this.striker = { x: this.spot.x - 1.6, z: 0.4, facing: 0, diveT: 0, phase: 0, speed01: 0, kick: 0 };

    this.ball = makeBall();
    this.ball.position.set(this.spot.x, 0.24, 0);
    this.scene.add(this.ball);

    this.camera.position.set(this.spot.x - 6.5, 2.6, 0);
    this._look = new THREE.Vector3(HALF_LEN, 1.2, 0);
    this.camera.lookAt(this._look);

    this._buildHUD();
    this._last = performance.now();
    this._loop = this._loop.bind(this);
    this._raf = requestAnimationFrame(this._loop);
    this._promptUser();
  }

  _buildHUD() {
    const root = this.opts.hudRoot || document.getElementById('hud-root');
    this.hud = el('div');
    this.hud.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    root.appendChild(this.hud);

    this.title = el('div', 'match-msg');
    this.title.style.top = '16%';
    this.hud.appendChild(this.title);

    // kick dots
    this.dots = el('div');
    this.dots.style.cssText = 'position:absolute;top:12px;left:50%;transform:translateX(-50%);display:flex;gap:22px;background:rgba(5,18,10,0.8);padding:8px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.14);';
    this.hud.appendChild(this.dots);
    this._renderDots();

    this.grid = el('div', 'penal-grid');
    this.grid.style.cssText += ';position:absolute;bottom:26px;left:50%;transform:translateX(-50%);pointer-events:auto;display:none;';
    const labels = ['◤', '▲', '◥', '◀', '●', '▶'];
    for (let i = 0; i < 6; i++) {
      const c = el('div', 'penal-cell', labels[i]);
      c.addEventListener('pointerdown', (e) => { e.preventDefault(); this._pick(i); });
      this.grid.appendChild(c);
    }
    this.hud.appendChild(this.grid);
  }

  _renderDots() {
    const dot = (k) => {
      let cls = '#666';
      if (k) cls = k.result === 'goal' ? '#41d17a' : k.result === 'saved' ? '#3e9bff' : '#e5484d';
      return `<span style="width:12px;height:12px;border-radius:50%;display:inline-block;background:${cls};border:1px solid rgba(255,255,255,.3)"></span>`;
    };
    const mine = [], theirs = [];
    for (let i = 0; i < Math.max(this.totalPerSide, this.kicks.filter(k => k.by === 0).length); i++) mine.push(dot(this.kicks.filter(k => k.by === 0)[i]));
    for (let i = 0; i < Math.max(this.totalPerSide, this.kicks.filter(k => k.by === 1).length); i++) theirs.push(dot(this.kicks.filter(k => k.by === 1)[i]));
    this.dots.innerHTML = `
      <div style="text-align:center;font-size:11px;font-weight:800;color:${this.home.color === '#f2f2f2' ? '#fff' : this.home.color}">${this.home.short}<div style="display:flex;gap:5px;margin-top:4px">${mine.join('')}</div></div>
      <div style="text-align:center;font-size:11px;font-weight:800;color:${this.away.color === '#f2f2f2' ? '#fff' : this.away.color}">${this.away.short}<div style="display:flex;gap:5px;margin-top:4px">${theirs.join('')}</div></div>`;
  }

  _promptUser() {
    if (this.disposed) return;
    this.userToShoot = this.kicks.filter(k => k.by === 0).length <= this.kicks.filter(k => k.by === 1).length;
    this.title.innerHTML = `<div class="big" style="font-size:30px">${this.userToShoot ? t('your_shot') : t('your_save')}</div><div class="small">${this.userToShoot ? t('shoot_hint') : t('save_hint')}</div>`;
    this.title.style.display = 'block';
    this.grid.style.display = 'grid';
    this.phase = 'ready';
    // reset positions
    this.gk.diveT = 0; this.gk.z = 0;
    this.striker.kick = 0;
    this.striker.x = this.spot.x - 1.6; this.striker.z = 0.4;
    this.ball.position.set(this.spot.x, 0.24, 0);
  }

  _pick(zone) {
    if (this.phase !== 'ready') return;
    sfx.click();
    this.grid.style.display = 'none';
    this.title.style.display = 'none';
    this.phase = 'flight';

    if (this.userToShoot) {
      // keeper AI reads the shot
      const read = Math.random() < this.diff.gk * 0.85;
      const gkZone = read ? zone : Math.floor(Math.random() * 6);
      const miss = Math.random() < 0.07;
      this._animateShot(zone, gkZone, miss, 0);
    } else {
      // AI shooter picks zone, user picks dive
      const rng = Math.random();
      const aiZone = rng < 0.6 ? [0, 2, 3, 5][Math.floor(Math.random() * 4)] : Math.floor(Math.random() * 6);
      const miss = Math.random() < 0.10;
      this._animateShot(aiZone, zone, miss, 1);
    }
  }

  _animateShot(zone, gkZone, miss, by) {
    this._flight = { t: 0, zone, gkZone, miss, by };
    this.striker.kick = 0.0001;
    sfx.kick(0.9);
    vibrate(20);
    // keeper dives toward gkZone column
    const colZ = ZONES[gkZone][0];
    this.gk.diveDir = Math.sign(colZ) || (Math.random() > 0.5 ? 1 : -1);
    if (gkZone % 3 === 1) this.gk.diveDir = Math.random() > 0.5 ? 1 : -1; // centre: small hop
    setTimeout(() => { if (!this.disposed) this.gk.diveT = 0.0001; }, 120);
  }

  _finishKick(result, by) {
    this.kicks.push({ by, result });
    this._renderDots();
    if (result === 'goal') { sfx.goal(); crowdExcitement(1, 3); vibrate(50); }
    else if (result === 'saved') { sfx.catchBall(); }
    else { sfx.post(); }
    const label = result === 'goal' ? t('scored') : result === 'saved' ? t('saved') : t('missed');
    this.title.innerHTML = `<div class="big" style="font-size:34px">${label}</div>`;
    this.title.style.display = 'block';
    this.phase = 'result';
    setTimeout(() => { if (this.disposed) return; this.title.style.display = 'none'; this._nextOrEnd(); }, 1300);
  }

  _nextOrEnd() {
    const mine = this.kicks.filter(k => k.by === 0);
    const theirs = this.kicks.filter(k => k.by === 1);
    const myG = mine.filter(k => k.result === 'goal').length;
    const thG = theirs.filter(k => k.result === 'goal').length;
    const myLeft = Math.max(0, this.totalPerSide - mine.length);
    const thLeft = Math.max(0, this.totalPerSide - theirs.length);
    let over = false;
    if (mine.length >= this.totalPerSide && theirs.length >= this.totalPerSide) {
      over = myG !== thG;                     // sudden death: both kicked this round
      if (!over && mine.length === theirs.length && myG !== thG) over = true;
    } else {
      if (myG > thG + thLeft || thG > myG + myLeft) over = true;
    }
    if (over) {
      this.phase = 'done';
      const win = myG > thG;
      const res = {
        userScore: myG, oppScore: thG, result: win ? 'win' : 'lose',
        home: this.home, away: this.away, difficulty: this.opts.difficulty || 'normal', mode: 'penalty'
      };
      this.title.innerHTML = `<div class="big">${win ? t('you_win') : t('you_lose')}</div><div class="small">${myG} - ${thG}</div>`;
      this.title.style.display = 'block';
      setTimeout(() => this.onFinish(res), 1400);
      return;
    }
    this._promptUser();
  }

  _loop(now) {
    if (this.disposed) return;
    this._raf = requestAnimationFrame(this._loop);
    const dt = Math.min(0.05, (now - this._last) / 1000);
    this._last = now;

    if (this._flight) {
      const f = this._flight;
      f.t += dt / 0.72;
      const [tz, ty] = ZONES[f.zone];
      let endZ = tz, endY = ty;
      if (f.miss) {
        if (Math.random() < 0.5 && !f._missSet) { f._missSet = true; f.missZ = Math.random() < 0.5 ? -GOAL_HALF - 0.7 : GOAL_HALF + 0.7; f.missY = ty; }
        if (f.missZ !== undefined) endZ = f.missZ; else endY = PITCH.goalHeight + 0.9;
      }
      const k = clamp(f.t, 0, 1);
      const x = this.spot.x + (HALF_LEN + 0.3 - this.spot.x) * k;
      const y = 0.24 + (endY - 0.24) * k + Math.sin(k * Math.PI) * 0.7;
      const z = endZ * k;
      this.ball.position.set(x, y, z);
      this.ball.rotation.x += dt * 14;
      // striker run-up
      this.striker.x = Math.min(this.spot.x - 0.5, this.striker.x + dt * 3.4);
      this.striker.phase += dt * 12;
      this.striker.speed01 = 0.7;
      if (f.t >= 1) {
        const fl = this._flight; this._flight = null;
        // outcome
        let result;
        if (fl.miss) result = 'miss';
        else {
          const sameZone = fl.gkZone === fl.zone;
          const sameCol = fl.gkZone % 3 === fl.zone % 3;
          const saveP = sameZone ? 0.8 : sameCol ? 0.3 : 0.04;
          result = Math.random() < saveP ? 'saved' : 'goal';
        }
        this._finishKick(result, fl.by);
      }
    }

    // figures
    if (this.striker.kick > 0 && this.striker.kick < 1) this.striker.kick += dt * 2.6;
    this.figures.setFigure(this.strikerFig, { x: this.striker.x, z: this.striker.z, facing: this.striker.facing, speed01: this.striker.speed01, phase: this.striker.phase, kick: this.striker.kick, dive: 0 });
    if (this.gk.diveT > 0) this.gk.diveT = Math.min(1.2, this.gk.diveT + dt * 2.2);
    this.figures.setFigure(this.keeperFig, { x: this.gk.x, z: this.gk.z, facing: this.gk.facing, speed01: 0, phase: 0, kick: 0, dive: this.gk.diveT, diveDir: this.gk.diveDir });
    this.figures.flush();

    // subtle camera sway
    this.camera.position.z = Math.sin(now / 2600) * 0.4;
    this.camera.lookAt(this._look);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this._raf);
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
