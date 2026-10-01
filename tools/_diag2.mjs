import { CLUBS, DEFAULT_CLUB } from '../web/src/game/data/clubs.js';
import { generateSquad } from '../web/src/game/data/players.js';
import { buildLineup } from '../web/src/game/state.js';
import { MatchSim } from '../web/src/sim/match.js';
import { FIELD } from '../web/src/sim/constants.js';

const agg = { goals: 0, shots: 0, decisions: 0, closeThird: 0, nearGoal: 0, shoot: 0, pass: 0, through: 0, clear: 0, dribble: 0, saves: 0, corners: 0, fouls: 0, offsides: 0, matches: 0, passes: 0 };

for (const diff of ['EASY', 'NORMAL', 'HARD', 'PRO', 'LEGENDARY']) {
  for (let i = 0; i < 2; i++) {
    const seed = 300 + i * 71 + diff.length * 13;
    const homeSquad = generateSquad(DEFAULT_CLUB, seed);
    const awaySquad = generateSquad(CLUBS[(i + 3) % CLUBS.length], seed + 5);
    const m = new MatchSim({
      home: { name: 'H', formation: DEFAULT_CLUB.formation, lineup: buildLineup(homeSquad, '4-3-3') },
      away: { name: 'A', formation: '4-4-2', lineup: buildLineup(awaySquad, '4-4-2') },
      difficulty: diff, minutes: 4, seed, humanTeam: null,
    });
    let steps = 0;
    while (!m.finished && steps < 40000) {
      m.update(1 / 45); steps++;
      // sample how deep the ball owner is
      const owner = m.ball.owner;
      if (owner && owner.team === m.possessionTeam) {
        const dir = m.dirOf(owner.team);
        const dist = Math.hypot(dir * FIELD.halfLength - owner.pos.x, owner.pos.z);
        if (dist < 40) agg.closeThird++;
        if (dist < 25) agg.nearGoal++;
      }
    }
    agg.matches++;
    agg.goals += m.score[0] + m.score[1];
    agg.shots += m.stats[0].shots + m.stats[1].shots;
    agg.passes += m.stats[0].passes + m.stats[1].passes;
    agg.saves += m.stats[0].saves + m.stats[1].saves;
    agg.corners += m.stats[0].corners + m.stats[1].corners;
    agg.fouls += m.stats[0].fouls + m.stats[1].fouls;
    agg.offsides += m.stats[0].offsides + m.stats[1].offsides;
    for (const ai of [m.homeAI, m.awayAI]) {
      agg.decisions += ai.debug.decisions;
      agg.shoot += ai.debug.shoot || 0;
      agg.pass += ai.debug.pass || 0;
      agg.through += ai.debug.through || 0;
      agg.clear += ai.debug.clear || 0;
      agg.dribble += ai.debug.dribble || 0;
    }
  }
}
const n = agg.matches;
console.log(`matches ${n} (4 min each)`);
console.log(`goals/match ${(agg.goals / n).toFixed(2)}  shots/match ${(agg.shots / n).toFixed(1)}  passes/match ${(agg.passes / n).toFixed(0)}  saves ${agg.saves}  corners ${agg.corners}  fouls ${agg.fouls}  offsides ${agg.offsides}`);
console.log(`decisions/match ${(agg.decisions / n).toFixed(0)}  shoot ${agg.shoot} (${((agg.shoot / agg.decisions) * 100).toFixed(0)}%)  pass ${agg.pass} (${((agg.pass / agg.decisions) * 100).toFixed(0)}%)  through ${agg.through}  dribble ${agg.dribble} (${((agg.dribble / agg.decisions) * 100).toFixed(0)}%)  clear ${agg.clear}`);
console.log(`samples: within 40m ${agg.closeThird} / within 25m ${agg.nearGoal} of ${stepsTotal(agg)}`);
function stepsTotal(a) { return a.decisions; }
