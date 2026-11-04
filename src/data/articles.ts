export type ArticleSection = { level: number; text: string; body: string[] };
export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  content: ArticleSection[];
  faq: { q: string; a: string }[];
  conclusion: string;
  related: number[];
};

export const TAPPX_KEYS = [
  "pub-65263-android-0300",
  "pub-57747-android-0996",
  "pub-60567-android-4416",
  "pub-65262-android-8892",
  "pub-79956-android-6297",
  "pub-79955-android-5582",
];

export const ADS_TXT = `google.com, pub-6718454554209533, DIRECT, f08c47fec0942fa0
google.com, pub-5407249785989200, DIRECT, f08c47fec0942fa0
tappx.com, 36063, DIRECT, 9f375a07da0318ec
inventorypartnerdomain=tappx.com
pubmatic.com, 158111, RESELLER, 5d62403b186f2ace
smartadserver.com, 1692, RESELLER, 060d053dcf45cbf3
rubiconproject.com, 13856, RESELLER, 0bfd66d529a55807
sharethrough.com, 1692, RESELLER, d53b998a7bd4ecd2
mediaverse.ai, 3021109348, RESELLER
pubmatic.com, 167377, RESELLER, 5d62403b186f2ace
loopme.com, 11227, RESELLER, 6c8d5f95897a5a3b
pubnative.net, 1018206, RESELLER, d641df8625486a7b
videoheroes.tv, 212473, RESELLER, 064bc410192443d8
video.unrulymedia.com, 3341072718, RESELLER
lijit.com, 396126, RESELLER, fafdf38b16bf6b2b
onlinemediasolutions.com, 20937, RESELLER
thebrave.io, 1234661, RESELLER, c25b2154543746ac
triplelift.com, 11617, RESELLER, 6c33edb13117fd86
chartboost.com, 5da62a1035b91e0aff190bf7, RESELLER
33across.com, 0010b00001siQHqAAM, RESELLER, bbea06d9c4d2853c
improvedigital.com, 1934, RESELLER
smaato.com, 1100058016, RESELLER, 07bcf65f187117b4
smaato.com, 1100004890, RESELLER, 07bcf65f187117b4
playdigo.com, 1970, RESELLER, 92011346d63d3c30
visiblemeasures.com, 1004, RESELLER
admanmedia.com, 2002, RESELLER
sharethrough.com, iHIgeRWP, RESELLER, d53b998a7bd4ecd2
33across.com, 0013300001kQj2HAAS, RESELLER, bbea06d9c4d2853c`;

export const CATEGORIES = [
  "Home","Aplikasi","Kisah Hikmah","Kitab/Buku","Pendidikan","Sholawat","Khutbah",
  "Kisah dan Tokoh","Informasi","Vidio","Adhan","Iqro'","Tafsir Web","Perpustakaan",
  "Arabic Pegon","Arabic Calligraphy","Kalender","Timer","Murotal 30 Juz",
  "Alqur'an Digital","WebOffice","CorelDRAW Arabic",
];

export const NAV_MENU = ["ADZKAR","AL-QUR'AN","TAKLIM","HADIST","SHOLAWAT","ARABIC"];

