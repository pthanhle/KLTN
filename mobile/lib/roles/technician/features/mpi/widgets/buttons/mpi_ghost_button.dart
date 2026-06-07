import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/mpi_item_model.dart';

class MpiGhostButton extends StatefulWidget {
  final MpiItemStatus type;
  final bool isSelected;
  final VoidCallback? onTap;

  const MpiGhostButton({
    super.key,
    required this.type,
    required this.isSelected,
    this.onTap,
  });

  @override
  State<MpiGhostButton> createState() => _MpiGhostButtonState();
}

class _MpiGhostButtonState extends State<MpiGhostButton> {
  bool _isPressed = false;

  Color _getColor(BuildContext context) {
    switch (widget.type) {
      case MpiItemStatus.pass:
        return const Color(0xFF34C759);
      case MpiItemStatus.monitor:
        return const Color(0xFFFF9500);
      case MpiItemStatus.fail:
        return Theme.of(context).colorScheme.error;
      case MpiItemStatus.unchecked:
        return Colors.transparent;
    }
  }

  IconData _getIcon() {
    switch (widget.type) {
      case MpiItemStatus.pass:
        return CupertinoIcons.checkmark_alt;
      case MpiItemStatus.monitor:
        return CupertinoIcons.exclamationmark;
      case MpiItemStatus.fail:
        return CupertinoIcons.xmark;
      case MpiItemStatus.unchecked:
        return CupertinoIcons.minus;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final color = _getColor(context);

    return GestureDetector(
      onTapDown: widget.onTap == null ? null : (_) {
        HapticFeedback.selectionClick();
        setState(() => _isPressed = true);
      },
      onTapUp: widget.onTap == null ? null : (_) {
        setState(() => _isPressed = false);
        widget.onTap!();
      },
      onTapCancel: widget.onTap == null ? null : () => setState(() => _isPressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 36,
        height: 36,
        decoration: ShapeDecoration(
          color: widget.isSelected
              ? color.withValues(alpha: isDark ? 0.25 : 0.85)
              : Colors.white.withValues(alpha: isDark ? 0.06 : 0.08),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
            side: BorderSide(
              color: widget.isSelected
                  ? color.withValues(alpha: isDark ? 0.60 : 1.0)
                  : Colors.white.withValues(alpha: isDark ? 0.12 : 0.40),
              width: widget.isSelected ? 1.5 : 0.5,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
          child: ClipRect(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
              child: Center(
                child: Icon(
                  _getIcon(),
                  size: 18,
                  color: widget.isSelected
                      ? Colors.white
                      : Theme.of(context)
                          .colorScheme
                          .onSurfaceVariant
                          .withValues(alpha: 0.45),
                ),
              ),
            ),
          ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
          .scaleXY(end: 0.96, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}
