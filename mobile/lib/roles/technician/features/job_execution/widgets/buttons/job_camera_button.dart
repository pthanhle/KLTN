import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

/// §12 — GlassCloseButton pattern cho camera icon button
/// Squircle(13) + BackdropFilter blur:12 + specular border
class JobCameraButton extends StatelessWidget {
  final bool isVisible;
  final VoidCallback onTap;

  const JobCameraButton({
    super.key,
    required this.isVisible,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return AnimatedSize(
      duration: const Duration(milliseconds: 400),
      curve: Curves.easeOutCubic,
      child: isVisible
          ? Padding(
              padding: const EdgeInsets.only(left: 12),
              child: GestureDetector(
                onTap: () {
                  HapticFeedback.lightImpact();
                  onTap();
                },
                child: Container(
                  height: 40,
                  width: 40,
                  decoration: ShapeDecoration(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.08)
                        : Colors.black.withValues(alpha: 0.05),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.50),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: Center(
                        child: Icon(
                          CupertinoIcons.camera_fill,
                          size: 18,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            )
          : const SizedBox.shrink(),
    );
  }
}
