import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_animate/flutter_animate.dart';

class PostDriveSubmitButton extends StatefulWidget {
  final bool isEnabled;
  final bool isLoading;
  final VoidCallback onPressed;

  const PostDriveSubmitButton({
    super.key,
    required this.isEnabled,
    required this.isLoading,
    required this.onPressed,
  });

  @override
  State<PostDriveSubmitButton> createState() => _PostDriveSubmitButtonState();
}

class _PostDriveSubmitButtonState extends State<PostDriveSubmitButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final Color appleBlue = isDark ? const Color(0xFF0A84FF) : const Color(0xFF007AFF);

    final bgAlpha = !widget.isEnabled ? 0.30 : widget.isLoading ? 0.70 : 0.88;

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
          HapticFeedback.mediumImpact();
          widget.onPressed();
        }
      },
      onTapCancel: () => setState(() => _isPressed = false),
      behavior: HitTestBehavior.opaque,
      child: Container(
        height: 56,
        decoration: ShapeDecoration(
          color: appleBlue.withValues(alpha: bgAlpha),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 999, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: widget.isEnabled ? 0.55 : 0.20),
              width: 1.0,
            ),
          ),
          shadows: (widget.isEnabled && !widget.isLoading && !_isPressed)
              ? [
                  BoxShadow(
                    color: appleBlue.withValues(alpha: isDark ? 0.35 : 0.28),
                    blurRadius: 16,
                    offset: const Offset(0, 5),
                  ),
                  BoxShadow(
                    color: appleBlue.withValues(alpha: isDark ? 0.15 : 0.10),
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
                      tr('Lưu đánh giá'),
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: Colors.white.withValues(alpha: widget.isEnabled ? 1.0 : 0.45),
                        letterSpacing: -0.3,
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
