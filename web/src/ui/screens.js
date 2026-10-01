/**
 * All non-match screens: main menu, quick-match setup, team builder, players,
 * shop, settings, profile, career, tournament, training and penalty entry.
 *
 * Each screen is a pure builder returning a DOM node; navigation is handled by
 * the ScreenManager (a simple stack with back support + Android back button).
 */
import { el, clear, bar, money, statRow, bindButton, formatClockShort } from './dom.js';
import { CLUBS, ALL_CLUBS, findClub, STADIUMS } from '../game/data/clubs.js';
import { POSITIONS, positionFit } from '../game/data/players.js';
import { FORMATIONS, getFormation } from '../sim/formations.js';
import { DIFFICULTY_ORDER } from '../sim/constants.js';
import { PACKS, LEVEL_BASE_XP, upgradeCost, sellValue, MAX_PLAYER_LEVEL } from '../game/state.js';
import {
  teamOvr, teamRatings, chemistry, buildLineup, lineupPlayers, benchPlayers, setFormation,
  swapPlayers, autoFillSquad, buyMarketPlayer, sellOwnedPlayer, openPack, dailyReward,
  upgradePlayer,
} from '../game/state.js';
import {
  startCareer, nextFixture, playMatchday, sortedTable, careerReward, startTournament,
  currentTournamentMatch, advanceTournament, resolveTournamentMatch, simulateFixture,
} from '../game/progression.js';
import { LANGUAGES } from '../core/i18n.js';
import { clamp } from '../core/util.js';

const SCREEN_NAMES = ['menu', 'matchSetup', 'team', 'teamName', 'players', 'shop', 'settings', 'profile', 'career', 'tournament', 'training', 'penalty'];

export class ScreenManager {
  constructor(app) {
    this.app = app;
    this.container = null;
    this.stack = [];
    this.node = null;
  }

  mount(container) {
    this.container = container;
    this.node = el('div', { class: 'screens' });
    container.appendChild(this.node);
    return this;
  }

  get current() {
    return this.stack[this.stack.length - 1] || null;
  }

  /** Replaces the whole stack (main navigation). */
  show(name, params = {}) {
    this.stack = [{ name, params }];
    this.render();
  }

  push(name, params = {}) {
    this.stack.push({ name, params });
    this.render();
  }

  back() {
    if (this.stack.length > 1) {
      this.stack.pop();
      this.render();
      this.app.audio.play('back');
      return true;
    }
    return false;
  }

  replace(name, params = {}) {
    if (this.stack.length) this.stack.pop();
    this.push(name, params);
  }

  refresh() {
    if (this.current && ['menu', 'profile', 'shop'].includes(this.current.name)) this.render();
  }

  render() {
    const entry = this.current;
    if (!entry || !this.node) return;
    clear(this.node);
    const screen = this.build(entry.name, entry.params);
    if (!screen) return;
    screen.classList.add('screen', 'enter');
    this.node.appendChild(screen);
    requestAnimationFrame(() => screen.classList.remove('enter'));
    this.app.onScreenChange && this.app.onScreenChange(entry.name);
  }

  build(name, params) {
    switch (name) {
      case 'menu': return this.buildMenu();
      case 'matchSetup': return this.buildMatchSetup(params);
      case 'team': return this.buildTeam();
      case 'players': return this.buildPlayers(params);
      case 'shop': return this.buildShop();
      case 'settings': return this.buildSettings(params);
      case 'profile': return this.buildProfile();
      case 'career': return this.buildCareer();
      case 'tournament': return this.buildTournament();
      case 'training': return this.buildTraining();
      case 'penalty': return this.buildPenalty(params);
      default: return this.buildMenu();
    }
  }

  header(title, { back = true, right = null } = {}) {
    const left = back
      ? bindButton(el('button', { class: 'icon-btn back', text: '‹' }), () => this.back(), { audio: this.app.audio, sound: 'back' })
      : el('span', { class: 'icon-btn placeholder' });
    return el('div', { class: 'screen-header' }, [
      left,
      el('h2', { class: 'screen-title', text: title }),
      right || el('span', { class: 'icon-btn placeholder' }),
    ]);
  }

  // -------------------------------------------------------------- main menu
  buildMenu() {
    const app = this.app;
    const state = app.state;
    const logo = el('div', { class: 'logo' }, [
      el('div', { class: 'logo-mark' }, [el('i', { class: 'logo-ball' })]),
      el('h1', { class: 'logo-title', text: app.t('app.title') }),
      el('h2', { class: 'logo-sub', text: app.t('app.subtitle') }),
    ]);

    const nav = [
      ['play', app.t('menu.play'), 'primary', () => this.push('matchSetup'), '▶'],
      ['career', app.t('menu.career'), '', () => this.push('career'), '🏆'],
      ['tournament', app.t('menu.tournament'), '', () => this.push('tournament'), '🥇'],
      ['team', app.t('menu.team'), '', () => this.push('team'), '👥'],
      ['players', app.t('menu.players'), '', () => this.push('players'), '⭐'],
      ['shop', app.t('menu.shop'), '', () => this.push('shop'), '🛒'],
      ['training', app.t('menu.training'), '', () => this.push('training'), '🎯'],
      ['penalty', app.t('menu.penalty'), '', () => this.push('penalty'), '⚽'],
      ['settings', app.t('menu.settings'), '', () => this.push('settings'), '⚙'],
      ['profile', app.t('menu.profile'), '', () => this.push('profile'), '📋'],
    ];

    const grid = el('div', { class: 'menu-grid' }, nav.map(([key, label, cls, action, icon], index) => {
      const node = bindButton(el('button', { class: `menu-tile ${cls}`, dataset: { key } }, [
        el('span', { class: 'tile-icon', text: icon }),
        el('span', { class: 'tile-label', text: label }),
      ]), action, { audio: app.audio });
      node.style.animationDelay = `${index * 28}ms`;
      return node;
    }));

    const topbar = el('div', { class: 'menu-topbar' }, [
      el('div', { class: 'currency' }, [
        el('span', { class: 'coin', text: '🪙' }), el('b', { text: money(state.coins) }),
      ]),
      el('div', { class: 'currency xp' }, [
        el('span', { class: 'lvl', text: `${app.t('common.level')} ${state.level}` }),
        bar((state.xp % LEVEL_BASE_XP) / LEVEL_BASE_XP, 'xp'),
      ]),
      bindButton(el('button', { class: 'icon-btn', text: '⚙' }), () => this.push('settings'), { audio: app.audio }),
    ]);

    const screen = el('div', { class: 'screen menu-screen' }, [logo, topbar, grid]);
    screen.appendChild(el('div', { class: 'menu-footer' }, [
      el('span', { text: `${app.t('profile.engine')}: UFM Engine 1.0` }),
      el('span', { text: `v${app.version}` }),
    ]));
    return screen;
  }

