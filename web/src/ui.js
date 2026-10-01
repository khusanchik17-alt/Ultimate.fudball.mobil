// All menu screens, HUD overlays and navigation.
import { GAME } from './config.js';
import { t, setLanguage, LANGS } from './i18n.js';
import { getSave, persist, persistSoon, resetSave, xpForLevel } from './save.js';
import { levelProgress } from './meta.js';
import { CLUBS, clubById, DIFFICULTIES, FORMATIONS, autoPickXI, POSITIONS, playerValue, upgradeCost, roleOf } from './data.js';
import {
  applyMatchResult, buyPlayer, sellPlayer, upgradePlayer, getSquadPlayers, ownedPlayer,
  getMarket, startTournament, currentTournamentMatch, advanceTournament,
  startCareer, nextCareerFixture, applyCareerResult, careerTable, ensureLineup, lineupXI
} from './meta.js';
import { el, fmtClock } from './utils.js';
import { sfx, applyVolumes } from './audio.js';

// ================================================================ helpers
const uiRoot = () => document.getElementById('ui-root');

export function toast(msg, bad = false) {
  const root = document.getElementById('toast-root');
  const n = el('div', 'toast' + (bad ? ' bad' : ''), msg);
  root.appendChild(n);
  setTimeout(() => { n.style.opacity = '0'; n.style.transition = 'opacity .3s'; setTimeout(() => n.remove(), 320); }, 1900);
}

function modal(content, opts = {}) {
  const wrap = el('div', 'modal-wrap');
  const m = el('div', 'panel modal');
  m.appendChild(content);
  wrap.appendChild(m);
  if (!opts.sticky) {
    wrap.addEventListener('pointerdown', (e) => { if (e.target === wrap) wrap.remove(); });
  }
  uiRoot().appendChild(wrap);
  return wrap;
}

function topbar(title, onBack, right) {
  const bar = el('div', 'topbar');
  if (onBack) {
    const b = el('button', 'back-btn', '‹');
    b.addEventListener('click', () => { sfx.click(); onBack(); });
    bar.appendChild(b);
  } else bar.appendChild(el('span'));
  const tt = el('div', 'title', title);
  bar.appendChild(tt);
  bar.appendChild(right || el('span'));
  return bar;
}

function coinsChip() {
  const s = getSave();
  const c = el('span', 'chip gold', `<span class="coin"></span> ${s.coins.toLocaleString()}`);
  return c;
}
function refreshCoins() {
  document.querySelectorAll('.coin-holder').forEach(h => {
    h.innerHTML = '';
    h.appendChild(coinsChip());
  });
}

function makeScreen(title, onBack, right) {
  uiRoot().innerHTML = '';
  const scr = el('div', 'screen');
  scr.style.background = 'linear-gradient(180deg, rgba(3,14,7,0.30), rgba(3,14,7,0.78))';
  scr.appendChild(topbar(title, onBack, right));
  const content = el('div', 'content');
  scr.appendChild(content);
  uiRoot().appendChild(scr);
  return content;
}

function btn(label, cls, onclick) {
  const b = el('button', 'btn ' + (cls || ''), label);
  b.addEventListener('click', () => { sfx.click(); onclick(); });
  return b;
}

function segmented(options, current, onPick) {
  const seg = el('div', 'seg');
  for (const o of options) {
    const d = el('div', 'opt' + (o.id === current ? ' on' : ''), o.label);
    d.addEventListener('click', () => {
      sfx.click();
      seg.querySelectorAll('.opt').forEach(x => x.classList.remove('on'));
      d.classList.add('on');
      onPick(o.id);
    });
    seg.appendChild(d);
  }
  return seg;
}

function statBar(name, val) {
  return `<div class="stat-bar"><span class="nm">${name}</span><span class="tr"><span class="fl" style="width:${val}%"></span></span><span class="vl">${val}</span></div>`;
}

function crestBall(club, size = 52) {
  return `<span class="crest-ball" style="width:${size}px;height:${size}px;background:radial-gradient(circle at 32% 28%, #ffffff22, ${club.color});border:2px solid ${club.color2}"></span>`;
}

