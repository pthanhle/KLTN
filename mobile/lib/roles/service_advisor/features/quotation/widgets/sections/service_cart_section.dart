import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../shared/widgets/buttons/add_catalog_button.dart';
import '../../../../../../shared/widgets/buttons/glass_close_button.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../components/quotation_part_card.dart';
import '../components/quotation_labor_card.dart';
import '../../constants/quotation_constants.dart';
import '../modals/part_search_modal/part_search_modal.dart';
import '../modals/labor_search_modal/labor_search_modal.dart';
import '../../utils/quotation_utils.dart';
import '../../../walkaround/models/service_package_model.dart';
import '../../../walkaround/providers/service_catalog_provider.dart';

class ServiceCartSection extends ConsumerWidget {
  const ServiceCartSection({super.key});

  void _showLaborCatalog(BuildContext context) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (c) => const LaborSearchModal(),
    );
  }

  void _showServiceCatalog(BuildContext context) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      useRootNavigator: true,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      builder: (context) => const _QuotationServiceModal(),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncData = ref.watch(quotationControllerProvider);
    final theme = Theme.of(context);

    final data = asyncData.value;
    final services = data?.selectedServices ?? const <ServicePackageModel>[];
    final parts = data?.parts ?? const <CartPartItem>[];
    final labor = data?.labor ?? const <CartLaborItem>[];
    final totalItems = services.length + parts.length + labor.length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ── Section header ──────────────────────────────────────
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

        // ── Dịch vụ đặt trước ───────────────────────────────────
        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: Text(
            'Gói dịch vụ'.tr(),
            style: theme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
        const SizedBox(height: 8),
        ...services.map((svc) => _QuotationServiceCard(service: svc)),
        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: AddCatalogButton(
            icon: CupertinoIcons.bag_fill,
            label: 'Thêm gói dịch vụ'.tr(),
            onTap: () => _showServiceCatalog(context),
          ),
        ),
        const SizedBox(height: 24),

        // ── Phụ tùng & Tiền công ────────────────────────────────
        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: Text(
            'Phụ tùng & Tiền công'.tr(),
            style: theme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
        const SizedBox(height: 8),

        if (parts.isNotEmpty)
          ...parts.map((part) => QuotationPartCard(
                part: part,
                onRemove: () => ref.read(quotationControllerProvider.notifier).removePart(part.id),
              )),

        if (labor.isNotEmpty)
          ...labor.map((item) => QuotationLaborCard(
                labor: item,
                onRemove: () => ref.read(quotationControllerProvider.notifier).removeLabor(item.id),
              )),

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
                  onTap: () => _showLaborCatalog(context),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────
// Service card in cart
// ─────────────────────────────────────────────
class _QuotationServiceCard extends ConsumerWidget {
  final ServicePackageModel service;
  const _QuotationServiceCard({required this.service});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final primary = theme.colorScheme.primary;

    return Padding(
      padding: const EdgeInsets.symmetric(
          horizontal: QuotationConstants.paddingHorizontal),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.05)
              : theme.colorScheme.surface.withValues(alpha: 0.72),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: primary.withValues(alpha: 0.25),
              width: 0.5,
            ),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(CupertinoIcons.bag_fill, size: 18, color: primary),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    service.name,
                    style: theme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (service.category.isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(
                      service.category,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(width: 8),
            Text(
              QuotationUtils.formatCurrency(service.basePrice),
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w700,
                color: theme.colorScheme.onSurface,
              ),
            ),
            const SizedBox(width: 4),
            GestureDetector(
              onTap: () {
                HapticFeedback.lightImpact();
                ref
                    .read(quotationControllerProvider.notifier)
                    .removeServicePackage(service.id);
              },
              child: Icon(
                CupertinoIcons.xmark_circle_fill,
                size: 20,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Service catalog modal (wired to quotation controller)
// ─────────────────────────────────────────────
class _QuotationServiceModal extends ConsumerStatefulWidget {
  const _QuotationServiceModal();

  @override
  ConsumerState<_QuotationServiceModal> createState() =>
      _QuotationServiceModalState();
}

class _QuotationServiceModalState
    extends ConsumerState<_QuotationServiceModal> {
  String _selectedCategory = 'Tất cả';

  @override
  Widget build(BuildContext context) {
    final catalogAsync = ref.watch(serviceCatalogProvider);
    final theme = Theme.of(context);

    return Container(
      height: MediaQuery.of(context).size.height * 0.78,
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.65),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: 0.2),
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Column(
            children: [
              const SizedBox(height: 12),
              Center(
                child: Container(
                  width: 48,
                  height: 6,
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.3),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                          cornerRadius: 3, cornerSmoothing: 1.0),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Text(
                      'Thêm gói dịch vụ'.tr(),
                      style: theme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.5,
                      ),
                    ),
                    Align(
                      alignment: Alignment.centerRight,
                      child: GlassCloseButton(
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Expanded(
                child: catalogAsync.when(
                  loading: () =>
                      const Center(child: CupertinoActivityIndicator()),
                  error: (err, _) => Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Text(
                        'Không thể tải danh mục dịch vụ. Vui lòng thử lại.'.tr(),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                  data: (catalog) {
                    final categories = [
                      'Tất cả',
                      ...catalog
                          .map((e) => e.category)
                          .where((c) => c.isNotEmpty)
                          .toSet(),
                    ];
                    final displayed = _selectedCategory == 'Tất cả'
                        ? catalog
                        : catalog
                            .where((p) => p.category == _selectedCategory)
                            .toList();

                    return Column(
                      children: [
                        SizedBox(
                          height: 36,
                          child: ListView.separated(
                            physics: const BouncingScrollPhysics(),
                            scrollDirection: Axis.horizontal,
                            padding: const EdgeInsets.symmetric(horizontal: 24),
                            itemCount: categories.length,
                            separatorBuilder: (_, idx) =>
                                const SizedBox(width: 8),
                            itemBuilder: (context, i) {
                              final cat = categories[i];
                              return _QCategoryChip(
                                title: cat.tr(),
                                isSelected: cat == _selectedCategory,
                                onTap: () {
                                  HapticFeedback.selectionClick();
                                  setState(() => _selectedCategory = cat);
                                },
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 16),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: Container(
                            height: 0.5,
                            color: Colors.white.withValues(alpha: 0.15),
                          ),
                        ),
                        Expanded(
                          child: displayed.isEmpty
                              ? Center(
                                  child: Text(
                                    'Không có gói dịch vụ nào'.tr(),
                                    style: theme.textTheme.bodyMedium?.copyWith(
                                      color:
                                          theme.colorScheme.onSurfaceVariant,
                                    ),
                                  ),
                                )
                              : ListView.separated(
                                  physics: const BouncingScrollPhysics(),
                                  padding: const EdgeInsets.fromLTRB(
                                      24, 16, 24, 24),
                                  itemCount: displayed.length,
                                  separatorBuilder: (_, idx) =>
                                      const SizedBox(height: 12),
                                  itemBuilder: (context, i) =>
                                      _QServiceCatalogCard(
                                          package: displayed[i]),
                                ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(
                  24,
                  12,
                  24,
                  MediaQuery.of(context).padding.bottom > 0
                      ? MediaQuery.of(context).padding.bottom
                      : 24,
                ),
                child: FilledButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: FilledButton.styleFrom(
                    minimumSize: const Size.fromHeight(52),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16)),
                  ),
                  child: Text('Xong'.tr()),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _QCategoryChip extends StatelessWidget {
  final String title;
  final bool isSelected;
  final VoidCallback onTap;

  const _QCategoryChip({
    required this.title,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: ShapeDecoration(
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: 0.88)
              : Colors.white.withValues(alpha: 0.08),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isSelected
                  ? Colors.white.withValues(alpha: 0.55)
                  : Colors.white.withValues(alpha: 0.2),
              width: 0.5,
            ),
          ),
        ),
        child: AnimatedDefaultTextStyle(
          duration: const Duration(milliseconds: 200),
          style: theme.textTheme.labelLarge!.copyWith(
            color: isSelected ? Colors.white : theme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w600,
          ),
          child: Text(title),
        ),
      ),
    );
  }
}

class _QServiceCatalogCard extends ConsumerWidget {
  final ServicePackageModel package;
  const _QServiceCatalogCard({required this.package});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isSelected = ref.watch(
      quotationControllerProvider.select(
        (asyncVal) =>
            asyncVal.value?.selectedServices.any((s) => s.id == package.id) ??
            false,
      ),
    );
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        if (!isSelected) {
          ref
              .read(quotationControllerProvider.notifier)
              .addServicePackage(package);
        } else {
          ref
              .read(quotationControllerProvider.notifier)
              .removeServicePackage(package.id);
        }
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        padding: const EdgeInsets.all(16),
        decoration: ShapeDecoration(
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: isDark ? 0.15 : 0.12)
              : Colors.white.withValues(alpha: isDark ? 0.05 : 0.15),
          shape: SmoothRectangleBorder(
            borderRadius:
                SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
            side: BorderSide(
              color: isSelected
                  ? theme.colorScheme.primary.withValues(alpha: 0.6)
                  : Colors.white.withValues(alpha: 0.2),
              width: 0.5,
            ),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (package.category.isNotEmpty)
                    Text(
                      package.category.tr(),
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: isSelected
                            ? theme.colorScheme.primary
                            : theme.colorScheme.onSurfaceVariant,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.5,
                      ),
                    ),
                  const SizedBox(height: 2),
                  Text(
                    package.name,
                    style: theme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    QuotationUtils.formatCurrency(package.basePrice),
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: isSelected
                          ? theme.colorScheme.primary
                          : theme.colorScheme.onSurfaceVariant,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 24,
              height: 24,
              decoration: ShapeDecoration(
                color: isSelected
                    ? theme.colorScheme.primary.withValues(alpha: 0.88)
                    : Colors.transparent,
                shape: SmoothRectangleBorder(
                  borderRadius:
                      SmoothBorderRadius(cornerRadius: 12, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: isSelected
                        ? theme.colorScheme.primary
                        : theme.colorScheme.outline,
                    width: 1.5,
                  ),
                ),
              ),
              child: isSelected
                  ? const Icon(CupertinoIcons.checkmark_alt,
                      size: 14, color: Colors.white)
                  : null,
            ),
          ],
        ),
      ),
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
