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
import 'package:ttauto_staff/roles/sales/features/tasks/utils/sales_tasks_status_utils.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'task_card/task_contract_swipe_action.dart';
import 'package:flutter/cupertino.dart';
import '../../../contract_builder/contract_customer_page.dart';
import '../../../contract_builder/controllers/contract_builder_controller.dart';

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
    
    final canCreateContract = widget.task.status == 'post_drive' || widget.task.status == 'done';

    return Slidable(
      key: ValueKey(widget.task.id),
      enabled: canCreateContract,
      startActionPane: ActionPane(
        motion: const BehindMotion(),
        extentRatio: 0.28,
        children: [
          TaskContractSwipeAction(
            onPressed: () {
              ref.read(contractBuilderControllerProvider.notifier).initializeWithTask(widget.task);
              Navigator.of(context, rootNavigator: true).push(
                CupertinoPageRoute(
                  builder: (context) => const ContractCustomerPage(),
                ),
              );
            },
          ),
        ],
      ),
      child: GestureDetector(
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
              color: SalesTasksStatusUtils.cardBgColor(widget.task.status, isDark),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 32,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: isUrgent 
                    ? context.colors.error.withValues(alpha: 0.5) 
                    : SalesTasksStatusUtils.cardBorderColor(widget.task.status, isDark),
                  width: isUrgent ? 1.0 : 0.5, 
                ),
              ),
              shadows: [
                if (isUrgent)
                  BoxShadow(
                    color: context.colors.error.withValues(alpha: 0.15),
                    blurRadius: 20,
                    spreadRadius: 0,
                    offset: const Offset(0, 4),
                  ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.02),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
              child: Stack(
              children: [
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
          ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.95, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}

