# Kebijakan Keamanan ALHIKMAH

## 🔒 Versi yang Didukung

| Versi | Didukung |
|-------|----------|
| 1.0.x | ✅ Ya |
| < 1.0 | ❌ Tidak |

## 🚨 Melaporkan Kerentanan

Jika Anda menemukan kerentanan keamanan, **JANGAN** buka issue publik. Sebaliknya, kirim laporan ke:

**Email:** security@alhikmah.my.id

### Informasi yang Perlu Disertakan

- Deskripsi kerentanan
- Langkah reproduksi
- Dampak potensial
- Saran perbaikan (jika ada)
- Informasi kontak Anda

### Waktu Respons

| Tahap | Waktu |
|-------|-------|
| Konfirmasi penerimaan | 48 jam |
| Analisis awal | 5 hari kerja |
| Perbaikan | 30 hari kerja |
| Disclosure publik | Setelah perbaikan |

## 🛡️ Praktik Keamanan

### Web
- HTTPS wajib (HSTS enabled)
- Content Security Policy (CSP)
- CORS dengan whitelist origin
- Input validation & sanitization
- Rate limiting pada API

### Android
- Network Security Config (HTTPS only)
- ProGuard/R8 obfuscation
- Signed APK/AAB
- No cleartext traffic

### iOS
- App Transport Security (ATS)
- Code signing
- Keychain untuk data sensitif
- No insecure HTTP

### Data
- Tidak menyimpan data pribadi tanpa consent
- Enkripsi data sensitif
- Regular security audit
- Dependency vulnerability scanning

## 🙏 Penghargaan

Kami berterima kasih kepada peneliti keamanan yang telah membantu menjaga keamanan ALHIKMAH. Nama Anda akan dicantumkan di sini (dengan izin Anda).

---

Design By ADMIN ALHIKMAH | Copyright 2025 All Application International Islamic