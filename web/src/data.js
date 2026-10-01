// Football database: original clubs, generated players, formations, difficulty tiers.
import { mulberry32, pick, clamp } from './utils.js';

export const POSITIONS = ['GK','CB','LB','RB','CDM','CM','CAM','LM','RM','LW','RW','ST'];

// Role categories used by AI + stat weighting
export const ROLE = {
  GK: 'GK', DF: 'DF', MF: 'MF', FW: 'FW'
};
export function roleOf(pos) {
  if (pos === 'GK') return ROLE.GK;
  if (pos === 'CB' || pos === 'LB' || pos === 'RB') return ROLE.DF;
  if (pos === 'CDM' || pos === 'CM' || pos === 'CAM' || pos === 'LM' || pos === 'RM') return ROLE.MF;
  return ROLE.FW;
}

export const CLUBS = [
  { id: 'zafar',   name: 'Zafar FK',       short: 'ZFK', color: '#2e6fe0', color2: '#ffffff', strength: 82 },
  { id: 'sitora',  name: 'Sitora SK',      short: 'SIT', color: '#e5484d', color2: '#1c1c22', strength: 80 },
  { id: 'oqbars',  name: 'Oqbars FC',      short: 'OQB', color: '#f2f2f2', color2: '#20242a', strength: 79 },
  { id: 'tufon',   name: 'Tufon FK',       short: 'TUF', color: '#ff8a1e', color2: '#14243a', strength: 77 },
  { id: 'bahor',   name: 'Bahor SK',       short: 'BAH', color: '#2fae5c', color2: '#ffffff', strength: 76 },
  { id: 'chaqmoq', name: 'Chaqmoq FC',     short: 'CHA', color: '#8b5cf6', color2: '#ffd76a', strength: 75 },
  { id: 'daryo',   name: 'Daryo FK',       short: 'DAR', color: '#16a3b8', color2: '#0e2a33', strength: 74 },
  { id: 'quyosh',  name: 'Quyosh SK',      short: 'QUY', color: '#f5c542', color2: '#20304a', strength: 73 }
];
export const clubById = id => CLUBS.find(c => c.id === id) || CLUBS[0];

// ---- Name pools (all original) ----
const FIRST = [
  'Aziz','Dilshod','Jasur','Bekzod','Sanjar','Otabek','Temur','Islom','Farrux','Nodir',
  'Marco','Luca','Jonas','Erik','Taro','Diego','Mateo','Rafael','Andre','Viktor',
  'Samir','Elbek','Khusan','Ruslan','Artyom','Daniyar','Zafar','Bobur','Umar','Ali',
  'Kenji','Milan','Pavel','Oscar','Bruno','Ivan','Sergio','Nicolas','Felix','Hugo'
];
const LAST = [
  'Rahmonov','Karimov','Toshpo\'latov','Yusupov','Abdullayev','Nazarov','Sattorov','Mirzayev','Qodirov','Ergashev',
  'Vellor','Kracht','Kimishita','Sorensen','Valente','Moretti','Novak','Haddad','Ondiviela','Bergström',
  'Ortiqov','Saidov','Petrov','Kovalenko','Tanaka','Rossi','Silvestri','Marchetti','Duarte','Ferreira',
  'Nishida','Larsen','Volkov','Iglesias','Costa','Smirnov','Almeida','Roche','Mendel','Gruber'
];

// per-position stat weights → OVR
const WEIGHTS = {
  GK:  { speed: 0.08, shooting: 0.02, passing: 0.15, dribbling: 0.05, defending: 0.45, physical: 0.25, stamina: 0.00 },
  CB:  { speed: 0.10, shooting: 0.04, passing: 0.10, dribbling: 0.08, defending: 0.45, physical: 0.18, stamina: 0.05 },
  LB:  { speed: 0.20, shooting: 0.03, passing: 0.15, dribbling: 0.12, defending: 0.35, physical: 0.08, stamina: 0.07 },
  RB:  { speed: 0.20, shooting: 0.03, passing: 0.15, dribbling: 0.12, defending: 0.35, physical: 0.08, stamina: 0.07 },
  CDM: { speed: 0.10, shooting: 0.05, passing: 0.20, dribbling: 0.10, defending: 0.35, physical: 0.12, stamina: 0.08 },
  CM:  { speed: 0.12, shooting: 0.10, passing: 0.28, dribbling: 0.15, defending: 0.18, physical: 0.07, stamina: 0.10 },
  CAM: { speed: 0.13, shooting: 0.17, passing: 0.27, dribbling: 0.22, defending: 0.06, physical: 0.05, stamina: 0.10 },
  LM:  { speed: 0.22, shooting: 0.10, passing: 0.18, dribbling: 0.22, defending: 0.10, physical: 0.06, stamina: 0.12 },
  RM:  { speed: 0.22, shooting: 0.10, passing: 0.18, dribbling: 0.22, defending: 0.10, physical: 0.06, stamina: 0.12 },
  LW:  { speed: 0.24, shooting: 0.20, passing: 0.14, dribbling: 0.28, defending: 0.03, physical: 0.04, stamina: 0.07 },
  RW:  { speed: 0.24, shooting: 0.20, passing: 0.14, dribbling: 0.28, defending: 0.03, physical: 0.04, stamina: 0.07 },
  ST:  { speed: 0.22, shooting: 0.36, passing: 0.10, dribbling: 0.18, defending: 0.02, physical: 0.08, stamina: 0.04 }
};

