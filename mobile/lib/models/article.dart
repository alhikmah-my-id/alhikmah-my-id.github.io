class Article {
  final int id;
  final String slug;
  final String title;
  final String category;
  final String excerpt;
  final String author;
  final String date;
  final String readTime;
  final int views;

  const Article({
    required this.id,
    required this.slug,
    required this.title,
    required this.category,
    required this.excerpt,
    required this.author,
    required this.date,
    required this.readTime,
    required this.views,
  });

  factory Article.fromJson(Map<String, dynamic> json) {
    return Article(
      id: json['id'] as int? ?? 0,
      slug: json['slug'] as String? ?? '',
      title: json['title'] as String? ?? '',
      category: json['category'] as String? ?? 'Informasi',
      excerpt: json['excerpt'] as String? ?? '',
      author: json['author'] as String? ?? 'ADMIN ALHIKMAH',
      date: json['date'] as String? ?? '',
      readTime: json['readTime'] as String? ?? '5 menit',
      views: json['views'] as int? ?? 0,
    );
  }
}