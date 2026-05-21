import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class ExceptionAlertBanner extends StatelessWidget {
  final String exceptionText;

  const ExceptionAlertBanner({
    super.key,
    required this.exceptionText,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: ShapeDecoration(
        color: Colors.red.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 999,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.red.withValues(alpha: 0.3),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.red.withValues(alpha: 0.2),
            blurRadius: 15,
            offset: Offset.zero,
          ),
        ],
      ),
      child: Row(
        children: [
          Icon(
            CupertinoIcons.exclamationmark_circle_fill,
            color: Colors.red.shade400,
            size: 22,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              exceptionText,
              style: TextStyle(
                fontSize: 17,
                color: isDark ? Colors.red.shade100 : Colors.red.shade900,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Icon(
            CupertinoIcons.chevron_right,
            color: Colors.red.shade400.withValues(alpha: 0.7),
            size: 18,
          ),
        ],
      ),
    );
  }
}
