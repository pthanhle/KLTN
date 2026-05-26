import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:shimmer/shimmer.dart';
import '../../../../constants/supplement_ui_constants.dart';

class SupplementCartSkeleton extends StatelessWidget {
  const SupplementCartSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final baseColor = isDark ? Colors.white24 : Colors.black12;
    final highlightColor = isDark ? Colors.white54 : Colors.black26;

    return Shimmer.fromColors(
      baseColor: baseColor,
      highlightColor: highlightColor,
      child: Column(
        children: List.generate(2, (index) => _buildSkeletonItem(theme)),
      ),
    );
  }

  Widget _buildSkeletonItem(ThemeData theme) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(SupplementUiConstants.innerPadding),
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: SupplementUiConstants.itemRadius,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: ShapeDecoration(
              color: Colors.white,
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 8,
                  cornerSmoothing: 1.0,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(width: 150, height: 16, color: Colors.white),
                const SizedBox(height: 8),
                Container(width: 100, height: 12, color: Colors.white),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(width: 80, height: 24, color: Colors.white),
                    Container(width: 100, height: 20, color: Colors.white),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
