import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PartQuantityStepper extends StatelessWidget {
  final int quantity;
  final int maxStock;
  final ValueChanged<int> onChanged;

  const PartQuantityStepper({
    super.key,
    required this.quantity,
    required this.maxStock,
    required this.onChanged,
  });

  void _decrement() {
    HapticFeedback.lightImpact();
    if (quantity > 1) onChanged(quantity - 1);
  }

  void _increment() {
    HapticFeedback.lightImpact();
    if (quantity < maxStock) onChanged(quantity + 1);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.06)
            : Colors.black.withValues(alpha: 0.04),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 12,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.40),
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _StepperButton(
                  icon: CupertinoIcons.minus,
                  onTap: _decrement,
                  enabled: quantity > 1,
                  theme: theme,
                ),
                SizedBox(
                  width: 32,
                  child: Text(
                    '$quantity',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.3,
                    ),
                  ),
                ),
                _StepperButton(
                  icon: CupertinoIcons.plus,
                  onTap: _increment,
                  enabled: quantity < maxStock,
                  theme: theme,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _StepperButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  final bool enabled;
  final ThemeData theme;

  const _StepperButton({
    required this.icon,
    required this.onTap,
    required this.enabled,
    required this.theme,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: enabled ? onTap : null,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: 32,
        height: 32,
        alignment: Alignment.center,
        child: Icon(
          icon,
          size: 18,
          color: enabled
              ? theme.colorScheme.onSurface
              : theme.colorScheme.onSurface.withValues(alpha: 0.25),
        ),
      ),
    );
  }
}
