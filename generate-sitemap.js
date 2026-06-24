const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js'); // Menggunakan modul bawaan jika tidak ingin install, atau pakai regex sederhana

// Baca sitemap.xml
const xmlPath = path.join(__dirname, 'sitemap.xml');
if (!fs.existsSync(xmlPath)) {
    console.error("File sitemap.xml tidak ditemukan!");
    process.exit(1);
}

const xmlData = fs.readFileSync(xmlPath, 'utf-8');

// Regex sederhana untuk mengambil semua <loc> dari sitemap.xml
const urlRegex = <loc>(.*?)<\/loc>/g;
let match;
let urls = [];

while ((match = urlRegex.exec(xmlData)) !== null) {
    urls.push(match[1]);
}

// Generate Konten HTML
let htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap Otomatis - alhikmah.my.id</title>
    <style>
        body { font-family: sans-serif; background: #f4f6f9; color: #333; padding: 30px; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        h1 { color: #16a085; border-bottom: 2px solid #eee; padding-bottom: 10px; font-size: 24px; }
        ul { list-style: none; padding: 0; }
        li { margin: 12px 0; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
        a { color: #2c3e50; text-decoration: none; font-size: 16px; word-break: break-all; }
        a:hover { color: #16a085; text-decoration: underline; }
        .count { font-size: 14px; color: #7f8c8d; }
    </style>
</head>
<body>
<div class="container">
    <h1>Peta Situs / Sitemap alhikmah.my.id</h1>
    <p class="count">Total Link Aktif: ${urls.length} Halaman</p>
    <ul>
`;

urls.forEach(url => {
    // Membuat nama judul link yang lebih bersih dari URL asli
    let displayTitle = url.replace('https://alhikmah.my.id/', '')
                          .replace('.html', '')
                          .replace(/-/g, ' ')
                          .replace(/p\//, '');
    
    if(displayTitle === '' || displayTitle === '/') displayTitle = 'Halaman Utama (Beranda)';

    htmlContent += `        <li><a href="${url}" target="_blank">${displayTitle}</a></li>\n`;
});

htmlContent += `    </ul>
</div>
</body>
</html>`;

// Tulis hasil ke sitemap.html
fs.writeFileSync(path.join(__dirname, 'sitemap.html'), htmlContent);
console.log('Sitemap.html berhasil diperbarui otomatis!');
