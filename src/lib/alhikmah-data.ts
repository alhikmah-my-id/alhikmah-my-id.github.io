export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  views: string;
  author: string;
  date: string;
  tags: string[];
};

export type Category = {
  name: string;
  slug: string;
  count: number;
};

export type PrayerTime = {
  name: string;
  time: string;
  arabic: string;
};

export const CATEGORIES: Category[] = [
  { name: "Home", slug: "home", count: 1 },
  { name: "Aplikasi", slug: "aplikasi", count: 22 },
  { name: "Kisah Hikmah", slug: "kisah-hikmah", count: 128 },
  { name: "Kitab/Buku", slug: "kitab-buku", count: 76 },
  { name: "Pendidikan", slug: "pendidikan", count: 94 },
  { name: "Sholawat", slug: "sholawat", count: 210 },
  { name: "Khutbah", slug: "khutbah", count: 58 },
  { name: "Kisah dan Tokoh", slug: "kisah-dan-tokoh", count: 87 },
  { name: "Informasi", slug: "informasi", count: 47 },
  { name: "Vidio", slug: "vidio", count: 132 },
  { name: "Adhan", slug: "adhan", count: 15 },
  { name: "Iqro'", slug: "iqro", count: 6 },
  { name: "Tafsir Web", slug: "tafsir-web", count: 114 },
  { name: "Perpustakaan", slug: "perpustakaan", count: 63 },
  { name: "Arabic Pegon", slug: "arabic-pegon", count: 25 },
  { name: "Arabic Calligraphy", slug: "arabic-calligraphy", count: 41 },
  { name: "Kalender", slug: "kalender", count: 12 },
  { name: "Timer", slug: "timer", count: 8 },
  { name: "Murotal 30 Juz", slug: "murotal-30-juz", count: 30 },
  { name: "Alqur'an Digital", slug: "alquran-digital", count: 42 },
  { name: "WebOffice", slug: "weboffice", count: 9 },
  { name: "CorelDRAW Arabic", slug: "coreldraw-arabic", count: 18 },
];

export const QUICK_NAV = [
  "ADZKAR",
  "AL-QUR'AN",
  "TAKLIM",
  "HADIST",
  "SHOLAWAT",
  "ARABIC",
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "keutamaan-membaca-alquran",
    title: "Keutamaan Membaca Al-Qur'an Setiap Hari",
    category: "Alqur'an Digital",
    excerpt:
      "Rasulullah ﷺ bersabda bahwa setiap huruf Al-Qur'an bernilai satu kebaikan yang dilipatgandakan sepuluh kali. Inilah panduan lengkap keutamaan tilawah harian.",
    content:
      "Al-Qur'an adalah kalamullah yang diturunkan kepada Nabi Muhammad ﷺ melalui perantaraan Jibril. Membacanya merupakan ibadah yang paling utama dan memiliki keutamaan luar biasa bagi setiap muslim yang istiqamah melakukannya setiap hari.",
    readTime: "8 menit",
    views: "12.4K",
    author: "ADMIN ALHIKMAH",
    date: "2025-12-01",
    tags: ["Al-Qur'an", "Tilawah", "Ibadah"],
  },
  {
    id: "2",
    slug: "sejarah-peradaban-islam-nusantara",
    title: "Sejarah Peradaban Islam di Nusantara",
    category: "Kisah dan Tokoh",
    excerpt:
      "Jejak dakwah Wali Songo yang membentuk karakter Islam Nusantara dengan pendekatan budaya dan kearifan lokal yang santun dan penuh hikmah.",
    content:
      "Islam masuk ke Nusantara melalui jalur perdagangan, perkawinan, tasawuf, dan pendidikan pesantren. Para wali menyebarkan Islam dengan pendekatan budaya sehingga Islam diterima secara damai.",
    readTime: "12 menit",
    views: "9.8K",
    author: "ADMIN ALHIKMAH",
    date: "2025-11-28",
    tags: ["Sejarah", "Wali Songo", "Nusantara"],
  },
  {
    id: "3",
    slug: "panduan-lengkap-sholat-tahajud",
    title: "Panduan Lengkap Sholat Tahajud",
    category: "Pendidikan",
    excerpt:
      "Tata cara, waktu terbaik, dan keutamaan sholat tahajud berdasarkan dalil Al-Qur'an dan hadits shahih. Lengkap dengan doa setelahnya.",
    content:
      "Sholat tahajud adalah sholat sunnah yang dikerjakan pada malam hari setelah tidur. Ia memiliki keutamaan yang sangat besar dan disebutkan langsung dalam Al-Qur'an surah Al-Isra ayat 79.",
    readTime: "6 menit",
    views: "15.2K",
    author: "ADMIN ALHIKMAH",
    date: "2025-11-25",
    tags: ["Sholat", "Tahajud", "Fiqih"],
  },
  {
    id: "4",
    slug: "doa-sebelum-tidur-lengkap",
    title: "Doa Sebelum Tidur Lengkap Arab & Latin",
    category: "Adzkar",
    excerpt:
      "Kumpulan doa sebelum tidur yang diajarkan Rasulullah ﷺ lengkap dengan tulisan Arab, latin, dan terjemahan Indonesia.",
    content:
      "Tidur adalah salah satu nikmat besar dari Allah. Sebelum tidur, dianjurkan membaca doa-doa yang diajarkan Rasulullah ﷺ agar tidur menjadi ibadah.",
    readTime: "5 menit",
    views: "18.7K",
    author: "ADMIN ALHIKMAH",
    date: "2025-11-20",
    tags: ["Doa", "Adzkar", "Sunnah"],
  },
  {
    id: "5",
    slug: "10-sholawat-pembuka-rezeki",
    title: "10 Sholawat Pembuka Rezeki",
    category: "Sholawat",
    excerpt:
      "Sholawat bukan hanya ibadah, tetapi juga pembuka pintu rezeki. Inilah 10 sholawat yang dianjurkan untuk diamalkan setiap hari.",
    content:
      "Sholawat adalah doa dan pujian kepada Nabi Muhammad ﷺ. Allah menjanjikan keberkahan dan kelapangan rezeki bagi siapa saja yang memperbanyak sholawat.",
    readTime: "7 menit",
    views: "22.1K",
    author: "ADMIN ALHIKMAH",
    date: "2025-11-18",
    tags: ["Sholawat", "Rezeki", "Amalan"],
  },
  {
    id: "6",
    slug: "cara-cepat-belajar-iqro",
    title: "Cara Cepat Belajar Iqro' untuk Pemula",
    category: "Iqro'",
    excerpt:
      "Metode praktis belajar membaca Al-Qur'an dari nol menggunakan buku Iqro' jilid 1 hingga 6 dengan bimbingan yang tepat.",
    content:
      "Iqro' adalah metode belajar membaca Al-Qur'an yang dikembangkan oleh KH. As'ad Humam. Metode ini sangat efektif untuk pemula karena langsung mengenalkan huruf hijaiyah secara bertahap.",
    readTime: "9 menit",
    views: "16.3K",
    author: "ADMIN ALHIKMAH",
    date: "2025-11-15",
    tags: ["Iqro", "Belajar", "Al-Qur'an"],
  },
];

