/**
 * MatchSim - the rules engine and world update loop.
 *
 * Responsibilities:
 *  - owns the ball, the 22 players, the clock and the score
 *  - runs both team AIs (or lets human input drive one player)
 *  - implements goals, kick-offs, throw-ins, corners, goal kicks, free kicks,
 *    penalties, offside, fouls, half time and full time
 *  - collects match statistics and per-player ratings
 */
import { Vector3 } from 'three';
import { Ball } from './ball.js';
import { MatchPlayer } from './player.js';
import { TeamAI } from './ai.js';
import { FIELD, PLAYER, BALL, MATCH, getDifficulty } from './constants.js';
import { getFormation, slotToWorld } from './formations.js';
import { EventBus } from '../core/events.js';
import { clamp, clamp01, mulberry32, gaussian, len2, wrapAngle } from '../core/util.js';
import { passToPlayer, shootAtPoint, clearBall, goalkeeperSave, goalAimPoint, throwIn } from './actions.js';

export const MATCH_STATE = {
  KICKOFF: 'kickoff',
  PLAY: 'play',
  SETPIECE: 'setpiece',
  CELEBRATION: 'celebration',
  HALFTIME: 'halftime',
  FULLTIME: 'fulltime',
};

const tmp = new Vector3();
const tmp2 = new Vector3();

export class MatchSim {
  /**
   * @param {object} config
   * @param {object} config.home   { club, lineup: PlayerData[11], bench: [], formation: string }
   * @param {object} config.away   same shape
   * @param {string} config.difficulty
   * @param {number} config.minutes       real minutes for a 90' match
   * @param {number} [config.seed]
   * @param {number|null} [config.humanTeam]  0 / 1 / null (CPU vs CPU demo)
   * @param {object} [config.options]  { freePlay, noOutOfPlay, infiniteStamina, noFouls, training }
   */
  constructor(config) {
    this.config = config;
    this.events = new EventBus();
    this.rng = mulberry32(config.seed || 1337);
    this.options = config.options || {};
    this.minutes = config.minutes || MATCH.defaultMinutes;
    this.timeScale = (90 * 60) / (this.minutes * 60);
    this.humanTeam = config.humanTeam === undefined ? 0 : config.humanTeam;
    this.difficultyKey = config.difficulty || 'NORMAL';
    this.difficulty = getDifficulty(this.difficultyKey);
    this.difficulties = [
      this.humanTeam === 0 ? { ...this.difficulty, passError: 0, shotError: 0, decisionInterval: 0.1 } : this.difficulty,
      this.humanTeam === 1 ? { ...this.difficulty, passError: 0, shotError: 0, decisionInterval: 0.1 } : this.difficulty,
    ];
    this.ball = new Ball();
    this.players = [];
    this.score = [0, 0];
    this.ownGoals = [0, 0];
    this.half = 1;
    this.clockSeconds = 0;
    this.totalSeconds = 90 * 60;
    this.stoppage = [0, 0];
    this.state = MATCH_STATE.KICKOFF;
    this.stateTimer = 0;
    this.restart = null;
    this.lastPossessionTeam = 0;
    this.pendingPass = null;
    this.pendingShot = null;
    this.pendingOffside = null;
    this.tackleContest = null;
    this.controlledPlayerId = null;
    this.switchLock = 0;
    this.stats = [
      this.emptyStats(),
      this.emptyStats(),
    ];
    this.timeline = [];
    this.restartCounts = { throw_in: 0, corner: 0, goal_kick: 0, free_kick: 0, penalty: 0, kickoff: 0 };
    this.passOutcomes = { created: 0, completed: 0, intercepted: 0, out: 0, timeout: 0, sameTeam: 0 };
    this.simTime = 0;
    this.finished = false;
    this.halfTimeShown = false;
    this.whistleTimer = 0;
    this.kickoffTeam = 0;
    this.teamNames = [config.home.name || 'HOME', config.away.name || 'AWAY'];

    this.buildTeams();
    this.setupKickoff(0, true);
  }

  emptyStats() {
    return {
      shots: 0, shotsOnTarget: 0, passes: 0, passesCompleted: 0, assists: 0, tackles: 0, fouls: 0,
      corners: 0, offsides: 0, saves: 0, possessionTime: 0, yellows: 0, reds: 0,
    };
  }

  /** Alias used by the action layer (game seconds). */
  get time() {
    return this.clockSeconds;
  }

  dirOf(team) {
    const base = team === 0 ? 1 : -1;
    // teams switch ends at half time
    return this.half === 1 ? base : -base;
  }

  difficultyFor(team) {
    return this.difficulties[team] || this.difficulty;
  }

  // ------------------------------------------------------------------
  // Setup
  // ------------------------------------------------------------------
  buildTeams() {
    const cfg = this.config;
    for (const teamIndex of [0, 1]) {
      const teamCfg = teamIndex === 0 ? cfg.home : cfg.away;
      const formation = getFormation(teamCfg.formation || '4-3-3');
      const dir = teamIndex === 0 ? 1 : -1;
      const lineup = teamCfg.lineup && teamCfg.lineup.length
        ? teamCfg.lineup
        : [];
      formation.slots.forEach((slot, index) => {
        const data = lineup[index] || { name: `Player ${index + 1}`, position: slot.role, stats: defaultStats(slot.role), id: `auto_${teamIndex}_${index}` };
        const player = new MatchPlayer({
          data,
          team: teamIndex,
          dir,
          slot,
          slotIndex: index,
          isGK: slot.role === 'GK' || data.position === 'GK' && index === 0,
          number: data.number || index + 1,
          speedScale: this.difficultyFor(teamIndex).speedScale,
          staminaScale: this.difficultyFor(teamIndex).staminaScale,
        });
        const world = slotToWorld(slot, dir, FIELD);
        player.pos.set(world.x, 0, world.z);
        player.homePosition.set(world.x, 0, world.z);
        this.players.push(player);
      });
      const isHuman = this.humanTeam === teamIndex;
      const ai = new TeamAI(this, teamIndex, this.difficultyFor(teamIndex), { manual: isHuman });
      if (teamIndex === 0) this.homeAI = ai;
      else this.awayAI = ai;
    }
    if (this.humanTeam !== null && this.humanTeam !== undefined) {
      this.switchControlled(this.nearestPlayerToBall(this.humanTeam));
    }
  }

  get ai() {
    return [this.homeAI, this.awayAI];
  }

  teamPlayers(team) {
    return this.players.filter((p) => p.team === team);
  }

