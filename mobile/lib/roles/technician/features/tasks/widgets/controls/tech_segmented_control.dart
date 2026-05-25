import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class TechSegmentedControl extends StatelessWidget {
  final int currentIndex;
  final List<String> tabs;
  final ValueChanged<int> onChanged;

  const TechSegmentedControl({
    super.key,
    required this.currentIndex,
    required this.tabs,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    const double trackHeight = 44.0;
    const double trackPadding = 4.0;

    return LayoutBuilder(
      builder: (context, constraints) {
        final double trackWidth = constraints.maxWidth;
        final double tabWidth = (trackWidth - trackPadding * 2) / tabs.length;

        return SizedBox(
          width: trackWidth,
          height: trackHeight,
          child: Stack(
            children: [
              Positioned.fill(
                child: Container(
                  decoration: ShapeDecoration(
                    color: isDark
                        ? Colors.black.withValues(alpha: 0.40)
                        : Colors.black.withValues(alpha: 0.10),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: trackHeight / 2,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: 0.12),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                      cornerRadius: trackHeight / 2,
                      cornerSmoothing: 1.0,
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: const SizedBox.expand(),
                    ),
                  ),
                ),
              ),
              AnimatedPositioned(
                duration: 360.ms,
                curve: Curves.fastLinearToSlowEaseIn,
                left: trackPadding + currentIndex * tabWidth,
                top: trackPadding,
                height: trackHeight - trackPadding * 2,
                width: tabWidth,
                child: Container(
                  decoration: ShapeDecoration(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.14)
                        : Colors.white.withValues(alpha: 0.72),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 18.0,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: isDark ? 0.45 : 0.90),
                        width: 1.0,
                      ),
                    ),
                    shadows: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.08),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned.fill(
                child: Row(
                  children: List.generate(tabs.length, (index) {
                    final isSelected = currentIndex == index;
                    final theme = Theme.of(context);
                    return GestureDetector(
                      onTap: () => onChanged(index),
                      behavior: HitTestBehavior.opaque,
                      child: SizedBox(
                        width: tabWidth,
                        child: Center(
                          child: Text(
                            tabs[index],
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                              color: isSelected
                                  ? (isDark
                                      ? Colors.white.withValues(alpha: 0.90)
                                      : Colors.black.withValues(alpha: 0.80))
                                  : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.60),
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
