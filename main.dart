import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:html/parser.dart' show parse;
import 'package:html/dom.dart';

void main() async {
  final String targetUrl = "https://alhikmah.my.id/";
  print("Menghubungi layanan Alhikmah di: $targetUrl...\n");

  try {
    // 1. Melakukan HTTP GET request ke situs Alhikmah
    final response = await http.get(
      Uri.parse(targetUrl),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Dart/DartVM) Alhikmah-Dart-Agent/1.0',
      },
    );

    // 2. Memeriksa apakah request berhasil (HTTP 200)
    if (response.statusCode == 200) {
      // Mengubah standarisasi encoding ke UTF-8 agar karakter terbaca sempurna
      final String htmlBody = utf8.decode(response.bodyBytes);
      
      // 3. Melakukan parsing dokumen HTML
      Document document = parse(htmlBody);
      
      // Mengambil judul halaman website
      String? title = document.querySelector('title')?.text.trim();
      print("=== Judul Situs: $title ===\n");

      // 4. Mengekstrak semua elemen link (anchor tag)
      print("Daftar Link yang ditemukan:");
      List<Element> links = document.querySelectorAll('a');
      
      int count = 1;
      for (var link in links) {
        String? href = link.attributes['href'];
        String text = link.text.trim();
        
        if (href != null && href.isNotEmpty) {
          // Jika teks kosong, beri label penanda
          if (text.isEmpty) text = "[Link Gambar / Elemen Tanpa Teks]";
          
          print("$count. $text -> $href");
          count++;
        }
        
        // Membatasi output hingga 15 link teratas saja
        if (count > 15) break;
      }
    } else {
      print("Gagal memuat situs. Kode HTTP Status: ${response.statusCode}");
    }
  } catch (e) {
    print("Terjadi kesalahan sistem saat mengambil data: $e");
  }
}
