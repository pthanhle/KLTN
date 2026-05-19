import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/widgets/scanner/constants/scanner_constants.dart';

class ScannerReticle extends StatelessWidget {
  const ScannerReticle({super.key});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.center,
      child: Container(
        width: ScannerConstants.viewfinderSize,
        height: ScannerConstants.viewfinderSize,
        decoration: ShapeDecoration(
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: ScannerConstants.cornerRadius,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: ScannerConstants.accentColor.withOpacity(0.8),
              width: ScannerConstants.reticleStrokeWidth,
            ),
          ),
        ),
      ),
    );
  }
}
