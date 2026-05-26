import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../controllers/supplement_controller.dart';
import '../../../data/supplement_mock_data.dart';
import '../../../constants/supplement_ui_constants.dart';
import 'labor_picker_catalog_item.dart';

class LaborPickerSheet extends ConsumerWidget {
  const LaborPickerSheet({super.key});

  static Future<void> show(BuildContext context) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.5),
      builder: (context) => const LaborPickerSheet(),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final controller = ref.read(supplementControllerProvider.notifier);

    return Material(
      type: MaterialType.transparency,
      child: Container(
        height: MediaQuery.of(context).size.height * 0.8,
        decoration: ShapeDecoration(
          color: theme.colorScheme.surface.withValues(alpha: isDark ? 0.72 : 0.85),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: SupplementUiConstants.cardRadius,
              cornerSmoothing: 1.0,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: SupplementUiConstants.cardRadius,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(
              sigmaX: SupplementUiConstants.sheetBlurSigma, 
              sigmaY: SupplementUiConstants.sheetBlurSigma,
            ),
            child: Column(
              children: [
                // Drag handle
                Center(
                  child: Container(
                    margin: const EdgeInsets.only(top: 12, bottom: 12),
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                
                // Header
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Danh mục Tiền công'.tr(),
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.5,
                        ),
                      ),
                      CupertinoButton(
                        padding: EdgeInsets.zero,
                        onPressed: () => Navigator.of(context).pop(),
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: ShapeDecoration(
                            color: theme.colorScheme.onSurface.withValues(alpha: 0.05),
                            shape: const CircleBorder(),
                          ),
                          child: Icon(
                            CupertinoIcons.xmark,
                            size: 20,
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Search bar placeholder (could be extracted to atomic component)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                  child: CupertinoSearchTextField(
                    placeholder: 'Tìm kiếm theo tên, mã công...'.tr(),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ),
                
                const SizedBox(height: 8),
                
                // List
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                    itemCount: mockMasterLaborsCatalog.length,
                    itemBuilder: (context, index) {
                      final labor = mockMasterLaborsCatalog[index];
                      return LaborPickerCatalogItem(
                        labor: labor,
                        onAdd: () {
                          controller.addLabor(labor);
                          // Navigator.of(context).pop(); // Keep open to add multiple? 
                        },
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