  nearestPlayerToBall(team, excludeGK = false) {
    let best = null;
    let bestD = Infinity;
    for (const p of this.players) {
      if (p.team !== team) continue;
      if (excludeGK && p.isGK) continue;
      const d = p.distanceToBall(this.ball);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best;
  }

  playerById(id) {
    return this.players.find((p) => p.id === id) || null;
  }

  // ------------------------------------------------------------------
  // Restarts & state machine
  // ------------------------------------------------------------------
  setupKickoff(team, initial = false) {
    this.state = MATCH_STATE.KICKOFF;
    this.stateTimer = initial ? 1.6 : 1.4;
    // teams switch ends at half time: refresh every player's attacking direction
    for (const player of this.players) player.dir = this.dirOf(player.team);
    this.ball.reset(0, 0);
    this.ball.inPlay = false;
    this.kickoffTeam = team;
    this.restart = { type: 'kickoff', team, timer: this.stateTimer };
    // place players in their own halves
    for (const player of this.players) {
      const formation = getFormation(
        player.team === 0 ? (this.config.home.formation || '4-3-3') : (this.config.away.formation || '4-3-3'),
      );
      const world = slotToWorld(formation.slots[player.slotIndex], this.dirOf(player.team), FIELD);
      const ownHalfX = player.team === team ? world.x : world.x;
      player.pos.set(ownHalfX * 0.92, 0, world.z * 0.94);
      player.vel.set(0, 0, 0);
      player.cancelAction();
      player.stamina = Math.max(player.stamina, 70);
    }
    // kicker stands next to the ball
    const kicker = this.teamPlayers(team)
      .filter((p) => !p.isGK && (p.slot.role === 'ST' || p.slot.role === 'CM' || p.slot.role === 'CAM'))
      .sort((a, b) => b.slot.x - a.slot.x)[0];
    if (kicker) {
      kicker.pos.set(-this.dirOf(team) * 1.1, 0, 0.6);
      this.restart.taker = kicker;
      if (this.humanTeam === team) this.switchControlled(kicker);
    }
    this.events.emit('whistle', { type: initial ? 'kickoff' : 'goal' });
  }

  beginRestart(type, team, position, opts = {}) {
    const side = this.dirOf(team);
    this.state = MATCH_STATE.SETPIECE;
    this.stateTimer = opts.delay || MATCH.restartDelay;
    this.ball.reset(position.x, position.z);
    this.ball.inPlay = false;
    this.ball.position.y = opts.ballHeight || BALL.radius;
    const taker = opts.taker || this.pickTaker(team, position, type);
    this.restart = { type, team, timer: this.stateTimer, position: position.clone(), taker, done: false };
    this.restartCounts[type] = (this.restartCounts[type] || 0) + 1;
    if (taker) {
      const offX = type === 'throw_in' ? 0 : 0.8;
      taker.pos.set(position.x - side * offX * 0.2, 0, position.z + (position.z > 0 ? -0.5 : 0.5));
      taker.cancelAction();
      if (this.humanTeam === team) this.switchControlled(taker);
    }
    // keep opponents the required distance away
    if (type === 'free_kick' || type === 'kickoff') {
      const required = FIELD.centerCircle;
      for (const p of this.players) {
        if (p.team === team) continue;
        const d = Math.hypot(p.pos.x - position.x, p.pos.z - position.z);
        if (d < required) {
          const nx = (p.pos.x - position.x) / (d || 1);
          const nz = (p.pos.z - position.z) / (d || 1);
          p.pos.set(position.x + nx * required, 0, position.z + nz * required);
        }
      }
    }
    // flood the box for corners
    if (type === 'corner') {
      for (const p of this.teamPlayers(team)) {
        if (p.isGK) continue;
        if (p.slot.role === 'CB' || p.slot.role === 'ST' || p.slot.role === 'CM' || p.slot.role === 'CDM') {
          const targetX = side * (FIELD.halfLength - 9 - this.rng() * 6);
          const targetZ = (this.rng() - 0.5) * 16;
          p.pos.set(targetX, 0, targetZ);
        }
      }
      this.stats[team].corners += 1;
      this.events.emit('restart', { type, team, position });
    }
    if (type === 'penalty') {
      this.state = MATCH_STATE.SETPIECE;
      this.stateTimer = 2.2;
      this.restart.penalty = true;
      const gk = this.teamPlayers(1 - team).find((p) => p.isGK);
      if (gk) {
        gk.pos.set(side * (FIELD.halfLength - 0.4), 0, 0);
        gk.cancelAction();
      }
    }
    this.events.emit('restart', { type, team, position });
  }

  pickTaker(team, position, type) {
    const candidates = this.teamPlayers(team).filter((p) => !p.isGK);
    if (type === 'goal_kick') {
      const gk = this.teamPlayers(team).find((p) => p.isGK);
      if (gk) return gk;
    }
    let best = null;
    let bestScore = -Infinity;
    for (const p of candidates) {
      const d = p.distanceTo(position.x, position.z);
      const skill = type === 'corner' ? p.passStat : p.passStat * 0.6 + p.shootStat * 0.4;
      const score = skill - d * 2.2;
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }
    return best;
  }

  // ------------------------------------------------------------------
  // Main update
  // ------------------------------------------------------------------
  update(rawDt) {
    const dt = Math.min(0.05, rawDt);
    this.simTime += dt;              // real-time clock used for all short-lived timers
    const playing = this.state === MATCH_STATE.PLAY || this.state === MATCH_STATE.SETPIECE || this.state === MATCH_STATE.KICKOFF;

    if (playing && !this.options.noClock) {
      this.advanceClock(dt);
    }

    this.stateTimer -= dt;
    this.whistleTimer = Math.max(0, this.whistleTimer - dt);
    if (this.humanSetPieceTimer > 0) {
      this.humanSetPieceTimer -= dt;
      if (this.humanSetPieceTimer <= 0) this.autoPlayHumanSetPiece();
    }
    this.switchLock = Math.max(0, this.switchLock - dt);

    this.updateStateMachine(dt);
    this.updateAI(dt);
    this.updatePlayers(dt);
    this.resolveBallControl(dt);
    this.updateBall(dt);
    this.checkGoalLines();
    this.updatePossession(dt);
    this.updateControlledPlayer();
    return this;
  }

  advanceClock(dt) {
    const gameDt = dt * this.timeScale;
    this.clockSeconds += gameDt;
    const halfEnd = this.half === 1 ? 45 * 60 : 90 * 60;
    const stoppage = this.half === 1 ? this.stoppage[0] : this.stoppage[1];
    if (this.clockSeconds >= halfEnd && stoppage === 0) {
      // roll a random stoppage time for this half
      const base = MATCH.stoppageBase;
      this.stoppage[this.half - 1] = base + Math.round(this.rng() * 35);
      this.events.emit('stoppage', { half: this.half, seconds: this.stoppage[this.half - 1] });
    }
    if (this.clockSeconds >= halfEnd + stoppage) {
      if (this.half === 1) {
        this.half = 2;
        this.state = MATCH_STATE.HALFTIME;
        this.stateTimer = 1.6;
        this.clockSeconds = 45 * 60;
        this.halfTimeShown = true;
        this.events.emit('halftime', { score: [...this.score] });
      } else if (!this.finished) {
        this.finished = true;
        this.state = MATCH_STATE.FULLTIME;
        this.stateTimer = 0;
        this.events.emit('fulltime', { score: [...this.score], stats: this.stats });
      }
    }
  }

  updateStateMachine(dt) {
    switch (this.state) {
      case MATCH_STATE.KICKOFF: {
        if (this.stateTimer <= 0) {
          this.state = MATCH_STATE.PLAY;
          this.ball.inPlay = true;
          this.restart = { ...this.restart, state: 'play' };
          this.events.emit('whistle', { type: 'kickoff_end' });
        }
        break;
      }
      case MATCH_STATE.SETPIECE: {
        if (this.restart && !this.restart.done && this.stateTimer <= 0) {
          const taker = this.restart.taker;
          const humanTakesIt = this.humanTeam === this.restart.team
            && taker && taker.id === this.controlledPlayerId
            && this.humanTeam !== null && this.humanTeam !== undefined;
          if (humanTakesIt) {
            // the human has the ball: give them time to play it
            this.restart.done = true;
            this.restart.state = 'play';
            this.state = MATCH_STATE.PLAY;
            this.ball.inPlay = true;
            this.humanSetPieceTimer = this.restart.penalty ? 6 : 4.5;
          } else {
            this.executeSetPiece(taker);
          }
        }
        break;
      }
      case MATCH_STATE.CELEBRATION: {
        if (this.stateTimer <= 0) {
          this.setupKickoff(this.concedingTeam !== undefined ? this.concedingTeam : 0);
        }
        break;
      }
      case MATCH_STATE.HALFTIME: {
        if (this.stateTimer <= 0) {
          this.setupKickoff(1 - this.kickoffTeam);
        }
        break;
      }
      default:
        break;
    }
  }

  /** Runs the scripted delivery for a set piece (AI taker or fallback). */
  executeSetPiece(taker) {
    const restart = this.restart;
    if (!restart || restart.done) return;
    const team = restart.team;
    const side = this.dirOf(team);

    if (taker) {
      if (restart.type === 'throw_in') {
        throwIn(this, taker, this.bestThrowTarget(team));
      } else if (restart.type === 'goal_kick') {
        const mates = this.teamPlayers(team)
          .filter((p) => !p.isGK && !p.sentOff)
          .sort((a, b) => (b.slot.x - a.slot.x) * side);
        const mate = mates[Math.floor(this.rng() * Math.min(3, mates.length))] || taker;
        passToPlayer(this, taker, mate, 'lob', 0.6);
      } else if (restart.penalty) {
        const aim = goalAimPoint(this, taker, 0.72);
        shootAtPoint(this, taker, aim, 'shoot', 0.72);
      } else if (restart.type === 'corner') {
        const box = new Vector3(side * (FIELD.halfLength - 8), 0, (this.rng() - 0.5) * 8);
        const mate = this.teamPlayers(team)
          .filter((p) => !p.isGK && p.slot.role !== 'CB')
          .sort((a, b) => Math.hypot(a.pos.x - box.x, a.pos.z - box.z) - Math.hypot(b.pos.x - box.x, b.pos.z - box.z))[0];
        tmp.set(box.x - this.ball.position.x, 0, box.z - this.ball.position.z).normalize();
        this.ball.kick(tmp, 22 + this.rng() * 6, { lift: 0.55, spinTop: 0.5, kind: 'cross', player: taker });
        taker.stats.touches += 1;
        if (mate) this.pendingPass = { from: taker, to: mate, kind: 'cross', time: this.simTime };
      } else {
        const goalX = side * FIELD.halfLength;
        const distanceToGoal = Math.hypot(goalX - taker.pos.x, taker.pos.z);
        if (distanceToGoal < 32 && restart.type === 'free_kick') {
          shootAtPoint(this, taker, goalAimPoint(this, taker, 0.5), 'finesse', 0.75);
        } else {
          const mate = this.teamPlayers(team)
            .filter((p) => p !== taker && !p.isGK && !p.sentOff)
            .sort((a, b) => (b.pos.x * side) - (a.pos.x * side))[0];
          if (mate) passToPlayer(this, taker, mate, 'pass', 0.5);
        }
      }
    }

    restart.done = true;
    restart.state = 'play';
    this.state = MATCH_STATE.PLAY;
    this.ball.inPlay = true;
  }

  /** If the human stalls on a set piece, play a sensible ball so play never stops. */
  autoPlayHumanSetPiece() {
    const player = this.controlledPlayer;
    if (!player || this.ball.owner !== player) return;
    const side = this.dirOf(player.team);
    const goalX = side * FIELD.halfLength;
    const distance = Math.hypot(goalX - player.pos.x, player.pos.z);
    if (distance < 30) {
      shootAtPoint(this, player, goalAimPoint(this, player, 0.6), 'shoot', 0.6);
      return;
    }
    const mates = this.teamPlayers(player.team).filter((p) => p !== player && !p.isGK && !p.sentOff);
    if (mates.length) {
      const mate = this.evaluatePassesFor(player)[0];
      if (mate) passToPlayer(this, player, mate.player, mate.kind, 0.5);
      else passToPlayer(this, player, mates[Math.floor(this.rng() * mates.length)], 'pass', 0.5);
    }
  }

  bestThrowTarget(team) {
    const side = this.dirOf(team);
    const candidates = this.teamPlayers(team).filter((p) => !p.isGK && p !== (this.restart && this.restart.taker));
    let best = null;
    let bestScore = -Infinity;
    for (const p of candidates) {
      const forward = (p.pos.x * side) / FIELD.halfLength;
      const d = p.distanceTo(this.ball.position.x, this.ball.position.z);
      const score = forward * 2 - d * 0.06;
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }
    return best ? best.pos.clone() : new Vector3(this.ball.position.x, 0, 0);
  }

  updateAI(dt) {
    if (this.state === MATCH_STATE.FULLTIME || this.state === MATCH_STATE.HALFTIME) {
      // players idle / walk off
      for (const p of this.players) p.setIntent(0, 0, false, 0.3);
      return;
    }
    if (this.state === MATCH_STATE.CELEBRATION) {
      this.updateCelebration(dt);
      return;
    }
    if (this.restart && this.restart.state !== 'play' && this.state === MATCH_STATE.SETPIECE) {
      this.updateSetPieceMovement(dt);
      return;
    }
    this.homeAI.update(dt);
    this.awayAI.update(dt);
  }

  updateSetPieceMovement(dt) {
    const restart = this.restart;
    const side = this.dirOf(restart.team);
    for (const player of this.players) {
      if (restart.taker === player) {
        if (this.humanTeam === restart.team && this.controlledPlayerId === player.id) continue;
        // walk to the ball
        const d = player.distanceTo(restart.position.x, restart.position.z);
        if (d > 1.2) {
          const dx = (restart.position.x - player.pos.x) / d;
          const dz = (restart.position.z - player.pos.z) / d;
          player.setIntent(dx, dz, false, 1);
        } else {
          player.setIntent(0, 0, false, 0.3);
        }
        continue;
      }
      if (player.isGK) {
        const gk = player;
        gk.setIntent(0, 0, false, 0.3);
        continue;
      }
      // others jog into position
      const role = player.roleTarget;
      const dx = role.x - player.pos.x;
      const dz = role.z - player.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 1.2) player.setIntent(dx / d, dz / d, false, 0.75);
      else player.setIntent(0, 0, false, 0.3);
    }
    if (this.humanTeam !== null) {
      const controlled = this.playerById(this.controlledPlayerId);
      if (controlled) {
        // human keeps control input; nothing extra here
      }
    }
    void side;
  }

