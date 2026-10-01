/**
 * Save system + settings.
 *
 * Saves live in localStorage (works offline inside the Android WebView) and are
 * mirrored through the native bridge when available, so progress survives even
 * if the WebView storage is cleared.
 */
import { deepMerge } from './events.js';

const SAVE_KEY = 'ufm.save.v1';
const SETTINGS_KEY = 'ufm.settings.v1';

function bridge() {
  return (typeof window !== 'undefined' && window.UFMNative) ? window.UFMNative : null;
}

function safeParse(json, fallback) {
  try {
    const value = JSON.parse(json);
    return value && typeof value === 'object' ? value : fallback;
  } catch {
    return fallback;
  }
}

function localGet(key) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

function localSet(key, value) {
  try {
    if (window.localStorage) window.localStorage.setItem(key, value);
  } catch {
    /* storage disabled: the native bridge still holds a copy */
  }
}

export const DEFAULT_SETTINGS = {
  language: 'uz',
  graphics: 'auto',          // auto | low | medium | high
  fps: 'auto',               // auto | 30 | 60
  sfxVolume: 0.85,
  musicVolume: 0.45,
  crowdVolume: 0.7,
  haptics: true,
  buttonScale: 1,
  joystickSide: 'left',
  cameraMode: 'broadcast',
  cameraSensitivity: 0.5,
  cameraZoom: 0.5,
  matchMinutes: 4,
  showMinimap: true,
  autoSwitch: true,
  quality: 'medium',         // resolved from graphics + device
  fpsTarget: 60,
};

/** Guesses a sensible quality level for the device. */
export function detectDeviceTier() {
  const ua = (navigator.userAgent || '').toLowerCase();
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const dpr = window.devicePixelRatio || 1;
  let score = 0;
  if (cores >= 8) score += 3; else if (cores >= 6) score += 2; else if (cores >= 4) score += 1;
  if (memory >= 8) score += 2; else if (memory >= 6) score += 1; else if (memory <= 2) score -= 1;
  if (dpr >= 3) score -= 1; else if (dpr <= 1.5) score += 1;
  if (/android 1[0-5]/.test(ua)) score += 1;
  if (/sm-\w1\d\d\d|redmi \d+a|moto e|moto g[0-9]? play/.test(ua)) score -= 2;
  if (score >= 4) return 'high';
  if (score >= 1) return 'medium';
  return 'low';
}

export function resolveQuality(settings) {
  if (settings.graphics !== 'auto') return settings.graphics;
  return detectDeviceTier();
}

export function resolveFpsTarget(settings, quality) {
  if (settings.fps !== 'auto') return Number(settings.fps);
  return quality === 'low' ? 30 : 60;
}

export class Storage {
  constructor() {
    this.settings = this.loadSettings();
    this.saveTimer = null;
  }

  loadSettings() {
    let raw = localGet(SETTINGS_KEY);
    if (!raw) {
      const native = bridge() && bridge().loadSettings ? bridge().loadSettings() : null;
      raw = native || null;
    }
    const parsed = raw ? safeParse(raw, {}) : {};
    const settings = deepMerge(DEFAULT_SETTINGS, parsed);
    settings.quality = resolveQuality(settings);
    settings.fpsTarget = resolveFpsTarget(settings, settings.quality);
    return settings;
  }

  saveSettings() {
    const json = JSON.stringify(this.settings);
    localSet(SETTINGS_KEY, json);
    const b = bridge();
    if (b && b.saveSettings) {
      try { b.saveSettings(json); } catch { /* ignore */ }
    }
  }

  applySettings(patch) {
    this.settings = deepMerge(this.settings, patch);
    this.settings.quality = resolveQuality(this.settings);
    this.settings.fpsTarget = resolveFpsTarget(this.settings, this.settings.quality);
    this.saveSettings();
    return this.settings;
  }

  load() {
    let raw = localGet(SAVE_KEY);
    if (!raw) {
      const b = bridge();
      if (b && b.loadSave) {
        try { raw = b.loadSave(); } catch { raw = null; }
      }
    }
    if (!raw) return null;
    const data = safeParse(raw, null);
    return data;
  }

  /** Debounced save (writes at most every 400 ms). */
  save(state) {
    const json = JSON.stringify(state);
    localSet(SAVE_KEY, json);
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      const b = bridge();
      if (b && b.saveProgress) {
        try { b.saveProgress(json); } catch { /* ignore */ }
      }
      this.saveTimer = null;
    }, 400);
  }

  clear() {
    localSet(SAVE_KEY, '');
    const b = bridge();
    if (b && b.clearSave) {
      try { b.clearSave(); } catch { /* ignore */ }
    }
  }
}

export const storage = new Storage();
