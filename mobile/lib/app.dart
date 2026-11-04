import 'package:flutter/material.dart';

import 'theme.dart';
import 'screens/home_screen.dart';

class AlHikmahApp extends StatelessWidget {
  const AlHikmahApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ALHIKMAH',
      debugShowCheckedModeBanner: false,
      theme: buildAlHikmahTheme(),
      home: const HomeScreen(),
    );
  }
}