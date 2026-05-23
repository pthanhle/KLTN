import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../controllers/labor_search_controller.dart';
import 'labor_category_chip.dart';

class LaborSearchHeader extends ConsumerWidget {
  const LaborSearchHeader({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(laborSearchControllerProvider);
    final notifier = ref.read(laborSearchControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    final categories = notifier.getCategories();

    return Column(
      children: [
        // Title & Close Button
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () => Navigator.of(context).pop(),
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
                    color: theme.colorScheme.onSurface,
                  ),
                ),
              ),
              Text(
                'Chọn công việc'.tr(),
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w700,
                  color: theme.colorScheme.primary,
                ),
              ),
              const SizedBox(width: 32), // Spacer for balance
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Search Bar
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Container(
            height: 48,
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF1C1C1E) : theme.colorScheme.surfaceContainerHigh.withValues(alpha: 0.8),
              borderRadius: BorderRadius.circular(24),
            ),
            child: TextField(
              onChanged: notifier.search,
              style: theme.textTheme.bodyMedium,
              decoration: InputDecoration(
                hintText: 'Tìm kiếm công việc...'.tr(),
                hintStyle: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
                prefixIcon: Padding(
                  padding: const EdgeInsets.only(left: 8),
                  child: Icon(
                    CupertinoIcons.search,
                    color: theme.colorScheme.onSurfaceVariant,
                    size: 20,
                  ),
                ),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),

        // Category Chips (Horizontal Scroll)
        SizedBox(
          height: 36,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 24),
            itemCount: categories.length,
            separatorBuilder: (_, __) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final cat = categories[index];
              return LaborCategoryChip(
                label: cat,
                isSelected: state.selectedCategory == cat,
                onTap: () => notifier.setCategory(cat),
              );
            },
          ),
        ),
        const SizedBox(height: 8),
      ],
    );
  }
}
