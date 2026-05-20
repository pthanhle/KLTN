import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../shared/widgets/toast/glass_toast.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../shared/glass_card.dart';
import '../components/quotation_part_card.dart';
import '../components/quotation_labor_card.dart';
import '../../constants/quotation_constants.dart';

class ServiceCartSection extends ConsumerWidget {
  final QuotationModel data;

  const ServiceCartSection({super.key, required this.data});

  void _showMockToast(BuildContext context, String message) {
    GlassToast.show(
      context,
      title: message,
      icon: CupertinoIcons.add_circled,
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: QuotationConstants.paddingHorizontal),
          child: Text(
            'Giỏ hàng dịch vụ'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
        const SizedBox(height: 16),
        
        if (data.parts.isNotEmpty)
          ...data.parts.map((part) => QuotationPartCard(part: part)),
          
        if (data.labor.isNotEmpty)
          ...data.labor.map((labor) => QuotationLaborCard(labor: labor)),

        const SizedBox(height: 8),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: QuotationConstants.paddingHorizontal),
          child: Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () => _showMockToast(context, 'Đang mở kho phụ tùng...'),
                  child: GlassCard(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    hasShadow: false,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(CupertinoIcons.add, color: theme.colorScheme.primary, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          'Phụ tùng'.tr(),
                          style: theme.textTheme.bodyLarge?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: GestureDetector(
                  onTap: () => _showMockToast(context, 'Đang mở danh sách kỹ thuật...'),
                  child: GlassCard(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    hasShadow: false,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(CupertinoIcons.add, color: theme.colorScheme.primary, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          'Tiền công'.tr(),
                          style: theme.textTheme.bodyLarge?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
