// Meta systems: rewards, transfer market, upgrades, tournament, career.
import { getSave, persist, persistSoon, addCoins, addXp, recordMatchResult, addTrophy, levelFromXp, xpForLevel } from './save.js';
import { allPlayers, playerById, playersOfClub, playerValue, upgradeCost, calcOVR, CLUBS, clubById, autoPickXI, DIFFICULTIES, FORMATIONS } from './data.js';
import { mulberry32, pick, dayKey, shuffle } from './utils.js';
import { t } from './i18n.js';

// ---------------------------------------------------------------- match rewards
export function matchRewards(result, userGoals) {
  const d = (DIFFICULTIES[result.difficulty] || DIFFICULTIES.normal).reward;
  const baseCoins = result.result === 'win' ? 300 : result.result === 'draw' ? 150 : 80;
  const coins = Math.round(baseCoins * d) + userGoals * 45;
  const baseXp = result.result === 'win' ? 110 : result.result === 'draw' ? 65 : 35;
  const xp = Math.round(baseXp * d);
  return { coins, xp, winBonus: Math.round(baseCoins * d), goalBonus: userGoals * 45 };
}

export function applyMatchResult(res, mode = 'quick') {
  const save = getSave();
  recordMatchResult({ userScore: res.userScore, oppScore: res.oppScore });
  const rewards = matchRewards(res, res.userScore);
  addCoins(rewards.coins);
  const newLevel = addXp(rewards.xp);
  rewards.levelUp = newLevel;
  persist();
  return rewards;
}

// ---------------------------------------------------------------- transfers & upgrades
export function canBuy(p) {
  const save = getSave();
  return save.coins >= playerValue(p) && !save.squad.includes(p.id);
}

export function buyPlayer(p) {
  const save = getSave();
  const price = playerValue(p);
  if (save.coins < price) return { ok: false, reason: t('not_enough') };
  if (save.squad.includes(p.id)) return { ok: false, reason: t('squad_full') };
  if (save.squad.length >= 26) return { ok: false, reason: t('squad_full') };
  save.coins -= price;
  save.squad.push(p.id);
  save.players[p.id] = JSON.parse(JSON.stringify(p));
  persist();
  return { ok: true };
}

export function sellPlayer(id) {
  const save = getSave();
  const idx = save.squad.indexOf(id);
  if (idx < 0) return { ok: false };
  const p = save.players[id] || playerById(id);
  const gain = Math.round(playerValue(p) * 0.8);
  save.squad.splice(idx, 1);
  delete save.players[id];
  // remove from lineup
  save.lineup.slots = save.lineup.slots.map(s => (s === id ? null : s));
  save.coins += gain;
  persist();
  return { ok: true, gain };
}

export function upgradePlayer(id) {
  const save = getSave();
  const p = save.players[id];
  if (!p) return { ok: false };
  if (p.ovr >= 95) return { ok: false, reason: t('max_level') };
  const cost = upgradeCost(p);
  if (save.coins < cost) return { ok: false, reason: t('not_enough') };
  save.coins -= cost;
  // raise key stats proportionally
  const keys = ['speed', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'stamina'];
  for (const k of keys) p[k] = Math.min(99, p[k] + 1);
  p.ovr = calcOVR(p);
  persist();
  return { ok: true, ovr: p.ovr };
}

export function getSquadPlayers() {
  const save = getSave();
  return save.squad.map(id => save.players[id] || playerById(id)).filter(Boolean);
}

export function ownedPlayer(id) {
  const save = getSave();
  return save.players[id] || null;
}

// ---------------------------------------------------------------- market (daily refresh)
export function getMarket() {
  const save = getSave();
  const today = dayKey();
  if (save.market.day !== today) {
    const rng = mulberry32(today.split('-').reduce((a, b) => a + Number(b), 0) * 7919);
    const pool = allPlayers().filter(p => !save.squad.includes(p.id));
    save.market.items = shuffle(rng, pool).slice(0, 6).map(p => p.id);
    save.market.day = today;
    persist();
  }
  return save.market.items.map(id => playerById(id)).filter(Boolean);
}

