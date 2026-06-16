import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/core/utils/theme_extension.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../models/contract_payload_model.dart';
import 'package:intl/intl.dart';

class PricingSummaryCard extends StatelessWidget {
  final ContractPricingSnapshotModel pricing;

  const PricingSummaryCard({
    super.key,
    required this.pricing,
  });

  String _formatCurrency(num value) {
    return NumberFormat.currency(locale: 'vi_VN', symbol: 'đ').format(value);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: 0.3),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                _buildPriceRow(
                  context,
                  'Giá niêm yết'.tr(),
                  pricing.listPrice,
                  isHighlight: false,
                ),
                const SizedBox(height: 12),
                _buildPriceRow(
                  context,
                  'Giảm giá'.tr(),
                  -pricing.discount,
                  isHighlight: false,
                  color: Colors.green,
                ),
                const SizedBox(height: 16),
                Container(
                  height: 1,
                  color: theme.colorScheme.onSurface.withValues(alpha: 0.1),
                ),
                const SizedBox(height: 16),
                _buildPriceRow(
                  context,
                  'Giá bán'.tr(),
                  pricing.salePrice,
                  isHighlight: true,
                ),
                const SizedBox(height: 12),
                _buildPriceRow(
                  context,
                  'Thuế VAT'.tr(),
                  pricing.vat,
                  isHighlight: false,
                ),
                const SizedBox(height: 12),
                _buildPriceRow(
                  context,
                  'Phí trước bạ'.tr(),
                  pricing.registrationFee,
                  isHighlight: false,
                ),
                const SizedBox(height: 12),
                _buildPriceRow(
                  context,
                  'Phí bảo hiểm'.tr(),
                  pricing.insuranceFee,
                  isHighlight: false,
                ),
                const SizedBox(height: 12),
                _buildPriceRow(
                  context,
                  'Phí khác'.tr(),
                  pricing.otherFees,
                  isHighlight: false,
                ),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: 0.1),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 16,
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Tổng lăn bánh'.tr(),
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                      Text(
                        _formatCurrency(pricing.grandTotal),
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          color: theme.colorScheme.primary,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPriceRow(
    BuildContext context,
    String label,
    num value, {
    required bool isHighlight,
    Color? color,
  }) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: isHighlight ? 15 : 14,
            fontWeight: isHighlight ? FontWeight.w600 : FontWeight.w400,
            color: theme.colorScheme.onSurface.withValues(alpha: isHighlight ? 1.0 : 0.6),
          ),
        ),
        Text(
          _formatCurrency(value),
          style: TextStyle(
            fontSize: isHighlight ? 16 : 14,
            fontWeight: isHighlight ? FontWeight.w700 : FontWeight.w500,
            color: color ?? theme.colorScheme.onSurface,
          ),
        ),
      ],
    );
  }
}
