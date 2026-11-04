# -*- coding: utf-8 -*-
"""
generator.py - ALHIKMAH Content Seeder
Membuat 30 artikel awal terdistribusi ke seluruh kategori utama.
"""
import os
import json
from datetime import datetime

import artikel

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "data")
SEED_FILE = os.path.join(OUTPUT_DIR, "articles.json")
TOTAL_ARTICLES = 30

CATEGORIES = [
    "Aplikasi", "Kisah Hikmah", "Kitab/Buku", "Pendidikan", "Sholawat",
    "Khutbah", "Kisah dan Tokoh", "Informasi", "Vidio", "Adhan",
    "Iqro'", "Tafsir Web", "Perpustakaan", "Arabic Pegon", "Arabic Calligraphy",
    "Kalender", "Timer", "Murotal 30 Juz", "Alqur'an Digital", "WebOffice",
    "CorelDRAW Arabic",
]

TOPIC_SEEDS = [
    "Keutamaan Menuntut Ilmu", "Adab Terhadap Guru", "Kisah Nabi Yusuf",
    "Kisah Nabi Musa", "Kisah Nabi Ibrahim", "Biografi Imam Syafi'i",
    "Biografi Imam Bukhari", "Tafsir Surah Al-Fatihah", "Tafsir Surah Yasin",
    "Keutamaan Sholawat Nabi", "Sholawat Nariyah", "Khutbah Jumat tentang Taqwa",
    "Khutbah Idul Fitri", "Sejarah Tulisan Pegon", "Khat Naskhi",
    "Khat Tsuluts", "Kalender Hijriah", "Bulan-Bulan Islam",
    "Murotal Juz 1", "Murotal Juz 30", "Adab Membaca Al-Qur'an Digital",
    "Aplikasi Qur'an Terbaik", "Desain Kaligrafi dengan CorelDRAW",
    "Aset Vektor Arab", "Tutorial Khat Digital", "Panduan Menulis Pegon",
    "Kamus Pegon-Indonesia", "Metode Menghafal Al-Qur'an",
    "Pendidikan Karakter Islami", "Keutamaan Mendengar Murotal",
]


def seed():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    articles = []
    for i in range(TOTAL_ARTICLES):
        topic = TOPIC_SEEDS[i % len(TOPIC_SEEDS)]
        category = CATEGORIES[i % len(CATEGORIES)]
        articles.append(artikel.generate_article(topic, category, i + 1))

    with open(SEED_FILE, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f"[generator.py] Seeder selesai: {len(articles)} artikel dibuat pada {datetime.now().isoformat()}")
    print(f"[generator.py] Output: {SEED_FILE}")
    return articles


if __name__ == "__main__":
    seed()