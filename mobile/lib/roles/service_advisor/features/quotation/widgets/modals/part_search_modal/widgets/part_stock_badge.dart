import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class PartStockBadge extends StatelessWidget {
  final int availableStock;

  const PartStockBadge({super.key, required this.availableStock});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final inStock = availableStock > 0;

    final color = inStock ? const Color(0xFF34C759) : const Color(0xFFFF9500);
    final text = inStock ? '${'Tồn kho:'.tr()} $availableStock' : 'Hết hàng'.tr();

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            text,
            style: theme.textTheme.labelSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }
}
