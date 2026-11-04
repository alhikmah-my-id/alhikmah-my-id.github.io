import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/constants/app_constants.dart';
import '../providers/article_provider.dart';
import '../providers/prayer_provider.dart';
import '../widgets/article_card.dart';
import '../widgets/prayer_panel.dart';
import '../widgets/quick_menu.dart';
import '../widgets/site_footer.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final articles = context.watch<ArticleProvider>();
    final prayer = context.watch<PrayerProvider>();

    return Scaffold(
      backgroundColor: AppConstants.surface,
      body: SafeArea(
        top: false,
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              pinned: true,
              expandedHeight: 180,
              backgroundColor: AppConstants.emeraldDeep,
              flexibleSpace: FlexibleSpaceBar(
                titlePadding: const EdgeInsets.only(left: 16, bottom: 14),
                title: const Text(
                  'ALHIKMAH',
                  style: TextStyle(
                    fontWeight: FontWeight.w800,
                    letterSpacing: 1.2,
                  ),
                ),
                background: Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        AppConstants.emeraldDeep,
                        AppConstants.emeraldDark,
                        AppConstants.teal,
                      ],
                    ),
                  ),
                  child: Align(
                    alignment: Alignment.bottomRight,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Opacity(
                        opacity: 0.18,
                        child: Icon(
                          Icons.mosque,
                          size: 140,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SliverToBoxAdapter(child: QuickMenu()),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
                child: PrayerPanel(provider: prayer),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
                child: Row(
                  children: [
                    const Text(
                      'Artikel Terbaru',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                        color: AppConstants.emeraldDeep,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      '${articles.articles.length} artikel',
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppConstants.muted,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            if (articles.isLoading)
              const SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.all(32),
                  child: Center(child: CircularProgressIndicator()),
                ),
              )
            else
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                sliver: SliverList.separated(
                  itemCount: articles.articles.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, i) {
                    final a = articles.articles[i];
                    return ArticleCard(
                      article: a,
                      onTap: () => _showArticle(context, a.title),
                    );
                  },
                ),
              ),
            const SliverToBoxAdapter(child: SizedBox(height: 24)),
            const SliverToBoxAdapter(child: SiteFooter()),
          ],
        ),
      ),
    );
  }

  void _showArticle(BuildContext context, String title) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => DraggableScrollableSheet(
        expand: false,
        initialChildSize: 0.85,
        maxChildSize: 0.95,
        builder: (_, controller) => ListView(
          controller: controller,
          padding: const EdgeInsets.all(20),
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: AppConstants.emeraldDeep,
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Konten artikel lengkap dengan TOC, FAQ, dan Conclusion akan dimuat dari API alhikmah.my.id.',
              style: TextStyle(color: AppConstants.muted, height: 1.7),
            ),
          ],
        ),
      ),
    );
  }
}