// Procedural WebAudio sound: no external audio assets needed.
import { getSave } from './save.js';

let ctx = null;
let master = null, sfxBus = null, musicBus = null, crowdBus = null;
let crowdGain = null, crowdSrc = null;
let musicTimer = null;
let started = false;

function ensure() {
  if (ctx) return true;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination);
    sfxBus = ctx.createGain(); sfxBus.connect(master);
    musicBus = ctx.createGain(); musicBus.connect(master);
    crowdBus = ctx.createGain(); crowdBus.connect(master);
    applyVolumes();
  } catch { return false; }
  return true;
}

export function unlockAudio() {
  if (!ensure()) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  if (!started) { started = true; startCrowd(); startMusic(); }
}

export function applyVolumes() {
  if (!ctx) return;
  const s = getSave().settings;
  sfxBus.gain.value = s.sound;
  musicBus.gain.value = s.music * 0.5;
  if (crowdGain) crowdGain.gain.setTargetAtTime(0.32 * s.sound, ctx.currentTime, 0.3);
}

function noiseBuffer(sec) {
  const len = Math.floor(ctx.sampleRate * sec);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

// --- crowd ambience: looped filtered noise with slow swells ---
function startCrowd() {
  if (!ctx || crowdSrc) return;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(2.5); src.loop = true;
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = 0.6;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400;
  crowdGain = ctx.createGain(); crowdGain.gain.value = 0;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.13;
  const lfoG = ctx.createGain(); lfoG.gain.value = 0.09;
  lfo.connect(lfoG); lfoG.connect(crowdGain.gain);
  src.connect(bp); bp.connect(lp); lp.connect(crowdGain); crowdGain.connect(crowdBus);
  src.start(); lfo.start();
  crowdSrc = src;
  applyVolumes();
}

export function crowdExcitement(amount = 1, seconds = 3) {
  if (!ctx || !crowdGain) return;
  const s = getSave().settings;
  const now = ctx.currentTime;
  const base = 0.32 * s.sound;
  const peak = base + amount * 0.5 * s.sound;
  crowdGain.gain.cancelScheduledValues(now);
  crowdGain.gain.setValueAtTime(crowdGain.gain.value, now);
  crowdGain.gain.linearRampToValueAtTime(peak, now + 0.12);
  crowdGain.gain.setTargetAtTime(base, now + seconds * 0.5, seconds * 0.35);
}

function blip(freq, dur, type, gain, slide = 0) {
  if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = freq;
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), ctx.currentTime + dur);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  o.connect(g); g.connect(sfxBus);
  o.start(); o.stop(ctx.currentTime + dur + 0.02);
}

function noiseHit(dur, freq, q, gain) {
  if (!ctx) return;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(dur + 0.05);
  const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(f); f.connect(g); g.connect(sfxBus);
  src.start(); src.stop(ctx.currentTime + dur + 0.05);
}

export const sfx = {
  click() { blip(660, 0.06, 'triangle', 0.25, -180); },
  hover() { blip(880, 0.03, 'sine', 0.08); },
  kick(power = 0.5) {
    noiseHit(0.09, 900 + power * 900, 1.2, 0.28 + power * 0.3);
    blip(120 + power * 60, 0.1, 'sine', 0.3, -60);
  },
  pass() { noiseHit(0.06, 1200, 1.4, 0.2); blip(180, 0.06, 'sine', 0.16, -60); },
  bounce() { noiseHit(0.05, 600, 2, 0.12); },
  whistle(long = false) {
    if (!ctx) return;
    const dur = long ? 0.75 : 0.34;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square'; o.frequency.value = 2350;
    const vib = ctx.createOscillator(), vibG = ctx.createGain();
    vib.frequency.value = 38; vibG.gain.value = 90;
    vib.connect(vibG); vibG.connect(o.frequency);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.02);
    g.gain.setValueAtTime(0.16, ctx.currentTime + dur - 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g); g.connect(sfxBus);
    o.start(); vib.start(); o.stop(ctx.currentTime + dur); vib.stop(ctx.currentTime + dur);
  },
  goal() {
    crowdExcitement(1, 4);
    blip(523, 0.14, 'triangle', 0.3); setTimeout(() => blip(659, 0.14, 'triangle', 0.3), 130);
    setTimeout(() => blip(784, 0.24, 'triangle', 0.34), 260);
    noiseHit(0.8, 1600, 0.7, 0.2);
  },
  catchBall() { noiseHit(0.07, 500, 1.5, 0.2); },
  tackle() { noiseHit(0.12, 420, 1.0, 0.3); },
  post() { blip(320, 0.5, 'square', 0.2, -140); noiseHit(0.08, 2400, 3, 0.2); },
  error() { blip(220, 0.18, 'sawtooth', 0.2, -80); },
  success() { blip(520, 0.08, 'triangle', 0.24); setTimeout(() => blip(760, 0.12, 'triangle', 0.24), 90); },
  coin() { blip(1180, 0.07, 'square', 0.14, 240); setTimeout(() => blip(1560, 0.1, 'square', 0.12, 200), 60); },
  levelUp() { [440, 554, 659, 880].forEach((f, i) => setTimeout(() => blip(f, 0.16, 'triangle', 0.26), i * 110)); }
};

// --- simple menu music: airy pad arpeggio loop ---
const CHORDS = [
  [110, 164.81, 220, 329.63],
  [98, 146.83, 196, 293.66],
  [87.31, 130.81, 174.61, 261.63],
  [98, 146.83, 196, 293.66]
];
let chordIdx = 0;
function startMusic() {
  if (!ctx || musicTimer) return;
  const step = () => {
    if (musicTimer === null) return;
    const s = getSave().settings;
    if (s.music > 0.01) {
      const chord = CHORDS[chordIdx % CHORDS.length];
      chord.forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = i < 2 ? 'sine' : 'triangle';
        o.frequency.value = f;
        const t0 = ctx.currentTime + i * 0.05;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.linearRampToValueAtTime(0.05, t0 + 0.4);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 2.2);
        o.connect(g); g.connect(musicBus);
        o.start(t0); o.stop(t0 + 2.3);
      });
      chordIdx++;
    }
    musicTimer = setTimeout(step, 2400);
  };
  musicTimer = setTimeout(step, 400);
}

export function stopMusic() {
  if (musicTimer) { clearTimeout(musicTimer); musicTimer = null; }
}
export function resumeMusic() {
  if (!musicTimer && started) startMusic();
}
