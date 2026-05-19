import 'package:flutter/cupertino.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/widgets/scanner/controllers/scanner_controller.dart';
import 'scanner_glass_button.dart';

class ScannerControls extends StatelessWidget {
  final ScannerController controller;

  const ScannerControls({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 40,
      left: 0,
      right: 0,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ScannerGlassButton(
            icon: CupertinoIcons.lightbulb,
            onTap: controller.toggleTorch,
          ),
          ScannerGlassButton(
            icon: CupertinoIcons.xmark,
            onTap: controller.close,
          ),
        ],
      ),
    );
  }
}
