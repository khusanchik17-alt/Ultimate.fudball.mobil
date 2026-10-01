/**
 * MatchPlayer: an on-pitch entity. Movement, stamina, ball control and the
 * action state machine live here. Decisions (AI or human input) only write
 * `intent`; this class turns intent into motion and touches on the ball.
 */
import { Vector3 } from 'three';
import { BALL, FIELD, PLAYER } from './constants.js';
import { clamp, wrapAngle, angleDelta, damp, len2 } from '../core/util.js';

const tmp = new Vector3();

let nextId = 1;

export class MatchPlayer {
  /**
   * @param {object} cfg
   * @param {object} cfg.data        player database entry (stats, name, position)
   * @param {number} cfg.team        0 = home, 1 = away
   * @param {number} cfg.dir         +1 attacks +X, -1 attacks -X
   * @param {object} cfg.slot        formation slot {role,x,z}
   * @param {number} cfg.slotIndex
   * @param {boolean} [cfg.isGK]
   */
  constructor(cfg) {
    this.id = `mp${nextId++}`;
    this.data = cfg.data;
    this.name = cfg.data.name;
    this.position = cfg.data.position;
    this.team = cfg.team;
    this.dir = cfg.dir;
    this.slot = cfg.slot;
    this.slotIndex = cfg.slotIndex;
    this.isGK = !!cfg.isGK;
    this.number = cfg.number || (cfg.slotIndex + 1);

    this.pos = new Vector3(0, 0, 0);
    this.vel = new Vector3();
    this.facing = cfg.dir > 0 ? 0 : Math.PI;
    this.targetFacing = this.facing;

    this.speedStat = cfg.data.stats.pace || 60;
    this.dribbleStat = cfg.data.stats.dribbling || 60;
    this.passStat = cfg.data.stats.passing || 60;
    this.shootStat = cfg.data.stats.shooting || 60;
    this.defendStat = cfg.data.stats.defending || 60;
    this.physicalStat = cfg.data.stats.physical || 60;
    this.staminaStat = cfg.data.stats.stamina || 60;

    this.speedScale = cfg.speedScale || 1;
    this.stamina = 100;
    this.staminaScale = cfg.staminaScale || 1;

    // intent set by AI / human input each frame
    this.intent = {
      moveX: 0,
      moveZ: 0,
      sprint: false,
      urgency: 1,          // 0..1 => jog..sprint
    };

    // action state machine
    this.action = null;    // { type, t, windup, recover, data }
    this.actionCooldown = 0;
    this.ballTouchTimer = 0;
    this.saveCooldown = 0;
    this.tackleCooldown = 0;
    this.isTackling = false;
    this.stunTimer = 0;

    // animation state read by the renderer
    this.anim = {
      speed: 0,
      phase: 0,
      action: 'idle',
      actionProgress: 0,
      lean: 0,
      celebrate: 0,
    };

    this.stats = { shots: 0, goals: 0, assists: 0, passes: 0, passesCompleted: 0, tackles: 0, fouls: 0, saves: 0, touches: 0, distance: 0 };
    this.rating = 6.0;      // live match rating
    this.hasBall = false;
    this.isUserControlled = false;
    this.markTarget = null; // opponent id this player is marking
    this.pressTarget = false;
    this.roleTarget = new Vector3();
    this.homePosition = new Vector3();
    this.actionLockedUntil = 0;
    this.wantsToShoot = false;
    this.shotCharge = 0;
  }

  get maxSpeed() {
    const paceFactor = 0.74 + clamp(this.speedStat, 30, 99) * 0.128 * 0.4;
    const staminaFactor = 0.82 + 0.18 * clamp(this.stamina / 100, 0, 1);
    return PLAYER.baseSpeed * paceFactor * staminaFactor * this.speedScale;
  }

  get sprintSpeed() {
    return this.maxSpeed * (PLAYER.sprintSpeed / PLAYER.baseSpeed);
  }

  setIntent(moveX, moveZ, sprint = false, urgency = 1) {
    this.intent.moveX = moveX;
    this.intent.moveZ = moveZ;
    this.intent.sprint = sprint;
    this.intent.urgency = urgency;
  }

  clearIntent() {
    this.intent.moveX = 0;
    this.intent.moveZ = 0;
    this.intent.sprint = false;
  }

  startAction(type, cfg = {}) {
    if (this.isBusy() && !cfg.force) return false;
    const windups = {
      pass: 0.10, through: 0.14, lob: 0.20, shoot: 0.16, finesse: 0.24, chip: 0.22,
      clear: 0.14, cross: 0.20, tackle: 0.06, slide: 0.05, dive: 0.03, head: 0.10,
    };
    const recovers = {
      pass: 0.14, through: 0.16, lob: 0.20, shoot: 0.30, finesse: 0.34, chip: 0.30,
      clear: 0.22, cross: 0.26, tackle: PLAYER.tackleRecover, slide: PLAYER.slideRecover,
      dive: 0.85, head: 0.20,
    };
    this.action = {
      type,
      t: 0,
      windup: cfg.windup !== undefined ? cfg.windup : (windups[type] || 0.12),
      recover: cfg.recover !== undefined ? cfg.recover : (recovers[type] || 0.2),
      data: cfg,
      fired: false,
    };
    this.anim.action = type;
    this.anim.actionProgress = 0;
    if (type === 'tackle' || type === 'slide') this.isTackling = true;
    return true;
  }

  isBusy() {
    return !!(this.action && !(this.action.fired && this.action.t > this.action.windup + this.action.recover));
  }

  isActing() {
    return !!this.action;
  }

