/**
 * Input: virtual joystick + on-screen action buttons for touch, plus a full
 * keyboard mapping so the game can be played/previewed on a desktop browser.
 *
 * The HUD owns the DOM elements; this class only tracks state and exposes a
 * small API to the match runner.
 */
export const ACTIONS = ['pass', 'shoot', 'sprint', 'through', 'tackle', 'switch'];

export class InputManager {
  constructor(root) {
    this.root = root;
    this.joystick = { x: 0, z: 0, magnitude: 0, active: false, pointerId: null };
    this.buttons = {};
    this.holdTime = {};
    this.keyboard = { x: 0, z: 0, sprint: false };
    this.enabled = true;
    this.joystickElement = null;
    this.knobElement = null;
    this.radius = 62;
    this.swipe = { up: false, down: false };
    this.onAction = null;
    this.axisFlip = false;
  }

  /** Binds the joystick DOM node (created by the HUD). */
  attachJoystick(base, knob) {
    this.joystickElement = base;
    this.knobElement = knob;
    const rect = () => base.getBoundingClientRect();
    const update = (event) => {
      if (!this.enabled) return;
      const r = rect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = event.clientX - cx;
      let dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = r.width / 2;
      this.radius = max;
      if (dist > max) {
        dx = (dx / dist) * max;
        dy = (dy / dist) * max;
      }
      // dead zone so light touches don't move the player
      const nx = dx / max;
      const ny = dy / max;
      const mag = Math.hypot(nx, ny);
      const dead = 0.14;
      if (mag < dead) {
        this.joystick.x = 0;
        this.joystick.z = 0;
        this.joystick.magnitude = 0;
      } else {
        const scaled = (mag - dead) / (1 - dead);
        this.joystick.x = (nx / mag) * scaled;
        this.joystick.z = (ny / mag) * scaled;
        this.joystick.magnitude = Math.min(1, scaled);
      }
      if (this.knobElement) {
        this.knobElement.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const start = (event) => {
      if (!this.enabled) return;
      this.joystick.pointerId = event.pointerId;
      this.joystick.active = true;
      base.classList.add('active');
      base.setPointerCapture && base.setPointerCapture(event.pointerId);
      update(event);
      event.preventDefault();
    };
    const move = (event) => {
      if (!this.joystick.active || event.pointerId !== this.joystick.pointerId) return;
      update(event);
      event.preventDefault();
    };
    const end = (event) => {
      if (event.pointerId !== this.joystick.pointerId) return;
      this.joystick.active = false;
      this.joystick.x = 0;
      this.joystick.z = 0;
      this.joystick.magnitude = 0;
      this.joystick.pointerId = null;
      base.classList.remove('active');
      if (this.knobElement) this.knobElement.style.transform = 'translate(0px, 0px)';
      event.preventDefault();
    };
    base.addEventListener('pointerdown', start, { passive: false });
    base.addEventListener('pointermove', move, { passive: false });
    base.addEventListener('pointerup', end, { passive: false });
    base.addEventListener('pointercancel', end, { passive: false });
    this._joystickCleanup = () => {
      base.removeEventListener('pointerdown', start);
      base.removeEventListener('pointermove', move);
      base.removeEventListener('pointerup', end);
      base.removeEventListener('pointercancel', end);
    };
  }

  /** Binds an action button. `action` is one of ACTIONS. */
  attachButton(element, action) {
    this.buttons[action] = { element, pressed: false, hold: 0, justPressed: false, swipe: 0 };
    const down = (event) => {
      if (!this.enabled) return;
      const state = this.buttons[action];
      state.pressed = true;
      state.justPressed = true;
      state.hold = 0;
      element.classList.add('pressed');
      element.setPointerCapture && element.setPointerCapture(event.pointerId);
      this._swipeStart = { x: event.clientX, y: event.clientY, action };
      event.preventDefault();
    };
    const move = (event) => {
      const state = this.buttons[action];
      if (!state || !state.pressed || !this._swipeStart || this._swipeStart.action !== action) return;
      const dy = event.clientY - this._swipeStart.y;
      // swiping up on SHOOT = chip, down = finesse; on PASS up = lob
      state.swipe = Math.abs(dy) > 28 ? (dy < 0 ? 1 : -1) : 0;
      if (state.swipe !== 0) element.classList.add(state.swipe > 0 ? 'swipe-up' : 'swipe-down');
      event.preventDefault();
    };
    const up = (event) => {
      const state = this.buttons[action];
      if (!state) return;
      const hold = state.hold;
      const swipe = state.swipe;
      state.pressed = false;
      state.swipe = 0;
      element.classList.remove('pressed', 'swipe-up', 'swipe-down');
      if (this.onAction) this.onAction(action, { hold, swipe });
      this._swipeStart = null;
      event.preventDefault();
    };
    element.addEventListener('pointerdown', down, { passive: false });
    element.addEventListener('pointermove', move, { passive: false });
    element.addEventListener('pointerup', up, { passive: false });
    element.addEventListener('pointercancel', up, { passive: false });
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    if (!enabled) {
      this.joystick.x = 0;
      this.joystick.z = 0;
      this.joystick.magnitude = 0;
      for (const key of Object.keys(this.buttons)) {
        this.buttons[key].pressed = false;
        this.buttons[key].element.classList.remove('pressed');
      }
    }
  }

  /** Called once per frame before reading the axes. */
  update(dt) {
    for (const key of Object.keys(this.buttons)) {
      const state = this.buttons[key];
      if (state.pressed) state.hold += dt;
    }
  }

  consumePress(action) {
    const state = this.buttons[action];
    if (!state) return false;
    if (state.justPressed) {
      state.justPressed = false;
      return true;
    }
    return false;
  }

  /** Movement axes combining joystick and keyboard. */
  getMove() {
    let x = this.joystick.x + this.keyboard.x;
    let z = this.joystick.z + this.keyboard.z;
    const mag = Math.hypot(x, z);
    if (mag > 1) {
      x /= mag;
      z /= mag;
    }
    return { x, z, magnitude: Math.min(1, mag) };
  }

  isPressed(action) {
    const state = this.buttons[action];
    return !!state && state.pressed;
  }

  holdTime(action) {
    const state = this.buttons[action];
    return state ? state.hold : 0;
  }

  get sprintHeld() {
    return this.isPressed('sprint') || this.keyboard.sprint;
  }

  /** Desktop mapping (also useful for automated testing). */
  attachKeyboard(target = window) {
    const keys = new Set();
    const recompute = () => {
      this.keyboard.x = (keys.has('ArrowRight') || keys.has('d') || keys.has('D') ? 1 : 0)
        - (keys.has('ArrowLeft') || keys.has('a') || keys.has('A') ? 1 : 0);
      this.keyboard.z = (keys.has('ArrowDown') || keys.has('s') || keys.has('S') ? 1 : 0)
        - (keys.has('ArrowUp') || keys.has('w') || keys.has('W') ? 1 : 0);
      this.keyboard.sprint = keys.has('Shift');
    };
    const mapping = {
      ' ': 'shoot', j: 'pass', k: 'shoot', l: 'through', i: 'tackle', u: 'switch',
      q: 'pass', e: 'through', f: 'tackle', r: 'switch',
    };
    const onDown = (event) => {
      if (!this.enabled) return;
      if (event.key === 'Shift') {
        keys.add('Shift');
        recompute();
        return;
      }
      keys.add(event.key);
      recompute();
      const action = mapping[event.key] || mapping[event.key.toLowerCase()];
      if (action && this.buttons[action]) {
        const state = this.buttons[action];
        if (!state.pressed) {
          state.pressed = true;
          state.justPressed = true;
          state.hold = 0;
          state.element.classList.add('pressed');
        }
      }
    };
    const onUp = (event) => {
      keys.delete(event.key);
      recompute();
      const action = mapping[event.key] || mapping[event.key.toLowerCase()];
      if (action && this.buttons[action]) {
        const state = this.buttons[action];
        const hold = state.hold;
        state.pressed = false;
        state.element.classList.remove('pressed');
        if (this.onAction) this.onAction(action, { hold, swipe: 0 });
      }
    };
    target.addEventListener('keydown', onDown);
    target.addEventListener('keyup', onUp);
    this._keyboardCleanup = () => {
      target.removeEventListener('keydown', onDown);
      target.removeEventListener('keyup', onUp);
    };
  }

  dispose() {
    if (this._joystickCleanup) this._joystickCleanup();
    if (this._keyboardCleanup) this._keyboardCleanup();
    this.buttons = {};
  }
}
