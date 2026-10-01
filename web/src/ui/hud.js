/**
 * In-match HUD: scoreboard, clock, minimap, virtual joystick, action buttons,
 * banners, pause menu, half-time / full-time overlays and the penalty overlay.
 * Pure DOM + canvas so it stays cheap on low-end phones.
 */
import { el, bindButton, clear, money, formatClockShort, vibrate } from './dom.js';
import { FIELD } from '../sim/constants.js';
import { clamp } from '../core/util.js';

export class HUD {
  constructor(app) {
    this.app = app;
    this.root = null;
    this.input = null;
    this.bannerTimer = null;
    this.minimapAccum = 0;
    this.buttonMode = 'attack';
    this.paused = false;
    this.visible = false;
    this.handlers = {
      onPause: null, onResume: null, onQuit: null, onRematch: null, onMenu: null,
      onControls: null, onSettings: null, onHalftime: null,
    };
  }

  get t() {
    return this.app.t;
  }

  mount(container) {
    this.root = el('div', { class: 'hud hidden' });
    this.buildTopBar();
    this.buildMinimap();
    this.buildControls();
    this.buildBannerLayer();
    this.buildPauseOverlay();
    this.buildResultOverlay();
    this.buildPenaltyOverlay();
    this.buildTrainingChip();
    container.appendChild(this.root);
    return this;
  }

  // ------------------------------------------------------------------ top bar
  buildTopBar() {
    this.homeLabel = el('span', { class: 'sb-team home', text: 'UFM' });
    this.awayLabel = el('span', { class: 'sb-team away', text: 'TAS' });
    this.scoreLabel = el('span', { class: 'sb-score', text: '0 - 0' });
    this.clockLabel = el('span', { class: 'sb-clock', text: "0'" });
    this.halfLabel = el('span', { class: 'sb-half', text: '1ST' });
    this.scoreboard = el('div', { class: 'scoreboard' }, [
      this.homeLabel,
      el('span', { class: 'sb-scorewrap' }, [this.scoreLabel, this.halfLabel]),
      this.awayLabel,
      el('span', { class: 'sb-clockwrap' }, [this.clockLabel]),
    ]);
    this.pauseBtn = bindButton(el('button', { class: 'hud-pause', html: '<i></i><i></i>' }), () => this.handlers.onPause && this.handlers.onPause(), { audio: this.app.audio });
    this.excitementBar = el('div', { class: 'excitement' }, [el('i')]);
    this.topBar = el('div', { class: 'hud-top' }, [this.scoreboard, this.pauseBtn, this.excitementBar]);
    this.root.appendChild(this.topBar);
  }

  // ------------------------------------------------------------------ minimap
  buildMinimap() {
    this.minimap = el('canvas', { class: 'minimap', width: '168', height: '110' });
    this.minimapCtx = this.minimap.getContext('2d');
    this.root.appendChild(this.minimap);
  }

  drawMinimap(match) {
    const ctx = this.minimapCtx;
    const w = this.minimap.width;
    const h = this.minimap.height;
    ctx.clearRect(0, 0, w, h);
    const pad = 4;
    const sx = (w - pad * 2) / FIELD.length;
    const sy = (h - pad * 2) / FIELD.width;
    const toX = (x) => pad + (x + FIELD.halfLength) * sx;
    const toY = (z) => pad + (z + FIELD.halfWidth) * sy;

    ctx.fillStyle = 'rgba(8, 40, 24, 0.72)';
    ctx.fillRect(pad, pad, w - pad * 2, h - pad * 2);
    ctx.strokeStyle = 'rgba(220, 255, 235, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
    ctx.beginPath();
    ctx.moveTo(w / 2, pad);
    ctx.lineTo(w / 2, h - pad);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 9, 0, Math.PI * 2);
    ctx.stroke();
    // penalty boxes
    ctx.strokeRect(pad, toY(-20.16), 16.5 * sx, 40.32 * sy);
    ctx.strokeRect(w - pad - 16.5 * sx, toY(-20.16), 16.5 * sx, 40.32 * sy);

