import 'package:flutter/material.dart';

import '../../core/constants/app_constants.dart';
import '../../data/models/article_model.dart';

class ArticleCard extends StatelessWidget {
  final ArticleModel article;
  final VoidCallback onTap;

  const ArticleCard({
    super.key,
    required this.article,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(20),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppConstants.emerald.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  article.category,
                  style: const TextStyle(
                    color: AppConstants.emeraldDark,
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              Text(
                article.title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  height: 1.35,
                  color: AppConstants.emeraldDeep,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                article.excerpt,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 13,
                  color: AppConstants.muted,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  const Icon(Icons.visibility, size: 14, color: AppConstants.muted),
                  const SizedBox(width: 4),
                  Text(
                    '${article.views}',
                    style: const TextStyle(fontSize: 12, color: AppConstants.muted),
                  ),
                  const SizedBox(width: 12),
                  const Icon(Icons.schedule, size: 14, color: AppConstants.muted),
                  const SizedBox(width: 4),
                  Text(
                    '${article.readMinutes} menit',
                    style: const TextStyle(fontSize: 12, color: AppConstants.muted),
                  ),
                  const Spacer(),
                  Text(
                    article.date,
                    style: const TextStyle(fontSize: 11, color: AppConstants.muted),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}