// ---------------------------------------------------------------- tournament
export function startTournament() {
  const save = getSave();
  const rng = mulberry32(Date.now() % 1000000);
  const others = shuffle(rng, CLUBS.filter(c => c.id !== save.clubId)).slice(0, 7);
  const clubs = shuffle(rng, [clubById(save.clubId), ...others]);
  const qf = [];
  for (let i = 0; i < 4; i++) qf.push({ a: clubs[i * 2].id, b: clubs[i * 2 + 1].id, winner: null });
  save.tournament = { rounds: [qf], stage: 0, alive: true };
  persist();
  return save.tournament;
}

export function currentTournamentMatch() {
  const tr = getSave().tournament;
  if (!tr) return null;
  const round = tr.rounds[tr.stage];
  for (const m of round) {
    if (m.winner === null && (m.a === getSave().clubId || m.b === getSave().clubId)) return m;
  }
  return null;
}

export function simTournamentMatch(m) {
  const rng = mulberry32((m.a.length * 31 + m.b.length * 17 + Date.now()) % 999983);
  const ca = clubById(m.a), cb = clubById(m.b);
  let sa = Math.floor(rng() * 3 * (ca.strength / 80));
  let sb = Math.floor(rng() * 3 * (cb.strength / 80));
  if (sa === sb) { if (rng() > 0.5) sa++; else sb++; } // no draws in cup
  m.score = [sa, sb];
  m.winner = sa > sb ? m.a : m.b;
}

export function advanceTournament(userWon, userScore, oppScore) {
  const save = getSave();
  const tr = save.tournament;
  if (!tr) return { out: true };
  const round = tr.rounds[tr.stage];
  const myMatch = round.find(m => m.a === save.clubId || m.b === save.clubId);
  if (myMatch) {
    myMatch.score = myMatch.a === save.clubId ? [userScore, oppScore] : [oppScore, userScore];
    myMatch.winner = userWon ? save.clubId : (myMatch.a === save.clubId ? myMatch.b : myMatch.a);
  }
  // simulate other matches of this round
  for (const m of round) if (m.winner === null) simTournamentMatch(m);
  if (!userWon) { tr.alive = false; persist(); return { out: true }; }
  const winners = round.map(m => m.winner);
  if (winners.length === 1) {
    tr.champion = winners[0];
    if (tr.champion === save.clubId) addTrophy('cup');
    persist();
    return { champion: tr.champion, rounds: tr.rounds };
  }
  // next round pairings
  const next = [];
  for (let i = 0; i < winners.length; i += 2) next.push({ a: winners[i], b: winners[i + 1], winner: null });
  tr.rounds.push(next);
  tr.stage++;
  persist();
  return { continues: true, rounds: tr.rounds, stage: tr.stage };
}

// ---------------------------------------------------------------- career (league season)
export function startCareer() {
  const save = getSave();
  const rng = mulberry32(Date.now() % 777777);
  const clubs = shuffle(rng, CLUBS.slice());
  const fixtures = [];
  // single round robin
  for (let i = 0; i < clubs.length; i++)
    for (let j = i + 1; j < clubs.length; j++)
      fixtures.push({ a: clubs[i].id, b: clubs[j].id, played: false, sa: 0, sb: 0 });
  fixtures.sort(() => rng() - 0.5);
  save.career = { clubs: clubs.map(c => c.id), fixtures, done: false, season: (save.career ? save.career.season + 1 : 1) };
  persist();
  return save.career;
}

export function nextCareerFixture() {
  const c = getSave().career;
  if (!c || c.done) return null;
  const mine = c.fixtures.find(f => !f.played && (f.a === getSave().clubId || f.b === getSave().clubId));
  return mine || null;
}

