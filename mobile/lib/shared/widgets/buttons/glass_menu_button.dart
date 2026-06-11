import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class GlassMenuButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final double size;
  final double iconSize;
  final IconData icon;

  const GlassMenuButton({
    super.key,
    this.onPressed,
    this.size = 36,
    this.iconSize = 16,
    this.icon = CupertinoIcons.ellipsis,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final radius = SmoothBorderRadius(cornerRadius: size * 0.35, cornerSmoothing: 1.0);

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onPressed?.call();
      },
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: size,
        height: size,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.12)
              : Colors.black.withValues(alpha: 0.06),
          shape: SmoothRectangleBorder(
            borderRadius: radius,
            side: BorderSide(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.20)
                  : Colors.white.withValues(alpha: 0.60),
              width: 0.5,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: radius,
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
            child: Center(
              child: Icon(
                icon,
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
