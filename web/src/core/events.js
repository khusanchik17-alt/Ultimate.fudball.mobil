/**
 * Minimal synchronous event bus. Used by the simulation to notify the renderer
 * and the UI (goals, fouls, whistles, ...) without creating hard dependencies.
 */
export class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this.map = new Map();
    this.anyHandlers = new Set();
  }

  on(type, handler) {
    if (!this.map.has(type)) this.map.set(type, new Set());
    this.map.get(type).add(handler);
    return () => this.off(type, handler);
  }

  once(type, handler) {
    const off = this.on(type, (payload) => {
      off();
      handler(payload);
    });
    return off;
  }

  onAny(handler) {
    this.anyHandlers.add(handler);
    return () => this.anyHandlers.delete(handler);
  }

  off(type, handler) {
    const set = this.map.get(type);
    if (set) set.delete(handler);
  }

  emit(type, payload) {
    const set = this.map.get(type);
    if (set) {
      for (const handler of [...set]) {
        try {
          handler(payload);
        } catch (err) {
          console.error(`[EventBus] handler for "${type}" failed`, err);
        }
      }
    }
    for (const handler of [...this.anyHandlers]) {
      try {
        handler(type, payload);
      } catch (err) {
        console.error('[EventBus] onAny handler failed', err);
      }
    }
  }

  clear() {
    this.map.clear();
    this.anyHandlers.clear();
  }
}

/** Depth-first deep-merge used for save-data migrations / option defaults. */
export function deepMerge(base, patch) {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(base)) return Array.isArray(patch) ? patch.slice() : base;
  if (typeof base !== 'object') return patch;
  const out = { ...base };
  for (const key of Object.keys(patch)) {
    out[key] = key in base ? deepMerge(base[key], patch[key]) : patch[key];
  }
  return out;
}
