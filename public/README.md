# ALHIKMAH — Public Assets Directory

Direktori ini berisi **static assets** yang di-serve langsung oleh Express server tanpa melalui build process. Semua file di sini dapat diakses publik melalui `https://alhikmah.my.id/<filename>`.

---

## 📁 Daftar File

| File | URL Publik | Kegunaan |
|------|-----------|----------|
| `ads.txt` | `/ads.txt` | Konfigurasi authorized digital sellers untuk web |
| `app-ads.txt` | `/app-ads.txt` | Konfigurasi authorized digital sellers untuk mobile apps |
| `manifest.json` | `/manifest.json` | PWA manifest (installable web app) |
| `iklan.js` | `/iklan.js` | Modul rotasi iklan Tappx (client-side) |
| `robots.txt` | `/robots.txt` | Panduan crawler (auto-generated oleh server) |
| `sitemap.xml` | `/sitemap.xml` | Sitemap SEO (auto-generated oleh server) |
| `images.jpg` | `/images.jpg` | Logo & favicon ALHIKMAH |
| `favicon.ico` | `/favicon.ico` | Favicon fallback |

---

## 📄 ads.txt

**Tujuan:** Memberitahu ad exchanges siapa saja yang berhak menjual inventory iklan di domain `alhikmah.my.id`.

**Format:** `<domain>, <publisher-id>, <relationship>, <certification-authority-id>`

**Isi:**
