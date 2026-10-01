#!/usr/bin/env node
/**
 * Headless DOM smoke test.
 *
 * Boots the real application (three.js renderer + HUD + screens) inside jsdom
 * with stubbed WebGL/Canvas2D/AudioContext implementations, plays a short match
 * and visits every screen. It cannot validate pixels, but it executes every
 * line of gameplay, UI and scene code and fails on any runtime error.
 *
 *   node tools/smoke-dom.mjs
 */
import { JSDOM } from 'jsdom';

const errors = [];
function fail(where, error) {
  errors.push(`${where}: ${error && error.stack ? error.stack.split('\n').slice(0, 3).join(' | ') : error}`);
}

// ---------------------------------------------------------------------------
// jsdom environment
// ---------------------------------------------------------------------------
const dom = new JSDOM(`<!doctype html><html><head></head><body><div id="app"></div></body></html>`, {
  pretendToBeVisual: true,
  url: 'http://localhost:3000/',
  resources: undefined,
});
const { window } = dom;

// ---- canvas 2D stub (textures) ------------------------------------------
function make2D(canvas) {
  const gradient = { addColorStop() {} };
  const ctx = {
    canvas,
    fillStyle: '#000', strokeStyle: '#000', lineWidth: 1, font: '10px sans-serif',
    textAlign: 'left', textBaseline: 'alphabetic', globalAlpha: 1, globalCompositeOperation: 'source-over',
    shadowBlur: 0, shadowColor: '#000', lineCap: 'butt', lineJoin: 'miter', miterLimit: 10,
    imageSmoothingEnabled: true, letterSpacing: '0px',
    save() {}, restore() {}, translate() {}, rotate() {}, scale() {}, setTransform() {}, resetTransform() {},
    transform() {}, beginPath() {}, closePath() {}, moveTo() {}, lineTo() {}, quadraticCurveTo() {}, bezierCurveTo() {},
    arc() {}, arcTo() {}, ellipse() {}, rect() {}, roundRect() {}, fill() {}, stroke() {}, clip() {},
    fillRect() {}, strokeRect() {}, clearRect() {}, fillText() {}, strokeText() {}, drawImage() {},
    setLineDash() {}, getLineDash() { return []; },
    createLinearGradient() { return gradient; }, createRadialGradient() { return gradient; }, createPattern() { return null; },
    measureText(text) { return { width: String(text).length * 6, actualBoundingBoxAscent: 8, actualBoundingBoxDescent: 2 }; },
    getImageData(x, y, w, h) { return { data: new Uint8ClampedArray(Math.max(4, w * h * 4)), width: w, height: h }; },
    putImageData() {}, createImageData(w, h) { return { data: new Uint8ClampedArray(w * h * 4), width: w, height: h }; },
    isPointInPath() { return false; }, getTransform() { return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }; },
  };
  return ctx;
}

