#!/usr/bin/env bash
# ============================================================
# ALHIKMAH — Full Release Build (Web + Android + iOS)
# ============================================================
set -euo pipefail

echo "🌙 ALHIKMAH — Full Release Build"
echo "================================="

# 1. Web build
echo ""
echo "📦 [1/4] Building Web App..."
npm install
npm run build
echo "✅ Web build: dist/"

# 2. Python content generation
echo ""
echo "📝 [2/4] Generating content..."
if command -v python3 >/dev/null 2>&1; then
  python3 generator.py || echo "⚠️  Generator skipped"
else
  echo "⚠️  Python tidak ditemukan, skip content generation"
fi

# 3. Android AAB + APK
echo ""
echo "🤖 [3/4] Building Android..."
if [ -n "${ANDROID_HOME:-}" ]; then
  bash scripts/build-bundle.sh
  bash scripts/build-apk.sh
else
  echo "⚠️  ANDROID_HOME tidak diset, skip Android build"
fi

# 4. iOS Archive
echo ""
echo "🍎 [4/4] Building iOS..."
if command -v xcodebuild >/dev/null 2>&1; then
  cd ios
  xcodebuild archive \
    -workspace ALHIKMAH.xcworkspace \
    -scheme ALHIKMAH \
    -configuration Release \
    -archivePath build/ALHIKMAH.xcarchive \
    CODE_SIGN_IDENTITY="Apple Distribution" \
    DEVELOPMENT_TEAM="${APPLE_TEAM_ID:-}"
  echo "✅ iOS archive: ios/build/ALHIKMAH.xcarchive"
else
  echo "⚠️  Xcode tidak tersedia (bukan macOS), skip iOS build"
fi

echo ""
echo "🎉 Build selesai!"
echo "================================="
echo "📦 Web      : dist/"
echo "📦 AAB      : android/app/build/outputs/bundle/release/app-release.aab"
echo "📦 APK      : android/app/build/outputs/apk/release/app-release.apk"
echo "📦 iOS      : ios/build/ALHIKMAH.xcarchive"
echo ""
echo "Design By ADMIN ALHIKMAH | Copyright 2025 All Application International Islamic"