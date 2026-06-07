import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class MpiPassAllButton extends StatelessWidget {
  final VoidCallback? onTap;
  final bool isAllPassed;

  const MpiPassAllButton({
    super.key,
    this.onTap,
    required this.isAllPassed,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final color = isAllPassed
        ? const Color(0xFF34C759)
        : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.50);

    return GestureDetector(
      onTap: onTap == null ? null : () {
        HapticFeedback.selectionClick();
        onTap!();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: ShapeDecoration(
          color: color.withValues(alpha: 0.10),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
            side: BorderSide(
              color: color.withValues(alpha: isAllPassed ? 0.30 : 0.10),
              width: 0.5,
            ),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(CupertinoIcons.checkmark_alt_circle_fill, size: 14, color: color),
            const SizedBox(width: 4),
            Text(
              'Đạt tất cả'.tr(),
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color,
                decoration: TextDecoration.none,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
