import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb, kReleaseMode;

class ApiConfig {
  static const int _port = 5000;

  // Inject via: flutter build apk --dart-define=API_BASE_URL=https://api.yourdomain.com/api
  static const String _productionBase = String.fromEnvironment('API_BASE_URL');

  static String get baseUrl {
    if (kReleaseMode && _productionBase.isNotEmpty) return _productionBase;

    if (kIsWeb) return 'http://localhost:$_port/api';
    if (Platform.isAndroid) return 'http://10.0.2.2:$_port/api';
    if (Platform.isIOS || Platform.isMacOS) return 'http://172.20.10.3:$_port/api';
    return 'http://localhost:$_port/api';
  }

  static const int connectTimeout = 15000;
  static const int receiveTimeout = 15000;


  static const String validTrackingCode = 'GHN-WAREHOUSE-TEST-001';
}
