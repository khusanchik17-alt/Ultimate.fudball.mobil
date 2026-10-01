/**
 * Career (league season) and Tournament (knockout cup) progression.
 *
 * Both modes work fully offline: the player's own fixtures are played in the
 * 3D match engine while all other results are simulated from club strength with
 * a small random factor.
 */
import { CLUBS, findClub } from './data/clubs.js';
import { mulberry32, clamp, shuffleInPlace } from '../core/util.js';

const ALL_TEAMS = [null, ...CLUBS];   // index 0 is replaced by the player's club

function teamName(state, id) {
  if (id === state.club.id) return state.club.name;
  return findClub(id).name;
}

function teamStrength(state, id) {
  if (id === state.club.id) return state.__teamOvr || state.club.rating;
  return findClub(id).rating;
}

/** Round-robin schedule (each team plays everyone twice). */
export function createSeason(clubs) {
  const teams = clubs.slice();
  if (teams.length % 2 !== 0) teams.push('BYE');
  const rounds = [];
  const n = teams.length;
  for (let round = 0; round < (n - 1) * 2; round += 1) {
    const fixtures = [];
    for (let i = 0; i < n / 2; i += 1) {
      const home = teams[i];
      const away = teams[n - 1 - i];
      if (home === 'BYE' || away === 'BYE') continue;
      const flip = round >= n - 1;
      fixtures.push(flip ? { home: away, away: home } : { home, away });
    }
    rounds.push(fixtures);
    // rotate keeping the first team fixed
    teams.splice(1, 0, teams.pop());
  }
  return rounds;
}

export function startCareer(state, seed = Date.now()) {
  const opponents = shuffleInPlace(mulberry32(seed % 99991), CLUBS.slice()).slice(0, 7);
  const clubs = [state.club.id, ...opponents.map((c) => c.id)];
  const rounds = createSeason(clubs);
  state.career = {
    season: (state.career && state.career.season ? state.career.season : 0) + 1,
    rounds,
    matchday: 0,
    table: clubs.map((id) => ({ id, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0 })),
    finished: false,
    champion: null,
    rewardsPaid: false,
  };
  return state.career;
}

function tableRow(table, id) {
  return table.find((row) => row.id === id);
}

export function applyResult(career, homeId, awayId, homeGoals, awayGoals) {
  const home = tableRow(career.table, homeId);
  const away = tableRow(career.table, awayId);
  if (!home || !away) return;
  home.played += 1;
  away.played += 1;
  home.gf += homeGoals;
  home.ga += awayGoals;
  away.gf += awayGoals;
  away.ga += homeGoals;
  if (homeGoals > awayGoals) {
    home.won += 1;
    home.points += 3;
    away.lost += 1;
  } else if (homeGoals < awayGoals) {
    away.won += 1;
    away.points += 3;
    home.lost += 1;
  } else {
    home.drawn += 1;
    away.drawn += 1;
    home.points += 1;
    away.points += 1;
  }
}

export function sortedTable(career) {
  return [...career.table].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.gf - a.ga;
    const gdB = b.gf - b.ga;
    if (gdB !== gdA) return gdB - gdA;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.id.localeCompare(b.id);
  });
}

/** Simulates a fixture between two clubs using their strength. */
export function simulateFixture(state, homeId, awayId, seed = Math.random() * 1e9) {
  const rng = mulberry32(Math.floor(seed) % 2147483647);
  const homeStrength = teamStrength(state, homeId) + 2.5;
  const awayStrength = teamStrength(state, awayId);
  const diff = homeStrength - awayStrength;
  const base = 1.35;
  const homeExpected = clamp(base + diff * 0.075, 0.25, 3.6);
  const awayExpected = clamp(base - diff * 0.075, 0.25, 3.6);
  const poisson = (lambda) => {
    let l = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k += 1;
      p *= rng();
    } while (p > l);
    return k - 1;
  };
  return { home: poisson(homeExpected), away: poisson(awayExpected) };
}

export function nextFixture(state) {
  const career = state.career;
  if (!career || career.finished) return null;
  const round = career.rounds[career.matchday];
  if (!round) return null;
  return round.find((f) => f.home === state.club.id || f.away === state.club.id) || null;
}

export function isHomeFixture(state, fixture) {
  return !!(fixture && fixture.home === state.club.id);
}

/** Plays (or simulates) the player's fixture and all the others in the round. */
export function playMatchday(state, options = {}) {
  const career = state.career;
  if (!career || career.finished) return { ok: false };
  const round = career.rounds[career.matchday];
  if (!round) return { ok: false };
  const results = [];
  for (const fixture of round) {
    const involvesPlayer = fixture.home === state.club.id || fixture.away === state.club.id;
    if (involvesPlayer && options.playerResult) {
      const { homeGoals, awayGoals } = options.playerResult;
      applyResult(career, fixture.home, fixture.away, homeGoals, awayGoals);
      results.push({ ...fixture, homeGoals, awayGoals, played: true });
    } else {
      const seedValue = (career.season * 1000 + career.matchday * 77 + Math.random() * 1000);
      const sim = simulateFixture(state, fixture.home, fixture.away, seedValue);
      applyResult(career, fixture.home, fixture.away, sim.home, sim.away);
      results.push({ ...fixture, homeGoals: sim.home, awayGoals: sim.away, played: false });
    }
  }
  career.matchday += 1;
  if (career.matchday >= career.rounds.length) {
    career.finished = true;
    const table = sortedTable(career);
    career.champion = table[0].id;
  }
  return { ok: true, results };
}

