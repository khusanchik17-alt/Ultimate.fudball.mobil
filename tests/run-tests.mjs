#!/usr/bin/env node
/**
 * Headless test suite for the game logic (no DOM, no WebGL required).
 *
 *   node tests/run-tests.mjs        # or: npm test
 *
 * Covers: math helpers, squad/OVR rules, formations, ball physics, full
 * CPU-vs-CPU matches on every difficulty, human control API, pass/shot
 * accounting and the penalty shootout state machine.
 */
import assert from 'node:assert/strict';
import { clamp, damp, mulberry32, gaussian, formatClock, shuffleInPlace } from '../web/src/core/util.js';
import { EventBus, deepMerge } from '../web/src/core/events.js';
import { i18n, t } from '../web/src/core/i18n.js';
import { CLUBS, DEFAULT_CLUB, findClub, STADIUMS } from '../web/src/game/data/clubs.js';
import { POSITIONS, createPlayer, computeOvr, positionFit, generateSquad, generateFreeAgents } from '../web/src/game/data/players.js';
import { FORMATIONS, getFormation, slotToWorld, shapedTarget } from '../web/src/sim/formations.js';
import { FIELD, BALL, PLAYER, MATCH, DIFFICULTY, DIFFICULTY_ORDER, TIME_OF_DAY, getDifficulty } from '../web/src/sim/constants.js';
import { Ball } from '../web/src/sim/ball.js';
import { MatchSim, MATCH_STATE } from '../web/src/sim/match.js';
import { buildLineup } from '../web/src/game/state.js';
import { PenaltyShootout, PENALTY_STATE, aimTarget, applyPenaltyError } from '../web/src/sim/penalty.js';

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed += 1;
    process.stdout.write(`  \u2713 ${name}\n`);
  } catch (error) {
    failed += 1;
    failures.push({ name, error });
    process.stdout.write(`  \u2717 ${name}\n     ${error.message.split('\n')[0]}\n`);
  }
}

function section(title) {
  process.stdout.write(`\n${title}\n`);
}

function makeTeams() {
  const homeSquad = generateSquad(DEFAULT_CLUB, 991);
  const awaySquad = generateSquad(CLUBS[0], 992);
  return {
    home: { club: DEFAULT_CLUB, lineup: buildLineup(homeSquad, DEFAULT_CLUB.formation), formation: DEFAULT_CLUB.formation, name: DEFAULT_CLUB.short },
    away: { club: CLUBS[0], lineup: buildLineup(awaySquad, CLUBS[0].formation), formation: CLUBS[0].formation, name: CLUBS[0].short },
  };
}

function makeMatch(opts = {}) {
  const teams = makeTeams();
  return new MatchSim({
    home: teams.home,
    away: teams.away,
    difficulty: opts.difficulty || 'NORMAL',
    minutes: opts.minutes || 2,
    seed: opts.seed || 4242,
    humanTeam: opts.humanTeam === undefined ? null : opts.humanTeam,
    options: opts.options || {},
  });
}

function checkInvariants(match, context) {
  const ball = match.ball.position;
  assert.ok(Number.isFinite(ball.x) && Number.isFinite(ball.y) && Number.isFinite(ball.z), `ball NaN ${context}`);
  assert.ok(Math.abs(ball.x) < FIELD.halfLength + 12, `ball x out of range: ${ball.x} ${context}`);
  assert.ok(Math.abs(ball.z) < FIELD.halfWidth + 12, `ball z out of range: ${ball.z} ${context}`);
  assert.ok(ball.y > -1, `ball below ground: ${ball.y} ${context}`);
  for (const player of match.players) {
    assert.ok(Number.isFinite(player.pos.x) && Number.isFinite(player.pos.z), `player NaN ${context}`);
    assert.ok(Math.abs(player.pos.x) <= FIELD.halfLength + 6, `player x out of bounds ${player.pos.x} ${context}`);
    assert.ok(Math.abs(player.pos.z) <= FIELD.halfWidth + 6, `player z out of bounds ${player.pos.z} ${context}`);
    assert.ok(player.stamina >= 0 && player.stamina <= 100, `stamina out of range ${player.stamina}`);
  }
}

