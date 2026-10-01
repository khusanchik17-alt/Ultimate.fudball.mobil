/**
 * Stadium builder: pitch, goals with nets, stands, instanced animated crowd,
 * floodlights, advertising boards (original in-house brands), scoreboard and
 * corner flags. Everything is procedural geometry + procedural textures.
 */
import {
  Group, Mesh, MeshLambertMaterial, MeshBasicMaterial, BoxGeometry, PlaneGeometry,
  CylinderGeometry, SphereGeometry, InstancedMesh, Matrix4, Quaternion, Vector3, Color,
  DoubleSide, AdditiveBlending, RepeatWrapping, InstancedBufferAttribute,
} from 'three';
import {
  createPitchTexture, createOutfieldTexture, createNetTexture, createAdBoardTexture,
  createCrowdTexture, createScoreboardCanvas, drawScoreboard, createSkyTexture,
} from './textures.js';
import { FIELD } from '../sim/constants.js';
import { mulberry32, clamp } from '../core/util.js';

const AD_BRANDS = [
  ['UFM SPORT', '#0fd6be', '#04121f'],
  ['SILK AIR', '#2b6cf6', '#031024'],
  ['TASHKENT TEA', '#ffc940', '#2a1a02'],
  ['ORBIT MOBILE', '#f2762e', '#1a0c03'],
  ['BUKHARA TRAVEL', '#1b8a5a', '#04150e'],
  ['STAR BANK', '#c8102e', '#1a0407'],
  ['QALDIZ GRID', '#5b2d8e', '#120722'],
  ['STEEL WORKS', '#8a939c', '#101418'],
];

/**
 * @param {object} opts { quality, timeOfDay, homeClub, awayClub }
 */
