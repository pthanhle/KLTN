import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScannerController extends ChangeNotifier {
  late final MobileScannerController mobileScannerController;
  bool _isProcessing = false;
  final Function(String) onDetect;
  final BuildContext context;

  ScannerController({required this.context, required this.onDetect}) {
    mobileScannerController = MobileScannerController(
      formats: const [BarcodeFormat.all],
      detectionSpeed: DetectionSpeed.normal,
      facing: CameraFacing.back,
      torchEnabled: false,
    );
  }

  bool get isProcessing => _isProcessing;

  void handleBarcode(BarcodeCapture capture) {
    if (_isProcessing) return;

    final List<Barcode> barcodes = capture.barcodes;
    if (barcodes.isNotEmpty) {
      final code = barcodes.first.rawValue;
      if (code != null && code.isNotEmpty) {
        _isProcessing = true;
        notifyListeners();
        
        HapticFeedback.heavyImpact();
        mobileScannerController.stop();

        onDetect(code);
        
        Future.delayed(const Duration(milliseconds: 300), () {
          if (context.mounted) Navigator.of(context).pop();
        });
      }
    }
  }

  void toggleTorch() {
    HapticFeedback.lightImpact();
    mobileScannerController.toggleTorch();
  }

  void close() {
    HapticFeedback.lightImpact();
    Navigator.of(context).pop();
  }

  @override
  void dispose() {
    mobileScannerController.dispose();
    super.dispose();
  }
}
