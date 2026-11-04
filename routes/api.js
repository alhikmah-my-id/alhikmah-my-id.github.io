import express from "express";

const router = express.Router();

const TAPPX_KEYS = [
  "pub-65263-android-0300",
  "pub-57747-android-0996",
  "pub-60567-android-4416",
  "pub-65262-android-8892",
  "pub-79956-android-6297",
  "pub-79955-android-5582",
];

let adIndex = 0;

const CATEGORIES = [
  "Home","Aplikasi","Kisah Hikmah","Kitab/Buku","Pendidikan","Sholawat","Khutbah",
  "Kisah dan Tokoh","Informasi","Vidio","Adhan","Iqro'","Tafsir Web","Perpustakaan",
  "Arabic Pegon","Arabic Calligraphy","Kalender","Timer","Murotal 30 Juz",
  "Alqur'an Digital","WebOffice","CorelDRAW Arabic",
];

const ARTICLES = [
  { id: 1, slug: "keutamaan-membaca-alquran", title: "Keutamaan Membaca Al-Qur'an Setiap Hari", category: "Alqur'an Digital", excerpt: "Memahami keutamaan membaca Al-Qur'an, adab-adabnya, serta dampak spiritual bagi kehidupan seorang Muslim.", author: "Admin ALHIKMAH", date: "12 Desember 2025", readTime: "8 menit", views: 12450 },
  { id: 2, slug: "kisah-nabi-muhammad-saw", title: "Kisah Nabi Muhammad SAW Lengkap dari Lahir hingga Wafat", category: "Kisah dan Tokoh", excerpt: "Perjalanan hidup Rasulullah SAW yang penuh hikmah, dari kelahiran di Mekkah hingga wafatnya di Madinah.", author: "Admin ALHIKMAH", date: "10 Desember 2025", readTime: "12 menit", views: 9820 },
  { id: 3, slug: "panduan-sholat-tahajud", title: "Panduan Lengkap Sholat Tahajud dan Witir", category: "Pendidikan", excerpt: "Tata cara, waktu, dan keutamaan sholat tahajud beserta witir sebagai penutup sholat malam.", author: "Admin ALHIKMAH", date: "8 Desember 2025", readTime: "7 menit", views: 8730 },
  { id: 4, slug: "sejarah-peradaban-islam-nusantara", title: "Sejarah Peradaban Islam di Nusantara", category: "Kisah Hikmah", excerpt: "Jejak penyebaran Islam di Indonesia melalui perdagangan, kesultanan, dan peran Walisongo.", author: "Admin ALHIKMAH", date: "5 Desember 2025", readTime: "10 menit", views: 7210 },
  { id: 5, slug: "kumpulan-sholawat-nabi", title: "Kumpulan Sholawat Nabi Terpopuler dan Artinya", category: "Sholawat", excerpt: "Kumpulan sholawat Nabi yang populer di Indonesia beserta teks Arab, latin, dan terjemahannya.", author: "Admin ALHIKMAH", date: "3 Desember 2025", readTime: "6 menit", views: 6890 },
];

const TOOLS = [
  { id: "arabic-pegon", name: "Konverter Arabic Pegon", category: "Arabic Pegon", endpoint: "/api/tools/pegon" },
  { id: "kalender", name: "Kalender Hijriyah", category: "Kalender", endpoint: "/api/tools/kalender" },
  { id: "timer", name: "Timer & Stopwatch", category: "Timer", endpoint: "/api/tools/timer" },
  { id: "calligraphy", name: "Arabic Calligraphy", category: "Arabic Calligraphy", endpoint: "/api/tools/calligraphy" },
  { id: "coreldraw", name: "CorelDRAW Arabic Assets", category: "CorelDRAW Arabic", endpoint: "/api/tools/coreldraw" },
];

router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "ALHIKMAH API", version: "1.0.0", timestamp: new Date().toISOString() });
});

router.get("/articles", (req, res) => {
  const { category, q, limit } = req.query;
  let list = [...ARTICLES];
  if (category) list = list.filter((a) => a.category === category);
  if (q) {
    const needle = String(q).toLowerCase();
    list = list.filter((a) => a.title.toLowerCase().includes(needle) || a.excerpt.toLowerCase().includes(needle));
  }
  if (limit) list = list.slice(0, Number(limit));
  res.json({ total: list.length, articles: list });
});

router.get("/articles/:slug", (req, res) => {
  const article = ARTICLES.find((a) => a.slug === req.params.slug);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

router.get("/categories", (_req, res) => {
  res.json({ total: CATEGORIES.length, categories: CATEGORIES });
});

router.get("/tools", (_req, res) => {
  res.json({ total: TOOLS.length, tools: TOOLS });
});

router.get("/ads/rotate", (_req, res) => {
  const key = TAPPX_KEYS[adIndex % TAPPX_KEYS.length];
  adIndex++;
  res.json({ appKey: key, index: adIndex, pool: TAPPX_KEYS.length });
});

router.get("/ads/pool", (_req, res) => {
  res.json({ keys: TAPPX_KEYS });
});

router.post("/tools/pegon", (req, res) => {
  const { text = "" } = req.body || {};
  const map = { a: "ا", b: "ب", c: "چ", d: "د", e: "ي", f: "ف", g: "غ", h: "ه", i: "ي", j: "ج", k: "ك", l: "ل", m: "م", n: "ن", o: "و", p: "ف", q: "ق", r: "ر", s: "س", t: "ت", u: "و", v: "ف", w: "و", x: "كس", y: "ي", z: "ز" };
  const result = String(text).split("").map((c) => map[c.toLowerCase()] || c).join("");
  res.json({ input: text, output: result });
});

router.get("/tools/kalender", (req, res) => {
  const date = req.query.date ? new Date(String(req.query.date)) : new Date();
  const hijriMonths = ["Muharram","Safar","Rabiul Awal","Rabiul Akhir","Jumadil Awal","Jumadil Akhir","Rajab","Sya'ban","Ramadhan","Syawal","Dzulqa'dah","Dzulhijjah"];
  const hijriMonth = hijriMonths[(date.getMonth() + 5) % 12];
  res.json({ gregorian: date.toISOString().slice(0, 10), hijri: `${hijriMonth} 1447 H` });
});

export default router;