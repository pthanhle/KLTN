import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../constants/supplement_constants.dart';

class VibrantLiquidButton extends StatefulWidget {
  final String text;
  final IconData icon;
  final VoidCallback onPressed;
  final bool isLoading;

  const VibrantLiquidButton({
    super.key,
    required this.text,
    required this.icon,
    required this.onPressed,
    this.isLoading = false,
  });

  @override
  State<VibrantLiquidButton> createState() => _VibrantLiquidButtonState();
}

class _VibrantLiquidButtonState extends State<VibrantLiquidButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTapDown: (_) {
        setState(() => _isPressed = true);
        HapticFeedback.selectionClick();
      },
      onTapUp: (_) {
        setState(() => _isPressed = false);
        HapticFeedback.mediumImpact();
        widget.onPressed();
      },
      onTapCancel: () {
        setState(() => _isPressed = false);
      },
      child: AnimatedScale(
        scale: _isPressed ? 0.96 : 1.0,
        duration: SupplementConstants.buttonScaleDuration,
        curve: Curves.easeOutCubic,
        child: Container(
          height: 56,
          decoration: ShapeDecoration(
            color: theme.colorScheme.error.withValues(alpha: 0.85),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: SupplementConstants.cardRadius,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: 0.6),
                width: 1.0,
              ),
            ),
            shadows: [
              BoxShadow(
                color: theme.colorScheme.error.withValues(alpha: 0.5),
                blurRadius: SupplementConstants.buttonGlowBlur,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: SupplementConstants.cardRadius,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: widget.isLoading
                    ? [const CupertinoActivityIndicator(color: Colors.white)]
                    : [
                        Text(
                          widget.text,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                            letterSpacing: -0.3,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Icon(widget.icon, size: 20, color: Colors.white),
                      ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