export const POPULAR_POSTS = [
  "Doa Sebelum Tidur Lengkap Arab & Latin",
  "10 Sholawat Pembuka Rezeki",
  "Cara Cepat Belajar Iqro' untuk Pemula",
  "Kalender Hijriyah 1447 H Terbaru",
  "Kumpulan Khutbah Jumat Singkat",
];

export const ARCHIVES = [
  { label: "Desember 2025", count: 42 },
  { label: "November 2025", count: 87 },
  { label: "Oktober 2025", count: 63 },
  { label: "September 2025", count: 51 },
];

export const PRAYER_TIMES: PrayerTime[] = [
  { name: "Subuh", time: "04:15", arabic: "الفجر" },
  { name: "Dzuhur", time: "11:50", arabic: "الظهر" },
  { name: "Ashar", time: "15:10", arabic: "العصر" },
  { name: "Maghrib", time: "18:02", arabic: "المغرب" },
  { name: "Isya", time: "19:15", arabic: "العشاء" },
];

export const TAPPX_KEYS = [
  "pub-65263-android-0300",
  "pub-57747-android-0996",
  "pub-60567-android-4416",
  "pub-65262-android-8892",
  "pub-79956-android-6297",
  "pub-79955-android-5582",
];

export const APK_URL = "https://alhikmah.my.id/download/alhikmah.apk";
export const APK_VERSION = "1.0.0";
export const APK_SIZE = "8.2 MB";

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(current: Article, limit = 3): Article[] {
  return ARTICLES.filter(
    (a) => a.id !== current.id && a.category === current.category
  )
    .concat(ARTICLES.filter((a) => a.id !== current.id && a.category !== current.category))
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getNextArticle(current: Article): Article {
  const idx = ARTICLES.findIndex((a) => a.id === current.id);
  return ARTICLES[(idx + 1) % ARTICLES.length];
}

export function getPrevArticle(current: Article): Article {
  const idx = ARTICLES.findIndex((a) => a.id === current.id);
  return ARTICLES[(idx - 1 + ARTICLES.length) % ARTICLES.length];
}