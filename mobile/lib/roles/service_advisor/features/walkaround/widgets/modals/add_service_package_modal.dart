import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../controllers/walkaround_controller.dart';
import '../../providers/service_catalog_provider.dart';
import '../../models/service_package_model.dart';
import '../../../../../../shared/widgets/buttons/glass_close_button.dart';
import '../../../shared/widgets/buttons/advisor_primary_button.dart';

class AddServicePackageModal extends ConsumerStatefulWidget {
  const AddServicePackageModal({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      useRootNavigator: true,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      builder: (context) => const AddServicePackageModal(),
    );
  }

  @override
  ConsumerState<AddServicePackageModal> createState() =>
      _AddServicePackageModalState();
}

class _AddServicePackageModalState
    extends ConsumerState<AddServicePackageModal> {
  String selectedCategory = 'Tất cả';

  @override
  Widget build(BuildContext context) {
    final catalog = ref.watch(serviceCatalogProvider);
    final theme = Theme.of(context);

    final categories = [
      'Tất cả',
      ...catalog.map((e) => e.category).toSet(),
    ];
    final displayedPackages = selectedCategory == 'Tất cả'
        ? catalog
        : catalog.where((p) => p.category == selectedCategory).toList();

    // Apple §2: ShapeDecoration ngoài → ClipSmoothRect → BackdropFilter
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
        radius: SmoothBorderRadius(
          cornerRadius: 32,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Column(
            children: [
              // Drag Handle
              const SizedBox(height: 12),
              Center(
                child: Container(
                  width: 48,
                  height: 6,
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.3),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 3,
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Header row: Title + GlassCloseButton
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

              // Category filter chips
              SizedBox(
                height: 36,
                child: ListView.separated(
                  physics: const BouncingScrollPhysics(),
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  itemCount: categories.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    final cat = categories[index];
                    final isSelected = cat == selectedCategory;
                    return _CategoryChip(
                      title: cat.tr(),
                      isSelected: isSelected,
                      onTap: () {
                        HapticFeedback.selectionClick();
                        setState(() => selectedCategory = cat);
                      },
                    );
                  },
                ),
              ),
              const SizedBox(height: 16),

              // Divider
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Container(
                  height: 0.5,
                  color: Colors.white.withValues(alpha: 0.15),
                ),
              ),

              // Package list
              Expanded(
                child: ListView.separated(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.fromLTRB(24, 16, 24, 24),
                  itemCount: displayedPackages.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    return _ServicePackageCard(
                      package: displayedPackages[index],
                    );
                  },
                ),
              ),

              // Done button
              Padding(
                padding: EdgeInsets.fromLTRB(
                  24,
                  12,
                  24,
                  MediaQuery.of(context).padding.bottom > 0
                      ? MediaQuery.of(context).padding.bottom
                      : 24,
                ),
                child: AdvisorPrimaryButton(
                  onPressed: () => Navigator.of(context).pop(),
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

// ─────────────────────────────────────────────
// Category Filter Chip
// ─────────────────────────────────────────────
class _CategoryChip extends StatelessWidget {
  final String title;
  final bool isSelected;
  final VoidCallback onTap;

  const _CategoryChip({
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
            borderRadius: SmoothBorderRadius(
              cornerRadius: 20,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: isSelected
                  ? Colors.white.withValues(alpha: 0.55)
                  : Colors.white.withValues(alpha: 0.2),
              width: 0.5,
            ),
          ),
          shadows: isSelected
              ? [
                  BoxShadow(
                    color: theme.colorScheme.primary.withValues(alpha: 0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 3),
                  ),
                ]
              : [],
        ),
        child: AnimatedDefaultTextStyle(
          duration: const Duration(milliseconds: 200),
          style: theme.textTheme.labelLarge!.copyWith(
            color: isSelected
                ? Colors.white
                : theme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w600,
          ),
          child: Text(title),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────
// Service Package Card
// ─────────────────────────────────────────────
class _ServicePackageCard extends ConsumerWidget {
  final ServicePackageModel package;

  const _ServicePackageCard({required this.package});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isSelected = ref.watch(
      walkaroundControllerProvider.select(
        (state) => state.data.selectedPackages.any((p) => p.id == package.id),
      ),
    );
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.selectionClick();
        if (!isSelected) {
          controller.addPackage(package);
        } else {
          controller.removePackage(package.id);
        }
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutCubic,
        padding: const EdgeInsets.all(16),
        decoration: ShapeDecoration(
          // Apple §2: ShapeDecoration ngoài
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: isDark ? 0.15 : 0.12)
              : Colors.white.withValues(alpha: isDark ? 0.05 : 0.15),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: isSelected
                  ? theme.colorScheme.primary.withValues(alpha: 0.6)
                  : Colors.white.withValues(alpha: 0.2),
              width: 0.5,
            ),
          ),
          shadows: isSelected
              ? [
                  BoxShadow(
                    color: theme.colorScheme.primary.withValues(alpha: 0.15),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : [],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AnimatedDefaultTextStyle(
                    duration: const Duration(milliseconds: 200),
                    style: theme.textTheme.labelSmall!.copyWith(
                      color: isSelected
                          ? theme.colorScheme.primary
                          : theme.colorScheme.onSurfaceVariant,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.5,
                    ),
                    child: Text(package.category.tr()),
                  ),
                  const SizedBox(height: 4),
                  AnimatedDefaultTextStyle(
                    duration: const Duration(milliseconds: 200),
                    style: theme.textTheme.titleMedium!.copyWith(
                      color: isSelected
                          ? theme.colorScheme.onSurface
                          : theme.colorScheme.onSurface,
                      fontWeight: FontWeight.w600,
                    ),
                    child: Text(package.name.tr()),
                  ),
                ],
              ),
            ),
            // Squircle radio indicator
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 24,
              height: 24,
              decoration: ShapeDecoration(
                color: isSelected
                    ? theme.colorScheme.primary.withValues(alpha: 0.88)
                    : Colors.transparent,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 12,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: isSelected
                        ? theme.colorScheme.primary
                        : theme.colorScheme.outline,
                    width: 1.5,
                  ),
                ),
              ),
              child: isSelected
                  ? const Icon(
                      CupertinoIcons.checkmark_alt,
                      size: 14,
                      color: Colors.white,
                    )
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}
