import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';

class PackingActionIsland extends StatelessWidget {
  final bool isReadyToComplete;
  final VoidCallback onReport;
  final VoidCallback onComplete;

  const PackingActionIsland({
    super.key,
    required this.isReadyToComplete,
    required this.onReport,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      child: Container(
        decoration: ShapeDecoration(
          color: Colors.white.withValues(alpha: 0.25),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 36,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: 0.3),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.2),
              blurRadius: 40,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 36,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Container(
              padding: const EdgeInsets.all(8),
              child: Row(
                children: [
                  _IslandButton(
                    icon: CupertinoIcons.exclamationmark_triangle_fill,
                    color: theme.colorScheme.error,
                    iconColor: theme.colorScheme.error,
                    isCircle: true,
                    isGlowing: true,
                    onTap: onReport,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: _IslandButton(
                      icon: CupertinoIcons.checkmark_seal_fill,
                      label: 'Hoàn Tất Đóng Gói'.tr(),
                      color: isReadyToComplete ? theme.colorScheme.primary : Colors.transparent,
                      iconColor: isReadyToComplete ? Colors.white : theme.colorScheme.onSurfaceVariant,
                      textColor: isReadyToComplete ? Colors.white : theme.colorScheme.onSurfaceVariant,
                      isGlowing: isReadyToComplete,
                      onTap: isReadyToComplete ? onComplete : null,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _IslandButton extends StatefulWidget {
  final IconData icon;
  final String? label;
  final Color color;
  final Color iconColor;
  final Color? textColor;
  final VoidCallback? onTap;
  final bool isCircle;
  final bool isGlowing;

  const _IslandButton({
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
  State<_IslandButton> createState() => _IslandButtonState();
}

class _IslandButtonState extends State<_IslandButton> {
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
