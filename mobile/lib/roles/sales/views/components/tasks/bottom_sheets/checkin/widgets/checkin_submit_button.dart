import 'package:flutter/material.dart';
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
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          height: 56,
          decoration: ShapeDecoration(
            color: widget.isEnabled
                ? appleGreen.withValues(alpha: widget.isLoading ? 0.7 : 1.0)
                : theme.colorScheme.surface.withValues(alpha: 0.3),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 999, // Pill shape
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: widget.isEnabled 
                    ? Colors.white.withValues(alpha: 0.2) // Apple glass highlight
                    : theme.colorScheme.surface.withValues(alpha: 0.5),
                width: 0.5,
              ),
            ),
            shadows: widget.isEnabled && !widget.isLoading && !isDark
                ? [
                    BoxShadow(
                      color: appleGreen.withValues(alpha: 0.3),
                      blurRadius: 16,
                      offset: const Offset(0, 8),
                    )
                  ]
                : [],
          ),
          child: Center(
            child: widget.isLoading
                ? const SizedBox(
                    height: 24,
                    width: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Colors.white,
                    ),
                  )
                : Text(
                    tr('Hoàn tất Check-in'),
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: widget.isEnabled
                          ? Colors.white
                          : theme.colorScheme.onSurface.withValues(alpha: 0.5),
                      letterSpacing: -0.2, // Standard iOS typography
                    ),
                  ),
          ),
        ),
      ),
    );
  }
}