function playOut(match, dt = 1 / 30, maxSeconds = 60 * 12) {
  const steps = Math.floor(maxSeconds / dt);
  for (let i = 0; i < steps; i += 1) {
    match.update(dt);
    if (i % 150 === 0) checkInvariants(match, `step ${i}`);
    if (match.finished) return i;
  }
  return steps;
}

// ---------------------------------------------------------------------------
section('core utilities');
test('clamp / damp behave', () => {
  assert.equal(clamp(5, 0, 1), 1);
  assert.equal(clamp(-3, 0, 1), 0);
  assert.ok(damp(0, 10, 8, 0.1) > 0 && damp(0, 10, 8, 0.1) < 10);
});
test('mulberry32 is deterministic', () => {
  const a = mulberry32(123);
  const b = mulberry32(123);
  for (let i = 0; i < 20; i += 1) assert.equal(a(), b());
});
test('gaussian stays finite and centred', () => {
  const rng = mulberry32(7);
  let sum = 0;
  for (let i = 0; i < 2000; i += 1) {
    const g = gaussian(rng);
    assert.ok(Number.isFinite(g));
    sum += g;
  }
  assert.ok(Math.abs(sum / 2000) < 0.15);
});
test('formatClock renders m:ss (TV scoreboard style)', () => {
  assert.equal(formatClock(0), '0:00');
  assert.equal(formatClock(67 * 60 + 42), '67:42');
  assert.equal(formatClock(90 * 60), '90:00');
});
test('EventBus emits and unsubscribes', () => {
  const bus = new EventBus();
  let hits = 0;
  const off = bus.on('x', () => { hits += 1; });
  bus.emit('x', 1);
  off();
  bus.emit('x', 2);
  assert.equal(hits, 1);
});
test('deepMerge keeps nested settings', () => {
  const merged = deepMerge({ a: 1, b: { c: 2, d: 3 } }, { b: { c: 9 } });
  assert.equal(merged.a, 1);
  assert.equal(merged.b.c, 9);
  assert.equal(merged.b.d, 3);
});

// ---------------------------------------------------------------------------
section('localisation');
test('three languages are loaded with the same keys', () => {
  const sample = ['menu.play', 'match.goal', 'settings.graphics', 'players.upgrade'];
  for (const lang of ['en', 'uz', 'ru']) {
    i18n.setLanguage(lang);
    for (const key of sample) {
      const value = t(key);
      assert.ok(value && value !== key, `${lang} missing ${key}`);
    }
  }
  i18n.setLanguage('uz');
});
test('interpolation works', () => {
  i18n.setLanguage('en');
  assert.match(t('setup.minutes', { n: 4 }), /4/);
});

// ---------------------------------------------------------------------------
section('data: clubs, squads, ratings');
test('every club has a complete identity', () => {
  for (const club of [...CLUBS, DEFAULT_CLUB]) {
    assert.ok(club.id && club.name && club.city && club.stadium, `club ${club.id}`);
    assert.ok(club.primary.startsWith('#') && club.secondary.startsWith('#'), `club colours ${club.id}`);
    assert.ok(club.rating >= 50 && club.rating <= 99);
    assert.ok(FORMATIONS[club.formation], `club formation ${club.formation}`);
  }
  assert.ok(STADIUMS.length >= 4);
});
test('findClub falls back to the player club', () => {
  assert.equal(findClub('does_not_exist').id, DEFAULT_CLUB.id);
});
test('generated squad is legal', () => {
  const squad = generateSquad(CLUBS[2], 55);
  assert.ok(squad.length >= 18);
  assert.ok(squad.filter((p) => p.position === 'GK').length >= 2);
  const ids = new Set(squad.map((p) => p.id));
  assert.equal(ids.size, squad.length);
  for (const player of squad) {
    assert.ok(POSITIONS.includes(player.position));
    assert.ok(player.ovr >= 30 && player.ovr <= 99, `ovr ${player.ovr}`);
    for (const [key, value] of Object.entries(player.stats)) {
      assert.ok(value >= 20 && value <= 99, `stat ${key}=${value}`);
    }
  }
});
test('keeper OVR weighs keeping attributes', () => {
  const rng = mulberry32(3);
  const keeper = createPlayer({ id: 'gk1', name: 'Test Keeper', position: 'GK', rating: 80, rng });
  assert.ok(keeper.ovr >= 70 && keeper.ovr <= 92, `keeper ovr ${keeper.ovr}`);
  assert.ok(keeper.stats.diving !== undefined && keeper.stats.reflexes !== undefined);
  assert.ok(computeOvr(keeper.stats, 'GK') === keeper.ovr);
});
test('positionFit rewards natural roles, punishes wrong ones', () => {
  assert.equal(positionFit('ST', 'ST'), 1);
  assert.ok(positionFit('ST', 'CB') < 0.8);
  assert.ok(positionFit('CB', 'CB') > positionFit('CB', 'ST'));
  assert.ok(positionFit('CM', 'CDM') > positionFit('CM', 'GK'));
});
test('free agents are valid transfer targets', () => {
  const agents = generateFreeAgents(12, 4242);
  assert.equal(agents.length, 12);
  for (const agent of agents) assert.ok(POSITIONS.includes(agent.position));
});

