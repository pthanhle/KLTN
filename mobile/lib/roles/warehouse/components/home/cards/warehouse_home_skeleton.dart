import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:figma_squircle/figma_squircle.dart';

class WarehouseHomeSkeleton extends StatelessWidget {
  const WarehouseHomeSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final baseColor = isDark ? Colors.grey[800]! : Colors.grey[300]!;
    final highlightColor = isDark ? Colors.grey[700]! : Colors.grey[100]!;

    return Shimmer.fromColors(
      baseColor: baseColor,
      highlightColor: highlightColor,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: _buildSkeletonCard(height: 100),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildSkeletonCard(height: 100),
              ),
            ],
          ),
          const SizedBox(height: 24),
          _buildSkeletonCard(height: 300),
          const SizedBox(height: 24),
          _buildSkeletonBanner(),
        ],
      ),
    );
  }

  Widget _buildSkeletonCard({required double height}) {
    return Container(
      height: height,
      decoration: ShapeDecoration(
        color: Colors.white,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
    );
  }

  Widget _buildSkeletonBanner() {
    return Container(
      height: 60,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(999),
      ),
    );
  }
}
