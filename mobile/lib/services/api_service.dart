import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/article.dart';

class ApiService {
  static const String baseUrl = 'https://alhikmah.my.id/api';

  Future<List<Article>> fetchArticles({String? category}) async {
    final uri = Uri.parse(
      category == null || category.isEmpty
          ? '$baseUrl/articles'
          : '$baseUrl/articles?category=${Uri.encodeComponent(category)}',
    );
    final res = await http.get(uri).timeout(const Duration(seconds: 12));
    if (res.statusCode != 200) {
      throw Exception('Gagal memuat artikel (${res.statusCode})');
    }
    final body = jsonDecode(res.body) as Map<String, dynamic>;
    final list = (body['articles'] as List<dynamic>? ?? []);
    return list
        .map((e) => Article.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<List<String>> fetchCategories() async {
    final uri = Uri.parse('$baseUrl/categories');
    final res = await http.get(uri).timeout(const Duration(seconds: 12));
    if (res.statusCode != 200) {
      throw Exception('Gagal memuat kategori');
    }
    final body = jsonDecode(res.body) as Map<String, dynamic>;
    return (body['categories'] as List<dynamic>? ?? [])
        .map((e) => e.toString())
        .toList();
  }

  Future<String> fetchNextAdKey() async {
    final uri = Uri.parse('$baseUrl/ads/rotate');
    final res = await http.get(uri).timeout(const Duration(seconds: 12));
    if (res.statusCode != 200) {
      throw Exception('Gagal memuat iklan');
    }
    final body = jsonDecode(res.body) as Map<String, dynamic>;
    return body['appKey'] as String? ?? '';
  }
}