  updateCelebration(dt) {
    const scorer = this.celebrationScorer;
    const side = this.dirOf(scorer ? scorer.team : 0);
    for (const player of this.players) {
      if (player === scorer) {
        // run toward the corner flag
        const targetX = side * (FIELD.halfLength - 6);
        const targetZ = FIELD.halfWidth - 3;
        const dx = targetX - player.pos.x;
        const dz = targetZ - player.pos.z;
        const d = Math.hypot(dx, dz);
        if (d > 1.5) player.setIntent(dx / d, dz / d, true, 1);
        else player.setIntent(0, 0, false, 0.4);
        player.celebrating = true;
      } else if (scorer && player.team === scorer.team) {
        // team mates jog towards the scorer
        const dx = scorer.pos.x - player.pos.x;
        const dz = scorer.pos.z - player.pos.z;
        const d = Math.hypot(dx, dz);
        if (d > 2.5) player.setIntent(dx / d, dz / d, true, 0.9);
        else player.setIntent(0, 0, false, 0.3);
        player.celebrating = true;
      } else {
        player.celebrating = false;
        player.setIntent(0, 0, false, 0.3);
      }
    }
    void dt;
  }

  updatePlayers(dt) {
    const world = { ball: this.ball, match: this, players: this.players };
    for (const player of this.players) {
      player.update(dt, world);
      if (this.options.infiniteStamina) player.stamina = 100;
      this.handlePlayerAction(player);
    }
    this.separatePlayers();
  }

