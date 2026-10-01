/**
 * Persistent game state: club, squad, coins, XP, progression, plus the economy
 * helpers (rewards, upgrades, packs, selling) and squad management (lineups,
 * formation handling, team rating, chemistry).
 */
import { DEFAULT_CLUB, CLUBS, STADIUMS } from './data/clubs.js';
import { generateSquad, generateFreeAgents, createPlayer, computeOvr, positionFit } from './data/players.js';
import { FORMATIONS, getFormation } from '../sim/formations.js';
import { clamp, mulberry32 } from '../core/util.js';

export const SAVE_VERSION = 3;

export const PACKS = [
  { id: 'bronze', nameKey: 'shop.bronzePack', coins: 500, count: 5, min: 60, max: 72, tier: 'bronze', color: '#c98a58' },
  { id: 'silver', nameKey: 'shop.silverPack', coins: 1400, count: 5, min: 68, max: 79, tier: 'silver', color: '#c7d2dd' },
  { id: 'gold', nameKey: 'shop.goldPack', coins: 3200, count: 5, min: 74, max: 85, tier: 'gold', color: '#ffc940' },
  { id: 'elite', nameKey: 'shop.elitePack', coins: 7500, count: 5, min: 81, max: 92, tier: 'elite', color: '#0fd6be' },
];

export const LEVEL_BASE_XP = 600;
export const LEVEL_STEP_XP = 420;

export function xpForLevel(level) {
  return LEVEL_BASE_XP + (level - 1) * LEVEL_STEP_XP;
}

export function createNewState(seed = Date.now()) {
  const rng = mulberry32(seed % 2147483647);
  const squad = generateSquad(DEFAULT_CLUB, seed % 100000);
  const roster = squad.map((player) => ({ ...player, clubId: DEFAULT_CLUB.id, level: 1 }));
  const formation = DEFAULT_CLUB.formation;
  const state = {
    version: SAVE_VERSION,
    createdAt: Date.now(),
    seed,
    club: { ...DEFAULT_CLUB },
    coins: 3500,
    xp: 0,
    level: 1,
    roster,
    lineupIds: [],
    formation,
    stats: {
      matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0,
      trophies: 0, coinsEarned: 0, cleanSheets: 0,
    },
    career: null,
    tournament: null,
    daily: { lastClaim: 0, streak: 0 },
    leagues: { season: 1 },
    market: generateFreeAgents(28, seed % 999983).map((p) => ({ ...p, price: playerPrice(p) })),
    history: [],
  };
  state.lineupIds = buildLineup(state.roster, formation).map((p) => p.id);
  void rng;
  return state;
}

/** Fills empty slots of an old save so upgrades never break a player's progress. */
export function migrateState(state) {
  if (!state) return createNewState();
  const fresh = createNewState(state.seed || 12345);
  const merged = { ...fresh, ...state };
  merged.version = SAVE_VERSION;
  merged.club = { ...fresh.club, ...(state.club || {}) };
  merged.stats = { ...fresh.stats, ...(state.stats || {}) };
  merged.daily = { ...fresh.daily, ...(state.daily || {}) };
  if (!Array.isArray(merged.roster) || merged.roster.length < 11) merged.roster = fresh.roster;
  if (!Array.isArray(merged.market) || !merged.market.length) merged.market = fresh.market;
  // make sure every player has the fields the sim reads
  for (const player of merged.roster) {
    player.level = player.level || 1;
    player.ovr = player.ovr || computeOvr(player.stats, player.position);
    player.rating = player.rating || player.ovr;
    player.goals = player.goals || 0;
    player.assists = player.assists || 0;
    player.appearances = player.appearances || 0;
  }
  if (!Array.isArray(merged.lineupIds) || merged.lineupIds.length !== 11
      || merged.lineupIds.some((id) => !merged.roster.some((p) => p.id === id))) {
    merged.lineupIds = buildLineup(merged.roster, merged.formation || '4-3-3').map((p) => p.id);
  }
  if (!FORMATIONS[merged.formation]) merged.formation = '4-3-3';
  return merged;
}

// ---------------------------------------------------------------------------
// Squad management
// ---------------------------------------------------------------------------
/**
 * Picks the best XI for a formation using position fit + rating.
 * Returns exactly 11 players (in slot order).
 */
