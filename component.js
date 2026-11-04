const express = require("express");
const router = express.Router();

const CATEGORIES = [
  "Home", "Aplikasi", "Kisah Hikmah", "Kitab/Buku", "Pendidikan",
  "Sholawat", "Khutbah", "Kisah dan Tokoh", "Informasi", "Vidio",
  "Adhan", "Iqro'", "Tafsir Web", "Perpustakaan", "Arabic Pegon",
  "Arabic Calligraphy", "Kalender", "Timer", "Murotal 30 Juz",
  "Alqur'an Digital", "WebOffice", "CorelDRAW Arabic",
];

const QUICK_MENU = ["ADZKAR", "AL-QUR'AN", "TAKLIM", "HADIST", "SHOLAWAT", "ARABIC"];

const TAPPX_APP_KEYS = [
  "pub-65263-android-0300",
  "pub-57747-android-0996",
  "pub-60567-android-4416",
  "pub-65262-android-8892",
  "pub-79956-android-6297",
  "pub-79955-android-5582",
];

const TOOLS = [
  { id: "arabic-pegon", name: "Konverter Arabic Pegon", category: "Arabic Pegon" },
  { id: "kalender", name: "Kalender Hijriah", category: "Kalender" },
  { id: "timer", name: "Timer Adzan", category: "Timer" },
  { id: "coreldraw-arabic", name: "Aset CorelDRAW Arabic", category: "CorelDRAW Arabic" },
];

const ARTICLES = Array.from({ length: 30 }, (_, i) => {
  const cat = CATEGORIES[(i % (CATEGORIES.length - 1)) + 1];
  return {
    id: i + 1,
    slug: `artikel-alhikmah-${i + 1}`,
    title: `Artikel Islami ${i + 1} - ${cat}`,
    category: cat,
    excerpt: `Pembahasan mendalam mengenai ${cat} berdasarkan dalil Al-Qur'an dan hadits.`,
    words: 3000 + i * 25,
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});

let rotationIndex = 0;

router.get("/categories", (_req, res) => {
  res.json({ categories: CATEGORIES, quickMenu: QUICK_MENU });
});

router.get("/articles", (req, res) => {
  const { category, limit } = req.query;
  let list = ARTICLES;
  if (category) list = list.filter((a) => a.category === category);
  if (limit) list = list.slice(0, Number(limit));
  res.json({ total: list.length, articles: list });
});

router.get("/articles/:slug", (req, res) => {
  const article = ARTICLES.find((a) => a.slug === req.params.slug);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

router.get("/tools", (_req, res) => {
  res.json({ tools: TOOLS });
});

router.get("/ads/rotate", (_req, res) => {
  const key = TAPPX_APP_KEYS[rotationIndex % TAPPX_APP_KEYS.length];
  rotationIndex += 1;
  res.json({
    provider: "tappx",
    zone: "36063",
    appKey: key,
    pool: TAPPX_APP_KEYS,
  });
});

module.exports = router;