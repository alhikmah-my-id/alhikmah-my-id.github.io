import os
from datetime import datetime

# Konfigurasi Utama
BASE_URL = "https://alhikmah.my.id"
IGNORED_FILES = ["404.html", "googlee923eef73721cbfa.html", "sitemap.html"]
IGNORED_FOLDERS = [".git", ".github", "node_modules", "assets", "css", "js"]

def get_html_files():
    html_files = []
    # Berjalan menyusuri seluruh folder repositori
    for root, dirs, files in os.walk("."):
        # Abaikan folder yang tidak diperlukan
        dirs[:] = [d for d in dirs if d not in IGNORED_FOLDERS]
        
        for file in files:
            if file.endswith(".html") and file not in IGNORED_FILES:
                file_path = os.path.join(root, file)
                # Normalkan path ke format URL standar (garis miring kanan)
                rel_path = os.path.relpath(file_path, ".").replace("\\", "/")
                
                # Sederhanakan index.html agar URL lebih rapi
                if rel_path.endswith("index.html"):
                    rel_path = rel_path[:-10]
                
                html_files.append(rel_path)
    return html_files

def build_xml_sitemap(files, current_date):
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Homepage Utama
    xml_content += f"  <url>\n    <loc>{BASE_URL}/</loc>\n    <lastmod>{current_date}</lastmod>\n    <priority>1.0</priority>\n  </url>\n"
    
    for file in files:
        if file in ["", "/"]: continue
        url = f"{BASE_URL}/{file}"
        priority = "0.6" if ("p/" in file or "posts/" in file) else "0.8"
        
        xml_content += f"  <url>\n    <loc>{url}</loc>\n    <lastmod>{current_date}</lastmod>\n    <priority>{priority}</priority>\n  </url>\n"
        
    xml_content += "</urlset>"
    
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(xml_content)
    print(f"✅ sitemap.xml berhasil dibuat dengan {len(files) + 1} URL.")

def build_html_sitemap(files):
    html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap - alhikmah.my.id</title>
    <style>
        body {{ font-family: 'Segoe UI', sans-serif; background: #f8fafc; color: #334155; padding: 40px 20px; }}
        .box {{ max-width: 800px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }}
        h1 {{ color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; font-size: 24px; }}
        ul {{ list-style: none; padding: 0; }}
        li {{ padding: 10px 0; border-bottom: 1px solid #f1f5f9; }}
        a {{ color: #0284c7; text-decoration: none; font-size: 16px; }}
        a:hover {{ text-decoration: underline; color: #0369a1; }}
        .info {{ font-size: 14px; color: #64748b; margin-bottom: 20px; }}
    </style>
</head>
<body>
<div class="box">
    <h1>Peta Situs alhikmah.my.id</h1>
    <p class="info">Total tautan aktif: {len(files) + 1} halaman</p>
    <ul>
        <li><a href="{BASE_URL}/" target="_blank">Halaman Utama (Beranda)</a></li>
"""
    
    for file in files:
        if file in ["", "/"]: continue
        url = f"{BASE_URL}/{file}"
        # Membuat judul yang rapi dari nama file HTML-nya
        title = file.replace(".html", "").replace("-", " ").replace("p/", "").replace("posts/", "").title()
        html_content += f'        <li><a href="{url}" target="_blank">{title}</a></li>\n'
        
    html_content += """    </ul>
</div>
</body>
</html>"""
    
    with open("sitemap.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print("✅ sitemap.html berhasil dibuat dengan link active target='_blank'.")

if __name__ == "__main__":
    today = datetime.now().strftime("%Y-%m-%d")
    all_files = get_html_files()
    
    build_xml_sitemap(all_files, today)
    build_html_sitemap(all_files)
