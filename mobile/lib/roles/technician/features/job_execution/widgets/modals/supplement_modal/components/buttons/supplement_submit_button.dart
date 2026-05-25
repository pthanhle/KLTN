import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class SupplementSubmitButton extends StatefulWidget {
  final Future<void> Function()? onPressed;
  final Widget child;
  final bool isLoading;

  const SupplementSubmitButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.isLoading = false,
  });

  @override
  State<SupplementSubmitButton> createState() => _SupplementSubmitButtonState();
}

class _SupplementSubmitButtonState extends State<SupplementSubmitButton> {
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
        HapticFeedback.heavyImpact();
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
    final errorColor = theme.colorScheme.error;

    final bgColor = errorColor.withValues(
      alpha: _isDisabled ? 0.35 : _effectiveIsLoading ? 0.70 : 0.88,
    );

    final borderColor = Colors.white.withValues(alpha: isDark ? 0.35 : 0.50);

    final shadows = (_isPressed || _isDisabled)
        ? <BoxShadow>[]
        : [
            BoxShadow(
              color: errorColor.withValues(alpha: _effectiveIsLoading ? 0.15 : 0.22),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ];

    final textColor = Colors.white.withValues(alpha: _isDisabled ? 0.45 : 1.0);

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
            side: _isDisabled
                ? BorderSide.none
                : BorderSide(color: borderColor, width: 1.0),
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
                    ? const CupertinoActivityIndicator(color: Colors.white)
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