  // -------------------------------------------------------------- match setup
  buildMatchSetup(params = {}) {
    const app = this.app;
    const state = app.state;
    const config = {
      opponentId: params.opponentId || CLUBS[0].id,
      difficulty: params.difficulty || app.settings.lastDifficulty || 'NORMAL',
      minutes: params.minutes || app.settings.matchMinutes || 4,
      timeOfDay: params.timeOfDay || 'night',
      stadiumIndex: params.stadiumIndex || 0,
    };

    const opponentRow = el('div', { class: 'chip-row scroll' });
    const buildOpponents = () => {
      clear(opponentRow);
      for (const club of ALL_CLUBS) {
        const active = club.id === config.opponentId;
        const chip = bindButton(el('button', { class: `club-chip ${active ? 'active' : ''}` }, [
          el('span', { class: 'club-dot', style: { background: club.primary } }),
          el('span', { class: 'club-name', text: club.name }),
          el('span', { class: 'club-rating', text: String(club.rating) }),
        ]), () => {
          config.opponentId = club.id;
          buildOpponents();
        }, { audio: app.audio });
        opponentRow.appendChild(chip);
      }
    };
    buildOpponents();

    const difficultyRow = el('div', { class: 'chip-row' });
    const buildDifficulty = () => {
      clear(difficultyRow);
      for (const key of DIFFICULTY_ORDER) {
        const chip = bindButton(el('button', { class: `chip ${config.difficulty === key ? 'active' : ''}`, text: app.t(`common.${key.toLowerCase()}`) }), () => {
          config.difficulty = key;
          app.setSettings({ lastDifficulty: key });
          buildDifficulty();
        }, { audio: app.audio });
        difficultyRow.appendChild(chip);
      }
    };
    buildDifficulty();

    const minutesRow = el('div', { class: 'chip-row' });
    const buildMinutes = () => {
      clear(minutesRow);
      for (const minutes of [2, 3, 4, 6, 8]) {
        minutesRow.appendChild(bindButton(el('button', {
          class: `chip ${config.minutes === minutes ? 'active' : ''}`,
          text: app.t('setup.minutes', { n: minutes }),
        }), () => {
          config.minutes = minutes;
          app.setSettings({ matchMinutes: minutes });
          buildMinutes();
        }, { audio: app.audio }));
      }
    };
    buildMinutes();

    const timeRow = el('div', { class: 'chip-row' });
    const buildTime = () => {
      clear(timeRow);
      for (const [key, label] of [['day', app.t('setup.day')], ['sunset', app.t('setup.sunset')], ['night', app.t('setup.night')]]) {
        timeRow.appendChild(bindButton(el('button', { class: `chip ${config.timeOfDay === key ? 'active' : ''}`, text: label }), () => {
          config.timeOfDay = key;
          buildTime();
        }, { audio: app.audio }));
      }
    };
    buildTime();

    const stadiumRow = el('div', { class: 'chip-row scroll' });
    const buildStadium = () => {
      clear(stadiumRow);
      STADIUMS.forEach((stadium, index) => {
        stadiumRow.appendChild(bindButton(el('button', {
          class: `chip ${config.stadiumIndex === index ? 'active' : ''}`,
          text: `${stadium.name} · ${Math.round(stadium.capacity / 1000)}k`,
        }), () => {
          config.stadiumIndex = index;
          buildStadium();
        }, { audio: app.audio }));
      });
    };
    buildStadium();

    const ovr = teamOvr(state);
    const start = bindButton(el('button', { class: 'cta', text: app.t('setup.start') }), () => {
      app.startQuickMatch({
        opponentId: config.opponentId,
        difficulty: config.difficulty,
        minutes: config.minutes,
        timeOfDay: config.timeOfDay,
        stadium: STADIUMS[config.stadiumIndex],
      });
    }, { audio: app.audio });

    return el('div', { class: 'screen' }, [
      this.header(app.t('setup.quickMatch')),
      el('div', { class: 'screen-body' }, [
        el('div', { class: 'versus' }, [
          el('div', { class: 'vs-side' }, [
            el('span', { class: 'club-dot big', style: { background: state.club.primary } }),
            el('b', { text: state.club.name }),
            el('span', { class: 'vs-ovr', text: `${app.t('common.ovr')} ${ovr}` }),
          ]),
          el('span', { class: 'vs-tag', text: 'VS' }),
          el('div', { class: 'vs-side right' }, [
            el('span', { class: 'club-dot big', style: { background: findClub(config.opponentId).primary } }),
            el('b', { text: findClub(config.opponentId).name }),
            el('span', { class: 'vs-ovr', text: `${app.t('common.ovr')} ${findClub(config.opponentId).rating}` }),
          ]),
        ]),
        this.section(app.t('setup.opponent'), opponentRow),
        this.section(app.t('setup.difficulty'), difficultyRow),
        this.section(app.t('setup.duration'), minutesRow),
        this.section(app.t('setup.timeOfDay'), timeRow),
        this.section(app.t('setup.stadium'), stadiumRow),
        el('p', { class: 'hint', text: app.t('settings.graphicsHint') }),
      ]),
      el('div', { class: 'screen-footer' }, [start]),
    ]);
  }

