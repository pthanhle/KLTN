import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';

class LiquidButton extends StatefulWidget {
  final FutureOr<void> Function() onPressed;
  final Widget child;
  final bool isLoading;
  
  const LiquidButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.isLoading = false,
  });

  @override
  State<LiquidButton> createState() => _LiquidButtonState();
}

class _LiquidButtonState extends State<LiquidButton> {
  bool _isPressed = false;
  bool _isProcessing = false;

  bool get _effectiveIsLoading => widget.isLoading || _isProcessing;

  void _handleTapDown(TapDownDetails details) {
    if (_effectiveIsLoading) return;
    HapticFeedback.lightImpact();
    setState(() => _isPressed = true);
  }

  Future<void> _handleTapUp(TapUpDetails details) async {
    if (_effectiveIsLoading) return;
    setState(() => _isPressed = false);
    
    final result = widget.onPressed();
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
    if (_effectiveIsLoading) return;
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
          color: _effectiveIsLoading ? theme.primaryColor.withValues(alpha: 0.7) : theme.primaryColor,
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 32,
              cornerSmoothing: 1.0,
            ),
          ),
          shadows: _isPressed || _effectiveIsLoading
              ? []
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
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                  ),
                  child: widget.child,
                ),
        ),
      ).animate(target: _isPressed ? 1 : 0)
       .scaleXY(end: 0.96, duration: 150.ms, curve: Curves.easeOutCubic),
    );
  }
}