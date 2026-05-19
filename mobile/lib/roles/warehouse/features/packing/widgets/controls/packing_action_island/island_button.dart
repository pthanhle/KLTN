import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class IslandButton extends StatefulWidget {
  final IconData icon;
  final String? label;
  final Color color;
  final Color iconColor;
  final Color? textColor;
  final VoidCallback? onTap;
  final bool isCircle;
  final bool isGlowing;

  const IslandButton({
    super.key,
    required this.icon,
    required this.color,
    required this.iconColor,
    this.textColor,
    this.label,
    this.onTap,
    this.isCircle = false,
    this.isGlowing = false,
  });

  @override
  State<IslandButton> createState() => _IslandButtonState();
}

class _IslandButtonState extends State<IslandButton> {
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTapDown: widget.onTap != null ? (_) => setState(() => _isPressed = true) : null,
      onTapUp: widget.onTap != null
          ? (_) {
              setState(() => _isPressed = false);
              HapticFeedback.heavyImpact();
              widget.onTap!();
            }
          : null,
      onTapCancel: () => setState(() => _isPressed = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        transform: Matrix4.identity()..scale(_isPressed ? 0.95 : 1.0),
        transformAlignment: Alignment.center,
        height: 56,
        width: widget.isCircle ? 56 : null,
        decoration: ShapeDecoration(
          color: widget.color == Colors.transparent
              ? Colors.transparent
              : widget.color.withValues(alpha: widget.isGlowing ? 0.15 : (widget.onTap != null ? 1.0 : 0.5)),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: widget.isCircle ? 100 : 26,
              cornerSmoothing: 1.0,
            ),
            side: widget.isGlowing && widget.onTap != null
                ? BorderSide(color: Colors.white.withValues(alpha: 0.5), width: 1)
                : BorderSide.none,
          ),
          shadows: widget.isGlowing && widget.onTap != null
              ? [
                  BoxShadow(
                    color: widget.color.withValues(alpha: 0.4),
                    blurRadius: 20,
                    offset: const Offset(0, 4),
                  )
                ]
              : [],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              widget.icon,
              color: widget.iconColor.withValues(alpha: widget.onTap != null ? 1.0 : 0.5),
              size: widget.isGlowing ? 26 : 24,
            ),
            if (widget.label != null) ...[
              const SizedBox(width: 8),
              Text(
                widget.label!,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: widget.isGlowing ? FontWeight.w700 : FontWeight.w600,
                  color: (widget.textColor ?? widget.iconColor).withValues(alpha: widget.onTap != null ? 1.0 : 0.5),
                  letterSpacing: -0.5,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
