// 11v11 match engine: simulation, AI, ball physics, controls, broadcast camera, HUD.
import * as THREE from 'three';
import { PITCH, HALF_LEN, HALF_W, GOAL_HALF, MATCH_LENGTHS, QUALITY } from './config.js';
import { clamp, clamp01, lerp, lerpAngle, normAngle, fmtClock, vibrate, el } from './utils.js';
import { sfx, crowdExcitement } from './audio.js';
import { DIFFICULTIES, roleOf, FORMATIONS } from './data.js';
import { buildStadium, setupLights, makeBall, buildFigures, makeReferee } from './scene3d.js';
import { t } from './i18n.js';

const BASE_SPEED = 6.1;
const SPRINT_MULT = 1.42;
const T = { KICKOFF: 0, PLAY: 1, GOAL: 2, HALFTIME: 3, FULLTIME: 4, RESTART: 5, PAUSED: 6 };

export class MatchGame {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.opts = opts;
    this.home = opts.home; this.away = opts.away;
    this.homeXI = opts.homeXI; this.awayXI = opts.awayXI;     // arrays of player objects
    this.userSide = 0;                                        // user controls home
    this.diff = DIFFICULTIES[opts.difficulty] || DIFFICULTIES.normal;
    this.totalSec = MATCH_LENGTHS[opts.length || 'normal'] || 300;
    this.night = !!opts.night;
    this.onFinish = opts.onFinish || (() => {});
    this.allowDraw = opts.allowDraw !== false;

    this.quality = opts.quality || 'medium';
    this.targetFps = opts.fps || 60;
    this.camSens = opts.cameraSens !== undefined ? opts.cameraSens : 0.6;

    this.state = T.KICKOFF;
    this.prevState = T.KICKOFF;
    this.stateTimer = 0;
    this.clock = 0;                 // elapsed real seconds of play
    this.half = 1;
    this.score = [0, 0];
    this.kickoffTeam = 0;
    this.finished = false;
    this.disposed = false;

    this.joy = { x: 0, y: 0, active: false };
    this.buttons = {};              // button id -> held
    this.controlled = null;
    this.lastShootTap = -10;
    this.shootCharge = -1;          // -1 idle, >=0 charging
    this.passHoldStart = -1;
    this.pressHeld = false;

    this._setupScene();
    this._setupTeams();
    this._setupBall();
    this._setupHUD();
    this._setupInput();

