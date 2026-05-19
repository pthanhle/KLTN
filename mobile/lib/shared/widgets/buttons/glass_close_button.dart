import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class GlassCloseButton extends StatelessWidget {
  final VoidCallback onPressed;
  final double size;
  final double iconSize;

  const GlassCloseButton({
    super.key,
    required this.onPressed,
    this.size = 36,
    this.iconSize = 14,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onPressed();
      },
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
                    ? Colors.white.withValues(alpha: 0.2)
                    : Colors.white.withValues(alpha: 0.6),
                width: 0.5,
              ),
            ),
            child: Icon(
              CupertinoIcons.xmark,
              size: iconSize,
              color: isDark
                  ? Colors.white.withValues(alpha: 0.85)
                  : Colors.black.withValues(alpha: 0.6),
            ),
          ),
        ),
      ),
    );
  }
}
