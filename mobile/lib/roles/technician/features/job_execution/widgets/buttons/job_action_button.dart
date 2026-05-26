import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/job_task_model.dart';
import 'package:easy_localization/easy_localization.dart';

/// §10 Neutral variant — Liquid Glass pill cho status action button
/// Không phải LiquidButton CTA — đây là small secondary pill action
class JobActionButton extends StatefulWidget {
  final JobTaskStatus status;
  final VoidCallback onTap;

  const JobActionButton({
    super.key,
    required this.status,
    required this.onTap,
  });

  @override
  State<JobActionButton> createState() => _JobActionButtonState();
}

class _JobActionButtonState extends State<JobActionButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final bool isCompleted = widget.status == JobTaskStatus.completed;
    final bool isInProgress = widget.status == JobTaskStatus.inProgress;

    // Apple-standard colors cho status
    final Color accentColor = isCompleted
        ? const Color(0xFF34C759)
        : (isInProgress
            ? const Color(0xFFFF9500)
            : theme.colorScheme.primary);

    final String label = isCompleted
        ? 'Đã hoàn thành'.tr()
        : (isInProgress ? 'Hoàn thành'.tr() : 'Bắt đầu'.tr());

    return GestureDetector(
      onTapDown: isCompleted
          ? null
          : (_) {
              HapticFeedback.lightImpact();
              setState(() => _isPressed = true);
            },
      onTapUp: isCompleted
          ? null
          : (_) {
              setState(() => _isPressed = false);
              widget.onTap();
            },
      onTapCancel: () => setState(() => _isPressed = false),
      child: AnimatedScale(
        scale: _isPressed ? 0.96 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: Container(
          decoration: ShapeDecoration(
            // §10 variant: alpha 0.88 active, hơi mờ hơn khi completed
            color: accentColor.withValues(alpha: isCompleted ? 0.15 : 0.88),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 100, cornerSmoothing: 1.0),
              side: isCompleted
                  ? BorderSide(
                      color: accentColor.withValues(alpha: 0.30),
                      width: 1.0,
                    )
                  : BorderSide(
                      color: Colors.white.withValues(alpha: isDark ? 0.35 : 0.50),
                      width: 1.0,
                    ),
            ),
            shadows: isCompleted
                ? []
                : [
                    BoxShadow(
                      color: accentColor.withValues(alpha: 0.22),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 100, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (isCompleted)
                      Padding(
                        padding: const EdgeInsets.only(right: 6),
                        child: Icon(
                          CupertinoIcons.checkmark_alt,
                          size: 14,
                          color: accentColor,
                        ),
                      ),
                    Text(
                      label,
                      style: TextStyle(
                        color: isCompleted ? accentColor : Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        letterSpacing: -0.2,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    ).animate(target: isCompleted ? 1 : 0).scale(
      begin: const Offset(1, 1),
      end: const Offset(1.04, 1.04),
      duration: 150.ms,
      curve: Curves.easeOut,
    ).then().scale(
      begin: const Offset(1.04, 1.04),
      end: const Offset(1, 1),
      duration: 150.ms,
    );
  }
}
