// App bootstrap: renderer management, menu backdrop scene, match lifecycle, navigation.
import * as THREE from 'three';
import { GAME, QUALITY } from './config.js';
import { getSave, loadSave, persist, persistSoon, defaultSave } from './save.js';
import { setLanguage, t } from './i18n.js';
import { unlockAudio, applyVolumes, sfx } from './audio.js';
import { makeRenderer, buildStadium, setupLights, makeBall } from './scene3d.js';
import { CLUBS, clubById, playersOfClub, autoPickXI } from './data.js';
import { applyMatchResult, lineupXI, ensureLineup, advanceTournament, applyCareerResult } from './meta.js';
import { MatchGame } from './match.js';
import { PenaltyGame } from './penalty.js';
import { TrainingGame } from './training.js';
import {
  showSplash, showHome, showResult, showPauseOverlay, showClubPicker, showSettings, toast
} from './ui.js';

const canvas = document.getElementById('gl-canvas');

const App = {
  renderer: null,
  menuScene: null,
  match: null,
  penalty: null,
  training: null,
  pauseModal: null,
  resolvedQuality: 'medium'
};

// ---------------------------------------------------------------- quality
function detectQuality() {
  const save = getSave();
  if (save.settings.graphics !== 'auto') return save.settings.graphics;
  const mem = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  let q = 'medium';
  if (mem <= 3 || cores <= 4) q = 'low';
  else if (mem >= 6 && cores >= 8) q = 'high';
  save.settings.autoDetected = q;
  return q;
}

function buildRenderer() {
  if (App.renderer) {
    try { App.renderer.dispose(); } catch { /* noop */ }
    App.renderer.forceContextLoss && App.renderer.forceContextLoss();
  }
  App.resolvedQuality = detectQuality();
  App.renderer = makeRenderer(canvas, App.resolvedQuality);
}

App.applyQuality = () => {
  const q = detectQuality();
  if (q === App.resolvedQuality) return;
  if (App.match || App.penalty || App.training) return; // applies next match
  stopMenuScene();
  buildRenderer();
  startMenuScene();
};
App.onFpsChange = () => {
  const s = getSave();
  if (App.match) App.match.setTargetFps(s.settings.fps);
};
App.onCamChange = () => {
  const s = getSave();
  if (App.match) App.match.setCamSens(s.settings.cameraSens);
};

// ---------------------------------------------------------------- menu backdrop
let menuRaf = 0;
function startMenuScene() {
  if (App.menuScene) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 500);
  setupLights(scene, true);
  buildStadium(scene, { quality: App.resolvedQuality, night: true });
  const ball = makeBall();
  ball.position.set(0, 0.24, 0);
  scene.add(ball);
  App.menuScene = { scene, camera, ball };
  let last = performance.now();
  const loop = (now) => {
    if (!App.menuScene) return;
    menuRaf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const tSec = now / 1000;
    const r = 78;
    camera.position.set(Math.sin(tSec * 0.06) * r, 24 + Math.sin(tSec * 0.11) * 3, Math.cos(tSec * 0.06) * r);
    camera.lookAt(0, 1, 0);
    ball.rotation.y += dt * 0.8;
    ball.position.y = 0.24 + Math.abs(Math.sin(tSec * 1.4)) * 0.8;
    App.renderer.render(scene, camera);
  };
  menuRaf = requestAnimationFrame(loop);
}
function stopMenuScene() {
  if (!App.menuScene) return;
  cancelAnimationFrame(menuRaf);
  const { scene } = App.menuScene;
  scene.traverse(o => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      const ms = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of ms) { if (m.map) m.map.dispose(); m.dispose(); }
    }
  });
  App.menuScene = null;
}

// ---------------------------------------------------------------- match lifecycle
function squadXI() {
  ensureLineup();
  return lineupXI();
}

App.startMatch = (opts) => {
  stopMenuScene();
  const save = getSave();
  const home = clubById(save.clubId);
  const homeXI = squadXI();
  const awayXI = autoPickXI(playersOfClub(opts.opponent.id), '4-3-3');
  if (homeXI.length < 11) {
    toast('Not enough players', true);
    showHome(App);
    return;
  }
  App.match = new MatchGame(canvas, {
    renderer: App.renderer,
    home, away: opts.opponent,
    homeXI, awayXI,
    homeFormation: save.lineup.formation,
    awayFormation: '4-3-3',
    difficulty: opts.difficulty,
    length: save.settings.matchLength,
    night: opts.night,
    quality: App.resolvedQuality,
    fps: save.settings.fps,
    cameraSens: save.settings.cameraSens,
    joystickSize: save.settings.joystickSize,
    mode: opts.mode,
    allowDraw: opts.allowDraw !== false,
    onFinish: (res) => {
      res.mode = opts.mode;
      App.match.dispose();
      App.match = null;
      handleMatchFinish(res);
    },
    onPause: () => { App.pauseModal = showPauseOverlay(App, App.match); },
    onResume: () => { if (App.pauseModal) { App.pauseModal.remove(); App.pauseModal = null; } }
  });
};

