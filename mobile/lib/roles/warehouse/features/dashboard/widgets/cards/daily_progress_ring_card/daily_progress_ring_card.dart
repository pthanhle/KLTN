import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/models/daily_progress_model.dart';
import 'animated_progress_ring.dart';
import 'progress_card_header.dart';
import 'progress_stats_row.dart';

class DailyProgressRingCard extends StatelessWidget {
  final DailyProgressModel progressModel;

  const DailyProgressRingCard({
    super.key,
    required this.progressModel,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: ShapeDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.02) : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: isDark ? Colors.white.withValues(alpha: 0.1) : Colors.white.withValues(alpha: 0.3),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 32,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const ProgressCardHeader(),
                const SizedBox(height: 24),
                Center(
                  child: AnimatedProgressRing(
                    completed: progressModel.completed,
                    totalTarget: progressModel.totalTarget,
                  ),
                ),
                const SizedBox(height: 24),
                ProgressStatsRow(
                  completed: progressModel.completed,
                  totalTarget: progressModel.totalTarget,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
