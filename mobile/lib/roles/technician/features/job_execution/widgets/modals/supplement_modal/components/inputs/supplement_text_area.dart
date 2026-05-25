import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class SupplementTextArea extends StatelessWidget {
  final String label;
  final String placeholder;
  final int maxLines;
  final TextEditingController? controller;

  const SupplementTextArea({
    super.key,
    required this.label,
    required this.placeholder,
    this.maxLines = 4,
    this.controller,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            label,
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 15,
              fontWeight: FontWeight.w500,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
        Container(
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.04),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.1 : 0.6),
                width: 0.5,
              ),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.02),
                blurRadius: 4,
                offset: const Offset(0, 2),
                blurStyle: BlurStyle.inner,
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: CupertinoTextField(
                controller: controller,
                placeholder: placeholder,
                placeholderStyle: TextStyle(
                  color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                  fontFamily: 'Inter',
                  fontSize: 17,
                ),
                style: TextStyle(
                  color: theme.colorScheme.onSurface,
                  fontFamily: 'Inter',
                  fontSize: 17,
                ),
                maxLines: maxLines,
                padding: const EdgeInsets.all(16),
                decoration: null,
                cursorColor: theme.colorScheme.error,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
