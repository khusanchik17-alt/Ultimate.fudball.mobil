/**
 * MatchScene: owns the WebGL renderer, lights, stadium, 22 player avatars, the
 * ball, simple pooled effects and the camera director. It reads a MatchSim
 * instance every frame and pushes the state into three.js objects.
 */
import {
  Scene, PerspectiveCamera, WebGLRenderer, HemisphereLight, DirectionalLight, AmbientLight,
  Mesh, MeshLambertMaterial, MeshBasicMaterial, PlaneGeometry, SphereGeometry, RingGeometry,
  InstancedMesh, Object3D, Color, CanvasTexture, SRGBColorSpace, NoToneMapping,
  AdditiveBlending, DoubleSide, FogExp2,
} from 'three';
import { buildStadium } from './stadium.js';
import { buildPlayerModel, animatePlayerModel } from './playerModel.js';
import { createBallTexture } from './textures.js';
import { CameraDirector } from './camera.js';
import { clamp, mulberry32 } from '../core/util.js';
import { TIME_OF_DAY } from '../sim/constants.js';

const dummy = new Object3D();

function buildNumberTexture(number, color = '#0a1626', textColor = '#ffffff') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = textColor;
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(number), 64, 68);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export class MatchScene {
  /**
   * @param {HTMLElement} container
   * @param {object} opts { quality: 'low'|'medium'|'high', timeOfDay, homeClub, awayClub, mobile }
   */
  constructor(container, opts = {}) {
    this.container = container;
    this.quality = opts.quality || 'medium';
    this.opts = opts;
    this.disposed = false;

    this.renderer = new WebGLRenderer({
      antialias: this.quality === 'high',
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
    });
    this.renderer.setPixelRatio(this.pixelRatio());
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NoToneMapping;
    this.renderer.setClearColor(0x06101c, 1);
    this.canvas = this.renderer.domElement;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.touchAction = 'none';
    container.appendChild(this.canvas);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(42, 16 / 9, 0.5, 600);
    this.camera.position.set(0, 24, 46);

    this.setupLights(opts.timeOfDay || 'night');

    this.stadium = buildStadium({
      quality: this.quality,
      timeOfDay: opts.timeOfDay || 'night',
      homeClub: opts.homeClub,
      awayClub: opts.awayClub,
    });
    this.scene.add(this.stadium.group);

    // ------------------------------------------------------------- ball
    const ballGeo = new SphereGeometry(0.11, this.quality === 'low' ? 12 : 20, this.quality === 'low' ? 8 : 14);
    this.ball = new Mesh(ballGeo, new MeshLambertMaterial({ map: createBallTexture() }));
    this.ball.position.y = 0.11;
    this.scene.add(this.ball);

    this.ballShadow = new Mesh(
      new PlaneGeometry(0.55, 0.55),
      new MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.32, depthWrite: false }),
    );
    this.ballShadow.rotation.x = -Math.PI / 2;
    this.scene.add(this.ballShadow);

    // control indicator ring under the player the user is driving
    this.controlRing = new Mesh(
      new RingGeometry(0.5, 0.68, 24),
      new MeshBasicMaterial({ color: 0x0fd6be, transparent: true, opacity: 0.85, depthWrite: false, side: DoubleSide }),
    );
    this.controlRing.rotation.x = -Math.PI / 2;
    this.controlRing.position.y = 0.03;
    this.controlRing.visible = false;
    this.scene.add(this.controlRing);

    // ------------------------------------------------------------- players
    this.playerModels = [];
    this.playerStates = [];
    this.numberMaterials = [];
    this.createPlayers(opts.homeClub, opts.awayClub);

    // ------------------------------------------------------------- camera + effects
    this.cameraDirector = new CameraDirector(this.camera, {
      mode: opts.cameraMode || 'broadcast',
      sensitivity: opts.cameraSensitivity !== undefined ? opts.cameraSensitivity : 0.5,
      zoom: opts.cameraZoom !== undefined ? opts.cameraZoom : 0.5,
    });
    this.setupEffects();

    this.time = 0;
    this.resize();
    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', this._onResize);
  }

  pixelRatio() {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    if (this.quality === 'high') return Math.min(dpr, 2);
    if (this.quality === 'medium') return Math.min(dpr, 1.5);
    return Math.min(dpr, 1);
  }

  setupLights(timeOfDay) {
    const preset = TIME_OF_DAY[timeOfDay] || TIME_OF_DAY.night;
    this.lights = {};
    this.lights.hemi = new HemisphereLight(0xbfd8ff, 0x1c2a18, preset.ambient);
    this.scene.add(this.lights.hemi);

    this.lights.sun = new DirectionalLight(preset.sunColor, preset.sun);
    this.lights.sun.position.set(-60, 90, 40);
    this.scene.add(this.lights.sun);

    this.lights.fill = new DirectionalLight(0x9fc4ff, preset.night ? 0.35 : 0.25);
    this.lights.fill.position.set(60, 40, -60);
    this.scene.add(this.lights.fill);

    this.lights.ambient = new AmbientLight(0xffffff, preset.night ? 0.22 : 0.16);
    this.scene.add(this.lights.ambient);

    this.scene.fog = new FogExp2(preset.fog, preset.night ? 0.0038 : 0.0026);
    this.scene.background = new Color(preset.sky);
  }

  createPlayers(homeClub, awayClub) {
    for (let i = 0; i < 22; i += 1) {
      const team = i < 11 ? 0 : 1;
      const club = team === 0 ? homeClub : awayClub;
      const isGK = (i % 11) === 0;
      const kit = {
        shirt: isGK ? (club.gk || '#ffd24a') : club.primary,
        shorts: club.secondary,
        socks: club.secondary,
        gk: club.gk,
      };
      const model = buildPlayerModel(kit, {
        detail: this.quality,
        seed: i + 3,
        isGK,
        longSleeves: isGK,
      });
      this.scene.add(model.group);
      this.playerModels.push(model);
      this.playerStates.push({ swing: 0, lean: 0, celebrate: 0 });

      const numberMat = new MeshBasicMaterial({
        map: buildNumberTexture((i % 11) + 1, isGK ? '#0a1626' : club.primary, isGK ? '#ffd24a' : '#ffffff'),
        transparent: true,
      });
      const badge = new Mesh(new PlaneGeometry(0.3, 0.3), numberMat);
      badge.position.set(0, 1.24, -0.12);
      badge.rotation.y = Math.PI;
      model.group.add(badge);
      this.numberMaterials.push(numberMat);
    }
  }

  setupEffects() {
    const count = this.quality === 'low' ? 90 : this.quality === 'medium' ? 160 : 260;
    this.particleCount = count;
    const geo = new PlaneGeometry(0.16, 0.16);
    const mat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, side: DoubleSide, depthWrite: false });
    this.particles = new InstancedMesh(geo, mat, count);
    this.particles.frustumCulled = false;
    this.particles.instanceMatrix.setUsage(35048); // DynamicDrawUsage
    this.scene.add(this.particles);
    this.particleData = [];
    for (let i = 0; i < count; i += 1) {
      this.particleData.push({ life: 0, x: 0, y: -50, z: 0, vx: 0, vy: 0, vz: 0, spin: 0, rot: 0, scale: 1 });
    }
    this.particleCursor = 0;
    this.particleColors = new Float32Array(count * 3);
    this.particles.instanceColor = null;

    // ball trail
    const trailGeo = new PlaneGeometry(0.3, 0.3);
    const trailMat = new MeshBasicMaterial({ color: 0x8ef7e4, transparent: true, opacity: 0.22, blending: AdditiveBlending, depthWrite: false });
    this.trail = new InstancedMesh(trailGeo, trailMat, 12);
    this.trail.frustumCulled = false;
    this.scene.add(this.trail);
    this.trailData = new Array(12).fill(0).map(() => ({ x: 0, y: -50, z: 0, life: 0 }));
    this.trailIndex = 0;

    this.rng = mulberry32(12345);
    this.flashIntensity = 0;
  }

  spawnParticles(x, y, z, count, opts = {}) {
    const spread = opts.spread || 3;
    const up = opts.up || 4;
    for (let i = 0; i < count; i += 1) {
      const p = this.particleData[this.particleCursor];
      this.particleCursor = (this.particleCursor + 1) % this.particleCount;
      p.life = opts.life || 1.4;
      p.maxLife = p.life;
      p.x = x + (this.rng() - 0.5) * 0.6;
      p.y = y + this.rng() * 0.4;
      p.z = z + (this.rng() - 0.5) * 0.6;
      p.vx = (this.rng() - 0.5) * spread;
      p.vy = this.rng() * up + 1;
      p.vz = (this.rng() - 0.5) * spread;
      p.spin = (this.rng() - 0.5) * 8;
      p.rot = this.rng() * Math.PI;
      p.scale = opts.scale || 1;
    }
  }

  burst(kind, position, opts = {}) {
    if (kind === 'goal') {
      this.spawnParticles(position.x, position.y + 1, position.z, this.quality === 'low' ? 30 : 90, { spread: 7, up: 8, life: 2.6, scale: 1.4 });
      this.flashIntensity = 1;
      this.cameraDirector.addShake(0.7);
    } else if (kind === 'tackle') {
      this.spawnParticles(position.x, 0.12, position.z, this.quality === 'low' ? 6 : 14, { spread: 2.2, up: 1.6, life: 0.7, scale: 0.9 });
      this.cameraDirector.addShake(0.16);
    } else if (kind === 'kick') {
      this.spawnParticles(position.x, 0.12, position.z, this.quality === 'low' ? 3 : 6, { spread: 1.2, up: 1.0, life: 0.5, scale: 0.7 });
    } else if (kind === 'save') {
      this.spawnParticles(position.x, 1, position.z, this.quality === 'low' ? 8 : 18, { spread: 3, up: 3, life: 1.0 });
      this.cameraDirector.addShake(0.3);
    }
    void opts;
  }

  updateParticles(dt) {
    const count = this.particleCount;
    for (let i = 0; i < count; i += 1) {
      const p = this.particleData[i];
      if (p.life > 0) {
        p.life -= dt;
        p.vy -= 9.5 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.rot += p.spin * dt;
        if (p.y < 0.05) {
          p.y = 0.05;
          p.vy = Math.abs(p.vy) * 0.25;
          p.vx *= 0.7;
          p.vz *= 0.7;
        }
        const alpha = clamp(p.life / (p.maxLife || 1), 0, 1);
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rot, p.rot * 0.6, p.rot * 0.3);
        dummy.scale.setScalar(p.scale * (0.6 + alpha * 0.6));
      } else {
        dummy.position.set(0, -100, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      }
      dummy.updateMatrix();
      this.particles.setMatrixAt(i, dummy.matrix);
    }
    this.particles.instanceMatrix.needsUpdate = true;
    this.flashIntensity = Math.max(0, this.flashIntensity - dt * 1.8);
  }

  updateTrail(dt, ball) {
    const speed = Math.hypot(ball.velocity.x, ball.velocity.z);
    const active = speed > 12;
    if (active) {
      const slot = this.trailData[this.trailIndex];
      this.trailIndex = (this.trailIndex + 1) % this.trailData.length;
      slot.x = ball.position.x;
      slot.y = ball.position.y;
      slot.z = ball.position.z;
      slot.life = 0.28;
    }
    for (let i = 0; i < this.trailData.length; i += 1) {
      const slot = this.trailData[i];
      if (slot.life > 0) {
        slot.life -= dt;
        const a = clamp(slot.life / 0.28, 0, 1);
        dummy.position.set(slot.x, slot.y, slot.z);
        dummy.scale.setScalar(0.4 + a * 0.9);
        dummy.rotation.set(-Math.PI / 2, 0, 0);
      } else {
        dummy.position.set(0, -100, 0);
        dummy.scale.setScalar(0.001);
        dummy.rotation.set(0, 0, 0);
      }
      dummy.updateMatrix();
      this.trail.setMatrixAt(i, dummy.matrix);
    }
    this.trail.instanceMatrix.needsUpdate = true;
  }

  /** Push simulation state into the scene. */
  sync(match, dt, ctx = {}) {
    this.time += dt;
    for (let i = 0; i < match.players.length && i < this.playerModels.length; i += 1) {
      const player = match.players[i];
      const model = this.playerModels[i];
      if (player.sentOff) {
        model.group.visible = false;
        continue;
      }
      model.group.visible = true;
      model.group.position.set(player.pos.x, 0, player.pos.z);
      // dive rotation for keepers
      if (player.action && player.action.type === 'dive') {
        this.playerStates[i].diveDir = Math.sign(player.diveZ || 1) || 1;
      }
      animatePlayerModel(model, player.anim, dt, this.playerStates[i]);
      // number badge faces the camera side (cheap billboard around Y)
      const badge = model.group.children[model.group.children.length - 1];
      if (badge) badge.rotation.y = Math.PI + (match.ball.position.z > player.pos.z ? 0.25 : -0.25);
    }

    const controlled = match.controlledPlayer;
    if (controlled && !controlled.sentOff && ctx.showControlRing !== false) {
      this.controlRing.visible = true;
      this.controlRing.position.x = controlled.pos.x;
      this.controlRing.position.z = controlled.pos.z;
      this.controlRing.rotation.z = this.time * 1.2;
    } else {
      this.controlRing.visible = false;
    }

    const ball = match.ball;
    this.ball.position.copy(ball.position);
    this.ball.rotation.x = ball.rollAngle;
    this.ball.rotation.z = ball.rollAngle * 0.35;
    const height = Math.max(0, ball.position.y - 0.11);
    const scale = clamp(1 - height * 0.18, 0.4, 1);
    this.ballShadow.position.set(ball.position.x, 0.02, ball.position.z);
    this.ballShadow.scale.setScalar(scale);
    this.ballShadow.material.opacity = 0.32 * scale;

    this.updateParticles(dt);
    this.updateTrail(dt, ball);

    this.cameraDirector.update(dt, {
      ball,
      controlled: match.controlledPlayer,
      match,
      phase: match.state === 'celebration' ? 'celebration' : 'play',
    });
    if (match.state === 'celebration' && match.celebrationScorer) {
      this.cameraDirector.celebrateTarget = match.celebrationScorer;
    }

    this.stadium.update(this.time, dt);
    this.stadium.setScoreboard({
      home: match.teamNames[0],
      away: match.teamNames[1],
      score: match.score,
      clock: match.displayClock,
      period: match.half === 1 ? '1ST HALF' : '2ND HALF',
      primary: (ctx.primaryColor) || '#0fd6be',
      flash: this.flashIntensity,
    });
    this.stadium.excitement(ctx.excitement || 0);
  }

  setCameraMode(mode) {
    this.cameraDirector.setMode(mode);
  }

  setCameraSettings(settings) {
    this.cameraDirector.setSettings(settings);
  }

  resize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    if (!width || !height) return;
    this.renderer.setPixelRatio(this.pixelRatio());
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (this.disposed) return;
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener('resize', this._onResize);
    if (window.visualViewport) window.visualViewport.removeEventListener('resize', this._onResize);
    this.stadium.dispose();
    this.scene.traverse((child) => {
      if (child.geometry && child.geometry.dispose) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m.map && m.map.dispose && m.map !== this.stadium.disposables) m.map.dispose();
          m.dispose();
        }
      }
    });
    for (const mat of this.numberMaterials) if (mat.map) mat.map.dispose();
    this.renderer.dispose();
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