  section(title, content) {
    return el('div', { class: 'section' }, [el('h3', { class: 'section-title', text: title }), content]);
  }

  // -------------------------------------------------------------- team builder
  buildTeam() {
    const app = this.app;
    const state = app.state;
    const formation = getFormation(state.formation || '4-3-3');

    const formationRow = el('div', { class: 'chip-row scroll' });
    for (const name of Object.keys(FORMATIONS)) {
      formationRow.appendChild(bindButton(el('button', { class: `chip ${state.formation === name ? 'active' : ''}`, text: name }), () => {
        setFormation(state, name);
        app.save();
        this.render();
      }, { audio: app.audio }));
    }

    let selected = null;
    const pitch = el('div', { class: 'pitch-builder' });
    const lineup = lineupPlayers(state);

    const openBenchSheet = (slotIndex) => {
      selected = slotIndex;
      this.renderBenchSheet(slotIndex, () => this.render());
    };

    formation.slots.forEach((slot, index) => {
      const player = lineup[index];
      const x = (slot.x / 52) * 46 + 50;
      const y = (slot.y / 34) * 62 + 50;
      const node = el('div', {
        class: `pitch-slot role-${slot.role}`,
        style: { left: `${x}%`, top: `${y}%` },
      }, [
        el('span', { class: 'slot-role', text: slot.role }),
        el('b', { class: 'slot-name', text: player ? shortName(player.name) : '—' }),
        el('span', { class: 'slot-ovr', text: player ? String(player.ovr) : '' }),
      ]);
      node.dataset.slot = String(index);
      app.dragger && app.dragger.attach(node, {
        onTap: () => openBenchSheet(index),
        onDrop: (targetSlot) => {
          const other = lineup[Number(targetSlot)];
          if (!other || !player) return;
          swapLineupPositions(state, player.id, other.id, Number(targetSlot), index);
          app.save();
          this.render();
        },
      });
      pitch.appendChild(node);
    });

    const bench = benchPlayers(state);
    const benchList = el('div', { class: 'bench-list' }, bench.slice(0, 12).map((player) => {
      const node = el('div', { class: 'bench-chip' }, [
        el('span', { class: 'pos-tag', text: player.position }),
        el('span', { class: 'bench-name', text: player.name }),
        el('b', { text: String(player.ovr) }),
      ]);
      app.dragger && app.dragger.attach(node, {
        onDragStart: () => { selected = player.id; },
      });
      return node;
    }));

    const ratings = teamRatings(state);
    const statsCard = el('div', { class: 'team-stats' }, [
      el('div', { class: 'ts-row' }, [
        el('span', { text: `${app.t('team.attack')}` }), el('b', { text: String(ratings.ATT) }), bar(ratings.ATT / 99, 'att'),
      ]),
      el('div', { class: 'ts-row' }, [
        el('span', { text: `${app.t('team.midfield')}` }), el('b', { text: String(ratings.MID) }), bar(ratings.MID / 99, 'mid'),
      ]),
      el('div', { class: 'ts-row' }, [
        el('span', { text: `${app.t('team.defence')}` }), el('b', { text: String(ratings.DEF) }), bar(ratings.DEF / 99, 'def'),
      ]),
      el('div', { class: 'ts-row' }, [
        el('span', { text: app.t('team.chemistry') }), el('b', { text: `${chemistry(state)}%` }), bar(chemistry(state) / 100, 'chem'),
      ]),
    ]);

    const nameInput = el('input', { class: 'text-input', value: state.club.name, maxlength: '22' });
    nameInput.addEventListener('change', () => {
      state.club.name = nameInput.value.trim().slice(0, 22) || 'UFM United';
      state.club.short = (state.club.name.replace(/[^A-Za-z\u0400-\u04FF ]/g, '').split(' ').map((w) => w[0]).join('').slice(0, 3) || 'UFM').toUpperCase();
      app.save();
      app.refreshTopbar();
    });

    const kitRow = el('div', { class: 'kit-editor' }, [
      this.kitPicker('primary', state.club, app),
      this.kitPicker('secondary', state.club, app),
      this.kitPicker('gk', state.club, app),
    ]);

    return el('div', { class: 'screen' }, [
      this.header(app.t('team.title')),
      el('div', { class: 'screen-body' }, [
        el('div', { class: 'team-head' }, [
          el('span', { class: 'ovr-badge', text: String(teamOvr(state)) }),
          el('div', { class: 'team-head-info' }, [
            el('b', { text: `${app.t('team.teamOvr')}` }),
            el('span', { text: `${app.t('team.formation')}: ${state.formation}` }),
          ]),
        ]),
        this.section(app.t('team.formation'), formationRow),
        this.section(app.t('team.lineup'), pitch),
        this.section(app.t('team.bench'), el('div', { class: 'bench-wrap' }, [
          benchList,
          bindButton(el('button', { class: 'chip', text: app.t('team.autoFill') }), () => {
            autoFillSquad(state);
            app.save();
            this.render();
          }, { audio: app.audio }),
        ])),
        this.section(app.t('team.teamName'), nameInput),
        this.section(app.t('team.kitEdit'), kitRow),
        statsCard,
        el('p', { class: 'hint', text: app.t('team.tapToSwap') }),
      ]),
    ]);
  }

  kitPicker(key, club, app) {
    const palette = ['#0fd6be', '#0f4c81', '#c8102e', '#1b8a5a', '#ffc940', '#f2762e', '#7b2ff7', '#131313', '#f4f7fb', '#0b6fbf'];
    const wrap = el('div', { class: 'kit-col' }, [
      el('span', { class: 'kit-label', text: key }),
      el('span', { class: 'kit-swatch', style: { background: club[key] } }),
    ]);
    const colors = el('div', { class: 'kit-colors hidden' }, palette.map((color) => el('button', {
      class: 'color-dot', style: { background: color },
      onclick: () => {
        club[key] = color;
        app.save();
        this.render();
      },
    })));
    wrap.addEventListener('click', () => colors.classList.toggle('hidden'));
    wrap.appendChild(colors);
    return wrap;
  }