  cancelAction() {
    this.action = null;
    this.isTackling = false;
    this.anim.action = 'idle';
  }

  updateStamina(dt, moving) {
    const drain = moving ? (this.intent.sprint ? PLAYER.staminaDrainSprint : PLAYER.staminaDrainRun) : 0;
    const recovery = moving ? 0 : PLAYER.staminaRecover;
    const resistance = 0.7 + clamp(this.staminaStat, 30, 99) / 99 * 0.6;
    let delta = (recovery - drain) / resistance;
    if (this.isGK) delta += 1.6;
    this.stamina = clamp(this.stamina + delta * dt * this.staminaScale, 8, 100);
  }

  /** Integrates movement, stamina and actions. `world` gives access to the ball. */
  update(dt, world) {
    this.actionCooldown = Math.max(0, this.actionCooldown - dt);
    this.stunTimer = Math.max(0, this.stunTimer - dt);
    this.saveCooldown = Math.max(0, this.saveCooldown - dt);

    let ax = this.intent.moveX;
    let az = this.intent.moveZ;
    const mag = Math.hypot(ax, az);
    if (mag > 1) {
      ax /= mag;
      az /= mag;
    }
    const moving = mag > 0.05;

    // actions freeze / slow the player
    let speedFactor = 1;
    if (this.action) {
      this.action.t += dt;
      const { type, windup, recover } = this.action;
      const total = windup + recover;
      this.anim.actionProgress = clamp(this.action.t / Math.max(0.001, total), 0, 1);
      if (type === 'slide') speedFactor = this.action.t < 0.25 ? 1.35 : 0.05;
      else if (type === 'tackle') speedFactor = 1.15;
      else if (type === 'dive') speedFactor = 0.05;
      else if (type === 'shoot' || type === 'finesse' || type === 'chip') speedFactor = this.action.t < windup ? 0.72 : 0.55;
      else speedFactor = this.action.t < windup ? 0.84 : 0.8;

      if (this.action.t >= total) {
        this.action = null;
        this.isTackling = false;
        this.anim.action = 'idle';
        this.actionCooldown = 0.05;
      }
    }
    if (this.stunTimer > 0) speedFactor *= 0.25;

    const targetSpeed = moving
      ? (this.intent.sprint ? this.sprintSpeed : this.maxSpeed) * clamp(this.intent.urgency, 0.25, 1.15)
      : 0;

    // desired velocity
    const desiredX = ax * targetSpeed * speedFactor;
    const desiredZ = az * targetSpeed * speedFactor;
    const accel = moving ? PLAYER.accel : PLAYER.decel;
    const blend = clamp(accel * dt / Math.max(0.5, targetSpeed), 0, 1);
    this.vel.x += (desiredX - this.vel.x) * blend;
    this.vel.z += (desiredZ - this.vel.z) * blend;
    if (!moving && Math.hypot(this.vel.x, this.vel.z) < 0.25) {
      this.vel.x = 0;
      this.vel.z = 0;
    }

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;

    // keep players on the pitch (a little outside the lines is allowed)
    const limitX = FIELD.halfLength + 2.0;
    const limitZ = FIELD.halfWidth + 1.6;
    this.pos.x = clamp(this.pos.x, -limitX, limitX);
    this.pos.z = clamp(this.pos.z, -limitZ, limitZ);

    // facing follows velocity / ball when idle
    if (moving) {
      this.targetFacing = Math.atan2(this.vel.x, this.vel.z);
    } else if (world && world.ball) {
      const dx = world.ball.position.x - this.pos.x;
      const dz = world.ball.position.z - this.pos.z;
      if (len2(dx, dz) > 0.6) this.targetFacing = Math.atan2(dx, dz);
    }
    const turn = this.isTackling ? 3.2 : PLAYER.turnRate;
    this.facing += clamp(angleDelta(this.facing, this.targetFacing), -turn * dt, turn * dt);
    this.facing = wrapAngle(this.facing);

    const speed = Math.hypot(this.vel.x, this.vel.z);
    this.stats.distance += speed * dt;
    this.updateStamina(dt, moving && speed > 0.6);

    // animation data
    const a = this.anim;
    a.speed = speed;
    a.lean = damp(a.lean, clamp(speed / this.sprintSpeed, 0, 1) * 0.35, 6, dt);
    a.phase += dt * (2.6 + speed * 1.05);
    if (a.phase > 1000) a.phase -= 1000;
    if (!this.action) a.action = speed > 0.4 ? 'run' : 'idle';
    a.celebrate = damp(a.celebrate, this.celebrating ? 1 : 0, 4, dt);
  }

  /** Distance from this player to a point (XZ plane). */
  distanceTo(x, z) {
    return Math.hypot(this.pos.x - x, this.pos.z - z);
  }

  distanceToBall(ball) {
    return this.distanceTo(ball.position.x, ball.position.z);
  }

  /** Direction toward the opponent goal from the current position. */
  goalDirection(ball) {
    const targetX = this.dir * FIELD.halfLength;
    tmp.set(targetX - ball.position.x, 0, -ball.position.z);
    if (tmp.lengthSq() < 1e-4) tmp.set(this.dir, 0, 0);
    return tmp.normalize();
  }

  canReachBall(ball) {
    const d = this.distanceToBall(ball);
    return d <= PLAYER.controlRadius + 0.05 && ball.position.y <= BALL.controlHeight;
  }

  toJSON() {
    return {
      id: this.id, name: this.name, team: this.team, position: this.position,
      number: this.number, stamina: this.stamina, rating: this.rating, stats: this.stats,
    };
  }
}
