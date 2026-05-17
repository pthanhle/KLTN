import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class GlassNavigationBar extends StatelessWidget {
  final List<Widget> items;
  final EdgeInsetsGeometry margin;
  final EdgeInsetsGeometry padding;
  final double blurSigma;

  const GlassNavigationBar({
    super.key,
    required this.items,
    this.margin = const EdgeInsets.only(left: 24, right: 24, bottom: 32),
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    this.blurSigma = 24.0,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;

    final squircleShape = SmoothRectangleBorder(
      borderRadius: SmoothBorderRadius(
        cornerRadius: 64,
        cornerSmoothing: 1.0,
      ),
      side: BorderSide(
        color: isDark
            ? Colors.white.withValues(alpha: 0.1)
            : Colors.white.withValues(alpha: 0.4),
        width: 1.0,
      ),
    );

    return Padding(
      padding: margin,
      child: ClipPath(
        clipper: ShapeBorderClipper(shape: squircleShape),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blurSigma, sigmaY: blurSigma),
          child: Container(
            padding: padding,
            decoration: ShapeDecoration(
              color: isDark
                  ? colorScheme.surface.withValues(alpha: 0.6)
                  : colorScheme.surface.withValues(alpha: 0.7),
              shape: squircleShape,
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.03),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: items.map((item) => Expanded(child: item)).toList(),
            ),
          ),
        ),
      ),
    );
  }
}