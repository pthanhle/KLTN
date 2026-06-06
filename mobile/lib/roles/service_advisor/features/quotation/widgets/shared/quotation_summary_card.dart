import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../shared/widgets/buttons/liquid_button.dart';
import '../../../../../../shared/widgets/toast/glass_toast.dart';
import '../../controllers/quotation_controller.dart';
import '../../models/quotation_model.dart';
import '../../constants/quotation_constants.dart';
import '../../utils/quotation_utils.dart';

class QuotationSummaryCard extends ConsumerStatefulWidget {
  final QuotationModel data;

  const QuotationSummaryCard({super.key, required this.data});

  @override
  ConsumerState<QuotationSummaryCard> createState() => _QuotationSummaryCardState();
}

class _QuotationSummaryCardState extends ConsumerState<QuotationSummaryCard> {
  bool _isSubmitting = false;

  Future<void> _handleSubmit(BuildContext context) async {
    if (_isSubmitting) return;
    HapticFeedback.mediumImpact();
    setState(() => _isSubmitting = true);
    try {
      await ref.read(quotationControllerProvider.notifier).submitQuotation();
      if (context.mounted) {
        GlassToast.show(context, title: 'Đã gửi báo giá!'.tr(), icon: CupertinoIcons.check_mark_circled);
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (context.mounted) {
        GlassToast.show(context, title: e.toString().replaceFirst('Exception: ', ''), icon: CupertinoIcons.xmark_circle);
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final data = widget.data;

    return Padding(
      padding: const EdgeInsets.symmetric(
          horizontal: QuotationConstants.paddingHorizontal),
      child: Container(
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.05)
              : theme.colorScheme.surface.withValues(alpha: 0.72),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 28,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.45),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.25 : 0.06),
              blurRadius: 30,
              offset: const Offset(0, 10),
            ),
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.08 : 0.03),
              blurRadius: 8,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 28,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Section title
                  Text(
                    'Tổng kết báo giá'.tr(),
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.3,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Summary rows
                  _buildRow(theme, 'Phụ tùng'.tr(), data.partsTotal),
                  const SizedBox(height: 8),
                  _buildRow(theme, 'Tiền công'.tr(), data.laborTotal),
                  const SizedBox(height: 8),
                  _buildRow(
                    theme,
                    'Giảm giá'.tr(),
                    -data.discountAmount,
                    color: theme.colorScheme.error,
                  ),
                  const SizedBox(height: 8),
                  _buildRow(theme, 'VAT (10%)'.tr(), data.vatAmount),
                  const SizedBox(height: 16),

                  // Divider
                  Container(
                    height: 0.5,
                    color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.3),
                  ),
                  const SizedBox(height: 16),

                  // Grand total
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.end,
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

                  LiquidButton(
                    isLoading: _isSubmitting,
                    isGlass: false,
                    onPressed: _isSubmitting ? null : () => _handleSubmit(context),
                    child: Text(
                      _isSubmitting ? 'Đang gửi...'.tr() : 'Trình Duyệt Báo Giá'.tr(),
                      style: theme.textTheme.bodyLarge?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.2,
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

  Widget _buildRow(ThemeData theme, String label, double amount, {Color? color}) {
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
