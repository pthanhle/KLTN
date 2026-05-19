import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/sales/features/checkin/checkin_bottom_sheet.dart';
import 'package:ttauto_staff/roles/sales/features/post_drive/post_drive_bottom_sheet.dart';
import 'package:ttauto_staff/roles/sales/features/cancel_booking/cancel_booking_bottom_sheet.dart';

class TaskActionButton extends ConsumerStatefulWidget {
  final TaskModel task;

  const TaskActionButton({
    super.key,
    required this.task,
  });

  @override
  ConsumerState<TaskActionButton> createState() => _TaskActionButtonState();
}

class _TaskActionButtonState extends ConsumerState<TaskActionButton> {
  bool _isMainPressed = false;
  bool _isCancelPressed = false;

  @override
  Widget build(BuildContext context) {
    final status = widget.task.status ?? 'todo';
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final Color appleBlue   = isDark ? const Color(0xFF0A84FF) : const Color(0xFF007AFF);
    final Color appleGreen  = isDark ? const Color(0xFF32D74B) : const Color(0xFF34C759);
    final Color appleOrange = isDark ? const Color(0xFFFF9F0A) : const Color(0xFFFF9500);

    String textKey = 'Xác nhận Lịch';
    IconData icon  = CupertinoIcons.calendar_badge_plus;
    Color  bgColor = appleBlue;
    bool   isFilled = false;

    if (status == 'todo') {
      textKey  = 'Xác nhận Lịch';
      icon     = CupertinoIcons.calendar_badge_plus;
      isFilled = false;
      bgColor  = appleBlue;
    } else if (status == 'confirmed') {
      textKey  = 'Khách đã đến / Check-in';
      icon     = CupertinoIcons.person_badge_plus;
      isFilled = true;
      bgColor  = appleBlue;
    } else if (status == 'customer_arrived') {
      textKey  = 'Bắt đầu chạy';
      icon     = CupertinoIcons.play_circle_fill;
      isFilled = true;
      bgColor  = appleGreen;
    } else if (status == 'in_progress') {
      textKey  = 'Kết thúc lái thử';
      icon     = CupertinoIcons.stop_circle_fill;
      isFilled = true;
      bgColor  = appleOrange;
    } else {
      return const SizedBox.shrink();
    }

    Widget mainButton = GestureDetector(
      onTapDown: (_) => setState(() => _isMainPressed = true),
      onTapUp: (_) {
        setState(() => _isMainPressed = false);
        HapticFeedback.mediumImpact();
        _handleAction(context, ref, status);
      },
      onTapCancel: () => setState(() => _isMainPressed = false),
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: double.infinity,
        decoration: ShapeDecoration(
          color: isFilled
              ? bgColor.withValues(alpha: 0.88)
              : bgColor.withValues(alpha: isDark ? 0.15 : 0.10),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isFilled
                  ? Colors.white.withValues(alpha: 0.55)  
                  : bgColor.withValues(alpha: isDark ? 0.5 : 0.4),
              width: isFilled ? 1.0 : 0.5,
            ),
          ),
          shadows: isFilled
              ? [
                  BoxShadow(
                    color: bgColor.withValues(alpha: isDark ? 0.35 : 0.28),
                    blurRadius: 16,
                    offset: const Offset(0, 5),
                  ),
                  BoxShadow(
                    color: bgColor.withValues(alpha: isDark ? 0.15 : 0.10),
                    blurRadius: 4,
                    offset: const Offset(0, 1),
                  ),
                ]
              : [],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 14),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    icon,
                    color: isFilled ? Colors.white : bgColor,
                    size: 18,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    tr(textKey),
                    style: theme.textTheme.titleSmall?.copyWith(
                      color: isFilled ? Colors.white : bgColor,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.2,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    ).animate(target: _isMainPressed ? 1 : 0)
     .scaleXY(end: 0.94, duration: 150.ms, curve: Curves.easeOutCubic);

    if (status == 'todo' || status == 'confirmed') {
      Widget cancelButton = GestureDetector(
        onTapDown: (_) => setState(() => _isCancelPressed = true),
        onTapUp: (_) {
          setState(() => _isCancelPressed = false);
          HapticFeedback.selectionClick();
          _showCancelBottomSheet(context, ref);
        },
        onTapCancel: () => setState(() => _isCancelPressed = false),
        behavior: HitTestBehavior.opaque,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 20),
          decoration: ShapeDecoration(
            // Nút Hủy: Tinted Glass đỏ — giữ đúng chuẩn iOS 26 cancel style
            color: theme.colorScheme.error.withValues(alpha: isDark ? 0.15 : 0.08),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
              side: BorderSide(
                color: theme.colorScheme.error.withValues(alpha: isDark ? 0.4 : 0.3),
                width: 0.5,
              ),
            ),
          ),
          alignment: Alignment.center,
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
              child: Text(
                tr('Hủy'),
                style: theme.textTheme.titleSmall?.copyWith(
                  color: theme.colorScheme.error,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.2,
                ),
              ),
            ),
          ),
        ),
      ).animate(target: _isCancelPressed ? 1 : 0)
       .scaleXY(end: 0.94, duration: 150.ms, curve: Curves.easeOutCubic);

      return Row(
        children: [
          cancelButton,
          const SizedBox(width: 12),
          Expanded(child: mainButton),
        ],
      );
    }

    return mainButton;
  }

  void _showCancelBottomSheet(BuildContext context, WidgetRef ref) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => CancelBookingBottomSheet(
        task: widget.task,
        onComplete: () {
          ref.read(salesTasksControllerProvider.notifier)
              .updateTaskStatus(widget.task.id, 'cancelled');
        },
      ),
    );
  }

  void _handleAction(BuildContext context, WidgetRef ref, String status) {
    final controller = ref.read(salesTasksControllerProvider.notifier);

    if (status == 'todo') {
      controller.updateTaskStatus(widget.task.id, 'confirmed');
    } else if (status == 'confirmed') {
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        useRootNavigator: true,
        backgroundColor: Colors.transparent,
        builder: (ctx) => CheckInBottomSheet(
          task: widget.task,
          onComplete: () => controller.updateTaskStatus(widget.task.id, 'customer_arrived'),
        ),
      );
    } else if (status == 'customer_arrived') {
      controller.updateTaskStatus(widget.task.id, 'in_progress');
    } else if (status == 'in_progress') {
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        useRootNavigator: true,
        backgroundColor: Colors.transparent,
        builder: (ctx) => PostDriveBottomSheet(
          task: widget.task,
          onComplete: () => controller.updateTaskStatus(widget.task.id, 'post_drive'),
        ),
      );
    }
  }
}