// ---- WebGL2 stub (three.js) ---------------------------------------------
const GLC = {
  VERSION: 0x1f02, SHADING_LANGUAGE_VERSION: 0x8b8c, VENDOR: 0x1f00, RENDERER: 0x1f01,
  MAX_TEXTURE_SIZE: 0x0d33, MAX_CUBE_MAP_TEXTURE_SIZE: 0x851c, MAX_TEXTURE_IMAGE_UNITS: 0x8872,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8b4c, MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8b4d,
  MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb, MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd, MAX_VARYING_VECTORS: 0x8dfc,
  MAX_VERTEX_ATTRIBS: 0x8869, MAX_SAMPLES: 0x8d57, MAX_VIEWPORT_DIMS: 0x0d3a, SCISSOR_BOX: 0x0c10,
  VIEWPORT: 0x0ba2, ALIASED_LINE_WIDTH_RANGE: 0x846e, ACTIVE_UNIFORMS: 0x8b86, ACTIVE_ATTRIBUTES: 0x8b89,
  LINK_STATUS: 0x8b82, COMPILE_STATUS: 0x8b81, FRAMEBUFFER_COMPLETE: 0x8cd5, NO_ERROR: 0,
  DEPTH_TEST: 0x0b71, BLEND: 0x0be2, CULL_FACE: 0x0b44, SCISSOR_TEST: 0x0c11, STENCIL_TEST: 0x0b90,
  LEQUAL: 0x0203, LESS: 0x0201, BACK: 0x0405, FRONT: 0x0404, CCW: 0x0901, CW: 0x0900,
  SRC_ALPHA: 0x0302, ONE_MINUS_SRC_ALPHA: 0x0303, ONE: 1, ZERO: 0, DEPTH_BUFFER_BIT: 0x100,
  COLOR_BUFFER_BIT: 0x4000, TRIANGLES: 4, UNSIGNED_SHORT: 0x1403, UNSIGNED_INT: 0x1405, FLOAT: 0x1406,
  TEXTURE_2D: 0x0de1, RGBA: 0x1908, UNSIGNED_BYTE: 0x1401, LINEAR: 0x2601, NEAREST: 0x2600,
  TEXTURE0: 0x84c0, ARRAY_BUFFER: 0x8892, ELEMENT_ARRAY_BUFFER: 0x8893, STATIC_DRAW: 0x88e4,
  DYNAMIC_DRAW: 0x88e8, HIGH_FLOAT: 0x8df2, MEDIUM_FLOAT: 0x8df1, VERTEX_SHADER: 0x8b31, FRAGMENT_SHADER: 0x8b30,
  COLOR_ATTACHMENT0: 0x8ce0, FRAMEBUFFER: 0x8d40, REPEAT: 0x2901, CLAMP_TO_EDGE: 0x812f, LINEAR_MIPMAP_LINEAR: 0x2703,
};

function makeGL(canvas) {
  const state = { programs: [], shaders: [], buffers: [], textures: [], vaos: [], framebuffers: [] };
  const target = {
    canvas,
    ...GLC,
    drawArrays() {}, drawElements() {}, drawArraysInstanced() {}, drawElementsInstanced() {},
    getParameter(pname) {
      switch (pname) {
        case GLC.VERSION: return 'WebGL 2.0 (stub)';
        case GLC.SHADING_LANGUAGE_VERSION: return 'WebGL GLSL ES 3.00 (stub)';
        case GLC.VENDOR: return 'UFM Stub';
        case GLC.RENDERER: return 'UFM Stub Renderer';
        case GLC.MAX_VIEWPORT_DIMS: return new Int32Array([8192, 8192]);
        case GLC.SCISSOR_BOX: return new Int32Array([0, 0, 1200, 800]);
        case GLC.VIEWPORT: return new Int32Array([0, 0, 1200, 800]);
        case GLC.ALIASED_LINE_WIDTH_RANGE: return new Float32Array([1, 1]);
        default: return 16;
      }
    },
    getExtension() { return null; },
    getSupportedExtensions() { return []; },
    getContextAttributes() { return { alpha: false, antialias: true, depth: true, stencil: false, premultipliedAlpha: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }; },
    isContextLost() { return false; },
    getShaderPrecisionFormat() { return { rangeMin: 127, rangeMax: 127, precision: 23 }; },
    getProgramParameter(program, pname) {
      if (pname === GLC.LINK_STATUS) return true;
      return 0;
    },
    getShaderParameter() { return true; },
    getProgramInfoLog() { return ''; },
    getShaderInfoLog() { return ''; },
    getError() { return 0; },
    checkFramebufferStatus() { return GLC.FRAMEBUFFER_COMPLETE; },
    getUniformLocation() { return {}; },
    getAttribLocation() { return 0; },
    createShader() { const s = {}; state.shaders.push(s); return s; },
    createProgram() { const p = {}; state.programs.push(p); return p; },
    createBuffer() { const b = {}; state.buffers.push(b); return b; },
    createTexture() { const t = {}; state.textures.push(t); return t; },
    createVertexArray() { const v = {}; state.vaos.push(v); return v; },
    createFramebuffer() { const f = {}; state.framebuffers.push(f); return f; },
    createRenderbuffer() { return {}; },
    shaderSource() {}, compileShader() {}, attachShader() {}, linkProgram() {}, useProgram() {},
    deleteShader() {}, deleteProgram() {}, deleteBuffer() {}, deleteTexture() {}, deleteVertexArray() {}, deleteFramebuffer() {},
    bindBuffer() {}, bufferData() {}, bufferSubData() {},
    bindVertexArray() {}, enableVertexAttribArray() {}, disableVertexAttribArray() {}, vertexAttribPointer() {},
    vertexAttribDivisor() {}, vertexAttribIPointer() {},
    bindTexture() {}, texImage2D() {}, texSubImage2D() {}, texParameteri() {}, texParameterf() {}, generateMipmap() {}, pixelStorei() {},
    activeTexture() {}, bindFramebuffer() {}, framebufferTexture2D() {}, viewport() {}, scissor() {}, clear() {}, clearColor() {},
    enable() {}, disable() {}, blendFunc() {}, blendFuncSeparate() {}, blendEquation() {}, blendEquationSeparate() {},
    depthFunc() {}, depthMask() {}, colorMask() {}, cullFace() {}, frontFace() {}, lineWidth() {}, polygonOffset() {},
    uniform1f() {}, uniform1i() {}, uniform2f() {}, uniform3f() {}, uniform4f() {},
    uniform1fv() {}, uniform2fv() {}, uniform3fv() {}, uniform4fv() {}, uniformMatrix3fv() {}, uniformMatrix4fv() {},
    flush() {}, finish() {}, readPixels() {}, drawBuffers() {},
  };
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) return obj[prop];
      if (typeof prop === 'string' && /^[A-Z0-9_]+$/.test(prop)) return 0;      // unknown GL constant
      return () => 0;                                                          // unknown method
    },
  });
}

