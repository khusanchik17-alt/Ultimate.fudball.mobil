/**
 * Original player database + OVR model.
 *
 * All names are fictional and were generated for this project. Nothing is copied
 * from a real league, club or licensed player database.
 *
 * Each player carries: name, position, rating (OVR), pace, shooting, passing,
 * dribbling, defending, physical, stamina (+ GK attributes for goalkeepers).
 */

import { mulberry32, clamp, pick, randomRange, gaussian } from '../../core/util.js';

export const POSITIONS = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST'];

export const POSITION_GROUP = {
  GK: 'GK',
  CB: 'DEF', LB: 'DEF', RB: 'DEF',
  CDM: 'MID', CM: 'MID', CAM: 'MID', LM: 'MID', RM: 'MID',
  LW: 'ATT', RW: 'ATT', ST: 'ATT',
};

/** Which positions a player can cover without a big penalty (first = natural). */
export const POSITION_FAMILY = {
  GK: ['GK'],
  CB: ['CB', 'CDM'],
  LB: ['LB', 'LM', 'CB'],
  RB: ['RB', 'RM', 'CB'],
  CDM: ['CDM', 'CM', 'CB'],
  CM: ['CM', 'CDM', 'CAM'],
  CAM: ['CAM', 'CM', 'LW', 'RW'],
  LM: ['LM', 'LW', 'LB', 'CM'],
  RM: ['RM', 'RW', 'RB', 'CM'],
  LW: ['LW', 'LM', 'ST', 'CAM'],
  RW: ['RW', 'RM', 'ST', 'CAM'],
  ST: ['ST', 'LW', 'RW', 'CAM'],
};

/** Attribute importance per position (used for OVR + in-match behaviour). */
const WEIGHTS = {
  GK: { pace: 0.02, shooting: 0.0, passing: 0.08, dribbling: 0.05, defending: 0.05, physical: 0.10, stamina: 0.05, gk: 0.65 },
  CB: { pace: 0.10, shooting: 0.02, passing: 0.10, dribbling: 0.05, defending: 0.40, physical: 0.23, stamina: 0.10 },
  LB: { pace: 0.20, shooting: 0.03, passing: 0.15, dribbling: 0.12, defending: 0.27, physical: 0.13, stamina: 0.10 },
  RB: { pace: 0.20, shooting: 0.03, passing: 0.15, dribbling: 0.12, defending: 0.27, physical: 0.13, stamina: 0.10 },
  CDM: { pace: 0.06, shooting: 0.05, passing: 0.20, dribbling: 0.10, defending: 0.29, physical: 0.18, stamina: 0.12 },
  CM: { pace: 0.08, shooting: 0.10, passing: 0.28, dribbling: 0.18, defending: 0.14, physical: 0.10, stamina: 0.12 },
  CAM: { pace: 0.10, shooting: 0.19, passing: 0.28, dribbling: 0.28, defending: 0.04, physical: 0.05, stamina: 0.06 },
  LM: { pace: 0.22, shooting: 0.12, passing: 0.21, dribbling: 0.24, defending: 0.08, physical: 0.06, stamina: 0.07 },
  RM: { pace: 0.22, shooting: 0.12, passing: 0.21, dribbling: 0.24, defending: 0.08, physical: 0.06, stamina: 0.07 },
  LW: { pace: 0.24, shooting: 0.20, passing: 0.17, dribbling: 0.27, defending: 0.03, physical: 0.04, stamina: 0.05 },
  RW: { pace: 0.24, shooting: 0.20, passing: 0.17, dribbling: 0.27, defending: 0.03, physical: 0.04, stamina: 0.05 },
  ST: { pace: 0.20, shooting: 0.37, passing: 0.09, dribbling: 0.19, defending: 0.02, physical: 0.10, stamina: 0.03 },
};

function statValue(rating, weight, spread, rng, bias = 0) {
  // Distribute the rating across attributes: high weight => closer to rating.
  const base = rating + bias;
  const deviation = (1 - weight) * spread;
  return clamp(Math.round(base + gaussian(rng) * deviation), 28, 99);
}

/**
 * Computes OVR from the attribute set for a given position.
 * Mirrors the classic football-sim weighting so a striker's shooting matters most.
 */
