import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PartItemAddButton extends StatelessWidget {
  final VoidCallback onTap;

  const PartItemAddButton({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 40,
        height: 40,
        decoration: ShapeDecoration(
          color: theme.colorScheme.primary.withValues(alpha: 0.12),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
            side: BorderSide(
              color: theme.colorScheme.primary.withValues(alpha: 0.30),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: theme.colorScheme.primary.withValues(alpha: 0.20),
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
              child: Icon(
                CupertinoIcons.cart_badge_plus,
                color: theme.colorScheme.primary,
                size: 18,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