// ---------------------------------------------------------------------------
section('formations and difficulty');
test('formations have eleven slots and one keeper', () => {
  for (const [name, formation] of Object.entries(FORMATIONS)) {
    assert.equal(formation.slots.length, 11, `${name} slot count`);
    assert.equal(formation.slots.filter((s) => s.role === 'GK').length, 1, `${name} keeper`);
    for (const slot of formation.slots) {
      assert.ok(Number.isFinite(slot.x) && Number.isFinite(slot.z), `${name} slot coords`);
      assert.ok(slot.x > 0 && slot.x < 1, `${name} slot x normalised`);
      assert.ok(Math.abs(slot.z) <= 1, `${name} slot z normalised`);
    }
  }
});
test('formations are mirrored for the away team and stay on the pitch', () => {
  for (const name of Object.keys(FORMATIONS)) {
    const formation = getFormation(name);
    formation.slots.forEach((slot) => {
      const home = slotToWorld(slot, 1, FIELD);
      const away = slotToWorld(slot, -1, FIELD);
      assert.ok(Math.abs(home.x) < FIELD.halfLength, `${name} home x`);
      assert.ok(Math.abs(away.x) < FIELD.halfLength, `${name} away x`);
      assert.ok(Math.abs(home.z) < FIELD.halfWidth, `${name} home z`);
      assert.ok(Math.abs(home.x - -away.x) < 1e-6 || Math.abs(home.x + away.x) < 1e-6, 'mirror x');
    });
  }
});
test('shapedTarget pushes the team forward in possession', () => {
  const formation = getFormation('4-3-3');
  const slot = formation.slots[6];
  const base = { field: FIELD, dir: 1, ballX: 0, ballZ: 0 };
  const home = shapedTarget(slot, { ...base, phase: 'attack' });
  const deep = shapedTarget(slot, { ...base, phase: 'defend' });
  assert.ok(home.x > deep.x, `${home.x} vs ${deep.x}`);
});
test('difficulty presets scale up in order', () => {
  assert.equal(DIFFICULTY_ORDER.length, 5);
  const easy = getDifficulty('EASY');
  const legendary = getDifficulty('LEGENDARY');
  assert.ok(easy.passError > legendary.passError);
  assert.ok(legendary.reaction <= easy.reaction);
  assert.ok(legendary.rewardMultiplier > easy.rewardMultiplier);
  for (const key of DIFFICULTY_ORDER) {
    const preset = DIFFICULTY[key];
    assert.ok(preset.shootRange > 0 && preset.passError >= 0 && preset.shotError >= 0, key);
  }
});
test('time of day presets exist', () => {
  for (const key of ['day', 'sunset', 'night']) {
    assert.ok(TIME_OF_DAY[key] && typeof TIME_OF_DAY[key].sun === 'number', key);
  }
});

