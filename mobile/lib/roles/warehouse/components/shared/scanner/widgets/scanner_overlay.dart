import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../constants/scanner_constants.dart';

class ScannerOverlay extends StatelessWidget {
  const ScannerOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipPath(
      clipper: _ScannerHoleClipper(),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
        child: Container(
          color: CupertinoColors.black.withOpacity(0.3),
        ),
      ),
    );
  }
}

class _ScannerHoleClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final rect = Rect.fromLTWH(0, 0, size.width, size.height);
    final holeSize = ScannerConstants.viewfinderSize;
    final holeRect = Rect.fromCenter(
      center: Offset(size.width / 2, size.height / 2),
      width: holeSize,
      height: holeSize,
    );

    final path = Path()
      ..addRect(rect)
      ..addPath(
        SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: ScannerConstants.cornerRadius,
            cornerSmoothing: 1.0,
          ),
        ).getOuterPath(holeRect),
        Offset.zero,
      )
      ..fillType = PathFillType.evenOdd;
    
    return path;
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}
