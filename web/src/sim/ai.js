/**
 * Team AI - shape, pressing, marking, attacking runs and the on-ball decision
 * model. Utility based and difficulty scaled: the AI reads only what a human
 * could see, reacts after a reaction delay and makes mistakes.
 *
 * Structure:
 *   update()            -> mentality, assignments (presser/markers), shape, individuals
 *   attackPositioning() -> role specific runs when we have the ball
 *   defendPositioning() -> pressing, cover, zonal/man marking when they have it
 *   updateBallOwner()   -> shoot / pass / through ball / dribble / clear decision
 */
import { Vector3 } from 'three';
import { FIELD, PLAYER } from './constants.js';
import { shapedTarget } from './formations.js';
import {
  passToPlayer, passToPoint, shootAtPoint, clearBall, goalAimPoint, pressureOn,
} from './actions.js';
import { clamp, clamp01, gaussian } from '../core/util.js';

const v1 = new Vector3();
const v2 = new Vector3();
const v3 = new Vector3();
const shapeCtx = { field: FIELD, dir: 1, ballX: 0, ballZ: 0, phase: 'attack', attackScale: 1, defendScale: 1 };

const ROLE_LINE = {
  GK: 0.05, CB: 0.16, LB: 0.24, RB: 0.24, CDM: 0.36, CM: 0.46, CAM: 0.55,
  LM: 0.5, RM: 0.5, LW: 0.68, RW: 0.68, ST: 0.78,
};

export class TeamAI {
  constructor(match, team, difficulty, opts = {}) {
    this.match = match;
    this.team = team;
    this.difficulty = difficulty;
    this.manual = !!opts.manual;
    this.phase = 'attack';
    this.presserId = null;
    this.secondPresserId = null;
    this.shapeTimer = 0;
    this.mentality = 'balanced';
    this.lineHeight = 1;
    this.debug = { shoot: 0, pass: 0, through: 0, dribble: 0, clear: 0, decisions: 0 };
  }

  get players() {
    return this.match.players.filter((p) => p.team === this.team && !p.sentOff);
  }

  get opponents() {
    return this.match.players.filter((p) => p.team !== this.team && !p.sentOff);
  }

  get outfieldPlayers() {
    return this.players.filter((p) => !p.isGK);
  }

  update(dt) {
    const match = this.match;
    const owner = match.ball.owner;
    const possessionTeam = owner ? owner.team : match.lastPossessionTeam;
    const attacking = possessionTeam === this.team;
    this.phase = attacking ? 'attack' : 'defend';

    this.updateMentality(dt);

    this.shapeTimer -= dt;
    if (this.shapeTimer <= 0) {
      this.shapeTimer = 0.1;
      this.updateAssignments();
      const dir = match.dirOf(this.team);
      shapeCtx.dir = dir;
      shapeCtx.ballX = match.ball.position.x;
      shapeCtx.ballZ = match.ball.position.z;
      shapeCtx.phase = attacking ? 'attack' : 'defend';
      shapeCtx.attackScale = this.lineHeight;
      shapeCtx.defendScale = this.mentality === 'allout' ? 0.7 : 1;
      for (const player of this.players) {
        if (player.isGK) continue;
        shapedTarget(player.slot, shapeCtx, player.roleTarget);
      }
    }

    this.updateIndividual(dt, attacking);
  }

  updateMentality(dt) {
    const match = this.match;
    const diff = this.team === 0 ? match.score[0] - match.score[1] : match.score[1] - match.score[0];
    const progress = match.clockSeconds / Math.max(1, match.totalSeconds);
    let target = 'balanced';
    if (diff <= -1 && progress > 0.55) target = 'allout';
    else if (diff >= 2 && progress > 0.75) target = 'park';
    else if (diff >= 1 && progress > 0.7) target = 'hold';
    else if (diff <= -1 && progress > 0.75) target = 'allout';
    this.mentality = target;
    const wants = target === 'allout' ? 1.25 : target === 'hold' ? 1.02 : target === 'park' ? 0.86 : 1.0;
    this.lineHeight += (wants - this.lineHeight) * clamp(dt * 0.6, 0, 1);
  }

