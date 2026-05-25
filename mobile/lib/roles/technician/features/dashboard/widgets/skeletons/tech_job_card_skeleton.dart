import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class TechJobCardSkeleton extends StatefulWidget {
  const TechJobCardSkeleton({super.key});

  @override
  State<TechJobCardSkeleton> createState() => _TechJobCardSkeletonState();
}

class _TechJobCardSkeletonState extends State<TechJobCardSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat(reverse: true);
    _opacity = Tween<double>(begin: 0.3, end: 0.8).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final baseColor = isDark
        ? Colors.white.withValues(alpha: 0.05)
        : Colors.black.withValues(alpha: 0.05);
    final shimmerColor = isDark ? Colors.white24 : Colors.black12;

    return Container(
      decoration: ShapeDecoration(
        color: baseColor,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
        ),
      ),
      padding: const EdgeInsets.all(16),
      child: FadeTransition(
        opacity: _opacity,
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: ShapeDecoration(
                color: shimmerColor,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 120,
                    height: 16,
                    decoration: BoxDecoration(
                      color: shimmerColor,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Container(
                    width: 80,
                    height: 12,
                    decoration: BoxDecoration(
                      color: shimmerColor,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: 80,
              height: 24,
              decoration: ShapeDecoration(
                color: shimmerColor,
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
