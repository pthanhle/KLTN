import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class MpiSubmitButton extends StatefulWidget {
  final String label;
  final VoidCallback onTap;

  const MpiSubmitButton({
    super.key,
    required this.label,
    required this.onTap,
  });

  @override
  State<MpiSubmitButton> createState() => _MpiSubmitButtonState();
}

class _MpiSubmitButtonState extends State<MpiSubmitButton> {
  bool _isPressed = false;

  void _handleTapDown(_) {
    HapticFeedback.lightImpact();
    setState(() => _isPressed = true);
  }
  void _handleTapUp(_) {
    setState(() => _isPressed = false);
    HapticFeedback.mediumImpact();
    widget.onTap();
  }
  void _handleTapCancel() => setState(() => _isPressed = false);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      child: AnimatedScale(
        scale: _isPressed ? 0.96 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: Container(
          decoration: ShapeDecoration(
            color: theme.colorScheme.primary.withValues(alpha: 0.88),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.35 : 0.50),
                width: 1.0,
              ),
            ),
            shadows: [
              BoxShadow(
                color: theme.colorScheme.primary.withValues(alpha: 0.22),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 16),
                child: Center(
                  child: Text(
                    widget.label,
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.4,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
