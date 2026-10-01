/**
 * Original fictional club database.
 * Every club, city, stadium and badge identity here is invented for this game -
 * nothing is derived from real leagues, clubs or licensed properties.
 */

/** @typedef {{id:string,name:string,short:string,city:string,stadium:string,capacity:number,rating:number,primary:string,secondary:string,accent:string,textOnPrimary:string,gk:string,formation:string,tier:number}} Club */

/** @type {Club[]} */
export const CLUBS = [
  {
    id: 'tashkent_wolves', name: 'Tashkent Wolves', short: 'TAS', city: 'Tashkent', stadium: 'Silk Road Arena',
    capacity: 42000, rating: 84, primary: '#0f4c81', secondary: '#f4f7fb', accent: '#ffc940', textOnPrimary: '#ffffff', gk: '#2fd0a5',
    formation: '4-3-3', tier: 1,
  },
  {
    id: 'samarkand_lions', name: 'Samarkand Lions', short: 'SAM', city: 'Samarkand', stadium: 'Registan Park',
    capacity: 38500, rating: 83, primary: '#c8102e', secondary: '#131313', accent: '#ffd24a', textOnPrimary: '#ffffff', gk: '#ffd24a',
    formation: '4-2-3-1', tier: 1,
  },
  {
    id: 'bukhara_falcons', name: 'Bukhara Falcons', short: 'BUK', city: 'Bukhara', stadium: 'Oasis Dome',
    capacity: 31000, rating: 81, primary: '#1b8a5a', secondary: '#f4f7fb', accent: '#0a2c1c', textOnPrimary: '#ffffff', gk: '#f2762e',
    formation: '4-4-2', tier: 1,
  },
  {
    id: 'khiva_sharks', name: 'Khiva Sharks', short: 'KHI', city: 'Khiva', stadium: 'Blue Gate Stadium',
    capacity: 27500, rating: 79, primary: '#0b6fbf', secondary: '#04121f', accent: '#6fd3ff', textOnPrimary: '#ffffff', gk: '#c22b3f',
    formation: '3-5-2', tier: 2,
  },
  {
    id: 'andijan_rockets', name: 'Andijan Rockets', short: 'AND', city: 'Andijan', stadium: 'Valley Stadium',
    capacity: 29500, rating: 80, primary: '#f2762e', secondary: '#14213d', accent: '#ffe0b2', textOnPrimary: '#0d0d0d', gk: '#4a6cf7',
    formation: '4-3-3', tier: 1,
  },
  {
    id: 'namangan_tigers', name: 'Namangan Tigers', short: 'NAM', city: 'Namangan', stadium: 'Fergana Bowl',
    capacity: 33000, rating: 82, primary: '#151515', secondary: '#ffc940', accent: '#ffffff', textOnPrimary: '#ffc940', gk: '#7ad0ff',
    formation: '4-2-3-1', tier: 1,
  },
  {
    id: 'nukus_ravens', name: 'Nukus Ravens', short: 'NUK', city: 'Nukus', stadium: 'Aral Arena',
    capacity: 24000, rating: 76, primary: '#5b2d8e', secondary: '#efe6ff', accent: '#c7b3ff', textOnPrimary: '#ffffff', gk: '#3fe0c0',
    formation: '4-4-2', tier: 2,
  },
  {
    id: 'fergana_storm', name: 'Fergana Storm', short: 'FER', city: 'Fergana', stadium: 'Storm Park',
    capacity: 26000, rating: 77, primary: '#1f9bd1', secondary: '#0b2233', accent: '#ffffff', textOnPrimary: '#ffffff', gk: '#ff8f4d',
    formation: '4-3-3', tier: 2,
  },
  {
    id: 'karakalpak_arrows', name: 'Karakalpak Arrows', short: 'KAR', city: 'Karakalpak', stadium: 'Steppe Field',
    capacity: 22000, rating: 74, primary: '#2f9e44', secondary: '#f4f7fb', accent: '#0f3d1c', textOnPrimary: '#ffffff', gk: '#ffd24a',
    formation: '4-4-2', tier: 3,
  },
  {
    id: 'zarafshan_united', name: 'Zarafshan United', short: 'ZAR', city: 'Zarafshan', stadium: 'Gold Mine Arena',
    capacity: 25500, rating: 78, primary: '#d9a300', secondary: '#171717', accent: '#fff3c4', textOnPrimary: '#131313', gk: '#5f6fff',
    formation: '4-2-3-1', tier: 2,
  },
  {
    id: 'chirchiq_oxen', name: 'Chirchiq Oxen', short: 'CHI', city: 'Chirchiq', stadium: 'Riverside Park',
    capacity: 21000, rating: 73, primary: '#7f3f1f', secondary: '#ffe9d6', accent: '#ffd9a8', textOnPrimary: '#ffffff', gk: '#2fd0a5',
    formation: '4-4-2', tier: 3,
  },
  {
    id: 'navoiy_comets', name: 'Navoiy Comets', short: 'NAV', city: 'Navoiy', stadium: 'Comet Stadium',
    capacity: 23500, rating: 75, primary: '#2b2f77', secondary: '#dfe4ff', accent: '#9aa6ff', textOnPrimary: '#ffffff', gk: '#ff6b6b',
    formation: '4-3-3', tier: 3,
  },
  {
    id: 'termez_meteors', name: 'Termez Meteors', short: 'TER', city: 'Termez', stadium: 'Southern Gate',
    capacity: 20500, rating: 72, primary: '#c2185b', secondary: '#ffffff', accent: '#ffd1e3', textOnPrimary: '#ffffff', gk: '#4dd0e1',
    formation: '4-4-2', tier: 3,
  },
  {
    id: 'gulistan_giants', name: 'Gulistan Giants', short: 'GUL', city: 'Gulistan', stadium: 'Giant Bowl',
    capacity: 28000, rating: 79, primary: '#0e7c66', secondary: '#08201a', accent: '#8ff0d8', textOnPrimary: '#ffffff', gk: '#ffb300',
    formation: '4-2-3-1', tier: 2,
  },
  {
    id: 'jizzakh_hawks', name: 'Jizzakh Hawks', short: 'JIZ', city: 'Jizzakh', stadium: 'Hawk Nest',
    capacity: 22000, rating: 74, primary: '#f9a825', secondary: '#1b1b1b', accent: '#fff8e1', textOnPrimary: '#131313', gk: '#5c6bc0',
    formation: '4-3-3', tier: 3,
  },
  {
    id: 'khorezm_kings', name: 'Khorezm Kings', short: 'KHO', city: 'Urgench', stadium: 'Royal Oasis',
    capacity: 26500, rating: 77, primary: '#6a1b9a', secondary: '#f3e5f5', accent: '#e1bee7', textOnPrimary: '#ffffff', gk: '#26c6da',
    formation: '4-4-2', tier: 2,
  },
];

/** Neutral, player-created club used for the manager's own team at the start. */
export const DEFAULT_CLUB = {
  id: 'player_club', name: 'UFM United', short: 'UFM', city: 'Tashkent', stadium: 'Ultimate Arena',
  capacity: 48000, rating: 78, primary: '#0fd6be', secondary: '#0a1626', accent: '#ffc940', textOnPrimary: '#04231f', gk: '#ffc940',
  formation: '4-3-3', tier: 1,
};

export const STADIUMS = [
  { id: 'ultimate_arena', name: 'Ultimate Arena', capacity: 48000 },
  { id: 'silk_road', name: 'Silk Road Arena', capacity: 42000 },
  { id: 'registan', name: 'Registan Park', capacity: 38500 },
  { id: 'oasis', name: 'Oasis Dome', capacity: 31000 },
  { id: 'storm', name: 'Storm Park', capacity: 26000 },
];

export function findClub(id) {
  if (id === DEFAULT_CLUB.id) return DEFAULT_CLUB;
  return CLUBS.find((c) => c.id === id) || DEFAULT_CLUB;
}

/** All selectable clubs (opponent pool). */
export const ALL_CLUBS = [DEFAULT_CLUB, ...CLUBS];
