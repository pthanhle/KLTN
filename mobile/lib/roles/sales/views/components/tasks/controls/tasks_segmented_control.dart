import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../core/utils/theme_extension.dart';
import '../../../../controllers/sales_tasks_controller.dart';

class TasksSegmentedControl extends ConsumerStatefulWidget {
  const TasksSegmentedControl({super.key});

  @override
  ConsumerState<TasksSegmentedControl> createState() => _TasksSegmentedControlState();
}

class _TasksSegmentedControlState extends ConsumerState<TasksSegmentedControl> {
  int? _pressedIndex;

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(salesTasksControllerProvider);
    final currentIndex = state.currentTab.index;

    final tabs = [
      tr('Chờ thực hiện', context: context),
      tr('Đang xử lý', context: context),
      tr('Hoàn thành', context: context),
    ];

    return ClipPath(
      clipper: ShapeBorderClipper(
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 22,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
        child: Container(
          height: 44,
          decoration: ShapeDecoration(
            color: context.colors.surface.withValues(alpha: 0.15), // Giảm alpha để trong suốt hơn
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 22,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: context.colors.surface.withValues(alpha: 0.3), // Specular highlight (Viền sáng bóng mỏng nhẹ)
                width: 0.5,
              ),
            ),
          ),
          padding: const EdgeInsets.all(4),
          child: LayoutBuilder(
            builder: (context, constraints) {
              final tabWidth = constraints.maxWidth / tabs.length;
              
              return Stack(
                children: [
                  // Liquid Thumb
                  AnimatedPositioned(
                    duration: const Duration(milliseconds: 400),
                    curve: Curves.fastLinearToSlowEaseIn, // Apple standard curve
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
                      child: Container(
                        decoration: ShapeDecoration(
                          color: context.colors.surface.withValues(alpha: 0.55),
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                              cornerRadius: 18,
                              cornerSmoothing: 1.0,
                            ),
                            side: BorderSide(
                              color: context.colors.surface.withValues(alpha: 0.4), // Highlight bắt sáng ở viền
                              width: 0.5,
                            ),
                          ),
                          shadows: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.02),
                              blurRadius: 30,
                              offset: const Offset(0, 10),
                            ),
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  // Text and Interactions
                  Row(
                    children: List.generate(tabs.length, (index) {
                      final isSelected = index == currentIndex;
                      return Expanded(
                        child: GestureDetector(
                          onTapDown: (_) {
                             setState(() => _pressedIndex = index);
                          },
                          onTapUp: (_) {
                             setState(() => _pressedIndex = null);
                             if (index != currentIndex) {
                               HapticFeedback.selectionClick(); // Apple standard haptic
                               ref.read(salesTasksControllerProvider.notifier).changeTab(index);
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
                              style: context.textTheme.labelLarge!.copyWith(
                                color: isSelected
                                    ? context.colors.onSurface
                                    : context.colors.onSurfaceVariant.withValues(alpha: 0.8),
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
    );
  }
}