import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';

class OrdersSegmentedControl extends StatefulWidget {
  final OrderStatus selectedTab;
  final ValueChanged<OrderStatus> onTabChanged;

  const OrdersSegmentedControl({
    super.key,
    required this.selectedTab,
    required this.onTabChanged,
  });

  @override
  State<OrdersSegmentedControl> createState() => _OrdersSegmentedControlState();
}

class _OrdersSegmentedControlState extends State<OrdersSegmentedControl> {
  int? _pressedIndex;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final currentIndex = widget.selectedTab == OrderStatus.pendingPick ? 0 : 1;

    final tabs = [
      'Chờ nhặt hàng'.tr(),
      'Chờ giao'.tr(),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 8.0),
      child: Container(
        height: 44,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.10)
              : Colors.black.withValues(alpha: 0.06),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 22,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.15)
                  : Colors.white.withValues(alpha: 0.8), 
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.08),
              blurRadius: 12,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 22,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.all(4),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final tabWidth = constraints.maxWidth / tabs.length;
                  
                  return Stack(
                    children: [
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 400),
                        curve: Curves.fastLinearToSlowEaseIn,
                        left: tabWidth * currentIndex,
                        width: tabWidth,
                        top: 0,
                        bottom: 0,
                        child: TweenAnimationBuilder<double>(
                          tween: Tween<double>(
                            begin: 1.0, 
                            end: _pressedIndex == currentIndex ? 0.94 : 1.0
                          ),
                          duration: const Duration(milliseconds: 150),
                          curve: Curves.easeOutCubic,
                          builder: (context, scale, child) {
                            return Transform.scale(
                              scale: scale,
                              child: child,
                            );
                          },
                          child: Padding(
                            padding: const EdgeInsets.all(2),
                            child: Container(
                              decoration: ShapeDecoration(
                                color: isDark
                                    ? Colors.white.withValues(alpha: 0.85)
                                    : Colors.white,
                                shape: SmoothRectangleBorder(
                                  borderRadius: SmoothBorderRadius(
                                    cornerRadius: 16,
                                    cornerSmoothing: 1.0,
                                  ),
                                  side: BorderSide(
                                    color: Colors.white.withValues(alpha: isDark ? 0.3 : 0.9),
                                    width: 0.5,
                                  ),
                                ),
                                shadows: [
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: isDark ? 0.4 : 0.10),
                                    blurRadius: 16,
                                    offset: const Offset(0, 4),
                                  ),
                                  BoxShadow(
                                    color: Colors.black.withValues(alpha: isDark ? 0.25 : 0.06),
                                    blurRadius: 4,
                                    offset: const Offset(0, 1),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                      Row(
                        children: List.generate(tabs.length, (index) {
                          final isSelected = index == currentIndex;
                          final status = index == 0 ? OrderStatus.pendingPick : OrderStatus.pendingDelivery;
                          
                          return Expanded(
                            child: GestureDetector(
                              onTapDown: (_) {
                                 setState(() => _pressedIndex = index);
                              },
                              onTapUp: (_) {
                                 setState(() => _pressedIndex = null);
                                 if (index != currentIndex) {
                                   HapticFeedback.selectionClick();
                                   widget.onTabChanged(status);
                                 }
                              },
                              onTapCancel: () {
                                 setState(() => _pressedIndex = null);
                              },
                              behavior: HitTestBehavior.opaque,
                              child: Center(
                                child: AnimatedDefaultTextStyle(
                                  duration: const Duration(milliseconds: 200),
                                  curve: Curves.easeOut,
                                  style: theme.textTheme.labelLarge!.copyWith(
                                    color: isSelected
                                        ? (isDark
                                            ? Colors.black.withValues(alpha: 0.85)
                                            : theme.colorScheme.onSurface)
                                        : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
                                    fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                                    letterSpacing: -0.2,
                                  ),
                                  child: Text(
                                    tabs[index],
                                    textAlign: TextAlign.center,
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                      ),
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