App.quitMatch = () => {
  if (App.pauseModal) { App.pauseModal.remove(); App.pauseModal = null; }
  if (App.match) { App.match.dispose(); App.match = null; }
  if (App.penalty) { App.penalty.dispose(); App.penalty = null; }
  if (App.training) { App.training.dispose(); App.training = null; }
  startMenuScene();
  showHome(App);
};

function handleMatchFinish(res) {
  // mode-specific state updates
  if (res.mode === 'tournament') {
    advanceTournament(res.result === 'win', res.userScore, res.oppScore);
  } else if (res.mode === 'career') {
    applyCareerResult(res.userScore, res.oppScore);
  }
  const rewards = applyMatchResult(res, res.mode);
  startMenuScene();
  showResult(App, res, rewards);
}

App.startPenalty = () => {
  stopMenuScene();
  const save = getSave();
  const home = clubById(save.clubId);
  const others = CLUBS.filter(c => c.id !== save.clubId);
  const away = others[Math.floor(Math.random() * others.length)];
  App.penalty = new PenaltyGame(canvas, {
    renderer: App.renderer, home, away,
    difficulty: save.settings.difficulty,
    night: save.settings.dayNight === 'night',
    quality: App.resolvedQuality,
    onFinish: (res) => {
      App.penalty.dispose();
      App.penalty = null;
      res.mode = 'penalty';
      const rewards = applyMatchResult(res, 'penalty');
      startMenuScene();
      showResult(App, res, rewards);
    }
  });
};

App.startTraining = () => {
  stopMenuScene();
  const save = getSave();
  const home = clubById(save.clubId);
  App.training = new TrainingGame(canvas, {
    renderer: App.renderer, home,
    night: save.settings.dayNight === 'night',
    quality: App.resolvedQuality,
    onFinish: (r) => {
      App.training.dispose();
      App.training = null;
      startMenuScene();
      toast(`🎯 ${r.score} · +${r.coins} 🪙`);
      sfx.coin();
      showHome(App);
    }
  });
};

// ---------------------------------------------------------------- first run
function initSquad(club) {
  const save = getSave();
  save.clubId = club.id;
  const roster = playersOfClub(club.id);
  save.squad = roster.map(p => p.id);
  save.players = {};
  for (const p of roster) save.players[p.id] = JSON.parse(JSON.stringify(p));
  save.lineup.formation = '4-3-3';
  save.lineup.slots = autoPickXI(roster, '4-3-3');
  persist();
}

// ---------------------------------------------------------------- android / global hooks
window.UFM = {
  version: GAME.version,
  onAndroidBack() {
    if (App.match) { App.match.openPause(); return true; }
    if (App.penalty || App.training) { App.quitMatch(); return true; }
    const modals = document.querySelectorAll('.modal-wrap');
    if (modals.length) { modals[modals.length - 1].remove(); return true; }
    // on the home screen a second back press quits the app
    if (document.querySelector('.screen.home')) return false;
    showHome(App);
    return true;
  }
};

window.addEventListener('error', (e) => {
  const ov = document.getElementById('error-overlay');
  if (ov) { ov.hidden = false; ov.textContent = `${GAME.short} error:\n${e.message}\n${(e.error && e.error.stack) || ''}`; }
});

document.addEventListener('visibilitychange', () => { if (document.hidden) persist(); });
window.addEventListener('pointerdown', () => unlockAudio(), { once: true });
window.addEventListener('keydown', () => unlockAudio(), { once: true });

// ---------------------------------------------------------------- boot
function boot() {
  const save = loadSave();
  setLanguage(save.settings.language || 'en');
  buildRenderer();
  startMenuScene();
  showSplash(() => {
    if (!save.clubId) {
      showClubPicker(App, (club) => {
        initSquad(club);
        applyVolumes();
        toast(t('welcome'));
        showHome(App);
      });
    } else {
      showHome(App);
    }
  });
}

document.title = GAME.name;
boot();
