import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class AdvisorPrimaryButton extends StatefulWidget {
  final VoidCallback? onPressed;
  final Widget child;
  final bool isLoading;
  final Color? color;
  final double borderRadius;
  final double height;
  final IconData? icon;

  const AdvisorPrimaryButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.isLoading = false,
    this.color,
    this.borderRadius = 16,
    this.height = 56,
    this.icon,
  });

  @override
  State<AdvisorPrimaryButton> createState() => _AdvisorPrimaryButtonState();
}

class _AdvisorPrimaryButtonState extends State<AdvisorPrimaryButton> {
  bool _isPressed = false;

  bool get _isDisabled => widget.onPressed == null;
  bool get _isActive => !_isDisabled && !widget.isLoading;

  double get _bgAlpha => _isDisabled
      ? 0.35
      : widget.isLoading
          ? 0.70
          : 0.88;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final effectiveColor = widget.color ?? theme.colorScheme.primary;

    return GestureDetector(
      onTapDown: (_) {
        if (!_isActive) return;
        HapticFeedback.lightImpact();
        setState(() => _isPressed = true);
      },
      onTapUp: (_) {
        if (!_isActive) return;
        setState(() => _isPressed = false);
        HapticFeedback.mediumImpact();
        widget.onPressed!();
      },
      onTapCancel: () => setState(() => _isPressed = false),
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: widget.height,
        width: double.infinity,
        decoration: ShapeDecoration(
          color: effectiveColor.withValues(alpha: _bgAlpha),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: widget.borderRadius,
              cornerSmoothing: 1.0,
            ),
            side: _isDisabled
                ? BorderSide.none
                : BorderSide(
                    color: Colors.white.withValues(alpha: 0.55),
                    width: 1.0,
                  ),
          ),
          shadows: (_isPressed || _isDisabled)
              ? []
              : [
                  BoxShadow(
                    color: effectiveColor.withValues(
                      alpha: isDark ? 0.35 : 0.28,
                    ),
                    blurRadius: 16,
                    offset: const Offset(0, 5),
                  ),
                  BoxShadow(
                    color: effectiveColor.withValues(
                      alpha: isDark ? 0.15 : 0.10,
                    ),
                    blurRadius: 4,
                    offset: const Offset(0, 1),
                  ),
                ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: widget.borderRadius,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Center(
              child: widget.isLoading
                  ? const CupertinoActivityIndicator(color: Colors.white)
                  : Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        DefaultTextStyle(
                          style: TextStyle(
                            color: Colors.white.withValues(
                              alpha: _isDisabled ? 0.45 : 1.0,
                            ),
                            fontSize: 17,
                            fontWeight: FontWeight.w700,
                            letterSpacing: -0.3,
                          ),
                          child: widget.child,
                        ),
                        if (widget.icon != null) ...[
                          const SizedBox(width: 8),
                          Icon(
                            widget.icon,
                            size: 20,
                            color: Colors.white.withValues(
                              alpha: _isDisabled ? 0.45 : 1.0,
                            ),
                          ),
                        ],
                      ],
                    ),
            ),
          ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.96, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}
