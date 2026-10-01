/**
 * Physical constants and tuning for the match simulation.
 * Units: metres, seconds, m/s. Field is 105 x 68 m with the origin at the centre.
 */

export const FIELD = {
  length: 105,
  width: 68,
  goalWidth: 7.32,
  goalHeight: 2.44,
  goalDepth: 2.0,
  postRadius: 0.06,
  penaltyAreaDepth: 16.5,
  penaltyAreaWidth: 40.32,
  goalAreaDepth: 5.5,
  goalAreaWidth: 18.32,
  penaltySpot: 11,
  centerCircle: 9.15,
  cornerArc: 1.0,
  cornerFlagHeight: 1.5,
  get halfLength() {
    return this.length / 2;
  },
  get halfWidth() {
    return this.width / 2;
  },
};

export const BALL = {
  radius: 0.11,
  mass: 0.43,
  gravity: 14.5,           // slightly stronger than real g: arcade-lite, snappier arcs
  airDrag: 0.045,          // quadratic drag coefficient
  rollFriction: 5.2,       // m/s^2 deceleration on grass
  bounce: 0.52,
  bounceFriction: 0.74,    // horizontal loss on bounce
  spinMagnus: 0.085,
  maxSpeed: 40,
  controlHeight: 1.75,     // above this the ball cannot be controlled with feet
};

export const PLAYER = {
  radius: 0.42,
  baseSpeed: 5.6,        // jog (m/s) - scaled by pace attribute
  sprintSpeed: 8.3,      // sprint (m/s)
  accel: 11.5,
  decel: 14.0,
  turnRate: 7.2,         // rad/s
  controlRadius: 1.05,   // receive / steal radius
  tackleRadius: 1.5,
  tackleDuration: 0.42,
  tackleRecover: 0.55,
  slideDuration: 0.75,
  slideRecover: 1.1,
  gkReach: 2.95,
  catchChance: 0.55,
  staminaDrainSprint: 7.0,
  staminaDrainRun: 2.6,
  staminaRecover: 5.5,
  maxSpeedByPace: 0.128, // speed factor = 0.72 + pace * this
};

export const MATCH = {
  defaultMinutes: 4,      // real-time minutes for a 90 minute match
  halfCount: 2,
  stoppageBase: 25,       // game seconds of stoppage per half (scaled)
  celebrationTime: 4.2,
  restartDelay: 1.4,
  outOfPlayDelay: 0.7,
  maxSubstitutes: 5,
};

/** Difficulty presets: AI quality, error and physical scaling. */
export const DIFFICULTY = {
  EASY: {
    key: 'EASY',
    label: 'common.easy',
    reaction: 0.42,
    decisionInterval: 0.30,
    passError: 0.165,
    shotError: 0.22,
    pressIntensity: 0.62,
    aggression: 0.5,
    supportRuns: 0.55,
    speedScale: 0.92,
    staminaScale: 0.95,
    gkReflex: 0.72,
    gkPositioning: 0.68,
    xgBonus: -0.06,
    tackleSkill: 0.55,
    rewardMultiplier: 0.7,
    shootRange: 26,
  },
  NORMAL: {
    key: 'NORMAL',
    label: 'common.normal',
    reaction: 0.28,
    decisionInterval: 0.22,
    passError: 0.105,
    shotError: 0.15,
    pressIntensity: 0.74,
    aggression: 0.62,
    supportRuns: 0.68,
    speedScale: 0.96,
    staminaScale: 0.98,
    gkReflex: 0.82,
    gkPositioning: 0.78,
    xgBonus: -0.05,
    tackleSkill: 0.68,
    rewardMultiplier: 1.0,
    shootRange: 28,
  },
  HARD: {
    key: 'HARD',
    label: 'common.hard',
    reaction: 0.18,
    decisionInterval: 0.16,
    passError: 0.072,
    shotError: 0.10,
    pressIntensity: 0.85,
    aggression: 0.72,
    supportRuns: 0.80,
    speedScale: 1.0,
    staminaScale: 1.0,
    gkReflex: 0.90,
    gkPositioning: 0.86,
    xgBonus: 0.06,
    tackleSkill: 0.79,
    rewardMultiplier: 1.45,
    shootRange: 30,
  },
  PRO: {
    key: 'PRO',
    label: 'common.pro',
    reaction: 0.12,
    decisionInterval: 0.12,
    passError: 0.046,
    shotError: 0.065,
    pressIntensity: 0.93,
    aggression: 0.80,
    supportRuns: 0.90,
    speedScale: 1.03,
    staminaScale: 1.04,
    gkReflex: 0.95,
    gkPositioning: 0.92,
    xgBonus: 0.14,
    tackleSkill: 0.87,
    rewardMultiplier: 2.0,
    shootRange: 32,
  },
  LEGENDARY: {
    key: 'LEGENDARY',
    label: 'common.legendary',
    reaction: 0.07,
    decisionInterval: 0.09,
    passError: 0.028,
    shotError: 0.04,
    pressIntensity: 1.0,
    aggression: 0.9,
    supportRuns: 1.0,
    speedScale: 1.06,
    staminaScale: 1.08,
    gkReflex: 1.0,
    gkPositioning: 0.98,
    xgBonus: 0.22,
    tackleSkill: 0.94,
    rewardMultiplier: 2.8,
    shootRange: 34,
  },
};

export const DIFFICULTY_ORDER = ['EASY', 'NORMAL', 'HARD', 'PRO', 'LEGENDARY'];

export function getDifficulty(key) {
  return DIFFICULTY[key] || DIFFICULTY.NORMAL;
}

/** Kit / presentation presets for the match scene. */
export const TIME_OF_DAY = {
  day: { ambient: 0.55, sun: 1.15, sunColor: 0xfff6e0, sky: 0x87c7f0, fog: 0xbcd9ef, fogNear: 90, fogFar: 320, night: false },
  sunset: { ambient: 0.42, sun: 0.95, sunColor: 0xffb066, sky: 0xf0a86a, fog: 0xd79a72, fogNear: 75, fogFar: 280, night: false },
  night: { ambient: 0.30, sun: 0.55, sunColor: 0xdfe9ff, sky: 0x0a1424, fog: 0x0a1424, fogNear: 60, fogFar: 240, night: true },
};
