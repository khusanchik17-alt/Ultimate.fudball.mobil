/**
 * Penalty shootout rules: rounds, sudden death, CPU aiming and the goalkeeper's
 * dive decision. The 3D presentation (ball flight, animation) lives in the
 * runner; this module is pure logic so it can be tested in Node.
 */
import { clamp, mulberry32, gaussian } from '../core/util.js';
import { FIELD } from './constants.js';

export const PENALTY_STATE = {
  READY: 'ready',
  AIMING: 'aiming',
  FLIGHT: 'flight',
  RESULT: 'result',
  FINISHED: 'finished',
};

/**
 * Turns a joystick aim + power into a concrete target inside/around the goal.
 * aimX -1..1 (left post to right post), aimY 0..1 (ground to crossbar).
 */
export function aimTarget(aimX, aimY, power, shooter, difficulty) {
  const shooting = ((shooter && shooter.stats && shooter.stats.shooting) || 70) / 99;
  const placement = clamp(aimX, -1.15, 1.15);
  const height = clamp(aimY, 0, 1.15);
  const spread = FIELD.goalWidth / 2;
  return {
    z: placement * (spread + 0.2),
    y: 0.25 + height * (FIELD.goalHeight - 0.45),
    power,
    accuracy: 0.65 + shooting * 0.4,
  };
}

/** Adds human error to an aimed penalty (CPU kicks and pressure on humans). */
export function applyPenaltyError(target, shooter, difficulty, rng) {
  const shooting = ((shooter && shooter.stats && shooter.stats.shooting) || 70) / 99;
  const powerRisk = Math.pow(clamp(target.power, 0, 1), 1.4) * 0.35;
  const nervousness = difficulty && difficulty.key === 'LEGENDARY' ? 0.35 : 0.22;
  const sigma = (1 - shooting) * 0.9 + powerRisk + nervousness * 0.35;
  const dz = gaussian(rng) * sigma * 0.9;
  const dy = gaussian(rng) * sigma * 0.5;
  return {
    ...target,
    z: target.z + dz,
    y: Math.max(0.12, target.y + dy),
  };
}

export class PenaltyShootout {
  constructor(opts = {}) {
    this.rng = mulberry32(opts.seed || 4321);
    this.difficulty = opts.difficulty || { key: 'NORMAL', gkReflex: 0.82 };
    this.rounds = opts.rounds || 5;
    this.state = PENALTY_STATE.READY;
    this.round = 1;
    this.score = [0, 0];
    this.shots = [[], []];
    this.turn = 0;             // 0 = user kicks, 1 = cpu kicks (user saves)
    this.suddenDeath = false;
    this.history = [];
    this.userTeam = opts.userTeam || 0;
  }

  get finished() {
    return this.state === PENALTY_STATE.FINISHED;
  }

  /** CPU picks an aim point: better shooters aim closer to the corner. */
  cpuAim(shooter) {
    const skill = ((shooter && shooter.stats && shooter.stats.shooting) || 70) / 99;
    const side = this.rng() < 0.5 ? -1 : 1;
    const cornerBias = 0.45 + skill * 0.5;
    const aimX = side * cornerBias * (0.6 + this.rng() * 0.6);
    const aimY = this.rng() < 0.75 ? this.rng() * 0.35 : 0.35 + this.rng() * 0.55;
    const power = clamp(0.55 + skill * 0.4 + gaussian(this.rng) * 0.12, 0.4, 1);
    const base = aimTarget(aimX, aimY, power, shooter, this.difficulty);
    return applyPenaltyError(base, shooter, this.difficulty, this.rng);
  }

  /**
   * Goalkeeper decision. Returns { dive: -1..1, height: 0..1, reach }.
   * The keeper can read the kick a little: better keepers guess better.
   */
  keeperPlan(shotTarget, keeper) {
    const reflex = (((keeper && keeper.data && keeper.data.stats && keeper.data.stats.reflexes)
      || (keeper && keeper.stats && keeper.stats.reflexes) || 70) / 99);
    const difficultySkill = this.difficulty.gkReflex || 0.8;
    const readChance = clamp(0.22 + reflex * 0.35 + difficultySkill * 0.25, 0.15, 0.85);
    const guessedRight = this.rng() < readChance;
    const side = shotTarget.z === 0 ? (this.rng() < 0.5 ? -1 : 1) : Math.sign(shotTarget.z);
    const dive = guessedRight
      ? clamp(shotTarget.z / (FIELD.goalWidth / 2), -1, 1)
      : (side * -1) * (0.4 + this.rng() * 0.6);
    const height = guessedRight ? clamp(shotTarget.y / FIELD.goalHeight, 0, 1) : this.rng();
    const reach = 0.55 + reflex * 0.5 + difficultySkill * 0.25;
    return { dive, height, reach, guessedRight };
  }

  /** Decides the outcome of a kick given where the keeper ended up. */
  resolveShot(shotTarget, keeperResult) {
    const spread = FIELD.goalWidth / 2;
    const outside = Math.abs(shotTarget.z) > spread + 0.05 || shotTarget.y > FIELD.goalHeight + 0.05;
    if (outside) {
      const nearPost = Math.abs(Math.abs(shotTarget.z) - spread) < 0.22;
      return nearPost ? 'post' : 'miss';
    }
    const keeperZ = keeperResult.dive * spread;
    const keeperY = keeperResult.height * FIELD.goalHeight;
    const dz = Math.abs(shotTarget.z - keeperZ);
    const dy = Math.abs(shotTarget.y - keeperY);
    const distance = Math.hypot(dz, dy * 0.8);
    if (distance < keeperResult.reach) return 'save';
    if (dz < keeperResult.reach * 1.35 && shotTarget.y < 1.1 && this.rng() < 0.35) return 'save';
    return 'goal';
  }

  record(team, outcome) {
    this.shots[team].push(outcome);
    if (outcome === 'goal') this.score[team] += 1;
    this.history.push({ team, outcome, round: this.round });
  }

  /** Advances the rotation; returns the next shooter index (0 = user team). */
  nextTurn() {
    const userTaken = this.shots[0].length;
    const cpuTaken = this.shots[1].length;
    if (!this.suddenDeath) {
      if (userTaken >= this.rounds && cpuTaken >= this.rounds) {
        if (this.score[0] === this.score[1]) {
          this.suddenDeath = true;
          this.round += 1;
        } else {
          this.state = PENALTY_STATE.FINISHED;
          return null;
        }
      }
    } else {
      // sudden death: both take one kick per round
      if (userTaken === cpuTaken && userTaken > this.rounds && this.score[0] !== this.score[1]) {
        this.state = PENALTY_STATE.FINISHED;
        return null;
      }
    }
    // early finish during the first five rounds
    if (!this.suddenDeath) {
      const remainingUser = Math.max(0, this.rounds - this.shots[0].length);
      const remainingCpu = Math.max(0, this.rounds - this.shots[1].length);
      if (this.score[0] > this.score[1] + remainingCpu) {
        this.state = PENALTY_STATE.FINISHED;
        return null;
      }
      if (this.score[1] > this.score[0] + remainingUser) {
        this.state = PENALTY_STATE.FINISHED;
        return null;
      }
    }
    this.turn = this.shots[0].length <= this.shots[1].length ? 0 : 1;
    this.round = Math.max(this.shots[0].length, this.shots[1].length) + 1;
    return this.turn;
  }

  get winner() {
    if (this.state !== PENALTY_STATE.FINISHED) return null;
    if (this.score[0] === this.score[1]) return null;
    return this.score[0] > this.score[1] ? 'user' : 'cpu';
  }
}
