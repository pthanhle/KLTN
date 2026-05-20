import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../controllers/walkaround_controller.dart';
import '../../providers/service_catalog_provider.dart';
import '../../models/service_package_model.dart';

class AddServicePackageModal extends ConsumerStatefulWidget {
  const AddServicePackageModal({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => const AddServicePackageModal(),
    );
  }

  @override
  ConsumerState<AddServicePackageModal> createState() => _AddServicePackageModalState();
}

class _AddServicePackageModalState extends ConsumerState<AddServicePackageModal> {
  String selectedCategory = 'Tất cả';

  @override
  Widget build(BuildContext context) {
    final catalog = ref.watch(serviceCatalogProvider);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final categories = ['Tất cả', ...catalog.map((e) => e.category).toSet()];
    final displayedPackages = selectedCategory == 'Tất cả'
        ? catalog
        : catalog.where((p) => p.category == selectedCategory).toList();

    return Container(
      height: MediaQuery.of(context).size.height * 0.75,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
        border: Border(
          top: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3),
            width: 0.5,
          ),
        ),
      ),
      child: Column(
            children: [
              const SizedBox(height: 12),
              _buildDragIndicator(theme),
              const SizedBox(height: 16),
              _buildHeader(context, theme),
              const SizedBox(height: 8),
              _buildCategoryFilters(categories, theme),
              const SizedBox(height: 12),
              const Divider(height: 1),
              Expanded(
                child: ListView.separated(
                  physics: const BouncingScrollPhysics(),
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                  itemCount: displayedPackages.length,
                  separatorBuilder: (context, index) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final pkg = displayedPackages[index];
                    
                    return _ServicePackageCard(
                      package: pkg,
                    );
                  },
                ),
              ),
            ],
          ),
    );
  }

  Widget _buildDragIndicator(ThemeData theme) {
    return Container(
      width: 40,
      height: 4,
      decoration: BoxDecoration(
        color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Thêm gói dịch vụ'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                CupertinoIcons.xmark,
                size: 16,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryFilters(List<String> categories, ThemeData theme) {
    return SizedBox(
      height: 40,
      child: ListView.separated(
        physics: const BouncingScrollPhysics(),
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: categories.length,
        separatorBuilder: (context, index) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final cat = categories[index];
          return _CategoryFilterChip(
            title: cat.tr(),
            isSelected: cat == selectedCategory,
            onTap: () {
              setState(() {
                selectedCategory = cat;
              });
            },
          );
        },
      ),
    );
  }
}

class _CategoryFilterChip extends StatelessWidget {
  final String title;
  final bool isSelected;
  final VoidCallback onTap;

  const _CategoryFilterChip({
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
          color: isSelected ? theme.colorScheme.primary : theme.colorScheme.surfaceContainerHighest,
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 20,
              cornerSmoothing: 1.0,
            ),
          ),
        ),
        child: Center(
          child: AnimatedDefaultTextStyle(
            duration: const Duration(milliseconds: 200),
            style: theme.textTheme.labelLarge!.copyWith(
              color: isSelected ? theme.colorScheme.onPrimary : theme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w600,
            ),
            child: Text(title),
          ),
        ),
      ),
    );
  }
}

class _ServicePackageCard extends ConsumerWidget {
  final ServicePackageModel package;

  const _ServicePackageCard({
    required this.package,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Tối ưu hóa: Chỉ rebuild Card NÀY khi package của nó được thêm/xóa
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
        decoration: BoxDecoration(
          color: isSelected 
              ? theme.colorScheme.primaryContainer.withValues(alpha: 0.3)
              : (isDark ? Colors.white.withValues(alpha: 0.05) : theme.colorScheme.surfaceContainerLowest),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected 
                ? theme.colorScheme.primary 
                : theme.colorScheme.outlineVariant.withValues(alpha: 0.3),
            width: 1,
          ),
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
                      color: isSelected ? theme.colorScheme.primary : theme.colorScheme.onSurfaceVariant,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.5,
                    ),
                    child: Text(package.category.tr()),
                  ),
                  const SizedBox(height: 4),
                  AnimatedDefaultTextStyle(
                    duration: const Duration(milliseconds: 200),
                    style: theme.textTheme.titleMedium!.copyWith(
                      color: isSelected ? theme.colorScheme.primary : theme.colorScheme.onSurface,
                      fontWeight: FontWeight.w600,
                    ),
                    child: Text(package.name.tr()),
                  ),
                ],
              ),
            ),
            AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected ? theme.colorScheme.primary : theme.colorScheme.outline,
                  width: 2,
                ),
                color: isSelected ? theme.colorScheme.primary : Colors.transparent,
              ),
              child: isSelected 
                ? Icon(CupertinoIcons.checkmark_alt, size: 16, color: theme.colorScheme.onPrimary)
                : null,
            ),
          ],
        ),
      ),
    );
  }
}
