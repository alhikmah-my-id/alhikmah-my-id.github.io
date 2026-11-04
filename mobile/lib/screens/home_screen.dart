import 'package:flutter/material.dart';

import '../models/article.dart';
import '../services/api_service.dart';
import '../theme.dart';
import '../widgets/article_card.dart';
import '../widgets/quick_menu.dart';
import '../widgets/tappx_banner.dart';
import 'article_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _api = ApiService();
  late Future<List<Article>> _articlesFuture;
  String _selectedCategory = 'Semua';

  @override
  void initState() {
    super.initState();
    _articlesFuture = _api.fetchArticles();
  }

  void _reload(String category) {
    setState(() {
      _selectedCategory = category;
      _articlesFuture = _api.fetchArticles(
        category: category == 'Semua' ? null : category,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.network(
                'https://alhikmah.my.id/images.jpg',
                width: 32,
                height: 32,
                errorBuilder: (_, __, ___) => const Icon(Icons.menu_book, size: 28),
              ),
            ),
            const SizedBox(width: 10),
            const Text(
              'ALHIKMAH',
              style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      body: RefreshIndicator(
        color: kEmerald,
        onRefresh: () async => _reload(_selectedCategory),
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
          children: [
            const QuickMenu(),
            const SizedBox(height: 16),
            const TappxBanner(),
            const SizedBox(height: 20),
            _categoryChips(),
            const SizedBox(height: 16),
            FutureBuilder<List<Article>>(
              future: _articlesFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Padding(
                    padding: EdgeInsets.symmetric(vertical: 48),
                    child: Center(child: CircularProgressIndicator()),
                  );
                }
                if (snapshot.hasError) {
                  return _errorState(snapshot.error.toString());
                }
                final items = snapshot.data ?? [];
                if (items.isEmpty) {
                  return _emptyState();
                }
                return Column(
                  children: items
                      .map(
                        (a) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: ArticleCard(
                            article: a,
                            onTap: () => Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_) => ArticleScreen(article: a),
                              ),
                            ),
                          ),
                        ),
                      )
                      .toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _categoryChips() {
    const categories = [
      'Semua',
      'Kisah Hikmah',
      'Pendidikan',
      'Sholawat',
      'Tafsir Web',
      'Arabic Pegon',
    ];
    return SizedBox(
      height: 40,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, i) {
          final c = categories[i];
          final selected = c == _selectedCategory;
          return ChoiceChip(
            label: Text(c),
            selected: selected,
            onSelected: (_) => _reload(c),
            selectedColor: kEmerald,
            labelStyle: TextStyle(
              color: selected ? Colors.white : const Color(0xFF334155),
              fontWeight: FontWeight.w600,
            ),
            backgroundColor: Colors.white,
            side: BorderSide(color: kEmerald.withValues(alpha: 0.25)),
          );
        },
      ),
    );
  }

  Widget _errorState(String message) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            const Icon(Icons.cloud_off, size: 42, color: kEmerald),
            const SizedBox(height: 12),
            const Text(
              'Koneksi bermasalah',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 6),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Color(0xFF64748B), fontSize: 13),
            ),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () => _reload(_selectedCategory),
              child: const Text('Coba Lagi'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _emptyState() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          children: const [
            Icon(Icons.inbox, size: 42, color: Color(0xFF94A3B8)),
            SizedBox(height: 12),
            Text(
              'Belum ada artikel pada kategori ini',
              style: TextStyle(color: Color(0xFF64748B)),
            ),
          ],
        ),
      ),
    );
  }
}