  renderBenchSheet(slotIndex, onDone) {
    const app = this.app;
    const state = app.state;
    const formation = getFormation(state.formation || '4-3-3');
    const slot = formation.slots[slotIndex];
    const currentId = state.lineupIds[slotIndex];
    const current = state.roster.find((p) => p.id === currentId);
    const candidates = state.roster
      .filter((p) => p.id !== currentId)
      .map((p) => ({ p, fit: positionFit(p.position, slot.role) }))
      .sort((a, b) => (b.fit * 100 + b.p.ovr) - (a.fit * 100 + a.p.ovr));

    const sheet = el('div', { class: 'sheet show' }, [
      el('div', { class: 'sheet-panel' }, [
        el('h3', { class: 'sheet-title', text: `${slot.role} · ${app.t('team.lineup')}` }),
        current ? el('div', { class: 'sheet-current' }, [
          el('span', { class: 'pos-tag', text: current.position }),
          el('b', { text: current.name }),
          el('span', { text: `${app.t('common.ovr')} ${current.ovr}` }),
        ]) : null,
        el('div', { class: 'sheet-list' }, candidates.map(({ p, fit }) => el('div', {
          class: 'sheet-row',
          onclick: () => {
            swapLineupPositions(state, currentId, p.id, slotIndex, state.lineupIds.indexOf(p.id));
            app.save();
            sheet.remove();
            onDone && onDone();
          },
        }, [
          el('span', { class: 'pos-tag', text: p.position }),
          el('b', { class: 'sheet-name', text: p.name }),
          el('span', { class: `fit-badge ${fit >= 0.95 ? 'good' : fit >= 0.8 ? 'ok' : 'bad'}`, text: `${Math.round(fit * 100)}%` }),
          el('span', { class: 'sheet-ovr', text: String(p.ovr) }),
        ]))),
        bindButton(el('button', { class: 'menu-btn ghost', text: app.t('common.cancel') }), () => sheet.remove(), { audio: app.audio }),
      ]),
    ]);
    this.node.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('show'));
  }

  // -------------------------------------------------------------- players
  buildPlayers(params = {}) {
    const app = this.app;
    const state = app.state;
    let sort = params.sort || 'byRating';
    let selected = null;

    const sortRow = el('div', { class: 'chip-row' });
    for (const key of ['byRating', 'byName', 'byPosition']) {
      sortRow.appendChild(bindButton(el('button', { class: `chip ${sort === key ? 'active' : ''}`, text: app.t(`players.${key}`) }), () => {
        sort = key;
        this.replace('players', { sort });
      }, { audio: app.audio }));
    }

    const roster = state.roster.slice();
    if (sort === 'byRating') roster.sort((a, b) => b.ovr - a.ovr);
    else if (sort === 'byName') roster.sort((a, b) => a.name.localeCompare(b.name));
    else roster.sort((a, b) => POSITIONS.indexOf(a.position) - POSITIONS.indexOf(b.position) || b.ovr - a.ovr);

    const list = el('div', { class: 'player-list' });
    for (const player of roster) {
      const inLineup = state.lineupIds.includes(player.id);
      const card = el('div', { class: `player-card ${selected === player.id ? 'selected' : ''} ${inLineup ? 'in-lineup' : ''}` }, [
        el('span', { class: 'pc-ovr', text: String(player.ovr) }),
        el('div', { class: 'pc-main' }, [
          el('b', { class: 'pc-name', text: player.name }),
          el('span', { class: 'pc-meta', text: `${player.position} · ${app.t('common.level')} ${player.level || 1}${player.nation ? ' · ' + player.nation : ''}` }),
        ]),
        el('span', { class: `pos-tag ${player.position}`, text: player.position }),
      ]);
      card.addEventListener('click', () => this.openPlayerSheet(player));
      list.appendChild(card);
    }

    return el('div', { class: 'screen' }, [
      this.header(app.t('players.title'), {
        right: el('span', { class: 'header-currency', text: `🪙 ${money(state.coins)}` }),
      }),
      el('div', { class: 'screen-body' }, [
        this.section(app.t('players.sort'), sortRow),
        list,
      ]),
    ]);
  }

  openPlayerSheet(player) {
    const app = this.app;
    const state = app.state;
    const inLineup = state.lineupIds.includes(player.id);
    const cost = upgradeCost(player);
    const value = sellValue(player);
    const maxed = (player.level || 1) >= MAX_PLAYER_LEVEL;

    const statsList = el('div', { class: 'stat-list' }, Object.entries(player.stats)
      .filter(([key]) => ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'stamina'].includes(key))
      .map(([key, value]) => statRow(app.t(`stats.${key}`), value)));

    const gkStats = player.position === 'GK'
      ? el('div', { class: 'stat-list' }, ['diving', 'handling', 'reflexes', 'positioning', 'kicking']
        .filter((key) => player.stats[key] !== undefined)
        .map((key) => statRow(app.t(`stats.${key}`), player.stats[key])))
      : null;

    const sheet = el('div', { class: 'sheet' }, [
      el('div', { class: 'sheet-panel' }, [
        el('div', { class: 'sheet-head' }, [
          el('span', { class: 'pc-ovr big', text: String(player.ovr) }),
          el('div', {}, [
            el('b', { class: 'sheet-title', text: player.name }),
            el('span', { class: 'sheet-sub', text: `${player.position} · ${app.t('common.level')} ${player.level || 1}${inLineup ? ` · ${app.t('common.equip')}` : ''}` }),
          ]),
        ]),
        statsList,
        gkStats,
        el('div', { class: 'sheet-actions' }, [
          bindButton(el('button', {
            class: `menu-btn ${state.coins >= cost && !maxed ? '' : 'disabled'}`,
            text: maxed ? app.t('players.upgradeMax') : app.t('players.upgradeFor', { coins: money(cost) }),
          }), () => {
            const result = upgradePlayer(state, player.id);
            if (result.ok) {
              app.audio.play('upgrade');
              app.toast(app.t('players.upgraded'));
              app.save();
              sheet.remove();
              this.render();
            } else {
              app.audio.play('error');
              app.toast(result.reason === 'coins' ? app.t('msg.needCoins') : app.t('players.upgradeMax'));
            }
          }, { audio: null }),
          bindButton(el('button', { class: 'menu-btn danger', text: `${app.t('players.sell')} · 🪙 ${money(value)}` }), () => {
            const result = sellOwnedPlayer(state, player.id);
            if (result.ok) {
              app.audio.play('coin');
              app.toast(app.t('players.sold'));
              app.save();
              sheet.remove();
              this.render();
            } else {
              app.audio.play('error');
              app.toast(app.t('msg.noPlayers'));
            }
          }, { audio: null }),
          bindButton(el('button', { class: 'menu-btn ghost', text: app.t('common.close') }), () => sheet.remove(), { audio: app.audio }),
        ]),
      ]),
    ]);
    this.node.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('show'));
  }

  // -------------------------------------------------------------- shop
  buildShop() {
    const app = this.app;
    const state = app.state;
    const packRow = el('div', { class: 'pack-row' }, PACKS.map((pack) => bindButton(el('div', { class: `pack-card ${pack.tier}` }, [
      el('div', { class: 'pack-glow', style: { background: pack.color } }),
      el('span', { class: 'pack-tier', text: app.t(`pack.${pack.tier}`) }),
      el('span', { class: 'pack-count', text: `${pack.count} × ${pack.min}-${pack.max}` }),
      el('span', { class: 'pack-price', text: `🪙 ${money(pack.coins)}` }),
    ]), () => {
      const result = openPack(state, pack.id, Date.now() + Math.floor(Math.random() * 1000));
      if (!result.ok) {
        app.audio.play('error');
        app.toast(app.t('shop.notEnough'));
        return;
      }
      app.audio.play('packOpen');
      app.save();
      this.showPackResult(result.players);
    }, { audio: null })));

    const daily = dailyReward(state);
    const dailyCard = el('div', { class: 'daily-card' }, [
      el('span', { class: 'daily-icon', text: '🎁' }),
      el('div', {}, [
        el('b', { text: app.t('shop.daily') }),
        el('span', { text: app.state.daily.streak ? `🔥 ${app.state.daily.streak}` : '' }),
      ]),
      bindButton(el('button', { class: `chip ${daily.ok ? 'active' : ''}`, text: daily.ok ? app.t('shop.dailyReady') : app.t('shop.claimed') }), () => {
        const result = dailyReward(state);
        if (result.ok) {
          app.audio.play('coin');
          app.toast(`+🪙 ${money(result.coins)}`);
          app.save();
          this.render();
        }
      }, { audio: null }),
    ]);

    const marketList = el('div', { class: 'market-list' }, state.market.slice(0, 20).map((player) => el('div', { class: 'market-row' }, [
      el('span', { class: 'pos-tag', text: player.position }),
      el('div', { class: 'mk-main' }, [
        el('b', { text: player.name }),
        el('span', { text: `${app.t('common.ovr')} ${player.ovr}` }),
      ]),
      bindButton(el('button', { class: 'chip buy', text: `🪙 ${money(player.price)}` }), () => {
        const result = buyMarketPlayer(state, player.id);
        if (result.ok) {
          app.audio.play('coin');
          app.toast(app.t('common.buy'));
          app.save();
          this.render();
        } else {
          app.audio.play('error');
          app.toast(app.t('shop.notEnough'));
        }
      }, { audio: null }),
    ])));

    return el('div', { class: 'screen' }, [
      this.header(app.t('shop.title'), {
        right: el('span', { class: 'header-currency', text: `🪙 ${money(state.coins)}` }),
      }),
      el('div', { class: 'screen-body' }, [
        dailyCard,
        this.section(app.t('shop.coinPacks'), packRow),
        this.section(app.t('shop.packs'), marketList),
      ]),
    ]);
  }

  showPackResult(players) {
    const app = this.app;
    const sheet = el('div', { class: 'sheet pack-sheet' }, [
      el('div', { class: 'sheet-panel' }, [
        el('h3', { class: 'sheet-title', text: app.t('shop.packResult') }),
        el('div', { class: 'pack-result-grid' }, players.map((player, index) => {
          const card = el('div', { class: `pull-card ${player.ovr >= 85 ? 'elite' : player.ovr >= 78 ? 'gold' : player.ovr >= 70 ? 'silver' : 'bronze'}` }, [
            el('span', { class: 'pull-ovr', text: String(player.ovr) }),
            el('span', { class: 'pull-pos', text: player.position }),
            el('span', { class: 'pull-name', text: player.name }),
          ]);
          card.style.animationDelay = `${index * 110}ms`;
          return card;
        })),
        bindButton(el('button', { class: 'menu-btn', text: app.t('common.ok') }), () => {
          sheet.remove();
          this.render();
        }, { audio: app.audio }),
      ]),
    ]);
    this.node.appendChild(sheet);
    requestAnimationFrame(() => sheet.classList.add('show'));
  }

  // -------------------------------------------------------------- settings
  buildSettings() {
    const app = this.app;
    const s = app.settings;
    const body = el('div', { class: 'screen-body' });

    const chipGroup = (title, options, current, onPick) => {
      const row = el('div', { class: 'chip-row' });
      for (const option of options) {
        row.appendChild(bindButton(el('button', { class: `chip ${current() === option.value ? 'active' : ''}`, text: option.label }), () => {
          onPick(option.value);
          this.replace('settings');
        }, { audio: app.audio }));
      }
      return this.section(title, row);
    };

    const slider = (title, key, { min = 0, max = 1, step = 0.05, format = (v) => `${Math.round(v * 100)}%` } = {}) => {
      const input = el('input', { type: 'range', class: 'slider', min: String(min), max: String(max), step: String(step), value: String(s[key]) });
      const label = el('span', { class: 'slider-value', text: format(Number(s[key])) });
      input.addEventListener('input', () => {
        label.textContent = format(Number(input.value));
        app.setSettings({ [key]: Number(input.value) });
      });
      return el('div', { class: 'slider-row' }, [el('span', { class: 'slider-label', text: title }), input, label]);
    };

    body.appendChild(chipGroup(app.t('settings.graphics'), [
      { value: 'auto', label: app.t('settings.graphicsAuto') },
      { value: 'low', label: app.t('common.low') },
      { value: 'medium', label: app.t('common.medium') },
      { value: 'high', label: app.t('common.high') },
    ], () => s.graphics, (value) => app.setSettings({ graphics: value })));

    body.appendChild(chipGroup(app.t('settings.fps'), [
      { value: 'auto', label: app.t('settings.fpsAuto') },
      { value: 30, label: '30' },
      { value: 60, label: '60' },
    ], () => s.fps, (value) => app.setSettings({ fps: value })));

    body.appendChild(this.section(app.t('settings.sound'), el('div', { class: 'slider-col' }, [
      slider(app.t('settings.sound'), 'sfxVolume'),
      slider(app.t('settings.music'), 'musicVolume'),
      slider(app.t('settings.crowd'), 'crowdVolume'),
    ])));

    body.appendChild(chipGroup(app.t('settings.controls'), [
      { value: 0.85, label: 'S' },
      { value: 1, label: 'M' },
      { value: 1.15, label: 'L' },
      { value: 1.3, label: 'XL' },
    ], () => s.buttonScale, (value) => app.setSettings({ buttonScale: value })));

    body.appendChild(chipGroup(app.t('settings.joystickSide'), [
      { value: 'left', label: app.t('settings.left') },
      { value: 'right', label: app.t('settings.right') },
    ], () => s.joystickSide, (value) => app.setSettings({ joystickSide: value })));

    body.appendChild(chipGroup(app.t('settings.cameraMode'), [
      { value: 'broadcast', label: app.t('settings.camBroadcast') },
      { value: 'tele', label: app.t('settings.camTele') },
      { value: 'close', label: app.t('settings.camClose') },
      { value: 'player', label: app.t('settings.camPlayer') },
    ], () => s.cameraMode, (value) => app.setSettings({ cameraMode: value })));

    body.appendChild(this.section(app.t('settings.camera'), el('div', { class: 'slider-col' }, [
      slider(app.t('settings.cameraSensitivity'), 'cameraSensitivity'),
      slider(app.t('settings.cameraZoom'), 'cameraZoom'),
    ])));

    body.appendChild(chipGroup(app.t('settings.haptics'), [
      { value: true, label: app.t('common.on') },
      { value: false, label: app.t('common.off') },
    ], () => s.haptics, (value) => app.setSettings({ haptics: value })));

    const langRow = el('div', { class: 'chip-row' });
    for (const lang of LANGUAGES) {
      langRow.appendChild(bindButton(el('button', {
        class: `chip ${s.language === lang.code ? 'active' : ''}`,
        text: `${lang.flag} ${lang.label}`,
      }), () => {
        app.setLanguage(lang.code);
        this.replace('settings');
      }, { audio: app.audio }));
    }
    body.appendChild(this.section(app.t('settings.language'), langRow));

    const perfButton = bindButton(el('button', { class: 'menu-btn ghost', text: app.t('settings.perfTest') }), async () => {
      const result = await app.runPerfTest();
      app.toast(app.t('settings.perfResult', { fps: result }));
    }, { audio: app.audio });
    body.appendChild(el('div', { class: 'section' }, [perfButton]));

    return el('div', { class: 'screen' }, [
      this.header(app.t('settings.title')),
      body,
    ]);
  }

  // -------------------------------------------------------------- profile
  buildProfile() {
    const app = this.app;
    const state = app.state;
    const st = state.stats;
    const winRate = st.matches ? Math.round((st.wins / st.matches) * 100) : 0;
    const body = el('div', { class: 'screen-body' }, [
      el('div', { class: 'profile-card' }, [
        el('div', { class: 'avatar', text: (state.club.short || 'UFM').slice(0, 2) }),
        el('div', {}, [
          el('b', { text: state.club.name }),
          el('span', { text: `${app.t('profile.level')} ${state.level} · ${st.matches} ${app.t('profile.matches')}` }),
        ]),
        el('span', { class: 'ovr-badge', text: String(teamOvr(state)) }),
      ]),
      el('div', { class: 'xp-block' }, [
        el('span', { text: `${app.t('common.xp')}: ${state.xp} / ${LEVEL_BASE_XP}` }),
        bar(state.xp / LEVEL_BASE_XP, 'xp'),
      ]),
      this.section(app.t('profile.record'), el('div', { class: 'record-grid' }, [
        this.recordCell(app.t('profile.wins'), st.wins, 'win'),
        this.recordCell(app.t('profile.draws'), st.draws, 'draw'),
        this.recordCell(app.t('profile.losses'), st.losses, 'loss'),
        this.recordCell(app.t('profile.matches'), st.matches, ''),
        this.recordCell(app.t('profile.goalsFor'), st.goalsFor, ''),
        this.recordCell(app.t('profile.trophies'), st.trophies, 'gold'),
      ])),
      el('div', { class: 'stat-list' }, [
        statRow(app.t('profile.coinsEarned'), Math.min(99, Math.round(st.coinsEarned / 1000)), 99),
      ]),
      el('p', { class: 'hint', text: `${app.t('profile.version')} ${app.version} · ${winRate}% ${app.t('profile.wins')}` }),
      bindButton(el('button', { class: 'menu-btn danger', text: app.t('profile.reset') }), () => {
        if (window.confirm(app.t('profile.resetConfirm'))) {
          app.resetProgress();
          this.show('menu');
        }
      }, { audio: app.audio }),
      el('p', { class: 'hint', text: app.t('profile.about') }),
    ]);
    return el('div', { class: 'screen' }, [this.header(app.t('profile.title')), body]);
  }

  recordCell(label, value, cls) {
    return el('div', { class: `record-cell ${cls}` }, [
      el('b', { text: String(value) }),
      el('span', { text: label }),
    ]);
  }

  // -------------------------------------------------------------- career
  buildCareer() {
    const app = this.app;
    const state = app.state;
    let body;

    if (!state.career) {
      body = el('div', { class: 'screen-body' }, [
        el('p', { class: 'hint', text: app.t('career.newSeason') }),
        bindButton(el('button', { class: 'cta', text: app.t('career.newSeason') }), () => {
          startCareer(state);
          app.save();
          this.render();
        }, { audio: app.audio }),
      ]);
    } else {
      const career = state.career;
      if (career.finished) {
        const reward = careerReward(state);
        const table = sortedTable(career);
        const position = table.findIndex((row) => row.id === state.club.id) + 1;
        app.save();
        body = el('div', { class: 'screen-body' }, [
          el('h3', { class: 'section-title', text: app.t('career.seasonEnd') }),
          el('div', { class: 'season-end' }, [
            el('b', { text: `#${position}` }),
            el('span', { text: `${app.t('career.points')}: ${table[position - 1] ? table[position - 1].points : 0}` }),
            reward ? el('span', { class: 'reward-tag', text: `+🪙 ${money(reward.coins)}` }) : null,
          ]),
          this.buildLeagueTable(career, state),
          bindButton(el('button', { class: 'cta', text: app.t('career.newSeason') }), () => {
            startCareer(state);
            app.save();
            this.render();
          }, { audio: app.audio }),
        ]);
      } else {
        const fixture = nextFixture(state);
        const isHome = fixture && fixture.home === state.club.id;
        body = el('div', { class: 'screen-body' }, [
          el('div', { class: 'season-head' }, [
            el('span', { text: `${app.t('career.season')} ${career.season}` }),
            el('span', { text: `${app.t('career.matchday')} ${career.matchday + 1}/${career.rounds.length}` }),
          ]),
          fixture ? el('div', { class: 'fixture-card' }, [
            el('span', { class: 'fx-side', text: isHome ? state.club.name : findClub(fixture.home).name }),
            el('span', { class: 'fx-vs', text: 'VS' }),
            el('span', { class: 'fx-side', text: isHome ? findClub(fixture.away).name : state.club.name }),
            el('span', { class: 'fx-tag', text: isHome ? '🏠' : '✈' }),
          ]) : null,
          el('div', { class: 'btn-row' }, [
            bindButton(el('button', { class: 'cta', text: app.t('career.playNext') }), () => {
              app.startCareerMatch();
            }, { audio: app.audio }),
            bindButton(el('button', { class: 'menu-btn ghost', text: app.t('career.simulate') }), () => {
              const result = playMatchday(state, {
                playerResult: simulateFixture(state, fixture.home, fixture.away, Date.now()),
              });
              if (result.ok) {
                app.audio.play('click');
                app.save();
                this.render();
              }
            }, { audio: app.audio }),
          ]),
          this.buildLeagueTable(career, state),
          this.section(app.t('career.fixtures'), el('div', { class: 'fixture-list' }, career.rounds.map((round, index) => el('div', {
            class: `fixture-row ${index === career.matchday ? 'current' : index < career.matchday ? 'done' : ''}`,
          }, [
            el('b', { text: `MD${index + 1}` }),
            el('span', { text: round.filter((f) => f.home === state.club.id || f.away === state.club.id)
              .map((f) => `${findClub(f.home).short} v ${findClub(f.away).short}`).join(' · ') || '—' }),
          ])))),
        ]);
      }
    }

    return el('div', { class: 'screen' }, [
      this.header(app.t('career.title'), { right: el('span', { class: 'header-currency', text: `🪙 ${money(state.coins)}` }) }),
      body,
    ]);
  }

  buildLeagueTable(career, state) {
    const app = this.app;
    const table = sortedTable(career);
    const rows = table.map((row, index) => el('div', { class: `table-row ${row.id === state.club.id ? 'me' : ''}` }, [
      el('span', { class: 't-pos', text: String(index + 1) }),
      el('span', { class: 't-name', text: row.id === state.club.id ? state.club.name : findClub(row.id).name }),
      el('span', { class: 't-num', text: String(row.played) }),
      el('span', { class: 't-num', text: `${row.gf - row.ga}` }),
      el('span', { class: 't-pts', text: String(row.points) }),
    ]));
    return this.section(app.t('career.table'), el('div', { class: 'league-table' }, [
      el('div', { class: 'table-row head' }, [
        el('span', { class: 't-pos', text: '#' }),
        el('span', { class: 't-name', text: app.t('career.team') }),
        el('span', { class: 't-num', text: 'P' }),
        el('span', { class: 't-num', text: 'GD' }),
        el('span', { class: 't-pts', text: 'PTS' }),
      ]),
      ...rows,
    ]));
  }

  // -------------------------------------------------------------- tournament
  buildTournament() {
    const app = this.app;
    const state = app.state;
    let body;

    if (!state.tournament) {
      body = el('div', { class: 'screen-body' }, [
        el('p', { class: 'hint', text: app.t('tournament.cup') }),
        bindButton(el('button', { class: 'cta', text: app.t('tournament.start') }), () => {
          startTournament(state);
          app.save();
          this.render();
        }, { audio: app.audio }),
      ]);
    } else {
      const t = state.tournament;
      const match = currentTournamentMatch(state);
      const rounds = t.rounds.map((round, index) => el('div', { class: `bracket-round ${index === t.round ? 'current' : ''}` }, [
        el('span', { class: 'bracket-label', text: this.roundLabel(t, index) }),
        ...round.map((m) => {
          const playersMatch = m.home === state.club.id || m.away === state.club.id;
          return el('div', { class: `bracket-match ${m.winner ? 'done' : ''} ${playersMatch ? 'mine' : ''}` }, [
            el('span', { class: m.winner === m.home ? 'winner' : '', text: shortClub(state, m.home) }),
            el('span', { text: m.winner ? String(m.homeGoals) : '' }),
            el('span', { text: m.winner ? String(m.awayGoals) : '' }),
            el('span', { class: m.winner === m.away ? 'winner' : '', text: shortClub(state, m.away) }),
            m.penalties ? el('span', { class: 'pen-tag', text: 'P' }) : null,
          ]);
        }),
      ]));

      body = el('div', { class: 'screen-body' }, [
        t.finished
          ? el('div', { class: 'season-end' }, [
            el('b', { text: t.champion === state.club.id ? `🏆 ${app.t('tournament.winner')}` : app.t('tournament.eliminated') }),
            el('span', { text: t.champion ? shortClub(state, t.champion) : '' }),
          ])
          : null,
        match ? el('div', { class: 'btn-row' }, [
          bindButton(el('button', { class: 'cta', text: app.t('tournament.playMatch') }), () => {
            app.startTournamentMatch();
          }, { audio: app.audio }),
          bindButton(el('button', { class: 'menu-btn ghost', text: app.t('tournament.simulateRound') }), () => {
            simulateRound(state, match);
            app.save();
            this.render();
          }, { audio: app.audio }),
        ]) : (!t.finished ? bindButton(el('button', { class: 'cta', text: app.t('common.continue') }), () => {
          advanceTournament(state);
          app.save();
          this.render();
        }, { audio: app.audio }) : null),
        el('div', { class: 'bracket' }, rounds),
        t.finished ? bindButton(el('button', { class: 'menu-btn', text: app.t('tournament.start') }), () => {
          startTournament(state);
          app.save();
          this.render();
        }, { audio: app.audio }) : null,
      ]);
    }

    return el('div', { class: 'screen' }, [this.header(app.t('tournament.title')), body]);
  }

  roundLabel(t, index) {
    const remaining = t.rounds.length - index;
    if (remaining === 1) return this.app.t('tournament.final');
    if (remaining === 2) return this.app.t('tournament.semi');
    if (remaining === 3) return this.app.t('tournament.quarter');
    return this.app.t('tournament.round16');
  }

  // -------------------------------------------------------------- training
  buildTraining() {
    const app = this.app;
    const drills = [
      ['freeplay', 'training.freeplay', '⚽'],
      ['shooting', 'training.shooting', '🎯'],
      ['passing', 'training.passing', '🔁'],
      ['dribbling', 'training.dribbling', '✨'],
      ['goalChallenge', 'training.goalChallenge', '🥅'],
    ];
    const list = el('div', { class: 'drill-list' }, drills.map(([type, key, icon]) => bindButton(el('div', { class: 'drill-card' }, [
      el('span', { class: 'drill-icon', text: icon }),
      el('b', { text: app.t(key) }),
    ]), () => {
      app.startTraining({ type, target: type === 'shooting' ? 5 : 10 });
    }, { audio: app.audio })));

    return el('div', { class: 'screen' }, [
      this.header(app.t('training.title')),
      el('div', { class: 'screen-body' }, [
        list,
        el('p', { class: 'hint', text: app.t('training.exitHint') }),
      ]),
    ]);
  }

  // -------------------------------------------------------------- penalty
  buildPenalty() {
    const app = this.app;
    const state = app.state;
    const difficulty = app.settings.lastDifficulty || 'NORMAL';
    const row = el('div', { class: 'chip-row' });
    for (const key of DIFFICULTY_ORDER) {
      row.appendChild(bindButton(el('button', {
        class: `chip ${difficulty === key ? 'active' : ''}`,
        text: app.t(`common.${key.toLowerCase()}`),
      }), () => {
        app.setSettings({ lastDifficulty: key });
        this.render();
      }, { audio: app.audio }));
    }

    return el('div', { class: 'screen' }, [
      this.header(app.t('penalty.title')),
      el('div', { class: 'screen-body' }, [
        el('div', { class: 'penalty-hero' }, [
          el('span', { class: 'pen-hero-ball', text: '⚽' }),
          el('b', { text: app.t('penalty.title') }),
          el('span', { text: app.t('penalty.aim') }),
        ]),
        this.section(app.t('setup.difficulty'), row),
        bindButton(el('button', { class: 'cta', text: app.t('penalty.shoot') }), () => {
          app.startPenalty({ difficulty, opponentId: CLUBS[0].id, timeOfDay: 'night' });
        }, { audio: app.audio }),
      ]),
    ]);
  }
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function shortName(name) {
  const parts = String(name).split(' ');
  if (parts.length === 1) return parts[0].slice(0, 10);
  return `${parts[0][0]}. ${parts[parts.length - 1]}`.slice(0, 14);
}

