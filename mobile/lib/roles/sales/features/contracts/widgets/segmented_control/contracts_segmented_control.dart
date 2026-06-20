import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../constants/contract_status_constants.dart';
import '../../controllers/contracts_provider.dart';

class ContractsSegmentedControl extends ConsumerWidget {
  const ContractsSegmentedControl({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(contractsProvider);
    final notifier = ref.read(contractsProvider.notifier);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final filters = ContractStatusConstants.filters;

    final labels = {
      'all': 'Tất cả'.tr(),
      'draft': 'Nháp'.tr(),
      'issued': 'Khách chờ'.tr(),
      'signed': 'Đã ký'.tr(),
      'cancelled': 'Đã hủy'.tr(),
    };

    final currentIndex = filters.indexOf(state.statusFilter).clamp(0, filters.length - 1);

    const double trackHeight = 44.0;
    const double trackPadding = 4.0;

    return LayoutBuilder(
      builder: (context, constraints) {
        final double tabWidth =
            (constraints.maxWidth - trackPadding * 2) / filters.length;

        return SizedBox(
          height: trackHeight,
          child: Stack(
            children: [
              // Track
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

              // Liquid Glass Thumb
              AnimatedPositioned(
                duration: const Duration(milliseconds: 360),
                curve: Curves.fastLinearToSlowEaseIn,
                left: trackPadding + currentIndex * tabWidth,
                top: trackPadding,
                height: trackHeight - trackPadding * 2,
                width: tabWidth - trackPadding,
                child: _LiquidGlassThumb(
                  isDark: isDark,
                  thumbWidth: tabWidth - trackPadding,
                  thumbHeight: trackHeight - trackPadding * 2,
                ),
              ),

              // Labels (on top to receive touch)
              Positioned(
                top: 0,
                left: trackPadding,
                right: trackPadding,
                height: trackHeight,
                child: Row(
                  children: List.generate(filters.length, (index) {
                    final isSelected = index == currentIndex;
                    return Expanded(
                      child: GestureDetector(
                        onTap: () {
                          if (index != currentIndex) {
                            HapticFeedback.selectionClick();
                            notifier.setFilter(filters[index]);
                          }
                        },
                        behavior: HitTestBehavior.opaque,
                        child: Center(
                          child: AnimatedDefaultTextStyle(
                            duration: const Duration(milliseconds: 220),
                            curve: Curves.easeOutCubic,
                            style: TextStyle(
                              fontFamily: Theme.of(context)
                                  .textTheme
                                  .bodyMedium
                                  ?.fontFamily,
                              fontSize: 11,
                              fontWeight: isSelected
                                  ? FontWeight.w700
                                  : FontWeight.w500,
                              letterSpacing: 0.1,
                              color: isSelected
                                  ? (isDark
                                      ? Colors.white
                                      : Theme.of(context).colorScheme.onSurface)
                                  : (isDark
                                      ? Colors.white.withValues(alpha: 0.45)
                                      : Colors.black.withValues(alpha: 0.40)),
                            ),
                            child: Text(
                              labels[filters[index]] ?? filters[index],
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
    const scale = 1.06;
    final m = Matrix4.identity()
      ..translate(thumbWidth / 2, thumbHeight / 2)
      ..scale(scale, scale)
      ..translate(-thumbWidth / 2, -thumbHeight / 2);

    return ImageFilter.compose(
      outer: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
      inner: ImageFilter.matrix(m.storage, filterQuality: FilterQuality.high),
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
                    colors: [
                      Colors.white.withValues(alpha: isDark ? 0.28 : 0.55),
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
