import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

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

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onPressed?.call();
      },
      behavior: HitTestBehavior.opaque,
      child: ClipOval(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.12)
                  : Colors.black.withValues(alpha: 0.06),
              shape: BoxShape.circle,
              border: Border.all(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.20)
                    : Colors.white.withValues(alpha: 0.60),
                width: 0.5,
              ),
            ),
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
    );
  }
}
