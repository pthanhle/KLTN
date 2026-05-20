import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../../../shared/widgets/loaders/skeleton_loader.dart';

class RepairOrderSkeleton extends StatelessWidget {
  const RepairOrderSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: ShapeDecoration(
        color: isDark 
            ? Colors.white.withValues(alpha: 0.05) 
            : Colors.black.withValues(alpha: 0.02),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 28,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: isDark 
                ? Colors.white.withValues(alpha: 0.05) 
                : Colors.black.withValues(alpha: 0.05),
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
                  const SkeletonLoader(width: 120, height: 24, borderRadius: BorderRadius.all(Radius.circular(4))),
                  const SizedBox(height: 8),
                  const SkeletonLoader(width: 80, height: 16, borderRadius: BorderRadius.all(Radius.circular(4))),
                ],
              ),
              const SkeletonLoader(width: 60, height: 24, borderRadius: BorderRadius.all(Radius.circular(12))),
            ],
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SkeletonLoader(width: 60, height: 12, borderRadius: BorderRadius.all(Radius.circular(4))),
                  const SizedBox(height: 8),
                  const SkeletonLoader(width: 100, height: 20, borderRadius: BorderRadius.all(Radius.circular(4))),
                ],
              ),
              const SkeletonLoader(width: 40, height: 40, borderRadius: BorderRadius.all(Radius.circular(20))),
            ],
          ),
          const SizedBox(height: 16),
          const SkeletonLoader(width: double.infinity, height: 70, borderRadius: BorderRadius.all(Radius.circular(16))),
          const SizedBox(height: 16),
          Row(
            children: [
              const SkeletonLoader(width: 32, height: 32, borderRadius: BorderRadius.all(Radius.circular(16))),
              const SizedBox(width: 8),
              const SkeletonLoader(width: 100, height: 16, borderRadius: BorderRadius.all(Radius.circular(4))),
            ],
          ),
        ],
      ),
    ).animate(onPlay: (controller) => controller.repeat())
     .shimmer(duration: 1200.ms, color: Colors.white.withValues(alpha: 0.2));
  }
}