  /** Resolves the strike moment of queued actions. */
  handlePlayerAction(player) {
    const action = player.action;
    if (!action || action.fired) return;
    if (action.t < action.windup) return;
    action.fired = true;

    switch (action.type) {
      case 'tackle': {
        this.resolveTackle(player, false);
        break;
      }
      case 'slide': {
        this.resolveTackle(player, true);
        break;
      }
      default:
        break;
    }
  }

  separatePlayers() {
    const players = this.players;
    for (let i = 0; i < players.length; i += 1) {
      const a = players[i];
      for (let j = i + 1; j < players.length; j += 1) {
        const b = players[j];
        const dx = b.pos.x - a.pos.x;
        const dz = b.pos.z - a.pos.z;
        const d = Math.hypot(dx, dz);
        const minDist = PLAYER.radius * 2;
        if (d < minDist && d > 0.0001) {
          const push = (minDist - d) * 0.5;
          const nx = dx / d;
          const nz = dz / d;
          const strengthA = 1 / (a.physicalStat + 20);
          const strengthB = 1 / (b.physicalStat + 20);
          const total = strengthA + strengthB;
          a.pos.x -= nx * push * (strengthA / total) * 2;
          a.pos.z -= nz * push * (strengthA / total) * 2;
          b.pos.x += nx * push * (strengthB / total) * 2;
          b.pos.z += nz * push * (strengthB / total) * 2;
        }
      }
    }
  }

  // ------------------------------------------------------------------
  // Ball control
  // ------------------------------------------------------------------
  resolveBallControl(dt) {
    const ball = this.ball;
    const owner = ball.owner;

    if (owner) {
      // owner keeps the ball while they can reach it
      if (!owner.canReachBall(ball) || owner.stunTimer > 0) {
        if (owner.distanceToBall(ball) > PLAYER.controlRadius * 1.6) {
          this.releaseBall(owner, 'lost');
        }
      }
      if (ball.owner === owner) {
        this.dribble(owner, dt);
      }
      return;
    }

    if (this.state === MATCH_STATE.CELEBRATION || this.state === MATCH_STATE.HALFTIME || this.state === MATCH_STATE.FULLTIME) return;
    if (ball.position.y > BALL.controlHeight) return;

    let best = null;
    let bestScore = -Infinity;
    const restartTeam = this.state === MATCH_STATE.SETPIECE && this.restart ? this.restart.team : null;
    for (const player of this.players) {
      if (!ball.canBeControlledBy(player)) continue;
      if (restartTeam !== null && player.team !== restartTeam) continue;
      const d = player.distanceToBall(ball);
      const isIntendedReceiver = this.pendingPass && this.pendingPass.to === player;
      const radius = PLAYER.controlRadius + (isIntendedReceiver ? 0.8 : 0);
      if (d > radius) continue;
      // bias: the current restart taker / GK keeps priority on set pieces
      const teamBias = this.restart && this.restart.team === player.team && this.state === MATCH_STATE.SETPIECE ? 1.4 : 0;
      const gkBias = player.isGK ? 0.2 : 0;
      const score = 1.2 - d + teamBias + gkBias;
      if (score > bestScore) {
        bestScore = score;
        best = player;
      }
    }
    if (best) {
      this.giveBallTo(best, 0.12);
    }
  }

