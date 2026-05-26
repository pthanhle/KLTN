import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../shared/widgets/buttons/add_catalog_button.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../components/quotation_part_card.dart';
import '../components/quotation_labor_card.dart';
import '../../constants/quotation_constants.dart';
import '../modals/part_search_modal/part_search_modal.dart';
import '../modals/labor_search_modal/labor_search_modal.dart';

class ServiceCartSection extends ConsumerWidget {
  const ServiceCartSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncData = ref.watch(quotationControllerProvider);
    final theme = Theme.of(context);

    final data = asyncData.value;
    final parts = data?.parts ?? const <CartPartItem>[];
    final labor = data?.labor ?? const <CartLaborItem>[];
    final totalItems = parts.length + labor.length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: Row(
            children: [
              Text(
                'Giỏ hàng dịch vụ'.tr(),
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                  letterSpacing: -0.3,
                ),
              ),
              if (totalItems > 0) ...[
                const SizedBox(width: 8),
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 300),
                  child: _CountBadge(
                    key: ValueKey(totalItems),
                    count: totalItems,
                    theme: theme,
                  ),
                ),
              ],
            ],
          ),
        ),
        const SizedBox(height: 16),

        if (parts.isNotEmpty)
          ...parts.map((part) => QuotationPartCard(part: part)),

        if (labor.isNotEmpty)
          ...labor.map((l) => QuotationLaborCard(labor: l)),

        const SizedBox(height: 8),

        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: Row(
            children: [
              Expanded(
                child: AddCatalogButton(
                  icon: CupertinoIcons.wrench_fill,
                  label: 'Phụ tùng'.tr(),
                  onTap: () {
                    HapticFeedback.mediumImpact();
                    showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      useRootNavigator: true,
                      backgroundColor: Colors.transparent,
                      barrierColor: Colors.black.withValues(alpha: 0.4),
                      builder: (context) => const PartSearchModal(),
                    );
                  },
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: AddCatalogButton(
                  icon: CupertinoIcons.person_fill,
                  label: 'Tiền công'.tr(),
                  onTap: () {
                    HapticFeedback.mediumImpact();
                    showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      useRootNavigator: true,
                      backgroundColor: Colors.transparent,
                      barrierColor: Colors.black.withValues(alpha: 0.4),
                      builder: (context) => const LaborSearchModal(),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _CountBadge extends StatelessWidget {
  final int count;
  final ThemeData theme;

  const _CountBadge({super.key, required this.count, required this.theme});

  @override
  Widget build(BuildContext context) {
    final primary = theme.colorScheme.primary;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: ShapeDecoration(
        color: primary.withValues(alpha: 0.12),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 8, cornerSmoothing: 1.0),
          side: BorderSide(color: primary.withValues(alpha: 0.25), width: 0.5),
        ),
      ),
      child: Text(
        '$count',
        style: theme.textTheme.labelMedium?.copyWith(
          color: primary,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}
