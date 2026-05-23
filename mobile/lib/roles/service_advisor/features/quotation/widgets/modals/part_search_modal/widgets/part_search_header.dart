import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../controllers/part_search_controller.dart';
import '../../../../../../../../shared/widgets/toast/glass_toast.dart';

class PartSearchHeader extends ConsumerWidget {
  const PartSearchHeader({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.08 : 0.15),
            width: 0.5,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Tìm kiếm phụ tùng'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: Container(
                  height: 44,
                  decoration: ShapeDecoration(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.06)
                        : Colors.black.withValues(alpha: 0.05),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 14,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.40),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                        cornerRadius: 14, cornerSmoothing: 1.0),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                      child: TextField(
                        onChanged: (val) => ref
                            .read(partSearchControllerProvider.notifier)
                            .search(val),
                        style: theme.textTheme.bodyMedium,
                        decoration: InputDecoration(
                          hintText: 'Tìm tên hoặc mã phụ tùng...'.tr(),
                          hintStyle: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant
                                .withValues(alpha: 0.5),
                          ),
                          prefixIcon: Icon(
                            CupertinoIcons.search,
                            color: theme.colorScheme.onSurfaceVariant
                                .withValues(alpha: 0.5),
                            size: 18,
                          ),
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 12),
                          filled: true,
                          fillColor: Colors.transparent,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              GestureDetector(
                onTap: () => GlassToast.show(
                  context,
                  title: 'Scanner không khả dụng ở Demo',
                  icon: CupertinoIcons.barcode_viewfinder,
                ),
                child: Container(
                  width: 44,
                  height: 44,
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: 0.10),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 14,
                        cornerSmoothing: 1.0,
                      ),
                      side: BorderSide(
                        color: theme.colorScheme.primary.withValues(alpha: 0.25),
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: ClipSmoothRect(
                    radius: SmoothBorderRadius(
                        cornerRadius: 14, cornerSmoothing: 1.0),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                      child: Center(
                        child: Icon(
                          CupertinoIcons.barcode_viewfinder,
                          color: theme.colorScheme.primary,
                          size: 20,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
