import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class GlassCloseButton extends StatelessWidget {
  final VoidCallback onPressed;
  final double size;
  final double iconSize;

  const GlassCloseButton({
    super.key,
    required this.onPressed,
    this.size = 32,
    this.iconSize = 14,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final cornerRadius = size * 0.3125;

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onPressed();
      },
      child: Container(
        width: size,
        height: size,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.08)
              : Colors.black.withValues(alpha: 0.05),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
                cornerRadius: cornerRadius, cornerSmoothing: 1.0),
            side: BorderSide(
              color:
                  Colors.white.withValues(alpha: isDark ? 0.12 : 0.50),
              width: 0.5,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
              cornerRadius: cornerRadius, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Center(
              child: Icon(
                CupertinoIcons.xmark,
                size: iconSize,
                color: theme.colorScheme.onSurface.withValues(alpha: 0.70),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