    this._acc = 0;
    this._last = performance.now();
    this._raf = 0;
    this._frameToggle = false;
    this._loop = this._loop.bind(this);
    this._raf = requestAnimationFrame(this._loop);
    this._setState(T.KICKOFF, 1.4);
  }

  // ------------------------------------------------------------ scene
  _setupScene() {
    this.renderer = this.opts.renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.5, 500);
    this.camera.position.set(0, 18, HALF_W + 16);
    this.camera.lookAt(0, 0, 0);
    setupLights(this.scene, this.night);
    this.stadium = buildStadium(this.scene, { quality: this.quality, night: this.night });
    this.figures = buildFigures(this.scene);
    this.referee = makeReferee();
    this.referee.position.set(3, 0, 5);
    this.scene.add(this.referee);
    this.marker = new THREE.Mesh(
      new THREE.ConeGeometry(0.32, 0.6, 4),
      new THREE.MeshBasicMaterial({ color: 0xf5c542 })
    );
    this.marker.rotation.x = Math.PI;
    this.scene.add(this.marker);
    this._onResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', this._onResize);
  }

  _setupTeams() {
    this.teams = [
      this._makeTeam(this.home, this.homeXI, +1, this.opts.homeFormation || '4-3-3'),
      this._makeTeam(this.away, this.awayXI, -1, this.opts.awayFormation || '4-3-3')
    ];
    this.players = [...this.teams[0].players, ...this.teams[1].players];
  }

  _makeTeam(club, xi, attackDir, formation) {
    const team = { club, attackDir, players: [], possession: false, passTarget: null, slots: FORMATIONS[formation] || FORMATIONS['4-3-3'] };
    const skins = ['#e8b98c', '#c98d5e', '#9c6b43', '#f0cba4', '#7d5233'];
    xi.forEach((p, i) => {
      const fig = this.figures.allocate();
      const ent = {
        id: p.id, stats: p, team, idx: i, fig,
        pos: p.pos, role: roleOf(p.pos),
        anchor: { x: 0, y: 0 },
        x: 0, z: 0, vx: 0, vz: 0, facing: attackDir > 0 ? 0 : Math.PI,
        phase: Math.random() * 6, speed01: 0,
        hasBall: false, kickAnim: 0, diveT: 0, diveDir: 1,
        stamina: 100, sprinting: false,
        thinkT: Math.random() * 0.3,
        isUser: false, burstT: 0
      };
      this.figures.setColor(fig, {
        jersey: club.color, socks: club.color2, skin: skins[(p.seed || i) % skins.length]
      });
      team.players.push(ent);
    });
    team.gk = team.players.find(p => p.role === 'GK') || team.players[0];
    return team;
  }

  _setupBall() {
    this.ballMesh = makeBall();
    this.scene.add(this.ballMesh);
    this.ball = { x: 0, y: 0.24, z: 0, vx: 0, vy: 0, vz: 0, spin: 0, owner: null, lastTeam: -1, rolling: true };
  }

  _formationPoint(team, slotIdx, out) {
    const s = team.slots[slotIdx] || team.slots[0];
    const a = team.attackDir;
    out.x = a * (s.x * PITCH.length - HALF_LEN);
    out.y = s.y * HALF_W * 0.9;
  }

  // ------------------------------------------------------------ HUD
  _setupHUD() {
    const hud = this.opts.hudRoot || document.getElementById('hud-root');
    this.hud = el('div', 'match-hud');
    this.hud.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    hud.appendChild(this.hud);

    // top scoreboard
    const top = el('div', 'hud-top');
    const sw = c => `<span class="sw" style="background:${c.color}"></span>`;
    top.innerHTML = `
      <div class="team">${sw(this.home)}<span>${this.home.short}</span></div>
      <div class="score"><span id="hud-hs">0</span><span style="opacity:.5">:</span><span id="hud-as">0</span></div>
      <div class="team"><span>${this.away.short}</span>${sw(this.away)}</div>
      <div class="clock" id="hud-clock">00:00</div>`;
    this.hud.appendChild(top);
    this.elHS = top.querySelector('#hud-hs');
    this.elAS = top.querySelector('#hud-as');
    this.elClock = top.querySelector('#hud-clock');

    // pause
    const pause = el('button', 'hud-pause', '❚❚');
    pause.style.pointerEvents = 'auto';
    pause.addEventListener('click', () => { sfx.click(); this.openPause(); });
    this.hud.appendChild(pause);

    // joystick
    this.joyZone = el('div', 'ctl-joy');
    this.joyBase = el('div', 'base'); this.joyKnob = el('div', 'knob');
    this.joyZone.appendChild(this.joyBase); this.joyZone.appendChild(this.joyKnob);
    const js = this.opts.joystickSize || 1;
    this.joyBase.style.width = this.joyBase.style.height = `${128 * js}px`;
    this.joyKnob.style.width = this.joyKnob.style.height = `${56 * js}px`;
    this.joyZone.style.pointerEvents = 'auto';
    this.hud.appendChild(this.joyZone);

    // action buttons
    this.btnWrap = el('div', 'ctl-btns');
    this.btnWrap.style.pointerEvents = 'auto';
    this.hud.appendChild(this.btnWrap);
    this._makeButtons(true);

    // power bar
    this.powerBar = el('div', 'power-bar'); this.powerFill = el('i');
    this.powerBar.appendChild(this.powerFill);
    this.hud.appendChild(this.powerBar);

    // messages
    this.msg = el('div', 'match-msg'); this.msg.style.display = 'none';
    this.hud.appendChild(this.msg);
  }

  _makeButtons(attack) {
    this.btnWrap.innerHTML = '';
    this.btnEls = {};
    const defs = attack
      ? [['pass', t('pass'), '⤴'], ['shoot', t('shoot'), '⚽', 'gold'], ['through', t('through'), '↗'], ['sprint', t('sprint'), '⚡', 'wide']]
      : [['tackle', t('tackle'), '⛔', 'red'], ['press', t('press'), '🏃'], ['switch', t('switchp'), '🔄'], ['sprint', t('sprint'), '⚡', 'wide']];
    for (const [id, label, ico, cls] of defs) {
      const b = el('button', 'ctl-btn' + (cls ? ' ' + cls : ''), `<span class="em">${ico}</span><span>${label}</span>`);
      this._bindAction(b, id);
      this.btnWrap.appendChild(b);
      this.btnEls[id] = b;
    }
    this.attackButtons = attack;
  }

  _bindAction(elm, id) {
    const down = (e) => {
      e.preventDefault();
      elm.classList.add('active');
      this.buttons[id] = true;
      this._onButtonDown(id);
    };
    const up = (e) => {
      if (e) e.preventDefault();
      elm.classList.remove('active');
      if (!this.buttons[id]) return;
      this.buttons[id] = false;
      this._onButtonUp(id);
    };
    elm.addEventListener('pointerdown', down);
    elm.addEventListener('pointerup', up);
    elm.addEventListener('pointercancel', up);
    elm.addEventListener('pointerleave', up);
  }

  // ------------------------------------------------------------ input
  _setupInput() {
    this._joyId = null;
    this._joyOrigin = { x: 0, y: 0 };
    const zone = this.joyZone;
    const R = () => parseFloat(this.joyBase.style.width) / 2 || 64;

    const setKnob = (dx, dy) => {
      const r = R();
      const len = Math.hypot(dx, dy);
      const k = len > r ? r / len : 1;
      const nx = dx * k, ny = dy * k;
      this.joyKnob.style.left = `${this._joyOrigin.x + nx}px`;
      this.joyKnob.style.top = `${this._joyOrigin.y + ny}px`;
      this.joy.x = clamp01(nx / r) * (Math.abs(nx / r) > 0.14 ? 1 : 0) * Math.min(1, len / r + 0.15);
      this.joy.y = clamp01(ny / r) * (Math.abs(ny / r) > 0.14 ? 1 : 0) * Math.min(1, len / r + 0.15);
      // preserve direction with deadzone
      if (len / r < 0.14) { this.joy.x = 0; this.joy.y = 0; }
      else { this.joy.x = (dx / len) * Math.min(1, len / r); this.joy.y = (dy / len) * Math.min(1, len / r); }
    };

    zone.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (this._joyId !== null) return;
      this._joyId = e.pointerId;
      this._joyOrigin = { x: e.clientX, y: e.clientY };
      zone.setPointerCapture(e.pointerId);
      this.joyBase.style.display = this.joyKnob.style.display = 'block';
      this.joyBase.style.left = this.joyKnob.style.left = `${e.clientX}px`;
      this.joyBase.style.top = this.joyKnob.style.top = `${e.clientY}px`;
      this.joy.active = true;
      setKnob(0, 0);
    });
    const move = (e) => {
      if (e.pointerId !== this._joyId) return;
      setKnob(e.clientX - this._joyOrigin.x, e.clientY - this._joyOrigin.y);
    };
    const end = (e) => {
      if (e.pointerId !== this._joyId) return;
      this._joyId = null;
      this.joy.active = false; this.joy.x = 0; this.joy.y = 0;
      this.joyBase.style.display = this.joyKnob.style.display = 'none';
    };
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', end);

    this._keyDown = (e) => {
      const map = { KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right', ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
      if (map[e.code]) { this._keys = this._keys || {}; this._keys[map[e.code]] = true; }
      if (e.code === 'Space') this._onButtonDown('shoot');
      if (e.code === 'KeyX') this._onButtonDown('pass');
      if (e.code === 'KeyC') this._onButtonDown('tackle');
      if (e.code === 'ShiftLeft') this.buttons.sprint = true;
      if (e.code === 'Escape') this.openPause();
    };
    this._keyUp = (e) => {
      const map = { KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right', ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
      if (map[e.code] && this._keys) this._keys[map[e.code]] = false;
      if (e.code === 'Space') this._onButtonUp('shoot');
      if (e.code === 'KeyX') this._onButtonUp('pass');
      if (e.code === 'ShiftLeft') this.buttons.sprint = false;
    };
    window.addEventListener('keydown', this._keyDown);
    window.addEventListener('keyup', this._keyUp);
  }

  _keyboardVec() {
    const k = this._keys;
    if (!k) return null;
    let x = 0, y = 0;
    if (k.left) x -= 1; if (k.right) x += 1;
    if (k.up) y -= 1; if (k.down) y += 1;
    if (!x && !y) return null;
    const l = Math.hypot(x, y);
    return { x: x / l, y: y / l };
  }

  // ------------------------------------------------------------ buttons
  _onButtonDown(id) {
    if (this.state === T.PAUSED) return;
    const me = this.controlled;
    const userHasBall = me && me.hasBall;
    if (id === 'shoot') {
      if (userHasBall) {
        if (this._pendingTap) {
          // second quick tap → chip shot
          clearTimeout(this._pendingTap.timer);
          this._pendingTap = null;
          this._doShoot(0.25, true);
          return;
        }
        this.shootCharge = 0;
        this.powerBar.style.display = 'block';
      }
    }
    if (id === 'pass') { if (userHasBall) this.passHoldStart = performance.now() / 1000; }
    if (id === 'through') { if (userHasBall) this._doPass(true); }
    if (id === 'tackle') this._doTackle();
    if (id === 'switch') this._doSwitch();
    if (id === 'press') this.pressHeld = true;
  }

  _onButtonUp(id) {
    if (id === 'shoot') {
      if (this.shootCharge >= 0 && this.controlled && this.controlled.hasBall) {
        const ch = this.shootCharge;
        this.shootCharge = -1;
        this.powerBar.style.display = 'none';
        this.powerFill.style.width = '0%';
        if (ch < 0.20) {
          // quick tap: wait briefly in case a second tap (chip) follows
          this._pendingTap = {
            timer: setTimeout(() => {
              this._pendingTap = null;
              if (this.controlled && this.controlled.hasBall) this._doShoot(ch, false);
            }, 250)
          };
        } else {
          this._doShoot(ch, false);
        }
        return;
      }
      this.shootCharge = -1;
      this.powerBar.style.display = 'none';
      this.powerFill.style.width = '0%';
    }
    if (id === 'pass') {
      if (this.passHoldStart >= 0 && this.controlled && this.controlled.hasBall) {
        const held = performance.now() / 1000 - this.passHoldStart;
        this._doPass(false, held > 0.34);
      }
      this.passHoldStart = -1;
    }
    if (id === 'press') this.pressHeld = false;
  }

  // ------------------------------------------------------------ actions
  _goalCenter(teamIdx) {
    const a = this.teams[teamIdx].attackDir;
    return { x: a * HALF_LEN, z: 0 };
  }

  _doShoot(charge, chip = false) {
    const me = this.controlled;
    if (!me || !me.hasBall) return;
    const teamIdx = this.teams.indexOf(me.team);
    const goal = this._goalCenter(teamIdx);
    const dx = goal.x - me.x, dz = goal.z - me.z;
    const dist = Math.hypot(dx, dz);
    let dirX = this.joy.x, dirZ = this.joy.y;
    if (Math.hypot(dirX, dirZ) < 0.25) { dirX = dx / dist; dirZ = dz / dist; }
    else { const l = Math.hypot(dirX, dirZ); dirX /= l; dirZ /= l; }
    // aim assist: blend toward goal
    const blend = chip ? 0.35 : (charge > 0.6 ? 0.45 : 0.7);
    dirX = lerp(dirX, dx / dist, blend); dirZ = lerp(dirZ, dz / dist, blend);
    const dl = Math.hypot(dirX, dirZ) || 1; dirX /= dl; dirZ /= dl;

    let speed, vy, spin = 0, finesse = false;
    if (chip) {
      speed = 11 + dist * 0.10; vy = 5.2 + dist * 0.10;
    } else if (charge < 0.18 && dist > 12) {
      finesse = true;
      speed = 13.5 + dist * 0.12; vy = 1.1;
      // curve toward far corner
      const side = dz > 0 ? -1 : 1;
      spin = side * 1.6;
      dirZ += side * 0.16;
    } else {
      const p = clamp01(charge);
      speed = 14 + p * 15 + dist * 0.06;
      vy = 0.8 + p * 2.4 + Math.max(0, dist - 18) * 0.06;
      const err = (1 - p * 0.55) * 0.05 + Math.max(0, p - 0.85) * 0.35;
      const a = Math.atan2(dirZ, dirX) + (Math.random() * 2 - 1) * err;
      dirX = Math.cos(a); dirZ = Math.sin(a);
    }
    // shooter skill → accuracy
    const skill = (me.stats.shooting || 60) / 100;
    const spread = (1 - skill) * 0.10 * (finesse ? 0.4 : 1);
    const aa = Math.atan2(dirZ, dirX) + (Math.random() * 2 - 1) * spread;
    dirX = Math.cos(aa); dirZ = Math.sin(aa);

    this._kickBall(me, dirX * speed, vy, dirZ * speed, spin);
    me.kickAnim = 0.0001;
    sfx.kick(clamp01(charge));
    vibrate(18);
  }

  _doPass(through, long) {
    const me = this.controlled;
    if (!me || !me.hasBall) return;
    const teamIdx = this.teams.indexOf(me.team);
    const mates = me.team.players.filter(p => p !== me && p.role !== 'GK');
    let jx = this.joy.x, jz = this.joy.y;
    if (Math.hypot(jx, jz) < 0.2) { jx = me.team.attackDir; jz = 0; }
    const jl = Math.hypot(jx, jz) || 1; jx /= jl; jz /= jl;

    let best = null, bestScore = -1e9;
    for (const m of mates) {
      const dx = m.x - me.x, dz = m.z - me.z;
      const d = Math.hypot(dx, dz);
      if (d < 2 || d > 55) continue;
      const align = (dx / d) * jx + (dz / d) * jz;
      if (through) {
        const ahead = (dx * me.team.attackDir) / d;
        const score = align * 1.2 + ahead * 1.6 - Math.abs(d - 22) * 0.02;
        if (score > bestScore) { bestScore = score; best = m; }
      } else if (long) {
        const score = align * 1.5 + Math.min(1, d / 40) * 1.2;
        if (score > bestScore) { bestScore = score; best = m; }
      } else {
        const openness = this._openness(m);
        const score = align * 1.6 - Math.abs(d - 12) * 0.03 + openness * 0.9;
        if (score > bestScore) { bestScore = score; best = m; }
      }
    }
    if (!best) { this._doShoot(0.25); return; }

    const skill = (me.stats.passing || 60) / 100;
    let tx = best.x, tz = best.z;
    if (through) {
      tx += best.vx * 0.7 + me.team.attackDir * 6;
      tz += best.vz * 0.7;
    }
    const dx = tx - me.x, dz = tz - me.z;
    const d = Math.hypot(dx, dz) || 1;
    const err = (1 - skill) * 0.22 + this.diff.passErr * 0.0;
    const ang = Math.atan2(dz, dx) + (Math.random() * 2 - 1) * err;
    let speed = clamp(d * 1.15, 9, long ? 30 : 22);
    const vy = long ? 4.5 + d * 0.05 : (through ? 1.6 : 0.35);
    this._kickBall(me, Math.cos(ang) * speed, vy, Math.sin(ang) * speed, 0);
    me.kickAnim = 0.0001;
    me.team.passTarget = best;
    sfx.pass();
  }

  _openness(p) {
    let minD = 99;
    for (const o of this.players) {
      if (o.team === p.team) continue;
      const d = Math.hypot(o.x - p.x, o.z - p.z);
      if (d < minD) minD = d;
    }
    return clamp01(minD / 8);
  }

  _doTackle() {
    const me = this.controlled;
    if (!me) return;
    const holder = this.ball.owner;
    if (!holder || holder.team === me.team) return;
    const d = Math.hypot(holder.x - me.x, holder.z - me.z);
    if (d > 2.6) {
      // lunge forward
      me.vx += Math.cos(me.facing) * 7; me.vz += Math.sin(me.facing) * 7;
      return;
    }
    const myDef = (me.stats.defending || 55) + (me.stats.physical || 55) * 0.3;
    const oppDrib = (holder.stats.dribbling || 55) + (holder.stats.speed || 55) * 0.2;
    let p = clamp(0.42 + (myDef - oppDrib) * 0.006, 0.15, 0.85);
    me.kickAnim = 0.0001;
    sfx.tackle();
    vibrate(25);
    if (Math.random() < p) {
      this._setOwner(me);
    } else if (Math.random() < 0.4) {
      this._foul(me, holder);
    }
  }

  _foul(by, victim) {
    sfx.whistle();
    this._showMsg(t('tackle') + '!', '');
    // free kick: give ball to victim team at spot
    this._setOwner(victim);
    this._setState(T.RESTART, 0.9);
  }

  _doSwitch() {
    const team = this.teams[this.userSide];
    const cands = team.players.filter(p => p.role !== 'GK' && p !== this.controlled);
    cands.sort((a, b) => Math.hypot(a.x - this.ball.x, a.z - this.ball.z) - Math.hypot(b.x - this.ball.x, b.z - this.ball.z));
    if (cands[0]) this.controlled = cands[0];
    sfx.click();
  }

  _kickBall(by, vx, vy, vz, spin) {
    const b = this.ball;
    b.owner = null;
    b.x = by.x + Math.cos(by.facing) * 0.5;
    b.z = by.z + Math.sin(by.facing) * 0.5;
    b.y = 0.24;
    b.vx = vx; b.vy = vy; b.vz = vz;
    b.spin = spin || 0;
    b.lastTeam = this.teams.indexOf(by.team);
    by.hasBall = false;
    by.team.possession = false;
  }

  _setOwner(p) {
    if (this.ball.owner) { this.ball.owner.hasBall = false; }
    this.ball.owner = p;
    p.hasBall = true;
    this.ball.vx = this.ball.vy = this.ball.vz = 0;
    this.ball.spin = 0;
    p.team.possession = true;
    const other = this.teams[1 - this.teams.indexOf(p.team)];
    other.possession = false;
    this.ball.lastTeam = this.teams.indexOf(p.team);
  }

  // ------------------------------------------------------------ states
  _setState(s, timer) {
    if (s === T.PAUSED) { this.prevState = this.prevState === T.PAUSED ? this.prevState : this.state; }
    this.state = s;
    this.stateTimer = timer || 0;
    if (s === T.KICKOFF) this._arrangeKickoff();
    if (s === T.GOAL) { /* arranged by scorer call */ }
  }

  _arrangeKickoff() {
    for (const team of this.teams) {
      team.players.forEach((p, i) => {
        this._formationPoint(team, i, p.anchor);
        p.x = p.anchor.x; p.z = p.anchor.y;
        if (team !== this.teams[this.kickoffTeam] && Math.abs(p.x) < 8) p.x += team.attackDir * -2;
        p.vx = p.vz = 0;
        p.facing = team.attackDir > 0 ? 0 : Math.PI;
        p.hasBall = false; p.diveT = 0; p.kickAnim = 0;
      });
    }
    this.ball.x = 0; this.ball.z = 0; this.ball.y = 0.24;
    this.ball.vx = this.ball.vy = this.ball.vz = 0; this.ball.spin = 0;
    const striker = this.teams[this.kickoffTeam].players.find(p => p.pos === 'ST') || this.teams[this.kickoffTeam].players[9];
    striker.x = this.teams[this.kickoffTeam].attackDir * -1.2; striker.z = 0;
    this._setOwner(striker);
  }

  _scoreGoal(teamIdx, ownGoal) {
    this.score[teamIdx]++;
    this.elHS.textContent = this.score[0];
    this.elAS.textContent = this.score[1];
    this.stadium.board.userData.update(
      `${this.home.short} ${this.score[0]}-${this.score[1]} ${this.away.short}`, '', this._lastClockTxt || '00:00'
    );
    sfx.goal();
    vibrate(60);
    this._showMsg(ownGoal ? t('own_goal') : t('goal'), `${this.home.short} ${this.score[0]} - ${this.score[1]} ${this.away.short}`);
    this.kickoffTeam = 1 - teamIdx;
    this._setState(T.GOAL, 3.0);
    this._goalCamT = 0;
  }

  _showMsg(big, small, ms) {
    this.msg.innerHTML = `<div class="big">${big}</div>${small ? `<div class="small">${small}</div>` : ''}`;
    this.msg.style.display = 'block';
    clearTimeout(this._msgT);
    this._msgT = setTimeout(() => { this.msg.style.display = 'none'; }, ms || 2200);
  }

  // ------------------------------------------------------------ main loop
  _loop(now) {
    if (this.disposed) return;
    this._raf = requestAnimationFrame(this._loop);
    let dt = (now - this._last) / 1000;
    this._last = now;
    if (dt > 0.1) dt = 0.1;

    if (this.targetFps === 30) {
      this._frameToggle = !this._frameToggle;
      if (this._frameToggle) { this._acc += dt; return; }
      dt += this._acc; this._acc = 0;
    }

    if (this.state !== T.PAUSED) this._update(dt);
    this._render();
  }

  _update(dt) {
    if (this.stateTimer > 0) {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) this._onStateEnd();
    }

    if (this.state === T.PLAY || this.state === T.KICKOFF || this.state === T.RESTART) {
      if (this.state === T.PLAY) this.clock += dt;
      this._updateControl();
      this._updateAI(dt);
      this._updateBall(dt);
    } else if (this.state === T.GOAL) {
      this._updateBall(dt * 0.6);
    }

    // charge bar
    if (this.shootCharge >= 0) {
      this.shootCharge = clamp01(this.shootCharge + dt / 0.95);
      this.powerFill.style.width = `${Math.round(this.shootCharge * 100)}%`;
    }

    this._updateFigures(dt);
    this._updateCamera(dt);
    this._updateHUD();
  }

  _onStateEnd() {
    switch (this.state) {
      case T.KICKOFF:
        sfx.whistle();
        this._setState(T.PLAY, 0);
        break;
      case T.RESTART:
        this._setState(T.PLAY, 0);
        break;
      case T.GOAL:
        this._setState(T.KICKOFF, 1.2);
        break;
      case T.HALFTIME:
        this.half = 2;
        this.teams[0].attackDir = -1;
        this.teams[1].attackDir = 1;
        this.kickoffTeam = 1;
        this._setState(T.KICKOFF, 1.4);
        break;
      case T.FULLTIME:
        if (!this.finished) {
          this.finished = true;
          this._finishMatch();
        }
        break;
    }
  }

  _finishMatch() {
    const hs = this.score[0], as = this.score[1];
    if (!this.allowDraw && hs === as) {
      // knockout: golden goal extra message → decide by next goal; simplest: penalty-style random with OVR fairness
      const winner = this.teams[0].players.reduce((s, p) => s + (p.stats.ovr || 70), 0) >=
                     this.teams[1].players.reduce((s, p) => s + (p.stats.ovr || 70), 0) ? 0 : 1;
      this.score[winner]++;
    }
    const userScore = this.score[this.userSide];
    const oppScore = this.score[1 - this.userSide];
    const res = {
      homeScore: hs, awayScore: as, userScore, oppScore,
      result: userScore > oppScore ? 'win' : userScore < oppScore ? 'lose' : 'draw',
      home: this.home, away: this.away, difficulty: this.opts.difficulty || 'normal'
    };
    setTimeout(() => this.onFinish(res), 60);
  }

  // ------------------------------------------------------------ user control
  _updateControl() {
    const team = this.teams[this.userSide];
    // decide controlled player
    if (this.ball.owner && this.ball.owner.team === team) {
      this.controlled = this.ball.owner;
    } else if (!this.controlled || this.controlled.team !== team ||
      (this.ball.owner && this.ball.owner.team !== team && this.controlled.hasBall)) {
      this._autoSwitch();
    } else if (!this.ball.owner) {
      // keep, but auto switch when a teammate is clearly closer to a loose ball
      const c = this.controlled;
      const dCur = Math.hypot(c.x - this.ball.x, c.z - this.ball.z);
      if (dCur > 12) this._autoSwitch();
    }

    const me = this.controlled;
    if (!me) return;
    me.isUser = true;
    for (const p of team.players) if (p !== me) p.isUser = false;

    let jx = this.joy.x, jy = this.joy.y;
    const kv = this._keyboardVec();
    if (kv) { jx = kv.x; jy = kv.y; }
    const mag = Math.hypot(jx, jy);
    // screen up (−y) = toward −z (away from camera)
    const dirX = jx, dirZ = jy;

    me.sprinting = !!this.buttons.sprint && me.stamina > 4;
    const stamF = me.stamina < 15 ? 0.8 : 1;
    const spd = BASE_SPEED * (me.sprinting ? SPRINT_MULT : 1) * stamF * (0.92 + ((me.stats.speed || 60) / 100) * 0.18);

    if (mag > 0.05) {
      const l = Math.hypot(dirX, dirZ) || 1;
      const tx = dirX / l, tz = dirZ / l;
      me.vx = lerp(me.vx, tx * spd * Math.min(1, mag * 1.6), 0.22);
      me.vz = lerp(me.vz, tz * spd * Math.min(1, mag * 1.6), 0.22);
      me.facing = lerpAngle(me.facing, Math.atan2(tz, tx), 0.3);
    } else {
      me.vx = lerp(me.vx, 0, 0.25);
      me.vz = lerp(me.vz, 0, 0.25);
      if (this.ball.owner !== me) {
        const ba = Math.atan2(this.ball.z - me.z, this.ball.x - me.x);
        me.facing = lerpAngle(me.facing, ba, 0.08);
      }
    }

    // stamina
    if (me.sprinting) me.stamina = Math.max(0, me.stamina - dt * 9);
    else me.stamina = Math.min(100, me.stamina + dt * 4.5);

    // possession buttons switch context
    const attacking = team.possession;
    if (attacking !== this.attackButtons) this._makeButtons(attacking);
  }

  _autoSwitch() {
    const team = this.teams[this.userSide];
    let best = null, bd = 1e9;
    for (const p of team.players) {
      if (p.role === 'GK' && (Math.abs(this.ball.x) < HALF_LEN - 20)) continue;
      const d = Math.hypot(p.x - this.ball.x, p.z - this.ball.z);
      if (d < bd) { bd = d; best = p; }
    }
    if (best) this.controlled = best;
    for (const p of team.players) p.isUser = p === best;
  }

  // ------------------------------------------------------------ AI
  _updateAI(dt) {
    const b = this.ball;
    for (const team of this.teams) {
      const isUser = this.teams.indexOf(team) === this.userSide;
      const diff = isUser ? null : this.diff;
      // who chases the ball
      let chaser = null, chaserD = 1e9, second = null, secondD = 1e9;
      for (const p of team.players) {
        if (p.isUser || p.hasBall) continue;
        if (p.role === 'GK') continue;
        const d = Math.hypot(p.x - b.x, p.z - b.z);
        if (d < chaserD) { second = chaser; secondD = chaserD; chaser = p; chaserD = d; }
        else if (d < secondD) { second = p; secondD = d; }
      }

      const holding = team.possession;
      const pressLevel = isUser ? (this.pressHeld ? 0.9 : 0.45) : diff.press;

      team.players.forEach((p, i) => {
        if (p.isUser) return;
        p.thinkT -= dt;

        if (p.hasBall) { this._aiCarrier(p, dt); return; }

        if (p.role === 'GK') { this._aiGK(p, dt); return; }

        // decide target
        let tx, tz, speedF = 0.86;
        if (!b.owner) {
          if (p === chaser || (p === second && chaserD > 6)) {
            tx = b.x + b.vx * 0.25; tz = b.z + b.vz * 0.25; speedF = 1.0;
          } else { this._formationPoint(team, i, p.anchor); tx = p.anchor.x + b.x * 0.22; tz = p.anchor.y + b.z * 0.18; }
        } else if (b.owner.team === team) {
          // support attack
          this._formationPoint(team, i, p.anchor);
          const push = p.role === 'FW' ? 8 : p.role === 'MF' ? 3 : -3;
          tx = p.anchor.x + team.attackDir * push + b.x * 0.18;
          tz = p.anchor.y * 1.06 + b.z * 0.14;
          if (team.passTarget === p && Math.hypot(p.x - b.x, p.z - b.z) > 3) { tx = b.x; tz = b.z; speedF = 1.0; }
        } else {
          // defend
          this._formationPoint(team, i, p.anchor);
          const drop = p.role === 'DF' ? 2 : p.role === 'MF' ? 6 : 12;
          tx = p.anchor.x - team.attackDir * drop + b.x * 0.30;
          tz = p.anchor.y + b.z * 0.30;
          // pressing
          const owner = b.owner;
          const dOwn = Math.hypot(p.x - owner.x, p.z - owner.z);
          const shouldPress = (p === chaser && pressLevel > 0.35) || (p === second && pressLevel > 0.75);
          if (shouldPress && dOwn < 26 * pressLevel + 6) {
            tx = owner.x + owner.vx * 0.2; tz = owner.z + owner.vz * 0.2; speedF = 0.95 + pressLevel * 0.12;
          }
          // AI tackle attempt
          if (!isUser && dOwn < 1.5 && Math.random() < this.diff.reaction * dt * 3) {
            const myDef = (p.stats.defending || 55);
            const oppDrib = (owner.stats.dribbling || 55);
            if (Math.random() < clamp(0.3 + (myDef - oppDrib) * 0.005 + this.diff.reaction * 0.15, 0.1, 0.8)) {
              this._setOwner(p);
              sfx.tackle();
            }
          }
        }
        tx = clamp(tx, -HALF_LEN + 1, HALF_LEN - 1);
        tz = clamp(tz, -HALF_W + 1, HALF_W - 1);
        this._seek(p, tx, tz, speedF * (diff ? diff.aiSpeed : 1), dt);
      });
    }
  }

  _seek(p, tx, tz, speedF, dt) {
    const dx = tx - p.x, dz = tz - p.z;
    const d = Math.hypot(dx, dz);
    const spd = BASE_SPEED * speedF * (0.88 + ((p.stats.speed || 60) / 100) * 0.2) * (p.stamina < 12 ? 0.82 : 1);
    if (d > 0.6) {
      const arrive = Math.min(1, d / 3);
      p.vx = lerp(p.vx, (dx / d) * spd * arrive, 0.12);
      p.vz = lerp(p.vz, (dz / d) * spd * arrive, 0.12);
      if (Math.hypot(p.vx, p.vz) > 0.6) p.facing = lerpAngle(p.facing, Math.atan2(p.vz, p.vx), 0.18);
    } else {
      p.vx = lerp(p.vx, 0, 0.2); p.vz = lerp(p.vz, 0, 0.2);
      p.facing = lerpAngle(p.facing, Math.atan2(this.ball.z - p.z, this.ball.x - p.x), 0.05);
    }
    p.stamina = Math.min(100, p.stamina + dt * 3.5 - Math.hypot(p.vx, p.vz) * dt * 0.12);
  }

  _aiCarrier(p, dt) {
    const teamIdx = this.teams.indexOf(p.team);
    const isUserPlayerTeam = teamIdx === this.userSide;
    const goal = this._goalCenter(teamIdx);
    const dx = goal.x - p.x, dz = goal.z - p.z;
    const dGoal = Math.hypot(dx, dz);
    const diff = isUserPlayerTeam ? DIFFICULTIES.normal : this.diff;

    // pressure from nearest opponent
    let nearestOpp = null, nd = 1e9;
    for (const o of this.players) {
      if (o.team === p.team) continue;
      const d = Math.hypot(o.x - p.x, o.z - p.z);
      if (d < nd) { nd = d; nearestOpp = o; }
    }

    p.thinkT -= dt;
    if (p.thinkT <= 0) {
      p.thinkT = 0.22 + Math.random() * 0.2;
      const shootChance = dGoal < 24 ? clamp(0.5 - dGoal * 0.014 + diff.shotSkill * 0.4, 0, 0.85) : 0;
      const passPressure = nd < 3 ? 0.75 : nd < 6 ? 0.3 : 0.06;
      const r = Math.random();
      if (dGoal < 26 && r < shootChance) {
        this._aiShoot(p, goal, dGoal, diff);
        return;
      }
      if (r < shootChance + passPressure * diff.decision) {
        this._aiPass(p, diff, nd < 3.5);
        return;
      }
    }

    // dribble toward goal, steer around nearest opponent
    let steerX = dx / dGoal, steerZ = dz / dGoal;
    if (nearestOpp && nd < 5) {
      const ox = p.x - nearestOpp.x, oz = p.z - nearestOpp.z;
      const ol = Math.hypot(ox, oz) || 1;
      steerX += (ox / ol) * 0.8; steerZ += (oz / ol) * 0.8;
      const sl = Math.hypot(steerX, steerZ) || 1; steerX /= sl; steerZ /= sl;
    }
    const skill = (p.stats.dribbling || 55) / 100;
    const spd = BASE_SPEED * (0.82 + skill * 0.26) * diff.aiSpeed;
    p.vx = lerp(p.vx, steerX * spd, 0.14);
    p.vz = lerp(p.vz, steerZ * spd, 0.14);
    p.facing = lerpAngle(p.facing, Math.atan2(p.vz, p.vx), 0.2);
  }

  _aiShoot(p, goal, dGoal, diff) {
    const skill = ((p.stats.shooting || 55) / 100) * 0.6 + diff.shotSkill * 0.4;
    let tx = goal.x, tz = (Math.random() * 2 - 1) * GOAL_HALF * 0.75;
    const err = (1 - skill) * 3.2;
    tz += (Math.random() * 2 - 1) * err;
    const dx = tx - p.x, dz = tz - p.z;
    const d = Math.hypot(dx, dz) || 1;
    const speed = 16 + Math.random() * 9 + dGoal * 0.12;
    const vy = Math.random() < 0.4 ? 1.6 + Math.random() * 1.6 : 0.7;
    this._kickBall(p, (dx / d) * speed, vy, (dz / d) * speed, 0);
    p.kickAnim = 0.0001;
    sfx.kick(0.8);
  }

  _aiPass(p, diff, pressured) {
    const mates = p.team.players.filter(m => m !== p && m.role !== 'GK');
    let best = null, bs = -1e9;
    const dir = p.team.attackDir;
    for (const m of mates) {
      const dx = m.x - p.x, dz = m.z - p.z;
      const d = Math.hypot(dx, dz);
      if (d < 3 || d > 45) continue;
      const fwd = (dx * dir) / d;
      const open = this._openness(m);
      const score = fwd * 1.4 + open * 1.6 - Math.abs(d - (pressured ? 10 : 18)) * 0.03 + Math.random() * 0.5;
      if (score > bs) { bs = score; best = m; }
    }
    if (!best) { this._aiShoot(p, this._goalCenter(this.teams.indexOf(p.team)), 30, diff); return; }
    let tx = best.x + best.vx * 0.4, tz = best.z + best.vz * 0.4;
    const dx = tx - p.x, dz = tz - p.z;
    const d = Math.hypot(dx, dz) || 1;
    const ang = Math.atan2(dz, dx) + (Math.random() * 2 - 1) * diff.passErr;
    const speed = clamp(d * 1.1, 9, 24);
    this._kickBall(p, Math.cos(ang) * speed, d > 25 ? 3.8 : 0.3, Math.sin(ang) * speed, 0);
    p.team.passTarget = best;
    p.kickAnim = 0.0001;
    sfx.pass();
  }

  _aiGK(p, dt) {
    const teamIdx = this.teams.indexOf(p.team);
    const a = p.team.attackDir;
    const lineX = -a * (HALF_LEN - 0.7);
    const b = this.ball;
    // default position
    let tx = lineX + a * clamp(3.2 - Math.abs(b.x - lineX) * 0.05, 0, 3.2);
    let tz = clamp(b.z * 0.75, -GOAL_HALF + 0.5, GOAL_HALF - 0.5);

    if (b.owner && b.owner.team === p.team) {
      // distribute
      if (!this._gkHold) this._gkHold = { t: 1.1, gk: p };
      tx = lineX; tz = clamp(b.z * 0.5, -GOAL_HALF, GOAL_HALF);
    } else {
      this._gkHold = null;
      // shot incoming?
      const goalDir = -a; // ball traveling toward this goal has vx*goalDirSign>0
      if (!b.owner && Math.abs(b.vx) > 8 && ((b.vx > 0 && lineX > 0) || (b.vx < 0 && lineX < 0))) {
        const tToLine = Math.abs((lineX - b.x) / b.vx);
        if (tToLine < 0.9) {
          const zAtLine = b.z + b.vz * tToLine + b.spin * tToLine * tToLine * 0.5;
          const gkSkill = this.teams.indexOf(p.team) === this.userSide ? 0.72 : this.diff.gk;
          const reach = 1.0 + gkSkill * 1.1;
          if (Math.abs(zAtLine) < GOAL_HALF + 0.3) {
            tz = clamp(zAtLine, -GOAL_HALF - 0.6, GOAL_HALF + 0.6);
            tx = lineX;
            if (Math.abs(zAtLine - p.z) < reach && Math.random() < gkSkill * 0.95) {
              if (p.diveT <= 0) {
                p.diveT = 0.0001;
                p.diveDir = Math.sign(zAtLine - p.z) || 1;
              }
              if (tToLine < 0.25) {
                const catchP = clamp(gkSkill - Math.hypot(b.vx, b.vz) * 0.012 + 0.25, 0.25, 0.95);
                if (Math.random() < catchP) {
                  this._setOwner(p);
                  sfx.catchBall();
                  this._gkHold = { t: 1.0, gk: p };
                } else {
                  // parry out
                  b.vx = a * (3 + Math.random() * 4);
                  b.vz = (Math.random() * 2 - 1) * 6;
                  b.vy = 2.5;
                  sfx.tackle();
                }
              }
            }
          }
        }
      }
    }
    // hold & distribute
    if (this._gkHold && this._gkHold.gk === p && p.hasBall) {
      this._gkHold.t -= dt;
      if (this._gkHold.t <= 0) {
        this._gkHold = null;
        const mates = p.team.players.filter(m => m !== p && m.role === 'DF');
        const m = mates[Math.floor(Math.random() * mates.length)] || p.team.players[2];
        const dx = m.x - p.x, dz = m.z - p.z;
        const d = Math.hypot(dx, dz) || 1;
        this._kickBall(p, (dx / d) * clamp(d * 1.05, 10, 22), d > 22 ? 4.2 : 1.2, (dz / d) * clamp(d * 1.05, 10, 22), 0);
        p.team.passTarget = m;
        sfx.pass();
      }
    }
    this._seek(p, tx, tz, 0.95, dt);
  }

  // ------------------------------------------------------------ ball physics
  _updateBall(dt) {
    const b = this.ball;

    // integrate player positions
    for (const p of this.players) {
      p.x += p.vx * dt; p.z += p.vz * dt;
      p.x = clamp(p.x, -HALF_LEN - 2, HALF_LEN + 2);
      p.z = clamp(p.z, -HALF_W - 2, HALF_W + 2);
      p.speed01 = clamp01(Math.hypot(p.vx, p.vz) / (BASE_SPEED * SPRINT_MULT));
      if (Math.hypot(p.vx, p.vz) > 0.5) p.phase += dt * (6 + p.speed01 * 9);
      if (p.kickAnim > 0) { p.kickAnim += dt * 3.2; if (p.kickAnim > 1) p.kickAnim = 0; }
      if (p.diveT > 0) { p.diveT += dt * 1.4; if (p.diveT > 1.6) p.diveT = 0; }
    }

    if (b.owner) {
      const o = b.owner;
      const sp = Math.hypot(o.vx, o.vz);
      const lead = 0.42 + sp * 0.045;
      b.x = o.x + Math.cos(o.facing) * lead;
      b.z = o.z + Math.sin(o.facing) * lead;
      b.y = 0.24;
      // steal window: opponents very close may poke it away (AI only vs user handled by tackle)
      if (this.state === T.PLAY) {
        for (const opp of this.players) {
          if (opp.team === o.team || opp.isUser) continue;
          const d = Math.hypot(opp.x - b.x, opp.z - b.z);
          if (d < 0.9 && Math.random() < this.diff.reaction * dt * 1.2) {
            this._setOwner(opp);
            sfx.tackle();
            break;
          }
        }
      }
    } else {
      // integrate
      b.vy -= 22 * dt;
      b.vx *= (1 - 0.012 * dt * 60 * 0.016);
      b.vz *= (1 - 0.012 * dt * 60 * 0.016);
      // magnus curve
      if (Math.abs(b.spin) > 0.01) {
        const s = Math.hypot(b.vx, b.vz) || 1;
        b.vx += -b.vz / s * b.spin * dt * 2.2;
        b.vz += b.vx / s * b.spin * dt * 2.2;
        b.spin *= (1 - 0.4 * dt);
      }
      b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;
      // ground
      if (b.y <= 0.24) {
        b.y = 0.24;
        if (b.vy < -1.2) { b.vy = -b.vy * 0.45; sfx.bounce(); }
        else b.vy = 0;
        // rolling friction
        const f = Math.pow(0.35, dt);
        b.vx *= f; b.vz *= f;
      }
      // goal detection
      const withinPosts = Math.abs(b.z) < GOAL_HALF && b.y < PITCH.goalHeight;
      if (Math.abs(b.x) > HALF_LEN && withinPosts) {
        // whichever team attacks toward that goal line scores
        const scoringTeam = this.teams[0].attackDir === Math.sign(b.x) ? 0 : 1;
        if (this.state === T.PLAY) {
          this._scoreGoal(scoringTeam, false);
          // park ball in net
          b.x = Math.sign(b.x) * (HALF_LEN + 0.8);
          b.vx = b.vy = b.vz = 0;
        }
      } else if (Math.abs(b.x) > HALF_LEN + 0.2 && Math.abs(b.x) < HALF_LEN + PITCH.goalDepth && withinPosts) {
        // inside net damping
        b.vx *= 0.7; b.vz *= 0.7;
      }
      // out of bounds
      if (this.state === T.PLAY && (Math.abs(b.z) > HALF_W + 0.6 || Math.abs(b.x) > HALF_LEN + 1.5)) {
        this._outOfBounds();
      }
      // pickup
      if (this.state === T.PLAY && Math.hypot(b.vx, b.vz) < 14) {
        for (const p of this.players) {
          const d = Math.hypot(p.x - b.x, p.z - b.z);
          const canPick = b.y < 1.1;
          if (d < 0.85 && canPick) {
            // first-touch control error under pressure for AI
            this._setOwner(p);
            break;
          }
        }
      }
    }

    this.ballMesh.position.set(b.x, b.y, b.z);
    this.ballMesh.rotation.x += (b.vz !== 0 || b.vx !== 0) ? dt * Math.hypot(b.vx, b.vz) * 1.6 : 0;
    this.ballMesh.rotation.z -= dt * Math.hypot(b.vx, b.vz) * 0.8;

    // clock boundaries
    if (this.state === T.PLAY) {
      if (this.half === 1 && this.clock >= this.totalSec / 2) {
        sfx.whistle(true);
        this._showMsg(t('half_time'), '', 2000);
        this._setState(T.HALFTIME, 2.2);
      } else if (this.half === 2 && this.clock >= this.totalSec) {
        sfx.whistle(true);
        this._showMsg(t('full_time'), `${this.home.short} ${this.score[0]} - ${this.score[1]} ${this.away.short}`, 2400);
        this._setState(T.FULLTIME, 2.2);
      }
    }
  }

  _outOfBounds() {
    const b = this.ball;
    // simplified restart: ball placed in bounds, nearest player of receiving team gets it
    const lastTeam = b.lastTeam >= 0 ? b.lastTeam : 0;
    const receiving = Math.abs(b.z) > HALF_W + 0.5 ? (1 - lastTeam) : lastTeam;
    b.x = clamp(b.x, -HALF_LEN + 2, HALF_LEN - 2);
    b.z = clamp(b.z, -HALF_W + 1, HALF_W - 1);
    b.y = 0.24; b.vx = b.vy = b.vz = 0; b.spin = 0;
    const team = this.teams[receiving];
    let best = team.players[1], bd = 1e9;
    for (const p of team.players) {
      if (p.role === 'GK' && Math.abs(b.x) > HALF_LEN - 25) continue;
      const d = Math.hypot(p.x - b.x, p.z - b.z);
      if (d < bd) { bd = d; best = p; }
    }
    // move receiver to ball
    best.x = b.x - team.attackDir * 0.8; best.z = b.z;
    this._setOwner(best);
    this._setState(T.RESTART, 0.7);
    sfx.whistle();
  }

  // ------------------------------------------------------------ presentation
  _updateFigures(dt) {
    for (const p of this.players) {
      this.figures.setFigure(p.fig, {
        x: p.x, z: p.z, facing: p.facing, speed01: p.speed01, phase: p.phase,
        kick: p.kickAnim, dive: p.diveT, diveDir: p.diveDir
      });
    }
    this.figures.flush();
    // referee follows play loosely
    const rx = clamp(this.ball.x * 0.6, -HALF_LEN + 8, HALF_LEN - 8);
    const rz = clamp(this.ball.z * 0.5 + 6, -HALF_W + 4, HALF_W - 4);
    this.referee.position.x = lerp(this.referee.position.x, rx, 0.02);
    this.referee.position.z = lerp(this.referee.position.z, rz, 0.02);
    // controlled marker
    if (this.controlled) {
      this.marker.visible = true;
      this.marker.position.set(this.controlled.x, 2.15 + Math.sin(performance.now() / 260) * 0.1, this.controlled.z);
    } else this.marker.visible = false;
  }

  _updateCamera(dt) {
    const b = this.ball;
    const sens = 0.04 + this.camSens * 0.12;
    let tx = clamp(b.x * 0.82, -HALF_LEN + 10, HALF_LEN - 10);
    let ty = 17.5;
    let tz = HALF_W + 15;
    let lx = b.x * 0.85, ly = 0.5, lz = b.z * 0.45;
    if (this.state === T.GOAL) {
      this._goalCamT = (this._goalCamT || 0) + dt;
      const gx = Math.sign(b.x || 1) * (HALF_LEN - 4);
      tx = gx * 0.72; ty = 7; tz = Math.sign(this.camera.position.z) * 24;
      lx = gx; ly = 1.4; lz = 0;
    }
    this.camera.position.x = lerp(this.camera.position.x, tx, sens);
    this.camera.position.y = lerp(this.camera.position.y, ty, sens * 0.7);
    this.camera.position.z = lerp(this.camera.position.z, tz, sens * 0.5);
    this._look = this._look || new THREE.Vector3();
    this._look.x = lerp(this._look.x, lx, sens * 1.3);
    this._look.y = lerp(this._look.y, ly, sens);
    this._look.z = lerp(this._look.z, lz, sens * 1.3);
    this.camera.lookAt(this._look);
  }

  _updateHUD() {
    const min = Math.floor((this.clock / this.totalSec) * 90);
    const dispSec = Math.floor(((this.clock / this.totalSec) * 90 % 1) * 60);
    const txt = `${String(Math.min(90, min)).padStart(2, '0')}:${String(dispSec).padStart(2, '0')}`;
    if (this._lastClockTxt !== txt) {
      this._lastClockTxt = txt;
      this.elClock.textContent = txt;
      this.stadium.board.userData.update(
        `${this.home.short} ${this.score[0]}-${this.score[1]} ${this.away.short}`, '', txt
      );
    }
  }

  _render() {
    this.renderer.render(this.scene, this.camera);
  }

  // ------------------------------------------------------------ pause / dispose
  openPause() {
    if (this.state === T.PAUSED || this.finished) return;
    this.prevState = this.state;
    this.state = T.PAUSED;
    if (this.opts.onPause) this.opts.onPause();
  }
  closePause() {
    this.state = this.prevState;
    if (this.opts.onResume) this.opts.onResume();
  }
  setTargetFps(f) { this.targetFps = f; }
  setCamSens(v) { this.camSens = v; }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('keydown', this._keyDown);
    window.removeEventListener('keyup', this._keyUp);
    clearTimeout(this._msgT);
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
