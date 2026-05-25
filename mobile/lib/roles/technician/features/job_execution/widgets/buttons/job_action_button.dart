import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/job_task_model.dart';
import 'package:easy_localization/easy_localization.dart';

class JobActionButton extends StatelessWidget {
  final JobTaskStatus status;
  final VoidCallback onTap;

  const JobActionButton({
    super.key,
    required this.status,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final bool isCompleted = status == JobTaskStatus.completed;
    final bool isInProgress = status == JobTaskStatus.inProgress;
    
    Color bgColor = Theme.of(context).colorScheme.primary;
    String label = 'Bắt đầu'.tr();
    
    if (isCompleted) {
      bgColor = Colors.green.shade600;
      label = 'Đã hoàn thành'.tr();
    } else if (isInProgress) {
      bgColor = Colors.orange.shade600;
      label = 'Hoàn thành'.tr();
    }

    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(100),
          boxShadow: [
            BoxShadow(
              color: bgColor.withValues(alpha: 0.3),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    ).animate(target: isCompleted ? 1 : 0).scale(
      begin: const Offset(1, 1),
      end: const Offset(1.05, 1.05),
      duration: 150.ms,
      curve: Curves.easeOut,
    ).then().scale(
      begin: const Offset(1.05, 1.05),
      end: const Offset(1, 1),
      duration: 150.ms,
    );
  }
}