export function computeOvr(stats, position) {
  const w = WEIGHTS[position] || WEIGHTS.CM;
  let sum = 0;
  let total = 0;
  for (const key of Object.keys(w)) {
    const weight = w[key];
    if (weight <= 0) continue;
    let value;
    if (key === 'gk') {
      value = ((stats.diving || 60) + (stats.handling || 60) + (stats.reflexes || 60) + (stats.positioning || 60)) / 4;
    } else {
      value = stats[key] !== undefined ? stats[key] : 60;
    }
    sum += value * weight;
    total += weight;
  }
  return clamp(Math.round(sum / (total || 1)), 30, 99);
}

/** How well a player covers a slot (1 = perfect, less is worse). */
export function positionFit(playerPosition, slotPosition) {
  if (playerPosition === slotPosition) return 1;
  const family = POSITION_FAMILY[playerPosition] || [playerPosition];
  if (family.includes(slotPosition)) return 0.92;
  const g1 = POSITION_GROUP[playerPosition];
  const g2 = POSITION_GROUP[slotPosition];
  if (g1 === g2) return 0.82;
  if ((g1 === 'MID' && g2 === 'DEF') || (g1 === 'DEF' && g2 === 'MID')) return 0.74;
  if ((g1 === 'ATT' && g2 === 'MID') || (g1 === 'MID' && g2 === 'ATT')) return 0.72;
  if (playerPosition === 'GK' || slotPosition === 'GK') return 0.35;
  return 0.62;
}

// ---------------------------------------------------------------------------
// Name pools (fictional, multi-cultural; no real players)
// ---------------------------------------------------------------------------
const FIRST = [
  'Aziz', 'Bekzod', 'Davron', 'Eldor', 'Farrux', 'Gʻayrat', 'Hasan', 'Ibrohim', 'Jasur', 'Kamol',
  'Laziz', 'Mirjalol', 'Nodir', 'Otabek', 'Pulat', 'Rustam', 'Sardor', 'Temur', 'Ulugʻbek', 'Valijon',
  'Yorqin', 'Zafar', 'Alekso', 'Bruno', 'Cesar', 'Dario', 'Emiliano', 'Franco', 'Goran', 'Hugo',
  'Ivan', 'Jonas', 'Karlo', 'Luka', 'Marco', 'Nemanja', 'Oskar', 'Pablo', 'Rafael', 'Stefan',
  'Tomas', 'Viktor', 'Andre', 'Bilal', 'Cheikh', 'Diego', 'Enzo', 'Fabio', 'Gustavo', 'Hakim',
];
const LAST = [
  'Abdullayev', 'Bekmurodov', 'Choriyev', 'Davlatov', 'Ergashev', 'Fozilov', 'Gʻaniyev', 'Hamidov',
  'Iskandarov', 'Jalilov', 'Karimov', 'Latipov', 'Mirzayev', 'Normatov', 'Otajonov', 'Pardayev',
  'Qodirov', 'Rahimov', 'Sultonov', 'Tursunov', 'Umarov', 'Valiyev', 'Xolmatov', 'Yusupov',
  'Zaripov', 'Silva', 'Moretti', 'Kovac', 'Petrov', 'Sanchez', 'Nakamura', 'Diallo', 'Okafor',
  'Ferreira', 'Bergstrom', 'Novak', 'Almeida', 'Haddad', 'Larsen', 'Marchetti', 'Duarte',
];
const NATIONS = [
  'UZ', 'UZ', 'UZ', 'UZ', 'UZ', 'KZ', 'KG', 'TJ', 'TR', 'BR', 'AR', 'ES', 'IT', 'PT', 'RS',
  'HR', 'DE', 'NL', 'FR', 'SN', 'NG', 'GH', 'MA', 'JP', 'KR', 'SE', 'PL', 'UA', 'MX', 'CO',
];

