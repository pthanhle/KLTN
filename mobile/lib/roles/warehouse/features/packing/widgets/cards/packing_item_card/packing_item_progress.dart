import 'package:flutter/material.dart';

class PackingItemProgress extends StatelessWidget {
  final int packedQuantity;
  final int totalQuantity;

  const PackingItemProgress({
    super.key,
    required this.packedQuantity,
    required this.totalQuantity,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isPacked = packedQuantity == totalQuantity;
    final progress = totalQuantity > 0 ? packedQuantity / totalQuantity : 0.0;

    return Stack(
      alignment: Alignment.center,
      children: [
        SizedBox(
          width: 56,
          height: 56,
          child: CircularProgressIndicator(
            value: progress,
            strokeWidth: 3,
            backgroundColor: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
            valueColor: AlwaysStoppedAnimation<Color>(
              isPacked ? theme.colorScheme.primary : theme.colorScheme.secondary,
            ),
          ),
        ),
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: isPacked 
                ? theme.colorScheme.primary 
                : theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.8),
            shape: BoxShape.circle,
          ),
          alignment: Alignment.center,
          child: Text(
            '$packedQuantity',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: isPacked ? theme.colorScheme.onPrimary : theme.colorScheme.onSurface,
            ),
          ),
        ),
      ],
    );
  }
}
