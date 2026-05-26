import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PartItemAddButton extends StatelessWidget {
  final VoidCallback onTap;
  final bool isAdded;

  const PartItemAddButton({
    super.key,
    required this.onTap,
    this.isAdded = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final color = isAdded
        ? const Color(0xFF34C759)
        : theme.colorScheme.primary;

    return GestureDetector(
      onTap: isAdded ? null : onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
        width: 40,
        height: 40,
        decoration: ShapeDecoration(
          color: color.withValues(alpha: 0.12),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
            side: BorderSide(
              color: color.withValues(alpha: 0.30),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: color.withValues(alpha: 0.20),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
            child: Center(
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 250),
                child: Icon(
                  isAdded ? CupertinoIcons.checkmark_alt : CupertinoIcons.cart_badge_plus,
                  key: ValueKey(isAdded),
                  color: color,
                  size: 18,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
