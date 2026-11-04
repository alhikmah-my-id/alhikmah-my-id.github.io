class ToolsRepository {
  Future<String> convertToPegon(String latin) async {
    await Future<void>.delayed(const Duration(milliseconds: 250));
    const map = <String, String>{
      'a': 'ا',
      'b': 'ب',
      't': 'ت',
      'j': 'ج',
      'd': 'د',
      'r': 'ر',
      's': 'س',
      'k': 'ك',
      'l': 'ل',
      'm': 'م',
      'n': 'ن',
      'w': 'و',
      'h': 'ه',
      'y': 'ي',
    };
    final buffer = StringBuffer();
    for (final ch in latin.toLowerCase().split('')) {
      buffer.write(map[ch] ?? ch);
    }
    return buffer.toString();
  }

  Future<Map<String, String>> hijriToday() async {
    await Future<void>.delayed(const Duration(milliseconds: 150));
    return {
      'hijri': '12 Rajab 1446 H',
      'gregorian': '12 Januari 2025 M',
    };
  }
}