  giveBallTo(player, lock = 0.2) {
    const ball = this.ball;
    ball.owner = player;
    ball.lastTouch = player;
    ball.registerTouch(player, lock);
    ball.inPlay = true;
    player.hasBall = true;
    // A pass resolves as soon as somebody takes control of the ball: same team
    // means completed, an opponent means intercepted.
    if (this.pendingPass) {
      const pass = this.pendingPass;
      if (this.simTime - pass.time < 6) {
        if (player.team === pass.from.team) {
          pass.from.stats.passesCompleted += 1;
          this.stats[pass.from.team].passesCompleted += 1;
          this.passOutcomes.completed += 1;
          player.lastPassFrom = pass.from;
          player.lastPassTime = this.clockSeconds;
          if (this.pendingOffside && this.pendingOffside.player === player) {
            this.callOffside(this.pendingOffside);
          }
        } else {
          this.passOutcomes.intercepted += 1;
        }
      }
      this.pendingPass = null;
      this.pendingOffside = null;
    }
    if (this.humanTeam === player.team && !player.isGK) {
      this.switchControlled(player);
    }
    this.events.emit('ball:control', { player });
  }

  releaseBall(player, reason) {
    if (this.ball.owner !== player) return;
    this.ball.owner = null;
    player.hasBall = false;
    player.stats.touches += 1;
    this.events.emit('ball:release', { player, reason });
  }

  dribble(player, dt) {
    const ball = this.ball;
    const speed = Math.hypot(player.vel.x, player.vel.z);
    const facingX = player.vel.x / (speed || 1);
    const facingZ = player.vel.z / (speed || 1);
    const useVel = speed > 0.4;
    const fx = useVel ? facingX : Math.sin(player.facing);
    const fz = useVel ? facingZ : Math.cos(player.facing);
    const lead = clamp(0.45 + speed * 0.075, 0.4, 1.15);
    const targetX = player.pos.x + fx * lead;
    const targetZ = player.pos.z + fz * lead;
    ball.position.x += (targetX - ball.position.x) * clamp(dt * 12, 0, 1);
    ball.position.z += (targetZ - ball.position.z) * clamp(dt * 12, 0, 1);
    ball.position.y = Math.max(BALL.radius, ball.position.y - dt * 4);
    ball.velocity.set(player.vel.x, 0, player.vel.z);
    ball.rollAngle += (speed * dt) / BALL.radius;
    player.ballTouchTimer -= dt;
    if (player.ballTouchTimer <= 0) {
      // knock-on touch: faster dribblers push the ball further
      player.ballTouchTimer = clamp(0.42 - this.dribbleSkill(player) * 0.2, 0.16, 0.45);
      player.stats.touches += 1;
      ball.controlLock.set(player.id, 0.12);
    }
  }

  dribbleSkill(player) {
    return clamp01((player.dribbleStat - 40) / 60);
  }

  /**
   * Goalkeeper save attempt. Called from the AI when a shot is within reach.
   * @returns {'catch'|'parry'|null}
   */
  tryGoalkeeperSave(gk, difficulty) {
    if (gk.saveCooldown > 0) return null;
    const ball = this.ball;
    const speed = Math.hypot(ball.velocity.x, ball.velocity.y, ball.velocity.z);
    if (speed < 5) return null;
    const result = goalkeeperSave(this, gk, null, difficulty || this.difficultyFor(gk.team));
    if (result) gk.saveCooldown = 0.5;
    else gk.saveCooldown = 0.25;
    return result;
  }

  // ------------------------------------------------------------------
  // Tackling & fouls
  // ------------------------------------------------------------------
  resolveTackle(tackler, sliding) {
    const ball = this.ball;
    const distance = tackler.distanceToBall(ball);
    const reach = sliding ? PLAYER.tackleRadius * 1.35 : PLAYER.tackleRadius;
    const opponent = ball.owner && ball.owner.team !== tackler.team ? ball.owner : null;

    if (distance <= reach) {
      if (!opponent) {
        // clean interception
        this.giveBallTo(tackler, 0.2);
        tackler.stats.tackles += 1;
        this.stats[tackler.team].tackles += 1;
        this.events.emit('tackle', { tackler, won: true });
        return;
      }
      const skill = this.difficultyFor(tackler.team).tackleSkill * (0.55 + tackler.defendStat / 99 * 0.6);
      const resist = (0.5 + opponent.dribbleStat / 99 * 0.55) * (sliding ? 0.72 : 1);
      const roll = this.rng() * (skill + resist);
      if (roll < skill) {
        // won the ball
        const dirAway = tmp.set(tackler.pos.x - opponent.pos.x, 0, tackler.pos.z - opponent.pos.z).normalize();
        this.releaseBall(opponent, 'tackled');
        this.ball.position.set(
          tackler.pos.x + dirAway.x * 0.5,
          BALL.radius,
          tackler.pos.z + dirAway.z * 0.5,
        );
        this.giveBallTo(tackler, 0.25);
        tackler.stats.tackles += 1;
        this.stats[tackler.team].tackles += 1;
        opponent.stunTimer = sliding ? 0.5 : 0.25;
        this.events.emit('tackle', { tackler, won: true, opponent });
      } else {
        // missed the ball, may have caught the man
        const foulChance = clamp01(0.26 + (sliding ? 0.28 : 0.08) + this.difficultyFor(tackler.team).aggression * 0.16);
        if (!this.options.noFouls && this.rng() < foulChance) {
          this.awardFoul(tackler, opponent);
        } else {
          tackler.stunTimer = 0.45;
          opponent.stunTimer = 0.15;
          this.events.emit('tackle', { tackler, won: false, opponent });
        }
      }
      return;
    }

    // missed entirely: sliding tackles leave the player on the floor
    if (sliding) tackler.stunTimer = Math.max(tackler.stunTimer, 0.6);
    // late contact with the man
    if (opponent && tackler.distanceTo(opponent.pos.x, opponent.pos.z) < PLAYER.tackleRadius + 0.3) {
      if (!this.options.noFouls && this.rng() < 0.32) {
        this.awardFoul(tackler, opponent);
      }
    }
  }

