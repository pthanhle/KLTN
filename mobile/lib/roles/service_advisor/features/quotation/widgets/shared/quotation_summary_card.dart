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
  final bool canSubmit;
  final String? lockedHint;

  const QuotationSummaryCard({super.key, required this.data, this.canSubmit = true, this.lockedHint});

  @override
  ConsumerState<QuotationSummaryCard> createState() => _QuotationSummaryCardState();
}

class _QuotationSummaryCardState extends ConsumerState<QuotationSummaryCard> {
  bool _isSubmitting = false;

  Future<void> _handleSubmit(BuildContext context) async {
    if (_isSubmitting || !widget.canSubmit) return;
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
      child: Opacity(
        opacity: widget.canSubmit ? 1.0 : 0.4,
        child: IgnorePointer(
        ignoring: !widget.canSubmit,
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
                  if (!widget.canSubmit && widget.lockedHint != null) ...[
                    const SizedBox(height: 10),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.errorContainer.withValues(alpha: 0.4),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.lock_outline, size: 16, color: theme.colorScheme.onErrorContainer),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              widget.lockedHint!,
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: theme.colorScheme.onErrorContainer,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                  const SizedBox(height: 16),

                  // Summary rows
                  _buildRow(theme, 'Gói dịch vụ'.tr(), data.servicePackageTotal),
                  const SizedBox(height: 8),
                  _buildRow(theme, 'Phụ tùng'.tr(), data.partsTotal),
                  const SizedBox(height: 8),
                  _buildRow(theme, 'Tiền công'.tr(), data.laborTotal),
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
                  const SizedBox(height: 12),

                  // Deposit (50%)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: theme.colorScheme.primary.withValues(alpha: 0.25),
                        width: 0.5,
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Cọc trước (50%)'.tr(),
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          QuotationUtils.formatCurrency(data.depositAmount),
                          style: theme.textTheme.bodyLarge?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  LiquidButton(
                    isLoading: _isSubmitting,
                    isGlass: false,
                    onPressed: (_isSubmitting || !widget.canSubmit) ? null : () => _handleSubmit(context),
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
        ),
      ),
    );
  }

  Widget _buildRow(ThemeData theme, String label, double amount, {Color? color, bool isReadOnly = false}) {
    final effectiveColor = color ?? theme.colorScheme.onSurfaceVariant;
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Text(
              label,
              style: theme.textTheme.bodyMedium?.copyWith(color: effectiveColor),
            ),
            if (isReadOnly) ...[
              const SizedBox(width: 4),
              Icon(Icons.lock_outline, size: 12, color: effectiveColor.withValues(alpha: 0.5)),
            ],
          ],
        ),
        Text(
          QuotationUtils.formatCurrency(amount),
          style: theme.textTheme.bodyMedium?.copyWith(
            color: effectiveColor,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
