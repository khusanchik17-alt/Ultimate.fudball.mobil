/**
 * Procedural player model: a low-poly humanoid built from primitives with a
 * hand-authored animation layer (run cycle, kicks, slide, dive, celebration).
 * No external meshes or rigs are used, everything is generated in code.
 */
import {
  Group, Mesh, MeshLambertMaterial, BoxGeometry, SphereGeometry, CylinderGeometry,
  CapsuleGeometry, Color, DoubleSide,
} from 'three';
import { clamp, damp, lerp, TAU } from '../core/util.js';

const SKIN_TONES = [0xf0c9a0, 0xe0ab7f, 0xc98a58, 0xa86b3d, 0x8a5433, 0x5f3a22, 0x3f2616];
const HAIR_COLORS = [0x1b1b1b, 0x2f2016, 0x4a3220, 0x6b4a2a, 0x0e0e0e, 0x8a6a3a];
const BOOT_COLORS = [0x111111, 0xffffff, 0xff3b30, 0x0fd6be, 0xffc940, 0x2b6cf6];

const geoCache = new Map();
function cached(key, factory) {
  if (!geoCache.has(key)) geoCache.set(key, factory());
  return geoCache.get(key);
}

/**
 * Builds one player.
 * @param {object} kit { shirt, shorts, socks, number }
 * @param {object} opts { detail: 'low'|'medium'|'high', seed, isGK, longSleeves }
 */
export function buildPlayerModel(kit, opts = {}) {
  const detail = opts.detail || 'high';
  const seed = opts.seed || 1;
  const rnd = (n) => {
    const v = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const skin = SKIN_TONES[Math.floor(rnd(1) * SKIN_TONES.length) % SKIN_TONES.length];
  const hair = HAIR_COLORS[Math.floor(rnd(2) * HAIR_COLORS.length) % HAIR_COLORS.length];
  const boots = BOOT_COLORS[Math.floor(rnd(3) * BOOT_COLORS.length) % BOOT_COLORS.length];

  const shirtMat = new MeshLambertMaterial({ color: new Color(kit.shirt || '#ffffff') });
  const shortMat = new MeshLambertMaterial({ color: new Color(kit.shorts || '#101820') });
  const sockMat = new MeshLambertMaterial({ color: new Color(kit.socks || kit.shorts || '#101820') });
  const skinMat = new MeshLambertMaterial({ color: skin });
  const hairMat = new MeshLambertMaterial({ color: hair });
  const bootMat = new MeshLambertMaterial({ color: boots });
  const keeperMat = opts.isGK ? new MeshLambertMaterial({ color: new Color(kit.gk || '#ffd24a') }) : shirtMat;

  const group = new Group();
  const body = new Group();
  group.add(body);

  // torso
  const torso = new Mesh(
    cached('torso', () => new BoxGeometry(0.36, 0.52, 0.22, 1, 1, 1)),
    keeperMat,
  );
  torso.position.y = 1.22;
  body.add(torso);

  // shoulders taper
  const collar = new Mesh(cached('collar', () => new CylinderGeometry(0.12, 0.16, 0.1, 8)), skinMat);
  collar.position.y = 1.5;
  body.add(collar);

  const head = new Mesh(cached('head', () => new SphereGeometry(0.115, detail === 'low' ? 8 : 12, detail === 'low' ? 6 : 10)), skinMat);
  head.position.y = 1.62;
  body.add(head);
  const hairMesh = new Mesh(cached('hair', () => new SphereGeometry(0.118, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6)), hairMat);
  hairMesh.position.y = 1.64;
  body.add(hairMesh);

  // limbs: geometry translated so the pivot sits at the joint
  const legGeo = cached('leg', () => {
    const g = new BoxGeometry(0.13, 0.44, 0.15);
    g.translate(0, -0.22, 0);
    return g;
  });
  const shinGeo = cached('shin', () => {
    const g = new BoxGeometry(0.11, 0.42, 0.13);
    g.translate(0, -0.21, 0);
    return g;
  });
  const bootGeo = cached('boot', () => {
    const g = new BoxGeometry(0.12, 0.09, 0.26);
    g.translate(0, -0.045, -0.05);
    return g;
  });
  const armGeo = cached('arm', () => {
    const g = new BoxGeometry(0.10, 0.44, 0.11);
    g.translate(0, -0.22, 0);
    return g;
  });

  const makeLeg = (side) => {
    const hip = new Group();
    hip.position.set(side * 0.1, 0.98, 0);
    const thigh = new Mesh(legGeo, shortMat);
    hip.add(thigh);
    const knee = new Group();
    knee.position.y = -0.44;
    hip.add(knee);
    const shin = new Mesh(shinGeo, sockMat);
    knee.add(shin);
    const boot = new Mesh(bootGeo, bootMat);
    boot.position.y = -0.42;
    knee.add(boot);
    body.add(hip);
    return { hip, knee, boot };
  };

  const makeArm = (side) => {
    const shoulder = new Group();
    shoulder.position.set(side * 0.22, 1.44, 0);
    const arm = new Mesh(armGeo, opts.longSleeves || opts.isGK ? keeperMat : skinMat);
    shoulder.add(arm);
    body.add(shoulder);
    return { shoulder };
  };

  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);
  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);

  if (detail === 'low') {
    // cheap variant: hide the lower legs, animate only hips/arms
    leftLeg.knee.visible = false;
    rightLeg.knee.visible = false;
    const shinReplacement = new Mesh(shinGeo, sockMat);
    shinReplacement.position.y = -0.44;
    leftLeg.hip.add(shinReplacement.clone());
    rightLeg.hip.add(shinReplacement);
  }

  // soft contact shadow (cheaper and more readable than shadow maps)
  const shadow = new Mesh(
    cached('shadow', () => new BoxGeometry(0.62, 0.01, 0.62)),
    new MeshLambertMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false }),
  );
  shadow.position.y = 0.02;
  group.add(shadow);

  group.scale.setScalar(1);
  return {
    group,
    parts: { body, torso, head, leftLeg, rightLeg, leftArm, rightArm, shadow },
    materials: { shirtMat, shortMat, sockMat, skinMat, keeperMat },
    style: { skin, hair, boots },
    radius: 0.42,
  };
}