// ================================================================ splash
export function showSplash(onDone) {
  uiRoot().innerHTML = '';
  const s = el('div', 'splash');
  s.innerHTML = `
    <svg class="crest" viewBox="0 0 120 140">
      <defs>
        <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1d7a41"/><stop offset="1" stop-color="#062814"/>
        </linearGradient>
        <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe9a3"/><stop offset="1" stop-color="#c8871a"/>
        </linearGradient>
      </defs>
      <path d="M60 4 L112 22 V74 C112 108 88 128 60 137 C32 128 8 108 8 74 V22 Z" fill="url(#sh)" stroke="url(#gd)" stroke-width="4"/>
      <circle cx="60" cy="66" r="26" fill="#ffffff"/>
      <path d="M60 52 l9 7 -3.5 11 h-11 L51 59 Z" fill="#14181d"/>
      <path d="M60 4 l10 3.4 v7 L60 11 50 14.4 v-7 Z" fill="url(#gd)"/>
      <path d="M42 30 l18 -7 18 7 -4 5 -14 -5 -14 5 Z" fill="url(#gd)" opacity="0.9"/>
    </svg>
    <h1>${GAME.name}</h1>
    <div class="tag">${t('tagline')} · ${GAME.season}</div>
    <div class="bar"><i id="splash-bar"></i></div>`;
  uiRoot().appendChild(s);
  let p = 0;
  const bar = s.querySelector('#splash-bar');
  const iv = setInterval(() => {
    p = Math.min(100, p + 8 + Math.random() * 14);
    bar.style.width = p + '%';
    if (p >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        s.style.transition = 'opacity .5s';
        s.style.opacity = '0';
        setTimeout(() => { s.remove(); onDone(); }, 480);
      }, 350);
    }
  }, 120);
}

// ================================================================ home
export function showHome(app) {
  uiRoot().innerHTML = '';
  const s = el('div', 'screen home');
  s.style.background = 'linear-gradient(180deg, rgba(3,14,7,0.42) 0%, rgba(3,14,7,0.18) 40%, rgba(3,14,7,0.82) 100%)';
  const save = getSave();
  const lp = levelProgress();

  const holder = el('span', 'coin-holder');
  holder.appendChild(coinsChip());

  s.innerHTML = '';
  const hero = el('div', 'hero');
  hero.innerHTML = `
    <div class="season">${GAME.season} · ${t('offline_note')}</div>
    <div class="game-title">${GAME.name}</div>`;
  s.appendChild(hero);

  const menu = el('div', 'menu');
  const big = el('button', 'btn big-play', `⚽ ${t('play')}`);
  big.addEventListener('click', () => { sfx.click(); showModes(app); });
  menu.appendChild(big);
  const items = [
    ['🏟', t('match'), () => showQuickSetup(app)],
    ['🏆', t('tournament'), () => showTournament(app)],
    ['👕', t('team'), () => showTeam(app)],
    ['🃏', t('players'), () => showPlayers(app)],
    ['🛒', t('shop'), () => showShop(app)],
    ['⚙️', t('settings'), () => showSettings(app)],
    ['👤', t('profile'), () => showProfile(app)],
    ['⚽', t('career'), () => showCareer(app)]
  ];
  for (const [ico, label, fn] of items) {
    const b = el('button', 'btn', `<span class="ico">${ico}</span><span>${label}</span>`);
    b.addEventListener('click', () => { sfx.click(); fn(); });
    menu.appendChild(b);
  }
  s.appendChild(menu);

  const foot = el('div', 'foot');
  foot.innerHTML = `
    <span class="chip">👤 ${save.profile.name} · ${t('level')} ${lp.lvl}</span>`;
  foot.appendChild(holder);
  s.appendChild(foot);
  uiRoot().appendChild(s);
}

// ================================================================ modes
export function showModes(app) {
  const c = makeScreen(t('choose_mode'), () => showHome(app));
  const list = el('div', 'list');
  const modes = [
    ['quick', '⚽', t('quick_match'), t('quick_desc'), () => showQuickSetup(app)],
    ['career', '📅', t('career'), t('career_desc'), () => showCareer(app)],
    ['tournament', '🏆', t('tournament'), t('tournament_desc'), () => showTournament(app)],
    ['penalty', '🥅', t('penalty'), t('penalty_desc'), () => app.startPenalty()],
    ['training', '🎯', t('training'), t('training_desc'), () => app.startTraining()],
    ['online', '🌐', t('online'), t('online_desc') + ' — ' + t('soon'), null]
  ];
  for (const [id, ico, title, desc, fn] of modes) {
    const r = el('div', 'row-item');
    r.innerHTML = `<span style="font-size:26px">${ico}</span><div class="grow"><div class="t1">${title}</div><div class="t2">${desc}</div></div>${fn ? '' : '<span class="chip">🔒</span>'}`;
    if (fn) r.addEventListener('click', () => { sfx.click(); fn(); });
    else r.style.opacity = '0.55';
    list.appendChild(r);
  }
  c.appendChild(list);
}

