/**
 * Formations. Slot coordinates are normalised:
 *   x: 0 = own goal line, 1 = opponent goal line
 *   z: -1 = left touchline, +1 = right touchline (from the attacking direction)
 * The simulation converts these to world space per team direction.
 */

export const FORMATIONS = {
  '4-3-3': {
    name: '4-3-3',
    style: 'attack',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'LB', x: 0.22, z: -0.62 },
      { role: 'CB', x: 0.17, z: -0.20 },
      { role: 'CB', x: 0.17, z: 0.20 },
      { role: 'RB', x: 0.22, z: 0.62 },
      { role: 'CDM', x: 0.34, z: 0.0 },
      { role: 'CM', x: 0.44, z: -0.34 },
      { role: 'CM', x: 0.44, z: 0.34 },
      { role: 'LW', x: 0.70, z: -0.72 },
      { role: 'ST', x: 0.79, z: 0.0 },
      { role: 'RW', x: 0.70, z: 0.72 },
    ],
  },
  '4-4-2': {
    name: '4-4-2',
    style: 'balanced',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'LB', x: 0.21, z: -0.64 },
      { role: 'CB', x: 0.16, z: -0.20 },
      { role: 'CB', x: 0.16, z: 0.20 },
      { role: 'RB', x: 0.21, z: 0.64 },
      { role: 'LM', x: 0.46, z: -0.68 },
      { role: 'CM', x: 0.40, z: -0.20 },
      { role: 'CM', x: 0.40, z: 0.20 },
      { role: 'RM', x: 0.46, z: 0.68 },
      { role: 'ST', x: 0.78, z: -0.16 },
      { role: 'ST', x: 0.78, z: 0.16 },
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    style: 'balanced',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'LB', x: 0.22, z: -0.64 },
      { role: 'CB', x: 0.17, z: -0.20 },
      { role: 'CB', x: 0.17, z: 0.20 },
      { role: 'RB', x: 0.22, z: 0.64 },
      { role: 'CDM', x: 0.34, z: -0.20 },
      { role: 'CDM', x: 0.34, z: 0.20 },
      { role: 'LM', x: 0.60, z: -0.66 },
      { role: 'CAM', x: 0.62, z: 0.0 },
      { role: 'RM', x: 0.60, z: 0.66 },
      { role: 'ST', x: 0.81, z: 0.0 },
    ],
  },
  '4-3-1-2': {
    name: '4-3-1-2',
    style: 'balanced',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'LB', x: 0.22, z: -0.62 },
      { role: 'CB', x: 0.16, z: -0.18 },
      { role: 'CB', x: 0.16, z: 0.18 },
      { role: 'RB', x: 0.22, z: 0.62 },
      { role: 'CM', x: 0.40, z: -0.38 },
      { role: 'CM', x: 0.36, z: 0.0 },
      { role: 'CM', x: 0.40, z: 0.38 },
      { role: 'CAM', x: 0.60, z: 0.0 },
      { role: 'ST', x: 0.80, z: -0.18 },
      { role: 'ST', x: 0.80, z: 0.18 },
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    style: 'attack',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'CB', x: 0.17, z: -0.28 },
      { role: 'CB', x: 0.15, z: 0.0 },
      { role: 'CB', x: 0.17, z: 0.28 },
      { role: 'LM', x: 0.48, z: -0.80 },
      { role: 'CDM', x: 0.36, z: 0.0 },
      { role: 'CM', x: 0.46, z: -0.30 },
      { role: 'CM', x: 0.46, z: 0.30 },
      { role: 'RM', x: 0.48, z: 0.80 },
      { role: 'ST', x: 0.79, z: -0.16 },
      { role: 'ST', x: 0.79, z: 0.16 },
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    style: 'defensive',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'LB', x: 0.24, z: -0.74 },
      { role: 'CB', x: 0.15, z: -0.30 },
      { role: 'CB', x: 0.13, z: 0.0 },
      { role: 'CB', x: 0.15, z: 0.30 },
      { role: 'RB', x: 0.24, z: 0.74 },
      { role: 'CM', x: 0.42, z: -0.30 },
      { role: 'CDM', x: 0.36, z: 0.0 },
      { role: 'CM', x: 0.42, z: 0.30 },
      { role: 'ST', x: 0.78, z: -0.16 },
      { role: 'ST', x: 0.78, z: 0.16 },
    ],
  },
  '4-5-1': {
    name: '4-5-1',
    style: 'defensive',
    slots: [
      { role: 'GK', x: 0.05, z: 0.0 },
      { role: 'LB', x: 0.22, z: -0.64 },
      { role: 'CB', x: 0.16, z: -0.20 },
      { role: 'CB', x: 0.16, z: 0.20 },
      { role: 'RB', x: 0.22, z: 0.64 },
      { role: 'LM', x: 0.46, z: -0.72 },
      { role: 'CDM', x: 0.36, z: -0.14 },
      { role: 'CM', x: 0.44, z: 0.10 },
      { role: 'CAM', x: 0.50, z: 0.44 },
      { role: 'RM', x: 0.46, z: 0.72 },
      { role: 'ST', x: 0.80, z: 0.0 },
    ],
  },
};

export const FORMATION_NAMES = Object.keys(FORMATIONS);

export function getFormation(name) {
  return FORMATIONS[name] || FORMATIONS['4-3-3'];
}

/**
 * Converts a normalised slot to world coordinates for the given team direction.
 * @param {{x:number,z:number}} slot
 * @param {number} dir  +1 when the team attacks the +X goal, -1 otherwise
 */
export function slotToWorld(slot, dir, field) {
  const halfLength = field.length / 2;
  const halfWidth = field.width / 2;
  const depth = field.depth || 0;
  const x = dir > 0
    ? -halfLength + slot.x * field.length - depth
    : halfLength - slot.x * field.length + depth;
  const z = dir > 0 ? slot.z * halfWidth : -slot.z * halfWidth;
  return { x, z };
}

/**
 * Team-shape target: base slot shifted by ball position (the whole block slides
 * towards the ball side) and phase offsets (attack pushes up, defence drops back).
 */
export function shapedTarget(slot, ctx, out = { x: 0, z: 0 }) {
  const { field, dir, ballX, ballZ, phase, attackScale = 1, defendScale = 1 } = ctx;
  const base = slotToWorld(slot, dir, field);
  const bx = Math.max(-1, Math.min(1, ballX / (field.length / 2)));
  const bz = Math.max(-1, Math.min(1, ballZ / (field.width / 2)));

  // slide the block with the ball (x more than z, like a real defensive block)
  const slideX = bx * 4.2 * attackScale;
  const slideZ = bz * 5.0;

  let pushX = 0;
  if (phase === 'attack') pushX = 12.5 * attackScale * (0.45 + 0.55 * slot.x);
  else if (phase === 'defend') pushX = -4.5 * defendScale * (0.5 + 0.5 * (1 - slot.x));
  else pushX = 0.8 * attackScale;

  // keep some cover: the defensive line never goes past the ball
  out.x = base.x + slideX + pushX;
  out.z = base.z + slideZ;

  const halfLength = field.length / 2;
  const halfWidth = field.width / 2;
  out.x = Math.max(-halfLength + 1.5, Math.min(halfLength - 1.5, out.x));
  out.z = Math.max(-halfWidth + 1.5, Math.min(halfWidth - 1.5, out.z));
  return out;
}
