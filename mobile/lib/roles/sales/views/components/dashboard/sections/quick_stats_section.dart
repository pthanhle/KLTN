import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../cards/stat_glass_card.dart';

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
    return SizedBox(
      height: 140, // Fixed height for horizontal scroll
      child: ListView(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 24),
        children: [
          SizedBox(
            width: 160,
            child: StatGlassCard(
              title: 'Hôm nay'.tr(),
              value: todayCount.toString().padLeft(2, '0'),
              glowColor: Theme.of(context).primaryColor,
              valueColor: Theme.of(context).primaryColor,
            ),
          ),
          const SizedBox(width: 16),
          SizedBox(
            width: 160,
            child: StatGlassCard(
              title: 'Khách đang chờ'.tr(),
              value: waitingCount.toString().padLeft(2, '0'),
              glowColor: Colors.blueAccent, // Equivalent to accent-blue
              valueColor: Colors.blueAccent,
            ),
          ),
          // Có thể thêm padding cuối nếu cần
          const SizedBox(width: 8),
        ],
      ),
    );
  }
}
