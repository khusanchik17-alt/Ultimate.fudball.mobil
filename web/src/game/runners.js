/**
 * Gameplay runners.
 *
 *  MatchRunner   - full 11v11 match (also used for career/tournament fixtures),
 *                  training drills and CPU-vs-CPU demo backgrounds
 *  PenaltyRunner - penalty shootout with its own compact 3D scene
 *
 * Both own a render scene + HUD binding and are driven by the app loop.
 */
import {
  Scene, PerspectiveCamera, WebGLRenderer, HemisphereLight, DirectionalLight, AmbientLight,
  Mesh, MeshLambertMaterial, SphereGeometry, Vector3, Color, NoToneMapping, SRGBColorSpace, FogExp2,
} from 'three';
import { MatchSim } from '../sim/match.js';
import { MatchScene } from '../render/scene.js';
import { buildStadium } from '../render/stadium.js';
import { buildPlayerModel, animatePlayerModel } from '../render/playerModel.js';
import { Ball } from '../sim/ball.js';
import { FIELD, BALL, TIME_OF_DAY, getDifficulty } from '../sim/constants.js';
import { PenaltyShootout, aimTarget, applyPenaltyError } from '../sim/penalty.js';
import { createBallTexture } from '../render/textures.js';
import { clamp, damp } from '../core/util.js';

export class MatchRunner {
  /**
   * @param {object} app  { settings, audio, hud, input, storage }
   * @param {object} config
   *   { home:{club,lineup,formation,name}, away:{...}, difficulty, minutes, timeOfDay,
   *     mode: 'match'|'training', training: {type, target}, onFinish, onQuit }
   */
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.mode = config.mode || 'match';
    this.finished = false;
    this.paused = false;
    this.rewardsShown = false;
    this.listeners = [];

    const training = this.mode === 'training';
    this.match = new MatchSim({
      home: config.home,
      away: config.away,
      difficulty: config.difficulty || 'NORMAL',
      minutes: config.minutes || app.settings.matchMinutes || 4,
      seed: config.seed || Math.floor(Math.random() * 100000),
      humanTeam: config.humanTeam === undefined ? 0 : config.humanTeam,
      options: training
        ? { noOutOfPlay: config.training?.type === 'freeplay', freePlay: true, infiniteStamina: true, noFouls: config.training?.type === 'freeplay' }
        : {},
    });

    this.scene = new MatchScene(config.container, {
      quality: app.settings.quality,
      timeOfDay: config.timeOfDay || 'night',
      homeClub: config.home.club,
      awayClub: config.away.club,
      cameraMode: app.settings.cameraMode,
      cameraSensitivity: app.settings.cameraSensitivity,
      cameraZoom: app.settings.cameraZoom,
    });