// ================================================================ quick setup
export function showQuickSetup(app) {
  const save = getSave();
  const c = makeScreen(t('quick_match'), () => showModes(app));
  const myClub = clubById(save.clubId);
  const others = CLUBS.filter(x => x.id !== save.clubId);
  let opp = others[0].id;
  let diff = save.settings.difficulty;
  let night = save.settings.dayNight === 'night';

  const box = el('div', 'panel');
  box.style.cssText = 'padding:14px;margin-bottom:10px;';
  box.innerHTML = `
    <div class="row" style="justify-content:space-between">
      <div class="center">${crestBall(myClub)}<div class="t2" style="margin-top:4px;font-size:12px">${myClub.name}</div></div>
      <div style="font-weight:900;font-size:20px;color:var(--ufm-gold)">VS</div>
      <div class="center" id="opp-badge">${crestBall(clubById(opp))}<div class="t2" style="margin-top:4px;font-size:12px" id="opp-name">${clubById(opp).name}</div></div>
    </div>`;
  c.appendChild(box);

  c.appendChild(el('div', 'sect-title', t('opp_choose')));
  const oppSeg = el('div', 'seg');
  for (const o of others) {
    const d = el('div', 'opt' + (o.id === opp ? ' on' : ''), o.short);
    d.style.borderColor = o.color;
    d.addEventListener('click', () => {
      opp = o.id;
      oppSeg.querySelectorAll('.opt').forEach(x => x.classList.remove('on'));
      d.classList.add('on');
      c.querySelector('#opp-badge').innerHTML = crestBall(o) + `<div class="t2" style="margin-top:4px;font-size:12px">${o.name}</div>`;
      sfx.click();
    });
    oppSeg.appendChild(d);
  }
  c.appendChild(oppSeg);

  c.appendChild(el('div', 'sect-title', t('difficulty')));
  const diffSeg = segmented(
    Object.keys(DIFFICULTIES).map(k => ({ id: k, label: t(DIFFICULTIES[k].label) })),
    diff, (id) => { diff = id; }
  );
  c.appendChild(diffSeg);

  c.appendChild(el('div', 'sect-title', t('time_of_day')));
  c.appendChild(segmented([
    { id: 'day', label: '☀️ ' + t('day') }, { id: 'night', label: '🌙 ' + t('night') }
  ], night ? 'night' : 'day', (id) => { night = id === 'night'; }));

  const start = btn('⚽ ' + t('start_match'), 'primary block', () => {
    save.settings.difficulty = diff;
    save.settings.dayNight = night ? 'night' : 'day';
    persistSoon();
    app.startMatch({
      opponent: clubById(opp), difficulty: diff, night,
      mode: 'quick', allowDraw: true
    });
  });
  start.style.marginTop = '18px';
  c.appendChild(start);
}

// ================================================================ team builder
export function showTeam(app) {
  const save = getSave();
  ensureLineup();
  const c = makeScreen(t('team'), () => showHome(app));
  let formation = save.lineup.formation;

  const header = el('div', 'panel center');
  header.style.cssText = 'padding:10px;margin-bottom:10px;';
  header.innerHTML = `<span class="chip gold">${t('team_ovr')}: <b id="tovr"></b></span> <span class="chip">${clubById(save.clubId).name}</span>`;
  c.appendChild(header);

  c.appendChild(el('div', 'sect-title', t('formation')));
  const fSeg = segmented(Object.keys(FORMATIONS).map(f => ({ id: f, label: f })), formation, (f) => {
    formation = f;
    save.lineup.formation = f;
    // rebuild lineup for new formation
    save.lineup.slots = autoPickXI(getSquadPlayers(), f);
    persistSoon();
    render();
  });
  c.appendChild(fSeg);

  const pitch = el('div', 'pitch2d');
  pitch.innerHTML = `<div class="line half"></div><div class="circle"></div>`;
  c.appendChild(pitch);

  const hint = el('div', 'muted center mb', t('lineup_hint'));
  c.appendChild(hint);

  let selected = -1;

  function render() {
    const squad = getSquadPlayers();
    ensureLineup();
    const slots = FORMATIONS[formation];
    pitch.querySelectorAll('.slot-token').forEach(x => x.remove());
    slots.forEach((slot, i) => {
      const pid = save.lineup.slots[i];
      const p = pid ? (ownedPlayer(pid)) : null;
      const tok = el('div', 'slot-token');
      tok.style.left = `${50 + slot.y * 42}%`;
      tok.style.top = `${92 - slot.x * 82}%`;
      tok.style.setProperty('--tk', clubById(save.clubId).color);
      tok.innerHTML = `<div class="dot">${p ? p.ovr : slot.pos}</div><div class="nm2">${p ? p.name.split(' ')[1] || p.name : slot.pos}</div>`;
      if (i === selected) tok.classList.add('sel');
      tok.addEventListener('click', () => {
        sfx.click();
        if (selected === -1) { selected = i; }
        else if (selected === i) { selected = -1; }
        else {
          const tmp = save.lineup.slots[selected];
          save.lineup.slots[selected] = save.lineup.slots[i];
          save.lineup.slots[i] = tmp;
          selected = -1;
          persistSoon();
        }
        render();
      });
      pitch.appendChild(tok);
    });
    const ovrEl = c.querySelector('#tovr');
    if (ovrEl) {
      const ids = save.lineup.slots.filter(Boolean);
      const ps = ids.map(id => ownedPlayer(id)).filter(Boolean);
      ovrEl.textContent = ps.length ? Math.round(ps.reduce((s, p) => s + p.ovr, 0) / ps.length) : '—';
    }
    renderBench();
  }

  const benchTitle = el('div', 'sect-title', t('bench'));
  c.appendChild(benchTitle);
  const bench = el('div', 'grid-cards');
  c.appendChild(bench);

  function renderBench() {
    bench.innerHTML = '';
    const inLineup = new Set(save.lineup.slots.filter(Boolean));
    const squad = getSquadPlayers().filter(p => !inLineup.has(p.id)).sort((a, b) => b.ovr - a.ovr);
    for (const p of squad) {
      const card = el('div', 'pcard');
      card.innerHTML = `<div class="row" style="justify-content:space-between"><span class="ovr">${p.ovr}</span><span class="pos">${p.pos}</span></div><div class="nm">${p.name}</div>`;
      card.addEventListener('click', () => {
        if (selected >= 0) {
          // sub in: swap with selected slot
          const old = save.lineup.slots[selected];
          save.lineup.slots[selected] = p.id;
          if (old && !save.lineup.slots.includes(old)) { /* old goes to bench automatically */ }
          selected = -1;
          persistSoon();
          sfx.success();
          render();
        } else toast(t('lineup_hint'));
      });
      bench.appendChild(card);
    }
  }

  const autoBtn = btn('✨ ' + t('auto_pick'), 'ghost block', () => {
    save.lineup.slots = autoPickXI(getSquadPlayers(), formation);
    persistSoon();
    render();
  });
  autoBtn.style.marginTop = '12px';
  c.appendChild(autoBtn);

  render();
}

