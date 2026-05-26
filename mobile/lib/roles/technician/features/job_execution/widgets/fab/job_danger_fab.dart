import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class JobDangerFab extends StatelessWidget {
  final VoidCallback onTap;

  const JobDangerFab({
    super.key,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    // §8: Apple HIG destructive red
    final appleRed = isDark ? const Color(0xFFFF453A) : const Color(0xFFFF3B30);
    return Positioned(
      bottom: 24,
      left: 24,
      right: 24,
      child: Center(
        child: GestureDetector(
          onTap: () {
            HapticFeedback.heavyImpact();
            onTap();
          },
          child: Container(
            decoration: ShapeDecoration(
              color: appleRed.withValues(alpha: 0.88),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 100,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: 0.3),
                  width: 1,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: appleRed.withValues(alpha: 0.40),
                  blurRadius: 40,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(
                cornerRadius: 100,
                cornerSmoothing: 1.0,
              ),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 32),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(
                        CupertinoIcons.exclamationmark_triangle_fill,
                        color: Colors.white,
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'BÁO CÁO PHÁT SINH'.tr(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
