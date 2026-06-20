import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class ContractSkeleton extends StatelessWidget {
  const ContractSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Shimmer.fromColors(
              baseColor: isDark ? Colors.white24 : Colors.black12,
              highlightColor: isDark ? Colors.white38 : Colors.black26,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(width: 120, height: 20, color: Colors.white),
                      Container(
                        width: 60,
                        height: 24,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Container(width: 16, height: 16, color: Colors.white),
                      const SizedBox(width: 8),
                      Container(width: 150, height: 16, color: Colors.white),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Container(width: 16, height: 16, color: Colors.white),
                      const SizedBox(width: 8),
                      Container(width: 200, height: 14, color: Colors.white),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 12.0),
                    child: Divider(height: 1, thickness: 0.5),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(width: 80, height: 14, color: Colors.white),
                      Container(width: 100, height: 20, color: Colors.white),
                    ],
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
