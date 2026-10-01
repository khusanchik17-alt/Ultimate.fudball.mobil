# ⚽ Ultimate Football Mobile

**Original 3D football game for Android** — 11v11 matches, career, cup, penalty
shootout, transfer market, team builder and a full offline save system.
No licensed content: all clubs, players, logos and graphics are original and
generated procedurally in code.

> 🎮 Play in your browser, or install the APK on any Android phone.

---

## 📦 Getting the APK (3 ways)

An installable, release-signed APK is always available in
**`artifacts/ultimate-football-mobile.apk`** (rebuilt by the scripts/CI below).

### 1. One-script local build (no Android Studio needed)
Self-downloads JDK 17 + aapt2 + android.jar + d8 + apksigner from npm, then
builds → zipaligns → signs the APK:

```bash
./scripts/build_apk.sh        # → artifacts/ultimate-football-mobile.apk
```

### 2. Gradle build (Android Studio / CI standard)
Requires **JDK 17** and the **Android SDK** (platform 34). Gradle downloads the rest.

```bash
# build the game web bundle into android/app/src/main/assets/www
cd web && npm ci && npm run build

# build the APK
cd ../android
./gradlew assembleDebug          # → app/build/outputs/apk/debug/app-debug.apk
./gradlew assembleRelease        # → app/build/outputs/apk/release/app-release.apk
```

### 3. GitHub Actions
The workflow ships as `ci/android-build.yml`. GitHub only executes workflows from
`.github/workflows/`, so the repo owner enables it once (needs owner rights):

```bash
mkdir -p .github/workflows && cp ci/android-build.yml .github/workflows/
git add .github/workflows && git commit -m "ci: enable apk build" && git push
```

After that, every push builds debug + release APKs, uploads them as the `ufm-apk`
artifact **and** commits them back to `artifacts/` on the branch.

### 3. Install on the phone
1. Copy `artifacts/ultimate-football-mobile.apk` to the phone.
2. Allow *Install unknown apps* for your file manager / browser.
3. Tap the APK → install → play. Works fully offline.

---

## 🕹 Controls

| Side | Control | Action |
|------|---------|--------|
| Left | Virtual joystick | move the player |
| Right | **PASS** (tap / hold) | short pass / long pass |
| Right | **SHOOT** (tap / hold / 2×tap) | finesse shot / power shot (hold) / chip shot (double tap) |
| Right | **THROUGH** | through ball to a runner |
| Right | **SPRINT** | sprint (stamina) |
| Defense | **TACKLE / PRESS / SWITCH** | steal, chase, change player |

Desktop (browser preview): `WASD / arrows` move, `X` pass, `Space` shoot, `C` tackle, `Shift` sprint, `Esc` pause.

---

## ✨ Features

- **3D stadium**: pitch, goals + nets, stands with thousands of instanced fans,
  ad boards, floodlights, live scoreboard, day & night matches.
- **11v11 simulation**: formations (4-3-3, 4-4-2, 4-2-3-1, 4-3-1-2, 3-5-2),
  AI pressing, wing/center attacks, support runs, goalkeeper saves & distribution.
- **5 difficulty tiers**: EASY → NORMAL → HARD → PRO → LEGENDARY.
- **Zarba / shoot system**: hold-to-power, finesse, chip, joystick aiming.
- **Modes**: Quick Match, Career (league season), Tournament (8-team cup),
  Penalty Shootout, Training. Online Match slot is reserved in the architecture.
- **Club & squad management**: 8 original clubs, 140+ generated players with
  full stat cards (SPD/SHO/PAS/DRI/DEF/PHY/STA), OVR, upgrades, transfers,
  daily transfer market, team OVR.
- **Progression**: coins, XP, levels, match rewards, trophies.
- **Settings**: graphics LOW/MED/HIGH + auto-detect, 30/60 FPS, sound & music,
  camera sensitivity, joystick size, languages **EN / UZ / RU**, match length.
- **Save system**: fully local (localStorage / WebView storage) — offline first.
- **Sound**: procedural WebAudio (kick, whistle, crowd, goals, UI) — zero audio files.

### Performance
- GPU-instanced players & crowd (whole match ≈ few dozen draw calls),
- quality presets control pixel ratio, shadows, crowd density,
- object pooling, allocation-free hot loop, no external asset downloads.

---

## 🗂 Repository structure

```
├── android/                  # Native Android app (WebView shell + Gradle project)
│   ├── app/src/main/
│   │   ├── java/…MainActivity.java   # fullscreen WebView + JS bridge (vibrate/back)
│   │   ├── assets/www/               # built game bundle (input to the APK)
│   │   └── res/                      # original icons (adaptive + legacy)
│   ├── build.gradle / settings.gradle / gradlew
│   └── release.keystore.p12          # DEMO signing key (replace for Play Store!)
├── web/                      # The game itself (Three.js, vanilla ES modules)
│   ├── src/
│   │   ├── main.js           # app shell, renderer, match lifecycle
│   │   ├── match.js          # 11v11 engine: AI, physics, camera, HUD
│   │   ├── scene3d.js        # stadium + instanced figures
│   │   ├── penalty.js / training.js
│   │   ├── meta.js           # economy, market, tournament, career
│   │   ├── ui.js             # menus & screens (EN/UZ/RU)
│   │   ├── data.js           # original clubs/players/formations/difficulties
│   │   └── …                 # save, audio, i18n, config, utils
│   └── scripts/build.mjs     # esbuild → android assets
├── scripts/                  # icon + keystore generators
├── .github/workflows/android-build.yml
├── artifacts/                # latest built APKs (written by CI)
└── docs/
```

Rebrand? Edit `web/src/config.js` (game name) + strings + icons.

---

## 🔧 Tech stack

| Layer | Tech |
|-------|------|
| Game engine | **Three.js (WebGL)** + custom simulation — runs in a fullscreen Android WebView |
| Native shell | Android (Java), Gradle 8.7, AGP 8.5, minSdk 24 / target 34 |
| Bundler | esbuild |
| CI | GitHub Actions (JDK 17, Android SDK) |
| Build outputs | APK (debug + signed release) |

### Why not Unity?
A Unity project needs a licensed Unity editor to build — impossible in CI/headless
environments and heavy for low-end phones. The WebGL + native-shell stack above is
fully buildable headlessly, tiny, and fast on weak devices. The game logic is
modular and engine-agnostic; see `docs/UNITY_GUIDE.md` if you later want to port
the same design to Unity (recommended version: **Unity 2022.3 LTS**, URP).

---

##  Future-ready architecture

`web/src/main.js` exposes a clean match lifecycle and all progression is
data-driven (`meta.js`, `save.js`), so adding:
online multiplayer, 1v1, ranking, events, daily rewards, player market sync,
login, cloud save — is a matter of adding service modules, not rewriting.

---

## ⚖️ License & IP notice
All content (names, clubs, players, icons, sounds) is original and generated
by this repository. Not affiliated with EA SPORTS / FC Mobile.
