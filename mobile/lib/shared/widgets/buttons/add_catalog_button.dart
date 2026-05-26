import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class AddCatalogButton extends StatefulWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color? color;

  const AddCatalogButton({
    super.key,
    required this.icon,
    required this.label,
    required this.onTap,
    this.color,
  });

  @override
  State<AddCatalogButton> createState() => _AddCatalogButtonState();
}

class _AddCatalogButtonState extends State<AddCatalogButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final color = widget.color ?? theme.colorScheme.primary;

    return GestureDetector(
      onTapDown: (_) {
        HapticFeedback.selectionClick();
        setState(() => _pressed = true);
      },
      onTapUp: (_) {
        setState(() => _pressed = false);
        widget.onTap();
      },
      onTapCancel: () => setState(() => _pressed = false),
      behavior: HitTestBehavior.opaque,
      child: AnimatedScale(
        scale: _pressed ? 0.95 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 13),
          decoration: ShapeDecoration(
            color: color.withValues(alpha: isDark ? 0.12 : 0.08),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: color.withValues(alpha: isDark ? 0.35 : 0.25),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(widget.icon, color: color, size: 16),
                  const SizedBox(width: 6),
                  Icon(CupertinoIcons.add, color: color, size: 14),
                  const SizedBox(width: 6),
                  Text(
                    widget.label,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: color,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.1,
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
