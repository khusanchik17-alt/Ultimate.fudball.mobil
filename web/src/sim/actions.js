/**
 * Ball striking: passes, through balls, lobs, shots, finesse/chip finishes,
 * clearances, crosses and set-piece delivery.
 *
 * Accuracy is derived from the player's attributes, the amount of pressure they
 * are under and the difficulty scaling, so better players genuinely place
 * better balls.
 */
import { Vector3 } from 'three';
import { BALL, FIELD } from './constants.js';
import { clamp, gaussian, len2, wrapAngle } from '../core/util.js';

const dir = new Vector3();
const aim = new Vector3();
const tmp = new Vector3();

export const KICK_KINDS = {
  pass: { min: 6, max: 20, lift: 0.03, spinTop: -0.35, sound: 'pass' },
  through: { min: 8, max: 24, lift: 0.02, spinTop: -0.15, sound: 'pass' },
  lob: { min: 9, max: 26, lift: 0.55, spinTop: 0.5, sound: 'pass' },
  cross: { min: 12, max: 26, lift: 0.45, spinTop: 0.4, sound: 'pass' },
  shoot: { min: 14, max: 34, lift: 0.14, spinTop: -0.25, sound: 'kick' },
  finesse: { min: 12, max: 27, lift: 0.30, spinTop: -0.2, spinSide: 0.55, sound: 'kick' },
  chip: { min: 10, max: 22, lift: 0.85, spinTop: 0.7, sound: 'kick' },
  clear: { min: 16, max: 32, lift: 0.5, spinTop: 0.3, sound: 'kick' },
  dive: { min: 8, max: 20, lift: 0.35, spinTop: 0.2, sound: 'save' },
  throw: { min: 6, max: 14, lift: 0.25, spinTop: 0.4, sound: 'pass' },
};

function pressureOn(match, player) {
  let pressure = 0;
  for (const other of match.players) {
    if (other.team === player.team) continue;
    const d = other.distanceTo(player.pos.x, player.pos.z);
    if (d < 6) pressure += (6 - d) / 6;
  }
  return clamp(pressure, 0, 2.2);
}

/** Adds human-level error to a kick direction. */
function applyError(match, player, dirVec, params, kind, skill) {
  const spec = KICK_KINDS[kind] || KICK_KINDS.pass;
  const pressure = pressureOn(match, player);
  const baseError = kind === 'shoot' || kind === 'finesse' || kind === 'chip'
    ? params.shotError
    : params.passError;
  // a good attribute reduces error; distance and pressure increase it
  const skillFactor = clamp(1.35 - skill / 110, 0.28, 1.15);
  const distance = Math.max(6, params.distance || 14);
  const distanceFactor = clamp(0.75 + distance / 55, 0.75, 1.5);
  const pressureFactor = 1 + pressure * 0.24;
  const sigma = baseError * skillFactor * distanceFactor * pressureFactor;
  const angleError = gaussian(match.rng) * sigma * 0.40;
  const liftError = gaussian(match.rng) * sigma * 0.30;

  // rotate the horizontal direction by the angle error
  const cos = Math.cos(angleError);
  const sin = Math.sin(angleError);
  const nx = dirVec.x * cos - dirVec.z * sin;
  const nz = dirVec.x * sin + dirVec.z * cos;
  dirVec.set(nx, 0, nz).normalize();
  const lift = clamp((spec.lift + liftError), -0.25, 1.6);
  return { lift, sigma };
}

/**
 * Central kick routine.
 * @param {import('./match.js').MatchSim} match
 * @param {import('./player.js').MatchPlayer} player
 * @param {Vector3} direction  normalised XZ direction
 * @param {number} power       m/s
 * @param {string} kind
 * @param {object} [extra]     { params, aimPoint, spinSide, noError }
 */
