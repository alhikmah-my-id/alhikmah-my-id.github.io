class ArticleModel {
  final String id;
  final String title;
  final String slug;
  final String category;
  final String excerpt;
  final String content;
  final String author;
  final String date;
  final int views;
  final int readMinutes;
  final String? imageUrl;

  const ArticleModel({
    required this.id,
    required this.title,
    required this.slug,
    required this.category,
    required this.excerpt,
    required this.content,
    this.author = 'ADMIN ALHIKMAH',
    required this.date,
    this.views = 0,
    this.readMinutes = 5,
    this.imageUrl,
  });

  factory ArticleModel.fromJson(Map<String, dynamic> json) {
    return ArticleModel(
      id: json['id']?.toString() ?? '',
      title: json['title'] as String? ?? '',
      slug: json['slug'] as String? ?? '',
      category: json['category'] as String? ?? 'Informasi',
      excerpt: json['excerpt'] as String? ?? '',
      content: json['content'] as String? ?? '',
      author: json['author'] as String? ?? 'ADMIN ALHIKMAH',
      date: json['date'] as String? ?? '',
      views: (json['views'] as num?)?.toInt() ?? 0,
      readMinutes: (json['readMinutes'] as num?)?.toInt() ?? 5,
      imageUrl: json['imageUrl'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'slug': slug,
        'category': category,
        'excerpt': excerpt,
        'content': content,
        'author': author,
        'date': date,
        'views': views,
        'readMinutes': readMinutes,
        'imageUrl': imageUrl,
      };
}