/**
 * Audio engine - every sound effect is synthesised with the Web Audio API, so
 * the game has crowd noise, whistles, kicks and menu feedback without shipping
 * a single audio file.
 *
 * Buses: master -> (sfx, music, crowd). Volumes come from the settings screen.
 */
export class AudioEngine {
  constructor(settings = {}) {
    this.settings = settings;
    this.ctx = null;
    this.ready = false;
    this.enabled = true;
    this.noiseBuffer = null;
    this.crowdGain = null;
    this.musicTimer = null;
    this.musicStep = 0;
    this.currentTrack = null;
    this.crowdTarget = 0.35;
  }

  init() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) {
      this.enabled = false;
      return null;
    }
    try {
      this.ctx = new Ctx();
    } catch {
      this.enabled = false;
      return null;
    }
    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(ctx.destination);

    this.sfx = ctx.createGain();
    this.sfx.gain.value = this.settings.sfxVolume !== undefined ? this.settings.sfxVolume : 0.85;
    this.sfx.connect(this.master);

    this.music = ctx.createGain();
    this.music.gain.value = this.settings.musicVolume !== undefined ? this.settings.musicVolume : 0.45;
    this.music.connect(this.master);

    this.crowdBus = ctx.createGain();
    this.crowdBus.gain.value = 0;
    this.crowdBus.connect(this.master);

    // reusable noise buffer
    const length = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    this.noiseBuffer = buffer;

    this.ready = true;
    this.startCrowd();
    return ctx;
  }

  resume() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  setVolumes({ sfxVolume, musicVolume, crowdVolume }) {
    if (sfxVolume !== undefined && this.sfx) this.sfx.gain.value = sfxVolume;
    if (musicVolume !== undefined && this.music) this.music.gain.value = musicVolume;
    if (crowdVolume !== undefined) this.settings.crowdVolume = crowdVolume;
    if (sfxVolume !== undefined) this.settings.sfxVolume = sfxVolume;
    if (musicVolume !== undefined) this.settings.musicVolume = musicVolume;
  }

  // -------------------------------------------------------------- primitives
  noise(duration, { gain = 0.4, type = 'bandpass', frequency = 900, q = 1, attack = 0.005, curve = 'exp' } = {}) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = q;
    const g = ctx.createGain();
    const now = ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + attack);
    if (curve === 'exp') g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    else g.gain.linearRampToValueAtTime(0, now + duration);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.sfx);
    src.start(now);
    src.stop(now + duration + 0.05);
  }

  tone(frequency, duration, { type = 'sine', gain = 0.3, slideTo = null, delay = 0, attack = 0.01, dest = null } = {}) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    const now = ctx.currentTime + delay;
    osc.frequency.setValueAtTime(frequency, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + duration);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gain, now + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(g);
    g.connect(dest || this.sfx);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  // -------------------------------------------------------------- sfx
  play(name, opts = {}) {
    if (!this.ready || !this.enabled) return;
    switch (name) {
      case 'click':
        this.tone(660, 0.07, { type: 'triangle', gain: 0.16 });
        break;
      case 'back':
        this.tone(420, 0.09, { type: 'triangle', gain: 0.14, slideTo: 300 });
        break;
      case 'error':
        this.tone(220, 0.16, { type: 'square', gain: 0.12, slideTo: 160 });
        break;
      case 'kick': {
        const power = opts.power || 0.6;
        this.noise(0.09, { gain: 0.32 * power, frequency: 1600, q: 0.8 });
        this.tone(150 * (0.8 + power * 0.4), 0.14, { type: 'sine', gain: 0.3 * power, slideTo: 60 });
        break;
      }
      case 'pass':
        this.noise(0.06, { gain: 0.2, frequency: 2200, q: 1.2 });
        this.tone(220, 0.07, { type: 'sine', gain: 0.14, slideTo: 140 });
        break;
      case 'save':
        this.noise(0.16, { gain: 0.3, frequency: 500, q: 0.7 });
        break;
      case 'whistle': {
        this.tone(2350, 0.22, { type: 'square', gain: 0.1 });
        this.tone(2950, 0.22, { type: 'square', gain: 0.08 });
        this.tone(2350, 0.3, { type: 'square', gain: 0.09, delay: 0.26 });
        this.tone(2950, 0.3, { type: 'square', gain: 0.07, delay: 0.26 });
        break;
      }
      case 'whistleShort':
        this.tone(2400, 0.14, { type: 'square', gain: 0.1 });
        this.tone(3000, 0.14, { type: 'square', gain: 0.07 });
        break;
      case 'goal': {
        this.tone(523, 0.5, { type: 'sawtooth', gain: 0.12 });
        this.tone(659, 0.5, { type: 'sawtooth', gain: 0.1, delay: 0.08 });
        this.tone(784, 0.7, { type: 'sawtooth', gain: 0.12, delay: 0.16 });
        this.tone(1046, 0.9, { type: 'sawtooth', gain: 0.1, delay: 0.24 });
        this.roar(2.4, 0.5);
        break;
      }
      case 'crowdGoal':
        this.roar(3.2, 0.65);
        break;
      case 'packOpen':
        [523, 659, 784, 1046, 1318].forEach((f, i) => this.tone(f, 0.3, { type: 'triangle', gain: 0.14, delay: i * 0.09 }));
        break;
      case 'upgrade':
        [440, 554, 659, 880].forEach((f, i) => this.tone(f, 0.28, { type: 'sine', gain: 0.16, delay: i * 0.07 }));
        break;
      case 'coin':
        this.tone(1200, 0.09, { type: 'square', gain: 0.09 });
        this.tone(1600, 0.12, { type: 'square', gain: 0.07, delay: 0.05 });
        break;
      case 'levelUp':
        [523, 659, 784, 1046, 1318, 1568].forEach((f, i) => this.tone(f, 0.4, { type: 'triangle', gain: 0.13, delay: i * 0.08 }));
        break;
      case 'tackle':
        this.noise(0.14, { gain: 0.28, frequency: 700, q: 0.6 });
        break;
      case 'post':
        this.tone(880, 0.35, { type: 'sine', gain: 0.3, slideTo: 420 });
        break;
      default:
        break;
    }
  }

  // -------------------------------------------------------------- crowd
  startCrowd() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    const band = ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 480;
    band.Q.value = 0.45;
    const high = ctx.createBiquadFilter();
    high.type = 'highpass';
    high.frequency.value = 220;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    src.connect(band);
    band.connect(high);
    high.connect(gain);
    gain.connect(this.crowdBus);
    src.start();

    // slow swell so the crowd breathes
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.11;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();
    this.crowdGain = gain;
  }

  setCrowd(intensity) {
    this.crowdTarget = intensity;
    if (this.crowdGain && this.ctx) {
      const target = 0.12 + intensity * 0.55 * ((this.settings.crowdVolume !== undefined ? this.settings.crowdVolume : 0.7));
      this.crowdGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.8);
    }
  }

  roar(duration = 2, gain = 0.5) {
    if (!this.ready) return;
    const previous = this.crowdTarget;
    this.setCrowd(1);
    setTimeout(() => this.setCrowd(Math.max(0.3, previous)), duration * 500);
    this.noise(duration, { gain: gain * 0.5, type: 'bandpass', frequency: 700, q: 0.5 });
  }

  // -------------------------------------------------------------- music
  /**
   * Simple generative music bed: a chord progression with a soft arpeggio.
   * style: 'menu' | 'match' | null
   */
  playMusic(style) {
    if (!this.ready) return;
    if (this.currentTrack === style) return;
    this.currentTrack = style;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    if (!style) return;

    const menuChords = [[220, 277, 330], [196, 247, 294], [174, 220, 261], [196, 247, 330]];
    const matchChords = [[147, 185, 220], [139, 175, 208], [131, 165, 196], [139, 175, 220]];
    const chords = style === 'menu' ? menuChords : matchChords;
    const step = style === 'menu' ? 2.4 : 1.6;

    const playStep = () => {
      if (!this.ready || this.currentTrack !== style) return;
      const chord = chords[this.musicStep % chords.length];
      for (const freq of chord) {
        this.tone(freq, step * 1.05, { type: 'sine', gain: style === 'menu' ? 0.05 : 0.032, dest: this.music, attack: 0.35 });
      }
      // arpeggio
      const note = chord[(this.musicStep * 2) % chord.length] * 2;
      this.tone(note, step * 0.45, { type: 'triangle', gain: style === 'menu' ? 0.035 : 0.02, dest: this.music, delay: step * 0.55 });
      if (style === 'match') {
        this.noise(0.05, { gain: 0.02, frequency: 200, q: 0.5 });
      }
      this.musicStep += 1;
    };
    playStep();
    this.musicTimer = setInterval(playStep, step * 1000);
  }

  stopMusic() {
    this.playMusic(null);
  }
}

export const audio = new AudioEngine();