function shortClub(state, id) {
  if (id === state.club.id) return state.club.short || 'UFM';
  return findClub(id).short || findClub(id).name.slice(0, 3).toUpperCase();
}

function swapLineupPositions(state, idA, idB, slotA, slotB) {
  if (idA && idB) {
    if (slotA >= 0 && slotB >= 0) {
      state.lineupIds[slotA] = idB;
      state.lineupIds[slotB] = idA;
      return;
    }
  }
  if (idA && slotA >= 0 && idB) {
    state.lineupIds[slotA] = idB;
    return;
  }
  if (idB && slotB >= 0 && idA) {
    state.lineupIds[slotB] = idA;
  }
}

function simulateRound(state, playerMatch) {
  const t = state.tournament;
  const round = t.rounds[t.round];
  if (!round) return;
  for (const match of round) {
    if (match.winner) continue;
    if (match === playerMatch) {
      const sim = simulateFixture(state, match.home, match.away, Date.now() + Math.random() * 1000);
      resolveTournamentMatch(state, match, sim.home, sim.away, false);
    } else {
      const sim = simulateFixture(state, match.home, match.away, Date.now() + Math.random() * 1000);
      resolveTournamentMatch(state, match, sim.home, sim.away, false);
    }
  }
  advanceTournament(state);
}

export { SCREEN_NAMES };
