// Persistent local save (localStorage). Offline-first, versioned.
import { GAME } from './config.js';
import { deepClone, dayKey } from './utils.js';

const KEY = GAME.saveKey;

export function defaultSettings() {
  return {
    graphics: 'auto',       // low | medium | high | auto
    fps: 60,                // 30 | 60
    sound: 0.8,
    music: 0.5,
    cameraSens: 0.6,        // 0..1
    joystickSize: 1.0,
    language: 'en',
    dayNight: 'night',
    matchLength: 'normal',
    difficulty: 'normal',
    autoDetected: ''        // filled by device probing
  };
}

export function defaultSave() {
  return {
    v: 1,
    created: Date.now(),
    profile: {
      name: 'Manager',
      xp: 0, level: 1,
      matches: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0,
      trophies: []
    },
    coins: 2500,
    settings: defaultSettings(),
    squad: [],              // owned player ids
    players: {},            // id -> player object (mutable copy)
    lineup: { formation: '4-3-3', slots: [] },   // 11 player ids in formation order
    market: { day: '', items: [] },
    career: null,           // created on career start
    tournament: null,       // created on tournament start
    training: { best: 0 },
    penalty: { best: 0 }
  };
}

let state = null;

export function loadSave() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = migrate(parsed);
      return state;
    }
  } catch (e) { console.warn('save load failed', e); }
  state = defaultSave();
  persist();
  return state;
}

function migrate(s) {
  const d = defaultSave();
  // shallow-merge missing top-level keys for forward compatibility
  for (const k of Object.keys(d)) if (s[k] === undefined) s[k] = d[k];
  s.settings = Object.assign(defaultSettings(), s.settings || {});
  s.profile = Object.assign(d.profile, s.profile || {});
  return s;
}

export function getSave() { return state || loadSave(); }

let saveTimer = null;
export function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('save failed', e); }
}
// Debounced auto-save
export function persistSoon() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => { saveTimer = null; persist(); }, 400);
}
export function resetSave() {
  state = defaultSave();
  persist();
}

export function xpForLevel(lvl) { return 100 * lvl * lvl; }
export function levelFromXp(xp) {
  let lvl = 1;
  while (xp >= xpForLevel(lvl)) lvl++;
  return lvl;
}

// ---- economy helpers ----
export function addCoins(n) { state.coins = Math.max(0, state.coins + n); persistSoon(); }
export function addXp(n) {
  const before = levelFromXp(state.profile.xp);
  state.profile.xp += n;
  state.profile.level = levelFromXp(state.profile.xp);
  persistSoon();
  return state.profile.level > before ? state.profile.level : 0;
}

export function recordMatchResult({ userScore, oppScore }) {
  const p = state.profile;
  p.matches++;
  if (userScore > oppScore) p.wins++;
  else if (userScore === oppScore) p.draws++;
  else p.losses++;
  p.goalsFor += userScore;
  p.goalsAgainst += oppScore;
  persistSoon();
}

export function addTrophy(name) {
  state.profile.trophies.push({ name, at: Date.now() });
  persistSoon();
}

export { dayKey };
