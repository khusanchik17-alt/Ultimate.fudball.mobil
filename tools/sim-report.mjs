/**
 * Simulation quality report - runs several CPU-vs-CPU matches and prints the
 * numbers used to tune gameplay (goals, shots, accuracy, possession, restarts).
 *
 *   node tools/sim-report.mjs [matchesPerDifficulty]
 */
import { CLUBS, DEFAULT_CLUB } from '../web/src/game/data/clubs.js';
import { generateSquad } from '../web/src/game/data/players.js';
import { MatchSim } from '../web/src/sim/match.js';

const perDifficulty = Number(process.argv[2] || 2);
const difficulties = ['EASY', 'NORMAL', 'HARD', 'PRO', 'LEGENDARY'];
const rows = [];

for (const difficulty of difficulties) {
  for (let i = 0; i < perDifficulty; i += 1) {
    const seed = 1000 + i * 37 + difficulty.length * 11;
    const home = generateSquad(DEFAULT_CLUB, seed);
    const away = generateSquad(CLUBS[(i + 3) % CLUBS.length], seed + 5);
    const match = new MatchSim({
      home: { name: DEFAULT_CLUB.name, formation: '4-3-3', lineup: home.slice(0, 11) },
      away: { name: CLUBS[(i + 3) % CLUBS.length].name, formation: '4-3-3', lineup: away.slice(0, 11) },
      difficulty,
      minutes: 2.5,
      seed,
      humanTeam: null,
    });
    const dt = 1 / 45;
    let steps = 0;
    while (match.state !== 'fulltime' && steps < 45 * 60 * 8) {
      match.update(dt);
      steps += 1;
    }
    const s = match.summary();
    rows.push({ difficulty, seed, match, summary: s });
  }
}

const pad = (v, n) => String(v).padEnd(n);
console.log(`\n${pad('DIFF', 11)}${pad('SEED', 7)}${pad('SCORE', 8)}${pad('SHOTS', 7)}${pad('ON', 5)}${pad('PASS%', 7)}${pad('POSS', 6)}${pad('CORN', 6)}${pad('FOUL', 6)}${pad('OFF', 5)}${pad('SAVE', 6)}MOTM`);

for (const row of rows) {
  const { match, summary, difficulty, seed } = row;
  const shots = match.stats[0].shots + match.stats[1].shots;
  const onTarget = match.stats[0].shotsOnTarget + match.stats[1].shotsOnTarget;
  const passes = match.stats[0].passes + match.stats[1].passes;
  const completed = match.stats[0].passesCompleted + match.stats[1].passesCompleted;
  const acc = passes ? Math.round((completed / passes) * 100) : 0;
  const corners = match.stats[0].corners + match.stats[1].corners;
  const fouls = match.stats[0].fouls + match.stats[1].fouls;
  const offsides = match.stats[0].offsides + match.stats[1].offsides;
  const saves = match.stats[0].saves + match.stats[1].saves;
  console.log(
    pad(difficulty, 11) + pad(seed, 7) + pad(`${summary.score[0]}-${summary.score[1]}`, 8)
    + pad(shots, 7) + pad(onTarget, 5) + pad(`${acc}%`, 7)
    + pad(`${summary.possession[0]}/${summary.possession[1]}`, 6)
    + pad(corners, 6) + pad(fouls, 6) + pad(offsides, 5) + pad(saves, 6)
    + `${summary.motm ? summary.motm.name : '-'} (${summary.motm ? summary.motm.rating.toFixed(1) : '-'})`,
  );
}

const totals = rows.reduce((acc, r) => {
  acc.goals += r.match.score[0] + r.match.score[1];
  acc.shots += r.match.stats[0].shots + r.match.stats[1].shots;
  acc.passes += r.match.stats[0].passes + r.match.stats[1].passes;
  acc.completed += r.match.stats[0].passesCompleted + r.match.stats[1].passesCompleted;
  return acc;
}, { goals: 0, shots: 0, passes: 0, completed: 0 });

console.log('Restart totals:', JSON.stringify(rows.reduce((acc, r) => {
  for (const [k, v] of Object.entries(r.match.restartCounts)) acc[k] = (acc[k] || 0) + v;
  return acc;
}, {})));
console.log(`\nAverages over ${rows.length} matches: goals/match ${(totals.goals / rows.length).toFixed(2)},`
  + ` shots/match ${(totals.shots / rows.length).toFixed(1)},`
  + ` passes/match ${(totals.passes / rows.length).toFixed(0)},`
  + ` pass accuracy ${Math.round((totals.completed / Math.max(1, totals.passes)) * 100)}%`);
