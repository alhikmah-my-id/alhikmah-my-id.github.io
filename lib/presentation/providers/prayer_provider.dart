import 'dart:async';

import 'package:flutter/foundation.dart';

class PrayerTime {
  final String name;
  final String time;
  const PrayerTime(this.name, this.time);
}

class PrayerProvider extends ChangeNotifier {
  Timer? _timer;
  DateTime _now = DateTime.now();

  DateTime get now => _now;

  final List<PrayerTime> schedule = const [
    PrayerTime('Subuh', '04:15'),
    PrayerTime('Dzuhur', '11:50'),
    PrayerTime('Ashar', '15:10'),
    PrayerTime('Maghrib', '18:02'),
    PrayerTime('Isya', '19:15'),
  ];

  void init() {
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      _now = DateTime.now();
      notifyListeners();
    });
  }

  PrayerTime get next {
    final minutes = _now.hour * 60 + _now.minute;
    for (final p in schedule) {
      final parts = p.time.split(':');
      final t = int.parse(parts[0]) * 60 + int.parse(parts[1]);
      if (t > minutes) return p;
    }
    return schedule.first;
  }

  Duration get remaining {
    final parts = next.time.split(':');
    final target = DateTime(
      _now.year,
      _now.month,
      _now.day,
      int.parse(parts[0]),
      int.parse(parts[1]),
    );
    var diff = target.difference(_now);
    if (diff.isNegative) diff = diff + const Duration(days: 1);
    return diff;
  }

  String get countdown {
    final d = remaining;
    String two(int v) => v.toString().padLeft(2, '0');
    return '${two(d.inHours)} : ${two(d.inMinutes % 60)} : ${two(d.inSeconds % 60)}';
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}