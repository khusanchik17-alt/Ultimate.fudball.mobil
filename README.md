# ⚽ Ultimate Football Mobile

An original, fully playable **3D football (soccer) game for Android** — 11 v 11 matches,
career season, knockout cup, penalty shootouts, training drills, a squad/transfer
economy and a complete touch control scheme, wrapped in a native Android APK.

Everything in this repository is original work: the clubs, players, kits, stadium,
UI, logo and all graphics are generated procedurally at runtime (or drawn by
`tools/make_icons.py`). No third‑party game, logo, art or licensed content is used.
The only external runtime dependency is [three.js](https://threejs.org) (MIT), which
is bundled into the APK.

---

## Table of contents

1. [What is in the game](#what-is-in-the-game)
2. [Screens and controls](#screens-and-controls)
3. [Technology / architecture](#technology--architecture)
4. [Project structure](#project-structure)
5. [Run it on a computer](#run-it-on-a-computer)
6. [Build the APK](#build-the-apk)
7. [Get the prebuilt APK](#get-the-prebuilt-apk)
8. [Install the APK on an Android phone](#install-the-apk-on-an-android-phone)
9. [First run / troubleshooting on device](#first-run--troubleshooting-on-device)
10. [Tests and quality gates](#tests-and-quality-gates)
11. [Release signing](#release-signing)
12. [Renaming the game](#renaming-the-game)
13. [Roadmap / how to extend](#roadmap--how-to-extend)
14. [Credits and licence](#credits-and-licence)

---

## What is in the game

| Area | Implemented |
| --- | --- |
| **Splash + main menu** | Animated splash screen, animated main menu over a live 3D stadium backdrop (orbiting camera), 10 animated tiles with press feedback |
| **Full 11 v 11 matches** | Referee whistle logic, goalkeepers, throw‑ins, corners, goal kicks, free kicks, penalties, offside, fouls, yellow/red cards, half‑time, stoppage time |
| **Player simulation** | Per‑player intent (positioning, marking, pressing, support runs), stamina drain/recovery, 12 positions, position fit, archetype AI, tackling/sliding, keeper dives and parries |
| **Ball physics** | Gravity, quadratic air drag, roll friction, bounce, spin/Magnus, frame collisions (posts/crossbar), control locks, trajectory prediction for passes |
| **Camera** | TV broadcast follow cam plus tele / close‑up / player cam, dynamic FOV, celebration orbit, shake, sensitivity + zoom settings |
| **Touch controls** | Virtual joystick, PASS, SHOOT, SPRINT, THROUGH, TACKLE, SWITCH with charge‑and‑release power, swipe modifiers (chip / finesse / lob), automatic attack ↔ defence button set |
| **Shooting / passing** | Normal, strong, finesse, chip shots; short/through/long passes; aim control with the joystick; per‑difficulty error model |
| **AI** | Utility‑based decisions (shoot / pass / dribble / clear), pass evaluation with risk, through balls into space, marking, pressing, offside line, GK positioning — on 5 difficulties |
| **Modes** | QUICK MATCH, CAREER (7‑club league season, table, simulate), TOURNAMENT (8‑club knockout cup with penalties), PENALTY SHOOTOUT (beat the keeper AI, 5 directions), TRAINING (free play, shooting, passing, dribbling, goal challenge) |
| **Squad management** | Team builder with 5 formations (4‑3‑3, 4‑4‑2, 4‑2‑3‑1, 4‑3‑1‑2, 3‑5‑2), drag/tap swapping, auto‑fill, Team OVR, ATT/MID/DEF ratings, chemistry, kit editor, club rename |
| **Players** | 12 positions (GK, CB, LB, RB, CDM, CM, CAM, LM, RM, LW, RW, ST), Name/Position/Rating + Speed, Shooting, Passing, Dribbling, Defending, Physical, Stamina (and 5 goalkeeper attributes), OVR with position weights |
| **Economy** | Coins + XP + levels, buy/sell/swap players, market, level‑up progression with 78→79→80→81 style upgrades, pack shop (bronze/silver/gold/elite), daily reward streak |
| **Rewards** | Coins and XP per match, more for wins/goals/clean sheets, difficulty multiplier (0.7× → 2.8×), trophy/summary screen with stats and Man of the Match |
| **Stadium** | Full 3D stadium: pitch with mown stripes and correct markings, goals with nets, 4 stands with an instanced animated crowd, floodlights, original ad boards, corner flags, dugouts, animated scoreboard, day/sunset/night |
| **Graphics options** | LOW / MEDIUM / HIGH quality tiers, 30 / 60 FPS caps, automatic device detection, object pooling, LOD‑style detail switches, capped crowd size on weak phones |
| **Audio** | Fully procedural Web Audio SFX (kick, pass, save, whistle, goal + crowd roar, tackle, UI clicks) and generative music beds; separate music/SFX/crowd volume sliders |
| **HUD** | TV‑style scoreboard (`HOME 2 · 1 AWAY` + running clock like `67:42`), minimap, shot charge ring, event banners, half‑time panel, pause menu (RESUME / CONTROLS / SETTINGS / QUIT MATCH), result screen |
| **Settings** | Graphics, FPS, Sound/Music/Crowd volume, control scale + joystick side, camera mode/sensitivity/zoom, haptics, language EN / UZ / RU, in‑app performance test |
| **Save** | Fully offline local save (localStorage **and** a native SharedPreferences mirror through a JS bridge) for squad, coins, XP, settings and progress |
| **Languages** | English, O'zbekcha (default), Русский — ~230 translated strings, more can be added in one file |

**Performance notes.** The renderer draws one instanced crowd mesh, one instanced
particle system, a handful of pooled meshes and 22 low‑poly player models with
cached geometry materials; textures are generated once and reused. On LOW quality
everything is further reduced. No allocations happen per frame in the hot paths.

## Screens and controls

**Screens:** Splash → Main menu → Quick match setup · Career · Tournament · Team ·
Players · Shop · Training · Penalty · Settings · Profile → Match (HUD, pause,
half‑time, result) → Penalty shootout.

**Touch**

| Control | Action |
| --- | --- |
| Left/right virtual joystick | Move the controlled player (`Settings → Controls` moves it to the right for left‑handed play) |
| **SHOOT** | Hold to charge, release to strike. Swipe ↓ = finesse, swipe ↑ = chip. Aim with the joystick while charging |
| **PASS** | Smart short pass (picks the best team‑mate). Swipe ↑ = lob |
| **THROUGH** | Threaded ball into space (defending: SLIDE tackle) |
| **TACKLE / PRESS** | Press the ball carrier; hold longer to slide |
| **SPRINT** | Hold to sprint (drains stamina) |
| **SWITCH** | Change the player you control |

The button set swaps automatically: in possession you get SHOOT/PASS/THROUGH,
without the ball they become PRESS/SLIDE/TACKLE.

**Keyboard (desktop preview):** `WASD`/arrows move, `Shift` sprints, `Space`/`K`
shoots, `J`/`Q` passes, `L`/`E` through ball, `I`/`F` tackles, `U`/`R` switches,
`Esc` pauses.

## Technology / architecture

The game is a **WebGL (three.js) engine inside a thin native Android WebView shell**.
That choice was deliberate: it delivers genuine 3D graphics, physics and animation to
*every* Android phone (WebGL 2 is available since Android 5+), keeps the APK small
(< 10 MB), needs no third‑party engine licence, and the exact same code runs in a
desktop browser for fast iteration and automated testing.

```
web/src/                 the game (pure ES modules, no globals)
├── core/                math, events, i18n (EN/UZ/RU), save/settings, Web Audio, input
├── game/
│   ├── data/            clubs, stadiums, player generation + OVR rules
│   ├── state.js         persistent state, squad rules, economy, rewards
│   ├── progression.js   career league + knockout cup + result simulation
│   └── runners.js       MatchRunner / PenaltyRunner (glue sim <-> render <-> HUD)
├── sim/                 headless, deterministic simulation (no DOM!)
│   ├── constants.js     field/ball/player/rule constants + difficulty presets
│   ├── ball.js          ball physics
│   ├── player.js        player state machine, stamina, animation state
│   ├── formations.js    formations, slot -> world mapping, team shape
│   ├── actions.js       kicks, passes, shots, saves, tackles helpers
│   ├── ai.js            utility AI for both teams + goalkeeper logic
│   ├── match.js         the match: rules, restarts, stats, timeline, MOTM
│   └── penalty.js       shootout rules (pure logic, unit tested)
├── render/              three.js layer
│   ├── textures.js      procedural CanvasTextures (pitch, nets, ads, crowd, ball…)
│   ├── playerModel.js   procedural low‑poly player model + pose animation
│   ├── stadium.js       pitch, goals, stands + instanced crowd shader, floodlights, scoreboard
│   ├── camera.js        broadcast/tele/close/player camera director with damping
│   └── scene.js         renderer, lights, day/night, pooling, particles, trails
├── ui/                  DOM UI (menu, screens, HUD, sheets, toasts)
└── main.js              application shell: boot, loop, navigation, wiring

android/                 native Android project (Gradle)
├── app/src/main/java/com/ufmstudio/ultimatefootball/
│   ├── MainActivity.java   fullscreen WebView host, back‑button bridge, logcat
│   └── NativeBridge.java   @JavascriptInterface save/settings/vibrate bridge
├── app/src/main/res/       icons (all densities + adaptive), theme, splash
├── app/src/main/assets/www generated by `npm run build` (bundle + html + css)
├── gradle/wrapper/        Gradle 8.2 wrapper (so no local Gradle install is needed)
└── keystore.properties    demo signing config (see "Release signing")

tools/                   build + test tooling (Node/Python, no global installs)
├── build_apk.sh         SDK-less APK pipeline (npm toolchain -> signed APK)
├── build_web.mjs        esbuild bundler -> android/app/src/main/assets/www/game.bundle.js
├── serve.mjs            zero‑dependency static server for desktop preview
├── make_icons.py        draws the launcher icons, adaptive icon and splash art
├── sim-report.mjs       CPU‑vs‑CPU balance report over N matches
├── zipalign.py          pure-python zipalign used by build_apk.sh
├── check_android_api.py validates the Java shell against the Android SDK API
└── smoke-dom.mjs        boots the real app in headless jsdom (WebGL/CSS stubbed)

tests/run-tests.mjs      38 checks: math, data, physics, full matches, shootouts
ci/android-build.yml     GitHub Actions workflow template (see "Get the APK")
```

**Modularity for the future.** Online play, 1v1, rankings, events, daily rewards,
a live player market, login and cloud save are intentionally *not* hard‑wired:
`MatchRunner` is fed team configs (so a remote opponent is just another config),
`Storage` already routes through a native bridge (so cloud save can be swapped in),
`progression.js` emits plain result records, and the UI is a screen stack that can
gain new entries without touching the match code.

## Project structure

Already listed above — the three directories that matter for building are `web/`
(sources), `android/` (native shell) and `tools/` (build scripts).

## Run it on a computer

Requirements: **Node.js 18+** (tested on Node 20/22) and npm.

```bash
git clone https://github.com/khusanchik17-alt/Ultimate.fudball.mobil.git
cd Ultimate.fudball.mobil
npm install            # three.js + esbuild (dev-only dependencies)
npm run build          # bundles web/src -> android/app/src/main/assets/www + web/game.bundle.js
npm run serve          # open http://localhost:3000 in a desktop browser
```

`npm run serve` binds to `0.0.0.0:3000`, so the same URL also works from a phone on
the same Wi‑Fi network (handy for testing touch controls before building an APK).

Useful extras:

```bash
npm run build:watch    # rebundle on every change while developing
npm test               # headless gameplay/unit test suite (38 checks)
node tools/smoke-dom.mjs        # boots the full app + UI in headless jsdom
node tools/sim-report.mjs 3     # CPU-vs-CPU balance report (3 matches per difficulty)
```

## Build the APK

### A. One command, no Android SDK (recommended)

`tools/build_apk.sh` builds a **signed, installable APK** with a self-contained
toolchain that it downloads from npm — a JDK 17, `aapt2`, `d8`, `apksigner` and
`android.jar`. You only need **Node.js 18+**, **Python 3** and `curl`:

```bash
npm install
npm test                    # 38 gameplay/unit checks
npm run build               # bundle web/src -> android/app/src/main/assets/www
bash tools/build_apk.sh     # -> artifacts/UltimateFootballMobile-release.apk
```

The script compiles the Java shell, packages the resources and the game bundle,
zipaligns and signs the APK (v1 + v2 signatures) and verifies the result with
`apksigner` + `aapt2 dump badging`. The first run downloads ~150 MB of toolchain
into `.tools/` (git-ignored); later runs are a few seconds.

### B. Gradle / Android Studio (standard Android build)

Requirements:

| Tool | Version used by this project | Notes |
| --- | --- | --- |
| Node.js | 18+ (20 LTS recommended) | builds the JS bundle |
| JDK | **17** (Gradle 8.2 + AGP 8.2.2 require 17) | Android Studio ships one |
| Android SDK Platform | **API 34** | `compileSdk`/`targetSdk` 34, `minSdk` 24 (Android 7.0) |
| Android Build-Tools | **34.0.0** | installed by the SDK manager |
| Gradle | *not needed locally* | the Gradle 8.2 wrapper is committed |

```bash
npm install
npm run build                  # required first: fills android/app/src/main/assets/www

cd android
./gradlew assembleRelease      # signed release APK
./gradlew assembleDebug        # debug APK
```

Resulting files:

```
android/app/build/outputs/apk/release/app-release.apk
android/app/build/outputs/apk/debug/app-debug.apk
```

If the SDK is not auto-detected, create `android/local.properties`:

```properties
sdk.dir=/path/to/Android/Sdk
```

**Android Studio route:** open the `android/` folder (`File → Open`), let it sync
(it uses the committed wrapper), then `Build → Build Bundle(s)/APK(s) → Build APK(s)`.
Remember to run `npm run build` first so the APK ships the current bundle.

## Get the prebuilt APK

A signed, installable **release APK is already committed in this repository**:

```
artifacts/UltimateFootballMobile-release.apk      (≈ 425 KB, version 1.0.0)
```

* **From GitHub:** open that file in the repository and press **Download**
  (the *Raw* / *Download* button).
* **From a clone:** `git clone …` and use `artifacts/UltimateFootballMobile-release.apk`
  directly.
* **Rebuild it:** `npm install && npm run build && bash tools/build_apk.sh`
  (see [Build the APK](#build-the-apk) — no Android SDK needed).

The CI workflow keeps this file up to date: it rebuilds the APK, uploads it as a
workflow artifact **and** commits the fresh APK back to `artifacts/`.

> The workflow template lives in `ci/android-build.yml` (GitHub only runs files in
> `.github/workflows/`, which requires a token/App with the `workflows` permission).
> To activate it:
> `mkdir -p .github/workflows && cp ci/android-build.yml .github/workflows/android-build.yml && git add .github/workflows && git commit -m "ci: enable apk build" && git push`

## Install the APK on an Android phone

1. Copy `artifacts/UltimateFootballMobile-release.apk` (or `app-release.apk`) to the phone
   (USB, Google Drive, Telegram, e‑mail — anything).
2. Open it with the phone's **Files** app. Android will ask to allow installing
   apps from this source: enable **“Allow from this source”** for the Files/browser
   app (Android 8+: *Settings → Apps → Special access → Install unknown apps*).
3. Tap **Install**, then **Open**. The game appears in the launcher as
   **Ultimate Football**.
4. The debug build (`./gradlew assembleDebug`, package
   `com.ufmstudio.ultimatefootball.debug`) can be installed side by side with the
   release build.

Requirements: Android **7.0 (API 24)** or newer, a GPU with OpenGL ES 2.0+ (every
phone from ~2012 onwards) and roughly 60 MB of free storage.

**Via ADB** (optional): `adb install -r artifacts/UltimateFootballMobile-release.apk`

## First run / troubleshooting on device

* **Black screen for a second** — that is the native splash; the first frame also
  compiles shaders. Nothing is loaded from the network.
* **Sluggish on an old phone** — open *Settings → Graphics* and select **LOW**, and
  set *FPS* to **30**. `Settings → Performance test` shows the measured frame rate.
* **Everything tiny/huge** — adjust *Settings → Controls* (button scale) and the
  camera sliders.
* **No sound** — the game starts audio on the first tap (browser policy); raise
  *Settings → Sound/Music*.
* **Game text language** — *Settings → Language* (EN / UZ / RU). Uzbek is the default.
* **Progress lost after reinstalling** — progress lives in the WebView storage plus
  a SharedPreferences mirror; uninstalling the app removes both.
* Debug build issues: connect the phone with USB debugging and watch
  `adb logcat -s UltimateFootball` — the WebView console is forwarded there.

## Tests and quality gates

| Command | What it checks |
| --- | --- |
| `npm test` | 38 headless tests: math/i18n/save helpers, club & squad data integrity, formation geometry, difficulty sanity, ball physics, **full CPU‑vs‑CPU matches on all 5 difficulties** (determinism, invariants, stats consistency, MOTM, half‑time swap), human control API, penalty shootout rules |
| `node tools/smoke-dom.mjs` | Boots the real application in headless jsdom with stubbed WebGL/Audio: visits all 10 screens, builds the squad UI, plays a live match with the actual renderer + HUD, fires every control, runs a penalty shootout, switches languages, writes a save. Fails on any runtime error |
| `python3 tools/check_android_api.py` | Parses the Android SDK API index (`tools/android-api-index.json`) and verifies every `android.*` import, constant, nested class and `@Override` used by the Java shell really exists in API 33 |
| `node tools/sim-report.mjs 3` | Prints CPU‑vs‑CPU balance metrics (goals, shots, possession, saves, fouls, MOTM) so gameplay tuning stays honest |
| `bash tools/build_apk.sh` | Full APK build: bundles, compiles the Java shell, packages assets, zipaligns, signs and then verifies the APK (`apksigner verify`, `aapt2 dump badging`) |

Current balance targets (CPU vs CPU, 90 simulated minutes): ~3–4 goals per match,
~25 shots, ~75 % pass completion, save/corner/foul counters all non‑zero.

## Release signing

* `android/keystore.properties` + `android/ufm-demo.keystore` are a **demo** keystore
  that is committed on purpose, so that the CI workflow and every contributor can
  produce an installable release build. Password: `ufm-demo-pass` (alias `ufm`).
* For Google Play, create your own keystore and keep it out of the repository:

```bash
keytool -genkeypair -v -keystore my-release.jks -alias mykey \
        -keyalg RSA -keysize 2048 -validity 10950
```

then point `android/keystore.properties` at it (`storeFile=../my-release.jks`,
plus the passwords/alias) and add the file to `.gitignore`. In CI, store the
passwords as repository secrets and let the workflow write `keystore.properties`
before the build.

## Renaming the game

The name lives in three places (no rebuild of code needed):

| Where | What |
| --- | --- |
| `android/app/src/main/res/values/strings.xml` | launcher label (`app_name`) |
| `web/src/core/i18n.js` | in‑game titles (`app.title` / `app.subtitle`) for all three languages |
| `package.json` / `README.md` | project metadata |

The launcher icon artwork is produced by `python3 tools/make_icons.py` — edit the
palette at the top of that script to re‑brand it in one run.

## Roadmap / how to extend

* **Online multiplayer / 1v1** — `MatchRunner` already accepts arbitrary team
  configs; feed it a remote player's intents and add a transport module.
* **Ranking / events / daily rewards** — `progression.js` and `game/state.js` keep
  results as plain data, ready to be posted to a backend; `Storage` can switch its
  mirror to a REST/cloud implementation behind the same API.
* **Login / cloud save** — implement `saveProgress`/`loadSave` against a server in a
  new `core/cloud.js` and call it from `Storage`.
* **New languages** — add one dictionary to `web/src/core/i18n.js`.
* **New formations** — add an entry to `web/src/sim/formations.js`; the team builder
  and the match engine pick it up automatically.

## Credits and licence

* Game design, code, art direction, procedural graphics and audio: **UFM Studio**
  (original work created for this project).
* Rendering/3D: [three.js](https://threejs.org) — MIT licence, bundled.
* All club names, player names, badges, stadiums and sponsors are fictional.

MIT licence for the project itself — see [LICENSE](LICENSE) (add one before
publishing if the repository does not have it yet).
