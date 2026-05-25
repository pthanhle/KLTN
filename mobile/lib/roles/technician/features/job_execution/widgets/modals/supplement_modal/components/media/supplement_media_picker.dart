import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class SupplementMediaPicker extends StatelessWidget {
  const SupplementMediaPicker({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final errorColor = theme.colorScheme.error;
    final errorContainer = theme.colorScheme.errorContainer;

    return GestureDetector(
      onTapDown: (_) => HapticFeedback.lightImpact(),
      onTap: () {
        HapticFeedback.mediumImpact();
        // Handle media picking
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
        decoration: BoxDecoration(
          color: errorContainer.withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: errorColor.withValues(alpha: 0.3),
            width: 2,
            style: BorderStyle.solid,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: ShapeDecoration(
                color: theme.colorScheme.surface.withValues(alpha: 0.80),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 17, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: 0.50),
                    width: 1,
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
              child: Icon(
                CupertinoIcons.camera_fill,
                color: errorColor,
                size: 28,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Bắt buộc: Chụp/Quay video chứng cứ rõ nét'.tr(),
              textAlign: TextAlign.center,
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 15,
                fontWeight: FontWeight.w500,
                color: errorColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
