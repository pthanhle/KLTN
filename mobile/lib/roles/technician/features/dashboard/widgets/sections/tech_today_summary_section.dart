import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/tech_summary_model.dart';
import '../cards/tech_stat_badge.dart';
import '../skeletons/tech_stat_badge_skeleton.dart';

class TechTodaySummarySection extends StatelessWidget {
  final TechSummaryModel? summary;
  final bool isLoading;

  const TechTodaySummarySection({
    super.key,
    required this.summary,
    required this.isLoading,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Hôm nay'.tr(),
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w700,
            letterSpacing: -0.3,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: isLoading
                  ? const TechStatBadgeSkeleton()
                  : TechStatBadge(
                      icon: CupertinoIcons.wrench_fill,
                      value: summary?.activeJobs.toString() ?? '0',
                      label: 'Đang sửa'.tr(),
                      color: theme.colorScheme.primary,
                    ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: isLoading
                  ? const TechStatBadgeSkeleton()
                  : TechStatBadge(
                      icon: CupertinoIcons.checkmark_seal_fill,
                      value: summary?.completedJobs.toString() ?? '0',
                      label: 'Hoàn thành'.tr(),
                      color: const Color(0xFF34C759),
                    ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: isLoading
                  ? const TechStatBadgeSkeleton()
                  : TechStatBadge(
                      icon: CupertinoIcons.time,
                      value: summary?.waitingPartsJobs.toString() ?? '0',
                      label: 'Chờ phụ tùng'.tr(),
                      color: const Color(0xFFFF9500),
                    ),
            ),
          ],
        ),
      ],
    );
  }
}
