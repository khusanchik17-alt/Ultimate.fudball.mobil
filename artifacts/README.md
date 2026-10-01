# APK artifacts

`UltimateFootballMobile-release.apk` — a **signed, installable release build** of the
game (package `com.ufmstudio.ultimatefootball`, version 1.0.0, minSdk 24 / target 34).

It is committed here so the game can be downloaded straight from the repository —
open the file on GitHub and press **Download**, or clone the repo and copy it to a
phone. The GitHub Actions workflow refreshes it after every push to `main`.

## Install

1. Copy the APK to the phone.
2. Open it with the Files app.
3. Allow "install unknown apps" for that app when Android asks.
4. Tap **Install** → **Open**. The launcher shows **Ultimate Football**.

Via ADB: `adb install -r artifacts/UltimateFootballMobile-release.apk`

## Rebuild it yourself

```bash
npm install
npm test                    # 38 gameplay/unit checks
npm run build               # bundle web/src -> android assets
bash tools/build_apk.sh     # SDK-less signed APK -> artifacts/
```

`tools/build_apk.sh` downloads its whole toolchain from npm (JDK 17, `aapt2`,
`d8`, `apksigner`, `android.jar`), so it needs nothing but Node.js, Python 3 and
curl. The standard Gradle/Android-Studio build (`cd android && ./gradlew
assembleRelease`) produces the same APK when the Android SDK is installed.

The build is signed with the **demo keystore** in `android/ufm-demo.keystore`
(password `ufm-demo-pass`, alias `ufm`). Replace it with your own keystore before
publishing on Google Play — see the main README, section "Release signing".
