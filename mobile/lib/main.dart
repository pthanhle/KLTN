import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'core/localization/multi_asset_loader.dart';
import 'app.dart';

void main() async {
  // Ensure Flutter bindings are initialized
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize easy_localization
  await EasyLocalization.ensureInitialized();

  runApp(
    ProviderScope(
      child: EasyLocalization(
        supportedLocales: const [Locale('vi', 'VN'), Locale('en', 'US')],
        path: 'assets/locales', // Path to translation files
        fallbackLocale: const Locale('vi', 'VN'),
        assetLoader: const MultiAssetLoader(),
        child: const MyApp(),
      ),
    ),
  );
}
