import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../shared/widgets/toast/glass_toast.dart';
import '../../models/quotation_model.dart';
import '../../constants/quotation_constants.dart';
import '../../utils/quotation_utils.dart';
import '../shared/glass_card.dart';
import '../components/shimmer_button.dart';

class QuotationBottomSheet extends ConsumerWidget {
  final QuotationModel data;

  const QuotationBottomSheet({super.key, required this.data});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);

    return GlassCard(
      radius: 32,
      blurSigma: QuotationConstants.blurSigmaHeavy,
      margin: EdgeInsets.zero,
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 16),
      child: SafeArea(
        top: false,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildSummaryRow(theme, 'Phụ tùng'.tr(), data.partsTotal),
            const SizedBox(height: 8),
            _buildSummaryRow(theme, 'Tiền công'.tr(), data.laborTotal),
            const SizedBox(height: 8),
            _buildSummaryRow(theme, 'Giảm giá'.tr(), -data.discountAmount, color: theme.colorScheme.error),
            const SizedBox(height: 8),
            _buildSummaryRow(theme, 'VAT (10%)'.tr(), data.vatAmount),
            const SizedBox(height: 16),
            Container(
              height: 1,
              color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Tổng cộng'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Text(
                  QuotationUtils.formatCurrency(data.grandTotal),
                  style: theme.textTheme.headlineSmall?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            ShimmerButton(
              text: 'Trình Duyệt Báo Giá'.tr(),
              onTap: () {
                GlassToast.show(
                  context,
                  title: 'Đã gửi báo giá!'.tr(),
                  icon: CupertinoIcons.check_mark_circled,
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryRow(ThemeData theme, String label, double amount, {Color? color}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: color ?? theme.colorScheme.onSurfaceVariant,
          ),
        ),
        Text(
          QuotationUtils.formatCurrency(amount),
          style: theme.textTheme.bodyMedium?.copyWith(
            color: color ?? theme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
