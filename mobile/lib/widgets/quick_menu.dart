import 'package:flutter/material.dart';

import '../theme.dart';

class QuickMenu extends StatelessWidget {
  const QuickMenu({super.key});

  static const List<Map<String, dynamic>> _items = [
    {'label': 'ADZKAR', 'icon': Icons.favorite},
    {'label': "AL-QUR'AN", 'icon': Icons.menu_book},
    {'label': 'TAKLIM', 'icon': Icons.groups},
    {'label': 'HADIST', 'icon': Icons.auto_stories},
    {'label': 'SHOLAWAT', 'icon': Icons.music_note},
    {'label': 'ARABIC', 'icon': Icons.translate},
  ];

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: _items
              .map(
                (item) => Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: kEmerald.withValues(alpha: 0.12),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(item['icon'] as IconData, color: kEmeraldDark, size: 20),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      item['label'] as String,
                      style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
              )
              .toList(),
        ),
      ),
    );
  }
}