import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';

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
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1C1C1E) : const Color(0xFFF2F2F7),
        borderRadius: BorderRadius.circular(8),
      ),
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
                fontWeight: FontWeight.w600,
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
          size: 20,
          color: enabled
              ? theme.colorScheme.onSurface
              : theme.colorScheme.onSurface.withValues(alpha: 0.3),
        ),
      ),
    );
  }
}
