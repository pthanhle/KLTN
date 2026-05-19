import 'dart:async';
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

  void _handleTapDown(TapDownDetails details) {
    if (_effectiveIsLoading || _isDisabled) return;
    HapticFeedback.lightImpact();
    setState(() => _isPressed = true);
  }

  Future<void> _handleTapUp(TapUpDetails details) async {
    if (_effectiveIsLoading || _isDisabled) return;
    setState(() => _isPressed = false);
    
    final result = widget.onPressed!();
    if (result is Future) {
      setState(() => _isProcessing = true);
      try {
        await result;
      } finally {
        if (mounted) {
          setState(() => _isProcessing = false);
        }
      }
    }
  }

  void _handleTapCancel() {
    if (_effectiveIsLoading || _isDisabled) return;
    setState(() => _isPressed = false);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 18),
        decoration: ShapeDecoration(
          color: _isDisabled
              ? theme.colorScheme.surfaceContainerHighest.withValues(alpha: widget.isGlass ? 0.5 : 0.5)
              : _effectiveIsLoading 
                  ? theme.primaryColor.withValues(alpha: widget.isGlass ? 0.7 : 0.7) 
                  : theme.primaryColor.withValues(alpha: widget.isGlass ? 0.85 : 1.0),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            side: widget.isGlass && !_isDisabled
                ? BorderSide(color: Colors.white.withValues(alpha: 0.6), width: 1.0)
                : BorderSide.none,
          ),
          shadows: _isPressed || _effectiveIsLoading || _isDisabled
              ? []
              : widget.isGlass
                  ? [
                      BoxShadow(
                        color: theme.primaryColor.withValues(alpha: 0.5),
                        blurRadius: 24,
                        offset: const Offset(0, 8),
                      )
                    ]
                  : [
                      BoxShadow(
                        color: theme.primaryColor.withValues(alpha: 0.15),
                        blurRadius: 30,
                        offset: const Offset(0, 10),
                      ),
                      BoxShadow(
                        color: theme.primaryColor.withValues(alpha: 0.25),
                        blurRadius: 10,
                        offset: const Offset(0, 4),
                      ),
                    ],
        ),
        child: Center(
          child: _effectiveIsLoading
              ? const CupertinoActivityIndicator(color: Colors.white)
              : DefaultTextStyle(
                  style: TextStyle(
                    color: _isDisabled 
                        ? theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5)
                        : Colors.white,
                    fontSize: 17,
                    fontWeight: widget.isGlass ? FontWeight.w700 : FontWeight.w600,
                    letterSpacing: widget.isGlass ? -0.5 : 0,
                  ),
                  child: widget.child,
                ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.96, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}