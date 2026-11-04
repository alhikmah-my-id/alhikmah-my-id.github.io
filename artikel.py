"""ALHIKMAH Article Generator - SEO-ready Islamic articles (3000+ words)."""

import json
import random
from datetime import datetime

CATEGORIES = [
    "Aplikasi", "Kisah Hikmah", "Kitab/Buku", "Pendidikan", "Sholawat", "Khutbah",
    "Kisah dan Tokoh", "Informasi", "Vidio", "Adhan", "Iqro'", "Tafsir Web",
    "Perpustakaan", "Arabic Pegon", "Arabic Calligraphy", "Kalender", "Timer",
    "Murotal 30 Juz", "Alqur'an Digital", "WebOffice", "CorelDRAW Arabic",
]

PARAGRAPH_TEMPLATES = [
    "Pembahasan mengenai {topic} merupakan salah satu topik penting dalam khazanah keilmuan Islam yang telah dikaji oleh para ulama sejak berabad-abad lamanya. Dalam konteks kehidupan modern, pemahaman yang mendalam terhadap {topic} menjadi semakin relevan mengingat kompleksitas tantangan yang dihadapi umat Islam saat ini.",
    "Para ulama klasik maupun kontemporer telah menuangkan pemikiran mereka tentang {topic} dalam berbagai kitab dan risalah. Imam Al-Ghazali dalam Ihya' Ulumuddin menekankan pentingnya memahami {topic} secara komprehensif, tidak hanya dari aspek fiqih semata, tetapi juga dari dimensi spiritual dan sosial.",
    "Dalam praktiknya, {topic} memiliki beberapa aspek fundamental yang perlu diperhatikan. Pertama, aspek akidah yang menjadi landasan keyakinan. Kedua, aspek syariat yang mengatur tata cara pelaksanaan. Ketiga, aspek akhlak yang mencerminkan nilai-nilai moral. Keempat, aspek sosial yang berkaitan dengan interaksi antar sesama manusia.",
    "Studi tentang {topic} juga menunjukkan bahwa Islam sangat memperhatikan keseimbangan antara habluminallah dan habluminannas. Konsep ini mengajarkan bahwa kesalehan individu tidak cukup tanpa diiringi dengan kontribusi positif bagi masyarakat luas.",
    "Di era digital seperti sekarang, penyebaran pemahaman tentang {topic} dapat dilakukan melalui berbagai media. Platform seperti ALHIKMAH berupaya menyajikan konten yang akurat, berimbang, dan mudah dipahami oleh berbagai kalangan, mulai dari pelajar hingga profesional.",
    "Kesimpulannya, {topic} bukanlah sekadar wacana teoritis, melainkan pedoman praktis yang dapat diaplikasikan dalam kehidupan sehari-hari. Dengan memahami {topic} secara benar, seorang Muslim dapat menjalani hidup dengan lebih bermakna dan berkontribusi positif bagi umat.",
]


def slugify(text: str) -> str:
    return "".join(c if c.isalnum() or c == " " else "" for c in text.lower()).strip().replace(" ", "-")


def build_section(level: int, title: str, topic: str, paragraphs: int = 4) -> dict:
    body = []
    for i in range(paragraphs):
        template = PARAGRAPH_TEMPLATES[i % len(PARAGRAPH_TEMPLATES)]
        body.append(template.format(topic=topic))
    return {"level": level, "text": title, "body": body}


def generate_article(topic: str, category: str) -> dict:
    sections = [
        build_section(1, f"Pengertian {topic}", topic, 5),
        build_section(2, f"Dalil Al-Qur'an tentang {topic}", topic, 4),
        build_section(3, f"Hadits Terkait {topic}", topic, 4),
        build_section(4, f"Pandangan Ulama tentang {topic}", topic, 4),
        build_section(5, f"Praktik {topic} di Era Modern", topic, 4),
        build_section(6, f"Catatan Penting", topic, 3),
        build_section(2, f"Manfaat dan Hikmah {topic}", topic, 5),
        build_section(3, f"Tantangan dalam Mengamalkan {topic}", topic, 4),
        build_section(4, f"Solusi Praktis", topic, 4),
        build_section(2, f"Kesimpulan {topic}", topic, 4),
    ]

    faq = [
        {"q": f"Apa pengertian {topic} menurut para ulama?", "a": f"{topic} adalah topik yang telah dibahas secara mendalam oleh para ulama klasik dan kontemporer dengan berbagai sudut pandang."},
        {"q": f"Bagaimana cara mengamalkan {topic} dalam kehidupan sehari-hari?", "a": f"Mulailah dengan memahami dasar-dasarnya, kemudian praktikkan secara bertahap dan konsisten."},
        {"q": f"Apakah {topic} wajib bagi setiap Muslim?", "a": f"Kewajiban terkait {topic} bergantung pada konteks dan kondisi masing-masing individu."},
    ]

    word_count = sum(len(p.split()) for s in sections for p in s["body"])
    while word_count < 3000:
        sections.append(build_section(3, f"Pembahasan Lanjutan {topic}", topic, 6))
        word_count = sum(len(p.split()) for s in sections for p in s["body"])

    return {
        "slug": slugify(topic),
        "title": f"{topic} - Panduan Lengkap Berdasarkan Al-Qur'an dan Sunnah",
        "category": category,
        "author": "Admin ALHIKMAH",
        "date": datetime.now().strftime("%d %B %Y"),
        "readTime": f"{max(5, word_count // 200)} menit",
        "views": random.randint(1000, 15000),
        "wordCount": word_count,
        "content": sections,
        "faq": faq,
        "conclusion": f"Demikianlah pembahasan lengkap mengenai {topic}. Semoga artikel ini bermanfaat dan menjadi amal jariyah bagi kita semua.",
    }


if __name__ == "__main__":
    article = generate_article("Keutamaan Membaca Al-Qur'an", "Alqur'an Digital")
    print(json.dumps(article, ensure_ascii=False, indent=2))