class WebGL2RenderingContextStub {}
Object.defineProperty(WebGL2RenderingContextStub, 'name', { value: 'WebGL2RenderingContext' });

const canvas2dCache = new WeakMap();
window.HTMLCanvasElement.prototype.getContext = function getContext(type) {
  if (type === '2d') {
    if (!canvas2dCache.has(this)) canvas2dCache.set(this, make2D(this));
    return canvas2dCache.get(this);
  }
  if (type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') {
    const gl = makeGL(this);
    Object.setPrototypeOf(gl, WebGL2RenderingContextStub.prototype);
    return gl;
  }
  return null;
};
window.HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,';

// ---- AudioContext stub ---------------------------------------------------
class AudioNodeStub {
  constructor() {
    this.gain = { value: 1, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}, setTargetAtTime() {} };
    this.frequency = { value: 440, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} };
    this.Q = { value: 1 };
    this.type = 'sine';
  }
  connect() { return this; }
  disconnect() {}
  start() {}
  stop() {}
}
class AudioContextStub {
  constructor() { this.currentTime = 0; this.sampleRate = 48000; this.state = 'running'; this.destination = new AudioNodeStub(); }
  createGain() { return new AudioNodeStub(); }
  createOscillator() { return new AudioNodeStub(); }
  createBiquadFilter() { return new AudioNodeStub(); }
  createBufferSource() { return new AudioNodeStub(); }
  createBuffer(channels, length) { return { getChannelData: () => new Float32Array(length), length, numberOfChannels: channels }; }
  resume() { this.state = 'running'; }
  suspend() { this.state = 'suspended'; }
}

// ---- install globals ----------------------------------------------------
const globals = {
  window, self: window, document: window.document, navigator: window.navigator,
  location: window.location, localStorage: window.localStorage, sessionStorage: window.sessionStorage,
  HTMLElement: window.HTMLElement, HTMLCanvasElement: window.HTMLCanvasElement, Image: window.Image,
  Element: window.Element, Node: window.Node, Event: window.Event, CustomEvent: window.CustomEvent,
  PointerEvent: window.PointerEvent || window.MouseEvent, MouseEvent: window.MouseEvent, KeyboardEvent: window.KeyboardEvent,
  requestAnimationFrame: (cb) => window.requestAnimationFrame(cb),
  cancelAnimationFrame: (id) => window.cancelAnimationFrame(id),
  getComputedStyle: window.getComputedStyle.bind(window),
  matchMedia: (query) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }),
  WebGL2RenderingContext: WebGL2RenderingContextStub,
  AudioContext: AudioContextStub,
  screen: window.screen,
  devicePixelRatio: 2,
};
window.AudioContext = AudioContextStub;
for (const [key, value] of Object.entries(globals)) {
  if (value === undefined) continue;
  try { globalThis[key] = value; } catch { try { Object.defineProperty(globalThis, key, { value, configurable: true, writable: true }); } catch { /* non-configurable: keep Node's built-in */ } }
}
window.devicePixelRatio = 2;
window.UFMNative = undefined;

