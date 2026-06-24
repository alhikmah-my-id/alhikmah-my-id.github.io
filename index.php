<?php
/**
 * Alhikmah Core Gateway Service (PHP Version)
 * Mengambil data dari situs utama dengan sistem caching bawaan.
 */

define('TARGET_URL', 'https://alhikmah.my.id/');
define('CACHE_FILE', __DIR__ . '/alhikmah_cache.html');
define('CACHE_TIME', 3600); // Durasi cache dalam detik (1 jam)

function ambil_konten_alhikmah() {
    // 1. Cek apakah file cache masih valid untuk menghemat resource
    if (file_exists(CACHE_FILE) && (time() - filemtime(CACHE_FILE) < CACHE_TIME)) {
        return file_get_contents(CACHE_FILE);
    }

    // 2. Jika cache kedaluwarsa, ambil data baru via cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, TARGET_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Alhikmah-PHP-Agent/1.0');

    $output = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // 3. Simpan ke cache jika request sukses (HTTP 200)
    if ($http_code === 200 && !empty($output)) {
        file_put_contents(CACHE_FILE, $output);
        return $output;
    }

    // Fallback: Jika gagal ambil yang baru, pakai cache lama jika ada
    if (file_exists(CACHE_FILE)) {
        return file_get_contents(CACHE_FILE);
    }

    return "<p style='color:red;'>Gagal memuat konten dari situs utama Alhikmah.</p>";
}

$konten = ambil_konten_alhikmah();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alhikmah Service Portal (PHP)</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f7f6;
            color: #333;
        }
        .wrapper {
            max-width: 900px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .meta-info {
            font-size: 0.85em;
            color: #777;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

<div class="wrapper">
    <div class="meta-info">
        <strong>Alhikmah PHP Service Engine</strong> | 
        Status Terakhir Server: <?php echo date('Y-m-d H:i:s'); ?>
    </div>

    <div class="content-area">
        <?php echo $konten; ?>
    </div>
</div>

</body>
</html>
