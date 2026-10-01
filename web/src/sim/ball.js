/**
 * Ball physics: gravity, quadratic air drag, Magnus (spin) curve, rolling
 * friction, bounce and goal frame collisions. Deliberately arcade-tuned so the
 * ball feels responsive on a phone while still arcing realistically.
 */
import { Vector3 } from 'three';
import { BALL, FIELD } from './constants.js';
import { clamp } from '../core/util.js';

const tmp = new Vector3();
const tmp2 = new Vector3();

export class Ball {
  constructor() {
    this.position = new Vector3(0, BALL.radius, 0);
    this.velocity = new Vector3();
    this.spin = new Vector3();          // x = top/back spin, y = side spin, z = unused
    this.owner = null;                  // MatchPlayer currently dribbling
    this.lastTouch = null;              // MatchPlayer that touched it last
    this.lastKickKind = null;
    this.controlLock = new Map();       // playerId -> seconds left before they may re-control
    this.inPlay = false;
    this.height = BALL.radius;
    this.rollAngle = 0;
    this.trailTimer = 0;
    this.onGround = true;
  }

  reset(x = 0, z = 0) {
    this.position.set(x, BALL.radius, z);
    this.velocity.set(0, 0, 0);
    this.spin.set(0, 0, 0);
    this.owner = null;
    this.lastTouch = null;
    this.lastKickKind = null;
    this.inPlay = false;
    this.controlLock.clear();
  }

  get speed() {
    return this.velocity.length();
  }

  /**
   * Applies an impulse.
   * @param {Vector3} direction normalised direction
   * @param {number} power speed in m/s
   * @param {object} [opts] { lift, spinSide, spinTop, kind, player }
   */
  kick(direction, power, opts = {}) {
    const dir = tmp.copy(direction);
    if (dir.lengthSq() < 1e-6) dir.set(0, 0, 1);
    dir.normalize();
    const lift = opts.lift !== undefined ? opts.lift : 0.16;
    const speed = clamp(power, 1, BALL.maxSpeed);
    dir.y += lift;
    dir.normalize();
    this.velocity.copy(dir).multiplyScalar(speed);
    this.spin.set(opts.spinTop || 0, opts.spinSide || 0, 0);
    this.owner = null;
    if (opts.player) {
      this.lastTouch = opts.player;
      this.registerTouch(opts.player, 0.22);
    }
    this.lastKickKind = opts.kind || 'kick';
    this.onGround = false;
    this.inPlay = true;
  }

  registerTouch(player, seconds = 0.3) {
    this.controlLock.set(player.id, seconds);
  }

  canBeControlledBy(player) {
    return !(this.controlLock.get(player.id) > 0);
  }

  /** Ball travelling time helper used by pass leading and AI anticipation. */
  timeToReach(distance, speed) {
    const v = Math.max(2, speed || this.speed);
    return distance / v;
  }

  update(dt, opts = {}) {
    const gravity = opts.gravity !== undefined ? opts.gravity : BALL.gravity;

    if (this.owner) {
      // carried: position is driven by the owner (see MatchPlayer.updateBall)
      this.position.y = Math.max(BALL.radius, this.position.y);
      return;
    }

    // gravity
    this.velocity.y -= gravity * dt;

    // quadratic air drag
    const sp = this.velocity.length();
    if (sp > 0.001) {
      const drag = BALL.airDrag * sp * dt;
      tmp.copy(this.velocity).multiplyScalar(-drag);
      this.velocity.add(tmp);
    }

    // Magnus effect (side spin bends the flight, back/top spin changes height)
    if (Math.abs(this.spin.x) > 0.01 || Math.abs(this.spin.y) > 0.01) {
      tmp.set(-this.velocity.z * this.spin.y, 0, this.velocity.x * this.spin.y);
      tmp.add(tmp2.set(0, -Math.abs(this.velocity.x * this.spin.x + this.velocity.z * this.spin.x), 0));
      this.velocity.addScaledVector(tmp, BALL.spinMagnus * dt * 60 * 0.016);
      this.spin.multiplyScalar(1 - 0.35 * dt);
    }

    // integrate
    this.position.addScaledVector(this.velocity, dt);

    // ground interaction
    if (this.position.y <= BALL.radius) {
      this.position.y = BALL.radius;
      if (this.velocity.y < -0.6) {
        this.velocity.y = -this.velocity.y * BALL.bounce;
        this.velocity.x *= BALL.bounceFriction;
        this.velocity.z *= BALL.bounceFriction;
        this.onGround = false;
      } else {
        this.velocity.y = 0;
        this.onGround = true;
      }
      if (this.onGround) {
        // rolling friction
        const groundSpeed = Math.hypot(this.velocity.x, this.velocity.z);
        if (groundSpeed > 0.01) {
          const decel = BALL.rollFriction * dt;
          const factor = Math.max(0, 1 - decel / groundSpeed);
          this.velocity.x *= factor;
          this.velocity.z *= factor;
        } else {
          this.velocity.x = 0;
          this.velocity.z = 0;
        }
        this.spin.multiplyScalar(0.86);
      }
    } else {
      this.onGround = false;
    }

    if (sp > 0.02) {
      this.rollAngle += (sp * dt) / BALL.radius;
    }

    if (this.velocity.lengthSq() > BALL.maxSpeed * BALL.maxSpeed) {
      this.velocity.setLength(BALL.maxSpeed);
    }

    this.clampToGoalFrame();
    this.decayLocks(dt);
    return this;
  }

  decayLocks(dt) {
    if (this.controlLock.size === 0) return;
    for (const [id, value] of this.controlLock) {
      const next = value - dt;
      if (next <= 0) this.controlLock.delete(id);
      else this.controlLock.set(id, next);
    }
  }

  /** Post / crossbar bounce + net capture behind the goal line. */
  clampToGoalFrame() {
    const halfLength = FIELD.halfLength;
    const halfGoal = FIELD.goalWidth / 2;
    if (Math.abs(this.position.x) < halfLength - 0.4) return;
    const side = Math.sign(this.position.x) || 1;
    const insideGoalWidth = Math.abs(this.position.z) <= halfGoal + 0.1;
    const insideGoalHeight = this.position.y <= FIELD.goalHeight + 0.1;
    if (!insideGoalWidth || !insideGoalHeight) return;

    const postX = side * halfLength;
    const dx = this.position.x - postX;
    if (Math.abs(dx) < 0.35) {
      // post hit: if the ball crosses near the post radius, reflect
      const nearPost = Math.abs(Math.abs(this.position.z) - halfGoal) < 0.22;
      if (nearPost) {
        this.position.x -= Math.sign(dx || side) * 0.14;
        this.velocity.x *= -0.55;
        this.velocity.z *= 0.85;
        return { type: 'post' };
      }
    }
    // crossbar
    if (Math.abs(this.position.y - FIELD.goalHeight) < 0.20 && insideGoalWidth) {
      this.position.y = FIELD.goalHeight - 0.05;
      this.velocity.y = -Math.abs(this.velocity.y) * 0.5;
      return { type: 'bar' };
    }
    return null;
  }

  /** Linear interception point prediction (used by GK and defenders). */
  predict(distance, steps = 8) {
    const dt = distance / Math.max(1, this.speed) / steps;
    const pos = this.position.clone();
    const vel = this.velocity.clone();
    for (let i = 0; i < steps; i += 1) {
      vel.y -= BALL.gravity * dt;
      vel.multiplyScalar(Math.max(0, 1 - BALL.airDrag * vel.length() * dt));
      pos.addScaledVector(vel, dt);
    }
    return pos;
  }
}
