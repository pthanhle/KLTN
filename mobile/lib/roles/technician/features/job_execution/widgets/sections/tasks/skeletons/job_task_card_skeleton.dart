import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../constants/job_execution_constants.dart';

class JobTaskCardSkeleton extends StatefulWidget {
  const JobTaskCardSkeleton({super.key});

  @override
  State<JobTaskCardSkeleton> createState() => _JobTaskCardSkeletonState();
}

class _JobTaskCardSkeletonState extends State<JobTaskCardSkeleton>
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
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _shimmerBox(shimmer, width: 160, height: 18),
                    const SizedBox(height: 6),
                    _shimmerBox(shimmer, width: 100, height: 12),
                  ],
                ),
                _shimmerSquircle(shimmer, size: JobExecutionUiConstants.iconBadgeSize),
              ],
            ),
            const SizedBox(height: 16),
            _shimmerBox(shimmer, width: double.infinity, height: 12),
            const SizedBox(height: 4),
            _shimmerBox(shimmer, width: 200, height: 12),
            const SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: _shimmerPill(shimmer, width: 100, height: 38),
            ),
          ],
        ),
      ),
    );
  }

  Widget _shimmerBox(Color color, {required double width, required double height}) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(4),
      ),
    );
  }

  Widget _shimmerSquircle(Color color, {required double size}) {
    return Container(
      width: size,
      height: size,
      decoration: ShapeDecoration(
        color: color,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: JobExecutionUiConstants.iconBadgeCornerRadius,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
    );
  }

  Widget _shimmerPill(Color color, {required double width, required double height}) {
    return Container(
      width: width,
      height: height,
      decoration: ShapeDecoration(
        color: color,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 100, cornerSmoothing: 1.0),
        ),
      ),
    );
  }
}