// give the container a size (jsdom reports 0)
Object.defineProperty(window.HTMLElement.prototype, 'clientWidth', { get() { return 400; }, configurable: true });
Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', { get() { return 800; }, configurable: true });
window.HTMLElement.prototype.getBoundingClientRect = function rect() {
  return { x: 0, y: 0, left: 0, top: 0, right: 400, bottom: 800, width: 400, height: 800, toJSON() { return this; } };
};
window.HTMLElement.prototype.setPointerCapture = function () {};
window.HTMLElement.prototype.releasePointerCapture = function () {};

const consoleErrors = [];
const originalError = console.error;
console.error = (...args) => {
  consoleErrors.push(args.map((a) => (a && a.stack ? a.stack.split('\n')[0] : String(a))).join(' '));
  originalError(...args);
};
window.addEventListener('error', (event) => fail('window.error', event.error || event.message));
window.addEventListener('unhandledrejection', (event) => fail('unhandledrejection', event.reason));

// ---------------------------------------------------------------------------
// run the game
// ---------------------------------------------------------------------------
const report = [];
let currentApp = null;
function step(dt, count) {
  const app = currentApp;
  if (!app || !app.runner) throw new Error('no runner to step');
  for (let i = 0; i < count; i += 1) app.runner.update(dt);
}