export function careerReward(state) {
  if (!state.career || !state.career.finished || state.career.rewardsPaid) return null;
  const table = sortedTable(state.career);
  const position = table.findIndex((row) => row.id === state.club.id) + 1;
  const rewards = [0, 6000, 4200, 3200, 2400, 1800, 1400, 1000, 700];
  const coins = rewards[Math.min(position, rewards.length - 1)] || 600;
  state.career.rewardsPaid = true;
  state.coins += coins;
  state.stats.coinsEarned += coins;
  if (position === 1) state.stats.trophies += 1;
  return { position, coins, champion: state.career.champion === state.club.id };
}

// ---------------------------------------------------------------------------
// Tournament
// ---------------------------------------------------------------------------
export function startTournament(state, seed = Date.now()) {
  const rng = mulberry32(seed % 88771);
  const pool = shuffleInPlace(rng, CLUBS.slice()).slice(0, 7).map((c) => c.id);
  const teams = [state.club.id, ...pool];
  const pairs = [];
  for (let i = 0; i < teams.length; i += 2) {
    pairs.push({ home: teams[i], away: teams[i + 1], winner: null, homeGoals: 0, awayGoals: 0 });
  }
  state.tournament = {
    round: 0,
    rounds: [pairs],
    eliminated: false,
    champion: null,
    finished: false,
  };
  return state.tournament;
}

export function tournamentRoundName(roundIndex, totalRounds = 3) {
  const names = ['tournament.round16', 'tournament.quarter', 'tournament.semi', 'tournament.final'];
  const fromEnd = totalRounds - roundIndex - 1;
  return names[Math.min(names.length - 1, Math.max(1, 2 + (3 - fromEnd)))] || 'tournament.final';
}

export function currentTournamentMatch(state) {
  const t = state.tournament;
  if (!t || t.finished) return null;
  const round = t.rounds[t.round];
  if (!round) return null;
  return round.find((m) => (m.home === state.club.id || m.away === state.club.id) && !m.winner) || null;
}

export function resolveTournamentMatch(state, match, homeGoals, awayGoals, playerPlayed = false) {
  let hg = homeGoals;
  let ag = awayGoals;
  if (hg === ag) {
    // knockout: penalties decide it
    hg += Math.random() < 0.5 ? 0 : 0;
    const playerIsHome = match.home === state.club.id;
    const playerWins = Math.random() < 0.5;
    match.penalties = true;
    match.winner = (playerPlayed ? (playerWins ? (playerIsHome ? match.home : match.away) : (playerIsHome ? match.away : match.home))
      : (Math.random() < 0.5 ? match.home : match.away));
  } else {
    match.winner = hg > ag ? match.home : match.away;
  }
  match.homeGoals = hg;
  match.awayGoals = ag;
  return match;
}

/** Advances the bracket, simulating the matches the player is not involved in. */
export function advanceTournament(state) {
  const t = state.tournament;
  if (!t || t.finished) return null;
  const round = t.rounds[t.round];
  if (!round.every((m) => m.winner)) return null;

  const playerMatch = round.find((m) => m.home === state.club.id || m.away === state.club.id);
  if (playerMatch && playerMatch.winner !== state.club.id) {
    t.eliminated = true;
    t.finished = true;
    return { eliminated: true };
  }

  const winners = round.map((m) => m.winner);
  if (winners.length === 1) {
    t.finished = true;
    t.champion = winners[0];
    if (winners[0] === state.club.id) {
      state.stats.trophies += 1;
      state.coins += 9000;
      state.stats.coinsEarned += 9000;
    }
    return { champion: winners[0] };
  }

  const nextRound = [];
  for (let i = 0; i < winners.length; i += 2) {
    const home = winners[i];
    const away = winners[i + 1];
    if (home === undefined || away === undefined) break;
    nextRound.push({ home, away, winner: null, homeGoals: 0, awayGoals: 0 });
  }
  t.rounds.push(nextRound);
  t.round += 1;
  return { advanced: true, round: t.round };
}

export function tournamentProgress(state) {
  const t = state.tournament;
  if (!t) return { active: false };
  const totalRounds = 3;
  return {
    active: !t.finished,
    round: t.round,
    roundName: tournamentRoundName(t.round, totalRounds),
    rounds: t.rounds,
    eliminated: t.eliminated,
    champion: t.champion,
  };
}

export { teamName };
