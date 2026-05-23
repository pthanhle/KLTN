import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

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
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: ShapeDecoration(
        color: color.withValues(alpha: 0.10),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 10,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: color.withValues(alpha: 0.20),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 7,
            height: 7,
            decoration: BoxDecoration(color: color, shape: BoxShape.circle),
          ),
          const SizedBox(width: 5),
          Text(
            text,
            style: theme.textTheme.labelSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.2,
            ),
          ),
        ],
      ),
    );
  }
}
