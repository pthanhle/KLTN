import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class ServicePackingItemAnimatedContainer extends StatelessWidget {
  final bool isPacked;
  final Widget child;

  const ServicePackingItemAnimatedContainer({
    super.key,
    required this.isPacked,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 360),
      curve: Curves.easeOutCubic,
      decoration: ShapeDecoration(
        color: isPacked
            ? (isDark
                ? const Color(0xFF34C759).withValues(alpha: 0.08)
                : const Color(0xFF34C759).withValues(alpha: 0.04))
            : (isDark
                ? Colors.white.withValues(alpha: 0.02)
                : Colors.white.withValues(alpha: 0.15)),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
          side: BorderSide(
            color: isPacked
                ? const Color(0xFF34C759).withValues(alpha: 0.35)
                : Colors.white.withValues(alpha: 0.3),
            width: isPacked ? 1.0 : 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: child,
          ),
        ),
      ),
    );
  }
}