/**
 * Menu backdrop: a stadium with an orbiting camera and a couple of players
 * warming up, used behind the main menu.
 */
export class MenuScene {
  constructor(container, opts = {}) {
    this.container = container;
    this.quality = opts.quality === 'high' ? 'medium' : (opts.quality || 'medium');
    this.renderer = new WebGLRenderer({ antialias: false, powerPreference: 'high-performance', alpha: false, stencil: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.quality === 'low' ? 1 : 1.25));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = NoToneMapping;
    this.canvas = this.renderer.domElement;
    this.canvas.style.position = 'absolute';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    container.appendChild(this.canvas);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(38, 16 / 9, 0.5, 700);

    const tod = opts.timeOfDay || 'night';
    const preset = TIME_OF_DAY[tod] || TIME_OF_DAY.night;
    this.scene.add(new HemisphereLight(0xbfd8ff, 0x18240f, preset.ambient + 0.08));
    const sun = new DirectionalLight(preset.sunColor, preset.sun);
    sun.position.set(-50, 80, 30);
    this.scene.add(sun);
    this.scene.add(new AmbientLight(0xffffff, preset.night ? 0.26 : 0.18));
    this.scene.fog = new FogExp2(preset.fog, preset.night ? 0.0045 : 0.0032);
    this.scene.background = new Color(preset.sky);

    const club = opts.club || { primary: '#0fd6be', secondary: '#0a1626', accent: '#ffc940', gk: '#ffc940' };
    this.stadium = buildStadium({ quality: this.quality, timeOfDay: tod, homeClub: club, awayClub: club });
    this.scene.add(this.stadium.group);

    this.ball = new Mesh(new SphereGeometry(0.11, 14, 10), new MeshLambertMaterial({ map: createBallTexture() }));
    this.scene.add(this.ball);

    this.players = [];
    const detail = this.quality === 'low' ? 'low' : 'medium';
    for (let i = 0; i < 5; i += 1) {
      const isGK = i === 0;
      const model = buildPlayerModel({
        shirt: isGK ? (club.gk || '#ffc940') : club.primary,
        shorts: club.secondary,
        socks: club.secondary,
      }, { detail, seed: 20 + i, isGK });
      model.group.position.set(-8 + i * 6, 0, -2 + (i % 2) * 4);
      this.scene.add(model.group);
      this.players.push({ model, state: { swing: 0, lean: 0, celebrate: 0 }, phase: i * 1.4, speed: 2.4 });
    }

    this.time = 0;
    this.resize();
    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
  }