    this.bindEvents();
    this.bindInput();
    if (training) this.setupTraining(config.training);
  }

  bindEvents() {
    const audio = this.app.audio;
    const events = this.match.events;
    const off = [];
    off.push(events.on('ball:kick', ({ kind, power }) => {
      if (kind === 'pass' || kind === 'through' || kind === 'lob') audio.play('pass');
      else if (kind === 'shoot' || kind === 'finesse' || kind === 'chip') audio.play('kick', { power: clamp(power / 30, 0.3, 1) });
      else if (kind === 'clear' || kind === 'cross') audio.play('kick', { power: 0.5 });
      else if (kind === 'dribble') return;
      else audio.play('pass');
      this.scene.burst('kick', this.match.ball.position);
    }));
    off.push(events.on('goal', (payload) => {
      audio.play('goal');
      audio.play('crowdGoal');
      this.scene.burst('goal', this.match.ball.position);
      this.app.hud.banner(this.app.t('match.goal'), payload.scorerName, 'goal');
      this.app.hud.flash('goal');
      if (this.app.settings.haptics !== false) this.app.hud.vibrate(60);
    }));
    off.push(events.on('save', () => { audio.play('save'); this.scene.burst('save', this.match.ball.position); }));
    off.push(events.on('tackle', () => { audio.play('tackle'); this.scene.burst('tackle', this.match.ball.position); }));
    off.push(events.on('whistle', ({ type }) => audio.play(type === 'kickoff' ? 'whistle' : 'whistleShort')));
    off.push(events.on('foul', () => { audio.play('whistleShort'); this.app.hud.banner(this.app.t('match.foul'), '', 'foul'); }));
    off.push(events.on('offside', () => { audio.play('whistleShort'); this.app.hud.banner(this.app.t('match.offside'), '', 'foul'); }));
    off.push(events.on('card', ({ type }) => {
      this.app.hud.banner(type === 'red' ? this.app.t('match.red') : this.app.t('match.yellow'), '', 'card');
    }));
    off.push(events.on('halftime', () => {
      audio.play('whistle');
      this.paused = true;
      this.app.hud.showHalftime(this.match.summary(), () => this.resume());
    }));
    off.push(events.on('fulltime', () => {
      audio.play('whistle');
      this.finishMatch();
    }));
    off.push(events.on('restart', ({ type }) => {
      if (type === 'corner') this.app.hud.banner(this.app.t('match.corner'), '', 'info');
      else if (type === 'penalty') this.app.hud.banner(this.app.t('match.penalty'), '', 'info');
      else if (type === 'throw_in') this.app.hud.banner(this.app.t('match.throwIn'), '', 'info');
    }));
    this.listeners = off;
  }

  bindInput() {
    const input = this.app.input;
    input.onAction = (action, info) => this.handleAction(action, info);
    this.app.hud.setInput(input);
    this.app.hud.handlers.onPause = () => this.pause();
    this.app.hud.handlers.onResume = () => this.resume();
    this.app.hud.handlers.onControls = () => this.app.hud.toggleControlsHelp();
    this.app.hud.handlers.onSettings = () => this.app.openSettings(() => {
      this.scene.setCameraMode(this.app.settings.cameraMode);
      this.scene.setCameraSettings({
        sensitivity: this.app.settings.cameraSensitivity,
        zoom: this.app.settings.cameraZoom,
      });
    });
    this.app.hud.handlers.onQuit = () => this.quit();
  }

  handleAction(action, info = {}) {
    if (this.paused || this.finished) return;
    const match = this.match;
    const hold = info.hold || 0;
    const charge = clamp(hold / 0.85, 0, 1);
    const move = this.app.input.getMove();
    const aimVector = { x: move.x, z: move.z };
    const owner = match.ball.owner;
    const controlled = match.controlledPlayer;
    const inPossession = !!((owner && owner.team === match.humanTeam)
      || (controlled && controlled.team === match.humanTeam && controlled.distanceToBall(match.ball) < 3.5));

    switch (action) {
      case 'shoot': {
        const kind = info.swipe > 0 ? 'chip' : info.swipe < 0 ? 'finesse' : 'shoot';
        match.humanAction(kind, { charge: Math.max(0.25, charge), aimVector });
        break;
      }
      case 'pass': {
        if (!inPossession) {
          if (info.swipe < 0 || hold > 0.35) match.humanAction('slide');
          else match.humanAction('tackle');
          break;
        }
        if (info.swipe > 0) match.humanAction('through', { charge: Math.max(0.3, charge) });
        else match.humanAction('pass', { charge: Math.max(0.3, charge), preferForward: move.z < -0.3 });
        break;
      }
      case 'through': {
        if (!inPossession) {
          match.humanAction('slide');
          break;
        }
        match.humanAction('through', { charge: Math.max(0.35, charge) });
        break;
      }
      case 'tackle': {
        if (inPossession) match.humanAction('tackle', { charge });   // knock-on / shield
        else if (info.swipe < 0 || hold > 0.35) match.humanAction('slide');
        else match.humanAction('tackle');
        break;
      }
      case 'switch':
        match.cycleControlled();
        break;
      case 'sprint':
        break;
      default:
        break;
    }
  }

  setupTraining(training) {
    const type = training?.type || 'freeplay';
    this.training = { type, target: training?.target || 5, score: 0, time: 0, done: false };
    if (type === 'shooting') {
      this.match.events.on('goal', () => {
        this.training.score += 1;
        this.app.hud.setTrainingProgress(this.training.score, this.training.target);
        if (this.training.score >= this.training.target && !this.training.done) {
          this.training.done = true;
          this.app.hud.banner(this.app.t('training.done'), '', 'info');
        }
      });
    } else if (type === 'passing') {
      this.match.events.on('ball:control', ({ player }) => {
        if (this.match.pendingPass === null && player.team === 0) {
          this.training.score += 1;
          this.app.hud.setTrainingProgress(this.training.score, this.training.target);
        }
      });
    }
  }

  get active() {
    return !this.finished;
  }

  update(dt) {
    if (this.paused || this.finished) {
      if (this.scene) this.scene.render();
      return;
    }
    const input = this.app.input;
    input.update(dt);
    const match = this.match;
    const move = input.getMove();
    match.setHumanIntent(move.x, move.z, input.sprintHeld);

    match.update(dt);
    this.training && (this.training.time += dt);

    const excitement = clamp(
      (Math.abs(match.ball.position.x) / FIELD.halfLength) * 0.7
      + (match.state === 'celebration' ? 0.5 : 0)
      + (match.pendingShot ? 0.25 : 0),
      0, 1,
    );
    this.app.audio.setCrowd(excitement * 0.8 + 0.15);
    this.scene.sync(match, dt, { excitement, primaryColor: this.config.home.club.accent });
    this.scene.render();

    this.app.hud.updateMatch(match, dt);
  }

  pause() {
    this.paused = true;
    this.app.hud.showPause(this.match);
  }

  resume() {
    this.paused = false;
    this.app.hud.hidePause();
  }

  togglePause() {
    if (this.paused) this.resume();
    else this.pause();
  }

  finishMatch(stats = null) {
    if (this.finished) return;
    this.finished = true;
    const summary = this.match.summary();
    this.app.hud.hidePause();
    if (this.config.onFinish) {
      this.config.onFinish({ summary, stats, training: this.training });
    }
  }

  quit() {
    this.finished = true;
    if (this.config.onQuit) this.config.onQuit();
  }

  dispose() {
    for (const off of this.listeners) off();
    this.listeners = [];
    if (this.scene) this.scene.dispose();
    if (this.app.input) this.app.input.onAction = null;
  }
}