const ARCHETYPES = {
  GK: { pace: -8, shooting: -22, passing: -4, dribbling: -14, defending: -2, physical: 4, stamina: -6 },
  CB: { pace: -2, shooting: -18, passing: -5, dribbling: -10, defending: 8, physical: 8, stamina: 0 },
  LB: { pace: 3, shooting: -12, passing: -1, dribbling: -2, defending: 3, physical: -2, stamina: 5 },
  RB: { pace: 3, shooting: -12, passing: -1, dribbling: -2, defending: 3, physical: -2, stamina: 5 },
  CDM: { pace: -3, shooting: -8, passing: 2, dribbling: -3, defending: 6, physical: 6, stamina: 3 },
  CM: { pace: -1, shooting: -4, passing: 6, dribbling: 2, defending: -2, physical: -1, stamina: 5 },
  CAM: { pace: 2, shooting: 2, passing: 5, dribbling: 7, defending: -16, physical: -7, stamina: -2 },
  LM: { pace: 8, shooting: -4, passing: 2, dribbling: 5, defending: -10, physical: -6, stamina: 4 },
  RM: { pace: 8, shooting: -4, passing: 2, dribbling: 5, defending: -10, physical: -6, stamina: 4 },
  LW: { pace: 10, shooting: 2, passing: 0, dribbling: 7, defending: -18, physical: -10, stamina: -1 },
  RW: { pace: 10, shooting: 2, passing: 0, dribbling: 7, defending: -18, physical: -10, stamina: -1 },
  ST: { pace: 6, shooting: 10, passing: -6, dribbling: 2, defending: -22, physical: 3, stamina: -2 },
};

export function createPlayer({ id, name, position, rating, rng, clubId, age, nation }) {
  const arch = ARCHETYPES[position] || ARCHETYPES.CM;
  const stats = {
    pace: statValue(rating, (WEIGHTS[position] || WEIGHTS.CM).pace ?? 0.1, 12, rng, arch.pace),
    shooting: statValue(rating, 0.2, 14, rng, arch.shooting),
    passing: statValue(rating, 0.2, 13, rng, arch.passing),
    dribbling: statValue(rating, 0.2, 14, rng, arch.dribbling),
    defending: statValue(rating, 0.2, 15, rng, arch.defending),
    physical: statValue(rating, 0.2, 12, rng, arch.physical),
    stamina: statValue(rating, 0.2, 10, rng, arch.stamina),
  };
  if (position === 'GK') {
    stats.diving = clamp(Math.round(rating + gaussian(rng) * 5 + 2), 30, 99);
    stats.handling = clamp(Math.round(rating + gaussian(rng) * 5), 30, 99);
    stats.reflexes = clamp(Math.round(rating + gaussian(rng) * 5 + 3), 30, 99);
    stats.positioning = clamp(Math.round(rating + gaussian(rng) * 5 - 1), 30, 99);
    stats.kicking = clamp(Math.round((stats.passing + stats.shooting) / 2 + 6), 30, 99);
  }
  const ovr = computeOvr(stats, position);
  return {
    id,
    name,
    position,
    altPositions: (POSITION_FAMILY[position] || [position]).slice(1),
    rating,
    ovr,
    level: 1,
    clubId: clubId || null,
    age: age || Math.round(randomRange(rng, 18, 34)),
    nation: nation || pick(rng, NATIONS),
    stats,
    specialty: null,
    goals: 0,
    assists: 0,
    appearances: 0,
  };
}

function makeName(rng) {
  return `${pick(rng, FIRST)} ${pick(rng, LAST)}`;
}

/** Builds a balanced squad (18 players) for a club seed. */
export function generateSquad(club, seed) {
  const rng = mulberry32(seed);
  const squad = [];
  const plan = [
    ['GK', 2], ['CB', 3], ['LB', 1], ['RB', 1], ['CDM', 2], ['CM', 2], ['CAM', 1], ['LM', 1],
    ['RM', 1], ['LW', 1], ['RW', 1], ['ST', 2],
  ];
  let index = 0;
  for (const [position, count] of plan) {
    for (let i = 0; i < count; i += 1) {
      const depth = i === 0 ? 0 : i === 1 ? -3 : -6;
      const rating = clamp(Math.round(club.rating + depth + gaussian(rng) * 2.6), 55, 92);
      squad.push(createPlayer({
        id: `${club.id}_p${index}`,
        name: makeName(rng),
        position,
        rating,
        rng,
        clubId: club.id,
      }));
      index += 1;
    }
  }
  // OVR descending so the strongest options sit first
  squad.sort((a, b) => (b.ovr - a.ovr) || a.name.localeCompare(b.name));
  return squad;
}

/** Free agents / transfer market pool: original, unaffiliated players. */
export function generateFreeAgents(count = 24, seed = 777001) {
  const rng = mulberry32(seed);
  const out = [];
  const positions = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST'];
  for (let i = 0; i < count; i += 1) {
    const position = positions[i % positions.length];
    const rating = clamp(Math.round(62 + rng() * 26), 58, 90);
    out.push(createPlayer({
      id: `fa_${seed}_${i}`,
      name: makeName(rng),
      position,
      rating,
      rng,
      clubId: null,
    }));
  }
  return out;
}
