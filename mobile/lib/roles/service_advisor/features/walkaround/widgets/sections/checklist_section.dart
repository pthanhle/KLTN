import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../controllers/walkaround_controller.dart';
import '../components/checklist/checklist_item_row.dart';
import '../components/checklist/checklist_add_button.dart';
import '../modals/add_custom_asset_modal.dart';
import '../modals/signature_pad_modal.dart';
import 'dart:convert';

class ChecklistSection extends ConsumerWidget {
  const ChecklistSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(walkaroundControllerProvider);
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Kiểm tra & Xác nhận'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            decoration: ShapeDecoration(
              color: isDark 
                  ? Colors.white.withValues(alpha: 0.05)
                  : theme.colorScheme.surfaceContainerLowest.withValues(alpha: 0.6),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(
                  cornerRadius: 16,
                  cornerSmoothing: 1.0,
                ),
                side: BorderSide(
                  color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
                  width: 1,
                ),
              ),
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: Column(
                  children: [
                    ...state.data.checklist.asMap().entries.map((entry) {
                      final index = entry.key;
                      final item = entry.value;
                      final isCustom = int.tryParse(item.id) == null || int.parse(item.id) > 1000; // Mock check for custom item (id > 1000 or uuid)
                      
                      return ChecklistItemRow(
                        item: item,
                        onChanged: (val) => controller.toggleChecklist(item.id, val),
                        onRemove: isCustom ? () => controller.removeChecklistItem(item.id) : null,
                      );
                    }),
                    ChecklistAddButton(
                      onTap: () async {
                        final name = await AddCustomAssetModal.show(context);
                        if (name != null && name.isNotEmpty) {
                          controller.addCustomChecklistItem(name);
                        }
                      },
                    ),
                  ],
                ),
              ),
            ),
          ),

          const SizedBox(height: 32),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                'Chữ ký khách hàng'.tr(),
                style: theme.textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.w600),
              ),
              if (state.data.signatureData != null)
                GestureDetector(
                  onTap: () => controller.setSignature(''),
                  child: Text(
                    'Xóa'.tr(),
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: theme.colorScheme.error,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 12),
          
          GestureDetector(
            onTap: () async {
              final signature = await SignaturePadModal.show(context);
              if (signature != null && signature.isNotEmpty) {
                controller.setSignature(signature);
              }
            },
            child: Container(
              height: 160,
              width: double.infinity,
              decoration: ShapeDecoration(
                color: isDark 
                    ? Colors.white.withValues(alpha: 0.05)
                    : theme.colorScheme.surfaceContainerLowest,
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 16,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: state.data.signatureData != null && state.data.signatureData!.isNotEmpty
                        ? theme.colorScheme.primary.withValues(alpha: 0.5)
                        : theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
                    width: 1,
                  ),
                ),
                shadows: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.02),
                    blurRadius: 8,
                    offset: const Offset(0, 0),
                  )
                ],
              ),
                  child: state.data.signatureData != null && state.data.signatureData!.isNotEmpty
                      ? ClipSmoothRect(
                          radius: SmoothBorderRadius(
                            cornerRadius: 16,
                            cornerSmoothing: 1.0,
                          ),
                          child: Image.memory(
                            base64Decode(state.data.signatureData!),
                            fit: BoxFit.contain,
                          ),
                        )
                  : Center(
                      child: Text(
                        'Ký vào đây'.tr(),
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.outline,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
            ),
          ),
          
          const SizedBox(height: 120),
        ],
      ),
    );
  }
}
