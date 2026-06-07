import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../shared/widgets/toast/glass_toast.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../shared/glass_card.dart';
import '../components/quotation_part_card.dart';
import '../components/quotation_labor_card.dart';
import '../../constants/quotation_constants.dart';
import '../modals/part_search_modal/part_search_modal.dart';
import '../modals/labor_search_modal/labor_search_modal.dart';
import '../../utils/quotation_utils.dart';

class ServiceCartSection extends ConsumerWidget {
  final QuotationModel data;

  const ServiceCartSection({super.key, required this.data});

  void _showLaborChoice(BuildContext context, WidgetRef ref) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _LaborChoiceSheet(
        onCatalog: () {
          Navigator.pop(ctx);
          showModalBottomSheet(
            context: context,
            isScrollControlled: true,
            backgroundColor: Colors.transparent,
            builder: (c) => const LaborSearchModal(),
          );
        },
        onManual: () {
          Navigator.pop(ctx);
          showModalBottomSheet(
            context: context,
            isScrollControlled: true,
            backgroundColor: Colors.transparent,
            builder: (c) => ManualLaborSheet(
              onAdd: (desc, price, hours) {
                ref.read(quotationControllerProvider.notifier)
                    .addManualLabor(description: desc, price: price, hours: hours);
              },
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: Text(
            'Giỏ hàng dịch vụ'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: -0.3,
            ),
          ),
        ),
        const SizedBox(height: 16),

        if (data.parts.isNotEmpty)
          ...data.parts.map((part) => QuotationPartCard(
                part: part,
                onRemove: () => ref.read(quotationControllerProvider.notifier).removePart(part.id),
              )),

        if (data.labor.isNotEmpty)
          ...data.labor.map((labor) => QuotationLaborCard(
                labor: labor,
                onRemove: () => ref.read(quotationControllerProvider.notifier).removeLabor(labor.id),
              )),

        const SizedBox(height: 8),

        Padding(
          padding: const EdgeInsets.symmetric(
              horizontal: QuotationConstants.paddingHorizontal),
          child: Row(
            children: [
              Expanded(
                child: _AddButton(
                  isDark: isDark,
                  icon: CupertinoIcons.wrench_fill,
                  label: 'Phụ tùng'.tr(),
                  onTap: () {
                    HapticFeedback.mediumImpact();
                    showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      backgroundColor: Colors.transparent,
                      builder: (context) => const PartSearchModal(),
                    );
                  },
                  theme: theme,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _AddButton(
                  isDark: isDark,
                  icon: CupertinoIcons.person_fill,
                  label: 'Tiền công'.tr(),
                  onTap: () => _showLaborChoice(context, ref),
                  theme: theme,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _LaborChoiceSheet extends StatelessWidget {
  final VoidCallback onCatalog;
  final VoidCallback onManual;

  const _LaborChoiceSheet({required this.onCatalog, required this.onManual});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(height: 8),
          Container(
            width: 36, height: 4,
            decoration: BoxDecoration(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Text(
              'Thêm tiền công'.tr(),
              style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
            ),
          ),
          const SizedBox(height: 8),
          ListTile(
            leading: const Icon(CupertinoIcons.list_bullet),
            title: Text('Từ danh mục'.tr()),
            subtitle: Text('Chọn từ danh sách dịch vụ tiêu chuẩn'.tr()),
            onTap: onCatalog,
          ),
          ListTile(
            leading: const Icon(CupertinoIcons.pencil),
            title: Text('Nhập thủ công'.tr()),
            subtitle: Text('Tự nhập mô tả và đơn giá'.tr()),
            onTap: onManual,
          ),
          SizedBox(height: MediaQuery.of(context).padding.bottom + 8),
        ],
      ),
    );
  }
}

class ManualLaborSheet extends StatefulWidget {
  final void Function(String description, double price, double hours) onAdd;

  const ManualLaborSheet({super.key, required this.onAdd});

  @override
  State<ManualLaborSheet> createState() => _ManualLaborSheetState();
}

class _ManualLaborSheetState extends State<ManualLaborSheet> {
  final _descCtrl = TextEditingController();
  final _priceCtrl = TextEditingController();
  final _hoursCtrl = TextEditingController(text: '1');

  @override
  void dispose() {
    _descCtrl.dispose();
    _priceCtrl.dispose();
    _hoursCtrl.dispose();
    super.dispose();
  }

  void _submit() {
    final desc = _descCtrl.text.trim();
    final price = double.tryParse(_priceCtrl.text.replaceAll(',', '').replaceAll('.', '')) ?? 0;
    final hours = double.tryParse(_hoursCtrl.text) ?? 1;

    if (desc.isEmpty) return;
    if (price <= 0) return;

    widget.onAdd(desc, price, hours);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final bottom = MediaQuery.of(context).viewInsets.bottom;

    return Container(
      padding: EdgeInsets.fromLTRB(20, 16, 20, bottom + 24),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 36, height: 4,
              decoration: BoxDecoration(
                color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Nhập tiền công thủ công'.tr(),
            style: theme.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: _descCtrl,
            decoration: InputDecoration(
              labelText: 'Mô tả công việc'.tr(),
              border: const OutlineInputBorder(),
            ),
            textCapitalization: TextCapitalization.sentences,
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: TextField(
                  controller: _priceCtrl,
                  decoration: InputDecoration(
                    labelText: 'Đơn giá (₫)'.tr(),
                    border: const OutlineInputBorder(),
                  ),
                  keyboardType: TextInputType.number,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: TextField(
                  controller: _hoursCtrl,
                  decoration: InputDecoration(
                    labelText: 'Số giờ'.tr(),
                    border: const OutlineInputBorder(),
                  ),
                  keyboardType: const TextInputType.numberWithOptions(decimal: true),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: _submit,
              child: Text('Thêm'.tr()),
            ),
          ),
        ],
      ),
    );
  }
}

/// Nút "Thêm +" theo chuẩn §2: glass tinted với primary color
class _AddButton extends StatefulWidget {
  final bool isDark;
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final ThemeData theme;

  const _AddButton({
    required this.isDark,
    required this.icon,
    required this.label,
    required this.onTap,
    required this.theme,
  });

  @override
  State<_AddButton> createState() => _AddButtonState();
}

class _AddButtonState extends State<_AddButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final primary = widget.theme.colorScheme.primary;

    return GestureDetector(
      onTapDown: (_) {
        HapticFeedback.selectionClick();
        setState(() => _pressed = true);
      },
      onTapUp: (_) {
        setState(() => _pressed = false);
        widget.onTap();
      },
      onTapCancel: () => setState(() => _pressed = false),
      behavior: HitTestBehavior.opaque,
      child: AnimatedScale(
        scale: _pressed ? 0.95 : 1.0,
        duration: const Duration(milliseconds: 150),
        curve: Curves.easeOutCubic,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: ShapeDecoration(
            // Tinted glass: primary alpha tint
            color: primary.withValues(alpha: widget.isDark ? 0.12 : 0.08),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 16,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: primary.withValues(alpha: widget.isDark ? 0.35 : 0.25),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 16,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(widget.icon, color: primary, size: 16),
                  const SizedBox(width: 6),
                  Icon(CupertinoIcons.add, color: primary, size: 14),
                  const SizedBox(width: 6),
                  Text(
                    widget.label,
                    style: widget.theme.textTheme.bodyMedium?.copyWith(
                      color: primary,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.1,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
