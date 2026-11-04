import '../models/article_model.dart';

class ArticleRepository {
  Future<List<ArticleModel>> fetchArticles() async {
    await Future<void>.delayed(const Duration(milliseconds: 400));
    return _seed();
  }

  Future<List<ArticleModel>> fetchByCategory(String category) async {
    final all = await fetchArticles();
    if (category == 'Home') return all;
    return all.where((a) => a.category == category).toList();
  }

  List<ArticleModel> _seed() {
    const raw = <Map<String, dynamic>>[
      {
        'id': '1',
        'title': 'Keutamaan Sholat Tahajud di Sepertiga Malam Terakhir',
        'slug': 'keutamaan-sholat-tahajud',
        'category': 'Pendidikan',
        'excerpt':
            'Menyingkap rahasia qiyamul lail dan mengapa sepertiga malam terakhir menjadi waktu mustajab untuk berdoa.',
        'content': 'Sholat Tahajud adalah ibadah sunnah muakkadah...',
        'date': '2025-01-12',
        'views': 12840,
        'readMinutes': 12,
      },
      {
        'id': '2',
        'title': 'Kisah Hikmah: Kesabaran Nabi Ayyub AS',
        'slug': 'kisah-hikmah-nabi-ayyub',
        'category': 'Kisah Hikmah',
        'excerpt':
            'Pelajaran abadi dari ujian terberat seorang nabi yang tetap bersyukur di tengah penderitaan panjang.',
        'content': 'Nabi Ayyub AS diuji dengan penyakit...',
        'date': '2025-01-10',
        'views': 9421,
        'readMinutes': 9,
      },
      {
        'id': '3',
        'title': 'Tafsir Surat Al-Fatihah: Pintu Gerbang Al-Qur\'an',
        'slug': 'tafsir-surat-al-fatihah',
        'category': 'Tafsir Web',
        'excerpt':
            'Kajian mendalam tujuh ayat pembuka yang menjadi rukun dalam setiap rakaat sholat.',
        'content': 'Al-Fatihah berarti pembukaan...',
        'date': '2025-01-08',
        'views': 15302,
        'readMinutes': 15,
      },
      {
        'id': '4',
        'title': 'Sejarah Peradaban Islam di Nusantara',
        'slug': 'sejarah-peradaban-islam-nusantara',
        'category': 'Kisah dan Tokoh',
        'excerpt':
            'Jejak dakwah Wali Songo dan peran pesantren dalam membentuk identitas Islam Indonesia.',
        'content': 'Islam masuk ke Nusantara melalui jalur perdagangan...',
        'date': '2025-01-05',
        'views': 7710,
        'readMinutes': 11,
      },
      {
        'id': '5',
        'title': 'Kumpulan Sholawat Nabi Pilihan Terbaik',
        'slug': 'kumpulan-sholawat-nabi',
        'category': 'Sholawat',
        'excerpt':
            'Lirik dan keutamaan sholawat yang dapat diamalkan harian untuk ketenangan hati.',
        'content': 'Sholawat adalah bentuk cinta kepada Rasulullah...',
        'date': '2025-01-03',
        'views': 20114,
        'readMinutes': 7,
      },
      {
        'id': '6',
        'title': 'Panduan Lengkap Arabic Pegon untuk Pemula',
        'slug': 'panduan-arabic-pegon',
        'category': 'Arabic Pegon',
        'excerpt':
            'Mengenal aksara Pegon, sejarahnya, dan cara menulis bahasa Jawa dengan huruf Arab.',
        'content': 'Pegon adalah modifikasi huruf Arab...',
        'date': '2025-01-01',
        'views': 5320,
        'readMinutes': 10,
      },
    ];
    return raw.map(ArticleModel.fromJson).toList();
  }
}