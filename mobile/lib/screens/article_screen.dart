import 'package:flutter/material.dart';

import '../models/article.dart';
import '../theme.dart';
import '../widgets/tappx_banner.dart';

class ArticleScreen extends StatelessWidget {
  final Article article;

  const ArticleScreen({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(article.category)),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
        children: [
          Text(
            article.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(Icons.person, size: 16, color: Color(0xFF64748B)),
              const SizedBox(width: 6),
              Text(article.author, style: const TextStyle(fontSize: 13)),
              const Spacer(),
              const Icon(Icons.schedule, size: 16, color: Color(0xFF64748B)),
              const SizedBox(width: 6),
              Text(article.readTime, style: const TextStyle(fontSize: 13)),
            ],
          ),
          const SizedBox(height: 16),
          const TappxBanner(),
          const SizedBox(height: 20),
          Text(
            article.excerpt,
            style: const TextStyle(fontSize: 15, height: 1.7),
          ),
          const SizedBox(height: 20),
          _section('Pendahuluan', 'Pembahasan lengkap mengenai ${article.title}.'),
          _section('Dalil & Rujukan', 'Berdasarkan Al-Qur\'an, Hadits, dan pendapat ulama.'),
          _section('Penerapan Praktis', 'Langkah amaliyah dalam kehidupan sehari-hari.'),
          _section('Kesimpulan', 'Semoga bermanfaat dan menjadi amal jariyah.'),
          const SizedBox(height: 24),
          _shareRow(),
        ],
      ),
    );
  }

  Widget _section(String title, String body) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: kEmeraldDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(body, style: const TextStyle(fontSize: 15, height: 1.7)),
        ],
      ),
    );
  }

  Widget _shareRow() {
    return Wrap(
      spacing: 8,
      children: const [
        Chip(label: Text('WhatsApp')),
        Chip(label: Text('Facebook')),
        Chip(label: Text('Twitter/X')),
        Chip(label: Text('Telegram')),
        Chip(label: Text('Salin Link')),
      ],
    );
  }
}