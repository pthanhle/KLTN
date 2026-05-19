import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:easy_localization/easy_localization.dart';

class ExceptionAlertBanner extends StatelessWidget {
  final String exceptionText;

  const ExceptionAlertBanner({
    super.key,
    required this.exceptionText,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.red.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: Colors.red.withValues(alpha: 0.3),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.red.withValues(alpha: 0.2),
            blurRadius: 15,
            offset: Offset.zero,
          )
        ]
      ),
      child: Row(
        children: [
          Icon(
            Icons.error_rounded,
            color: Colors.red.shade400,
            size: 24,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              exceptionText,
              style: TextStyle(
                fontSize: 17,
                color: isDark ? Colors.red.shade100 : Colors.red.shade900,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Icon(
            Icons.chevron_right_rounded,
            color: Colors.red.shade400.withValues(alpha: 0.7),
            size: 24,
          ),
        ],
      ),
    ).animate(onPlay: (controller) => controller.repeat(reverse: true))
     .shimmer(duration: const Duration(seconds: 3), color: Colors.white.withValues(alpha: 0.2));
  }
}
