import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../constants/app_constants.dart';

class AppTheme {
  AppTheme._();

  static ThemeData light() {
    final base = ThemeData.light(useMaterial3: true);
    final text = GoogleFonts.plusJakartaSansTextTheme(base.textTheme);

    return base.copyWith(
      scaffoldBackgroundColor: AppConstants.surface,
      colorScheme: base.colorScheme.copyWith(
        primary: AppConstants.emeraldDark,
        secondary: AppConstants.teal,
        tertiary: AppConstants.amber,
        surface: Colors.white,
      ),
      textTheme: text.copyWith(
        displayLarge: GoogleFonts.amiri(
          fontSize: 34,
          fontWeight: FontWeight.w700,
          color: AppConstants.emeraldDeep,
        ),
        headlineMedium: text.headlineMedium?.copyWith(
          fontWeight: FontWeight.w800,
          color: AppConstants.emeraldDeep,
        ),
        titleMedium: text.titleMedium?.copyWith(fontWeight: FontWeight.w700),
        bodyMedium: text.bodyMedium?.copyWith(
          color: AppConstants.muted,
          height: 1.6,
        ),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: AppConstants.border),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: AppConstants.emeraldDeep,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: AppConstants.emeraldDark,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      ),
      chipTheme: base.chipTheme.copyWith(
        backgroundColor: AppConstants.emerald.withValues(alpha: 0.10),
        labelStyle: const TextStyle(
          color: AppConstants.emeraldDark,
          fontWeight: FontWeight.w700,
          fontSize: 12,
        ),
        side: BorderSide.none,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(999),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: AppConstants.border,
        thickness: 1,
        space: 1,
      ),
    );
  }

  static ThemeData dark() {
    final base = ThemeData.dark(useMaterial3: true);
    return base.copyWith(
      scaffoldBackgroundColor: AppConstants.emeraldDeep,
      colorScheme: base.colorScheme.copyWith(
        primary: AppConstants.emerald,
        secondary: AppConstants.teal,
      ),
    );
  }
}