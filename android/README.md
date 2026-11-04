# ALHIKMAH — Android App

Aplikasi Android resmi **ALHIKMAH** — Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya.

## 📱 Spesifikasi

| Item | Nilai |
|------|-------|
| Package | `id.my.alhikmah.app` |
| Min SDK | 21 (Android 5.0 Lollipop) |
| Target SDK | 34 (Android 14) |
| Compile SDK | 34 |
| Bahasa | Kotlin + Java |
| Version | 1.0.0 (versionCode 1) |
| Ukuran APK | ~8 MB |
| Ukuran AAB | ~6 MB |

## 🏗️ Arsitektur

Aplikasi ini menggunakan **WebView-based hybrid architecture**:

- **MainActivity** — WebView utama yang memuat `https://alhikmah.my.id`
- **SplashActivity** — Splash screen dengan branding ALHIKMAH
- **AlHikmahApp** — Application class untuk inisialisasi Tappx SDK
- **SwipeRefreshLayout** — Pull-to-refresh untuk reload halaman
- **Tappx Interstitial** — Iklan interstitial dengan rotasi 6 App Key

## 🔧 Build

### Prasyarat

- JDK 17+
- Android SDK 34
- Gradle 8.5+
- Keystore (untuk release build)

### Environment Variables
