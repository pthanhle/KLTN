import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'task_card/task_card_top_bar.dart';
import 'task_card/task_card_body.dart';
import 'task_card/task_card_customer.dart';
import 'task_card/task_card_footer.dart';
import 'task_card/task_action_button.dart';
import 'task_card/controllers/task_card_controller.dart';

class TaskCard extends ConsumerStatefulWidget {
  final TaskModel task;

  const TaskCard({
    super.key,
    required this.task,
  });

  @override
  ConsumerState<TaskCard> createState() => _TaskCardState();
}

class _TaskCardState extends ConsumerState<TaskCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final bool isUrgent = widget.task.priority.toUpperCase() == 'URGENT';
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return GestureDetector(
        onTapDown: (_) {
          HapticFeedback.selectionClick();
          setState(() => _isPressed = true);
        },
        onTapUp: (_) {
          HapticFeedback.lightImpact();
          setState(() => _isPressed = false);
          ref.read(taskCardControllerProvider.notifier).openTaskDetail(widget.task.id);
        },
        onTapCancel: () {
          setState(() => _isPressed = false);
        },
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: ShapeDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                context.colors.surface.withValues(alpha: isDark ? 0.35 : 0.8),
                context.colors.surface.withValues(alpha: isDark ? 0.15 : 0.45),
              ],
            ),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 32,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: isDark 
                  ? Colors.white.withValues(alpha: 0.15) 
                  : Colors.white.withValues(alpha: 0.7),
                width: 0.5, 
              ),
            ),
            shadows: isDark ? [] : [
              BoxShadow(
                color: context.colors.primary.withValues(alpha: 0.04),
                blurRadius: 24,
                spreadRadius: 0,
                offset: const Offset(0, 8),
              ),
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.02),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Stack(
            children: [
              if (isUrgent)
                Positioned(
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  child: Container(
                    decoration: BoxDecoration(
                      color: context.colors.error.withValues(alpha: 0.8),
                      boxShadow: [
                        BoxShadow(
                          color: context.colors.error.withValues(alpha: 0.5),
                          blurRadius: 8,
                        )
                      ],
                    ),
                  ),
                ),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TaskCardTopBar(task: widget.task),
                    const SizedBox(height: 16),
                    TaskCardBody(task: widget.task),
                    const SizedBox(height: 16),
                    TaskCardCustomer(task: widget.task),
                    const SizedBox(height: 16),
                    Container(
                      height: 0.5, 
                      color: context.colors.outlineVariant.withValues(alpha: 0.3)
                    ),
                    const SizedBox(height: 16),
                    TaskCardFooter(task: widget.task),
                    if (widget.task.status != 'done' && widget.task.status != 'post_drive') ...[
                      const SizedBox(height: 20),
                      TaskActionButton(task: widget.task),
                    ],
                  ],
                ),
              ),
            ],
          )),
          ),
        ).animate(target: _isPressed ? 1 : 0)
         .scaleXY(end: 0.95, duration: 150.ms, curve: Curves.easeOutCubic),
      );
  }
}