  awardFoul(tackler, victim) {
    tackler.stats.fouls += 1;
    this.stats[tackler.team].fouls += 1;
    this.events.emit('foul', { tackler, victim, position: victim.pos.clone() });

    // card?
    const roll = this.rng();
    let card = null;
    if (roll < 0.18) {
      card = 'yellow';
      this.stats[tackler.team].yellows += 1;
      tackler.cardCount = (tackler.cardCount || 0) + 1;
      if (tackler.cardCount >= 2) {
        card = 'red';
        this.stats[tackler.team].reds += 1;
        this.events.emit('card', { player: tackler, type: 'red' });
        this.sendOff(tackler);
        return;
      }
      this.events.emit('card', { player: tackler, type: 'yellow' });
    }
    void card;

    const victimSide = this.dirOf(victim.team);
    const inBox = Math.abs(victim.pos.x) > FIELD.halfLength - FIELD.penaltyAreaDepth
      && Math.abs(victim.pos.z) < FIELD.penaltyAreaWidth / 2;
    const attackingBox = victim.pos.x * victimSide > 0;
    if (inBox && attackingBox && this.rng() < 0.72) {
      this.beginRestart('penalty', victim.team, new Vector3(victimSide * (FIELD.halfLength - FIELD.penaltySpot), 0, 0));
    } else {
      const pos = victim.pos.clone();
      this.beginRestart('free_kick', victim.team, pos);
    }
  }

  sendOff(player) {
    // simplest red-card handling: park the player behind their own goal
    const side = this.dirOf(player.team);
    player.pos.set(-side * (FIELD.halfLength + 1.2), 0, (this.rng() - 0.5) * 4);
    player.sentOff = true;
    player.isUserControlled = false;
  }

  callOffside(offside) {
    this.stats[offside.team].offsides += 1;
    this.events.emit('offside', { player: offside.player, team: offside.team });
    this.beginRestart('free_kick', 1 - offside.team, offside.position.clone(), {
      delay: 1.2,
    });
  }

  // ------------------------------------------------------------------
  // Physics + lines
  // ------------------------------------------------------------------
  updateBall(dt) {
    this.ball.update(dt);
    // keep the ball inside the world bounds when free play has no out-of-play
    if (this.options.noOutOfPlay) {
      const bx = FIELD.halfLength + 6;
      const bz = FIELD.halfWidth + 4;
      if (Math.abs(this.ball.position.x) > bx || Math.abs(this.ball.position.z) > bz) {
        this.ball.position.set(0, BALL.radius, 0);
        this.ball.velocity.set(0, 0, 0);
      }
    }
  }

  checkGoalLines() {
    if (this.options.noOutOfPlay || this.state === MATCH_STATE.CELEBRATION) return;
    if (this.state === MATCH_STATE.HALFTIME || this.state === MATCH_STATE.FULLTIME) return;
    const ball = this.ball;
    const halfLength = FIELD.halfLength;
    const halfWidth = FIELD.halfWidth;

    // goal?
    if (Math.abs(ball.position.x) > halfLength) {
      const side = Math.sign(ball.position.x) || 1;
      const insideWidth = Math.abs(ball.position.z) < FIELD.goalWidth / 2;
      const insideHeight = ball.position.y < FIELD.goalHeight;
      if (insideWidth && insideHeight) {
        const scoringTeam = side > 0 ? (this.dirOf(0) > 0 ? 0 : 1) : (this.dirOf(0) > 0 ? 1 : 0);
        this.scoreGoal(scoringTeam, ball.lastTouch);
        return;
      }
      if (this.pendingPass) { this.passOutcomes.out += 1; this.pendingPass = null; this.pendingOffside = null; }
      // out behind the goal line
      const lastTouch = ball.lastTouch;
      const attackingDir = side > 0 ? 1 : -1;
      const defendingTeam = (this.dirOf(0) > 0)
        ? (attackingDir > 0 ? 1 : 0)
        : (attackingDir > 0 ? 0 : 1);
      const lastTouchTeam = lastTouch ? lastTouch.team : defendingTeam;
      if (lastTouchTeam === defendingTeam) {
        // corner for the attacking team
        const cornerX = side * (halfLength - 0.3);
        const cornerZ = ball.position.z > 0 ? halfWidth - 0.3 : -(halfWidth - 0.3);
        this.beginRestart('corner', 1 - defendingTeam, new Vector3(cornerX, 0, cornerZ));
      } else {
        // goal kick
        const goalKickTeam = defendingTeam;
        const gx = side * (halfLength - FIELD.goalAreaDepth + 1.2);
        this.beginRestart('goal_kick', goalKickTeam, new Vector3(gx, 0, (this.rng() - 0.5) * 6));
      }
      return;
    }

    // touchline
    if (Math.abs(ball.position.z) > halfWidth) {
      if (this.pendingPass) { this.passOutcomes.out += 1; this.pendingPass = null; this.pendingOffside = null; }
      const lastTouch = ball.lastTouch;
      const team = lastTouch ? 1 - lastTouch.team : 0;
      const x = clamp(ball.position.x, -halfLength + 1, halfLength - 1);
      const z = Math.sign(ball.position.z) * (halfWidth - 0.25);
      this.beginRestart('throw_in', team, new Vector3(x, 0, z), { ballHeight: 1.2, delay: 0.9 });
    }
  }

  scoreGoal(team, scorer) {
    const scoringTeam = team;
    const isOwnGoal = scorer && scorer.team !== scoringTeam;
    this.score[scoringTeam] += 1;
    const minute = Math.floor(this.clockSeconds / 60) + 1;
    let scorerName = scorer ? scorer.name : this.teamNames[scoringTeam];
    if (isOwnGoal) {
      this.ownGoals[1 - scoringTeam] += 1;
      scorerName = scorer.name;
    }
    this.timeline.push({ minute, team: scoringTeam, scorer: scorerName, ownGoal: !!isOwnGoal });
    let assister = null;
    if (scorer && !isOwnGoal && scorer.lastPassFrom
        && scorer.lastPassFrom.team === scoringTeam
        && this.simTime - (scorer.lastPassTime || -99) < 8) {
      assister = scorer.lastPassFrom;
      assister.stats.assists += 1;
      this.stats[scoringTeam].assists += 1;
      assister.rating += 0.3;
    }
    if (scorer && !isOwnGoal) {
      scorer.stats.goals += 1;
      scorer.rating += 0.6;
    } else if (scorer) {
      scorer.rating -= 0.5;
    }
    this.stats[scoringTeam].shotsOnTarget += 1;
    this.concedingTeam = 1 - scoringTeam;
    this.celebrationScorer = isOwnGoal ? null : scorer;
    this.state = MATCH_STATE.CELEBRATION;
    this.stateTimer = MATCH.celebrationTime;
    this.ball.owner = null;
    this.pendingShot = null;
    this.pendingPass = null;
    if (scorer) scorer.celebrating = true;
    this.events.emit('goal', {
      team: scoringTeam,
      scorer,
      scorerName,
      assister,
      ownGoal: !!isOwnGoal,
      minute,
      score: [...this.score],
    });
  }