// ================================================================ players
export function showPlayers(app) {
  const c = makeScreen(t('players'), () => showHome(app), coinsChipHolder());
  const grid = el('div', 'grid-cards');
  const squad = getSquadPlayers().sort((a, b) => b.ovr - a.ovr);
  for (const p of squad) {
    const card = el('div', 'pcard');
    const club = clubById(p.club);
    card.style.setProperty('--pc', club.color + '33');
    card.innerHTML = `
      <div class="row" style="justify-content:space-between"><span class="ovr">${p.ovr}</span><span class="pos">${p.pos}</span></div>
      <div class="nm">${p.name}</div>
      <div class="club">${club.name}</div>`;
    card.addEventListener('click', () => { sfx.click(); playerDetail(p.id, () => { showPlayers(app); }); });
    grid.appendChild(card);
  }
  c.appendChild(grid);
}

function coinsChipHolder() {
  const h = el('span', 'coin-holder');
  h.appendChild(coinsChip());
  return h;
}

function playerDetail(id, onClose) {
  const save = getSave();
  const p = ownedPlayer(id);
  if (!p) return;
  const club = clubById(p.club);
  const wrap = el('div');
  const val = playerValue(p);
  const cost = upgradeCost(p);
  wrap.innerHTML = `
    <h3>${p.name}</h3>
    <div class="row" style="justify-content:space-between;margin-bottom:10px">
      <span class="chip">${p.pos} · ${club.name}</span>
      <span class="chip gold" style="font-size:18px">${p.ovr} OVR</span>
    </div>
    ${statBar(t('speed'), p.speed)}
    ${statBar(t('shooting'), p.shooting)}
    ${statBar(t('passing'), p.passing)}
    ${statBar(t('dribbling'), p.dribbling)}
    ${statBar(t('defending'), p.defending)}
    ${statBar(t('physical'), p.physical)}
    ${statBar(t('stamina'), p.stamina)}
    <hr class="hr">
    <div class="row" style="justify-content:space-between"><span class="muted">${t('value')}</span><b>${val.toLocaleString()} 🪙</b></div>`;
  const actions = el('div', 'row mt');
  const up = btn(`⬆ ${t('upgrade')} (${cost} 🪙)`, p.ovr >= 95 ? 'ghost' : 'primary', () => {
    const r = upgradePlayer(id);
    if (!r.ok) { toast(r.reason || t('max_level'), true); sfx.error(); return; }
    sfx.levelUp();
    toast(`${p.name} → ${r.ovr} OVR`);
    wrap.remove();
    playerDetail(id, onClose);
    refreshCoins();
  });
  if (p.ovr >= 95) { up.innerHTML = `⬆ ${t('max_level')}`; up.setAttribute('disabled', '1'); }
  const sell = btn(`💰 ${t('sell')} (+${Math.round(val * 0.8)})`, 'danger', () => {
    const r = sellPlayer(id);
    if (r.ok) { sfx.coin(); toast(`${t('sold')} +${r.gain} 🪙`); wrap.remove(); onClose(); }
  });
  actions.appendChild(up); actions.appendChild(sell);
  wrap.appendChild(actions);
  const m = modal(wrap);
  wrap.remove = () => m.remove();
}

