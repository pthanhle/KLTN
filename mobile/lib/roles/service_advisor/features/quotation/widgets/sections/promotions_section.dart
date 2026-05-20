import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../shared/glass_card.dart';
import '../shared/glass_text_field.dart';
import '../../constants/quotation_constants.dart';
import '../../utils/quotation_utils.dart';

class PromotionsSection extends ConsumerWidget {
  final QuotationModel data;

  const PromotionsSection({super.key, required this.data});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final controller = ref.read(quotationControllerProvider.notifier);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: QuotationConstants.paddingHorizontal),
          child: Text(
            'Ưu đãi & Đặt cọc'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        const SizedBox(height: 16),
        GlassCard(
          margin: const EdgeInsets.symmetric(horizontal: QuotationConstants.paddingHorizontal),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Mã khuyến mãi'.tr(),
                style: theme.textTheme.labelMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 8),
              GlassTextField(
                hintText: 'Nhập mã...'.tr(),
                onChanged: controller.applyPromoCode,
              ),
              const SizedBox(height: 24),
              Text(
                'Tiền cọc yêu cầu'.tr(),
                style: theme.textTheme.labelMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 8),
              GlassTextField(
                hintText: QuotationUtils.formatCurrency(data.depositRequired),
                readOnly: true,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
