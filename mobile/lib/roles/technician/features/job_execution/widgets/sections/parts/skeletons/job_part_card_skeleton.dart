import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../constants/job_execution_constants.dart';

class JobPartCardSkeleton extends StatefulWidget {
  const JobPartCardSkeleton({super.key});

  @override
  State<JobPartCardSkeleton> createState() => _JobPartCardSkeletonState();
}

class _JobPartCardSkeletonState extends State<JobPartCardSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
    _opacity = Tween<double>(begin: 0.3, end: 0.7)
        .animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final shimmer = isDark
        ? Colors.white.withValues(alpha: 0.10)
        : Colors.black.withValues(alpha: 0.05);

    return FadeTransition(
      opacity: _opacity,
      child: Container(
        margin: const EdgeInsets.only(bottom: JobExecutionUiConstants.cardMarginBottom),
        padding: const EdgeInsets.all(JobExecutionUiConstants.cardPadding),
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.03)
              : Colors.white.withValues(alpha: 0.50),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: JobExecutionUiConstants.cardCornerRadius,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.08 : 0.50),
              width: 0.5,
            ),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: ShapeDecoration(
                color: shimmer,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: JobExecutionUiConstants.iconBadgeCornerRadius,
                    cornerSmoothing: 1.0,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 140,
                    height: 16,
                    decoration: BoxDecoration(
                      color: shimmer,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Container(
                    width: 60,
                    height: 12,
                    decoration: BoxDecoration(
                      color: shimmer,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: 32,
              height: 32,
              decoration: ShapeDecoration(
                color: shimmer,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
