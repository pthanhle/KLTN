import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';

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

    return Container(
      height: 44,
      decoration: ShapeDecoration(
        color: Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 22,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: 0.3),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: Theme.of(context).brightness == Brightness.dark ? 0.2 : 0.05),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 22,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
          child: Padding(
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
                          color: Theme.of(context).brightness == Brightness.dark 
                              ? Colors.white.withValues(alpha: 0.25) 
                              : Colors.white,
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                              cornerRadius: 18,
                              cornerSmoothing: 1.0,
                            ),
                            side: BorderSide(
                              color: Colors.white.withValues(alpha: 0.5),
                              width: 0.5,
                            ),
                          ),
                          shadows: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: Theme.of(context).brightness == Brightness.dark ? 0.3 : 0.1),
                              blurRadius: 20,
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
    ),
  );
  }
}