// ---------------------------------------------------------------------------
// Penalty shootout
// ---------------------------------------------------------------------------
export class PenaltyRunner {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.shootout = new PenaltyShootout({
      difficulty: getDifficulty(config.difficulty || 'NORMAL'),
      rounds: 5,
      seed: config.seed || Math.floor(Math.random() * 99999),
    });
    this.phase = 'wait';
    this.timer = 0;
    this.finished = false;
    this.paused = false;
    this.listeners = [];
    this.roundShots = [];

    this.setupScene();
    this.prepareRound();
    this.bindInput();
  }

  setupScene() {
    const container = this.config.container;
    this.renderer = new WebGLRenderer({ antialias: this.app.settings.quality === 'high', powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.app.settings.quality === 'high' ? 2 : 1.35));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NoToneMapping;
    this.renderer.setClearColor(0x06101c, 1);
    this.canvas = this.renderer.domElement;
    this.canvas.style.position = 'absolute';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.touchAction = 'none';
    container.appendChild(this.canvas);

    this.scene = new Scene();
    const tod = this.config.timeOfDay || 'night';
    const preset = TIME_OF_DAY[tod] || TIME_OF_DAY.night;
    this.scene.add(new HemisphereLight(0xbfd8ff, 0x18240f, preset.ambient + 0.1));
    const sun = new DirectionalLight(preset.sunColor, preset.sun);
    sun.position.set(-40, 70, 30);
    this.scene.add(sun);
    this.scene.add(new AmbientLight(0xffffff, 0.25));
    this.scene.fog = new FogExp2(preset.fog, 0.0032);
    this.scene.background = new Color(preset.sky);

    this.stadium = buildStadium({
      quality: this.app.settings.quality, timeOfDay: tod,
      homeClub: this.config.home.club, awayClub: this.config.away.club,
    });
    this.scene.add(this.stadium.group);

    this.camera = new PerspectiveCamera(45, 16 / 9, 0.4, 500);
    this.camera.position.set(-FIELD.halfLength + 22, 5.2, 0);
    this.camera.lookAt(FIELD.halfLength, 1.4, 0);

    this.ball = new Mesh(new SphereGeometry(BALL.radius, 16, 12), new MeshLambertMaterial({ map: createBallTexture() }));
    this.scene.add(this.ball);

    const shooterKit = {
      shirt: this.config.home.club.primary, shorts: this.config.home.club.secondary,
      socks: this.config.home.club.secondary, gk: this.config.home.club.gk,
    };
    const keeperKit = {
      shirt: this.config.away.club.gk || '#ffd24a', shorts: this.config.away.club.secondary,
      socks: this.config.away.club.secondary, gk: this.config.away.club.gk,
    };
    this.shooter = buildPlayerModel(shooterKit, { detail: this.app.settings.quality === 'low' ? 'low' : 'medium', seed: 3 });
    this.keeper = buildPlayerModel(keeperKit, { detail: this.app.settings.quality === 'low' ? 'low' : 'medium', seed: 9, isGK: true, longSleeves: true });
    this.scene.add(this.shooter.group);
    this.scene.add(this.keeper.group);
    this.shooterState = { swing: 0, lean: 0, celebrate: 0 };
    this.keeperState = { swing: 0, lean: 0, celebrate: 0 };

    this.ballPhysics = new Ball();
    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    this.resize();
  }

  resize() {
    const container = this.config.container;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  bindInput() {
    this.app.input.onAction = (action, info) => this.handleAction(action, info);
    this.app.hud.setInput(this.app.input);
    this.app.hud.setVisible(true);
    this.app.hud.setPenaltyVisible(true);
    this.app.hud.setButtonMode('attack');
    this.app.hud.handlers.onPause = () => this.togglePause();
    this.app.hud.handlers.onResume = () => this.togglePause();
    this.app.hud.handlers.onControls = () => this.app.hud.toggleControlsHelp();
    this.app.hud.handlers.onSettings = () => this.app.openSettings();
    this.app.hud.handlers.onQuit = () => this.quit();
  }

  quit() {
    this.finished = true;
    this.app.hud.setPenaltyVisible(false);
    if (this.config.onQuit) this.config.onQuit();
  }

  prepareRound() {
    const s = this.shootout;
    const spotX = FIELD.halfLength - FIELD.penaltySpot;
    this.ballPhysics.reset(spotX, 0);
    this.ball.position.set(spotX, BALL.radius, 0);
    this.shooter.group.position.set(spotX - 3.4, 0, 0);
    this.shooter.group.rotation.y = Math.PI / 2;
    this.keeper.group.position.set(FIELD.halfLength - 0.35, 0, 0);
    this.keeper.group.rotation.y = -Math.PI / 2;
    this.target = { z: 0, y: 0.8 };
    this.keeperPlan = null;
    this.outcome = null;
    this.aim = { x: 0, y: 0.4 };
    this.charge = 0;
    this.phase = s.turn === 0 ? 'aim' : 'cpu';
    this.timer = s.turn === 0 ? 0 : 1.6;
    this.app.hud.setPenaltyState({
      score: s.score, round: s.round, turn: s.turn, sudden: s.suddenDeath,
      message: s.turn === 0 ? this.app.t('penalty.yourTurn', { n: s.round }) : this.app.t('penalty.cpuTurn', { n: s.round }),
      canShoot: s.turn === 0,
      canDive: s.turn === 1,
    });
  }

  handleAction(action, info = {}) {
    if (this.paused || this.finished) return;
    const s = this.shootout;
    if (this.phase === 'aim' && s.turn === 0) {
      if (action === 'shoot') {
        this.charge = clamp((info.hold || 0) / 0.9, 0.2, 1);
        this.performUserShot();
      }
      return;
    }
    if (this.phase === 'cpu' && s.turn === 1) {
      if (action === 'shoot' || action === 'tackle') {
        this.dive(Math.sign(this.app.input.getMove().x) || (action === 'tackle' ? -1 : 1));
      }
      return;
    }
    if (action === 'switch') {
      // re-aim helper: nothing to do, kept for consistent controls
    }
    void info;
  }

  performUserShot() {
    const s = this.shootout;
    const move = this.app.input.getMove();
    // aim with the joystick: left/right chooses the side, up/down the height
    const aimX = clamp(move.x * 1.05, -1.1, 1.1);
    const aimY = clamp(0.45 - move.z * 0.5, 0.05, 1.1);
    const shooter = { stats: { shooting: 78 } };
    let target = aimTarget(aimX, aimY, this.charge, shooter, s.difficulty);
    if (Math.abs(aimX) < 0.06 && Math.abs(move.z) < 0.06) {
      // no aim input: aim at a corner automatically but with slight error
      target = aimTarget(0.7 * (s.rng() < 0.5 ? -1 : 1), 0.35, this.charge, shooter, s.difficulty);
    }
    target = applyPenaltyError(target, shooter, s.difficulty, s.rng);
    this.target = target;
    this.keeperPlan = s.keeperPlan(target, { data: { stats: { reflexes: 76 } } });
    this.launch(target);
  }

  dive(direction) {
    if (!this.keeperPlan) {
      this.keeperPlan = { dive: direction, height: 0.5, reach: 0.85, guessedRight: false };
    }
    this.keeperPlan.dive = clamp(direction, -1, 1);
    this.app.hud.setPenaltyState({ message: this.app.t('penalty.dive'), canDive: false });
  }

  launch(target) {
    const s = this.shootout;
    this.phase = 'flight';
    this.timer = 0;
    const spotX = FIELD.halfLength - FIELD.penaltySpot;
    const dx = FIELD.halfLength - spotX;
    const dz = target.z;
    const dy = target.y - BALL.radius;
    const distance = Math.hypot(dx, dz);
    const speed = 18 + target.power * 14;
    const dirVec = new Vector3(dx, dy * (speed / Math.max(1, distance)) * 0.4, dz).normalize();
    this.ballPhysics.position.set(spotX, BALL.radius, 0);
    this.ballPhysics.velocity.set(0, 0, 0);
    this.ballPhysics.kick(dirVec, speed, { lift: 0.02, kind: 'shoot' });
    this.shooterState.kick = true;
    this.shooterAction = { type: 'shoot', progress: 0 };
    this.keeperDiveTime = s.turn === 0 ? (this.keeperPlan ? 0.16 : 0.2) : 0.05;
    this.app.hud.setPenaltyState({ canShoot: false, canDive: false, message: '' });
    this.app.audio.play('kick', { power: target.power });
  }

  update(dt) {
    if (this.paused) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    const s = this.shootout;
    this.timer += dt;
    this.stadium.update(this.timer, dt);

    if (this.phase === 'aim') {
      const move = this.app.input.getMove();
      this.charge = clamp(this.charge + dt * (this.app.input.isPressed('shoot') ? 1.6 : -1.1), 0, 1);
      this.target = {
        z: clamp(move.x, -1, 1) * (FIELD.goalWidth / 2),
        y: 0.3 + clamp(0.5 - move.z * 0.5, 0, 1) * (FIELD.goalHeight - 0.5),
      };
      this.app.hud.setPenaltyAim(this.target, this.charge);
    } else if (this.phase === 'cpu') {
      if (this.timer > 1.2) {
        const shooter = { stats: { shooting: 74 } };
        this.target = s.cpuAim(shooter);
        const keeper = { stats: { reflexes: 72 } };
        this.keeperPlan = this.userDive || null;
        if (!this.keeperPlan) {
          // human did not dive: keeper reacts late with a weak guess
          const guess = s.rng() < 0.5 ? -1 : 1;
          this.keeperPlan = { dive: guess * 0.7, height: 0.4, reach: 0.65, guessedRight: false, weak: true };
        }
        this.launch(this.target);
        this.userDive = null;
        void keeper;
      }
    } else if (this.phase === 'flight') {
      this.ballPhysics.update(dt);
      this.ball.position.copy(this.ballPhysics.position);

      // keeper animation
      const plan = this.keeperPlan || { dive: 0, height: 0.4 };
      this.keeperDiveTime -= dt;
      if (this.keeperDiveTime <= 0) {
        const targetZ = plan.dive * (FIELD.goalWidth / 2) * 0.75;
        this.keeper.group.position.z = damp(this.keeper.group.position.z, targetZ, 12, dt);
        this.keeperAnimation = {
          speed: 0,
          phase: this.timer * 6,
          action: 'dive',
          actionProgress: clamp(this.timer / 0.45, 0, 1),
          lean: 0,
          celebrate: 0,
        };
        this.keeperState.diveDir = Math.sign(plan.dive) || 1;
      } else {
        this.keeperAnimation = { speed: 0, phase: this.timer * 4, action: 'idle', actionProgress: 0, lean: 0, celebrate: 0 };
      }

      // shooter kick animation
      if (this.shooterAction) {
        this.shooterAction.progress = clamp(this.timer / 0.5, 0, 1);
      }
      const shooterAnim = {
        speed: 0,
        phase: 0,
        action: this.timer < 0.6 ? 'shoot' : 'idle',
        actionProgress: this.shooterAction ? this.shooterAction.progress : 1,
        lean: 0,
        celebrate: 0,
      };
      animatePlayerModel(this.shooter, shooterAnim, dt, this.shooterState);
      animatePlayerModel(this.keeper, this.keeperAnimation, dt, this.keeperState);

      // outcome detection
      const reachedLine = this.ball.position.x > FIELD.halfLength - 0.4;
      const keeperReachZ = Math.abs(this.ball.position.z - this.keeper.group.position.z);
      const keeperSave = reachedLine && keeperReachZ < (plan.reach * 0.85 + 0.35) && this.ball.position.y < 2.2;
      if (keeperSave) {
        this.resolveOutcome('save');
      } else if (reachedLine) {
        const inside = Math.abs(this.ball.position.z) < FIELD.goalWidth / 2 && this.ball.position.y < FIELD.goalHeight;
        this.resolveOutcome(inside ? 'goal' : 'miss');
      } else if (this.timer > 3) {
        this.resolveOutcome('miss');
      }
    } else if (this.phase === 'result') {
      if (this.timer > 1.6) {
        const next = s.nextTurn();
        if (next === null || s.finished) {
          this.finish();
        } else {
          this.prepareRound();
        }
      }
    }

    // camera: behind the taker, tracking the ball, then a wide celebration shot
    const camTargetX = this.phase === 'flight' ? this.ball.position.x - 6 : FIELD.halfLength - FIELD.penaltySpot - 4.5;
    this.camera.position.x = damp(this.camera.position.x, camTargetX, 4, dt);
    this.camera.position.y = damp(this.camera.position.y, this.phase === 'flight' ? 3.4 : 4.6, 3, dt);
    this.camera.position.z = damp(this.camera.position.z, this.target ? this.target.z * 0.35 : 0, 3, dt);
    this.camera.lookAt(FIELD.halfLength + 1, 1.2, this.phase === 'flight' ? this.ball.position.z * 0.4 : 0);

    this.renderer.render(this.scene, this.camera);
  }

  resolveOutcome(outcome) {
    const s = this.shootout;
    this.phase = 'result';
    this.timer = 0;
    this.outcome = outcome;
    s.record(s.turn, outcome);
    const message = outcome === 'goal' ? this.app.t('match.goal') : outcome === 'save' ? this.app.t('penalty.save') : this.app.t('match.miss');
    this.app.hud.banner(message, '', outcome === 'goal' ? 'goal' : 'save');
    if (outcome === 'goal') {
      this.app.audio.play('goal');
      if (s.turn === 0) this.shooterState.celebrate = 1;
    } else {
      this.app.audio.play('save');
    }
    this.app.hud.setPenaltyState({
      score: s.score, round: s.round, turn: s.turn, sudden: s.suddenDeath,
      message, canShoot: false, canDive: false, history: s.history,
    });
  }

  finish() {
    this.finished = true;
    const s = this.shootout;
    const winner = s.winner;
    this.app.hud.banner(winner === 'user' ? this.app.t('penalty.win') : this.app.t('penalty.lose'), '', winner === 'user' ? 'goal' : 'info');
    if (this.config.onFinish) this.config.onFinish({ shootout: s, winner });
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) this.app.hud.showPause(null, { penalty: true });
    else this.app.hud.hidePause();
  }

  dispose() {
    window.removeEventListener('resize', this.onResize);
    this.app.hud.setPenaltyVisible(false);
    this.stadium.dispose();
    this.scene.traverse((child) => {
      if (child.geometry && child.geometry.dispose) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m.map && m.map.dispose) m.map.dispose();
          m.dispose();
        }
      }
    });
    this.renderer.dispose();
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    if (this.app.input) this.app.input.onAction = null;
  }
}