// ================================================================ shop
export function showShop(app) {
  const c = makeScreen(t('market'), () => showHome(app), coinsChipHolder());
  const note = el('div', 'muted mb', '🔄 ' + t('refresh_daily'));
  c.appendChild(note);
  const grid = el('div', 'grid-cards');
  const items = getMarket();
  const save = getSave();
  for (const p of items) {
    const club = clubById(p.club);
    const owned = save.squad.includes(p.id);
    const price = playerValue(p);
    const card = el('div', 'pcard');
    card.style.setProperty('--pc', club.color + '33');
    card.innerHTML = `
      <div class="row" style="justify-content:space-between"><span class="ovr">${p.ovr}</span><span class="pos">${p.pos}</span></div>
      <div class="nm">${p.name}</div>
      <div class="club">${club.name}</div>
      <div class="price">${owned ? '✓' : price.toLocaleString() + ' 🪙'}</div>`;
    if (!owned) {
      card.addEventListener('click', () => {
        const r = buyPlayer(p);
        if (!r.ok) { toast(r.reason, true); sfx.error(); return; }
        sfx.coin();
        toast(`${t('purchased')} ${p.name}`);
        showShop(app);
      });
    } else card.style.opacity = '0.5';
    grid.appendChild(card);
  }
  c.appendChild(grid);
}

// ================================================================ settings
export function showSettings(app, opts = {}) {
  const save = getSave();
  const isPause = !!opts.inPause;
  const c = isPause ? el('div') : makeScreen(t('settings'), () => showHome(app));

  function row(label, desc, control) {
    const r = el('div', 'set-row');
    const left = el('div');
    left.innerHTML = `<div class="lbl">${label}</div>${desc ? `<div class="desc">${desc}</div>` : ''}`;
    r.appendChild(left);
    r.appendChild(control);
    c.appendChild(r);
  }

  row(t('graphics'), '', segmented([
    { id: 'auto', label: 'AUTO' }, { id: 'low', label: 'LOW' },
    { id: 'medium', label: 'MED' }, { id: 'high', label: 'HIGH' }
  ], save.settings.graphics, (id) => {
    save.settings.graphics = id;
    persistSoon();
    if (app && app.applyQuality) app.applyQuality();
    toast(t('quality_changed'));
  }));

  row(t('fps'), '', segmented([
    { id: 30, label: '30 FPS' }, { id: 60, label: '60 FPS' }
  ], save.settings.fps, (id) => { save.settings.fps = id; persistSoon(); if (app && app.onFpsChange) app.onFpsChange(); }));

  function slider(label, key, onchange) {
    const inp = el('input');
    inp.type = 'range'; inp.min = 0; inp.max = 100;
    inp.value = Math.round(save.settings[key] * 100);
    inp.addEventListener('input', () => {
      save.settings[key] = inp.value / 100;
      persistSoon();
      if (onchange) onchange();
    });
    row(label, '', inp);
  }
  slider(t('sound'), 'sound', applyVolumes);
  slider(t('music'), 'music', applyVolumes);
  slider(t('camera_sens'), 'cameraSens', () => { if (app && app.onCamChange) app.onCamChange(); });
  slider(t('joystick_size'), 'joystickSize');

  row(t('language'), '', segmented(LANGS.map(l => ({ id: l.id, label: l.label })), save.settings.language, (id) => {
    save.settings.language = id;
    setLanguage(id);
    persistSoon();
    if (!isPause) showSettings(app);
    else { opts.reopen && opts.reopen(); }
  }));

  if (!isPause) {
    row(t('time_of_day'), '', segmented([
      { id: 'day', label: '☀️' }, { id: 'night', label: '🌙' }
    ], save.settings.dayNight, (id) => { save.settings.dayNight = id; persistSoon(); }));

    row(t('match_length'), '', segmented([
      { id: 'short', label: t('short') }, { id: 'normal', label: t('normal') }, { id: 'long', label: t('long') }
    ], save.settings.matchLength, (id) => { save.settings.matchLength = id; persistSoon(); }));

    row(t('difficulty'), '', segmented(
      Object.keys(DIFFICULTIES).map(k => ({ id: k, label: t(DIFFICULTIES[k].label) })),
      save.settings.difficulty, (id) => { save.settings.difficulty = id; persistSoon(); }
    ));

    const danger = btn('🗑 ' + t('reset_save'), 'danger block', () => {
      const w = el('div');
      w.innerHTML = `<h3>${t('reset_save')}</h3><p class="muted mb">${t('reset_confirm')}</p>`;
      const r = el('div', 'row');
      r.appendChild(btn(t('confirm'), 'danger', () => { resetSave(); location.reload(); }));
      r.appendChild(btn(t('cancel'), 'ghost', () => m.remove()));
      w.appendChild(r);
      const m = modal(w);
    });
    danger.style.marginTop = '16px';
    c.appendChild(danger);
  }

  if (isPause) return c;
}

