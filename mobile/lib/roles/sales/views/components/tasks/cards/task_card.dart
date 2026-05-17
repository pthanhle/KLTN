import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../../../core/utils/theme_extension.dart';
import '../../../../../auth/models/task_model.dart';
import 'task_card/task_card_top_bar.dart';
import 'task_card/task_card_body.dart';
import 'task_card/task_card_customer.dart';
import 'task_card/task_card_footer.dart';
import 'task_card/task_action_button.dart';

class TaskCard extends StatefulWidget {
  final TaskModel task;

  const TaskCard({
    super.key,
    required this.task,
  });

  @override
  State<TaskCard> createState() => _TaskCardState();
}

class _TaskCardState extends State<TaskCard> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final bool isUrgent = widget.task.priority.toUpperCase() == 'URGENT';
    
    return GestureDetector(
        onTapDown: (_) {
          HapticFeedback.selectionClick();
          setState(() => _isPressed = true);
        },
        onTapUp: (_) {
          HapticFeedback.lightImpact();
          setState(() => _isPressed = false);
          // TODO: Navigate to detail
        },
        onTapCancel: () {
          setState(() => _isPressed = false);
        },
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          decoration: ShapeDecoration(
            color: context.colors.surface.withValues(alpha: 0.65),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 28,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withOpacity(0.35),
                width: 1.2,
              ),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withOpacity(0.08),
                blurRadius: 32,
                offset: const Offset(0, 16),
              ),
              BoxShadow(
                color: Colors.black.withOpacity(0.04),
                blurRadius: 8,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          clipBehavior: Clip.antiAlias,
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
            child: Stack(
            children: [
              if (isUrgent)
                Positioned(
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  child: Container(color: context.colors.error),
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
                    Divider(
                      height: 1, 
                      color: context.colors.outlineVariant.withValues(alpha: 0.3)
                    ),
                    const SizedBox(height: 12),
                    TaskCardFooter(task: widget.task),
                    if (widget.task.status != 'done' && widget.task.status != 'post_drive') ...[
                      const SizedBox(height: 16),
                      TaskActionButton(task: widget.task),
                    ],
                  ],
                ),
              ),
            ],
          )),
        ).animate(target: _isPressed ? 1 : 0)
         .scaleXY(end: 0.94, duration: 120.ms, curve: Curves.easeOutCubic),
      );
  }
}
