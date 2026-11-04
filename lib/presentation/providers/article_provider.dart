import 'package:flutter/foundation.dart';

import '../../data/models/article_model.dart';
import '../../data/repositories/article_repository.dart';

class ArticleProvider extends ChangeNotifier {
  ArticleProvider(this._repo);

  final ArticleRepository _repo;

  List<ArticleModel> _articles = [];
  bool _loading = false;
  String _category = 'Home';
  String _query = '';

  List<ArticleModel> get articles => _filtered;
  bool get isLoading => _loading;
  String get category => _category;
  String get query => _query;

  List<ArticleModel> get _filtered {
    var list = _articles;
    if (_category != 'Home') {
      list = list.where((a) => a.category == _category).toList();
    }
    if (_query.isNotEmpty) {
      final q = _query.toLowerCase();
      list = list
          .where((a) =>
              a.title.toLowerCase().contains(q) ||
              a.excerpt.toLowerCase().contains(q))
          .toList();
    }
    return list;
  }

  List<ArticleModel> get popular {
    final sorted = [..._articles]..sort((a, b) => b.views.compareTo(a.views));
    return sorted.take(5).toList();
  }

  Future<void> loadAll() async {
    _loading = true;
    notifyListeners();
    _articles = await _repo.fetchArticles();
    _loading = false;
    notifyListeners();
  }

  void setCategory(String value) {
    _category = value;
    notifyListeners();
  }

  void setQuery(String value) {
    _query = value;
    notifyListeners();
  }
}