export function strikeBall(match, player, direction, power, kind, extra = {}) {
  const params = extra.params || match.difficultyFor(player.team);
  const skill = kind === 'shoot' || kind === 'finesse' || kind === 'chip'
    ? player.shootStat
    : player.passStat;

  const dirVec = dir.copy(direction);
  dirVec.y = 0;
  if (dirVec.lengthSq() < 1e-6) dirVec.set(player.dir, 0, 0);
  dirVec.normalize();

  const distance = extra.distance || 14;
  const error = extra.noError
    ? { lift: KICK_KINDS[kind]?.lift ?? 0.15 }
    : applyError(match, player, dirVec, { ...params, distance }, kind, skill);

  const powerError = extra.noError ? 0 : gaussian(match.rng) * params.passError * power * 0.35;
  const finalPower = clamp(power + powerError, 3, BALL.maxSpeed);

  const spec = KICK_KINDS[kind] || KICK_KINDS.pass;
  const spinSide = (extra.spinSide !== undefined ? extra.spinSide : (spec.spinSide || 0)) * (dirVec.x >= 0 ? 1 : 1);

  match.ball.kick(dirVec, finalPower, {
    lift: error.lift,
    spinSide,
    spinTop: spec.spinTop,
    kind,
    player,
  });

  player.stats.touches += 1;
  match.ball.controlLock.set(player.id, kind === 'shoot' ? 0.95 : 0.62);
  match.events.emit('ball:kick', { player, kind, power: finalPower, position: match.ball.position.clone() });
  return { power: finalPower, direction: dirVec.clone(), kind };
}

/** Lead a moving receiver so the pass arrives in their stride. */
export function leadTarget(receiver, passSpeed, ballPos) {
  const distance = Math.hypot(receiver.pos.x - ballPos.x, receiver.pos.z - ballPos.z);
  const travel = distance / Math.max(6, passSpeed);
  const lead = Math.min(travel, 1.1);
  aim.set(
    receiver.pos.x + receiver.vel.x * lead * 0.85,
    0,
    receiver.pos.z + receiver.vel.z * lead * 0.85,
  );
  return aim;
}

export function passToPlayer(match, player, receiver, kind = 'pass', charge = 0.5) {
  const ballPos = match.ball.position;
  const target = leadTarget(receiver, 16, ballPos);
  const dx = target.x - ballPos.x;
  const dz = target.z - ballPos.z;
  const distance = Math.hypot(dx, dz);
  const spec = KICK_KINDS[kind] || KICK_KINDS.pass;
  const power = clamp(
    distance * (kind === 'through' ? 1.35 : 1.15) + 5 + charge * 6,
    spec.min,
    spec.max,
  );
  dir.set(dx, 0, dz).normalize();
  strikeBall(match, player, dir, power, kind, { distance });
  player.stats.passes += 1;
  match.stats[player.team].passes += 1;
  match.pendingPass = {
    from: player,
    to: receiver,
    kind,
    time: match.simTime,
    startX: player.pos.x,
    completed: false,
  };
  return true;
}

/** Pass into open space (through balls, switches, wing switches). */
export function passToPoint(match, player, point, kind = 'through', charge = 0.6) {
  const ballPos = match.ball.position;
  const dx = point.x - ballPos.x;
  const dz = point.z - ballPos.z;
  const distance = Math.hypot(dx, dz);
  const spec = KICK_KINDS[kind] || KICK_KINDS.pass;
  const power = clamp(distance * 1.25 + 6 + charge * 5, spec.min, spec.max);
  dir.set(dx, 0, dz).normalize();
  strikeBall(match, player, dir, power, kind, { distance });
  player.stats.passes += 1;
  match.stats[player.team].passes += 1;
  match.passOutcomes.created += 1;
  match.pendingPass = {
    from: player,
    to: null,
    point: point.clone(),
    kind,
    time: match.simTime,
    startX: player.pos.x,
    completed: false,
  };
  return true;
}

/** Aim a shot at a point (already chosen inside the goal mouth). */
export function shootAtPoint(match, player, point, kind = 'shoot', charge = 0.6, opts = {}) {
  const ballPos = match.ball.position;
  const dx = point.x - ballPos.x;
  const dz = point.z - ballPos.z;
  const distance = Math.hypot(dx, dz);
  const spec = KICK_KINDS[kind] || KICK_KINDS.shoot;
  const powerBase = clamp(
    spec.min + (spec.max - spec.min) * clamp(charge, 0, 1),
    spec.min,
    spec.max,
  );
  const distanceFactor = clamp(distance / 20, 0.85, 1.35);
  const power = clamp(powerBase * distanceFactor, spec.min, spec.max + 4);
  dir.set(dx, 0, dz).normalize();
  strikeBall(match, player, dir, power, kind, {
    distance,
    spinSide: kind === 'finesse' ? (opts.spinSide !== undefined ? opts.spinSide : 0.5) : 0,
    params: opts.params,
  });
  player.stats.shots += 1;
  match.stats[player.team].shots += 1;
  match.pendingShot = { player, time: match.simTime };
  match.events.emit('shot', { player, kind, power });
  return true;
}

