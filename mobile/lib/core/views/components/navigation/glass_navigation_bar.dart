import 'dart:ui';
import 'package:flutter/material.dart';

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

    return Padding(
      padding: margin,
      child: ClipPath(
        clipper: ShapeBorderClipper(
          shape: ContinuousRectangleBorder(borderRadius: BorderRadius.circular(64)),
        ), // Squircle-like roundness
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: blurSigma, sigmaY: blurSigma),
          child: Container(
            padding: padding,
            decoration: ShapeDecoration(
              color: isDark
                  ? colorScheme.surface.withValues(alpha: 0.6)
                  : colorScheme.surface.withValues(alpha: 0.7),
              shape: ContinuousRectangleBorder(
                borderRadius: BorderRadius.circular(64),
                side: BorderSide(
                  color: isDark
                      ? Colors.white.withValues(alpha: 0.1)
                      : Colors.white.withValues(alpha: 0.5),
                  width: 1.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
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