// ================================================================ profile
export function showProfile(app) {
  const save = getSave();
  const c = makeScreen(t('profile'), () => showHome(app));
  const lp = levelProgress();
  const p = save.profile;
  const card = el('div', 'panel');
  card.style.cssText = 'padding:16px;text-align:center;margin-bottom:12px;';
  card.innerHTML = `
    <div style="font-size:40px">🧑‍💼</div>
    <div style="font-size:20px;font-weight:900;margin-top:6px">${p.name}</div>
    <div class="muted">${clubById(save.clubId).name} · ${t('level')} ${lp.lvl}</div>
    <div style="height:8px;border-radius:5px;background:rgba(255,255,255,0.12);overflow:hidden;margin-top:10px">
      <div style="height:100%;width:${Math.round(lp.cur / lp.need * 100)}%;background:linear-gradient(90deg,#2e8b57,var(--ufm-gold))"></div>
    </div>
    <div class="muted" style="margin-top:4px">${lp.cur} / ${lp.need} ${t('xp')}</div>
    <button class="btn small ghost" id="rename" style="margin:10px auto 0;display:inline-flex">${t('tap_name')}</button>`;
  c.appendChild(card);
  card.querySelector('#rename').addEventListener('click', () => {
    const w = el('div');
    w.innerHTML = `<h3>${t('manager')}</h3>`;
    const inp = el('input');
    inp.type = 'text'; inp.value = p.name; inp.maxLength = 18;
    w.appendChild(inp);
    const r = el('div', 'row mt');
    r.appendChild(btn(t('confirm'), 'primary', () => { p.name = inp.value.trim() || p.name; persist(); m.remove(); showProfile(app); }));
    r.appendChild(btn(t('cancel'), 'ghost', () => m.remove()));
    w.appendChild(r);
    const m = modal(w);
    setTimeout(() => inp.focus(), 100);
  });

  const stats = el('div', 'panel');
  stats.style.cssText = 'padding:14px;';
  stats.innerHTML = `
    <div class="row" style="justify-content:space-around;text-align:center">
      <div><div style="font-size:22px;font-weight:900">${p.matches}</div><div class="muted">${t('matches')}</div></div>
      <div><div style="font-size:22px;font-weight:900;color:#41d17a">${p.wins}</div><div class="muted">${t('wins')}</div></div>
      <div><div style="font-size:22px;font-weight:900;color:#f5c542">${p.draws}</div><div class="muted">${t('draws')}</div></div>
      <div><div style="font-size:22px;font-weight:900;color:#e5484d">${p.losses}</div><div class="muted">${t('losses')}</div></div>
    </div>
    <hr class="hr">
    <div class="row" style="justify-content:space-around;text-align:center">
      <div><div style="font-size:18px;font-weight:800">${p.goalsFor}</div><div class="muted">${t('goals_for')}</div></div>
      <div><div style="font-size:18px;font-weight:800">${p.goalsAgainst}</div><div class="muted">${t('goals_con')}</div></div>
      <div><div style="font-size:18px;font-weight:800">🏆 ${p.trophies.length}</div><div class="muted">${t('trophy')}</div></div>
    </div>`;
  c.appendChild(stats);
}

// ================================================================ tournament
export function showTournament(app) {
  const save = getSave();
  const c = makeScreen(t('tournament'), () => showHome(app));
  if (!save.tournament || save.tournament.champion || !save.tournament.alive) {
    const box = el('div', 'panel center');
    box.style.cssText = 'padding:26px;text-align:center;';
    if (save.tournament && save.tournament.champion) {
      const won = save.tournament.champion === save.clubId;
      box.innerHTML = `<div style="font-size:56px">${won ? '🏆' : '🏅'}</div>
        <h3 style="margin-top:8px">${won ? t('champion') : t('eliminated')}</h3>
        <p class="muted mb">${won ? clubById(save.clubId).name : ''}</p>`;
      box.appendChild(btn(t('tournament'), 'primary block', () => { startTournament(); showTournament(app); }));
    } else if (save.tournament && !save.tournament.alive) {
      box.innerHTML = `<div style="font-size:56px">😞</div><h3>${t('eliminated')}</h3>`;
      box.appendChild(btn(t('tournament'), 'primary block', () => { startTournament(); showTournament(app); }));
    } else {
      box.innerHTML = `<div style="font-size:56px">🏆</div>
        <p class="muted mb" style="margin-top:8px">${t('tournament_desc')}</p>`;
      box.appendChild(btn(t('cup_start').replace('!', ''), 'primary block', () => { startTournament(); toast(t('cup_start')); showTournament(app); }));
    }
    c.appendChild(box);
    return;
  }

  const tr = save.tournament;
  const names = ['quarter_final', 'semi_final', 'final'];
  tr.rounds.forEach((round, ri) => {
    c.appendChild(el('div', 'sect-title', t(names[ri] || 'final')));
    for (const m of round) {
      const ca = clubById(m.a), cb = clubById(m.b);
      const isMine = m.a === save.clubId || m.b === save.clubId;
      const live = m.winner === null && isMine;
      const box = el('div', 'row-item' + (live ? '' : ''));
      if (live) box.style.borderColor = 'var(--ufm-gold)';
      box.innerHTML = `
        <div class="grow">
          <div class="t1" style="${m.winner === m.a ? 'color:var(--ufm-gold-2)' : ''}">${ca.name} ${m.winner ? m.score ? m.score[0] : '' : ''}</div>
          <div class="t1" style="${m.winner === m.b ? 'color:var(--ufm-gold-2)' : ''}">${cb.name} ${m.winner ? m.score ? m.score[1] : '' : ''}</div>
        </div>
        ${live ? '<span class="chip gold">▶</span>' : m.winner ? '<span class="muted">✓</span>' : ''}`;
      if (live) box.addEventListener('click', () => {
        const opp = m.a === save.clubId ? cb : ca;
        app.startMatch({ opponent: opp, difficulty: save.settings.difficulty, night: save.settings.dayNight === 'night', mode: 'tournament', allowDraw: false });
      });
      c.appendChild(box);
    }
  });
}