export function simOtherFixtures(throughFixture) {
  const save = getSave();
  const c = save.career;
  if (!c) return;
  const rng = mulberry32(Date.now() % 333331);
  for (const f of c.fixtures) {
    if (f.played) continue;
    if (f === throughFixture) continue;
    if (f.a === save.clubId || f.b === save.clubId) continue;
    const ca = clubById(f.a), cb = clubById(f.b);
    f.sa = Math.floor(rng() * 3.4 * (ca.strength / (ca.strength + cb.strength) + 0.25));
    f.sb = Math.floor(rng() * 3.4 * (cb.strength / (ca.strength + cb.strength) + 0.25));
    f.played = true;
  }
}

export function applyCareerResult(userScore, oppScore) {
  const save = getSave();
  const c = save.career;
  if (!c) return null;
  const f = c.fixtures.find(x => !x.played && (x.a === save.clubId || x.b === save.clubId));
  if (!f) return null;
  if (f.a === save.clubId) { f.sa = userScore; f.sb = oppScore; }
  else { f.sa = oppScore; f.sb = userScore; }
  f.played = true;
  simOtherFixtures(f);
  // season finished?
  const remaining = c.fixtures.filter(x => !x.played && (x.a === save.clubId || x.b === save.clubId)).length;
  if (remaining === 0) {
    c.done = true;
    const table = careerTable();
    if (table[0] && table[0].id === save.clubId) addTrophy('league');
  }
  persist();
  return c;
}

export function careerTable() {
  const save = getSave();
  const c = save.career;
  if (!c) return [];
  const rows = {};
  for (const id of c.clubs) rows[id] = { id, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
  for (const f of c.fixtures) {
    if (!f.played) continue;
    const A = rows[f.a], B = rows[f.b];
    A.p++; B.p++; A.gf += f.sa; A.ga += f.sb; B.gf += f.sb; B.ga += f.sa;
    if (f.sa > f.sb) { A.w++; A.pts += 3; B.l++; }
    else if (f.sa < f.sb) { B.w++; B.pts += 3; A.l++; }
    else { A.d++; B.d++; A.pts++; B.pts++; }
  }
  return Object.values(rows).sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga));
}

// ---------------------------------------------------------------- helpers for UI
export function levelProgress() {
  const save = getSave();
  const lvl = levelFromXp(save.profile.xp);
  const base = lvl <= 1 ? 0 : xpForLevel(lvl - 1);
  const next = xpForLevel(lvl);
  return { lvl, cur: save.profile.xp - base, need: next - base };
}

export function ensureLineup() {
  const save = getSave();
  const squad = getSquadPlayers();
  const f = save.lineup.formation || '4-3-3';
  if (!save.lineup.slots || save.lineup.slots.length !== 11) {
    save.lineup.slots = autoPickXI(squad, f);
    persistSoon();
    return;
  }
  // drop invalid ids
  let changed = false;
  save.lineup.slots = save.lineup.slots.map(id => {
    if (id && squad.some(p => p.id === id)) return id;
    changed = true;
    return null;
  });
  if (changed || save.lineup.slots.some(id => !id)) {
    const used = new Set(save.lineup.slots.filter(Boolean));
    const free = squad.filter(p => !used.has(p.id)).sort((a, b) => b.ovr - a.ovr);
    const slots = FORMATIONS[f];
    save.lineup.slots = save.lineup.slots.map((id, i) => {
      if (id) return id;
      let cand = free.find(p => p.pos === slots[i].pos) || free.find(p => !used.has(p.id));
      if (cand) { used.add(cand.id); free.splice(free.indexOf(cand), 1); return cand.id; }
      return null;
    });
    persistSoon();
  }
}

export function lineupXI() {
  ensureLineup();
  const save = getSave();
  return save.lineup.slots.map(id => ownedPlayer(id) || playerById(id)).filter(Boolean);
}
