import os

# Daftar kategori/direktori sesuai permintaan
CATEGORIES = [
    "biografi-ulama", "kisah-hikmah", "kisah-sejarah", "info", "kisah-birrul-walidain",
    "kisah-hidayah-islam", "kisah-kaum-durhaka", "kisah-masa-depan", "kisah-nabi-dan-rasul", "kisah-nabi-muhammad",
    "kisah-nyata", "kisah-orang-shalih", "kisah-pilihan", "kisah-sahabat-nabi", "kisah-tabiin",
    "kisah-tak-nyata", "kisah-umat-terdahulu", "sejarah-islam", "nusantara", "news",
    "laporan-produksi", "merchandise-yufid", "mutiara-faidah", "sejarah", "teladan-muslimah",
    "books", "aplikasi", "download", "macro-economy", "explainers",
    "manufacturing", "property", "health", "education", "lifestyle",
    "hospitality", "tech-media", "smes", "luxury", "whos-who",
    "international", "local-resources", "politics", "culture", "science",
    "public-policy", "business-news", "sports", "arts", "celebrities",
    "automotive", "commentary", "interview", "fiqih-4-mazhab", "kamus-pintar-irob",
    "kamus-tashrif", "simulator-waris", "simulator-zakat", "asisten-kesehatan-mental",
    "mesin-pencari-hadits", "penyederhana-teks-arab", "perencana-haji", "browser-modesti",
    "mesin-logika-komparatif", "peta-sejarah-ar", "perpustakaan-digital", "alat-personalisasi-dakwah",
    "verifikator-fakta", "jurnal-iman", "penasihat-parenting", "pelatih-kebiasaan",
    "auditor-kepatuhan-syariah", "qibla-direction", "prayer-times", "hijri-calendar",
    "zakat-calculator", "salah-tracker", "mosque-finder"
]

TOTAL_FILES_PER_DIR = 30

def generate_html_content(category, post_num):
    title = f"Artikel Utama {category.replace('-', ' ').title()} #{post_num} - alhikmah-my-id.github.io"
    canonical_url = f"https://alhikmah-my-id.github.io/{category}/post{post_num}.html"
    prev_link = f"post{post_num-1}.html" if post_num > 1 else "#"
    next_link = f"post{post_num+1}.html" if post_num < TOTAL_FILES_PER_DIR else "#"

    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="icon" type="image/png" href="https://blogger.googleusercontent.com/img/a/AVvXsEiW2Sfw5ogSKhZbFiB-VdNXwmZoMGLTGPgx5ZYrTY8859clBvRGxgx-Dwc3i03YiUs1WiiL84uTSAlZ8civ17IWTI5Emt2vXmpuT-yRTzf4620rY_4Ib_vmUEGFfLXjzMiCfmQoWUg1mmj5hQu1IpD1CYguF9GocJ81MhsQTuPgt79-I8uOaPyGT0Qzs00=s200">
    <link rel="canonical" href="{canonical_url}" />
    <meta content='QT96Rd0InOuqkb4s1Wu5BlgGD_pCNOy8CsCtveF1zEA' name='google-site-verification'/>
    <meta content='alhikmah-my-id.github.io adalah situs Islam yang menyajikan informasi terkini tentang pendidikan, sejarah, budaya, sosial, serta tokoh-tokoh penting dalam kehidupan masyarakat dan bernegara.' name='description'/>
    <meta content='Islam, Pendidikan, Sejarah, Sosial, Budaya, Tokoh Islam, Kehidupan Masyarakat, Bernegara, Islam Terpercaya' name='keywords'/>
    <meta content='alhikmah-my-id.github.io' name='author'/>
    <meta content='alhikmah-my-id.github.io' name='copyright'/>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6718454554209533" crossorigin="anonymous"></script>
    <meta content='ca-pub-6718454554209533' name='google-adsense-account'/>
    <script async custom-element='amp-ad' src='https://cdn.ampproject.org/v0/amp-ad-0.1.js'></script>
    <link href='https://alhikmah-my-id.github.io/images.jpg' rel='icon' type='image/png'/>
    
    <meta property="og:type" content="article">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:title" content="{title}">
    <meta property="og:image" content="https://alhikmah-my-id.github.io/images.jpg">
    <meta property="og:image:secure_url" content="https://alhikmah-my-id.github.io/images.jpg">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{canonical_url}">
    <meta name="twitter:image" content="https://alhikmah-my-id.github.io/images.jpg">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5407249785989200"
    crossorigin="anonymous"></script>
    <link rel="icon" type="image/jpeg" href="https://alhikmah-my-id.github.io/images.jpg">
    <link rel="apple-touch-icon" href="https://alhikmah-my-id.github.io/images.jpg">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "{title}",
      "image": ["https://alhikmah-my-id.github.io/images.jpg"],
      "datePublished": "2026-01-01T08:00:00+07:00",
      "author": {{
        "@type": "Organization",
        "name": "alhikmah-my-id.github.io"
      }}
    }}
    </script>
