import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class CheckInSubmitButton extends StatefulWidget {
  final bool isEnabled;
  final bool isLoading;
  final VoidCallback onPressed;

  const CheckInSubmitButton({
    super.key,
    required this.isEnabled,
    required this.isLoading,
    required this.onPressed,
  });

  @override
  State<CheckInSubmitButton> createState() => _CheckInSubmitButtonState();
}

class _CheckInSubmitButtonState extends State<CheckInSubmitButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    if (widget.isEnabled && !widget.isLoading) {
      _controller.forward();
    }
  }

  void _handleTapUp(TapUpDetails details) {
    if (widget.isEnabled && !widget.isLoading) {
      _controller.reverse();
      HapticFeedback.mediumImpact();
      widget.onPressed();
    }
  }

  void _handleTapCancel() {
    _controller.reverse();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final Color appleGreen = isDark ? const Color(0xFF32D74B) : const Color(0xFF34C759);

    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      behavior: HitTestBehavior.opaque,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 999, // Pill shape
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeOutCubic,
              height: 56,
              decoration: ShapeDecoration(
                color: widget.isEnabled
                    ? appleGreen.withOpacity(widget.isLoading ? 0.6 : 0.85) // 0.85 translucent emerald glass
                    : theme.colorScheme.surface.withOpacity(0.15), // Translucent grey glass when disabled
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 999,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: Colors.white.withOpacity(widget.isEnabled ? 0.6 : 0.2), // Specular highlight
                    width: 1.0, // 1px border highlight
                  ),
                ),
                shadows: widget.isEnabled && !widget.isLoading
                    ? [
                        BoxShadow(
                          color: appleGreen.withOpacity(isDark ? 0.4 : 0.35),
                          blurRadius: 24, // High blur radiant glow
                          offset: const Offset(0, 8),
                        )
                      ]
                    : [],
              ),
              child: Center(
                child: widget.isLoading
                    ? const CupertinoActivityIndicator(
                        color: Colors.white,
                      )
                    : Text(
                        tr('Hoàn tất Check-in'),
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: widget.isEnabled
                              ? Colors.white
                              : theme.colorScheme.onSurface.withOpacity(0.4),
                          letterSpacing: -0.2, // Standard iOS typography
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
