import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PackingItemAnimatedContainer extends StatelessWidget {
  final bool isPacked;
  final Widget child;

  const PackingItemAnimatedContainer({
    super.key,
    required this.isPacked,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return TweenAnimationBuilder<double>(
      tween: Tween<double>(begin: 0.0, end: isPacked ? 1.0 : 0.0),
      duration: const Duration(milliseconds: 300),
      curve: Curves.fastLinearToSlowEaseIn,
      builder: (context, value, _) {
        final baseColor = Colors.white.withValues(alpha: isDark ? 0.05 : 0.2);
        final packedColor = const Color(0xFF34C759).withValues(alpha: isDark ? 0.12 : 0.10);
        final currentColor = Color.lerp(baseColor, packedColor, value)!;

        final baseBorderColor = Colors.white.withValues(alpha: 0.3);
        final packedBorderColor = const Color(0xFF34C759).withValues(alpha: isDark ? 0.35 : 0.25);
        final currentBorderColor = Color.lerp(baseBorderColor, packedBorderColor, value)!;

        return Container(
          decoration: ShapeDecoration(
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.05),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: ShapeDecoration(
                  color: currentColor,
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 16,
                      cornerSmoothing: 1.0,
                    ),
                    side: BorderSide(
                      color: currentBorderColor,
                      width: 0.5,
                    ),
                  ),
                ),
                child: child,
              ),
            ),
          ),
        );
      },
    );
  }
}