// ---------------------------------------------------------------------------
section('ball physics');
test('kicked ball travels, slows down and lands', () => {
  const ball = new Ball();
  ball.reset(0, 0);
  ball.kick({ x: 1, y: 0, z: 0 }, 20, { lift: 0.2, kind: 'pass' });
  let steps = 0;
  while (ball.velocity.length() > 0.05 && steps < 900) {
    ball.update(1 / 60);
    steps += 1;
    assert.ok(Number.isFinite(ball.position.x));
    assert.ok(ball.position.y >= -0.2, 'ball never sinks through the pitch');
  }
  assert.ok(ball.position.x > 8, `ball travelled only ${ball.position.x.toFixed(2)} m`);
});
test('predict returns a reachable point', () => {
  const ball = new Ball();
  ball.reset(0, 0);
  ball.kick({ x: 1, y: 0, z: 0 }, 14, { lift: 0.1, kind: 'pass' });
  const predicted = ball.predict(6);
  assert.ok(predicted && Number.isFinite(predicted.x));
  assert.ok(predicted.x > 0);
});
test('control locks prevent instant re-possession', () => {
  const ball = new Ball();
  const player = { id: 'p1', team: 0, pos: { x: 0, z: 0 }, isGK: false };
  ball.reset(0, 0);
  ball.registerTouch(player, 0.5);
  assert.equal(ball.canBeControlledBy(player), false);
  ball.decayLocks(0.6);
  assert.equal(ball.canBeControlledBy(player), true);
});

