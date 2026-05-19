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
        color: isDark
            ? Colors.white.withValues(alpha: 0.15)
            : Colors.white.withValues(alpha: 0.4),
        width: 1.0,
      ),
    );

    return Padding(
      padding: EdgeInsets.only(
        left: 20, 
        right: 20, 
        bottom: bottomSafeArea > 0 ? 24 : 16,
      ),
      child: ClipPath(
        clipper: ShapeBorderClipper(shape: squircleShape),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blurSigma, sigmaY: blurSigma),
          child: Container(
            padding: padding,
            decoration: ShapeDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  isDark
                      ? colorScheme.surface.withValues(alpha: 0.25)
                      : Colors.white.withValues(alpha: 0.4),
                  isDark
                      ? colorScheme.surface.withValues(alpha: 0.1)
                      : Colors.white.withValues(alpha: 0.15),
                ],
              ),
              shape: squircleShape,
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.08),
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