// ================================================================ career
export function showCareer(app) {
  const save = getSave();
  const c = makeScreen(t('career'), () => showHome(app));
  if (!save.career) {
    const box = el('div', 'panel center');
    box.style.cssText = 'padding:26px;text-align:center;';
    box.innerHTML = `<div style="font-size:56px">📅</div><p class="muted mb" style="margin-top:8px">${t('career_desc')}</p>`;
    box.appendChild(btn(t('season_start').replace('!', ''), 'primary block', () => { startCareer(); toast(t('season_start')); showCareer(app); }));
    c.appendChild(box);
    return;
  }
  const career = save.career;
  const myClub = clubById(save.clubId);
  const fx = nextCareerFixture();

  if (fx) {
    const opp = clubById(fx.a === save.clubId ? fx.b : fx.a);
    const home = fx.a === save.clubId;
    const box = el('div', 'panel');
    box.style.cssText = 'padding:16px;text-align:center;';
    box.innerHTML = `<div class="muted mb">${t('fixture')} · ${home ? t('home') : t('away')}</div>
      <div class="result-score" style="margin:4px 0">
        <div class="club">${crestBall(home ? myClub : opp, 44)}<span>${(home ? myClub : opp).short}</span></div>
        <div class="sc">VS</div>
        <div class="club">${crestBall(home ? opp : myClub, 44)}<span>${(home ? opp : myClub).short}</span></div>
      </div>`;
    box.appendChild(btn('⚽ ' + t('next_match'), 'primary block', () => {
      app.startMatch({ opponent: opp, difficulty: save.settings.difficulty, night: save.settings.dayNight === 'night', mode: 'career', allowDraw: true });
    }));
    c.appendChild(box);
  } else if (career.done) {
    const table = careerTable();
    const won = table[0] && table[0].id === save.clubId;
    const box = el('div', 'panel center');
    box.style.cssText = 'padding:20px;text-align:center;';
    box.innerHTML = `<div style="font-size:52px">${won ? '🏆' : '🎖'}</div><h3>${won ? t('champion') : t('career_done')}</h3>`;
    box.appendChild(btn(t('season') + ' +1', 'primary block', () => { startCareer(); showCareer(app); }));
    c.appendChild(box);
  }

  c.appendChild(el('div', 'sect-title', t('standings')));
  const table = careerTable();
  const tbl = el('div', 'panel');
  tbl.style.cssText = 'padding:10px 14px;font-size:13px;';
  tbl.innerHTML = `<div class="row" style="font-weight:900;color:var(--ufm-dim);font-size:11px"><span style="width:24px">#</span><span class="grow">${t('team')}</span><span style="width:30px;text-align:center">${t('matches')}</span><span style="width:30px;text-align:center">${t('wins')}</span><span style="width:36px;text-align:center">+/-</span><span style="width:36px;text-align:center">${t('xp') === 'XP' ? 'PTS' : 'OCH'}</span></div>`;
  table.forEach((r, i) => {
    const cl = clubById(r.id);
    const mine = r.id === save.clubId;
    const rowEl = el('div', 'row');
    rowEl.style.cssText = `padding:5px 0;${mine ? 'color:var(--ufm-gold-2);font-weight:900' : ''}`;
    rowEl.innerHTML = `<span style="width:24px">${i + 1}</span><span class="grow">${cl.name}</span><span style="width:30px;text-align:center">${r.p}</span><span style="width:30px;text-align:center">${r.w}</span><span style="width:36px;text-align:center">${r.gf - r.ga}</span><span style="width:36px;text-align:center">${r.pts}</span>`;
    tbl.appendChild(rowEl);
  });
  c.appendChild(tbl);
}

