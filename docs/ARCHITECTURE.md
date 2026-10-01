# Architecture

```
                    ┌──────────────────────────── Android app ───────────────────────────┐
                    │  MainActivity (fullscreen WebView, JS bridge: vibrate/back/quit)   │
                    │                        loads assets/www/index.html                 │
                    └──────────────────────────────────────┬─────────────────────────────┘
                                                           │
┌──────────────────────────────────────── web game (ES modules, bundled with esbuild) ──┐
│                                                                                        │
│  main.js ─ app shell: renderer lifecycle, menu backdrop scene, match lifecycle,        │
│            Android bridge hooks, first-run club picker                                 │
│                                                                                        │
│  scene3d.js ─ procedural stadium, GPU-instanced players & crowd, ball, lights          │
│  match.js   ─ simulation loop: user input → AI → ball physics → presentation           │
│             states: KICKOFF → PLAY → GOAL/HALFTIME/RESTART → FULLTIME (+ PAUSED)       │
│  penalty.js / training.js ─ standalone mini modes                                      │
│                                                                                        │
│  data.js ─ original DB: 8 clubs × 18 players, formations, difficulty tiers             │
│  meta.js ─ economy, market, upgrades, tournament bracket, career league                │
│  save.js ─ versioned localStorage save (offline-first)                                 │
│  i18n.js ─ EN / UZ / RU dictionaries                                                   │
│  audio.js ─ WebAudio synthesized SFX + crowd ambience + menu music (no files)          │
│  ui.js    ─ all screens (splash/home/modes/team/players/shop/settings/profile/…)       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

## Data flow for a match
1. `ui` collects setup (opponent, difficulty, day/night) → `app.startMatch`.
2. `main.js` builds the user XI from the saved lineup and the opponent XI from its club.
3. `MatchGame` owns one `THREE.Scene` + HUD DOM, runs a fixed rAF loop.
4. On finish → `main.handleMatchFinish` → mode state (tournament/career) updated,
   rewards applied via `meta.js`, result screen shown.

## Adding online mode later
- All match input is a plain vector + button stream (`match.js` reads `this.joy/buttons`),
  so a network layer can feed the same inputs from remote players (lockstep).
- Progression is centralized in `save.js/meta.js` → swap `persist()` for an API call
  to get cloud save / login / ranking without touching gameplay code.

## Performance notes
- Players & crowd are `THREE.InstancedMesh` (≈10 draw calls for 22 humans).
- Hot loop allocates nothing; THREE temps reused.
- Quality presets: pixelRatio / shadows / crowd count / antialiasing.
- 30 FPS cap mode halves GPU work on weak devices.
