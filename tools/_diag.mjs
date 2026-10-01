import { CLUBS, DEFAULT_CLUB } from '../web/src/game/data/clubs.js';
import { generateSquad } from '../web/src/game/data/players.js';
import { MatchSim } from '../web/src/sim/match.js';

let agg = { completed: 0, intercepted: 0, out: 0, timeout: 0, sameTeam: 0, goals: 0, shots: 0, decisions: 0 };
for (const diff of ['EASY', 'NORMAL', 'HARD', 'PRO', 'LEGENDARY']) {
  for (let i = 0; i < 3; i++) {
    const seed = 200 + i * 91 + diff.length * 7;
    const m = new MatchSim({
      home: { name: 'H', formation: '4-3-3', lineup: generateSquad(DEFAULT_CLUB, seed).slice(0, 11) },
      away: { name: 'A', formation: '4-4-2', lineup: generateSquad(CLUBS[(i + 2) % CLUBS.length], seed + 9).slice(0, 11) },
      difficulty: diff, minutes: 2.5, seed, humanTeam: null,
    });
    let steps = 0;
    while (m.state !== 'fulltime' && steps < 20000) { m.update(1 / 45); steps++; }
    for (const k of Object.keys(m.passOutcomes)) agg[k] = (agg[k] || 0) + m.passOutcomes[k];
    agg.goals += m.score[0] + m.score[1];
    agg.shots += m.stats[0].shots + m.stats[1].shots;
    agg.decisions += m.homeAI.debug.decisions + m.awayAI.debug.decisions;
    agg.statsPasses = (agg.statsPasses || 0) + m.stats[0].passes + m.stats[1].passes;
    agg.statsCompleted = (agg.statsCompleted || 0) + m.stats[0].passesCompleted + m.stats[1].passesCompleted;
  }
}
console.log("checks: stats passes", agg.statsPasses, "completed", agg.statsCompleted);
const total = agg.completed + agg.intercepted + agg.out + agg.timeout + agg.sameTeam;
console.log('pass outcomes over 15 matches:', JSON.stringify(agg));
console.log(`completion rate: ${Math.round((agg.completed / total) * 100)}%  intercepted: ${Math.round((agg.intercepted / total) * 100)}%  out: ${Math.round((agg.out / total) * 100)}%  timeout: ${Math.round((agg.timeout / total) * 100)}%  sameTeam: ${Math.round((agg.sameTeam / total) * 100)}%`);
console.log('goals/match', (agg.goals / 15).toFixed(2), 'shots/match', (agg.shots / 15).toFixed(1), 'decisions/match', (agg.decisions / 15).toFixed(0));
