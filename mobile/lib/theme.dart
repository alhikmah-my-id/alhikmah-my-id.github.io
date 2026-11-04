import 'package:flutter/material.dart';

const Color kEmerald = Color(0xFF047857);
const Color kEmeraldDark = Color(0xFF064E3B);
const Color kTeal = Color(0xFF0D9488);
const Color kAmber = Color(0xFFD97706);
const Color kSurface = Color(0xFFF1F5F9);

ThemeData buildAlHikmahTheme() {
  final base = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: kEmerald,
      primary: kEmerald,
      secondary: kTeal,
      tertiary: kAmber,
      brightness: Brightness.light,
    ),
    scaffoldBackgroundColor: kSurface,
  );

  return base.copyWith(
    appBarTheme: const AppBarTheme(
      backgroundColor: kEmeraldDark,
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: false,
    ),
    cardTheme: CardThemeData(
      color: Colors.white,
      elevation: 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
      margin: EdgeInsets.zero,
    ),
    chipTheme: base.chipTheme.copyWith(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
    ),
    textTheme: base.textTheme.apply(
      bodyColor: const Color(0xFF0F172A),
      displayColor: const Color(0xFF0F172A),
    ),
  );
}