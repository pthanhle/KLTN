import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class LiquidButton extends StatefulWidget {
  final VoidCallback onPressed;
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

  void _handleTapDown(TapDownDetails details) {
    HapticFeedback.lightImpact();
    setState(() => _isPressed = true);
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() => _isPressed = false);
    widget.onPressed();
  }

  void _handleTapCancel() {
    setState(() => _isPressed = false);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      child: AnimatedScale(
        scale: _isPressed ? 0.96 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 18),
          decoration: ShapeDecoration(
            color: widget.isLoading ? theme.disabledColor : theme.primaryColor,
            shape: ContinuousRectangleBorder(
              borderRadius: BorderRadius.circular(32),
            ),
            shadows: _isPressed
                ? []
                : [
                    BoxShadow(
                      color: theme.primaryColor.withOpacity(0.3),
                      blurRadius: 16,
                      offset: const Offset(0, 8),
                    )
                  ],
          ),
          child: Center(
            child: widget.isLoading
                ? const SizedBox(
                    width: 24,
                    height: 24,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : DefaultTextStyle(
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 17,
                      fontWeight: FontWeight.w600,
                    ),
                    child: widget.child,
                  ),
          ),
        ),
      ),
    );
  }
}
