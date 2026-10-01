// Game identity. Rebrand by editing this single file.
export const GAME = {
  id: 'ufm',
  name: 'Ultimate Football Mobile',
  shortName: 'UFM',
  tagline: 'Own The Pitch',
  version: '1.0.0',
  saveKey: 'ufm_save_v1',
  season: 'Season 2026'
};

// Pitch dimensions (metres) — FIFA standard.
export const PITCH = {
  length: 105, width: 68,
  goalWidth: 7.32, goalHeight: 2.44, goalDepth: 2.1,
  boxW: 40.3, boxD: 16.5, box6W: 18.32, box6D: 5.5
};

export const HALF_LEN = PITCH.length / 2;
export const HALF_W = PITCH.width / 2;
export const GOAL_HALF = PITCH.goalWidth / 2;

// Match clock: how many real seconds per full match (2 halves).
export const MATCH_LENGTHS = { short: 180, normal: 300, long: 480 };

export const QUALITY = {
  low:    { label: 'LOW',    pixelRatio: 0.8, shadows: false, crowd: 1600, fx: false },
  medium: { label: 'MEDIUM', pixelRatio: 1.0, shadows: false, crowd: 3600, fx: true },
  high:   { label: 'HIGH',   pixelRatio: 1.35, shadows: true, crowd: 6800, fx: true }
};