  // ------------------------------------------------------------------
  // Bookkeeping
  // ------------------------------------------------------------------
  updatePossession(dt) {
    const owner = this.ball.owner;
    if (owner) {
      this.lastPossessionTeam = owner.team;
      this.stats[owner.team].possessionTime += dt;
    } else if (this.ball.inPlay) {
      this.stats[this.lastPossessionTeam].possessionTime += dt * 0.5;
    }

    // track pending pass interceptions
    if (this.pendingPass && this.simTime - this.pendingPass.time > 0.02) {
      const pass = this.pendingPass;
      // through balls into space: the receiver is whoever is chasing the point
      const receiver = pass.to
        || (pass.point ? this.closestPlayerToPoint(pass.point, pass.from.team) : null);
      // offside detection at the moment of the pass
      if (receiver && !this.pendingOffside && this.isOffside(receiver)) {
        this.pendingOffside = {
          player: receiver,
          team: receiver.team,
          position: receiver.pos.clone(),
          time: this.simTime,
        };
      }
      if (this.simTime - pass.time > 6) {
        this.passOutcomes.timeout += 1;
        this.pendingPass = null;
        this.pendingOffside = null;
      }
    }

    // shot on-target accounting
    if (this.pendingShot && this.simTime - this.pendingShot.time < 6) {
      const ball = this.ball;
      if (!this.pendingShot.counted) {
        const goalX = this.pendingShot.player.dir * FIELD.halfLength;
        const predicted = ball.predict(Math.abs(goalX - ball.position.x) / Math.max(4, Math.abs(ball.velocity.x) || 4));
        if (ball.position.y > 0.4 && Math.abs(predicted.z) < FIELD.goalWidth / 2) {
          this.stats[this.pendingShot.player.team].shotsOnTarget += 1;
          this.pendingShot.counted = true;
        }
      }
    }
  }

