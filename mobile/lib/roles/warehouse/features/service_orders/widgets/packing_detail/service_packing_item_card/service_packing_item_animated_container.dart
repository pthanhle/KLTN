import 'package:flutter/material.dart';

class ServicePackingItemAnimatedContainer extends StatelessWidget {
  final bool isPacked;
  final Widget child;

  const ServicePackingItemAnimatedContainer({
    super.key,
    required this.isPacked,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isPacked
            ? (isDark 
                ? Colors.green.withValues(alpha: 0.1) 
                : Colors.green.withValues(alpha: 0.05))
            : theme.colorScheme.surface,
        border: Border.all(
          color: isPacked
              ? Colors.green.withValues(alpha: 0.3)
              : theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: child,
    );
  }
}
