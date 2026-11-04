import 'package:flutter/material.dart';

import '../services/api_service.dart';
import '../theme.dart';

class TappxBanner extends StatefulWidget {
  const TappxBanner({super.key});

  @override
  State<TappxBanner> createState() => _TappxBannerState();
}

class _TappxBannerState extends State<TappxBanner> {
  final ApiService _api = ApiService();
  String _key = '';

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final key = await _api.fetchNextAdKey();
      if (mounted) setState(() => _key = key);
    } catch (_) {
      if (mounted) setState(() => _key = 'pub-65263-android-0300');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [kEmeraldDark, kTeal],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Center(
        child: Text(
          _key.isEmpty ? 'Memuat iklan...' : 'Tappx Ad: $_key',
          style: const TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}