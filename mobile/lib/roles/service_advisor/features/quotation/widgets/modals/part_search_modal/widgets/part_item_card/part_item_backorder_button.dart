import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PartItemBackorderButton extends StatelessWidget {
  final VoidCallback onTap;
  final bool isExpanded;

  const PartItemBackorderButton({
    super.key,
    required this.onTap,
    required this.isExpanded,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    const orange = Color(0xFFFF9500);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: ShapeDecoration(
          color: orange.withValues(alpha: isDark ? 0.12 : 0.08),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
            side: const BorderSide(color: Color(0x4DFF9500), width: 0.5),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isExpanded
                  ? CupertinoIcons.chevron_up
                  : CupertinoIcons.calendar,
              color: orange,
              size: 16,
            ),
            const SizedBox(width: 6),
            Text(
              'Đặt hàng'.tr(),
              style: theme.textTheme.bodySmall?.copyWith(
                color: orange,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
