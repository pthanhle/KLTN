import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class GlassNavigationBar extends StatelessWidget {
  final List<Widget> items;
  final EdgeInsetsGeometry padding;
  final double blurSigma;

  const GlassNavigationBar({
    super.key,
    required this.items,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
    this.blurSigma = 32.0,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;
    final bottomSafeArea = MediaQuery.of(context).padding.bottom;

    final squircleShape = SmoothRectangleBorder(
      borderRadius: SmoothBorderRadius(
        cornerRadius: 44,
        cornerSmoothing: 1.0,
      ),
      side: BorderSide(
        color: Colors.white.withValues(alpha: 0.3),
        width: 0.5,
      ),
    );

    return Padding(
      padding: EdgeInsets.only(
        left: 20, 
        right: 20, 
        bottom: bottomSafeArea > 0 ? 24 : 16,
      ),
      child: Container(
        height: 68,
        decoration: ShapeDecoration(
          color: Colors.white.withValues(alpha: 0.15),
          shape: squircleShape,
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.5),
              blurRadius: 40,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 44,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Container(
              color: Colors.transparent,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: items.map((item) => Expanded(child: item)).toList(),
              ),
            ),
          ),
        ),
      ),
    );
  }
}