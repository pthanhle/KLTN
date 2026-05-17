import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../auth/models/task_model.dart';
import '../../../../../controllers/sales_tasks_controller.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../bottom_sheets/checkin/checkin_bottom_sheet.dart';
import '../../bottom_sheets/post_drive/post_drive_bottom_sheet.dart';
import '../../bottom_sheets/cancel_booking/cancel_booking_bottom_sheet.dart';


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
    
    // Apple System Colors
    final Color appleBlue = isDark ? const Color(0xFF0A84FF) : const Color(0xFF007AFF);
    final Color appleGreen = isDark ? const Color(0xFF32D74B) : const Color(0xFF34C759);
    final Color appleOrange = isDark ? const Color(0xFFFF9F0A) : const Color(0xFFFF9500);
    final Color secondaryBg = isDark ? const Color(0xFF2C2C2E) : const Color(0xFFF2F2F7);

    String textKey = 'Xác nhận Lịch';
    IconData icon = Icons.event_available_rounded;
    Color bgColor = secondaryBg;
    Color fgColor = appleBlue;
    bool isFilled = false;

    if (status == 'todo') {
      textKey = 'Xác nhận Lịch';
      icon = Icons.event_available_rounded;
      isFilled = false; // Secondary button style
      bgColor = secondaryBg;
      fgColor = appleBlue;
    } else if (status == 'confirmed') {
      textKey = 'Khách đã đến / Check-in';
      icon = Icons.how_to_reg_rounded;
      isFilled = true;
      bgColor = appleBlue;
      fgColor = Colors.white;
    } else if (status == 'customer_arrived') {
      textKey = 'Bắt đầu chạy';
      icon = Icons.play_circle_fill_rounded;
      isFilled = true;
      bgColor = appleGreen;
      fgColor = Colors.white;
    } else if (status == 'in_progress') {
      textKey = 'Kết thúc lái thử';
      icon = Icons.stop_circle_rounded;
      isFilled = true;
      bgColor = appleOrange;
      fgColor = Colors.white;
    } else {
      // Done / Post Drive -> usually don't show action button or disabled
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
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: ShapeDecoration(
          color: isFilled 
              ? bgColor
              : bgColor.withValues(alpha: 0.15),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isFilled 
                  ? Colors.white.withValues(alpha: 0.2) 
                  : bgColor.withValues(alpha: 0.3),
              width: 0.5,
            ),
          ),
          shadows: isFilled && !isDark ? [
            BoxShadow(
              color: bgColor.withValues(alpha: 0.3),
              blurRadius: 12,
              offset: const Offset(0, 4),
            )
          ] : [],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: fgColor, size: 20),
            const SizedBox(width: 8),
            Text(
              tr(textKey),
              style: theme.textTheme.titleSmall?.copyWith(
                color: fgColor,
                fontWeight: FontWeight.w600,
                letterSpacing: -0.2,
              ),
            ),
          ],
        ),
      ),
    ).animate(target: _isMainPressed ? 1 : 0)
     .scaleXY(end: 0.94, duration: 200.ms, curve: Curves.easeOutCubic);

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
            color: isDark 
                ? theme.colorScheme.surface.withValues(alpha: 0.4) 
                : theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5), // Nền xám mờ chuẩn Apple
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            ),
          ),
          alignment: Alignment.center,
          child: Text(
            tr('Hủy'),
            style: theme.textTheme.titleSmall?.copyWith(
              color: theme.colorScheme.error,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.2,
            ),
          ),
        ),
      ).animate(target: _isCancelPressed ? 1 : 0)
       .scaleXY(end: 0.94, duration: 200.ms, curve: Curves.easeOutCubic);

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
          final controller = ref.read(salesTasksControllerProvider.notifier);
          controller.updateTaskStatus(widget.task.id, 'cancelled');
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
          onComplete: () {
            controller.updateTaskStatus(widget.task.id, 'customer_arrived');
          },
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
          onComplete: () {
            controller.updateTaskStatus(widget.task.id, 'post_drive');
          },
        ),
      );
    }
  }
}
