import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class JobSegmentedControl extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onValueChanged;
  final bool isDark;

  const JobSegmentedControl({
    super.key,
    required this.selectedIndex,
    required this.onValueChanged,
    required this.isDark,
  });

  static const double _trackHeight = 44.0;
  static const double _trackPadding = 4.0;
  static const double _thumbCornerRadius = 18.0;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final tabWidth = constraints.maxWidth / 2;
        final thumbWidth = tabWidth - _trackPadding;
        final thumbHeight = _trackHeight - _trackPadding * 2;

        return SizedBox(
          height: _trackHeight,
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
                        cornerRadius: _trackHeight / 2,
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
                      cornerRadius: _trackHeight / 2,
                      cornerSmoothing: 1.0,
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: const SizedBox.expand(),
                    ),
                  ),
                ),
              ),

              // ② AnimatedPositioned Thumb — Liquid Glass (§15)
              AnimatedPositioned(
                duration: const Duration(milliseconds: 360),
                curve: Curves.fastLinearToSlowEaseIn,
                left: _trackPadding + selectedIndex * tabWidth,
                top: _trackPadding,
                width: thumbWidth,
                height: thumbHeight,
                child: Container(
                  decoration: ShapeDecoration(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.14)
                        : Colors.white.withValues(alpha: 0.72),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: _thumbCornerRadius,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: isDark ? 0.45 : 0.90),
                        width: 1.0,
                      ),
                    ),
                    shadows: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: isDark ? 0.15 : 0.06),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                      cornerRadius: _thumbCornerRadius,
                      cornerSmoothing: 1.0,
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
                      child: const SizedBox.expand(),
                    ),
                  ),
                ),
              ),

              Positioned.fill(
                child: Row(
                  children: [
                    _SegmentLabel(
                      label: 'Hạng Mục Thi Công'.tr(),
                      isSelected: selectedIndex == 0,
                      isDark: isDark,
                      onTap: () {
                        HapticFeedback.selectionClick();
                        onValueChanged(0);
                      },
                    ),
                    _SegmentLabel(
                      label: 'Phụ Tùng'.tr(),
                      isSelected: selectedIndex == 1,
                      isDark: isDark,
                      onTap: () {
                        HapticFeedback.selectionClick();
                        onValueChanged(1);
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _SegmentLabel extends StatelessWidget {
  final String label;
  final bool isSelected;
  final bool isDark;
  final VoidCallback onTap;

  const _SegmentLabel({
    required this.label,
    required this.isSelected,
    required this.isDark,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              color: isSelected
                  ? (isDark ? Colors.white : Colors.black.withValues(alpha: 0.85))
                  : (isDark
                      ? Colors.white.withValues(alpha: 0.45)
                      : Colors.black.withValues(alpha: 0.40)),
              letterSpacing: -0.2,
            ),
          ),
        ),
      ),
    );
  }
}
