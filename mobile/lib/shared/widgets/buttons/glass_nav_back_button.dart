import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class GlassNavBackButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final double size;
  final double iconSize;

  const GlassNavBackButton({
    super.key,
    this.onPressed,
    this.size = 36,
    this.iconSize = 16,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final callback = onPressed ?? () => Navigator.of(context).maybePop();

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        callback();
      },
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: size,
        height: size,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.08)
              : Colors.black.withValues(alpha: 0.05),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 11, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.50),
              width: 0.5,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 11, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Center(
              child: Icon(
                CupertinoIcons.chevron_back,
                size: iconSize,
                color: isDark
                    ? Colors.white.withValues(alpha: 0.90)
                    : Colors.black.withValues(alpha: 0.65),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