  update(dt) {
    this.time += dt;
    const a = this.time * 0.055;
    const radius = 46;
    this.camera.position.set(Math.cos(a) * radius, 17 + Math.sin(a * 0.7) * 2.5, Math.sin(a) * radius * 0.72 + 26);
    this.camera.lookAt(0, 2.5, 0);
    this.camera.fov = 40;
    this.camera.updateProjectionMatrix();

    // idlers jogging in a slow circle
    for (let i = 0; i < this.players.length; i += 1) {
      const p = this.players[i];
      const radius2 = 10 + i * 2.2;
      const angle = this.time * (0.25 + i * 0.05) + p.phase;
      p.model.group.position.set(Math.cos(angle) * radius2 - 6, 0, Math.sin(angle) * radius2 * 0.6 - 2);
      p.model.group.rotation.y = -angle + Math.PI / 2;
      animatePlayerModel(p.model, {
        speed: 3.2, phase: this.time * 7 + p.phase, action: 'run', actionProgress: 0, lean: 0.25, celebrate: 0,
      }, dt, p.state);
    }
    this.ball.position.set(0, 0.11 + Math.abs(Math.sin(this.time * 1.2)) * 0.02, 0);
    this.ball.rotation.x = this.time * 0.7;
    this.stadium.update(this.time, dt);
    return this;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.quality === 'low' ? 1 : 1.25));
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  setActive(active) {
    this.canvas.style.display = active ? 'block' : 'none';
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    this.stadium.dispose();
    this.scene.traverse((child) => {
      if (child.geometry && child.geometry.dispose) child.geometry.dispose();
      if (child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m.map && m.map.dispose) m.map.dispose();
          m.dispose();
        }
      }
    });
    this.renderer.dispose();
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}