export function calcOVR(p) {
  const w = WEIGHTS[p.pos] || WEIGHTS.CM;
  let sum = 0, tw = 0;
  for (const k in w) { sum += (p[k] || 50) * w[k]; tw += w[k]; }
  return clamp(Math.round(sum / Math.max(0.001, tw)), 40, 99);
}

// 18-man roster template per club
const ROSTER_TEMPLATE = ['GK','GK','CB','CB','CB','LB','RB','CDM','CM','CM','CAM','LM','RM','LW','RW','ST','ST','CB'];

let cache = null;

// Deterministic league DB: 8 clubs x 18 players = 144 original players.
export function allPlayers() {
  if (cache) return cache;
  const rng = mulberry32(20261001);
  const list = [];
  for (const club of CLUBS) {
    const used = new Set();
    ROSTER_TEMPLATE.forEach((pos, i) => {
      let name;
      do { name = `${pick(rng, FIRST)} ${pick(rng, LAST)}`; } while (used.has(name));
      used.add(name);
      const base = club.strength + (rng() * 14 - 9);          // spread around club strength
      const variance = () => Math.round(rng() * 12 - 6);
      const p = {
        id: `${club.id}_${i}`,
        name, club: club.id, pos,
        speed: 0, shooting: 0, passing: 0, dribbling: 0, defending: 0, physical: 0, stamina: 0,
        seed: Math.floor(rng() * 1e9)
      };
      const target = base + variance();
      for (const k of ['speed','shooting','passing','dribbling','defending','physical','stamina']) {
        p[k] = clamp(Math.round(target + variance() * 1.4), 45, 94);
      }
      // position speciality tuning
      if (pos === 'GK') { p.defending = clamp(p.defending + 8, 50, 95); p.shooting = clamp(p.shooting - 25, 30, 99); }
      if (roleOf(pos) === 'FW') { p.shooting = clamp(p.shooting + 6, 40, 96); p.defending = clamp(p.defending - 14, 30, 99); }
      if (roleOf(pos) === 'DF') { p.defending = clamp(p.defending + 7, 40, 96); p.shooting = clamp(p.shooting - 12, 30, 99); }
      if (pos === 'LW' || pos === 'RW' || pos === 'LB' || pos === 'RB') p.speed = clamp(p.speed + 5, 40, 97);
      p.ovr = calcOVR(p);
      list.push(p);
    });
  }
  cache = list;
  return list;
}
export function playerById(id) { return allPlayers().find(p => p.id === id) || null; }
export function playersOfClub(clubId) { return allPlayers().filter(p => p.club === clubId); }

export function playerValue(p) {
  const o = p.ovr || calcOVR(p);
  return Math.round((250 + Math.pow(Math.max(0, o - 55), 2.35) * 3.2) / 10) * 10;
}
export function upgradeCost(p) {
  return Math.round(playerValue(p) * 0.45) + 150;
}