export const QARI_LIST = [
  { id: "ar.alafasy", name: "Mishary Alafasy" },
  { id: "ar.abdulbasitmurattal", name: "Abdul Basit" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", name: "Mohamed Al-Minshawi" },
];

export const SURAH_LIST = [
  { number: 1, name: "Al-Fatihah", ayahs: 7 },
  { number: 2, name: "Al-Baqarah", ayahs: 286 },
  { number: 3, name: "Ali 'Imran", ayahs: 200 },
  { number: 18, name: "Al-Kahf", ayahs: 110 },
  { number: 36, name: "Yasin", ayahs: 83 },
  { number: 55, name: "Ar-Rahman", ayahs: 78 },
  { number: 67, name: "Al-Mulk", ayahs: 30 },
  { number: 112, name: "Al-Ikhlas", ayahs: 4 },
];

export const SAMPLE_AYAHS: Record<number, { arabic: string; latin: string; translation: string }[]> = {
  1: [
    { arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ", latin: "Bismillāhir-raḥmānir-raḥīm", translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
    { arabic: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ", latin: "Al-ḥamdu lillāhi rabbil-'ālamīn", translation: "Segala puji bagi Allah, Tuhan seluruh alam." },
    { arabic: "الرَّحْمٰنِ الرَّحِيْمِ", latin: "Ar-raḥmānir-raḥīm", translation: "Yang Maha Pengasih, Maha Penyayang." },
    { arabic: "مٰلِكِ يَوْمِ الدِّيْنِ", latin: "Māliki yaumid-dīn", translation: "Pemilik hari pembalasan." },
    { arabic: "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُ", latin: "Iyyāka na'budu wa iyyāka nasta'īn", translation: "Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami meminta pertolongan." },
    { arabic: "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ", latin: "Ihdinaṣ-ṣirāṭal-mustaqīm", translation: "Tunjukilah kami jalan yang lurus." },
    { arabic: "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّآلِّيْنَ", latin: "Ṣirāṭal-lażīna an'amta 'alaihim gairil-magḍūbi 'alaihim wa laḍ-ḍāllīn", translation: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat." },
  ],
  112: [
    { arabic: "قُلْ هُوَ اللّٰهُ اَحَدٌ", latin: "Qul huwallāhu aḥad", translation: "Katakanlah, 'Dialah Allah, Yang Maha Esa.'" },
    { arabic: "اَللّٰهُ الصَّمَدُ", latin: "Allāhuṣ-ṣamad", translation: "Allah yang menjadi tumpuan segala sesuatu." },
    { arabic: "لَمْ يَلِدْ وَلَمْ يُوْلَدْ", latin: "Lam yalid wa lam yūlad", translation: "(Allah) tidak beranak dan tidak pula diperanakkan." },
    { arabic: "وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ", latin: "Wa lam yakul lahū kufuwan aḥad", translation: "Dan tidak ada sesuatu yang setara dengan Dia." },
  ],
};

export const NEWS = [
  "Jadwal Sholat Ramadhan 1447 H telah dirilis",
  "Murotal 30 Juz kini tersedia gratis",
  "Panduan Arabic Pegon untuk pemula",
  "Kajian Tafsir Web setiap Jumat malam",
  "Update aplikasi ALHIKMAH v2.5",
];

export const POPULAR = [
  { id: 1, title: "Keutamaan Membaca Al-Qur'an Setiap Hari", views: 12450, category: "Alqur'an Digital" },
  { id: 2, title: "Kisah Nabi Muhammad SAW Lengkap", views: 9820, category: "Kisah dan Tokoh" },
  { id: 3, title: "Panduan Sholat Tahajud dan Witir", views: 8730, category: "Pendidikan" },
  { id: 4, title: "Sejarah Peradaban Islam di Nusantara", views: 7210, category: "Kisah Hikmah" },
  { id: 5, title: "Kumpulan Sholawat Nabi Terpopuler", views: 6890, category: "Sholawat" },
];

export const ARCHIVE = [
  { month: "Desember 2025", count: 42 },
  { month: "November 2025", count: 38 },
  { month: "Oktober 2025", count: 51 },
  { month: "September 2025", count: 29 },
  { month: "Agustus 2025", count: 34 },
];

const body = (topic: string): string[] => [
  `Pembahasan mengenai ${topic} merupakan salah satu topik penting dalam khazanah keilmuan Islam yang telah dikaji oleh para ulama sejak berabad-abad lamanya. Dalam konteks kehidupan modern, pemahaman yang mendalam terhadap ${topic} menjadi semakin relevan mengingat kompleksitas tantangan yang dihadapi umat Islam saat ini.`,
  `Para ulama klasik maupun kontemporer telah menuangkan pemikiran mereka tentang ${topic} dalam berbagai kitab dan risalah. Imam Al-Ghazali dalam Ihya' Ulumuddin menekankan pentingnya memahami ${topic} secara komprehensif, tidak hanya dari aspek fiqih semata, tetapi juga dari dimensi spiritual dan sosial.`,
  `Dalam praktiknya, ${topic} memiliki beberapa aspek fundamental yang perlu diperhatikan. Pertama, aspek akidah yang menjadi landasan keyakinan. Kedua, aspek syariat yang mengatur tata cara pelaksanaan. Ketiga, aspek akhlak yang mencerminkan nilai-nilai moral. Keempat, aspek sosial yang berkaitan dengan interaksi antar sesama manusia.`,
  `Studi tentang ${topic} juga menunjukkan bahwa Islam sangat memperhatikan keseimbangan antara habluminallah dan habluminannas. Konsep ini mengajarkan bahwa kesalehan individu tidak cukup tanpa diiringi dengan kontribusi positif bagi masyarakat luas.`,
  `Di era digital seperti sekarang, penyebaran pemahaman tentang ${topic} dapat dilakukan melalui berbagai media. Platform seperti ALHIKMAH berupaya menyajikan konten yang akurat, berimbang, dan mudah dipahami oleh berbagai kalangan, mulai dari pelajar hingga profesional.`,
  `Kesimpulannya, ${topic} bukanlah sekadar wacana teoritis, melainkan pedoman praktis yang dapat diaplikasikan dalam kehidupan sehari-hari. Dengan memahami ${topic} secara benar, seorang Muslim dapat menjalani hidup dengan lebih bermakna dan berkontribusi positif bagi umat.`,
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "keutamaan-membaca-alquran",
    title: "Keutamaan Membaca Al-Qur'an Setiap Hari",
    excerpt: "Memahami keutamaan membaca Al-Qur'an, adab-adabnya, serta dampak spiritual bagi kehidupan seorang Muslim.",
    category: "Alqur'an Digital",
    author: "Admin ALHIKMAH",
    date: "12 Desember 2025",
    readTime: "8 menit",
    views: 12450,
    content: [
      { level: 1, text: "Keutamaan Membaca Al-Qur'an", body: body("keutamaan membaca Al-Qur'an") },
      { level: 2, text: "Adab Membaca Al-Qur'an", body: body("adab membaca Al-Qur'an") },
      { level: 3, text: "Waktu Terbaik untuk Tilawah", body: body("waktu terbaik tilawah") },
      { level: 4, text: "Tilawah di Waktu Sahur", body: body("tilawah waktu sahur") },
      { level: 5, text: "Setelah Sholat Fardhu", body: body("tilawah setelah sholat") },
      { level: 6, text: "Catatan Penting", body: body("catatan penting tilawah") },
      { level: 2, text: "Dampak Spiritual Tilawah", body: body("dampak spiritual tilawah") },
    ],
    faq: [
      { q: "Berapa minimal ayat yang harus dibaca setiap hari?", a: "Rasulullah SAW menganjurkan membaca minimal satu juz per hari, namun bagi pemula dapat dimulai dengan beberapa ayat secara konsisten." },
      { q: "Apakah membaca Al-Qur'an harus dengan tajwid?", a: "Ya, membaca dengan tajwid adalah kewajiban agar bacaan sesuai dengan kaidah yang diajarkan Rasulullah SAW." },
      { q: "Bolehkah membaca Al-Qur'an dari aplikasi digital?", a: "Boleh, selama tetap menjaga adab dan memahami bahwa mushaf fisik memiliki keutamaan tersendiri." },
    ],
    conclusion: "Membaca Al-Qur'an adalah ibadah yang memiliki keutamaan luar biasa. Dengan konsistensi dan adab yang benar, tilawah akan menjadi cahaya yang menerangi kehidupan seorang Muslim di dunia dan akhirat.",
    related: [2, 3, 5],
  },
  {
    id: 2,
    slug: "kisah-nabi-muhammad-saw",
    title: "Kisah Nabi Muhammad SAW Lengkap dari Lahir hingga Wafat",
    excerpt: "Perjalanan hidup Rasulullah SAW yang penuh hikmah, dari kelahiran di Mekkah hingga wafatnya di Madinah.",
    category: "Kisah dan Tokoh",
    author: "Admin ALHIKMAH",
    date: "10 Desember 2025",
    readTime: "12 menit",
    views: 9820,
    content: [
      { level: 1, text: "Kelahiran Rasulullah SAW", body: body("kelahiran Rasulullah") },
      { level: 2, text: "Masa Kecil dan Remaja", body: body("masa kecil Rasulullah") },
      { level: 3, text: "Pernikahan dengan Khadijah", body: body("pernikahan Khadijah") },
      { level: 2, text: "Awal Kenabian", body: body("awal kenabian") },
      { level: 4, text: "Wahyu Pertama di Gua Hira", body: body("wahyu pertama") },
      { level: 5, text: "Dakwah Rahasia", body: body("dakwah rahasia") },
      { level: 6, text: "Hijrah ke Madinah", body: body("hijrah Madinah") },
    ],
    faq: [
      { q: "Kapan Nabi Muhammad SAW lahir?", a: "Rasulullah SAW lahir pada tahun 570 M (Tahun Gajah) di kota Mekkah." },
      { q: "Berapa usia Rasulullah saat menerima wahyu pertama?", a: "Rasulullah SAW menerima wahyu pertama pada usia 40 tahun di Gua Hira." },
    ],
    conclusion: "Kisah hidup Rasulullah SAW adalah teladan sempurna bagi seluruh umat manusia. Setiap fase kehidupannya mengandung pelajaran berharga yang relevan sepanjang zaman.",
    related: [1, 4, 5],
  },
  {
    id: 3,
    slug: "panduan-sholat-tahajud",
    title: "Panduan Lengkap Sholat Tahajud dan Witir",
    excerpt: "Tata cara, waktu, dan keutamaan sholat tahajud beserta witir sebagai penutup sholat malam.",
    category: "Pendidikan",
    author: "Admin ALHIKMAH",
    date: "8 Desember 2025",
    readTime: "7 menit",
    views: 8730,
    content: [
      { level: 1, text: "Pengertian Sholat Tahajud", body: body("sholat tahajud") },
      { level: 2, text: "Waktu Pelaksanaan", body: body("waktu tahajud") },
      { level: 3, text: "Tata Cara Sholat Tahajud", body: body("tata cara tahajud") },
      { level: 2, text: "Sholat Witir sebagai Penutup", body: body("sholat witir") },
      { level: 4, text: "Jumlah Rakaat Witir", body: body("rakaat witir") },
      { level: 5, text: "Doa Setelah Witir", body: body("doa witir") },
      { level: 6, text: "Keutamaan", body: body("keutamaan tahajud") },
    ],
    faq: [
      { q: "Berapa rakaat sholat tahajud?", a: "Sholat tahajud minimal 2 rakaat dan maksimal tidak terbatas, namun yang paling utama adalah 11 rakaat termasuk witir." },
      { q: "Apakah harus tidur dulu sebelum tahajud?", a: "Ya, syarat tahajud adalah tidur terlebih dahulu, meskipun hanya sebentar." },
    ],
    conclusion: "Sholat tahajud adalah ibadah yang sangat dianjurkan dan memiliki keutamaan tinggi. Dengan melaksanakannya secara rutin, seorang Muslim akan merasakan kedekatan dengan Allah SWT.",
    related: [1, 2, 5],
  },
  {
    id: 4,
    slug: "sejarah-peradaban-islam-nusantara",
    title: "Sejarah Peradaban Islam di Nusantara",
    excerpt: "Jejak penyebaran Islam di Indonesia melalui perdagangan, kesultanan, dan peran Walisongo.",
    category: "Kisah Hikmah",
    author: "Admin ALHIKMAH",
    date: "5 Desember 2025",
    readTime: "10 menit",
    views: 7210,
    content: [
      { level: 1, text: "Masuknya Islam ke Nusantara", body: body("masuknya Islam Nusantara") },
      { level: 2, text: "Jalur Perdagangan", body: body("jalur perdagangan Islam") },
      { level: 3, text: "Peran Kesultanan", body: body("peran kesultanan") },
      { level: 2, text: "Walisongo dan Dakwah", body: body("Walisongo") },
      { level: 4, text: "Metode Dakwah Kultural", body: body("dakwah kultural") },
      { level: 5, text: "Warisan Budaya", body: body("warisan budaya Islam") },
      { level: 6, text: "Refleksi", body: body("refleksi sejarah") },
    ],
    faq: [
      { q: "Siapa yang pertama menyebarkan Islam di Nusantara?", a: "Para pedagang Muslim dari Gujarat, Arab, dan Persia menjadi penyebar awal Islam di Nusantara." },
      { q: "Apa peran Walisongo?", a: "Walisongo berperan besar dalam dakwah Islam di Jawa dengan pendekatan kultural yang bijaksana." },
    ],
    conclusion: "Sejarah peradaban Islam di Nusantara menunjukkan bahwa penyebaran Islam berlangsung damai melalui perdagangan dan dakwah kultural, meninggalkan warisan yang kaya hingga kini.",
    related: [1, 2, 3],
  },
  {
    id: 5,
    slug: "kumpulan-sholawat-nabi",
    title: "Kumpulan Sholawat Nabi Terpopuler dan Artinya",
    excerpt: "Kumpulan sholawat Nabi yang populer di Indonesia beserta teks Arab, latin, dan terjemahannya.",
    category: "Sholawat",
    author: "Admin ALHIKMAH",
    date: "3 Desember 2025",
    readTime: "6 menit",
    views: 6890,
    content: [
      { level: 1, text: "Keutamaan Sholawat", body: body("keutamaan sholawat") },
      { level: 2, text: "Sholawat Nabi Ibrahimiyah", body: body("sholawat Ibrahimiyah") },
      { level: 3, text: "Teks dan Arti", body: body("teks sholawat") },
      { level: 2, text: "Sholawat Thibbil Qulub", body: body("sholawat Thibbil Qulub") },
      { level: 4, text: "Sejarah dan Makna", body: body("makna sholawat") },
      { level: 5, text: "Cara Mengamalkan", body: body("mengamalkan sholawat") },
      { level: 6, text: "Catatan", body: body("catatan sholawat") },
    ],
    faq: [
      { q: "Kapan waktu terbaik membaca sholawat?", a: "Sholawat dapat dibaca kapan saja, namun waktu terbaik adalah hari Jumat, malam hari, dan setelah sholat." },
      { q: "Berapa kali minimal membaca sholawat?", a: "Tidak ada batasan minimal, namun membaca 100 kali sehari sangat dianjurkan." },
    ],
    conclusion: "Sholawat adalah amalan ringan namun berpahala besar. Dengan membiasakan membaca sholawat, seorang Muslim akan mendapatkan syafaat Nabi di hari kiamat.",
    related: [1, 2, 3],
  },
];