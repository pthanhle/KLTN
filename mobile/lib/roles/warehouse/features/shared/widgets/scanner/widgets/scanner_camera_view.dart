import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/widgets/scanner/controllers/scanner_controller.dart';

class ScannerCameraView extends StatelessWidget {
  final ScannerController controller;

  const ScannerCameraView({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return MobileScanner(
      controller: controller.mobileScannerController,
      onDetect: controller.handleBarcode,
      errorBuilder: (context, error) {
        return Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(CupertinoIcons.camera_fill, color: Colors.white54, size: 48),
              const SizedBox(height: 16),
              Text(
                'Không thể khởi động Camera'.tr(),
                style: const TextStyle(color: Colors.white),
              ),
            ],
          ),
        );
      },
    );
  }
}