// ---- Formations: slots in own-half normalized coords (x: 0 own goal → 1 opp goal, y: -1..1 left→right)
export const FORMATIONS = {
  '4-3-3': [
    { pos: 'GK', x: 0.045, y: 0 },
    { pos: 'LB', x: 0.20, y: -0.62 }, { pos: 'CB', x: 0.16, y: -0.21 }, { pos: 'CB', x: 0.16, y: 0.21 }, { pos: 'RB', x: 0.20, y: 0.62 },
    { pos: 'CM', x: 0.40, y: -0.32 }, { pos: 'CDM', x: 0.33, y: 0 }, { pos: 'CM', x: 0.40, y: 0.32 },
    { pos: 'LW', x: 0.68, y: -0.60 }, { pos: 'ST', x: 0.74, y: 0 }, { pos: 'RW', x: 0.68, y: 0.60 }
  ],
  '4-4-2': [
    { pos: 'GK', x: 0.045, y: 0 },
    { pos: 'LB', x: 0.20, y: -0.62 }, { pos: 'CB', x: 0.16, y: -0.21 }, { pos: 'CB', x: 0.16, y: 0.21 }, { pos: 'RB', x: 0.20, y: 0.62 },
    { pos: 'LM', x: 0.46, y: -0.66 }, { pos: 'CM', x: 0.40, y: -0.22 }, { pos: 'CM', x: 0.40, y: 0.22 }, { pos: 'RM', x: 0.46, y: 0.66 },
    { pos: 'ST', x: 0.72, y: -0.18 }, { pos: 'ST', x: 0.72, y: 0.18 }
  ],
  '4-2-3-1': [
    { pos: 'GK', x: 0.045, y: 0 },
    { pos: 'LB', x: 0.20, y: -0.62 }, { pos: 'CB', x: 0.16, y: -0.21 }, { pos: 'CB', x: 0.16, y: 0.21 }, { pos: 'RB', x: 0.20, y: 0.62 },
    { pos: 'CDM', x: 0.34, y: -0.20 }, { pos: 'CDM', x: 0.34, y: 0.20 },
    { pos: 'LM', x: 0.55, y: -0.55 }, { pos: 'CAM', x: 0.56, y: 0 }, { pos: 'RM', x: 0.55, y: 0.55 },
    { pos: 'ST', x: 0.76, y: 0 }
  ],
  '4-3-1-2': [
    { pos: 'GK', x: 0.045, y: 0 },
    { pos: 'LB', x: 0.20, y: -0.62 }, { pos: 'CB', x: 0.16, y: -0.21 }, { pos: 'CB', x: 0.16, y: 0.21 }, { pos: 'RB', x: 0.20, y: 0.62 },
    { pos: 'CM', x: 0.38, y: -0.34 }, { pos: 'CDM', x: 0.32, y: 0 }, { pos: 'CM', x: 0.38, y: 0.34 },
    { pos: 'CAM', x: 0.56, y: 0 },
    { pos: 'ST', x: 0.74, y: -0.16 }, { pos: 'ST', x: 0.74, y: 0.16 }
  ],
  '3-5-2': [
    { pos: 'GK', x: 0.045, y: 0 },
    { pos: 'CB', x: 0.16, y: -0.30 }, { pos: 'CB', x: 0.15, y: 0 }, { pos: 'CB', x: 0.16, y: 0.30 },
    { pos: 'LM', x: 0.44, y: -0.78 }, { pos: 'CM', x: 0.38, y: -0.32 }, { pos: 'CDM', x: 0.32, y: 0 }, { pos: 'CM', x: 0.38, y: 0.32 }, { pos: 'RM', x: 0.44, y: 0.78 },
    { pos: 'ST', x: 0.73, y: -0.16 }, { pos: 'ST', x: 0.73, y: 0.16 }
  ]
};

// ---- Difficulty tiers ----
export const DIFFICULTIES = {
  easy:       { label: 'easy',       aiSpeed: 0.80, passErr: 0.30, shotSkill: 0.35, press: 0.30, gk: 0.40, reaction: 0.45, decision: 0.35, reward: 0.7 },
  normal:     { label: 'normal',     aiSpeed: 0.90, passErr: 0.22, shotSkill: 0.50, press: 0.50, gk: 0.55, reaction: 0.60, decision: 0.55, reward: 1.0 },
  hard:       { label: 'hard',       aiSpeed: 0.97, passErr: 0.15, shotSkill: 0.65, press: 0.70, gk: 0.70, reaction: 0.75, decision: 0.72, reward: 1.35 },
  pro:        { label: 'pro',        aiSpeed: 1.03, passErr: 0.10, shotSkill: 0.78, press: 0.85, gk: 0.82, reaction: 0.88, decision: 0.85, reward: 1.7 },
  legendary:  { label: 'legendary',  aiSpeed: 1.08, passErr: 0.06, shotSkill: 0.90, press: 1.00, gk: 0.93, reaction: 0.96, decision: 0.94, reward: 2.2 }
};

// Best XI picker for a set of players under a formation
export function autoPickXI(players, formation) {
  const slots = FORMATIONS[formation] || FORMATIONS['4-3-3'];
  const pool = players.slice().sort((a, b) => b.ovr - a.ovr);
  const picked = [];
  const used = new Set();
  for (const slot of slots) {
    let best = null;
    // exact position first
    for (const p of pool) { if (!used.has(p.id) && p.pos === slot.pos) { best = p; break; } }
    // then same role
    if (!best) for (const p of pool) { if (!used.has(p.id) && roleOf(p.pos) === roleOf(slot.pos)) { best = p; break; } }
    if (!best) for (const p of pool) { if (!used.has(p.id)) { best = p; break; } }
    if (best) { used.add(best.id); picked.push(best.id); } else picked.push(null);
  }
  return picked;
}

export function teamOVR(ids) {
  const ps = ids.map(id => playerById(id)).filter(Boolean);
  if (!ps.length) return 0;
  return Math.round(ps.reduce((s, p) => s + p.ovr, 0) / ps.length);
}