  // ------------------------------------------------------------------
  // Assignments
  // ------------------------------------------------------------------
  updateAssignments() {
    const match = this.match;
    const ball = match.ball;
    const outfield = this.outfieldPlayers;
    if (!outfield.length) return;

    const sorted = [...outfield].sort((a, b) => a.distanceToBall(ball) - b.distanceToBall(ball));
    this.presserId = sorted[0] ? sorted[0].id : null;
    this.secondPresserId = sorted[1] ? sorted[1].id : null;

    const owner = ball.owner;
    const opponents = this.opponents.filter((p) => !p.isGK);
    const used = new Set();
    if (owner && owner.team !== this.team) used.add(owner.id);

    const markers = outfield
      .filter((p) => p.id !== this.presserId && p.id !== this.secondPresserId)
      .sort((a, b) => a.slot.x - b.slot.x);

    for (const marker of markers) {
      let best = null;
      let bestScore = -Infinity;
      for (const opp of opponents) {
        if (used.has(opp.id)) continue;
        const d = marker.distanceTo(opp.pos.x, opp.pos.z);
        if (d > 34) continue;
        const threat = clamp01(1 - d / 30);
        const danger = clamp01((opp.pos.x * match.dirOf(this.team)) / FIELD.halfLength + 0.5);
        const score = threat * 1.6 + danger * 1.1 - (opp.position === 'ST' ? -0.15 : 0);
        if (score > bestScore) {
          bestScore = score;
          best = opp;
        }
      }
      marker.markTarget = best;
      if (best) used.add(best.id);
    }
    // keep a spare man: the closest unassigned player covers space
  }

  // ------------------------------------------------------------------
  // Individual behaviour
  // ------------------------------------------------------------------
  updateIndividual(dt, attacking) {
    const match = this.match;
    const ball = match.ball;
    const owner = ball.owner;
    const dir = match.dirOf(this.team);
    const attackingTeam = owner ? owner.team === this.team : false;

    for (const player of this.players) {
      if (player.isGK) {
        this.updateGoalkeeper(dt, player);
        continue;
      }
      if (this.manual && player.isUserControlled) continue;
      if (owner === player) {
        this.updateBallOwner(dt, player);
        continue;
      }

      const distanceToBall = player.distanceToBall(ball);

      // 1) meet an incoming pass
      const pending = match.pendingPass;
      if (pending && pending.from.team === this.team && !owner) {
        const toMe = pending.to === player;
        const toPoint = !pending.to && pending.point;
        if (toMe || (toPoint && distanceToBall < 14 && this.closestToPoint(pending.point) === player)) {
          const speed = Math.max(4, Math.hypot(ball.velocity.x, ball.velocity.z));
          const t = Math.min(1.6, Math.hypot(ball.position.x - player.pos.x, ball.position.z - player.pos.z) / speed);
          v1.set(ball.position.x + ball.velocity.x * t, 0, ball.position.z + ball.velocity.z * t);
          this.driveTo(player, v1, true);
          continue;
        }
      }

      if (attackingTeam) this.attackPositioning(player, dt, dir);
      else this.defendPositioning(player, dt, dir, distanceToBall);

      // 2) finish the movement: turn the role target into an intent
      const target = v3.copy(player.roleTarget);
      if (player.chasePoint) {
        target.copy(player.chasePoint);
        player.chasePoint = null;
      }
      this.driveTo(player, target, false);
    }
  }

  closestToPoint(point) {
    let best = null;
    let bestD = Infinity;
    for (const p of this.players) {
      if (p.isGK) continue;
      const d = p.distanceTo(point.x, point.z);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best;
  }

  /** Move towards a target; sprints when the distance is big or urgency high. */
  driveTo(player, target, urgent) {
    const dx = target.x - player.pos.x;
    const dz = target.z - player.pos.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.3) {
      player.setIntent(0, 0, false, 0.4);
      return;
    }
    const sprint = (urgent || d > 14) && player.stamina > 18;
    const urgency = clamp(d / 7, 0.45, 1.15);
    player.setIntent(dx / d, dz / d, sprint, urgency);
  }