export function buildLineup(roster, formationName = '4-3-3') {
  const formation = getFormation(formationName);
  const pool = roster.slice();
  const chosen = [];
  const used = new Set();

  // 1) goalkeeper first (slot 0)
  const gkSlotIndex = formation.slots.findIndex((s) => s.role === 'GK');
  if (gkSlotIndex >= 0) {
    const keepers = pool
      .filter((p) => p.position === 'GK')
      .sort((a, b) => b.ovr - a.ovr);
    const gk = keepers[0] || pool.slice().sort((a, b) => b.ovr - a.ovr)[0];
    if (gk) {
      chosen[gkSlotIndex] = gk;
      used.add(gk.id);
    }
  }

  // 2) remaining slots ordered by how specialised they are (wingers/strikers first)
  const slotOrder = formation.slots
    .map((slot, index) => ({ slot, index }))
    .filter(({ index }) => index !== gkSlotIndex)
    .sort((a, b) => ROLE_SPECIALISATION[b.slot.role] - ROLE_SPECIALISATION[a.slot.role]);

  for (const { slot, index } of slotOrder) {
    let best = null;
    let bestScore = -Infinity;
    for (const player of pool) {
      if (used.has(player.id)) continue;
      const fit = positionFit(player.position, slot.role);
      const score = fit * 100 + player.ovr * 0.6;
      if (score > bestScore) {
        bestScore = score;
        best = player;
      }
    }
    if (best) {
      chosen[index] = best;
      used.add(best.id);
    }
  }
  // safety net: fill any holes with the best remaining players
  for (let i = 0; i < formation.slots.length; i += 1) {
    if (!chosen[i]) {
      const fallback = pool.find((p) => !used.has(p.id));
      if (fallback) {
        chosen[i] = fallback;
        used.add(fallback.id);
      }
    }
  }
  return chosen.filter(Boolean);
}

const ROLE_SPECIALISATION = {
  GK: 100, ST: 60, LW: 55, RW: 55, CB: 50, LB: 45, RB: 45, CDM: 40, CAM: 38, LM: 35, RM: 35, CM: 30,
};

export function lineupPlayers(state) {
  return state.lineupIds
    .map((id) => state.roster.find((p) => p.id === id))
    .filter(Boolean);
}

export function benchPlayers(state) {
  const lineup = new Set(state.lineupIds);
  return state.roster.filter((p) => !lineup.has(p.id));
}

/** Team OVR = weighted average of the XI with a position-fit penalty. */
export function teamOvr(state) {
  const players = lineupPlayers(state);
  if (!players.length) return 0;
  const formation = getFormation(state.formation || '4-3-3');
  let total = 0;
  let weight = 0;
  players.forEach((player, index) => {
    const slot = formation.slots[index] || { role: player.position };
    const fit = positionFit(player.position, slot.role);
    const w = slot.role === 'GK' ? 0.6 : 1;
    total += player.ovr * fit * w;
    weight += w;
  });
  return Math.round(total / (weight || 1));
}

export function teamRatings(state) {
  const players = lineupPlayers(state);
  const formation = getFormation(state.formation || '4-3-3');
  const groups = { ATT: [], MID: [], DEF: [] };
  players.forEach((player, index) => {
    const slot = formation.slots[index] || { role: player.position };
    const fit = positionFit(player.position, slot.role);
    const value = player.ovr * fit;
    if (slot.role === 'GK' || ['CB', 'LB', 'RB'].includes(slot.role)) groups.DEF.push(value);
    else if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(slot.role)) groups.MID.push(value);
    else groups.ATT.push(value);
  });
  const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0);
  return { ATT: avg(groups.ATT), MID: avg(groups.MID), DEF: avg(groups.DEF) };
}

export function chemistry(state) {
  const players = lineupPlayers(state);
  if (!players.length) return 0;
  const formation = getFormation(state.formation || '4-3-3');
  let score = 0;
  players.forEach((player, index) => {
    const slot = formation.slots[index] || { role: player.position };
    score += positionFit(player.position, slot.role);
  });
  const avg = score / players.length;
  const clubBonus = players.filter((p) => p.clubId === state.club.id).length / players.length;
  return clamp(Math.round((avg * 0.75 + clubBonus * 0.25) * 100), 0, 100);
}

export function setFormation(state, name) {
  if (!FORMATIONS[name]) return false;
  state.formation = name;
  state.lineupIds = buildLineup(state.roster, name).map((p) => p.id);
  return true;
}

/** Swaps two players (lineup slots and/or bench) and keeps the XI at 11. */
export function swapPlayers(state, idA, idB) {
  if (!idA || !idB || idA === idB) return false;
  const aInLineup = state.lineupIds.indexOf(idA);
  const bInLineup = state.lineupIds.indexOf(idB);
  if (aInLineup >= 0 && bInLineup >= 0) {
    state.lineupIds[aInLineup] = idB;
    state.lineupIds[bInLineup] = idA;
    return true;
  }
  if (aInLineup >= 0) {
    state.lineupIds[aInLineup] = idB;
    return true;
  }
  if (bInLineup >= 0) {
    state.lineupIds[bInLineup] = idA;
    return true;
  }
  return false;
}

