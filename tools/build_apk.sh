#!/usr/bin/env bash
# Builds the Android APK with a fully self-downloading toolchain (npm-based).
# Works without Android Studio / Gradle / system Java:
#   - JDK 17        ← npm package javajre-linux-64
#   - aapt2 (linux) ← npm package aaptjs3
#   - android.jar / d8.jar / apksigner.jar ← npm package @drxiaozhi/minapk
# Alternatively, if Gradle + Android SDK are installed, prefer:
#   cd android && ./gradlew assembleRelease
set -euo pipefail
cd "$(dirname "$0")/.."

TOOLS=.tools
B=build/apk
mkdir -p "$TOOLS" artifacts

# ---------------------------------------------------------------- JDK 17
if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/javac" ]; then
  J="$JAVA_HOME/bin"
elif [ -x "$TOOLS/jdk/bin/javac" ]; then
  JAVA_HOME="$PWD/$TOOLS/jdk"; J="$JAVA_HOME/bin"
else
  echo "[apk] downloading JDK 17 …"
  rm -rf "$TOOLS/jdkdl" && mkdir -p "$TOOLS/jdkdl"
  (cd "$TOOLS/jdkdl" && npm init -y >/dev/null 2>&1 && npm i javajre-linux-64@17.0.8 --no-audit --no-fund >/dev/null 2>&1)
  mv "$TOOLS/jdkdl/node_modules/javajre-linux-64/jre" "$TOOLS/jdk"
  rm -rf "$TOOLS/jdkdl"
  JAVA_HOME="$PWD/$TOOLS/jdk"; J="$JAVA_HOME/bin"
fi

# ---------------------------------------------------------------- android tools
if [ ! -f "$TOOLS/android.jar" ]; then
  echo "[apk] downloading android.jar / d8 / apksigner …"
  curl -sL https://registry.npmjs.org/@drxiaozhi/minapk/-/minapk-0.4.0.tgz -o "$TOOLS/minapk.tgz"
  tar xzf "$TOOLS/minapk.tgz" -C "$TOOLS" package/tools
  mv "$TOOLS/package/tools/android.jar" "$TOOLS/package/tools/d8.jar" "$TOOLS/package/tools/apksigner.jar" "$TOOLS/"
  rm -rf "$TOOLS/package" "$TOOLS/minapk.tgz"
fi
if [ ! -x "$TOOLS/aapt2" ]; then
  echo "[apk] downloading aapt2 (linux) …"
  curl -sL https://registry.npmjs.org/aaptjs3/-/aaptjs3-2.0.2.tgz -o "$TOOLS/aaptjs3.tgz"
  tar xzf "$TOOLS/aaptjs3.tgz" -C "$TOOLS" package/bin/x64/linux/aapt2
  mv "$TOOLS/package/bin/x64/linux/aapt2" "$TOOLS/aapt2"
  rm -rf "$TOOLS/package" "$TOOLS/aaptjs3.tgz"
  chmod +x "$TOOLS/aapt2"
fi

# ---------------------------------------------------------------- web bundle
if [ ! -f android/app/src/main/assets/www/game.bundle.js ]; then
  echo "[apk] bundling the game (npm run build) …"
  npm run build
fi

# ---------------------------------------------------------------- pipeline
rm -rf "$B" && mkdir -p "$B/gen" "$B/classes" "$B/dex"
echo "[apk] aapt2 compile + link"
"$TOOLS/aapt2" compile --dir android/app/src/main/res -o "$B/res.zip"
# Gradle injects these; the SDK-less pipeline has to stamp them explicitly.
sed -e 's#<manifest #<manifest package="com.ufmstudio.ultimatefootball" android:versionCode="1" android:versionName="1.0.0" #' \
  android/app/src/main/AndroidManifest.xml > "$B/AndroidManifest.xml"
"$TOOLS/aapt2" link -o "$B/base.apk" -I "$TOOLS/android.jar" \
  --manifest "$B/AndroidManifest.xml" --java "$B/gen" --auto-add-overlay "$B/res.zip" \
  --min-sdk-version 24 --target-sdk-version 34 \
  -A android/app/src/main/assets

echo "[apk] javac"
"$J/javac" -nowarn -encoding UTF-8 -classpath "$TOOLS/android.jar" -d "$B/classes" \
  $(find android/app/src/main/java -name '*.java') \
  $(find "$B/gen" -name '*.java')

echo "[apk] d8 → classes.dex"
"$J/java" -cp "$TOOLS/d8.jar" com.android.tools.r8.D8 --release --min-api 24 \
  --lib "$TOOLS/android.jar" --output "$B/dex" $(find "$B/classes" -name '*.class')

echo "[apk] packaging"
python3 - "$B/base.apk" "$B/unsigned.apk" "$B/dex/classes.dex" <<'EOF'
import shutil, sys, zipfile
shutil.copy(sys.argv[1], sys.argv[2])
z = zipfile.ZipFile(sys.argv[2], 'a')
z.write(sys.argv[3], 'classes.dex', zipfile.ZIP_DEFLATED)
z.close()
EOF

python3 tools/zipalign.py "$B/unsigned.apk" "$B/aligned.apk"

echo "[apk] signing"
"$J/java" -jar "$TOOLS/apksigner.jar" sign \
  --ks android/ufm-demo.keystore --ks-type JKS \
  --ks-pass pass:ufm-demo-pass --ks-key-alias ufm --key-pass pass:ufm-demo-pass \
  --v1-signing-enabled true --v2-signing-enabled true --v4-signing-enabled false \
  --out artifacts/UltimateFootballMobile-release.apk "$B/aligned.apk"

"$J/java" -jar "$TOOLS/apksigner.jar" verify --print-certs artifacts/UltimateFootballMobile-release.apk
rm -f artifacts/UltimateFootballMobile-release.apk.idsig
echo "[apk] verifying the manifest, resources and packaged web bundle …"
"$TOOLS/aapt2" dump badging artifacts/UltimateFootballMobile-release.apk \
  | grep -E "^(package|sdkVersion|targetSdkVersion|application-label:|launchable-activity)" || true
ls -lh artifacts/UltimateFootballMobile-release.apk
echo "[apk] DONE → artifacts/UltimateFootballMobile-release.apk"
