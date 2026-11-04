import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

import 'core/constants/app_constants.dart';
import 'core/theme/app_theme.dart';
import 'data/repositories/article_repository.dart';
import 'data/repositories/tools_repository.dart';
import 'presentation/providers/article_provider.dart';
import 'presentation/providers/prayer_provider.dart';
import 'presentation/screens/home_screen.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: AppConstants.emeraldDark,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  runApp(const AlHikmahApp());
}

class AlHikmahApp extends StatelessWidget {
  const AlHikmahApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<ArticleRepository>(
          create: (_) => ArticleRepository(),
        ),
        Provider<ToolsRepository>(
          create: (_) => ToolsRepository(),
        ),
        ChangeNotifierProvider<ArticleProvider>(
          create: (ctx) => ArticleProvider(ctx.read<ArticleRepository>())..loadAll(),
        ),
        ChangeNotifierProvider<PrayerProvider>(
          create: (_) => PrayerProvider()..init(),
        ),
      ],
      child: MaterialApp(
        title: AppConstants.appName,
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light(),
        darkTheme: AppTheme.dark(),
        themeMode: ThemeMode.light,
        home: const HomeScreen(),
      ),
    );
  }
}