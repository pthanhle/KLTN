import 'dart:async';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

enum LiquidButtonVariant { primary, neutral }

class LiquidButton extends StatefulWidget {
  final FutureOr<void> Function()? onPressed;
  final Widget child;
  final bool isLoading;
  final bool isGlass;
  final LiquidButtonVariant variant;

  const LiquidButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.isLoading = false,
    this.isGlass = false,
    this.variant = LiquidButtonVariant.primary,
  });

  @override
  State<LiquidButton> createState() => _LiquidButtonState();
}

class _LiquidButtonState extends State<LiquidButton> {
  bool _isPressed = false;
  bool _isProcessing = false;

  bool get _isDisabled => widget.onPressed == null;
  bool get _effectiveIsLoading => widget.isLoading || _isProcessing;
  bool get _isActive => !_isDisabled && !_effectiveIsLoading;

  void _handleTapDown(TapDownDetails _) {
    if (!_isActive) return;
    HapticFeedback.lightImpact();
    setState(() => _isPressed = true);
  }

  Future<void> _handleTapUp(TapUpDetails _) async {
    if (!_isActive) return;
    setState(() => _isPressed = false);

    final result = widget.onPressed!();
    if (result is Future) {
      setState(() => _isProcessing = true);
      try {
        await result;
      } finally {
        if (mounted) setState(() => _isProcessing = false);
      }
    }
  }

  void _handleTapCancel() {
    setState(() => _isPressed = false);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isPrimary = widget.variant == LiquidButtonVariant.primary;
    final primary = theme.colorScheme.primary;

    final bgColor = isPrimary
        ? primary.withValues(alpha: _isDisabled ? 0.35 : _effectiveIsLoading ? 0.70 : 0.88)
        : isDark
            ? Colors.white.withValues(alpha: 0.09)
            : Colors.black.withValues(alpha: 0.06);

    final borderColor = isPrimary
        ? Colors.white.withValues(alpha: isDark ? 0.35 : 0.50)
        : Colors.white.withValues(alpha: isDark ? 0.18 : 0.55);

    final shadows = (_isPressed || _isDisabled)
        ? <BoxShadow>[]
        : isPrimary
            ? [
                BoxShadow(
                  color: primary.withValues(alpha: _effectiveIsLoading ? 0.15 : widget.isGlass ? 0.28 : 0.22),
                  blurRadius: widget.isGlass ? 14 : 12,
                  offset: Offset(0, widget.isGlass ? 5 : 4),
                ),
              ]
            : <BoxShadow>[];

    final textColor = isPrimary
        ? Colors.white.withValues(alpha: _isDisabled ? 0.45 : 1.0)
        : theme.colorScheme.onSurfaceVariant;

    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      child: Container(
        width: double.infinity,
        decoration: ShapeDecoration(
          color: bgColor,
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
            side: _isDisabled && isPrimary
                ? BorderSide.none
                : BorderSide(color: borderColor, width: isPrimary ? 1.0 : 0.5),
          ),
          shadows: shadows,
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 15),
              child: Center(
                child: _effectiveIsLoading
                    ? CupertinoActivityIndicator(color: isPrimary ? Colors.white : theme.colorScheme.primary)
                    : DefaultTextStyle(
                        style: TextStyle(
                          color: textColor,
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.4,
                        ),
                        child: widget.child,
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