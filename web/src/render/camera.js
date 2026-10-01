/**
 * Broadcast-style camera director.
 *
 * Modes: broadcast (default TV camera on the touchline), tele (higher/wider),
 * close (tighter on the action), player (behind the controlled player) and
 * penalty (behind the taker). All movement is critically damped so it never
 * snaps, and the sensitivity setting scales the look-ahead and zoom response.
 */
import { Vector3, MathUtils } from 'three';
import { clamp, damp, smoothstep } from '../core/util.js';
import { FIELD } from '../sim/constants.js';

const desired = new Vector3();
const lookAt = new Vector3();
const tmp = new Vector3();

export class CameraDirector {
  constructor(camera, settings = {}) {
    this.camera = camera;
    this.mode = settings.mode || 'broadcast';
    this.sensitivity = settings.sensitivity !== undefined ? settings.sensitivity : 0.5;
    this.zoomBias = settings.zoom !== undefined ? settings.zoom : 0.5;
    this.current = new Vector3(0, 26, 46);
    this.currentLook = new Vector3(0, 0, 0);
    this.shake = 0;
    this.shakeTime = 0;
    this.fov = 42;
    this.side = 1;
    this.celebrateTimer = 0;
    this.celebrateTarget = null;
    this.initialised = false;
  }

  setMode(mode) {
    this.mode = mode;
  }

  setSettings({ sensitivity, zoom }) {
    if (sensitivity !== undefined) this.sensitivity = sensitivity;
    if (zoom !== undefined) this.zoomBias = zoom;
  }

  addShake(amount) {
    this.shake = Math.min(1.6, this.shake + amount);
  }

  update(dt, ctx) {
    const { ball, controlled, match, phase } = ctx;
    const sense = 0.55 + this.sensitivity * 0.9;
    const zoom = 0.7 + this.zoomBias * 0.7;

    const ballX = ball.position.x;
    const ballZ = ball.position.z;
    const speed = Math.hypot(ball.velocity.x, ball.velocity.z);

    // Pick the camera side: stay on the touchline closest to the action, and
    // flip only when the play is genuinely wide (avoids constant swinging).
    if (this.mode === 'broadcast' || this.mode === 'tele') {
      const wantSide = ballZ > 6 ? -1 : ballZ < -6 ? 1 : this.side;
      this.side = wantSide;
    }

    let fov = 42;
    switch (this.mode) {
      case 'tele': {
        desired.set(
          ballX * 0.72,
          30 * zoom,
          this.side * (FIELD.halfWidth + 30),
        );
        fov = 32;
        break;
      }
      case 'close': {
        desired.set(
          ballX - Math.sign(ball.velocity.x || 1) * 10 * sense,
          12 * zoom,
          this.side * (FIELD.halfWidth + 10),
        );
        fov = 46;
        break;
      }
      case 'player': {
        const p = controlled || ball;
        const dirSign = match.dirOf(p.team || 0) || 1;
        desired.set(
          p.pos.x - dirSign * 13,
          9 * zoom,
          p.pos.z - 5 * this.side * 0,
        );
        fov = 50;
        break;
      }
      case 'penalty': {
        desired.set(-Math.sign(ballX || 1) * (FIELD.halfLength - 14), 6.5, ball.position.z * 0.4);
        fov = 40;
        break;
      }
      case 'broadcast':
      default: {
        // TV camera: on the side line, slightly ahead of the ball
        const lookAhead = clamp(speed * 0.25, 0, 6) * sense;
        desired.set(
          ballX * 0.86 + Math.sign(ball.velocity.x || 1) * lookAhead * 0.4,
          (20 + Math.min(10, Math.abs(ballZ) * 0.12)) * zoom,
          this.side * (FIELD.halfWidth + 22),
        );
        fov = 40;
        break;
      }
    }

    // zoom out slightly for fast play, in for set pieces
    const dynamicFov = fov + clamp(speed * 0.28, 0, 7) - (match.state === 'setpiece' ? 3 : 0);
    this.fov = damp(this.fov, dynamicFov, 2.2, dt);

    // goal celebration: orbit around the scorer
    if (phase === 'celebration' && this.celebrateTarget) {
      this.celebrateTimer += dt;
      const a = this.celebrateTimer * 0.9;
      const r = 12;
      desired.set(
        this.celebrateTarget.pos.x + Math.cos(a) * r,
        5.5 + Math.sin(a * 0.7) * 1.2,
        this.celebrateTarget.pos.z + Math.sin(a) * r,
      );
    } else {
      this.celebrateTimer = 0;
    }

    const posLambda = (this.mode === 'broadcast' ? 3.1 : 4.2) * (0.7 + this.sensitivity * 0.6);
    if (!this.initialised) {
      this.current.copy(desired);
      this.initialised = true;
    } else {
      this.current.x = damp(this.current.x, desired.x, posLambda, dt);
      this.current.y = damp(this.current.y, desired.y, posLambda * 0.85, dt);
      this.current.z = damp(this.current.z, desired.z, posLambda, dt);
    }

    // where to look: ball with a lead towards the attacking goal
    tmp.copy(ball.position);
    tmp.x += clamp(ball.velocity.x * 0.35, -5, 5) * sense;
    tmp.z += clamp(ball.velocity.z * 0.25, -4, 4) * sense;
    if (this.mode === 'player' && controlled) {
      tmp.set(controlled.pos.x, 1.2, controlled.pos.z);
    }
    tmp.y = Math.max(0.6, tmp.y * 0.6 + 0.4);
    lookAt.copy(tmp);
    this.currentLook.x = damp(this.currentLook.x, lookAt.x, 3.6, dt);
    this.currentLook.y = damp(this.currentLook.y, lookAt.y, 3.0, dt);
    this.currentLook.z = damp(this.currentLook.z, lookAt.z, 3.6, dt);

    // shake
    this.shakeTime += dt;
    let shakeX = 0;
    let shakeY = 0;
    if (this.shake > 0.001) {
      const s = this.shake * this.shake * 0.9;
      shakeX = Math.sin(this.shakeTime * 47) * s;
      shakeY = Math.cos(this.shakeTime * 39) * s;
      this.shake = Math.max(0, this.shake - dt * 1.7);
    }

    this.camera.position.set(this.current.x + shakeX, this.current.y + shakeY, this.current.z);
    this.camera.lookAt(this.currentLook);
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    return this;
  }

  /** Instantly places the camera (used when a screen opens). */
  snap(ctx) {
    this.initialised = false;
    this.update(0.016, ctx);
  }
}

export { smoothstep, MathUtils };