/**
 * Applies one frame of animation.
 * @param {object} model result of buildPlayerModel
 * @param {object} anim MatchPlayer.anim  { speed, phase, action, actionProgress, lean, celebrate }
 * @param {number} dt
 * @param {object} state scratch object per player (keeps smoothing state)
 */
export function animatePlayerModel(model, anim, dt, state = {}) {
  const { parts } = model;
  const speed = clamp(anim.speed || 0, 0, 10);
  const phase = anim.phase || 0;
  const action = anim.action || 'idle';
  const progress = clamp(anim.actionProgress || 0, 0, 1);
  const runAmount = clamp(speed / 7, 0, 1.35);

  state.swing = damp(state.swing === undefined ? 0 : state.swing, runAmount, 8, dt);
  state.lean = damp(state.lean === undefined ? 0 : state.lean, anim.lean || runAmount * 0.3, 6, dt);
  state.celebrate = damp(state.celebrate === undefined ? 0 : state.celebrate, anim.celebrate || 0, 5, dt);

  const swing = state.swing;
  const sinPhase = Math.sin(phase);
  const cosPhase = Math.cos(phase);

  // base pose
  let bodyRotX = state.lean * 0.5 + swing * 0.16;
  let bodyRotZ = 0;
  let bodyY = 0;
  let leftHip = sinPhase * (0.85 * swing + 0.05);
  let rightHip = -sinPhase * (0.85 * swing + 0.05);
  let leftKnee = Math.max(0, -Math.sin(phase - 0.6)) * (0.9 * swing) + 0.08;
  let rightKnee = Math.max(0, -Math.sin(phase - 0.6 + Math.PI)) * (0.9 * swing) + 0.08;
  let leftArm = -sinPhase * (0.7 * swing) - 0.06;
  let rightArm = sinPhase * (0.7 * swing) - 0.06;
  let leftArmZ = 0.06;
  let rightArmZ = -0.06;

  // idle motion
  if (swing < 0.12) {
    const breathe = Math.sin(phase * 0.35) * 0.03;
    bodyY += breathe;
    leftArm = breathe * 1.6 - 0.05;
    rightArm = -breathe * 1.6 - 0.05;
  }

  switch (action) {
    case 'shoot':
    case 'finesse':
    case 'chip': {
      // back swing then strike with the right leg
      const swingCurve = progress < 0.45
        ? -1.15 * (progress / 0.45)
        : lerp(-1.15, 1.35, (progress - 0.45) / 0.55);
      rightHip = swingCurve;
      rightKnee = progress < 0.45 ? 1.15 : 0.25;
      leftHip = -0.25;
      leftKnee = 0.2;
      leftArm = 0.9;
      rightArm = -0.5;
      bodyRotX += 0.12;
      bodyRotZ = -0.12 * clamp(progress, 0, 1);
      break;
    }
    case 'pass':
    case 'through':
    case 'lob':
    case 'cross': {
      const p = progress;
      rightHip = p < 0.4 ? -0.5 * (p / 0.4) : lerp(-0.5, 0.95, (p - 0.4) / 0.6);
      rightKnee = 0.4;
      leftHip = -0.15;
      leftArm = 0.45;
      rightArm = -0.3;
      break;
    }
    case 'tackle': {
      leftHip = -0.7;
      rightHip = 0.5;
      bodyRotX += 0.35;
      bodyY -= 0.08;
      leftArm = 1.1;
      rightArm = 0.8;
      break;
    }
    case 'slide': {
      bodyRotX = -1.15;
      bodyY = 0.22 - progress * 0.05;
      leftHip = 0.35;
      rightHip = -0.15;
      leftKnee = 0.1;
      rightKnee = 0.45;
      leftArm = 1.4;
      rightArm = -1.2;
      break;
    }
    case 'dive': {
      bodyRotZ = (state.diveDir || 1) * (0.6 + progress * 0.9);
      bodyY = 0.1 + Math.sin(Math.min(1, progress) * Math.PI) * 0.35;
      leftArm = -2.2;
      rightArm = -2.2;
      leftHip = 0.4;
      rightHip = -0.2;
      break;
    }
    case 'head': {
      bodyRotX += 0.3;
      bodyY += 0.12;
      leftArm = -1.2;
      rightArm = -1.2;
      break;
    }
    default:
      break;
  }

  // celebration overrides everything
  if (state.celebrate > 0.02) {
    const c = state.celebrate;
    const jump = Math.max(0, Math.sin(phase * 2.2)) * 0.35 * c;
    leftArm = lerp(leftArm, -2.6, c);
    rightArm = lerp(rightArm, -2.6, c);
    leftHip = lerp(leftHip, sinPhase * 0.35, c);
    rightHip = lerp(rightHip, -sinPhase * 0.35, c);
    bodyY += jump;
    bodyRotX = lerp(bodyRotX, -0.1, c);
  }

  parts.body.rotation.x = bodyRotX;
  parts.body.rotation.z = bodyRotZ;
  parts.body.position.y = bodyY;
  parts.leftLeg.hip.rotation.x = leftHip;
  parts.rightLeg.hip.rotation.x = rightHip;
  if (parts.leftLeg.knee) parts.leftLeg.knee.rotation.x = -leftKnee;
  if (parts.rightLeg.knee) parts.rightLeg.knee.rotation.x = -rightKnee;
  parts.leftArm.shoulder.rotation.x = leftArm;
  parts.rightArm.shoulder.rotation.x = rightArm;
  parts.leftArm.shoulder.rotation.z = leftArmZ + (state.celebrate > 0.02 ? 0.2 * state.celebrate : 0);
  parts.rightArm.shoulder.rotation.z = rightArmZ - (state.celebrate > 0.02 ? 0.2 * state.celebrate : 0);
  // subtle sideways sway while running
  parts.body.rotation.y = cosPhase * 0.08 * swing;
  if (parts.shadow) {
    parts.shadow.rotation.x = -parts.body.rotation.x * 0.2;
  }
  return state;
}

export { TAU, DoubleSide };
