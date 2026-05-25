import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';

class MpiChecklistSkeleton extends StatefulWidget {
  const MpiChecklistSkeleton({super.key});

  @override
  State<MpiChecklistSkeleton> createState() => _MpiChecklistSkeletonState();
}

class _MpiChecklistSkeletonState extends State<MpiChecklistSkeleton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _opacity;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat(reverse: true);
    _opacity = Tween<double>(begin: 0.3, end: 0.8).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final shimmerColor = isDark
        ? Colors.white.withValues(alpha: 0.06)
        : Colors.black.withValues(alpha: 0.05);

    return FadeTransition(
      opacity: _opacity,
      child: Column(
        children: List.generate(
          4,
          (index) => Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            height: 72,
            decoration: ShapeDecoration(
              color: shimmerColor,
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.06 : 0.20),
                  width: 0.5,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