  /** Attacking shape: push up, spread out, stay on the last defender's shoulder. */
  attackPositioning(player, dt, dir) {
    const match = this.match;
    const ball = match.ball;
    const ballX = ball.position.x;
    const role = player.slot.role;
    const target = player.roleTarget;
    const line = this.opponentDefensiveLineX();
    const halfWidth = FIELD.halfWidth;
    const ballProgress = ballX * dir;              // metres the ball has advanced
    const inPossession = ball.owner && ball.owner.team === this.team;

    if (role === 'ST') {
      // shoulder of the last defender, never deeper than 6m behind the ball
      const shoulder = clamp(line - dir * 1.2, -FIELD.halfLength + 2, FIELD.halfLength - 2);
      target.x = clamp(shoulder, Math.min(ballX + dir * 3, FIELD.halfLength - 2), FIELD.halfLength - 2);
      if (dir < 0) target.x = clamp(shoulder, -FIELD.halfLength + 2, Math.max(ballX + dir * 3, -FIELD.halfLength + 2));
      target.z += (target.z > 0 ? 1 : -1) * 1.5;    // drift across the box
      // make a run in behind when the carrier has space
      if (inPossession && ball.owner && pressureOn(match, ball.owner) < 0.9 && ballProgress > -10 && match.rng() < dt * 0.8) {
        target.x = clamp(line + dir * 7, -FIELD.halfLength + 2, FIELD.halfLength - 2);
      }
    } else if (role === 'LW' || role === 'RW' || role === 'LM' || role === 'RM') {
      const sideSign = Math.sign(player.slot.z) || 1;
      target.z = sideSign * (halfWidth - 5.5) * (inPossession ? 1 : 0.75);
      const base = ballProgress > 10 ? ballX + dir * 6 : ballX - dir * 4;
      target.x = clamp(Math.max(base, Math.min(line - dir * 2, line)), -FIELD.halfLength + 4, FIELD.halfLength - 4);
      if (dir < 0) target.x = clamp(Math.min(base, Math.max(line + dir * 2, line)), -FIELD.halfLength + 4, FIELD.halfLength - 4);
      // winger runs beyond the full back
      if (inPossession && match.rng() < dt * 0.5 && ballProgress > 0) {
        target.x = clamp(line + dir * 5, -FIELD.halfLength + 4, FIELD.halfLength - 4);
      }
    } else if (role === 'CAM') {
      target.x = ballX + dir * 6;
      target.z *= 0.6;
    } else if (role === 'CM') {
      target.x = ballX - dir * 9;
      target.z *= 0.85;
    } else if (role === 'CDM') {
      target.x = ballX - dir * 15;
      target.z *= 0.7;
    } else {
      // full backs / centre backs support from behind
      const support = role === 'LB' || role === 'RB' ? 17 : 21;
      target.x = ballX - dir * support;
      if ((role === 'LB' || role === 'RB') && inPossession && match.rng() < dt * 0.35 && ballProgress > 5) {
        target.x = ballX - dir * 6;      // overlap
      }
    }

    // give attackers separation
    target.addScaledVector(this.separation(player), 1);
    target.x = clamp(target.x, -FIELD.halfLength + 1.5, FIELD.halfLength - 1.5);
    target.z = clamp(target.z, -halfWidth + 1.5, halfWidth - 1.5);
  }

