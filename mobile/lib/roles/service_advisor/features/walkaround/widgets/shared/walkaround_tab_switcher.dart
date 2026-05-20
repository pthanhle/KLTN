import 'dart:ui';
import 'dart:typed_data';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class WalkaroundTabSwitcher extends StatelessWidget {
  final int currentStep;
  final Function(int) onStepChanged;

  const WalkaroundTabSwitcher({
    super.key,
    required this.currentStep,
    required this.onStepChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final tabs = ['Khách Hàng', 'Trạng Thái', 'Ngoại Quan', 'Xác Nhận'];

    const double trackHeight = 44.0;
    const double trackPadding = 4.0;

    return LayoutBuilder(
      builder: (context, constraints) {
        final double tabWidth =
            (constraints.maxWidth - trackPadding * 2) / tabs.length;

        return SizedBox(
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
                      // Track chỉ blur đơn thuần — content phía sau mờ nhẹ
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: const SizedBox.expand(),
                    ),
                  ),
                ),
              ),

              AnimatedPositioned(
                duration: const Duration(milliseconds: 360),
                curve: Curves.fastLinearToSlowEaseIn,
                left: trackPadding + currentStep * tabWidth,
                top: trackPadding,
                height: trackHeight - trackPadding * 2,
                width: tabWidth - trackPadding,
                child: _LiquidGlassThumb(
                  isDark: isDark,
                  thumbWidth: tabWidth - trackPadding,
                  thumbHeight: trackHeight - trackPadding * 2,
                ),
              ),

              Positioned(
                top: 0,
                left: trackPadding,
                right: trackPadding,
                height: trackHeight,
                child: Row(
                  children: List.generate(tabs.length, (index) {
                    final isSelected = currentStep == index;
                    return Expanded(
                      child: GestureDetector(
                        behavior: HitTestBehavior.opaque,
                        onTap: () {
                          if (currentStep != index) {
                            HapticFeedback.selectionClick();
                            onStepChanged(index);
                          }
                        },
                        child: Center(
                          child: AnimatedDefaultTextStyle(
                            duration: const Duration(milliseconds: 220),
                            curve: Curves.easeOutCubic,
                            style: TextStyle(
                              fontFamily:
                                  theme.textTheme.bodyMedium?.fontFamily,
                              fontSize: 11.5,
                              fontWeight: isSelected
                                  ? FontWeight.w700
                                  : FontWeight.w500,
                              letterSpacing: 0.1,
                              color: isSelected
                                  ? (isDark
                                      ? Colors.white
                                      : theme.colorScheme.onSurface)
                                  : (isDark
                                      ? Colors.white.withValues(alpha: 0.45)
                                      : Colors.black.withValues(alpha: 0.40)),
                            ),
                            child: Text(
                              tabs[index].tr(),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
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

class _LiquidGlassThumb extends StatelessWidget {
  final bool isDark;
  final double thumbWidth;
  final double thumbHeight;

  const _LiquidGlassThumb({
    required this.isDark,
    required this.thumbWidth,
    required this.thumbHeight,
  });

  ImageFilter _buildLensFilter() {
    final cx = thumbWidth / 2;
    final cy = thumbHeight / 2;
    const scale = 1.06;

    final m = Matrix4.identity()
      ..translate(cx, cy)
      ..scale(scale, scale)
      ..translate(-cx, -cy);

    return ImageFilter.compose(
      outer: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
      inner: ImageFilter.matrix(
        m.storage,
        filterQuality: FilterQuality.high,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    const cornerRadius = 18.0;

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.14)
            : Colors.white.withValues(alpha: 0.72),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: cornerRadius,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.45 : 0.90),
            width: 1.0,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.30 : 0.10),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.12 : 0.04),
            blurRadius: 3,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: cornerRadius,
          cornerSmoothing: 1.0,
        ),
        child: Stack(
          children: [
            Positioned.fill(
              child: BackdropFilter(
                filter: _buildLensFilter(),
                child: const SizedBox.expand(),
              ),
            ),

            Positioned(
              top: 0,
              left: 0,
              right: 0,
              height: thumbHeight * 0.42,
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    stops: const [0.0, 0.5, 1.0],
                    colors: [
                      Colors.white.withValues(alpha: isDark ? 0.28 : 0.55),
                      Colors.white.withValues(alpha: isDark ? 0.08 : 0.18),
                      Colors.white.withValues(alpha: 0.0),
                    ],
                  ),
                ),
              ),
            ),

            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              height: thumbHeight * 0.25,
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    colors: [
                      Colors.white.withValues(alpha: isDark ? 0.08 : 0.15),
                      Colors.white.withValues(alpha: 0.0),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
