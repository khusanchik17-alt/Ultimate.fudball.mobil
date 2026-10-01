/**
 * Ultimate Football Mobile - application shell.
 *
 * Boots the WebView UI (or the desktop browser preview), owns the persistent
 * state, drives the main loop and swaps between the menu backdrop and the
 * gameplay runners (match / penalties).
 */
import { i18n, t, LANGUAGES } from './core/i18n.js';
import { storage } from './core/storage.js';
import { audio } from './core/audio.js';
import { InputManager } from './core/input.js';
import { HUD } from './ui/hud.js';
import { ScreenManager } from './ui/screens.js';
import { Dragger } from './ui/dragger.js';
import { el, clear, money, bindButton } from './ui/dom.js';
import {
  createNewState, migrateState, computeMatchRewards, applyMatchRewards,
  teamOvr, lineupPlayers, buildLineup,
} from './game/state.js';
import { generateSquad } from './game/data/players.js';
import { findClub, DEFAULT_CLUB } from './game/data/clubs.js';
import { MatchRunner, PenaltyRunner } from './game/runners.js';
import { MenuScene } from './render/scene.js';
import {
  playMatchday, nextFixture, currentTournamentMatch, resolveTournamentMatch,
  advanceTournament, isHomeFixture, simulateFixture,
} from './game/progression.js';
import { isTouchDevice, clamp } from './core/util.js';

export const VERSION = '1.0.0';

class App {
  constructor() {
    this.version = VERSION;
    this.t = (key, vars) => t(key, vars);
    this.audio = audio;
    this.storage = storage;
    this.settings = storage.settings;
    this.state = null;
    this.runner = null;
    this.menuScene = null;
    this.mode = 'menu';
    this.lastFrame = 0;
    this.accum = 0;
    this.fpsAccum = 0;
    this.fpsFrames = 0;
    this.fps = 60;
    this.toastTimer = null;
    this.settingsReturn = null;
    this.busy = false;
  }

  // ------------------------------------------------------------------ boot
  async boot() {
    this.root = document.getElementById('app') || document.body;
    this.root.classList.add('ufm-root');
    document.documentElement.style.setProperty('--ui-scale', String(this.settings.buttonScale || 1));

    if (i18n && this.settings.language) i18n.setLanguage(this.settings.language);

    this.state = migrateState(this.storage.load() || createNewState());
    this.applyStateToClub();

    this.buildLayers();
    this.input = new InputManager(this.root);
    this.input.attachKeyboard(window);
    this.hud = new HUD(this).mount(this.gameLayer);
    this.hud.setVisible(false);
    this.dragger = new Dragger();
    this.screens = new ScreenManager(this).mount(this.uiLayer);
    this.bindGlobal();

    this.showSplash();
  }

  applyStateToClub() {
    this.state.__teamOvr = teamOvr(this.state);
  }

  buildLayers() {
    this.backdrop = el('div', { class: 'backdrop' });
    this.gameLayer = el('div', { class: 'layer game-layer' });
    this.uiLayer = el('div', { class: 'layer ui-layer' });
    this.overlayLayer = el('div', { class: 'layer overlay-layer' });
    this.toastNode = el('div', { class: 'toast hidden' });
    this.root.appendChild(this.backdrop);
    this.root.appendChild(this.gameLayer);
    this.root.appendChild(this.uiLayer);
    this.root.appendChild(this.overlayLayer);
    this.root.appendChild(this.toastNode);
  }