</head>
<body class="bg-light">

    <!-- Header & Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="https://www.alhikmah-my-id.github.io/">
                <img src="https://alhikmah-my-id.github.io/images.jpg" alt="alhikmah" width="38" height="38" class="me-2 rounded-circle">
                <span class="fs-4 fw-bold text-warning">alhikmah-my-id.github.io</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="https://alhikmah-my-id.github.io/">Home</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Kategori</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="https://alhikmah-my-id.github.io/sejarah-islam/">Sejarah Islam</a></li>
                            <li><a class="dropdown-item" href="https://alhikmah-my-id.github.io/fiqih-4-mazhab/">Fiqih 4 Mazhab</a></li>
                            <li><a class="dropdown-item" href="https://alhikmah-my-id.github.io/biografi-ulama/">Biografi Ulama</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://alhikmah-my-id.github.io/kontak.html">Kontak</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container my-5 pt-5">
        <div class="row">
            <div class="col-lg-8">
                <article class="bg-white p-4 rounded shadow-sm">
                    <span class="badge bg-secondary mb-2">{category.upper()}</span>
                    <h1 class="fw-bold mb-3">{title}</h1>
                    <p class="text-muted">Dipublikasikan pada 2026 | Oleh Tim Redaksi Alhikmah</p>
                    
                    <div class="mb-4 text-center">
                        <img src="https://alhikmah-my-id.github.io/images.jpg" alt="Ilustrasi {title}" class="img-fluid rounded shadow" style="max-height: 400px; width: 100%; object-fit: cover;">
                        <small class="text-muted d-block mt-1">Ilustrasi: Dokumentasi Alhikmah (Alt: alhikmah)</small>
                    </div>

                    <!-- Table of Contents -->
                    <div class="card bg-light border-0 p-3 mb-4">
                        <h5 class="fw-bold"><i class="bi bi-list-nested"></i> Daftar Isi</h5>
                        <ul class="mb-0">
                            <li><a href="#pendahuluan">1. Pendahuluan</a></li>
                            <li><a href="#pembahasan">2. Pembahasan Utama</a></li>
                            <li><a href="#faq">3. Pertanyaan Umum (FAQ)</a></li>
                            <li><a href="#kesimpulan">4. Kesimpulan</a></li>
                        </ul>
                    </div>

                    <!-- Article Body (Simulasi Panjang 3000 Kata) -->
                    <section id="pendahuluan">
                        <h2 class="h4 fw-bold text-primary">1. Pendahuluan</h2>
                        <p>Selamat datang di portal Islam terpercaya alhikmah-my-id.github.io. Pada artikel kali ini dalam kategori <strong>{category}</strong>, kita akan mengupas tuntas berbagai aspek mendalam yang berkaitan dengan khazanah keislaman, pendidikan, sosial, serta sejarah peradaban Islam.</p>
                        <p>Konten ini disusun secara komprehensif guna memenuhi kebutuhan literasi digital umat Islam yang mendambakan informasi akurat, berlandaskan dalil yang shahih serta rujukan para ulama salafus shalih.</p>
                    </section>

                    <section id="pembahasan" class="mt-4">
                        <h2 class="h4 fw-bold text-primary">2. Pembahasan Utama & Analisis Mendalam</h2>
                        <h3 class="h5 fw-semibold">A. Latar Belakang dan Konteks Historis</h3>
                        <p>Dalam menelaah setiap permasalahan keagamaan maupun sosial, pendekatan historis dan normatif menjadi kunci utama agar pemahaman yang dihasilkan tidak keluar dari rel syariat Islam yang kaffah.</p>
                        
                        <h3 class="h5 fw-semibold mt-3">B. Relevansi di Era Modern</h3>
                        <p>Perkembangan teknologi dan dinamika zaman menuntut umat Islam untuk adaptif namun tetap memegang teguh prinsip-prinsip akidah dan akhlak mulia.</p>
                        
                        <h4 class="h6 fw-bold">1. Transformasi Digital Dakwah</h4>
                        <p>Pemanfaatan media digital kini menjadi sarana efektif menyebarkan nilai-nilai Islam rahmatan lil 'alamin.</p>
                    </section>

                    <!-- Navigasi Internal & Eksternal Link -->
                    <div class="my-4 p-3 border rounded bg-white">
                        <h5 class="fw-bold">Rujukan & Bacaan Terkait</h5>
                        <ul class="small mb-0">
                            <li>Internal Link 1: <a href="https://alhikmah-my-id.github.io/sejarah-islam/post1.html">Sejarah Peradaban Islam Klasik</a></li>
                            <li>Internal Link 2: <a href="https://alhikmah-my-id.github.io/fiqih-4-mazhab/post1.html">Panduan Fiqih Ibadah Harian</a></li>
                            <li>Internal Link 3: <a href="https://alhikmah-my-id.github.io/biografi-ulama/post1.html">Kisah Teladan Para Ulama Nusantara</a></li>
                            <li>Internal Link 4: <a href="https://alhikmah-my-id.github.io/alquran-player/">Murotal & Al-Qur'an Digital 30 Juz</a></li>
                            <li>Internal Link 5: <a href="https://alhikmah-my-id.github.io/jadwal-sholat/">Jadwal Sholat Real-Time Otomatis</a></li>
                            <li>Internal Link 6: <a href="https://alhikmah-my-id.github.io/kalender/">Kalender Hijriah & Jawa Terpadu</a></li>
                            <li>Internal Link 7: <a href="https://alhikmah-my-id.github.io/kontak.html">Layanan Konsultasi & Kontak Kami</a></li>
                        </ul>
                        <hr>
                        <ul class="small mb-0 text-muted">
                            <li>Eksternal Link 1: <a href="https://kemenag.go.id" target="_blank" rel="nofollow">Kementerian Agama RI</a></li>
                            <li>Eksternal Link 2: <a href="https://mui.or.id" target="_blank" rel="nofollow">Majelis Ulama Indonesia</a></li>
                            <li>Eksternal Link 3: <a href="https://nu.or.id" target="_blank" rel="nofollow">NU Online</a></li>
                            <li>Eksternal Link 4: <a href="https://muhammadiyah.or.id" target="_blank" rel="nofollow">Muhammadiyah</a></li>
                            <li>Eksternal Link 5: <a href="https://wikipedia.org" target="_blank" rel="nofollow">Wikipedia Ensiklopedia Bebas</a></li>
                            <li>Eksternal Link 6: <a href="https://github.com" target="_blank" rel="nofollow">GitHub Repository</a></li>
                            <li>Eksternal Link 7: <a href="https://google.com" target="_blank" rel="nofollow">Google Search Engine</a></li>
                        </ul>
                    </div>

                    <!-- FAQ Section -->
                    <section id="faq" class="mt-4">
                        <h3 class="h5 fw-bold text-primary">3. Pertanyaan yang Sering Diajukan (FAQ)</h3>
                        <div class="accordion" id="faqAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">Apa sumber rujukan dari artikel ini?</button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">Seluruh artikel bersumber dari literatur kitab-kitab klasik mu'tabarah serta referensi ilmiah terpercaya.</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Conclusion -->
                    <section id="kesimpulan" class="mt-4">
                        <h3 class="h5 fw-bold text-primary">4. Kesimpulan</h3>
                        <p>Dengan memahami materi ini secara utuh, diharapkan pembaca dapat mengamalkan nilai-nilai luhur dalam kehidupan sehari-hari serta senantiasa menjaga ukhuwah Islamiyah.</p>
                    </section>

                    <!-- Tombol Back / Next -->
                    <div class="d-flex justify-content-between mt-5">
                        <a href="{prev_link}" class="btn btn-outline-secondary">&laquo; Artikel Sebelumnya</a>
                        <a href="{next_link}" class="btn btn-outline-primary">Artikel Selanjutnya &raquo;</a>
                    </div>
                </article>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Navigasi Fitur Utama</h5>
                        <ul class="list-unstyled mb-0">
                            <li>✍️ <a href="https://alhikmah-my-id.github.io/arabic/pesantren/nd/">Arabic Pegon</a></li>
                            <li>📅 <a href="https://alhikmah-my-id.github.io/kalender/">Kalender Multi-Konversi</a></li>
                            <li>⏱️ <a href="https://alhikmah-my-id.github.io/jadwal-sholat/">Timer Jadwal Sholat</a></li>
                            <li>🎧 <a href="https://alhikmah-my-id.github.io/alquran-player/v6.html">Murotal 30 Juz</a></li>
                        </ul>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">Berita & Artikel Populer</h5>
                        <p class="small text-muted">Pantau terus pembaruan informasi terkini seputar dunia Islam dan teknologi pendidikan.</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="py-5 bg-black text-white mt-5">
        <div class="container">
            <div class="row align-items-center g-4">
                <div class="col-md-5 text-center text-md-start">
                    <a class="d-inline-flex align-items-center text-decoration-none mb-2" href="https://www.alhikmah-my-id.github.io/">
                        <span class="text-warning fs-5 fw-bold">alhikmah-my-id.github.io</span>
                    </a>
                    <p class="text-muted small mb-0">Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya.</p>
                </div>
                <div class="col-md-7">
                    <h6 class="text-white fw-bold mb-3 text-md-end">Navigasi Halaman Dokumen Resmi:</h6>
                    <div class="d-flex flex-wrap justify-content-md-end gap-3 justify-content-center" style="font-size: 0.9rem;">
                        <a class="text-decoration-none text-light" href="https://alhikmah-my-id.github.io/about-us.html" target="_blank">About Us</a>
                        <span class="text-muted">|</span>
                        <a class="text-decoration-none text-light" href="https://alhikmah-my-id.github.io/kontak.html">Kontak Kami</a>
                        <span class="text-muted">|</span>
                        <a class="text-decoration-none text-light" href="https://alhikmah-my-id.github.io/privacy.html" target="_blank">Privacy Policy</a>
                        <span class="text-muted">|</span>
                        <a class="text-decoration-none text-light" href="https://alhikmah-my-id.github.io/disclaimers.html" target="_blank">Disclaimers</a>
                        <span class="text-muted">|</span>
                        <a class="text-decoration-none text-light" href="https://alhikmah-my-id.github.io/sitemap.html" target="_blank">Sitemap</a>
                        <span class="text-muted">|</span>
                        <a class="text-decoration-none text-light" href="https://alhikmah-my-id.github.io/terms.html" target="_blank">Terms & Conditions</a>
                    </div>
                </div>
            </div>
            <hr class="border-secondary border-opacity-25 my-4">
            <div class="text-center text-muted small">
                &copy; 2026 alhikmah-my-id.github.io. All Rights Reserved. Powered by awgroupchannel.
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
"""
    return html

def main():
    print("Memulai pembuatan direktori dan file otomatis...")
    sitemap_urls = ["https://alhikmah-my-id.github.io/"]
    
    for cat in CATEGORIES:
        os.makedirs(cat, exist_ok=True)
        for i in range(1, TOTAL_FILES_PER_DIR + 1):
            filename = f"post{i}.html"
            filepath = os.path.join(cat, filename)
            
            content = generate_html_content(cat, i)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            
            sitemap_urls.append(f"https://alhikmah-my-id.github.io/{cat}/{filename}")
        print(f"-> Selesai membuat 30 file di dalam direktori: /{cat}/")

    # Generate sitemap.xml otomatis
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for url in sitemap_urls:
        sitemap_xml += f"  <url>\n    <loc>{url}</loc>\n    <lastmod>2026-03-30</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n"
    sitemap_xml += '</urlset>'

    with open("sitemap.xml", "w", encoding="utf-8") as sm:
        sm.write(sitemap_xml)
    print("\n[SUKSES] Seluruh direktori, artikel, serta file sitemap.xml berhasil digenerate otomatis!")

if __name__ == "__main__":
    main()
