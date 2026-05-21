import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_animate/flutter_animate.dart';

class CancelActionButton extends StatefulWidget {
  final bool isEnabled;
  final bool isLoading;
  final VoidCallback onPressed;

  const CancelActionButton({
    super.key,
    required this.isEnabled,
    required this.isLoading,
    required this.onPressed,
  });

  @override
  State<CancelActionButton> createState() => _CancelActionButtonState();
}

class _CancelActionButtonState extends State<CancelActionButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final Color appleRed = isDark ? const Color(0xFFFF453A) : const Color(0xFFFF3B30);

    final bgAlpha = !widget.isEnabled ? 0.28 : widget.isLoading ? 0.68 : 0.88;

    return GestureDetector(
      onTapDown: (_) {
        if (widget.isEnabled && !widget.isLoading) {
          HapticFeedback.lightImpact();
          setState(() => _isPressed = true);
        }
      },
      onTapUp: (_) {
        if (widget.isEnabled && !widget.isLoading) {
          setState(() => _isPressed = false);
          HapticFeedback.heavyImpact();
          widget.onPressed();
        }
      },
      onTapCancel: () => setState(() => _isPressed = false),
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 56,
        decoration: ShapeDecoration(
          color: appleRed.withValues(alpha: bgAlpha),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: widget.isEnabled ? 0.50 : 0.15),
              width: 1.0,
            ),
          ),
          shadows: (widget.isEnabled && !widget.isLoading && !_isPressed)
              ? [
                  BoxShadow(
                    color: appleRed.withValues(alpha: isDark ? 0.40 : 0.30),
                    blurRadius: 16,
                    offset: const Offset(0, 5),
                  ),
                  BoxShadow(
                    color: appleRed.withValues(alpha: isDark ? 0.18 : 0.12),
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
            child: Center(
              child: widget.isLoading
                  ? const CupertinoActivityIndicator(color: Colors.white)
                  : Text(
                      tr('Xác nhận Hủy'),
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.3,
                        color: Colors.white.withValues(
                          alpha: widget.isEnabled ? 1.0 : 0.45,
                        ),
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
