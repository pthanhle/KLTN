import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/quotation_model.dart';
import '../../constants/quotation_constants.dart';
import '../../utils/quotation_utils.dart';
import '../shared/glass_card.dart';

class QuotationPartCard extends StatelessWidget {
  final CartPartItem part;

  const QuotationPartCard({super.key, required this.part});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GlassCard(
      margin: const EdgeInsets.only(
        left: QuotationConstants.paddingHorizontal, 
        right: QuotationConstants.paddingHorizontal, 
        bottom: 12,
      ),
      padding: const EdgeInsets.all(QuotationConstants.itemPadding),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      part.name,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '\$${QuotationUtils.formatCurrency(part.price).replaceAll('\$', '')} x ${part.quantity}',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
              if (part.isBackorder)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.errorContainer,
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: QuotationConstants.radiusSmall + 4, 
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: theme.colorScheme.error.withValues(alpha: 0.2),
                        width: 1,
                      ),
                    ),
                  ),
                  child: Text(
                    'BACKORDER'.tr(),
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: theme.colorScheme.onErrorContainer,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
            ],
          ),
          if (part.isBackorder) ...[
            const SizedBox(height: 12),
            Row(
              children: [
                Text(
                  'Ngày về dự kiến:'.tr(),
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: ShapeDecoration(
                      color: isDark 
                          ? Colors.white.withValues(alpha: 0.05)
                          : theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                          cornerRadius: QuotationConstants.radiusSmall, 
                          cornerSmoothing: 1.0,
                        ),
                        side: BorderSide(
                          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3),
                          width: 1,
                        ),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          part.expectedDate ?? '---',
                          style: theme.textTheme.bodyMedium,
                        ),
                        Icon(CupertinoIcons.calendar, size: 18, color: theme.colorScheme.onSurfaceVariant),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}