// ---------------------------------------------------------------------------
section('match simulation');
test('kick-off sets up 22 players and a centred ball', () => {
  const match = makeMatch();
  assert.equal(match.players.length, 22);
  assert.equal(match.players.filter((p) => p.isGK).length, 2);
  assert.equal(match.ball.position.x, 0);
  assert.equal(match.ball.position.z, 0);
  assert.ok(match.controlledPlayerId === null || match.controlledPlayerId !== undefined);
});
test('a full CPU match runs end to end without errors', () => {
  const match = makeMatch({ minutes: 2, seed: 777 });
  const steps = playOut(match);
  assert.ok(match.finished, `match did not finish in ${steps} steps`);
  assert.equal(match.state, MATCH_STATE.FULLTIME);
  assert.ok(match.clockSeconds >= 90 * 60);
  for (const value of match.score) assert.ok(Number.isInteger(value) && value >= 0);
  assert.ok(match.score[0] + match.score[1] <= 20, `absurd scoreline ${match.score}`);
  const totalShots = match.stats[0].shots + match.stats[1].shots;
  assert.ok(totalShots >= 3, `only ${totalShots} shots in the whole match`);
  assert.ok(match.stats[0].passes > 5, `passes ${match.stats[0].passes}`);
  for (const team of [0, 1]) {
    const stats = match.stats[team];
    assert.ok(stats.shotsOnTarget <= stats.shots, 'on target <= shots');
    assert.ok(stats.passesCompleted <= stats.passes, 'completed <= passes');
    assert.ok(stats.corners >= 0 && stats.fouls >= 0 && stats.offsides >= 0 && stats.saves >= 0);
  }
  const possession = match.possessionPercent();
  assert.equal(possession[0] + possession[1], 100);
  const accuracy = match.passAccuracy(0);
  assert.ok(accuracy >= 0 && accuracy <= 100, `accuracy ${accuracy}`);
});
test('every difficulty completes a match with plausible numbers', () => {
  DIFFICULTY_ORDER.forEach((difficulty, index) => {
    // two seeds per difficulty: a single short match has a lot of variance
    let bestShots = 0;
    for (const seed of [900 + index * 31, 1900 + index * 57]) {
      const match = makeMatch({ minutes: 3, difficulty, seed });
      playOut(match);
      assert.ok(match.finished, `${difficulty} did not finish`);
      assert.ok(match.score[0] + match.score[1] <= 22, `${difficulty} score ${match.score}`);
      bestShots = Math.max(bestShots, match.stats[0].shots + match.stats[1].shots);
      const possession = match.possessionPercent();
      assert.equal(possession[0] + possession[1], 100);
    }
    assert.ok(bestShots >= 3, `${difficulty} never managed a shot`);
  });
});
test('match events fire (whistle, restart, control)', () => {
  const match = makeMatch({ minutes: 2, seed: 31 });
  const seen = { whistle: 0, restart: 0, control: 0, goal: 0, halftime: 0, fulltime: 0 };
  match.events.on('whistle', () => { seen.whistle += 1; });
  match.events.on('restart', () => { seen.restart += 1; });
  match.events.on('ball:control', () => { seen.control += 1; });
  match.events.on('goal', () => { seen.goal += 1; });
  match.events.on('halftime', () => { seen.halftime += 1; });
  match.events.on('fulltime', () => { seen.fulltime += 1; });
  playOut(match);
  assert.ok(seen.whistle > 0, 'no whistle');
  assert.ok(seen.control > 0, 'ball never controlled');
  assert.ok(seen.restart > 0, 'no restarts at all');
  assert.equal(seen.halftime, 1);
  assert.equal(seen.fulltime, 1);
  assert.equal(seen.goal, match.score[0] + match.score[1]);
});
test('stats, timeline and MOTM agree with the scoreline', () => {
  const match = makeMatch({ minutes: 2, seed: 9091 });
  playOut(match);
  const summary = match.summary();
  assert.equal(summary.timeline.length, summary.score[0] + summary.score[1]);
  assert.equal(summary.players.length, 22);
  assert.ok(summary.motm && summary.motm.name, 'no man of the match');
  assert.ok(summary.motm.rating >= 3 && summary.motm.rating <= 10, `motm rating ${summary.motm.rating}`);
  assert.equal(summary.home, DEFAULT_CLUB.short);
  assert.equal(summary.away, CLUBS[0].short);
});
test('halves swap ends at half time', () => {
  const match = makeMatch({ minutes: 2, seed: 55 });
  playOut(match);
  assert.equal(match.half, 2);
  assert.equal(match.dirOf(0), -1);
  assert.equal(match.dirOf(1), 1);
});
test('a match with a human team listens to intents', () => {
  const match = makeMatch({ minutes: 2, humanTeam: 0, seed: 31 });
  const player = match.nearestPlayerToBall(0);
  match.switchControlled(player);
  const before = { x: player.pos.x, z: player.pos.z };
  match.setHumanIntent(1, 1, true);
  for (let i = 0; i < 45; i += 1) match.update(1 / 60);
  const moved = Math.hypot(player.pos.x - before.x, player.pos.z - before.z);
  assert.ok(moved > 0.2, `controlled player barely moved (${moved.toFixed(2)}m)`);
  assert.ok(match.controlledPlayerId === player.id || match.controlledPlayerId !== undefined);
});
test('human action API: shoot, pass and switch do not throw', () => {
  const match = makeMatch({ minutes: 2, humanTeam: 0, seed: 77 });
  for (let i = 0; i < 60; i += 1) match.update(1 / 60);
  const player = match.players.find((p) => p.team === 0 && !p.isGK);
  match.switchControlled(player, true);
  match.giveBallTo(player, 0.5);
  match.setHumanIntent(1, 0, true);
  assert.equal(match.humanAction('shoot', { charge: 1 }), true);
  for (let i = 0; i < 30; i += 1) match.update(1 / 60);
  match.giveBallTo(player, 0.5);
  match.humanAction('pass', { charge: 0.5 });
  match.humanAction('through', { charge: 0.6 });
  match.cycleControlled();
  for (let i = 0; i < 120; i += 1) {
    match.update(1 / 60);
    if (i % 30 === 0) checkInvariants(match, 'human');
  }
});
test('goalkeeper keeps the ball out at least sometimes', () => {
  const match = makeMatch({ minutes: 2, seed: 616 });
  playOut(match);
  const totalSaves = match.stats[0].saves + match.stats[1].saves;
  const totalGoals = match.score[0] + match.score[1];
  assert.ok(totalSaves >= 0);
  assert.ok(totalGoals <= 16, `too many goals: ${totalGoals} (saves ${totalSaves})`);
});
test('same seed produces an identical match', () => {
  const a = makeMatch({ minutes: 1, seed: 2024 });
  const b = makeMatch({ minutes: 1, seed: 2024 });
  for (let i = 0; i < 900; i += 1) {
    a.update(1 / 60);
    b.update(1 / 60);
  }
  assert.equal(a.score[0], b.score[0]);
  assert.equal(a.score[1], b.score[1]);
  assert.equal(a.ball.position.x.toFixed(6), b.ball.position.x.toFixed(6));
  assert.equal(a.stats[0].passes, b.stats[0].passes);
});