export function buildStadium(opts) {
  const quality = opts.quality || 'medium';
  const tod = opts.timeOfDay || 'night';
  const group = new Group();
  const rng = mulberry32(987654);
  const disposables = [];

  // ---------------------------------------------------------------- pitch
  const outfield = new Mesh(
    new PlaneGeometry(150, 110),
    new MeshLambertMaterial({ map: createOutfieldTexture() }),
  );
  outfield.rotation.x = -Math.PI / 2;
  outfield.position.y = -0.02;
  group.add(outfield);

  const pitch = new Mesh(
    new PlaneGeometry(FIELD.length, FIELD.width),
    new MeshLambertMaterial({ map: createPitchTexture(quality) }),
  );
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.y = 0;
  group.add(pitch);

  // ---------------------------------------------------------------- goals
  const netTexture = createNetTexture();
  const goalMaterial = new MeshLambertMaterial({ color: 0xf2f7ff });
  const netMaterial = new MeshBasicMaterial({
    map: netTexture, alphaMap: netTexture, transparent: true, opacity: 0.85,
    side: DoubleSide, depthWrite: false,
  });

  const buildGoal = (side) => {
    const goal = new Group();
    const x = side * FIELD.halfLength;
    const halfW = FIELD.goalWidth / 2;
    const postGeo = new CylinderGeometry(FIELD.postRadius, FIELD.postRadius, FIELD.goalHeight, 8);
    for (const z of [-halfW, halfW]) {
      const post = new Mesh(postGeo, goalMaterial);
      post.position.set(x, FIELD.goalHeight / 2, z);
      goal.add(post);
    }
    const barGeo = new CylinderGeometry(FIELD.postRadius, FIELD.postRadius, FIELD.goalWidth, 8);
    const bar = new Mesh(barGeo, goalMaterial);
    bar.rotation.z = Math.PI / 2;
    bar.position.set(x, FIELD.goalHeight, 0);
    goal.add(bar);

    const backX = x + side * FIELD.goalDepth;
    const netPlane = (w, h, px, py, pz, ry) => {
      const mesh = new Mesh(new PlaneGeometry(w, h), netMaterial);
      mesh.position.set(px, py, pz);
      mesh.rotation.y = ry;
      goal.add(mesh);
      return mesh;
    };
    netPlane(FIELD.goalWidth, FIELD.goalHeight, backX, FIELD.goalHeight / 2, 0, Math.PI / 2);
    netPlane(FIELD.goalDepth, FIELD.goalHeight, x + side * FIELD.goalDepth / 2, FIELD.goalHeight / 2, -halfW, 0);
    netPlane(FIELD.goalDepth, FIELD.goalHeight, x + side * FIELD.goalDepth / 2, FIELD.goalHeight / 2, halfW, 0);
    const top = netPlane(FIELD.goalWidth, FIELD.goalDepth, x + side * FIELD.goalDepth / 2, FIELD.goalHeight, 0, Math.PI / 2);
    top.rotation.x = Math.PI / 2;
    return goal;
  };
  const goalA = buildGoal(1);
  const goalB = buildGoal(-1);
  group.add(goalA, goalB);

  // ---------------------------------------------------------------- stands
  const standMaterial = new MeshLambertMaterial({ color: 0x1b2430 });
  const seatMaterialA = new MeshLambertMaterial({ color: new Color(opts.homeClub?.primary || '#0fd6be').multiplyScalar(0.55) });
  const seatMaterialB = new MeshLambertMaterial({ color: 0x101a26 });
  const roofMaterial = new MeshLambertMaterial({ color: 0x0d141d });

  const stands = [];
  const crowdTransforms = [];

  /** Builds one straight stand along an axis. */
  const buildStand = (side, opts2 = {}) => {
    const {
      length = 116, tiers = 4, startHeight = 3.2, tierDepth = 3.0, tierRise = 1.5,
      distance = 60, along = 'x', sign = 1, roof = false,
    } = opts2;
    const stand = new Group();
    let depthSoFar = 0;
    for (let t = 0; t < tiers; t += 1) {
      const height = startHeight + t * tierRise;
      const depth = tierDepth;
      const geo = new BoxGeometry(along === 'x' ? length : depth, height, along === 'x' ? depth : length);
      const mesh = new Mesh(geo, t % 2 === 0 ? seatMaterialA : seatMaterialB);
      const offset = distance + depthSoFar + depth / 2;
      const y = height / 2;
      if (along === 'x') {
        mesh.position.set(0, y, sign * offset);
      } else {
        mesh.position.set(sign * offset, y, 0);
      }
      stand.add(mesh);

      // crowd on the top surface of each tier
      const rows = Math.max(2, Math.round(depth / 1.1));
      const seats = Math.round(length / 1.35);
      for (let r = 0; r < rows; r += 1) {
        for (let s = 0; s < seats; s += 1) {
          if (rng() > (quality === 'low' ? 0.28 : quality === 'medium' ? 0.55 : 0.82)) continue;
          const lx = -length / 2 + 0.7 + s * 1.35 + (rng() - 0.5) * 0.3;
          const ld = -depth / 2 + 0.6 + r * 1.1;
          const y2 = height + 0.42;
          const color = new Color().setHSL(
            0.55 + (rng() - 0.5) * 0.5,
            0.35 + rng() * 0.4,
            0.35 + rng() * 0.45,
          );
          const matrix = new Matrix4();
          const q = new Quaternion();
          const pos = new Vector3();
          if (along === 'x') {
            pos.set(lx, y2, sign * (distance + depthSoFar + depth / 2 + ld * sign * -1));
            q.setFromAxisAngle(new Vector3(0, 1, 0), sign > 0 ? Math.PI : 0);
          } else {
            pos.set(sign * (distance + depthSoFar + depth / 2 + ld * sign * -1), y2, lx);
            q.setFromAxisAngle(new Vector3(0, 1, 0), sign > 0 ? -Math.PI / 2 : Math.PI / 2);
          }
          matrix.compose(pos, q, new Vector3(1, 1, 1));
          crowdTransforms.push({ matrix, color });
        }
      }
      depthSoFar += depth;
    }
    if (roof) {
      const roofMesh = new Mesh(
        new BoxGeometry(along === 'x' ? length + 6 : depthSoFar + 6, 0.6, along === 'x' ? depthSoFar + 6 : length + 6),
        roofMaterial,
      );
      const offset = distance + depthSoFar / 2;
      const y = startHeight + (tiers - 1) * tierRise + 7;
      if (along === 'x') roofMesh.position.set(0, y, sign * offset);
      else roofMesh.position.set(sign * offset, y, 0);
      stand.add(roofMesh);
      // roof supports
      for (const lx of [-length / 2 + 4, 0, length / 2 - 4]) {
        const support = new Mesh(new CylinderGeometry(0.35, 0.35, 7, 6), roofMaterial);
        if (along === 'x') support.position.set(lx, y - 3.5, sign * (distance + depthSoFar - 1));
        else support.position.set(sign * (distance + depthSoFar - 1), y - 3.5, lx);
        stand.add(support);
      }
    }
    stands.push(stand);
    return stand;
  };

  group.add(buildStand('north', { along: 'x', sign: -1, distance: 48, roof: true, tiers: 4, length: 120 }));
  group.add(buildStand('south', { along: 'x', sign: 1, distance: 48, roof: true, tiers: 4, length: 120 }));
  group.add(buildStand('west', { along: 'z', sign: -1, distance: 62, roof: false, tiers: 3, length: 118 }));
  group.add(buildStand('east', { along: 'z', sign: 1, distance: 62, roof: true, tiers: 3, length: 118 }));

  // ---------------------------------------------------------------- crowd
  const crowdTexture = createCrowdTexture();
  const crowdMaterial = new MeshBasicMaterial({
    map: crowdTexture, transparent: true, alphaTest: 0.35, side: DoubleSide, toneMapped: false,
  });
  const crowdGeometry = new PlaneGeometry(0.85, 1.25);
  crowdGeometry.translate(0, 0.62, 0);

  let crowdMesh = null;
  const crowdUniform = { value: 0 };
  if (crowdTransforms.length) {
    const count = quality === 'low' ? Math.min(900, crowdTransforms.length)
      : quality === 'medium' ? Math.min(2400, crowdTransforms.length)
        : Math.min(5200, crowdTransforms.length);
    crowdMesh = new InstancedMesh(crowdGeometry, crowdMaterial, count);
    const phase = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const t = crowdTransforms[i];
      crowdMesh.setMatrixAt(i, t.matrix);
      crowdMesh.setColorAt(i, t.color);
      phase[i * 3] = 0.6 + rng() * 1.8;      // speed
      phase[i * 3 + 1] = rng() * Math.PI * 2; // offset
      phase[i * 3 + 2] = rng();               // amplitude bias
    }
    crowdGeometry.setAttribute('aPhase', new InstancedBufferAttribute(phase, 3));
    crowdMesh.instanceMatrix.needsUpdate = true;
    if (crowdMesh.instanceColor) crowdMesh.instanceColor.needsUpdate = true;
    crowdMesh.frustumCulled = false;

    crowdMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = crowdUniform;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime;\nattribute vec3 aPhase;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          float bob = sin(uTime * aPhase.x + aPhase.y) * (0.035 + aPhase.z * 0.06);
          transformed.y *= 1.0 + bob;
          transformed.x *= 1.0 + bob * 0.6;`);
    };
    group.add(crowdMesh);
  }

  // ---------------------------------------------------------------- floodlights
  const towerMaterial = new MeshLambertMaterial({ color: 0x2a3442 });
  const lampMaterial = new MeshBasicMaterial({ color: tod === 'day' ? 0xdfe9f5 : 0xfff6d5 });
  const lampGlow = new MeshBasicMaterial({ color: 0xfff6d5, transparent: true, opacity: 0.35, blending: AdditiveBlending, depthWrite: false });
  const floodlights = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const tower = new Group();
      const mast = new Mesh(new CylinderGeometry(0.6, 1.0, 34, 8), towerMaterial);
      mast.position.y = 17;
      tower.add(mast);
      const panel = new Mesh(new BoxGeometry(7, 4.4, 0.8), lampMaterial);
      panel.position.set(0, 33, 0);
      tower.add(panel);
      const glow = new Mesh(new PlaneGeometry(16, 10), lampGlow);
      glow.position.set(0, 33, 0.6);
      glow.lookAt(new Vector3(0, 6, 0));
      tower.add(glow);
      tower.position.set(sx * 66, 0, sz * 48);
      tower.rotation.y = Math.atan2(-tower.position.x, -tower.position.z);
      group.add(tower);
      floodlights.push(tower);
    }
  }

  // ---------------------------------------------------------------- advertising
  const adGroup = new Group();
  const adGeo = new BoxGeometry(0, 0, 0);
  adGeo.dispose();
  const adMaterials = AD_BRANDS.map(([label, primary, secondary]) => new MeshBasicMaterial({
    map: createAdBoardTexture(label, primary, secondary),
  }));
  const boardHeight = 1.0;
  const boardDepth = 0.15;
  const makeBoard = (w, h, d, x, y, z, ry, index) => {
    const mesh = new Mesh(new BoxGeometry(w, h, d), adMaterials[index % adMaterials.length]);
    mesh.position.set(x, y, z);
    mesh.rotation.y = ry;
    adGroup.add(mesh);
  };
  const adOffset = 4.5;
  let adIndex = 0;
  for (const side of [-1, 1]) {
    const z = side * (FIELD.halfWidth + adOffset);
    const count = 8;
    const width = (FIELD.length + 8) / count;
    for (let i = 0; i < count; i += 1) {
      const x = -FIELD.halfLength - 4 + width * (i + 0.5);
      makeBoard(width - 0.6, boardHeight, boardDepth, x, boardHeight / 2, z, 0, adIndex);
      adIndex += 1;
    }
  }
  for (const side of [-1, 1]) {
    const x = side * (FIELD.halfLength + adOffset);
    const count = 5;
    const width = (FIELD.width + 4) / count;
    for (let i = 0; i < count; i += 1) {
      const z = -FIELD.halfWidth - 2 + width * (i + 0.5);
      makeBoard(width - 0.6, boardHeight, boardDepth, x, boardHeight / 2, z, Math.PI / 2, adIndex);
      adIndex += 1;
    }
  }
  group.add(adGroup);

  // ---------------------------------------------------------------- scoreboard
  const scoreboard = createScoreboardCanvas(quality === 'low' ? 512 : 1024, 256);
  const scoreMaterial = new MeshBasicMaterial({ map: scoreboard.texture, toneMapped: false });
  const scoreMesh = new Mesh(new PlaneGeometry(30, 7.5), scoreMaterial);
  scoreMesh.position.set(0, 22, -58);
  group.add(scoreMesh);
  const scoreBack = new Mesh(new BoxGeometry(31, 8.4, 0.7), new MeshLambertMaterial({ color: 0x0a121c }));
  scoreBack.position.set(0, 22, -58.5);
  group.add(scoreBack);

  // ---------------------------------------------------------------- extras
  const flagPoleMat = new MeshLambertMaterial({ color: 0xf4f7ff });
  const flagMat = new MeshBasicMaterial({ color: new Color(opts.homeClub?.accent || '#ffc940'), side: DoubleSide });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const pole = new Mesh(new CylinderGeometry(0.05, 0.05, FIELD.cornerFlagHeight, 6), flagPoleMat);
      pole.position.set(sx * (FIELD.halfLength - 0.3), FIELD.cornerFlagHeight / 2, sz * (FIELD.halfWidth - 0.3));
      group.add(pole);
      const flag = new Mesh(new PlaneGeometry(0.9, 0.55), flagMat);
      flag.position.set(sx * (FIELD.halfLength - 0.9), FIELD.cornerFlagHeight - 0.35, sz * (FIELD.halfWidth - 0.3));
      group.add(flag);
    }
  }

  // dugouts along the far touchline
  const benchMat = new MeshLambertMaterial({ color: 0x101a26 });
  for (const side of [-1, 1]) {
    for (const dir of [-1, 1]) {
      const dugout = new Group();
      const body = new Mesh(new BoxGeometry(7, 1.7, 1.6), benchMat);
      body.position.y = 0.85;
      dugout.add(body);
      const roof = new Mesh(new BoxGeometry(7.4, 0.15, 2.2), new MeshBasicMaterial({ color: 0x22303f }));
      roof.position.set(0, 1.9, 0.2);
      dugout.add(roof);
      dugout.position.set(dir * (FIELD.halfLength * 0.35), 0, side * (FIELD.halfWidth + 6.5));
      dugout.rotation.y = side > 0 ? Math.PI : 0;
      group.add(dugout);
    }
  }

  // sky backdrop
  const skyTop = tod === 'night' ? '#050b16' : tod === 'sunset' ? '#f2a25c' : '#79b8ea';
  const skyBottom = tod === 'night' ? '#0b1728' : tod === 'sunset' ? '#ffd9a0' : '#cfe6f7';
  const sky = new Mesh(
    new SphereGeometry(420, 24, 16),
    new MeshBasicMaterial({ map: createSkyTexture(skyTop, skyBottom), side: 1, depthWrite: false, toneMapped: false }),
  );
  sky.scale.y = 0.75;
  group.add(sky);

  // ---------------------------------------------------------------- api
  let scoreCache = '';
  return {
    group,
    pitch,
    crowdMesh,
    floodlights,
    disposables,
    update(time, dt) {
      crowdUniform.value = time;
    },
    setScoreboard(data) {
      const key = `${data.home}|${data.away}|${data.score[0]}|${data.score[1]}|${data.clock}|${data.period}|${data.flash > 0 ? 1 : 0}`;
      if (key === scoreCache) return;
      scoreCache = key;
      drawScoreboard(scoreboard.ctx, scoreboard.canvas, data);
      scoreboard.texture.needsUpdate = true;
    },
    get scoreboardMesh() {
      return scoreMesh;
    },
    setQuality() { /* reserved for future LOD swapping */ },
    excitement(value) {
      // future: crowd particle intensity
      void value;
    },
    dispose() {
      group.traverse((child) => {
        if (child.geometry && child.geometry.dispose) child.geometry.dispose();
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          for (const m of mats) {
            for (const key of ['map', 'alphaMap']) {
              if (m[key] && m[key].dispose) m[key].dispose();
            }
            m.dispose();
          }
        }
      });
    },
  };
}

export { clamp, RepeatWrapping };
