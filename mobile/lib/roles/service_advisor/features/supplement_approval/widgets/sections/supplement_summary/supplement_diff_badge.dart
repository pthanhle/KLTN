import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../utils/supplement_cost_utils.dart';

class SupplementDiffBadge extends StatelessWidget {
  final double diff;

  const SupplementDiffBadge({super.key, required this.diff});

  @override
  Widget build(BuildContext context) {
    if (diff <= 0) return const SizedBox.shrink();

    final theme = Theme.of(context);
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: ShapeDecoration(
        color: theme.colorScheme.errorContainer.withValues(alpha: 0.85),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 10,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.colorScheme.error.withValues(alpha: 0.30),
            width: 0.5,
          ),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            CupertinoIcons.arrow_up_right,
            size: 14,
            color: theme.colorScheme.onErrorContainer,
          ),
          const SizedBox(width: 4),
          Flexible(
            child: Text(
              '${'Tăng'.tr()} +${SupplementCostUtils.formatCurrency(diff)}',
              style: theme.textTheme.labelSmall?.copyWith(
                color: theme.colorScheme.onErrorContainer,
                fontWeight: FontWeight.w700,
                letterSpacing: 0.3,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
