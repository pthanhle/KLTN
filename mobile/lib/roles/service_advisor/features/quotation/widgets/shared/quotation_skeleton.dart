import 'package:flutter/material.dart';
import '../../../../../../shared/widgets/loaders/skeleton_loader.dart';

class QuotationSkeleton extends StatelessWidget {
  const QuotationSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SkeletonLoader(width: 150, height: 28, borderRadius: BorderRadius.circular(8)),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(28),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SkeletonLoader(width: 200, height: 24, borderRadius: BorderRadius.circular(4)),
                          const SizedBox(height: 8),
                          SkeletonLoader(width: 150, height: 16, borderRadius: BorderRadius.circular(4)),
                          const SizedBox(height: 4),
                          SkeletonLoader(width: 100, height: 16, borderRadius: BorderRadius.circular(4)),
                        ],
                      ),
                    ),
                    const SizedBox(width: 16),
                    SkeletonLoader(width: 64, height: 64, borderRadius: BorderRadius.circular(8)),
                  ],
                ),
                const SizedBox(height: 16),
                SkeletonLoader(width: double.infinity, height: 60, borderRadius: BorderRadius.circular(8)),
              ],
            ),
          ),
          const SizedBox(height: 32),
          SkeletonLoader(width: 150, height: 28, borderRadius: BorderRadius.circular(8)),
          const SizedBox(height: 16),
          SkeletonLoader(width: double.infinity, height: 100, borderRadius: BorderRadius.circular(28)),
          const SizedBox(height: 12),
          SkeletonLoader(width: double.infinity, height: 80, borderRadius: BorderRadius.circular(28)),
        ],
      ),
    );
  }
}