    for (const player of match.players) {
      if (player.sentOff) continue;
      const isHome = player.team === 0;
      ctx.fillStyle = player.isGK ? '#ffd24a' : isHome ? '#0fd6be' : '#ff5d73';
      const size = match.controlledPlayerId === player.id ? 3.4 : 2.2;
      ctx.beginPath();
      ctx.arc(toX(player.pos.x), toY(player.pos.z), size, 0, Math.PI * 2);
      ctx.fill();
      if (match.controlledPlayerId === player.id) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
    const ball = match.ball.position;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(toX(ball.x), toY(ball.z), 2.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // ------------------------------------------------------------------ controls
  buildControls() {
    const input = this.app.input;
    this.stickKnob = el('div', { class: 'stick-knob' });
    this.stickBase = el('div', { class: 'stick-base' }, [this.stickKnob]);
    this.stick = el('div', { class: 'stick-zone' }, [this.stickBase]);
    if (input) input.attachJoystick(this.stickBase, this.stickKnob);

    const mkButton = (action, label, cls, hint) => {
      const node = el('div', { class: `action-btn ${cls}`, dataset: { action } }, [
        el('span', { class: 'btn-label', text: label }),
        hint ? el('span', { class: 'btn-hint', text: hint }) : null,
      ]);
      if (input) input.attachButton(node, action);
      return node;
    };

    this.shootBtn = mkButton('shoot', this.t('hud.shoot'), 'primary', null);
    this.chargeRing = el('div', { class: 'charge-ring' });
    this.shootBtn.appendChild(this.chargeRing);
    this.passBtn = mkButton('pass', this.t('hud.pass'), 'secondary', null);
    this.throughBtn = mkButton('through', this.t('hud.through'), 'tertiary', null);
    this.tackleBtn = mkButton('tackle', this.t('hud.tackle'), 'primary danger', null);
    this.sprintBtn = mkButton('sprint', this.t('hud.sprint'), 'utility', null);
    this.switchBtn = mkButton('switch', this.t('hud.switch'), 'utility', null);

    this.throughLabel = this.throughBtn.querySelector('.btn-label');

    this.buttonPad = el('div', { class: 'button-pad' }, [
      this.tackleBtn, this.throughBtn, this.passBtn, this.shootBtn, this.sprintBtn, this.switchBtn,
    ]);
    this.controlsLayer = el('div', { class: 'hud-controls' }, [this.stick, this.buttonPad]);
    this.root.appendChild(this.controlsLayer);
  }

  /** Swaps the on-screen button set between attacking and defending phases. */
  setButtonMode(mode) {
    if (mode === this.buttonMode) return;
    this.buttonMode = mode;
    const attacking = mode === 'attack';
    this.shootBtn.classList.toggle('hidden', !attacking);
    this.passBtn.querySelector('.btn-label').textContent = attacking ? this.t('hud.pass') : this.t('hud.press');
    this.throughBtn.classList.toggle('hidden', attacking);
    this.tackleBtn.classList.toggle('hidden', attacking);
    this.passBtn.classList.toggle('compact', !attacking);
    this.shootBtn.classList.toggle('compact', attacking ? false : true);
    if (this.throughLabel) this.throughLabel.textContent = this.t('hud.slide');
    this.controlsLayer.classList.toggle('defending', !attacking);
  }

  // ------------------------------------------------------------------ banners
  buildBannerLayer() {
    this.bannerTitle = el('div', { class: 'banner-title', text: '' });
    this.bannerSub = el('div', { class: 'banner-sub', text: '' });
    this.bannerNode = el('div', { class: 'banner' }, [this.bannerTitle, this.bannerSub]);
    this.flashNode = el('div', { class: 'screen-flash' });
    this.bannerLayer = el('div', { class: 'banner-layer' }, [this.bannerNode, this.flashNode]);
    this.root.appendChild(this.bannerLayer);
  }

  banner(title, subtitle, kind = 'info') {
    if (!this.bannerNode) return;
    this.bannerTitle.textContent = title;
    this.bannerSub.textContent = subtitle || '';
    this.bannerNode.className = `banner show ${kind}`;
    if (this.bannerTimer) clearTimeout(this.bannerTimer);
    const duration = kind === 'goal' ? 2600 : 1600;
    this.bannerTimer = setTimeout(() => {
      this.bannerNode.classList.remove('show');
    }, duration);
  }

  flash(kind = 'goal') {
    if (!this.flashNode) return;
    this.flashNode.className = `screen-flash active ${kind}`;
    setTimeout(() => { this.flashNode.className = 'screen-flash'; }, 420);
  }

  vibrate(ms) {
    if (this.app.settings.haptics === false) return;
    vibrate(ms);
  }

  // ------------------------------------------------------------------ pause
  buildPauseOverlay() {
    const btn = (label, key, cls = '') => {
      const node = bindButton(el('button', { class: `menu-btn ${cls}`, text: label }), () => {
        const handler = this.handlers[key];
        if (handler) handler();
      }, { audio: this.app.audio });
      return node;
    };
    this.pauseTitle = el('h2', { class: 'overlay-title', text: this.t('match.paused') });
    this.pauseScore = el('p', { class: 'overlay-sub', text: '' });
    this.controlsPanel = el('div', { class: 'controls-panel hidden' }, this.buildControlsHelp());
    this.pauseOverlay = el('div', { class: 'overlay pause-overlay hidden' }, [
      el('div', { class: 'panel' }, [
        this.pauseTitle,
        this.pauseScore,
        el('div', { class: 'btn-col' }, [
          btn(this.t('match.resume'), 'onResume'),
          btn(this.t('match.controls'), 'onControls', 'ghost'),
          btn(this.t('match.settings'), 'onSettings', 'ghost'),
          btn(this.t('match.quit'), 'onQuit', 'danger'),
        ]),
        this.controlsPanel,
      ]),
    ]);
    this.root.appendChild(this.pauseOverlay);
  }

  buildControlsHelp() {
    const rows = [
      [this.t('hud.pass'), this.t('match.controls')],
    ];
    void rows;
    const items = [
      ['hud.shoot', 'SHOOT — hold to power up, swipe ↓ for finesse, ↑ for chip'],
      ['hud.pass', 'PASS — tap for the smart short pass, swipe ↑ for a lob'],
      ['hud.through', 'THROUGH — threaded ball into space (defence: SLIDE)'],
      ['hud.tackle', 'TACKLE / PRESS — hold to slide in'],
      ['hud.sprint', 'SPRINT — hold to accelerate (watch stamina)'],
      ['hud.switch', 'SWITCH — change the player you control'],
    ];
    return items.map(([key, desc]) => el('div', { class: 'help-row' }, [
      el('b', { text: this.t(key) }),
      el('span', { text: desc.split('—')[1] ? desc.split('—')[1].trim() : desc }),
    ]));
  }

  showPause(match, opts = {}) {
    this.paused = true;
    this.controlsPanel.classList.add('hidden');
    if (match) {
      this.pauseScore.textContent = `${match.teamNames[0]} ${match.score[0]} - ${match.score[1]} ${match.teamNames[1]}`;
    } else {
      this.pauseScore.textContent = opts.penalty ? this.t('penalty.title') : '';
    }
    this.pauseOverlay.classList.remove('hidden');
    requestAnimationFrame(() => this.pauseOverlay.classList.add('show'));
  }

  toggleControlsHelp() {
    this.controlsPanel.classList.toggle('hidden');
  }

  hidePause() {
    this.paused = false;
    this.pauseOverlay.classList.remove('show');
    setTimeout(() => this.pauseOverlay.classList.add('hidden'), 180);
  }

  // ------------------------------------------------------------------ results
  buildResultOverlay() {
    this.resultBody = el('div', { class: 'result-body' });
    this.resultTitle = el('h2', { class: 'overlay-title', text: '' });
    this.resultAgain = bindButton(el('button', { class: 'menu-btn', text: this.t('setup.start') }), () => this.handlers.onRematch && this.handlers.onRematch(), { audio: this.app.audio });
    this.resultMenu = bindButton(el('button', { class: 'menu-btn ghost', text: this.t('common.back') }), () => this.handlers.onMenu && this.handlers.onMenu(), { audio: this.app.audio });
    this.resultOverlay = el('div', { class: 'overlay result-overlay hidden' }, [
      el('div', { class: 'panel wide' }, [
        this.resultTitle,
        this.resultBody,
        el('div', { class: 'btn-row' }, [this.resultAgain, this.resultMenu]),
      ]),
    ]);
    this.root.appendChild(this.resultOverlay);
  }

  showResults({ summary, rewards, levelInfo, training, onAgain, onMenu, againLabel }) {
    this.handlers.onRematch = onAgain;
    this.handlers.onMenu = onMenu;
    if (againLabel) this.resultAgain.textContent = againLabel;
    const won = summary.score[0] > summary.score[1];
    const drew = summary.score[0] === summary.score[1];
    this.resultTitle.textContent = won ? this.t('rewards.win') : drew ? this.t('rewards.draw') : this.t('rewards.loss');
    this.resultTitle.className = `overlay-title ${won ? 'win' : drew ? 'draw' : 'loss'}`;
    clear(this.resultBody);

    this.resultBody.appendChild(el('div', { class: 'final-score' }, [
      el('span', { class: 'fs-team', text: summary.home }),
      el('span', { class: 'fs-score', text: `${summary.score[0]} - ${summary.score[1]}` }),
      el('span', { class: 'fs-team', text: summary.away }),
    ]));

    if (training) {
      this.resultBody.appendChild(el('div', { class: 'result-card' }, [
        el('h3', { text: this.t('training.title') }),
        el('p', { text: `${this.t('training.score')}: ${training.score}/${training.target}${training.done ? ' ✓' : ''}` }),
      ]));
    } else {
      // stats table
      const rows = [
        [this.t('match.possession'), `${summary.possession[0]}%`, `${summary.possession[1]}%`],
        [this.t('match.shots'), summary.stats[0].shots, summary.stats[1].shots],
        [this.t('match.shotsOnTarget'), summary.stats[0].shotsOnTarget, summary.stats[1].shotsOnTarget],
        [this.t('match.passes'), summary.stats[0].passes, summary.stats[1].passes],
        [this.t('match.passAccuracy'), `${summary.passAccuracy[0]}%`, `${summary.passAccuracy[1]}%`],
        [this.t('match.tackles'), summary.stats[0].tackles, summary.stats[1].tackles],
        [this.t('match.fouls'), summary.stats[0].fouls, summary.stats[1].fouls],
        [this.t('match.corners'), summary.stats[0].corners, summary.stats[1].corners],
        [this.t('match.offsides'), summary.stats[0].offsides, summary.stats[1].offsides],
        [this.t('match.saves'), summary.stats[0].saves, summary.stats[1].saves],
      ];
      const table = el('div', { class: 'stats-table' }, rows.map(([label, a, b]) => el('div', { class: 'stats-line' }, [
        el('span', { class: 'st-a', text: String(a) }),
        el('span', { class: 'st-label', text: label }),
        el('span', { class: 'st-b', text: String(b) }),
      ])));
      this.resultBody.appendChild(table);

      if (summary.motm) {
        this.resultBody.appendChild(el('div', { class: 'motm' }, [
          el('span', { class: 'motm-tag', text: this.t('match.manOfTheMatch') }),
          el('b', { text: `${summary.motm.name} ${summary.motm.rating !== undefined ? `· ${summary.motm.rating.toFixed(1)}` : ''}` }),
        ]));
      }

      if (rewards) {
        const lines = [
          [this.t('rewards.base'), `+${money(rewards.breakdown.base)}`],
          [this.t('rewards.goals'), `+${money(rewards.breakdown.goalBonus)}`],
          [this.t('rewards.cleanSheet'), `+${money(rewards.breakdown.cleanSheet)}`],
          [`${this.t('common.coins')} ×${rewards.breakdown.multiplier}`, ''],
        ];
        this.resultBody.appendChild(el('div', { class: 'result-card rewards' }, [
          el('h3', { text: this.t('rewards.title') }),
          el('div', { class: 'reward-lines' }, lines.map(([label, value]) => el('div', { class: 'reward-line' }, [
            el('span', { text: label }), el('b', { text: value }),
          ]))),
          el('div', { class: 'reward-total' }, [
            el('span', { class: 'coin-icon', text: '🪙' }),
            el('b', { text: money(rewards.coins) }),
            el('span', { class: 'xp-chip', text: `+${rewards.xp} XP` }),
          ]),
          levelInfo && levelInfo.leveled > 0 ? el('p', { class: 'levelup', text: `${this.t('rewards.levelUp')} → ${this.t('common.level')} ${levelInfo.level}` }) : null,
        ]));
      }
    }

    this.resultOverlay.classList.remove('hidden');
    requestAnimationFrame(() => this.resultOverlay.classList.add('show'));
  }

  // ------------------------------------------------------------------ training
  buildTrainingChip() {
    this.trainingChip = el('div', { class: 'training-chip hidden' }, [
      el('span', { class: 'tc-label', text: this.t('training.title') }),
      el('b', { class: 'tc-score', text: '0/0' }),
    ]);
    this.root.appendChild(this.trainingChip);
  }

  setTrainingProgress(score, target) {
    this.trainingChip.classList.remove('hidden');
    this.trainingChip.querySelector('.tc-score').textContent = `${score}/${target}`;
  }

  // ------------------------------------------------------------------ penalty
  buildPenaltyOverlay() {
    this.penScore = el('div', { class: 'pen-score', text: '0 - 0' });
    this.penRound = el('div', { class: 'pen-round', text: '' });
    this.penMessage = el('div', { class: 'pen-message', text: '' });
    this.penHistory = el('div', { class: 'pen-history' });
    this.penAim = el('div', { class: 'pen-aim hidden' }, [el('i', { class: 'pen-aim-dot' })]);
    this.penPower = el('div', { class: 'pen-power' }, [el('i')]);
    this.penTop = el('div', { class: 'pen-top' }, [this.penScore, this.penRound, this.penHistory]);
    this.penaltyOverlay = el('div', { class: 'penalty-overlay hidden' }, [this.penTop, this.penAim, this.penMessage, this.penPower]);
    this.root.appendChild(this.penaltyOverlay);
  }

  setPenaltyVisible(visible) {
    this.penaltyOverlay.classList.toggle('hidden', !visible);
    this.topBar.classList.toggle('hidden', visible);
    this.minimap.classList.toggle('hidden', visible);
    this.controlsLayer.classList.toggle('penalty-mode', visible);
    if (visible) this.setButtonMode('attack');
  }

  setPenaltyState(state) {
    if (!state) return;
    if (state.score) this.penScore.textContent = `${state.score[0]} - ${state.score[1]}`;
    if (state.round !== undefined) {
      this.penRound.textContent = `${this.t('penalty.title')} · ${state.round}${state.sudden ? ` · ${this.t('penalty.sudden')}` : ''}`;
    }
    if (state.message !== undefined) this.penMessage.textContent = state.message;
    if (state.canShoot) this.shootBtn.classList.remove('hidden');
    else this.shootBtn.classList.add('hidden');
    this.tackleBtn.classList.toggle('hidden', !state.canDive);
    if (state.history) {
      clear(this.penHistory);
      for (const shot of state.history) {
        this.penHistory.appendChild(el('i', { class: `pen-dot ${shot.outcome} ${shot.team === 0 ? 'user' : 'cpu'}` }));
      }
    }
  }

  setPenaltyAim(target, charge) {
    this.penAim.classList.remove('hidden');
    const goalHalf = FIELD.goalWidth / 2;
    const x = clamp(target.z / (goalHalf + 0.6), -1, 1);
    const y = clamp(target.y / FIELD.goalHeight, 0, 1);
    this.penAim.style.transform = `translate(${x * 42}%, ${(0.5 - y) * 90}%)`;
    this.penPower.querySelector('i').style.width = `${Math.round(charge * 100)}%`;
  }

  // ------------------------------------------------------------------ per-frame
  setInput(input) {
    this.input = input;
  }

  setVisible(visible) {
    this.visible = visible;
    this.root.classList.toggle('hidden', !visible);
    if (this.input) this.input.setEnabled(visible);
  }

  updateMatch(match, dt) {
    if (!this.visible) return;
    const score = `${match.score[0]} - ${match.score[1]}`;
    if (this.scoreLabel.textContent !== score) this.scoreLabel.textContent = score;
    const clock = match.displayClock;
    if (this.clockLabel.textContent !== clock) this.clockLabel.textContent = clock;
    this.halfLabel.textContent = match.half === 1 ? '1ST' : '2ND';
    this.homeLabel.textContent = match.teamNames[0];
    this.awayLabel.textContent = match.teamNames[1];

    // attacking / defending button set
    const owner = match.ball.owner;
    const controlled = match.controlledPlayer;
    const defending = !(owner && owner.team === match.humanTeam)
      && !(controlled && controlled.team === match.humanTeam && controlled.distanceToBall(match.ball) < 3.5);
    this.setButtonMode(defending ? 'defend' : 'attack');

    // shot charge ring
    if (this.input && this.visible) {
      const hold = this.input.isPressed('shoot') ? this.input.holdTime('shoot') : 0;
      const charge = clamp(hold / 0.85, 0, 1);
      this.chargeRing.style.setProperty('--charge', charge.toFixed(3));
      this.chargeRing.classList.toggle('active', charge > 0.02);
    }

    // minimap at 20 fps
    this.minimapAccum += dt;
    if (this.minimapAccum > 0.05) {
      this.minimapAccum = 0;
      this.drawMinimap(match);
    }

    // possession/excitement bar
    const possession = match.possessionPercent();
    const bar = this.excitementBar.firstChild;
    if (bar) bar.style.width = `${possession[0]}%`;
  }

  showHalftime(summary, onContinue) {
    this.handlers.onHalftime = onContinue;
    const win = summary.score[0] > summary.score[1];
    this.banner(this.t('match.halftime'), `${summary.home} ${summary.score[0]} - ${summary.score[1]} ${summary.away}`, 'info');
    const node = el('div', { class: 'overlay halftime-overlay show' }, [
      el('div', { class: 'panel' }, [
        el('h2', { class: 'overlay-title', text: this.t('match.halftime') }),
        el('p', { class: 'overlay-sub', text: `${summary.possession[0]}% · ${this.t('match.shots')} ${summary.stats[0].shots}-${summary.stats[1].shots}` }),
        el('p', { class: 'final-score', text: `${summary.score[0]} - ${summary.score[1]}` }),
        bindButton(el('button', { class: 'menu-btn', text: this.t('common.continue') }), () => {
          node.remove();
          if (onContinue) onContinue();
        }, { audio: this.app.audio }),
      ]),
    ]);
    this.root.appendChild(node);
    void win;
  }

  dispose() {
    if (this.bannerTimer) clearTimeout(this.bannerTimer);
    if (this.root && this.root.parentNode) this.root.parentNode.removeChild(this.root);
    this.root = null;
  }
}

export { formatClockShort };
