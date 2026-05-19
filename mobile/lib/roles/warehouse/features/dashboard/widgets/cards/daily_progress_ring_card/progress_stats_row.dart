import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class ProgressStatsRow extends StatelessWidget {
  final int completed;
  final int totalTarget;

  const ProgressStatsRow({
    super.key,
    required this.completed,
    required this.totalTarget,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        Column(
          children: [
            Text(
              'Đã đóng gói'.tr(),
              style: TextStyle(
                fontSize: 15,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.9),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '$completed',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w600,
                color: isDark ? Colors.white : Colors.black87,
              ),
            ),
          ],
        ),
        Container(
          width: 1,
          height: 32,
          color: isDark ? Colors.white.withValues(alpha: 0.2) : Colors.black.withValues(alpha: 0.1),
        ),
        Column(
          children: [
            Text(
              'Tổng chỉ tiêu'.tr(),
              style: TextStyle(
                fontSize: 15,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.9),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '$totalTarget',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w600,
                color: isDark ? Colors.white : Colors.black87,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
