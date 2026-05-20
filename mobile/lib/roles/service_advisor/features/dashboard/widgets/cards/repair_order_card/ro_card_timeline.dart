import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class ROCardTimeline extends StatelessWidget {
  final DateTime scheduledTime;
  final DateTime? arrivalTime;
  final DateTime? deliveryTime;

  const ROCardTimeline({
    super.key,
    required this.scheduledTime,
    this.arrivalTime,
    this.deliveryTime,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final bool hasArrived = arrivalTime != null;
    final DateTime effectiveArrival = arrivalTime ?? scheduledTime;
    
    // Format: 14:30 - 20/05
    final dateFormat = DateFormat('HH:mm - dd/MM');
    final arrivalFormat = dateFormat.format(effectiveArrival);
    
    bool isUrgent = false;
    bool isLate = false;
    String timeLeft = '';
    String deliveryFormat = '';

    if (deliveryTime != null) {
      final now = DateTime.now();
      final difference = deliveryTime!.difference(now);
      isUrgent = difference.inMinutes < 30 && difference.inMinutes >= 0;
      isLate = difference.inMinutes < 0;

      if (isLate) {
        timeLeft = 'Trễ ${difference.inMinutes.abs()}p';
      } else if (difference.inHours > 0) {
        timeLeft = 'Còn ${difference.inHours}h';
      } else {
        timeLeft = 'Còn ${difference.inMinutes}p';
      }
      deliveryFormat = dateFormat.format(deliveryTime!);
    }

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: ShapeDecoration(
        color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.black.withValues(alpha: 0.03),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                hasArrived ? 'Giờ nhận xe'.tr() : 'Lịch hẹn'.tr(),
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                arrivalFormat,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                'Giao xe dự kiến'.tr(),
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 2),
              if (deliveryTime != null)
                Row(
                  children: [
                    Text(
                      deliveryFormat,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: isUrgent || isLate ? theme.colorScheme.error : null,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '($timeLeft)',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: isUrgent || isLate ? theme.colorScheme.error : theme.colorScheme.onSurfaceVariant,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ).animate(target: isUrgent || isLate ? 1 : 0)
                 .tint(color: theme.colorScheme.error, duration: 200.ms)
                 .shimmer(duration: 2.seconds, color: theme.colorScheme.error.withValues(alpha: 0.3))
                 .callback(callback: (val) {
                 }).animate(onPlay: (controller) => controller.repeat(reverse: true))
                 .scale(begin: const Offset(1, 1), end: const Offset(1.05, 1.05), duration: 500.ms, curve: Curves.easeInOut)
              else
                Text(
                  'Chưa có dự kiến'.tr(),
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
