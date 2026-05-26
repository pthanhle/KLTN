import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

/// §2 — Supplement media picker với Squircle glass + gợi ý upload bắt buộc
class SupplementMediaPicker extends StatelessWidget {
  const SupplementMediaPicker({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final errorColor = theme.colorScheme.error;

    return GestureDetector(
      onTapDown: (_) => HapticFeedback.lightImpact(),
      onTap: () {
        HapticFeedback.mediumImpact();
        // TODO: tích hợp image_picker — chọn camera hoặc thư viện
      },
      child: Container(
        width: double.infinity,
        decoration: ShapeDecoration(
          // §2: Squircle glass với màu error-tinted
          color: errorColor.withValues(alpha: isDark ? 0.08 : 0.06),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
            side: BorderSide(
              color: errorColor.withValues(alpha: 0.25),
              width: 1.0,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.03),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Icon container — §12 glass squircle mini
                  Container(
                    width: 56,
                    height: 56,
                    decoration: ShapeDecoration(
                      color: theme.colorScheme.surface.withValues(alpha: 0.80),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(cornerRadius: 17, cornerSmoothing: 1.0),
                        side: BorderSide(
                          color: Colors.white.withValues(alpha: isDark ? 0.20 : 0.50),
                          width: 1.0,
                        ),
                      ),
                      shadows: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: ClipSmoothRect(
                      radius: SmoothBorderRadius(cornerRadius: 17, cornerSmoothing: 1.0),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                        child: Center(
                          child: Icon(
                            CupertinoIcons.camera_fill,
                            color: errorColor,
                            size: 26,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Bắt buộc: Chụp/Quay video chứng cứ rõ nét'.tr(),
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: errorColor,
                      letterSpacing: -0.2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Nhấn để chụp ảnh hoặc chọn từ thư viện'.tr(),
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 13,
                      color: theme.colorScheme.onSurfaceVariant,
                      height: 1.4,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