  closestPlayerToPoint(point, team) {
    let best = null;
    let bestD = Infinity;
    for (const p of this.players) {
      if (p.team !== team || p.isGK || p.sentOff) continue;
      const d = p.distanceTo(point.x, point.z);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best;
  }

  isOffside(player) {
    if (this.state !== MATCH_STATE.PLAY) return false;
    const side = this.dirOf(player.team);
    // only in the attacking half
    if (player.pos.x * side <= 0) return false;
    // ahead of the ball?
    if (player.pos.x * side <= this.ball.position.x * side) return false;
    const opponents = this.players.filter((p) => p.team !== player.team && !p.sentOff);
    const xs = opponents.map((p) => p.pos.x * side).sort((a, b) => b - a);
    if (xs.length < 2) return false;
    const secondLast = xs[1];
    const goalLine = FIELD.halfLength;
    const margin = 0.35;
    return player.pos.x * side > Math.min(secondLast, goalLine * 0.98) + margin;
  }

  // ------------------------------------------------------------------
  // Human control
  // ------------------------------------------------------------------
  switchControlled(player, force = false) {
    if (!player || player.team !== this.humanTeam) return;
    if (player.sentOff) return;
    if (!force && this.switchLock > 0) return;
    if (this.controlledPlayerId === player.id) return;
    const previous = this.playerById(this.controlledPlayerId);
    if (previous) previous.isUserControlled = false;
    this.controlledPlayerId = player.id;
    player.isUserControlled = true;
    this.switchLock = 0.18;
    this.events.emit('control:switch', { player });
  }

  updateControlledPlayer() {
    if (this.humanTeam === null || this.humanTeam === undefined) return;
    const owner = this.ball.owner;
    const controlled = this.playerById(this.controlledPlayerId);
    if (!controlled) {
      this.switchControlled(this.nearestPlayerToBall(this.humanTeam), true);
      return;
    }
    if (owner && owner.team === this.humanTeam && owner !== controlled && !owner.isGK) {
      this.switchControlled(owner, true);
    }
  }

  /** Manual switch to the player nearest the ball (SWITCH button). */
  cycleControlled() {
    if (this.humanTeam === null || this.humanTeam === undefined) return;
    const candidates = this.players
      .filter((p) => p.team === this.humanTeam && !p.isGK && !p.sentOff)
      .sort((a, b) => a.distanceToBall(this.ball) - b.distanceToBall(this.ball));
    if (!candidates.length) return;
    const currentIndex = candidates.findIndex((p) => p.id === this.controlledPlayerId);
    const next = candidates[(currentIndex + 1) % Math.min(4, candidates.length)];
    this.switchControlled(next, true);
  }

  get controlledPlayer() {
    return this.playerById(this.controlledPlayerId);
  }

  /** Called by the input layer every frame with the joystick vector. */
  setHumanIntent(x, z, sprint) {
    const player = this.controlledPlayer;
    if (!player) return;
    if (this.state === MATCH_STATE.CELEBRATION || this.state === MATCH_STATE.FULLTIME) {
      player.setIntent(0, 0, false, 0.3);
      return;
    }
    const mag = Math.hypot(x, z);
    const stamina = clamp(player.stamina / 100, 0, 1);
    const canSprint = sprint && player.stamina > 12;
    player.setIntent(x, z, canSprint, mag > 0.9 ? 1 : 0.75 + mag * 0.25);
    void stamina;
  }

  /** Human button actions. */
  humanAction(type, params = {}) {
    const player = this.controlledPlayer;
    if (!player || player.sentOff) return false;
    const ball = this.ball;
    const hasBall = ball.owner === player;
    const side = this.dirOf(player.team);

    switch (type) {
      case 'pass': {
        if (!hasBall) {
          // request a pass from the AI team mate in possession? Instead: attempt a tackle/press
          return false;
        }
        const target = this.bestHumanPassTarget(player, params);
        if (!target) return false;
        const kind = params.kind || 'pass';
        return passToPlayer(this, player, target, kind, params.charge || 0.5);
      }
      case 'through': {
        if (!hasBall) return false;
        const target = this.bestThroughTarget(player, side);
        if (!target) return false;
        return passToPlayer(this, player, target, 'through', params.charge || 0.6);
      }
      case 'shoot': {
        if (!hasBall) {
          // off the ball: press/tackle instead
          return this.humanTackle(false);
        }
        const charge = clamp(params.charge !== undefined ? params.charge : 0.6, 0, 1);
        const kind = params.kind || (charge > 0.85 ? 'shoot' : 'shoot');
        let aim;
        if (params.aimVector && (Math.abs(params.aimVector.x) > 0.1 || Math.abs(params.aimVector.z) > 0.1)) {
          const gx = side * FIELD.halfLength;
          const dirX = params.aimVector.x;
          const dirZ = params.aimVector.z;
          const len = Math.hypot(dirX, dirZ) || 1;
          const spread = FIELD.goalWidth * 0.8;
          aim = new Vector3(gx, 0.6 + charge * 1.2, clamp((dirZ / len) * spread * 0.5 + player.pos.z * 0.15, -3.2, 3.2));
          void dirX;
        } else {
          aim = goalAimPoint(this, player, 0.62);
        }
        return shootAtPoint(this, player, aim, kind, charge);
      }
      case 'finesse': {
        if (!hasBall) return false;
        const aim = goalAimPoint(this, player, 0.9);
        aim.z = clamp(aim.z * 1.2, -3.2, 3.2);
        return shootAtPoint(this, player, aim, 'finesse', 0.7);
      }
      case 'chip': {
        if (!hasBall) return false;
        const aim = goalAimPoint(this, player, 0.4);
        aim.y = 1.6;
        return shootAtPoint(this, player, aim, 'chip', 0.55);
      }
      case 'clear': {
        if (!hasBall) return false;
        return clearBall(this, player);
      }
      case 'tackle': {
        if (hasBall) {
          // slide the ball forward with a knock-on
          const fx = Math.sin(player.facing);
          const fz = Math.cos(player.facing);
          this.ball.kick(tmp.set(fx, 0, fz), 9, { lift: 0.12, kind: 'dribble', player });
          return true;
        }
        return this.humanTackle(false);
      }
      case 'slide': {
        if (hasBall) return false;
        return this.humanTackle(true);
      }
      case 'sprint': {
        return true;
      }
      case 'switch': {
        this.cycleControlled();
        return true;
      }
      case 'gkTackle': {
        return this.humanTackle(false);
      }
      default:
        return false;
    }
  }

  humanTackle(sliding) {
    const player = this.controlledPlayer;
    if (!player) return false;
    if (!sliding) {
      const d = player.distanceToBall(this.ball);
      if (d <= PLAYER.tackleRadius + 0.4) {
        this.resolveTackle(player, false);
        return true;
      }
      // lunge towards the ball
      const dx = this.ball.position.x - player.pos.x;
      const dz = this.ball.position.z - player.pos.z;
      const len = Math.hypot(dx, dz) || 1;
      player.setIntent(dx / len, dz / len, true, 1);
      player.startAction('tackle', {});
      return true;
    }
    // slide
    player.startAction('slide', { force: true });
    return true;
  }

  bestHumanPassTarget(player, params = {}) {
    const options = this.homeAI ? this.evaluatePassesFor(player) : [];
    if (!options.length) return null;
    if (params.preferForward) {
      const side = this.dirOf(player.team);
      options.sort((a, b) => (b.player.pos.x - a.player.pos.x) * side - (a.player.pos.x - b.player.pos.x) * side);
    }
    return options[0].player;
  }

  bestThroughTarget(player, side) {
    const mates = this.teamPlayers(player.team).filter((p) => p !== player && !p.isGK && !p.sentOff);
    let best = null;
    let bestScore = -Infinity;
    for (const mate of mates) {
      const forward = (mate.pos.x - player.pos.x) * side;
      const speed = Math.hypot(mate.vel.x, mate.vel.z);
      const score = forward * 0.6 + speed * 2.2 - mate.distanceTo(player.pos.x, player.pos.z) * 0.08;
      if (score > bestScore) {
        bestScore = score;
        best = mate;
      }
    }
    return best;
  }

  evaluatePassesFor(player) {
    // reuse the TeamAI scoring so human pass selection agrees with team mates
    const ai = player.team === 0 ? this.homeAI : this.awayAI;
    return ai.evaluatePasses(player);
  }

  // ------------------------------------------------------------------
  // Summary helpers
  // ------------------------------------------------------------------
  get elapsedGameMinutes() {
    return this.clockSeconds / 60;
  }

  get displayClock() {
    const seconds = Math.min(this.clockSeconds, 90 * 60 + 600);
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  possessionPercent() {
    const a = this.stats[0].possessionTime;
    const b = this.stats[1].possessionTime;
    const total = a + b;
    if (total <= 0) return [50, 50];
    return [Math.round((a / total) * 100), Math.round((b / total) * 100)];
  }

  passAccuracy(team) {
    const s = this.stats[team];
    if (!s.passes) return 0;
    return Math.round((s.passesCompleted / s.passes) * 100);
  }

  manOfTheMatch() {
    let best = null;
    let bestScore = -Infinity;
    for (const player of this.players) {
      const s = player.stats;
      const score = player.rating + (s.goals || 0) * 1.2 + (s.assists || 0) * 0.6 + (s.saves || 0) * 0.5 + (s.tackles || 0) * 0.15 - (s.fouls || 0) * 0.2;
      if (score > bestScore) {
        bestScore = score;
        best = player;
      }
    }
    return best;
  }

  summary() {
    const possession = this.possessionPercent();
    return {
      score: [...this.score],
      home: this.teamNames[0],
      away: this.teamNames[1],
      timeline: this.timeline,
      stats: this.stats,
      possession,
      passAccuracy: [this.passAccuracy(0), this.passAccuracy(1)],
      motm: this.manOfTheMatch(),
      players: this.players.map((p) => p.toJSON()),
      difficulty: this.difficultyKey,
    };
  }
}

function defaultStats(role) {
  const base = role === 'GK' ? 62 : 64;
  return {
    pace: base, shooting: role === 'ST' ? base + 6 : base - 6, passing: base, dribbling: base,
    defending: role === 'CB' || role === 'GK' ? base + 6 : base - 6, physical: base, stamina: base,
    diving: base, handling: base, reflexes: base, positioning: base, kicking: base,
  };
}
