import 'package:flutter/material.dart';
import '../../../../../../../core/utils/theme_extension.dart';
import 'package:figma_squircle/figma_squircle.dart';

class TaskCardSkeleton extends StatelessWidget {
  const TaskCardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.all(20.0),
      decoration: ShapeDecoration(
        color: context.colors.surface.withValues(alpha: 0.6),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 24,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: context.colors.outlineVariant.withValues(alpha: 0.2),
            width: 1.5,
          ),
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
                  _buildShimmerBlock(context, width: 60, height: 24, borderRadius: 8),
                  const SizedBox(width: 8),
                  _buildShimmerBlock(context, width: 80, height: 24, borderRadius: 8),
                ],
              ),
              _buildShimmerBlock(context, width: 40, height: 16, borderRadius: 4),
            ],
          ),
          const SizedBox(height: 16),
          _buildShimmerBlock(context, width: double.infinity, height: 20, borderRadius: 4),
          const SizedBox(height: 8),
          _buildShimmerBlock(context, width: 150, height: 20, borderRadius: 4),
          const SizedBox(height: 16),
          Row(
            children: [
              _buildShimmerBlock(context, width: 36, height: 36, borderRadius: 18),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildShimmerBlock(context, width: 120, height: 16, borderRadius: 4),
                    const SizedBox(height: 4),
                    _buildShimmerBlock(context, width: 80, height: 12, borderRadius: 4),
                  ],
                ),
              ),
              _buildShimmerBlock(context, width: 40, height: 40, borderRadius: 20),
              const SizedBox(width: 4),
              _buildShimmerBlock(context, width: 40, height: 40, borderRadius: 20),
            ],
          ),
          const SizedBox(height: 16),
          Divider(
            height: 1, 
            color: context.colors.outlineVariant.withValues(alpha: 0.2)
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildShimmerBlock(context, width: 80, height: 14, borderRadius: 4),
                  const SizedBox(height: 4),
                  _buildShimmerBlock(context, width: 140, height: 14, borderRadius: 4),
                ],
              ),
              _buildShimmerBlock(context, width: 60, height: 24, borderRadius: 8),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildShimmerBlock(BuildContext context, {required double width, required double height, required double borderRadius}) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: context.colors.outlineVariant.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(borderRadius),
      ),
    );
  }
}