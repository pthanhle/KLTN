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

class ServiceCartSection extends ConsumerWidget {
  final QuotationModel data;

  const ServiceCartSection({super.key, required this.data});

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
          ...data.parts.map((part) => QuotationPartCard(part: part)),

        if (data.labor.isNotEmpty)
          ...data.labor.map((labor) => QuotationLaborCard(labor: labor)),

        const SizedBox(height: 8),

        // 2 nút Thêm — Liquid Glass tinted
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
                  onTap: () => GlassToast.show(
                    context,
                    title: 'Đang mở kho phụ tùng...'.tr(),
                    icon: CupertinoIcons.cube_box,
                  ),
                  theme: theme,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _AddButton(
                  isDark: isDark,
                  icon: CupertinoIcons.person_fill,
                  label: 'Tiền công'.tr(),
                  onTap: () => GlassToast.show(
                    context,
                    title: 'Đang mở danh sách kỹ thuật...'.tr(),
                    icon: CupertinoIcons.person_2_fill,
                  ),
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
