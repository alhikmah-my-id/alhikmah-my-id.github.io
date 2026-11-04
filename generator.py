"""ALHIKMAH System Content & Seeder - generates 30 initial articles."""

import json
import os
from artikel import generate_article, CATEGORIES

TOPICS = [
    ("Keutamaan Membaca Al-Qur'an", "Alqur'an Digital"),
    ("Kisah Nabi Muhammad SAW", "Kisah dan Tokoh"),
    ("Panduan Sholat Tahajud", "Pendidikan"),
    ("Sejarah Peradaban Islam Nusantara", "Kisah Hikmah"),
    ("Kumpulan Sholawat Nabi", "Sholawat"),
    ("Adab Menuntut Ilmu", "Pendidikan"),
    ("Tafsir Surah Al-Fatihah", "Tafsir Web"),
    ("Keutamaan Bulan Ramadhan", "Pendidikan"),
    ("Kisah Nabi Ibrahim AS", "Kisah dan Tokoh"),
    ("Panduan Zakat Mal", "Pendidikan"),
    ("Sejarah Walisongo", "Kisah Hikmah"),
    ("Keutamaan Sholat Berjamaah", "Pendidikan"),
    ("Kisah Nabi Musa AS", "Kisah dan Tokoh"),
    ("Panduan Puasa Sunnah", "Pendidikan"),
    ("Keutamaan Sedekah", "Pendidikan"),
    ("Kisah Nabi Isa AS", "Kisah dan Tokoh"),
    ("Panduan Haji dan Umrah", "Pendidikan"),
    ("Keutamaan Membaca Sholawat", "Sholawat"),
    ("Kisah Nabi Yusuf AS", "Kisah dan Tokoh"),
    ("Panduan Aqiqah", "Pendidikan"),
    ("Sejarah Kesultanan Islam", "Kisah Hikmah"),
    ("Keutamaan Doa Malam", "Pendidikan"),
    ("Kisah Nabi Nuh AS", "Kisah dan Tokoh"),
    ("Panduan Kurban", "Pendidikan"),
    ("Keutamaan Istighfar", "Pendidikan"),
    ("Kisah Nabi Adam AS", "Kisah dan Tokoh"),
    ("Panduan Sholat Jumat", "Khutbah"),
    ("Keutamaan Ilmu Fiqih", "Kitab/Buku"),
    ("Sejarah Peradaban Islam Andalusia", "Kisah Hikmah"),
    ("Panduan Membaca Al-Qur'an untuk Pemula", "Iqro'"),
]


def seed(output_dir: str = "data") -> None:
    os.makedirs(output_dir, exist_ok=True)
    articles = []
    for i, (topic, category) in enumerate(TOPICS, start=1):
        article = generate_article(topic, category)
        article["id"] = i
        articles.append(article)
        print(f"[{i:02d}/30] Generated: {article['title']} ({article['wordCount']} words)")

    index_path = os.path.join(output_dir, "articles.json")
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump({"total": len(articles), "articles": articles}, f, ensure_ascii=False, indent=2)

    cat_index = {}
    for a in articles:
        cat_index.setdefault(a["category"], []).append(a["id"])
    with open(os.path.join(output_dir, "categories.json"), "w", encoding="utf-8") as f:
        json.dump(cat_index, f, ensure_ascii=False, indent=2)

    print(f"\nSeeded {len(articles)} articles across {len(cat_index)} categories.")
    print(f"Output: {index_path}")


if __name__ == "__main__":
    seed()