import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../shared/widgets/buttons/liquid_button.dart';
import '../../../../../../shared/widgets/buttons/glass_close_button.dart';
import '../../../../../../shared/widgets/toast/glass_toast.dart';
import '../../models/quotation_model.dart';
import '../../constants/quotation_constants.dart';
import '../../utils/quotation_utils.dart';
import '../../controllers/quotation_controller.dart';

class QuotationBottomSheet extends ConsumerWidget {
  final QuotationModel data;

  const QuotationBottomSheet({super.key, required this.data});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: ShapeDecoration(
        // §2: ShapeDecoration ngoài → ClipSmoothRect → BackdropFilter
        color: isDark
            ? Colors.white.withValues(alpha: 0.04)
            : theme.colorScheme.surface.withValues(alpha: 0.72),
        shape: SmoothRectangleBorder(
          borderRadius: const SmoothBorderRadius.only(
            topLeft: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            topRight: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.45),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.40 : 0.12),
            blurRadius: 40,
            offset: const Offset(0, -8),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.08 : 0.04),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: const SmoothBorderRadius.only(
          topLeft: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          topRight: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: SafeArea(
            top: false,
            child: Padding(
              padding: const EdgeInsets.only(
                top: 16,
                left: 24,
                right: 24,
                bottom: 24,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // §6: Drag Handle chuẩn iOS
                  Container(
                    width: 48,
                    height: 6,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.25),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Summary rows
                  _buildSummaryRow(theme, 'Phụ tùng'.tr(), data.partsTotal),
                  const SizedBox(height: 8),
                  _buildSummaryRow(theme, 'Tiền công'.tr(), data.laborTotal),
                  const SizedBox(height: 8),
                  _buildSummaryRow(
                    theme,
                    'Giảm giá'.tr(),
                    -data.discountAmount,
                    color: theme.colorScheme.error,
                  ),
                  const SizedBox(height: 8),
                  _buildSummaryRow(theme, 'VAT (10%)'.tr(), data.vatAmount),
                  const SizedBox(height: 16),

                  // Divider
                  Container(
                    height: 0.5,
                    color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.3),
                  ),
                  const SizedBox(height: 16),

                  // Tổng cộng
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Tổng cộng'.tr(),
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      Text(
                        QuotationUtils.formatCurrency(data.grandTotal),
                        style: theme.textTheme.headlineSmall?.copyWith(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // §10: CTA — LiquidButton với Vibrant Solid Glow
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: LiquidButton(
                      isLoading: false,
                      isGlass: false,
                      onPressed: () {
                        HapticFeedback.mediumImpact();
                        GlassToast.show(
                          context,
                          title: 'Đã gửi báo giá!'.tr(),
                          icon: CupertinoIcons.check_mark_circled,
                        );
                      },
                      child: Text(
                        'Trình Duyệt Báo Giá'.tr(),
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.2,
                        ),
                      ),
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

  Widget _buildSummaryRow(ThemeData theme, String label, double amount,
      {Color? color}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: color ?? theme.colorScheme.onSurfaceVariant,
          ),
        ),
        Text(
          QuotationUtils.formatCurrency(amount),
          style: theme.textTheme.bodyMedium?.copyWith(
            color: color ?? theme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
