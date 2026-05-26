import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../models/job_task_model.dart';
import '../../../../utils/job_status_utils.dart';

class JobTaskActionRow extends StatefulWidget {
  final JobTaskStatus status;
  final bool hasMedia;
  final VoidCallback onAction;
  final VoidCallback onCamera;

  const JobTaskActionRow({
    super.key,
    required this.status,
    required this.hasMedia,
    required this.onAction,
    required this.onCamera,
  });

  @override
  State<JobTaskActionRow> createState() => _JobTaskActionRowState();
}

class _JobTaskActionRowState extends State<JobTaskActionRow> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isCompleted = widget.status == JobTaskStatus.completed;
    final accent = JobTaskStatusUtils.accentColor(widget.status, theme);
    final label = JobTaskStatusUtils.actionLabel(widget.status);

    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        GestureDetector(
          onTapDown: isCompleted ? null : (_) {
            HapticFeedback.lightImpact();
            setState(() => _isPressed = true);
          },
          onTapUp: isCompleted ? null : (_) {
            setState(() => _isPressed = false);
            widget.onAction();
          },
          onTapCancel: () => setState(() => _isPressed = false),
          child: AnimatedScale(
            scale: _isPressed ? 0.96 : 1.0,
            duration: const Duration(milliseconds: 150),
            curve: Curves.easeOutCubic,
            child: Container(
              decoration: ShapeDecoration(
                color: accent.withValues(alpha: isCompleted ? 0.15 : 0.88),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 100, cornerSmoothing: 1.0),
                  side: isCompleted
                      ? BorderSide(color: accent.withValues(alpha: 0.30), width: 1.0)
                      : BorderSide(
                          color: Colors.white.withValues(alpha: isDark ? 0.35 : 0.50),
                          width: 1.0,
                        ),
                ),
                shadows: isCompleted
                    ? []
                    : [BoxShadow(color: accent.withValues(alpha: 0.22), blurRadius: 12, offset: const Offset(0, 4))],
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
                            child: Icon(CupertinoIcons.checkmark_alt, size: 14, color: accent),
                          ),
                        Text(
                          label,
                          style: TextStyle(
                            color: isCompleted ? accent : Colors.white,
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
        ).animate(target: isCompleted ? 1 : 0)
            .scale(begin: const Offset(1, 1), end: const Offset(1.04, 1.04), duration: 150.ms, curve: Curves.easeOut)
            .then()
            .scale(begin: const Offset(1.04, 1.04), end: const Offset(1, 1), duration: 150.ms),
        AnimatedSize(
          duration: const Duration(milliseconds: 400),
          curve: Curves.easeOutCubic,
          child: isCompleted
              ? Padding(
                  padding: const EdgeInsets.only(left: 12),
                  child: GestureDetector(
                    onTap: () {
                      HapticFeedback.lightImpact();
                      widget.onCamera();
                    },
                    child: Container(
                      height: 40,
                      width: 40,
                      decoration: ShapeDecoration(
                        color: isDark
                            ? Colors.white.withValues(alpha: 0.08)
                            : Colors.black.withValues(alpha: 0.05),
                        shape: SmoothRectangleBorder(
                          borderRadius: SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
                          side: BorderSide(
                            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.50),
                            width: 0.5,
                          ),
                        ),
                      ),
                      child: ClipSmoothRect(
                        radius: SmoothBorderRadius(cornerRadius: 13, cornerSmoothing: 1.0),
                        child: BackdropFilter(
                          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                          child: Center(
                            child: Icon(
                              CupertinoIcons.camera_fill,
                              size: 18,
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );
  }
}
