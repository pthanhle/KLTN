import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class MultiAssetLoader extends AssetLoader {
  const MultiAssetLoader();

  @override
  Future<Map<String, dynamic>> load(String path, Locale locale) async {
    final languageCode = locale.languageCode;
    final Map<String, dynamic> result = {};

    try {

      final AssetManifest manifest = await AssetManifest.loadFromAssetBundle(rootBundle);
      final String dirPath = '$path/$languageCode/';
      
      final localeFiles = manifest.listAssets()
          .where((String key) => key.startsWith(dirPath) && key.endsWith('.json'))
          .toList();
      print("MultiAssetLoader: Found files for $dirPath: $localeFiles");

      for (var file in localeFiles) {
        try {
          final String fileContent = await rootBundle.loadString(file);
          final Map<String, dynamic> fileData = json.decode(fileContent) as Map<String, dynamic>;
          
          result.addAll(fileData);
        } catch (e) {
          print("MultiAssetLoader Error reading $file: $e");
        }
      }
    } catch (e) {
      print("MultiAssetLoader Error loading manifest: $e");
    }

    return result;
  }
}