export function autoFillSquad(state) {
  state.lineupIds = buildLineup(state.roster, state.formation || '4-3-3').map((p) => p.id);
  return state.lineupIds;
}

// ---------------------------------------------------------------------------
// Economy
// ---------------------------------------------------------------------------
export function playerPrice(player) {
  const base = Math.pow(Math.max(40, player.ovr) - 40, 2.15) * 1.6;
  return Math.round((base + 400) / 50) * 50;
}

export function sellValue(player) {
  const levelBonus = 1 + (player.level - 1) * 0.12;
  return Math.round((playerPrice(player) * 0.62 * levelBonus) / 25) * 25;
}

export function upgradeCost(player) {
  const level = player.level || 1;
  const growth = Math.pow(level, 1.42);
  return Math.round(((player.ovr * 18 + 320) * growth) / 25) * 25;
}

export const MAX_PLAYER_LEVEL = 12;

/** Upgrades one level: +1 OVR with attribute boosts weighted by position. */
export function upgradePlayer(state, playerId) {
  const player = state.roster.find((p) => p.id === playerId);
  if (!player) return { ok: false, reason: 'not_found' };
  if ((player.level || 1) >= MAX_PLAYER_LEVEL) return { ok: false, reason: 'max' };
  const cost = upgradeCost(player);
  if (state.coins < cost) return { ok: false, reason: 'coins', cost };
  state.coins -= cost;
  player.level = (player.level || 1) + 1;
  player.rating = Math.min(99, player.rating + 1);
  const boostKeys = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'stamina'];
  for (const key of boostKeys) {
    const current = player.stats[key] || 60;
    const gain = current < 70 ? 2 : current < 85 ? 1 : Math.random() < 0.5 ? 1 : 0;
    player.stats[key] = clamp(Math.round(current + gain), 30, 99);
  }
  if (player.position === 'GK') {
    for (const key of ['diving', 'handling', 'reflexes', 'positioning', 'kicking']) {
      player.stats[key] = clamp(Math.round((player.stats[key] || 60) + 1), 30, 99);
    }
  }
  player.ovr = computeOvr(player.stats, player.position);
  return { ok: true, cost, player };
}

export function openPack(state, packId, seed) {
  const pack = PACKS.find((p) => p.id === packId);
  if (!pack) return { ok: false, reason: 'unknown' };
  if (state.coins < pack.coins) return { ok: false, reason: 'coins' };
  state.coins -= pack.coins;
  const rng = mulberry32((seed || Date.now()) % 2147483647);
  const pulled = [];
  const positions = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST'];
  for (let i = 0; i < pack.count; i += 1) {
    const roll = rng();
    // elite packs skew high; bronze packs skew low
    const skew = pack.tier === 'elite' ? Math.pow(roll, 0.6) : pack.tier === 'gold' ? Math.pow(roll, 0.8) : roll;
    const rating = Math.round(pack.min + skew * (pack.max - pack.min));
    const position = positions[Math.floor(rng() * positions.length)];
    const player = createPlayer({
      id: `pk_${pack.id}_${Date.now().toString(36)}_${i}_${Math.floor(rng() * 9999)}`,
      name: randomName(rng),
      position,
      rating,
      rng,
      clubId: state.club.id,
    });
    player.level = 1;
    pulled.push(player);
  }
  state.roster.push(...pulled);
  const totalOvr = pulled.reduce((acc, p) => acc + p.ovr, 0) / Math.max(1, pulled.length);
  return { ok: true, players: pulled, averageOvr: Math.round(totalOvr) };
}

export function buyMarketPlayer(state, playerId) {
  const index = state.market.findIndex((p) => p.id === playerId);
  if (index < 0) return { ok: false, reason: 'not_found' };
  const player = state.market[index];
  if (state.coins < player.price) return { ok: false, reason: 'coins', cost: player.price };
  state.coins -= player.price;
  state.market.splice(index, 1);
  const owned = { ...player, clubId: state.club.id, price: undefined };
  state.roster.push(owned);
  return { ok: true, player: owned };
}

export function sellOwnedPlayer(state, playerId) {
  const index = state.roster.findIndex((p) => p.id === playerId);
  if (index < 0) return { ok: false, reason: 'not_found' };
  if (state.roster.length <= 11) return { ok: false, reason: 'tooFew' };
  const player = state.roster[index];
  const value = sellValue(player);
  const inLineup = state.lineupIds.includes(playerId);
  state.roster.splice(index, 1);
  if (inLineup) autoFillSquad(state);
  state.coins += value;
  state.stats.coinsEarned += value;
  state.market.push({ ...player, price: playerPrice(player) });
  return { ok: true, coins: value, player };
}

