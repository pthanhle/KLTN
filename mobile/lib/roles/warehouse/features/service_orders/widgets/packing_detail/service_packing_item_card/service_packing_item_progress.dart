import 'package:flutter/material.dart';

class ServicePackingItemProgress extends StatelessWidget {
  final int packedQuantity;
  final int totalQuantity;

  const ServicePackingItemProgress({
    super.key,
    required this.packedQuantity,
    required this.totalQuantity,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isPacked = packedQuantity == totalQuantity;

    return Container(
      width: 56,
      height: 56,
      decoration: BoxDecoration(
        color: isPacked 
            ? Colors.green.withValues(alpha: 0.15)
            : theme.colorScheme.primary.withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 56,
            height: 56,
            child: CircularProgressIndicator(
              value: totalQuantity > 0 ? packedQuantity / totalQuantity : 0,
              strokeWidth: 3,
              backgroundColor: isDark 
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.black.withValues(alpha: 0.05),
              valueColor: AlwaysStoppedAnimation<Color>(
                isPacked ? Colors.green : theme.colorScheme.primary,
              ),
            ),
          ),
          Text(
            '$packedQuantity/$totalQuantity',
            style: theme.textTheme.labelLarge?.copyWith(
              fontWeight: FontWeight.w800,
              color: isPacked ? Colors.green : theme.colorScheme.primary,
            ),
          ),
        ],
      ),
    );
  }
}
