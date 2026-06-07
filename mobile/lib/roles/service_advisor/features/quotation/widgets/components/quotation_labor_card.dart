import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../models/quotation_model.dart';
import '../../constants/quotation_constants.dart';
import '../../utils/quotation_utils.dart';
import '../shared/glass_card.dart';

class QuotationLaborCard extends StatelessWidget {
  final CartLaborItem labor;
  final VoidCallback? onRemove;

  const QuotationLaborCard({super.key, required this.labor, this.onRemove});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GlassCard(
      margin: const EdgeInsets.only(
        left: QuotationConstants.paddingHorizontal, 
        right: QuotationConstants.paddingHorizontal, 
        bottom: 12,
      ),
      padding: const EdgeInsets.all(QuotationConstants.itemPadding),
      hasShadow: false, // Labor typically looks flatter than parts in Apple design
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  labor.name,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${QuotationUtils.formatHours(labor.quantity)} @ ${QuotationUtils.formatCurrency(labor.unitPrice)}/h',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          Text(
            QuotationUtils.formatCurrency(labor.total),
            style: theme.textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          if (onRemove != null) ...[
            const SizedBox(width: 8),
            GestureDetector(
              onTap: onRemove,
              child: Icon(
                CupertinoIcons.trash,
                size: 18,
                color: theme.colorScheme.error,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