export function addXp(state, amount) {
  state.xp += amount;
  let leveled = 0;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level += 1;
    leveled += 1;
  }
  return { level: state.level, leveled };
}

export function computeMatchRewards(state, summary, difficultyKey) {
  const difficultyMultiplier = {
    EASY: 0.7, NORMAL: 1, HARD: 1.45, PRO: 2, LEGENDARY: 2.8,
  }[difficultyKey] || 1;
  const goalsFor = summary.score[0];
  const goalsAgainst = summary.score[1];
  const won = goalsFor > goalsAgainst;
  const drew = goalsFor === goalsAgainst;
  const base = won ? 420 : drew ? 260 : 150;
  const goalBonus = goalsFor * 70;
  const cleanSheet = goalsAgainst === 0 ? 160 : 0;
  const quality = (summary.motm ? 1 : 1) * 1;
  const coinsBefore = Math.round((base + goalBonus + cleanSheet) * difficultyMultiplier * quality);
  const coins = Math.round(coinsBefore / 10) * 10;
  const xp = Math.round((won ? 240 : drew ? 160 : 100) + goalsFor * 30) * (difficultyMultiplier > 1.5 ? 1.4 : 1);
  return {
    coins,
    xp: Math.round(xp),
    breakdown: {
      base, goalBonus, cleanSheet,
      difficultyBonus: Math.round(coins * (1 - 1 / difficultyMultiplier) * 0.5),
      multiplier: difficultyMultiplier,
    },
    result: won ? 'win' : drew ? 'draw' : 'loss',
  };
}

export function applyMatchRewards(state, rewards, summary) {
  state.coins += rewards.coins;
  state.stats.coinsEarned += rewards.coins;
  state.stats.matches += 1;
  state.stats.goalsFor += summary.score[0];
  state.stats.goalsAgainst += summary.score[1];
  if (summary.score[1] === 0) state.stats.cleanSheets += 1;
  if (rewards.result === 'win') state.stats.wins += 1;
  else if (rewards.result === 'draw') state.stats.draws += 1;
  else state.stats.losses += 1;
  const levelInfo = addXp(state, rewards.xp);
  // credit the players who featured
  for (const entry of summary.players) {
    const player = state.roster.find((p) => p.name === entry.name);
    if (!player) continue;
    player.appearances = (player.appearances || 0) + 1;
    player.goals = (player.goals || 0) + (entry.stats.goals || 0);
    player.assists = (player.assists || 0) + (entry.stats.assists || 0);
  }
  return levelInfo;
}

export function dailyReward(state, now = Date.now()) {
  const day = 24 * 60 * 60 * 1000;
  const last = state.daily.lastClaim || 0;
  if (now - last < day) {
    return { ok: false, nextIn: day - (now - last) };
  }
  const streak = now - last < day * 2 ? Math.min(7, (state.daily.streak || 0) + 1) : 1;
  state.daily.streak = streak;
  state.daily.lastClaim = now;
  const coins = 300 + streak * 150;
  state.coins += coins;
  state.stats.coinsEarned += coins;
  return { ok: true, coins, streak };
}

export function resetState() {
  const fresh = createNewState();
  return fresh;
}

function randomName(rng) {
  const first = ['Amir', 'Bek', 'Cyrus', 'Doston', 'Elyor', 'Farid', 'Gʻayrat', 'Hamza', 'Ilhom', 'Jamshid',
    'Kirill', 'Lazio', 'Murod', 'Nodir', 'Omon', 'Pavel', 'Rustam', 'Sardor', 'Temur', 'Vohid',
    'Yusuf', 'Zohid', 'Aleksey', 'Bruno', 'Carlos', 'Damir', 'Egor', 'Fedor', 'Gleb', 'Igor'];
  const last = ['Alimov', 'Bekzodov', 'Choriyev', 'Diyorov', 'Ergashev', 'Fozilov', 'Gʻulomov', 'Hasanov',
    'Iskandarov', 'Joʻrayev', 'Karimov', 'Latipov', 'Mahmudov', 'Nazarov', 'Olimov', 'Pulatov',
    'Qosimov', 'Rahimov', 'Sobirov', 'Tursunov', 'Usmonov', 'Vohidov', 'Xasanov', 'Yoldoshev',
    'Zokirov', 'Ivanov', 'Petrov', 'Novak', 'Silva', 'Costa'];
  const a = first[Math.floor(rng() * first.length)];
  const b = last[Math.floor(rng() * last.length)];
  return `${a} ${b}`;
}

export { CLUBS, STADIUMS };
