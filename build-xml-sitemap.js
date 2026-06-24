const fs = require('fs');
const path = require('path');

// Ganti dengan domain utama Anda
const BASE_URL = 'https://alhikmah.my.id';

// File atau folder yang ingin diabaikan/tidak dimasukkan ke sitemap
const IGNORED_FILES = ['404.html', 'googlee923eef73721cbfa.html']; // sesuaikan jika ada file verifikasi
const IGNORED_FOLDERS = ['.git', '.github', 'node_modules', 'assets', 'css', 'js'];

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORED_FOLDERS.includes(file)) {
                arrayOfFiles = getAllHtmlFiles(filePath, arrayOfFiles);
            }
        } else {
            if (file.endsWith('.html') && !IGNORED_FILES.includes(file)) {
                // Ubah path lokal menjadi bentuk URL relatif web
                let relativePath = path.relative(__dirname, filePath).replace(/\\/g, '/');
                
                // Bersihkan 'index.html' agar URL lebih rapi (SEO Friendly)
                if (relativePath.endsWith('index.html')) {
                    relativePath = relativePath.slice(0, -10);
                }
                
                arrayOfFiles.push(relativePath);
            }
        }
    });

    return arrayOfFiles;
}

function generateSitemap() {
    const htmlFiles = getAllHtmlFiles(__dirname);
    const currentDate = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Tambahkan halaman utama (Homepage) terlebih dahulu
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // Tambahkan halaman-halaman lainnya
    htmlFiles.forEach((file) => {
        // Lewati jika itu homepage ganda
        if (file === '' || file === '/') return;

        const url = `${BASE_URL}/${file}`;
        // Set prioritas lebih rendah untuk sub-halaman/artikel
        const priority = file.includes('p/') || file.includes('posts/') ? '0.6' : '0.8';

        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
    console.log(`Berhasil! sitemap.xml dibuat otomatis dengan total ${htmlFiles.length + 1} URL.`);
}

generateSitemap();