async function main() {
  const module = await import('../web/src/main.js');
  const app = module.app;
  currentApp = app;
  report.push(`boot: mode=${app.mode} state=${!!app.state} roster=${app.state.roster.length}`);

  // splash -> menu
  if (typeof window.__ufmStart === 'function') window.__ufmStart();
  await new Promise((resolve) => setTimeout(resolve, 520));
  report.push(`menu: screens=${!!app.screens.current} menuTiles=${window.document.querySelectorAll('.menu-tile').length}`);

  // visit every screen
  for (const name of ['matchSetup', 'team', 'players', 'shop', 'settings', 'profile', 'career', 'tournament', 'training', 'penalty']) {
    app.screens.push(name);
    const count = window.document.querySelectorAll('.screen').length;
    if (!count) throw new Error(`screen ${name} rendered nothing`);
  }
  app.screens.show('menu');
  report.push(`screens: all 10 rendered (formation slots=${window.document.querySelectorAll('.pitch-slot').length})`);

  // team builder interactions
  app.screens.show('team');
  const slots = window.document.querySelectorAll('.pitch-slot');
  if (slots.length !== 11) throw new Error(`pitch builder has ${slots.length} slots`);
  app.state.formation = '4-4-2';
  app.screens.render();
  report.push(`team builder: 4-4-2 slots=${window.document.querySelectorAll('.pitch-slot').length}`);
  app.state.formation = '4-3-3';
  app.screens.show('players');
  report.push(`players screen cards=${window.document.querySelectorAll('.player-card').length}`);

  // a real match, driven by the real renderer + HUD
  app.screens.show('menu');
  app.startQuickMatch({ opponentId: 'tashkent_wolves', difficulty: 'NORMAL', minutes: 1, timeOfDay: 'night' });
  if (!app.runner || !app.runner.scene) throw new Error('match runner did not start');
  report.push(`match: players=${app.runner.match.players.length} playerModels=${app.runner.scene.playerModels.length}`);
  step(1 / 30, 60);
  // exercise controls
  app.input.joystick.x = 1; app.input.joystick.z = 0.4; app.input.joystick.magnitude = 1;
  app.runner.handleAction('sprint', { hold: 0.5 });
  app.runner.handleAction('pass', { hold: 0.4, swipe: 0 });
  app.runner.handleAction('shoot', { hold: 0.85, swipe: 0 });
  app.runner.handleAction('through', { hold: 0.5 });
  app.runner.handleAction('tackle', { hold: 0.6, swipe: -1 });
  app.runner.handleAction('switch', {});
  step(1 / 30, 30);
  app.runner.pause();
  app.runner.resume();
  app.runner.handleAction('shoot', { hold: 0.9, swipe: -1 });
  step(1 / 30, 240);
  const summary = app.runner.match.summary();
  report.push(`match played: ${summary.score[0]}-${summary.score[1]} shots=${summary.stats[0].shots + summary.stats[1].shots} poss=${summary.possession.join('/')} clock=${app.runner.match.displayClock}`);
  report.push(`match scene: crowd=${app.runner.scene.stadium ? 'ok' : 'missing'} ball=${!!app.runner.scene.ball} particles=${app.runner.scene.particleCount}`);
  app.runner.pause();
  app.runner.resume();
  app.runner.dispose();
  app.runner = null;

  // camera modes
  const { MatchScene } = await import('../web/src/render/scene.js');
  const holder = window.document.getElementById('app');
  const scene = new MatchScene(holder, { quality: 'low', timeOfDay: 'day', homeClub: app.state.club, awayClub: app.state.club });
  for (const mode of ['broadcast', 'tele', 'close', 'player', 'penalty']) scene.setCameraMode(mode);
  scene.setCameraSettings({ sensitivity: 0.7, zoom: 0.3 });
  const { Ball } = await import('../web/src/sim/ball.js');
  const smokeBall = new Ball();
  smokeBall.reset(4, 1);
  smokeBall.velocity.set(9, 1, 2);
  scene.sync({
    players: [], ball: smokeBall, score: [1, 0], state: 'celebration', teamNames: ['A', 'B'],
    displayClock: '12:00', half: 1, controlledPlayer: null, pendingShot: null, celebrationScorer: null,
  }, 1 / 60, { excitement: 0.4 });
  scene.sync({ players: [], ball: smokeBall, score: [1, 0], state: 'play', teamNames: ['A', 'B'], displayClock: '12:00', half: 2, controlledPlayer: null }, 1 / 60, {});
  scene.render();
  scene.dispose();
  report.push('scene: camera modes + sync + dispose ok');

  // penalty shootout, played through the runner
  app.startPenalty({ difficulty: 'NORMAL', opponentId: 'samarkand_lions', timeOfDay: 'night' });
  if (!app.runner) throw new Error('penalty runner did not start');
  for (let i = 0; i < 8; i += 1) {
    app.runner.update(1 / 60);
    app.runner.handleAction('shoot', { hold: 0.7, swipe: 0 });
    for (let j = 0; j < 120; j += 1) app.runner.update(1 / 60);
    if (app.runner && app.runner.finished) break;
    app.runner.update(1 / 60);
  }
  report.push(`penalty: score=${app.runner ? app.runner.shootout.score.join('-') : 'finished'} phase=${app.runner ? app.runner.phase : 'done'}`);
  if (app.runner) app.runner.dispose();
  app.runner = null;

  // back to the menu (menu backdrop scene)
  app.enterMenu();
  app.menuScene.update(1 / 60);
  app.menuScene.render();
  report.push(`menu backdrop: ok (objects=${app.menuScene.scene.children.length})`);

  // settings + language switching through the real screens
  for (const lang of ['en', 'uz', 'ru']) {
    app.setLanguage(lang);
    app.screens.show('settings');
    if (!window.document.querySelectorAll('.chip').length) throw new Error(`settings screen empty in ${lang}`);
  }
  app.setSettings({ graphics: 'low', fps: 30, buttonScale: 1.2, joystickSide: 'right', cameraMode: 'close' });
  report.push('settings: language + graphics changes applied');

  // local save round-trip
  app.state.coins = 4242;
  app.save();
  const raw = window.localStorage.getItem('ufm.save.v1');
  if (!raw) throw new Error('save not written to localStorage');
  report.push(`save: ${raw.length} bytes written`);
}

let failureCount = 0;
try {
  await main();
} catch (error) {
  failureCount += 1;
  fail('main', error);
}

if (consoleErrors.length) {
  failureCount += 1;
  errors.push(`console.error output (${consoleErrors.length}): ${consoleErrors.slice(0, 5).join(' || ')}`);
}

console.log('\nHeadless DOM smoke test\n');
for (const line of report) console.log(`  \u2022 ${line}`);
console.log('');
if (failureCount || errors.length) {
  console.log(`FAILED with ${errors.length} problem(s):`);
  for (const line of errors) console.log(`  \u2717 ${line}`);
  process.exit(1);
}
console.log('PASSED: full app boot, 10 screens, live match, penalty shootout and save round-trip.');
process.exit(0);