  /** Defensive shape: press, cover and mark, without collapsing into a blob. */
  defendPositioning(player, dt, dir, distanceToBall) {
    const match = this.match;
    const ball = match.ball;
    const owner = ball.owner;
    const target = player.roleTarget;
    const isPresser = player.id === this.presserId;
    const isCover = player.id === this.secondPresserId;

    if (isPresser) {
      player.pressTarget = true;
      target.set(ball.position.x, 0, ball.position.z);
      if (owner) {
        v2.set(owner.vel.x, 0, owner.vel.z);
        if (v2.lengthSq() > 0.01) target.addScaledVector(v2.normalize(), 1.2);
        target.x -= dir * 0.3;
      }
      // challenge when in range
      player.tackleCooldown = Math.max(0, (player.tackleCooldown || 0) - dt);
      if (owner && distanceToBall < PLAYER.tackleRadius + 0.3 && player.tackleCooldown <= 0
          && !player.action && player.stamina > 16) {
        const sliding = distanceToBall > 1.05 && match.rng() < 0.3 * this.difficulty.aggression;
        player.startAction(sliding ? 'slide' : 'tackle', {});
        player.tackleCooldown = clamp(1.1 + match.rng() * 1.6 - this.difficulty.tackleSkill * 0.3, 0.7, 3.0);
      }
    } else if (isCover) {
      player.pressTarget = false;
      // screen the space between the ball and our goal
      const goalX = -dir * FIELD.halfLength;
      target.set(
        ball.position.x + (goalX - ball.position.x) * 0.22,
        0,
        ball.position.z * 0.55 + player.roleTarget.z * 0.45,
      );
    } else {
      player.pressTarget = false;
      if (player.markTarget) {
        const opp = player.markTarget;
        v2.set(opp.pos.x - dir * 1.4, 0, opp.pos.z);
        target.lerp(v2, 0.72);
      }
      // hold a compact block: never ahead of the ball, never too deep
      const blockX = ball.position.x - dir * 3;
      if (dir > 0) target.x = Math.min(target.x, blockX);
      else target.x = Math.max(target.x, blockX);
      const minSupport = ball.position.x - dir * 32;
      if (dir > 0) target.x = Math.max(target.x, minSupport);
      else target.x = Math.min(target.x, minSupport);

      // opportunistic challenge if an opponent carries the ball right past us
      if (owner && owner.team !== this.team && distanceToBall < PLAYER.tackleRadius + 0.2 && !player.action) {
        player.tackleCooldown = Math.max(0, (player.tackleCooldown || 0) - dt);
        if (player.tackleCooldown <= 0 && match.rng() < dt * 2.5) {
          player.startAction('tackle', {});
          player.tackleCooldown = 1.5 + match.rng() * 1.5;
        }
      }
    }

    target.addScaledVector(this.separation(player), 1);
    target.x = clamp(target.x, -FIELD.halfLength + 1.5, FIELD.halfLength - 1.5);
    target.z = clamp(target.z, -FIELD.halfWidth + 1.5, FIELD.halfWidth - 1.5);
  }