// ================================================================ result
export function showResult(app, res, rewards) {
  const wrap = el('div');
  const title = res.result === 'win' ? t('you_win') : res.result === 'lose' ? t('you_lose') : t('draw');
  const color = res.result === 'win' ? '#41d17a' : res.result === 'lose' ? '#e5484d' : '#f5c542';
  wrap.innerHTML = `
    <h3 style="color:${color};text-align:center;font-size:24px">${title}</h3>
    <div class="result-score">
      <div class="club">${crestBall(res.home, 46)}<span>${res.home.short}</span></div>
      <div class="sc">${res.userScore} - ${res.oppScore}</div>
      <div class="club">${crestBall(res.away, 46)}<span>${res.away.short}</span></div>
    </div>
    <div class="sect-title" style="margin-top:6px">${t('match_rewards')}</div>
    <div class="set-row" style="margin-bottom:6px"><span class="lbl">🪙 ${t('coins')}</span><b style="color:var(--ufm-gold-2)">+${rewards.coins}</b></div>
    <div class="set-row" style="margin-bottom:6px"><span class="lbl">⭐ ${t('xp')}</span><b>+${rewards.xp}</b></div>
    ${rewards.levelUp ? `<div class="set-row" style="margin-bottom:6px;border-color:var(--ufm-gold)"><span class="lbl">🎉 ${t('level')}</span><b style="color:var(--ufm-gold-2)">${rewards.levelUp}</b></div>` : ''}`;
  const b = btn(t('cont'), 'primary block', () => {
    m.remove();
    afterResult(app, res);
  });
  b.style.marginTop = '10px';
  wrap.appendChild(b);
  const m = modal(wrap, { sticky: true });
}

function afterResult(app, res) {
  const save = getSave();
  if (res.mode === 'career') { showCareer(app); return; }
  if (res.mode === 'tournament') { showTournament(app); return; }
  showHome(app);
}

// ================================================================ pause overlay
export function showPauseOverlay(app, match) {
  const wrap = el('div');
  wrap.innerHTML = `<h3 class="center">${t('paused')}</h3>`;
  const stack = el('div', 'list');
  stack.appendChild(btn('▶ ' + t('resume'), 'primary block', () => { m.remove(); match.closePause(); }));
  stack.appendChild(btn('🎮 ' + t('controls_help'), 'ghost block', () => {
    const w = el('div');
    w.innerHTML = `<h3>${t('controls_help')}</h3><p class="muted" style="line-height:1.7">${t('controls_text')}</p>`;
    w.appendChild(btn(t('ok'), 'primary block', () => mm.remove()));
    const mm = modal(w);
  }));
  stack.appendChild(btn('⚙️ ' + t('settings'), 'ghost block', () => {
    const settingsPanel = showSettings(app, { inPause: true });
    const w = el('div');
    w.innerHTML = `<h3>${t('settings')}</h3>`;
    w.appendChild(settingsPanel);
    w.appendChild(btn(t('ok'), 'primary block', () => mm.remove()));
    const mm = modal(w);
  }));
  stack.appendChild(btn('🚪 ' + t('quit_match'), 'danger block', () => {
    const w = el('div');
    w.innerHTML = `<h3>${t('quit_match')}</h3><p class="muted mb">${t('quit_confirm')}</p>`;
    const r = el('div', 'row');
    r.appendChild(btn(t('confirm'), 'danger', () => { m.remove(); app.quitMatch(); }));
    r.appendChild(btn(t('cancel'), 'ghost', () => ww.remove()));
    w.appendChild(r);
    const ww = modal(w);
  }));
  wrap.appendChild(stack);
  const m = modal(wrap, { sticky: true });
  return m;
}

// ================================================================ club picker (first run)
export function showClubPicker(app, onDone) {
  uiRoot().innerHTML = '';
  const scr = el('div', 'screen');
  scr.style.background = 'linear-gradient(180deg, rgba(3,14,7,0.55), rgba(3,14,7,0.85))';
  scr.innerHTML = `<div class="topbar"><span></span><div class="title">${t('club_pick')}</div><span></span></div>`;
  const content = el('div', 'content');
  const grid = el('div', 'grid-cards');
  for (const club of CLUBS) {
    const card = el('div', 'pcard');
    card.style.setProperty('--pc', club.color + '44');
    card.innerHTML = `
      <div class="center" style="margin:6px 0">${crestBall(club, 46)}</div>
      <div class="nm center">${club.name}</div>
      <div class="club center">${t('team_ovr')} ${club.strength}</div>`;
    card.addEventListener('click', () => { sfx.success(); onDone(club); });
    grid.appendChild(card);
  }
  content.appendChild(grid);
  scr.appendChild(content);
  uiRoot().appendChild(scr);
}

// ================================================================ reward toast helpers
export function coinsToast(n) { toast(`+${n} 🪙`); }
