import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;

class ApiConfig {
  static const int _port = 3000;

  static String get baseUrl {
    if (kIsWeb) {
      return 'http://localhost:$_port/api';
    }

    if (Platform.isAndroid) {
      return 'http://10.0.2.2:$_port/api';
    }

    if (Platform.isIOS || Platform.isMacOS) {
      return 'http://localhost:$_port/api';
    }

    return 'http://localhost:$_port/api';
  }

  static const int connectTimeout = 15000;
  static const int receiveTimeout = 15000;
}
