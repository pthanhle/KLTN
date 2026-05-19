import 'dart:async';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class LiquidButton extends StatefulWidget {
  final FutureOr<void> Function()? onPressed;
  final Widget child;
  final bool isLoading;
  final bool isGlass;

  const LiquidButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.isLoading = false,
    this.isGlass = false,
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
    final primary = theme.colorScheme.primary;

    final bgAlpha = _isDisabled
        ? 0.35
        : _effectiveIsLoading
            ? 0.70
            : 0.88;

    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      child: Container(
        width: double.infinity,
        decoration: ShapeDecoration(
          color: primary.withValues(alpha: bgAlpha),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 16,
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
              : widget.isGlass
                  ? [
                      BoxShadow(
                        color: primary.withValues(alpha: _effectiveIsLoading ? 0.15 : 0.28),
                        blurRadius: 14,
                        offset: const Offset(0, 5),
                      ),
                    ]
                  : [
                      BoxShadow(
                        color: primary.withValues(alpha: _effectiveIsLoading ? 0.10 : 0.22),
                        blurRadius: 12,
                        offset: const Offset(0, 4),
                      ),
                    ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 18),
              child: Center(
                child: _effectiveIsLoading
                    ? const CupertinoActivityIndicator(color: Colors.white)
                    : DefaultTextStyle(
                        style: TextStyle(
                          color: Colors.white.withValues(
                            alpha: _isDisabled ? 0.45 : 1.0,
                          ),
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.5,
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