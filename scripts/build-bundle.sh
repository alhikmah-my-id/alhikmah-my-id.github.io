#!/usr/bin/env bash
# ============================================================
# ALHIKMAH — Android App Bundle (AAB) Build Script
# Output: android/app/build/outputs/bundle/release/app-release.aab
# ============================================================
set -euo pipefail

echo "🌙 ALHIKMAH — Building Android App Bundle (AAB)"
echo "================================================"

# 1. Environment check
if ! command -v java >/dev/null 2>&1; then
  echo "❌ Java tidak ditemukan. Install JDK 17+ terlebih dahulu."
  exit 1
fi

if [ -z "${ANDROID_HOME:-}" ]; then
  echo "⚠️  ANDROID_HOME belum diset. Set ke path Android SDK."
  exit 1
fi

# 2. Keystore check
KEYSTORE="${KEYSTORE_PATH:-android/alhikmah-release.keystore}"
if [ ! -f "$KEYSTORE" ]; then
  echo "🔐 Keystore tidak ditemukan. Membuat keystore baru..."
  keytool -genkeypair \
    -v \
    -keystore "$KEYSTORE" \
    -alias "${KEY_ALIAS:-alhikmah}" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "${KEYSTORE_PASSWORD:-alhikmah2025}" \
    -keypass "${KEY_PASSWORD:-alhikmah2025}" \
    -dname "CN=ADMIN ALHIKMAH, OU=ALHIKMAH, O=ALHIKMAH.MY.ID, L=Semarang, S=Jawa Tengah, C=ID"
  echo "✅ Keystore dibuat: $KEYSTORE"
fi

# 3. Clean & build AAB
cd android
./gradlew clean
./gradlew bundleRelease \
  -Pandroid.injected.signing.store.file="../$KEYSTORE" \
  -Pandroid.injected.signing.store.password="${KEYSTORE_PASSWORD:-alhikmah2025}" \
  -Pandroid.injected.signing.key.alias="${KEY_ALIAS:-alhikmah}" \
  -Pandroid.injected.signing.key.password="${KEY_PASSWORD:-alhikmah2025}"

AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_PATH" ]; then
  SIZE=$(du -h "$AAB_PATH" | cut -f1)
  echo ""
  echo "✅ AAB berhasil dibuild!"
  echo "📦 Path : android/$AAB_PATH"
  echo "📏 Size : $SIZE"
  echo ""
  echo "📤 Upload ke Google Play Console:"
  echo "   https://play.google.com/console"
else
  echo "❌ Build gagal. Cek log di atas."
  exit 1
fi