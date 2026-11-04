#!/usr/bin/env bash
# ============================================================
# ALHIKMAH — Android APK Build Script (Release + Debug)
# Output:
#   - android/app/build/outputs/apk/release/app-release.apk
#   - android/app/build/outputs/apk/debug/app-debug.apk
# ============================================================
set -euo pipefail

echo "🌙 ALHIKMAH — Building Android APK"
echo "=================================="

if [ -z "${ANDROID_HOME:-}" ]; then
  echo "⚠️  ANDROID_HOME belum diset."
  exit 1
fi

cd android

# 1. Debug APK (untuk testing)
echo ""
echo "🔧 Building DEBUG APK..."
./gradlew assembleDebug
DEBUG_APK="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$DEBUG_APK" ]; then
  echo "✅ Debug APK: android/$DEBUG_APK ($(du -h "$DEBUG_APK" | cut -f1))"
fi

# 2. Release APK (signed, untuk distribusi)
echo ""
echo "🚀 Building RELEASE APK..."
KEYSTORE="${KEYSTORE_PATH:-alhikmah-release.keystore}"
if [ ! -f "$KEYSTORE" ]; then
  echo "🔐 Membuat keystore baru..."
  keytool -genkeypair \
    -v -keystore "$KEYSTORE" \
    -alias "${KEY_ALIAS:-alhikmah}" \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass "${KEYSTORE_PASSWORD:-alhikmah2025}" \
    -keypass "${KEY_PASSWORD:-alhikmah2025}" \
    -dname "CN=ADMIN ALHIKMAH, OU=ALHIKMAH, O=ALHIKMAH.MY.ID, L=Semarang, S=Jawa Tengah, C=ID"
fi

./gradlew assembleRelease \
  -Pandroid.injected.signing.store.file="../$KEYSTORE" \
  -Pandroid.injected.signing.store.password="${KEYSTORE_PASSWORD:-alhikmah2025}" \
  -Pandroid.injected.signing.key.alias="${KEY_ALIAS:-alhikmah}" \
  -Pandroid.injected.signing.key.password="${KEY_PASSWORD:-alhikmah2025}"

RELEASE_APK="app/build/outputs/apk/release/app-release.apk"
if [ -f "$RELEASE_APK" ]; then
  echo ""
  echo "✅ Release APK: android/$RELEASE_APK ($(du -h "$RELEASE_APK" | cut -f1))"
  echo ""
  echo "📤 Distribusi:"
  echo "   - Direct download: https://alhikmah.my.id/download/alhikmah.apk"
  echo "   - Google Play:     https://play.google.com/console"
  echo "   - Firebase App Distribution"
else
  echo "❌ Build gagal."
  exit 1
fi