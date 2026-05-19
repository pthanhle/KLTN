import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/sales/features/dashboard/widgets/cards/stat_glass_card.dart';

class QuickStatsSection extends StatelessWidget {
  final int todayCount;
  final int waitingCount;

  const QuickStatsSection({
    super.key,
    required this.todayCount,
    required this.waitingCount,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        children: [
          Expanded(
            child: StatGlassCard(
              title: 'Hôm nay'.tr(),
              value: todayCount.toString().padLeft(2, '0'),
              glowColor: Theme.of(context).colorScheme.primary,
              valueColor: Theme.of(context).colorScheme.primary,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: StatGlassCard(
              title: 'Khách chờ'.tr(), // Rút gọn title để vừa vặn Grid
              value: waitingCount.toString().padLeft(2, '0'),
              glowColor: Theme.of(context).colorScheme.secondary,
              valueColor: Theme.of(context).colorScheme.secondary,
            ),
          ),
        ],
      ),
    );
  }
}