  separation(player) {
    v2.set(0, 0, 0);
    let count = 0;
    for (const mate of this.players) {
      if (mate === player) continue;
      const dx = player.pos.x - mate.pos.x;
      const dz = player.pos.z - mate.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.001 && d < 5.5) {
        const push = (5.5 - d) / 5.5;
        v2.x += (dx / d) * push * 2.4;
        v2.z += (dz / d) * push * 2.4;
        count += 1;
      }
    }
    if (count === 0) return v2.set(0, 0, 0);
    return v2.clampLength(0, 3.2);
  }

  defensiveLineX() {
    const dir = this.match.dirOf(this.team);
    let line = dir > 0 ? FIELD.halfLength : -FIELD.halfLength;
    for (const p of this.outfieldPlayers) {
      if (dir > 0 ? p.pos.x < line : p.pos.x > line) line = p.pos.x;
    }
    return line;
  }

  /** X of the opponent's second last defender (the offside line). */
  opponentDefensiveLineX() {
    const opp = this.opponents.filter((p) => !p.isGK);
    const dir = this.match.dirOf(this.team);
    if (!opp.length) return dir * FIELD.halfLength * 0.5;
    const xs = opp.map((p) => p.pos.x).sort((a, b) => (dir > 0 ? b - a : a - b));
    return xs[Math.min(1, xs.length - 1)];
  }

  // ------------------------------------------------------------------
  // On-ball decisions
  // ------------------------------------------------------------------
  updateBallOwner(dt, player) {
    const match = this.match;
    const dir = match.dirOf(this.team);
    player.decisionTimer = (player.decisionTimer || 0) - dt;

    const pressure = pressureOn(match, player);
    const goalX = dir * FIELD.halfLength;
    const distToGoal = Math.hypot(goalX - player.pos.x, player.pos.z);

    // under heavy pressure we must release the ball quickly
    const urgent = pressure > 1.5;
    if (player.decisionTimer > 0 && !urgent) {
      this.carryBall(player, dir);
      return;
    }
    player.decisionTimer = this.difficulty.decisionInterval * (0.7 + match.rng() * 0.6);

    const shootScore = this.scoreShotOpportunity(player, distToGoal, pressure);
    const passes = this.evaluatePasses(player);
    const bestPass = passes[0] || null;
    const dribbleScore = this.scoreDribble(player, dir, pressure);
    const inOwnThird = (player.pos.x * dir) < -FIELD.halfLength + 30;
    const clearScore = inOwnThird && pressure > 1.1 ? 0.5 + pressure * 0.15 : 0;

    const passScore = bestPass ? bestPass.score * (urgent ? 1.35 : 1) : 0;
    const dribbleAdj = dribbleScore * (urgent ? 0.55 : 1);

    const best = Math.max(shootScore, passScore, dribbleAdj, clearScore);
    this.debug.decisions += 1;

    if (best === shootScore && shootScore > 0.40 && betters(shootScore, passScore)) {
      this.debug.shoot += 1;
      const kind = this.pickShotKind(player, distToGoal, pressure);
      const aimPoint = goalAimPoint(match, player, kind === 'finesse' ? 0.85 : 0.7);
      aimPoint.z = clamp(aimPoint.z * (0.6 + player.shootStat / 200), -FIELD.goalWidth / 2 + 0.4, FIELD.goalWidth / 2 - 0.4);
      shootAtPoint(match, player, aimPoint, kind, 0.4 + clamp(distToGoal / 30, 0, 0.55));
      return;
    }
    if (best === passScore && bestPass) {
      if (bestPass.kind === 'through' && bestPass.point) {
        this.debug.through += 1;
        passToPoint(match, player, bestPass.point, 'through', 0.6);
      } else {
        this.debug.pass += 1;
        passToPlayer(match, player, bestPass.player, bestPass.kind, 0.5);
      }
      return;
    }
    if (best === clearScore && clearScore > 0.45) {
      this.debug.clear += 1;
      clearBall(match, player);
      return;
    }
    // long-range effort: space in front, decent shooting, no pass on
    if (distToGoal < 32 && pressure < 0.75 && player.shootStat > 66 && passScore < 0.8
        && match.rng() < (this.difficulty.shootRange > 24 ? 0.20 : 0.10)) {
      this.debug.shoot += 1;
      const aim = goalAimPoint(match, player, 0.5);
      shootAtPoint(match, player, aim, 'shoot', 0.85);
      return;
    }
    this.debug.dribble += 1;
    this.carryBall(player, dir);
  }

  pickShotKind(player, distance, pressure) {
    if (distance > 26) return pressure > 0.9 ? 'chip' : 'shoot';
    if (player.shootStat > 76 && pressure > 0.5 && distance < 22) return 'finesse';
    if (distance < 13 && pressure > 0.8) return 'finesse';
    return 'shoot';
  }

  scoreShotOpportunity(player, distance, pressure) {
    const range = this.difficulty.shootRange;
    if (distance > range + 9) return 0;
    const angleFactor = clamp01(1 - Math.abs(player.pos.z) / (FIELD.width * 0.5));
    const quality = player.shootStat / 99;
    const distanceFactor = clamp01(1.3 - Math.pow(distance / range, 1.35));
    const pressureFactor = clamp01(1.15 - pressure * 0.35);
    const centralBonus = player.pos.z > -12 && player.pos.z < 12 ? 0.12 : 0;
    const closeRange = distance < 16 ? 0.3 : 0;
    const score = quality * 0.8 + angleFactor * 0.5 + distanceFactor * 1.25 + pressureFactor * 0.28
      + centralBonus + closeRange - 0.62 + this.difficulty.xgBonus;
    return clamp(score, 0, 2.2);
  }

  scoreDribble(player, dir, pressure) {
    const quality = player.dribbleStat / 99;
    // space in front of the carrier (cone towards the goal)
    let blocked = 0;
    for (const opp of this.opponents) {
      const dx = (opp.pos.x - player.pos.x) * dir;
      const dz = opp.pos.z - player.pos.z;
      if (dx > -1 && dx < 11 && Math.abs(dz) < 5) {
        blocked += clamp01(1 - Math.max(0, dx) / 11) * (1 - Math.abs(dz) / 5 * 0.4);
      }
    }
    const space = clamp01(1.3 - blocked * 0.5);
    const stamina = clamp01(player.stamina / 70);
    const score = quality * 0.78 + space * 0.8 - pressure * 0.5 - 0.34 + stamina * 0.1;
    return clamp(score, 0, 1.9);
  }

  /**
   * Evaluates every pass option, including through balls into space.
   * Returns sorted [{ player, point, score, kind, distance, risk }]
   */
  evaluatePasses(player) {
    const match = this.match;
    const ball = match.ball;
    const dir = match.dirOf(this.team);
    const options = [];
    const opponents = this.opponents;
    const press = this.difficulty.pressIntensity;

    for (const mate of this.players) {
      if (mate === player) continue;
      const dx = mate.pos.x - player.pos.x;
      const dz = mate.pos.z - player.pos.z;
      const distance = Math.hypot(dx, dz);
      const ownHalf = (player.pos.x * dir) < 0;
      if (distance < 3 || distance > 55) continue;
      if (mate.isGK && !ownHalf) continue;
      if (mate.isGK && distance > 30) continue;

      const nx = dx / distance;
      const nz = dz / distance;
      const forward = clamp((dx * dir) / Math.max(1, distance), -1, 1);

      // risk: opponents near the pass lane
      let risk = 0;
      for (const opp of opponents) {
        const ox = opp.pos.x - ball.position.x;
        const oz = opp.pos.z - ball.position.z;
        const proj = ox * nx + oz * nz;
        if (proj < 0.3 || proj > distance) continue;
        const perp = Math.abs(ox * nz - oz * nx);
        if (perp < 3.0) {
          const closeness = clamp01(1 - perp / 3.0);
          const near = clamp01(1 - proj / distance);
          risk += closeness * (0.9 - near * 0.3) * (1 + press * 0.3);
        }
      }

      const receiverPressure = pressureOn(match, mate);
      const openness = clamp01(1 - risk * 0.42) * clamp01(1.2 - receiverPressure * 0.28);
      const advance = clamp(forward, -0.7, 1) * 1.0;
      const lengthPenalty = distance > 34 ? (distance - 34) * 0.028 : 0;
      const backwardPenalty = forward < -0.35 && (player.pos.x * dir) > -10 ? 0.45 : 0;
      const skill = player.passStat / 99;

      const score = openness * 1.25 + advance * 1.05 - risk * 0.5 * (1.25 - skill)
        - lengthPenalty - backwardPenalty + skill * 0.35 - 0.02;
      if (score > 0.05) {
        options.push({ player: mate, score, distance, risk, kind: distance > 36 ? 'lob' : 'pass', point: null });
      }

      // through ball into the space behind the line
      if (forward > 0.45 && distance > 12 && !mate.isGK) {
        const line = this.opponentDefensiveLineX();
        const mine = (mate.pos.x - line) * dir;
        const speed = Math.hypot(mate.vel.x, mate.vel.z);
        const wantsIt = mine > -14 && mine < 4 && (speed > 2.5 || mate.slot.role === 'ST' || mate.slot.role === 'LW' || mate.slot.role === 'RW');
        if (wantsIt) {
          const spaceX = clamp(line + dir * 9, -FIELD.halfLength + 3, FIELD.halfLength - 3);
          const spaceZ = clamp(mate.pos.z * 1.05 + mate.vel.z * 0.6, -FIELD.halfWidth + 4, FIELD.halfWidth - 4);
          const throughDistance = Math.hypot(spaceX - ball.position.x, spaceZ - ball.position.z);
          if (throughDistance < 45) {
            let throughRisk = 0;
            for (const opp of opponents) {
              const ox = opp.pos.x - ball.position.x;
              const oz = opp.pos.z - ball.position.z;
              const nlen = Math.hypot(spaceX - ball.position.x, spaceZ - ball.position.z) || 1;
              const tnx = (spaceX - ball.position.x) / nlen;
              const tnz = (spaceZ - ball.position.z) / nlen;
              const proj = ox * tnx + oz * tnz;
              if (proj < 0.3 || proj > throughDistance) continue;
              const perp = Math.abs(ox * tnz - oz * tnx);
              if (perp < 4) throughRisk += clamp01(1 - perp / 4) * 0.7;
            }
            const throughScore = openness * 0.7 + advance * 1.5 + clamp01(speed / 6) * 0.55
              - throughRisk * 0.5 + skill * 0.3 - 0.55 + (this.difficulty.supportRuns - 0.6) * 0.3;
            if (throughScore > 0.05) {
              options.push({
                player: mate,
                score: throughScore,
                distance: throughDistance,
                risk: throughRisk,
                kind: 'through',
                point: new Vector3(spaceX, 0, spaceZ),
              });
            }
          }
        }
      }
    }

    // Avoid two nearly identical options: keep the best per receiver.
    options.sort((a, b) => b.score - a.score);
    const seen = new Set();
    const unique = [];
    for (const option of options) {
      const key = option.player.id + option.kind;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(option);
      if (unique.length >= 5) break;
    }
    return unique;
  }

  /** Dribbling: drive at goal, only swerving away from real danger. */
  carryBall(player, dir) {
    const match = this.match;
    const goalX = dir * FIELD.halfLength;
    let dirX = goalX - player.pos.x;
    let dirZ = -player.pos.z * 0.5;
    for (const opp of this.opponents) {
      const dx = opp.pos.x - player.pos.x;
      const dz = opp.pos.z - player.pos.z;
      const d = Math.hypot(dx, dz);
      if (d < 5 && d > 0.01) {
        const avoid = (5 - d) / 5;
        // only avoid opponents that are actually in front of us
        if (dx * dir > -1.5) {
          dirX -= (dx / d) * avoid * 2.4;
          dirZ -= (dz / d) * avoid * 3.2;
        }
      }
    }
    const len = Math.hypot(dirX, dirZ) || 1;
    dirX /= len;
    dirZ /= len;
    if (match.rng() < 0.015) {
      const jitter = gaussian(match.rng) * 0.3;
      const cos = Math.cos(jitter);
      const sin = Math.sin(jitter);
      const nx = dirX * cos - dirZ * sin;
      const nz = dirX * sin + dirZ * cos;
      dirX = nx;
      dirZ = nz;
    }
    const pressure = pressureOn(match, player);
    player.setIntent(dirX, dirZ, player.stamina > 30 && pressure < 0.9, 1);
  }

  // ------------------------------------------------------------------
  // Goalkeeper
  // ------------------------------------------------------------------
  updateGoalkeeper(dt, gk) {
    const match = this.match;
    const ball = match.ball;
    const dir = match.dirOf(this.team);
    const goalX = -dir * FIELD.halfLength;
    gk.decisionTimer = (gk.decisionTimer || 0) - dt;

    const incoming = this.ballHeadingToGoal(ball, dir);
    if (incoming) {
      const target = this.predictSavePoint(ball, goalX);
      if (target && !gk.action) {
        const dz = clamp(target.z - gk.pos.z, -1, 1);
        gk.setIntent(dz * 0.95, 0.18, true, 1);
      }
      if (gk.distanceToBall(ball) < PLAYER.gkReach + 1.15) {
        match.tryGoalkeeperSave(gk, this.difficulty);
      }
      return;
    }
    if (ball.owner === gk) {
      if (gk.decisionTimer <= 0) {
        gk.decisionTimer = 0.55;
        const options = this.evaluatePasses(gk);
        const short = options.find((o) => o.distance < 32 && o.risk < 1.1);
        if (short && match.rng() < 0.7) {
          passToPlayer(match, gk, short.player, 'pass', 0.4);
        } else {
          v1.set(dir, 0, (match.rng() - 0.5) * 1.4).normalize();
          gk.startAction('pass', {});
          ball.kick(v1, 27 + match.rng() * 8, { lift: 0.6, spinTop: 0.4, kind: 'clear', player: gk });
          ball.controlLock.set(gk.id, 0.6);
        }
      }
      // hold position near the line while holding the ball
      const dx = (goalX + dir * 6) - gk.pos.x;
      const dz = -gk.pos.z * 0.4;
      const d = Math.hypot(dx, dz);
      if (d > 1.2) gk.setIntent(dx / d, dz / d, false, 0.6);
      else gk.setIntent(0, 0, false, 0.3);
      return;
    }

    // Positioning on the ball-goal bisector + sweeping
    const ballDistance = Math.hypot(ball.position.x - goalX, ball.position.z);
    const cover = clamp(1.2 + ballDistance * 0.13, 1.2, 13);
    const nx = (ball.position.x - goalX) || 0;
    const nz = ball.position.z;
    const nlen = Math.hypot(nx, nz) || 1;
    let tx = goalX + (nx / nlen) * cover;
    let tz = clamp((nz / nlen) * cover * 0.55, -FIELD.goalWidth * 0.7, FIELD.goalWidth * 0.7);
    tx = clamp(tx, -FIELD.halfLength + 0.5, FIELD.halfLength - 0.5);

    if (!ball.owner && ballDistance < 24) {
      const bx = ball.position.x;
      if ((bx - goalX) * dir < 0) tx = clamp(bx + dir * 1.4, -FIELD.halfLength + 0.5, FIELD.halfLength - 0.5);
      // rush out for a through ball into the box
      if (ballDistance < 14 && Math.hypot(ball.velocity.x, ball.velocity.z) < 9) {
        tx = clamp(bx, -FIELD.halfLength + 0.5, FIELD.halfLength - 0.5);
        tz = clamp(ball.position.z * 0.8, -12, 12);
      }
    }

    const dx = tx - gk.pos.x;
    const dz = tz - gk.pos.z;
    const d = Math.hypot(dx, dz);
    if (d > 0.4) gk.setIntent(dx / d, dz / d, d > 3.5, clamp(d / 4, 0.45, 1.1));
    else gk.setIntent(0, 0, false, 0.4);
  }

  ballHeadingToGoal(ball, dir) {
    const goalX = -dir * FIELD.halfLength;
    const vx = ball.velocity.x;
    const toward = dir > 0 ? vx < -4.5 : vx > 4.5;
    if (!toward) return false;
    const distance = Math.abs(ball.position.x - goalX);
    if (distance > 34) return false;
    const travel = distance / Math.abs(vx || 1);
    const zAtGoal = ball.position.z + ball.velocity.z * travel;
    return Math.abs(zAtGoal) < FIELD.goalWidth * 1.4;
  }

  predictSavePoint(ball, goalX) {
    const vx = ball.velocity.x;
    if (Math.abs(vx) < 1) return null;
    const t = (goalX - ball.position.x) / vx;
    if (t < 0 || t > 2.2) return null;
    const z = ball.position.z + ball.velocity.z * t;
    const y = ball.position.y + ball.velocity.y * t - 0.5 * 14.5 * t * t;
    return { x: goalX, z, y };
  }
}

function betters(a, b) {
  return a >= b - 1e-6;
}
