import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../shared/widgets/loaders/skeleton_loader.dart';

class OrderCardSkeleton extends StatelessWidget {
  const OrderCardSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: ShapeDecoration(
          color: theme.colorScheme.surface.withValues(alpha: 0.6),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 22,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: 0.2),
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
                SkeletonLoader(width: 120, height: 20, borderRadius: const BorderRadius.all(Radius.circular(4))),
                SkeletonLoader(width: 80, height: 24, borderRadius: const BorderRadius.all(Radius.circular(12))),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                SkeletonLoader(width: 48, height: 48, borderRadius: const BorderRadius.all(Radius.circular(24))),
                const SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SkeletonLoader(width: 150, height: 16, borderRadius: const BorderRadius.all(Radius.circular(4))),
                    const SizedBox(height: 8),
                    SkeletonLoader(width: 80, height: 14, borderRadius: const BorderRadius.all(Radius.circular(4))),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
