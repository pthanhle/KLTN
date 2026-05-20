import 'package:flutter/material.dart';
import '../../../../../../shared/widgets/loaders/skeleton_loader.dart';

class SupplementSkeleton extends StatelessWidget {
  const SupplementSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SkeletonLoader(width: double.infinity, height: 100, borderRadius: BorderRadius.circular(28)),
          const SizedBox(height: 24),
          SkeletonLoader(width: double.infinity, height: 300, borderRadius: BorderRadius.circular(28)),
          const SizedBox(height: 24),
          SkeletonLoader(width: double.infinity, height: 120, borderRadius: BorderRadius.circular(28)),
          const SizedBox(height: 24),
          SkeletonLoader(width: double.infinity, height: 150, borderRadius: BorderRadius.circular(28)),
        ],
      ),
    );
  }
}
