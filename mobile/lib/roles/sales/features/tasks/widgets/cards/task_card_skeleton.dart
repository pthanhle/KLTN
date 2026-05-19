import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../core/utils/theme_extension.dart';
import 'package:shimmer/shimmer.dart';

class TaskCardSkeleton extends StatelessWidget {
  const TaskCardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(20.0),
      decoration: ShapeDecoration(
        color: context.colors.surface.withValues(alpha: isDark ? 0.45 : 0.65),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: isDark 
              ? Colors.white.withValues(alpha: 0.1) 
              : Colors.white.withValues(alpha: 0.4),
            width: 0.5,
          ),
        ),
      ),
      child: Shimmer.fromColors(
        baseColor: context.colors.surfaceContainerHigh.withValues(alpha: 0.5),
        highlightColor: context.colors.surfaceContainerHighest.withValues(alpha: 0.5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    _buildSkeletonBox(width: 80, height: 24, borderRadius: 12),
                    const SizedBox(width: 8),
                    _buildSkeletonBox(width: 80, height: 24, borderRadius: 12),
                  ],
                ),
                _buildSkeletonBox(width: 40, height: 16),
              ],
            ),
            const SizedBox(height: 16),
            _buildSkeletonBox(width: double.infinity, height: 20),
            const SizedBox(height: 8),
            _buildSkeletonBox(width: 150, height: 16),
            const SizedBox(height: 16),
            Row(
              children: [
                _buildSkeletonBox(width: 44, height: 44, borderRadius: 14), // Squircle Avatar
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildSkeletonBox(width: 120, height: 16),
                    const SizedBox(height: 6),
                    _buildSkeletonBox(width: 90, height: 12),
                  ],
                ),
                const Spacer(),
                _buildSkeletonBox(width: 40, height: 40, borderRadius: 999),
                const SizedBox(width: 8),
                _buildSkeletonBox(width: 40, height: 40, borderRadius: 999),
              ],
            ),
            const SizedBox(height: 16),
            Container(height: 0.5, color: Colors.white), // Divider
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildSkeletonBox(width: 100, height: 14),
                    const SizedBox(height: 6),
                    _buildSkeletonBox(width: 140, height: 14),
                  ],
                ),
                _buildSkeletonBox(width: 60, height: 24, borderRadius: 10),
              ],
            ),
            const SizedBox(height: 20),
            _buildSkeletonBox(width: double.infinity, height: 56, borderRadius: 999), // Action Button
          ],
        ),
      ),
    );
  }

  Widget _buildSkeletonBox({required double width, required double height, double borderRadius = 6}) {
    return Container(
      width: width,
      height: height,
      decoration: ShapeDecoration(
        color: Colors.white,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: borderRadius, cornerSmoothing: 1.0),
        ),
      ),
    );
  }
}