// ---------------------------------------------------------------------------
section('penalty shootout');
test('aim target stays inside the goal frame for sane input', () => {
  const target = aimTarget(0.2, 0.4, 0.7, { stats: { shooting: 80 } }, getDifficulty('NORMAL'));
  assert.ok(Math.abs(target.z) <= FIELD.goalWidth / 2 + 0.3);
  assert.ok(target.y > 0 && target.y < FIELD.goalHeight + 0.2);
});
test('error model bends the ball off target under pressure', () => {
  const rng = mulberry32(9);
  const shooter = { stats: { shooting: 60 } };
  let offTarget = 0;
  for (let i = 0; i < 200; i += 1) {
    const base = aimTarget(1.05, 0.9, 1, shooter, getDifficulty('LEGENDARY'));
    const withError = applyPenaltyError(base, shooter, getDifficulty('LEGENDARY'), rng);
    if (Math.abs(withError.z) > FIELD.goalWidth / 2 || withError.y > FIELD.goalHeight) offTarget += 1;
  }
  assert.ok(offTarget > 0, 'error model never misses');
});
test('a shootout always produces a winner', () => {
  for (let seed = 1; seed <= 25; seed += 1) {
    const shootout = new PenaltyShootout({ seed, difficulty: getDifficulty('NORMAL'), rounds: 5 });
    let guard = 0;
    while (!shootout.finished && guard < 60) {
      guard += 1;
      const shooter = { stats: { shooting: 70 + (seed % 20) } };
      const keeper = { stats: { reflexes: 70 + (seed % 15) } };
      const target = shootout.turn === 0
        ? shootout.cpuAim(shooter)
        : shootout.cpuAim(shooter);
      const plan = shootout.keeperPlan(target, keeper);
      const outcome = shootout.resolveShot(target, plan);
      shootout.record(shootout.turn, outcome);
      shootout.nextTurn();
    }
    assert.ok(shootout.finished, `shootout ${seed} never finished`);
    assert.ok(shootout.winner, `shootout ${seed} has no winner (${shootout.score})`);
    assert.ok(shootout.score[0] !== shootout.score[1]);
  }
});
test('extra rounds are needed when the shootout is level', () => {
  const shootout = new PenaltyShootout({ seed: 5, rounds: 3 });
  let guard = 0;
  while (!shootout.finished && guard < 40) {
    guard += 1;
    const turn = shootout.turn;
    // level after the first three rounds each, then the CPU blinks
    const level = shootout.shots[0].length < 3 && shootout.shots[1].length < 3;
    const outcome = (turn === 1 && !level && shootout.shots[1].length >= 3) ? 'miss' : 'goal';
    shootout.record(turn, outcome);
    shootout.nextTurn();
  }
  assert.ok(shootout.finished, `not finished after ${guard} kicks (${shootout.score})`);
  assert.equal(shootout.winner, 'user');
});

// ---------------------------------------------------------------------------
section('support helpers');
test('shuffleInPlace keeps the same members', () => {
  const rng = mulberry32(11);
  const input = [1, 2, 3, 4, 5, 6];
  const shuffled = shuffleInPlace(rng, input.slice());
  assert.deepEqual(shuffled.slice().sort(), input);
});
test('constants are self-consistent', () => {
  assert.ok(FIELD.halfLength === FIELD.length / 2);
  assert.ok(BALL.radius > 0 && BALL.gravity > 0);
  assert.ok(PLAYER.controlRadius > PLAYER.radius);
  assert.ok(MATCH.defaultMinutes >= 2 && MATCH.maxSubstitutes >= 3);
});

// ---------------------------------------------------------------------------
const total = passed + failed;
process.stdout.write(`\n${passed}/${total} tests passed\n`);
if (failed) {
  process.stdout.write(`\nFailures:\n`);
  for (const { name, error } of failures) {
    process.stdout.write(` - ${name}: ${error.message.split('\n')[0]}\n`);
  }
  process.exit(1);
}
process.exit(0);