  // ------------------------------------------------------------------ splash
  showSplash() {
    const splash = el('div', { class: 'splash' }, [
      el('div', { class: 'splash-inner' }, [
        el('div', { class: 'logo-mark big' }, [el('i', { class: 'logo-ball' })]),
        el('h1', { class: 'splash-title', text: this.t('app.title') }),
        el('h2', { class: 'splash-sub', text: this.t('app.subtitle') }),
        el('div', { class: 'splash-bar' }, [el('i')]),
        el('div', { class: 'splash-tap', text: this.t('app.tapToStart') }),
      ]),
      el('div', { class: 'splash-footer', text: `v${VERSION} · ${this.settings.quality.toUpperCase()} · ${this.settings.fpsTarget} FPS` }),
    ]);
    this.overlayLayer.appendChild(splash);

    // simulate load work (icons/textures warm-up happens lazily on first match)
    const bar = splash.querySelector('.splash-bar i');
    let progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(1, progress + 0.18 + Math.random() * 0.12);
      bar.style.width = `${progress * 100}%`;
      if (progress >= 1) clearInterval(timer);
    }, 120);

    const start = () => {
      splash.classList.add('leaving');
      this.audio.init();
      this.audio.resume();
      this.audio.setVolumes(this.settings);
      this.audio.play('click');
      this.audio.playMusic('menu');
      setTimeout(() => {
        splash.remove();
        this.enterMenu();
      }, 420);
    };
    splash.addEventListener('pointerdown', start, { once: true });
    window.__ufmStart = start;
  }

  // ------------------------------------------------------------------ menu
  enterMenu() {
    this.disposeRunner();
    this.mode = 'menu';
    this.hud.setVisible(false);
    this.hud.setPenaltyVisible(false);
    if (!this.menuScene) {
      this.menuScene = new MenuScene(this.backdrop, {
        quality: this.settings.quality,
        timeOfDay: 'night',
        club: this.state.club,
      });
    }
    this.menuScene.resize();
    this.screens.show('menu');
    this.audio.playMusic('menu');
  }

  // ------------------------------------------------------------------ matches
  buildTeamConfig(teamIndex, club, lineup) {
    return {
      club,
      lineup,
      formation: club.formation || '4-3-3',
      name: club.short || club.name.slice(0, 3).toUpperCase(),
    };
  }

  opponentTeam(club) {
    const squad = generateSquad(club, hashSeed(club.id));
    const lineup = buildLineup(squad, club.formation || '4-3-3');
    return { squad, lineup };
  }

  startQuickMatch(config) {
    const club = findClub(config.opponentId);
    const { lineup } = this.opponentTeam(club);
    this.launchMatch({
      title: 'quick',
      mode: 'match',
      home: this.buildTeamConfig(0, this.state.club, lineupPlayers(this.state)),
      away: this.buildTeamConfig(1, club, lineup),
      difficulty: config.difficulty,
      minutes: config.minutes,
      timeOfDay: config.timeOfDay,
      stadium: config.stadium,
      onFinish: (result) => this.finishQuickMatch(result),
    });
  }

  startCareerMatch() {
    const fixture = nextFixture(this.state);
    if (!fixture) {
      this.toast(this.t('career.seasonEnd'));
      return;
    }
    const homeClub = findClub(fixture.home);
    const awayClub = findClub(fixture.away);
    const isHome = fixture.home === this.state.club.id;
    const userClub = this.state.club;
    const opponent = this.opponentTeam(isHome ? awayClub : homeClub);
    const userLineup = lineupPlayers(this.state);
    const difficulty = this.settings.lastDifficulty || 'NORMAL';
    this.launchMatch({
      title: 'career',
      mode: 'match',
      home: this.buildTeamConfig(0, isHome ? userClub : homeClub, isHome ? userLineup : opponent.lineup),
      away: this.buildTeamConfig(1, isHome ? awayClub : userClub, isHome ? opponent.lineup : userLineup),
      difficulty,
      minutes: this.settings.matchMinutes,
      timeOfDay: 'night',
      onFinish: (result) => this.finishCareerMatch(result, fixture),
    });
  }

  startTournamentMatch() {
    const match = currentTournamentMatch(this.state);
    if (!match) return;
    const homeClub = findClub(match.home);
    const awayClub = findClub(match.away);
    const userIsHome = match.home === this.state.club.id;
    const userClub = this.state.club;
    const homeSquad = userIsHome ? lineupPlayers(this.state) : this.opponentTeam(homeClub).lineup;
    const awaySquad = userIsHome ? this.opponentTeam(awayClub).lineup : lineupPlayers(this.state);
    this.launchMatch({
      title: 'tournament',
      mode: 'match',
      home: this.buildTeamConfig(0, homeClub, homeSquad),
      away: this.buildTeamConfig(1, awayClub, awaySquad),
      difficulty: this.settings.lastDifficulty || 'NORMAL',
      minutes: this.settings.matchMinutes,
      timeOfDay: 'night',
      onFinish: (result) => this.finishTournamentMatch(result, match),
    });
  }

  startTraining(drill) {
    const opponentClub = findClub(DEFAULT_CLUB.id);
    const opponent = this.opponentTeam(opponentClub);
    const noOutOfPlay = drill.type === 'freeplay' || drill.type === 'dribbling';
    this.launchMatch({
      title: 'training',
      mode: 'training',
      training: drill,
      options: { freePlay: noOutOfPlay, noOutOfPlay, infiniteStamina: true, noFouls: true },
      home: this.buildTeamConfig(0, this.state.club, lineupPlayers(this.state)),
      away: this.buildTeamConfig(1, opponentClub, opponent.lineup),
      difficulty: 'EASY',
      minutes: 10,
      timeOfDay: 'day',
      onFinish: (result) => this.finishTraining(result, drill),
    });
  }

  startPenalty(config) {
    this.disposeRunner();
    this.mode = 'penalty';
    this.menuScene && this.menuScene.setActive(false);
    const club = findClub(config.opponentId || this.state.club.id === 'player_club' ? config.opponentId : this.state.club.id);
    const opponentClub = findClub(config.opponentId);
    const opponent = this.opponentTeam(opponentClub);
    this.myPenaltyTeam = { club: this.state.club, lineup: lineupPlayers(this.state) };
    this.penaltyOpponent = { club: opponentClub, lineup: opponent.lineup };
    void club;
    this.runner = new PenaltyRunner(this, {
      container: this.gameLayer,
      home: { club: this.state.club, lineup: lineupPlayers(this.state) },
      away: { club: opponentClub, lineup: opponent.lineup },
      difficulty: config.difficulty || 'NORMAL',
      timeOfDay: config.timeOfDay || 'night',
      onFinish: (result) => this.finishPenalty(result),
      onQuit: () => this.enterMenu(),
    });
    this.audio.playMusic('match');
  }

  launchMatch(config) {
    this.disposeRunner();
    this.mode = 'match';
    this.menuScene && this.menuScene.setActive(false);
    const homeClub = config.home.club;
    const awayClub = config.away.club;
    this.runner = new MatchRunner(this, {
      ...config,
      container: this.gameLayer,
      home: { ...config.home, club: homeClub },
      away: { ...config.away, club: awayClub },
      seed: Math.floor(Math.random() * 1e6),
      onFinish: config.onFinish,
      onQuit: () => this.enterMenu(),
    });
    if (config.options) Object.assign(this.runner.match.options, config.options);
    this.hud.setVisible(true);
    this.hud.setPenaltyVisible(false);
    this.audio.playMusic('match');
  }

  finishQuickMatch({ summary }) {
    const rewards = computeMatchRewards(this.state, summary, summary.difficulty);
    const levelInfo = applyMatchRewards(this.state, rewards, summary);
    this.audio.play(levelInfo.leveled > 0 ? 'levelUp' : 'coin');
    this.save();
    this.showResults({ summary, rewards, levelInfo });
  }

  finishCareerMatch({ summary }, fixture) {
    const rewards = computeMatchRewards(this.state, summary, summary.difficulty);
    const levelInfo = applyMatchRewards(this.state, rewards, summary);
    const userIsHome = fixture.home === this.state.club.id;
    const playerResult = {
      homeGoals: userIsHome ? summary.score[0] : summary.score[1],
      awayGoals: userIsHome ? summary.score[1] : summary.score[0],
    };
    playMatchday(this.state, { playerResult });
    this.save();
    this.showResults({ summary, rewards, levelInfo, againLabel: this.t('career.playNext'), onAgain: () => this.startCareerMatch() });
  }

  finishTournamentMatch({ summary }, match) {
    const rewards = computeMatchRewards(this.state, summary, summary.difficulty);
    const levelInfo = applyMatchRewards(this.state, rewards, summary);
    const userIsHome = match.home === this.state.club.id;
    const hg = userIsHome ? summary.score[0] : summary.score[1];
    const ag = userIsHome ? summary.score[1] : summary.score[0];
    resolveTournamentMatch(this.state, match, hg, ag, true);
    advanceTournament(this.state);
    this.save();
    this.showResults({ summary, rewards, levelInfo, againLabel: this.t('common.continue'), onAgain: () => this.enterMenu() });
  }

  finishTraining({ summary, training }, drill) {
    this.save();
    this.hud.showResults({
      summary,
      rewards: null,
      training: { ...drill, score: training ? training.score : 0, target: drill.target, done: training ? training.done : false },
      onAgain: () => this.startTraining(drill),
      onMenu: () => this.enterMenu(),
      againLabel: this.t('common.continue'),
    });
  }

  finishPenalty({ shootout, winner }) {
    this.audio.playMusic('menu');
    setTimeout(() => {
      this.runner && this.runner.dispose();
      this.runner = null;
      this.enterMenu();
      this.toast(winner === 'user' ? this.t('penalty.win') : this.t('penalty.lose'));
    }, 1400);
    void shootout;
  }

  showResults(params) {
    this.hud.setVisible(true);
    this.hud.showResults({
      ...params,
      onMenu: () => {
        this.hud.hidePause();
        this.enterMenu();
      },
      onAgain: params.onAgain || (() => this.enterMenu()),
    });
  }

  // ------------------------------------------------------------------ services
  save() {
    this.state.__teamOvr = teamOvr(this.state);
    this.storage.save(this.state);
    this.refreshTopbar();
  }

  setSettings(patch) {
    const before = { ...this.settings };
    this.settings = this.storage.applySettings(patch);
    document.documentElement.style.setProperty('--ui-scale', String(this.settings.buttonScale || 1));
    document.documentElement.style.setProperty('--joystick-side', this.settings.joystickSide === 'right' ? 'right' : 'left');
    if (before.sfxVolume !== undefined) this.audio.setVolumes(this.settings);
    if (this.runner && this.runner.scene && this.runner.scene.setCameraSettings) {
      this.runner.scene.setCameraSettings({
        sensitivity: this.settings.cameraSensitivity,
        zoom: this.settings.cameraZoom,
      });
      this.runner.scene.setCameraMode(this.settings.cameraMode);
    }
    return this.settings;
  }

  setLanguage(code) {
    i18n.setLanguage(code);
    this.setSettings({ language: code });
    this.screens.render();
    this.refreshTopbar();
  }

  openSettings(onClose) {
    this.settingsReturn = onClose || null;
    this.screens.push('settings');
  }

  toast(message) {
    if (!this.toastNode) return;
    this.toastNode.textContent = message;
    this.toastNode.classList.remove('hidden');
    this.toastNode.classList.add('show');
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastNode.classList.remove('show');
      setTimeout(() => this.toastNode.classList.add('hidden'), 220);
    }, 1800);
  }

  refreshTopbar() {
    this.screens.refresh();
  }

  resetProgress() {
    this.state = createNewState();
    this.applyStateToClub();
    this.storage.clear();
    this.save();
    this.toast(this.t('msg.saved'));
  }

  /** Quick FPS sample used by the settings screen. */
  runPerfTest() {
    return new Promise((resolve) => {
      let frames = 0;
      const start = performance.now();
      const tick = () => {
        frames += 1;
        const elapsed = performance.now() - start;
        if (elapsed > 1200) {
          resolve(Math.round((frames / elapsed) * 1000));
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // ------------------------------------------------------------------ lifecycle
  bindGlobal() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.audio.setCrowd(0);
        if (this.runner && this.runner.pause) this.runner.pause();
      } else if (this.runner && this.runner.resume && this.runner.paused) {
        // keep paused: the user resumes explicitly
      }
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (this.mode === 'match' && this.runner) this.runner.togglePause();
        else if (!this.screens.back()) this.enterMenu();
      }
    });
    // Android hardware back button is forwarded by the native activity
    window.UFM = {
      onBackPressed: () => {
        if (this.mode === 'match' && this.runner) {
          this.runner.togglePause();
          return true;
        }
        return this.screens.back();
      },
      version: VERSION,
    };
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    document.addEventListener('gesturestart', (event) => event.preventDefault());
  }

  disposeRunner() {
    if (this.runner) {
      try {
        this.runner.dispose();
      } catch (error) {
        console.warn('runner dispose failed', error);
      }
      this.runner = null;
    }
    this.hud && this.hud.hidePause();
  }

  loop = (time) => {
    requestAnimationFrame(this.loop);
    if (!this.lastFrame) this.lastFrame = time;
    let dt = (time - this.lastFrame) / 1000;
    this.lastFrame = time;
    if (dt > 0.1) dt = 0.1;

    // FPS cap
    const target = this.settings.fpsTarget || 60;
    this.accum += dt;
    if (target <= 30) {
      if (this.accum < 1 / 31) return;
      dt = this.accum;
      this.accum = 0;
    }

    if (this.runner) {
      try {
        this.runner.update(dt);
      } catch (error) {
        console.error('runner update failed', error);
        this.disposeRunner();
        this.enterMenu();
      }
    } else if (this.menuScene) {
      this.menuScene.update(dt);
      this.menuScene.render();
    }
  };

  start() {
    requestAnimationFrame(this.loop);
  }
}

function hashSeed(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % 2147483647;
}

const app = new App();
window.__UFM_APP__ = app;

export function boot() {
  app.boot().then(() => app.start()).catch((error) => {
    console.error('boot failed', error);
    const node = document.createElement('div');
    node.className = 'fatal-error';
    node.textContent = `Boot error: ${error && error.message ? error.message : error}`;
    document.body.appendChild(node);
  });
  return app;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export { app, clear, money, bindButton, clamp, isTouchDevice, LANGUAGES, simulateFixture, isHomeFixture };
