import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 4, 20, 0),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  'Chọn công việc'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                    letterSpacing: -0.5,
                  ),
                ),
              ),
              GestureDetector(
                onTap: () => Navigator.of(context).pop(),
                child: Container(
                  width: 32,
                  height: 32,
                  decoration: ShapeDecoration(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.08)
                        : Colors.black.withValues(alpha: 0.05),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                          cornerRadius: 10, cornerSmoothing: 1.0),
                      side: BorderSide(
                        color: Colors.white
                            .withValues(alpha: isDark ? 0.12 : 0.50),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                        cornerRadius: 10, cornerSmoothing: 1.0),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                      child: Center(
                        child: Icon(
                          CupertinoIcons.xmark,
                          size: 14,
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.70),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Container(
            height: 44,
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.06)
                  : Colors.black.withValues(alpha: 0.05),
              shape: SmoothRectangleBorder(
                borderRadius:
                    SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
                side: BorderSide(
                  color:
                      Colors.white.withValues(alpha: isDark ? 0.10 : 0.40),
                  width: 0.5,
                ),
              ),
            ),
            child: ClipSmoothRect(
              radius:
                  SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                child: TextField(
                  onChanged: notifier.search,
                  style: theme.textTheme.bodyMedium,
                  decoration: InputDecoration(
                    hintText: 'Tìm kiếm công việc...'.tr(),
                    hintStyle: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant
                          .withValues(alpha: 0.50),
                    ),
                    prefixIcon: Icon(
                      CupertinoIcons.search,
                      color: theme.colorScheme.onSurfaceVariant
                          .withValues(alpha: 0.50),
                      size: 18,
                    ),
                    border: InputBorder.none,
                    filled: true,
                    fillColor: Colors.transparent,
                    contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16, vertical: 12),
                  ),
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 34,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
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