/** Choose a goal-mouth target. Accuracy/noise handled by strikeBall. */
export function goalAimPoint(match, player, spread = 0.75) {
  const side = player.dir;
  const gx = side * FIELD.halfLength;
  const half = FIELD.goalWidth / 2;
  // corners are more valuable but riskier; the taker aims near a post
  const z = (match.rng() - 0.5) * 2 * half * spread;
  const y = clamp(0.35 + match.rng() * 1.5, 0.3, FIELD.goalHeight - 0.25);
  return new Vector3(gx, y, z);
}

export function clearBall(match, player, opts = {}) {
  const side = player.dir;
  const targetX = side * FIELD.halfLength;
  const dx = targetX - player.pos.x;
  const dz = -player.pos.z * 1.2 + (match.rng() - 0.5) * 12;
  dir.set(dx, 0, dz).normalize();
  const distance = Math.hypot(player.pos.x - targetX, player.pos.z);
  strikeBall(match, player, dir, clamp(distance * 0.85 + 14, 16, 32), 'clear', { distance });
  return true;
}

export function throwIn(match, player, targetPoint) {
  const ballPos = match.ball.position;
  const dx = targetPoint.x - ballPos.x;
  const dz = targetPoint.z - ballPos.z;
  const distance = Math.hypot(dx, dz);
  dir.set(dx, 0, dz).normalize();
  strikeBall(match, player, dir, clamp(distance * 1.05 + 4, 6, 15), 'throw', { distance });
  return true;
}

/** Small nudge used for dribble touches and deflections. */
export function nudgeBall(match, player, direction, power) {
  const dirVec = tmp.copy(direction);
  dirVec.y = 0;
  if (dirVec.lengthSq() < 1e-6) return;
  dirVec.normalize();
  match.ball.kick(dirVec, power, { lift: 0.02, spinTop: -0.2, kind: 'dribble', player });
  player.stats.touches += 1;
}

/** Goalkeeper save attempt (catch, parry or tip over). */
export function goalkeeperSave(match, gk, ballTrajectory, difficulty) {
  const reflexes = (gk.data.stats.reflexes || 60) / 99;
  const skill = clamp(reflexes * 0.6 + (difficulty.gkReflex || 0.8) * 0.5, 0.1, 1.25);
  const distanceToBall = gk.distanceToBall(match.ball);
  const reachFactor = clamp(1.15 - distanceToBall / 3.8, 0, 1);
  const chance = clamp(skill * reachFactor * 0.94, 0, 0.945);
  const roll = match.rng();
  if (roll < chance) {
    // caught or parried
    const catchRoll = match.rng();
    gk.stats.saves += 1;
    match.stats[gk.team].saves += 1;
    if (catchRoll < 0.55 + reflexes * 0.2) {
      match.ball.velocity.set(0, 0, 0);
      match.ball.controlLock.clear();
      match.ball.position.set(gk.pos.x + Math.sin(gk.facing) * 0.4, BALL.radius, gk.pos.z + Math.cos(gk.facing) * 0.4);
      match.events.emit('save', { player: gk, type: 'catch' });
      match.giveBallTo(gk, 0.1);
      return 'catch';
    }
    // parry: push the ball away from goal
    const away = tmp.set(
      (match.rng() - 0.5) * 1.5 - Math.sign(gk.pos.x) * 0.6,
      0.35,
      (match.rng() - 0.5) * 1.6,
    ).normalize();
    match.ball.velocity.copy(away).multiplyScalar(11 + match.rng() * 6);
    match.ball.position.y = Math.max(BALL.radius, match.ball.position.y);
    match.events.emit('save', { player: gk, type: 'parry' });
    return 'parry';
  }
  return null;
}

export { pressureOn };
