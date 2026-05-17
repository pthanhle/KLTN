import 'package:flutter/material.dart';
import '../../../../../../core/utils/theme_extension.dart';

class TaskCardSkeleton extends StatelessWidget {
  const TaskCardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: context.colors.surface.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: context.colors.outlineVariant.withValues(alpha: 0.2),
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  _buildSkeletonBox(context, width: 60, height: 24, borderRadius: 12),
                  const SizedBox(width: 8),
                  _buildSkeletonBox(context, width: 100, height: 16),
                ],
              ),
              _buildSkeletonBox(context, width: 24, height: 24, borderRadius: 12),
            ],
          ),
          const SizedBox(height: 16),
          _buildSkeletonBox(context, width: 200, height: 20),
          const SizedBox(height: 16),
          Row(
            children: [
              _buildSkeletonBox(context, width: 80, height: 24, borderRadius: 6),
              const SizedBox(width: 8),
              _buildSkeletonBox(context, width: 100, height: 24, borderRadius: 6),
            ],
          ),
          const SizedBox(height: 16),
          const Divider(height: 1),
          const SizedBox(height: 16),
          _buildSkeletonBox(context, width: 120, height: 16),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  _buildSkeletonBox(context, width: 32, height: 32, borderRadius: 16),
                  const SizedBox(width: 8),
                  _buildSkeletonBox(context, width: 100, height: 16),
                ],
              ),
              _buildSkeletonBox(context, width: 60, height: 32, borderRadius: 16),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSkeletonBox(BuildContext context, {required double width, required double height, double borderRadius = 4}) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: context.colors.surfaceContainerHigh.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(borderRadius),
      ),
    );
  }
}
