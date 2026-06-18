import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';
import 'package:ttauto_staff/shared/widgets/toast/glass_toast.dart';
import '../../controllers/contract_builder_controller.dart';
import 'components/review_row.dart';
import 'components/review_section.dart';

class ContractReviewSheet extends ConsumerWidget {
  const ContractReviewSheet({super.key});

  static Future<void> show(BuildContext context) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      useRootNavigator: true,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      builder: (context) => const ContractReviewSheet(),
    );
  }

  String _formatCurrency(num value) {
    return NumberFormat.currency(locale: 'vi_VN', symbol: 'đ').format(value);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final state = ref.watch(contractBuilderControllerProvider);
    final controller = ref.read(contractBuilderControllerProvider.notifier);

    final payload = state.payload;
    if (payload == null) {
      return const SizedBox();
    }

    final customer = payload.customerSnapshot;
    final vehicle = payload.vehicleSnapshot;
    final pricing = payload.pricingSnapshot;

    return DraggableScrollableSheet(
      initialChildSize: 0.85,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      expand: false,
      builder: (context, scrollController) {
        return Container(
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.04)
                : Colors.white.withValues(alpha: 0.65),
            shape: SmoothRectangleBorder(
              borderRadius: const SmoothBorderRadius.vertical(
                top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: const SmoothBorderRadius.vertical(
              top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
              child: Column(
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 12, bottom: 8),
                    width: 36,
                    height: 4,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.20),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Xác nhận Hợp đồng'.tr(),
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            letterSpacing: -0.5,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => Navigator.of(context).pop(),
                          child: Container(
                            width: 32, height: 32,
                            decoration: ShapeDecoration(
                              color: isDark
                                  ? Colors.white.withValues(alpha: 0.08)
                                  : Colors.black.withValues(alpha: 0.05),
                              shape: SmoothRectangleBorder(
                                borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                                side: BorderSide(
                                  color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.50),
                                  width: 0.5,
                                ),
                              ),
                            ),
                            child: ClipSmoothRect(
                              radius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
                              child: BackdropFilter(
                                filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                                child: Center(
                                  child: Icon(
                                    CupertinoIcons.xmark,
                                    size: 14,
                                    color: theme.colorScheme.onSurface.withValues(alpha: 0.70),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 8),
                  Expanded(
                    child: SingleChildScrollView(
                      controller: scrollController,
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          ReviewSection(
                            title: 'Khách hàng'.tr(),
                            children: [
                              ReviewRow(label: 'Họ tên'.tr(), value: customer.fullName ?? ''),
                              ReviewRow(label: 'Điện thoại'.tr(), value: customer.phone ?? ''),
                              if (customer.idNumber != null && customer.idNumber!.isNotEmpty)
                                ReviewRow(label: 'CCCD'.tr(), value: customer.idNumber!),
                              if (customer.address != null && customer.address!.isNotEmpty)
                                ReviewRow(label: 'Địa chỉ'.tr(), value: customer.address!),
                            ],
                          ),
                          const SizedBox(height: 24),
                          ReviewSection(
                            title: 'Xe giao dịch'.tr(),
                            children: [
                              ReviewRow(label: 'Mẫu xe'.tr(), value: vehicle.name ?? ''),
                              ReviewRow(label: 'Màu xe'.tr(), value: vehicle.color ?? ''),
                              ReviewRow(label: 'Số VIN'.tr(), value: vehicle.vin ?? ''),
                            ],
                          ),
                          const SizedBox(height: 24),
                          ReviewSection(
                            title: 'Bảng giá & Chi phí'.tr(),
                            children: [
                              ReviewRow(label: 'Giá niêm yết'.tr(), value: _formatCurrency(pricing.listPrice)),
                              ReviewRow(label: 'Giảm giá'.tr(), value: '-${_formatCurrency(pricing.discount)}'),
                              ReviewRow(label: 'Giá bán'.tr(), value: _formatCurrency(pricing.salePrice), isHighlight: true),
                              const SizedBox(height: 8),
                              Container(height: 1, color: theme.colorScheme.onSurface.withValues(alpha: 0.1)),
                              const SizedBox(height: 8),
                              ReviewRow(label: 'Thuế VAT'.tr(), value: _formatCurrency(pricing.vat)),
                              ReviewRow(label: 'Phí trước bạ'.tr(), value: _formatCurrency(pricing.registrationFee)),
                              ReviewRow(label: 'Phí bảo hiểm'.tr(), value: _formatCurrency(pricing.insuranceFee)),
                              ReviewRow(label: 'Phí khác'.tr(), value: _formatCurrency(pricing.otherFees)),
                              const SizedBox(height: 8),
                              Container(height: 1, color: theme.colorScheme.onSurface.withValues(alpha: 0.1)),
                              const SizedBox(height: 8),
                              ReviewRow(label: 'TỔNG LĂN BÁNH'.tr(), value: _formatCurrency(pricing.grandTotal), isHighlight: true),
                            ],
                          ),
                          const SizedBox(height: 40),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.only(
                      top: 16,
                      left: 24,
                      right: 24,
                      bottom: MediaQuery.of(context).padding.bottom + 16,
                    ),
                    decoration: BoxDecoration(
                      border: Border(
                        top: BorderSide(color: theme.colorScheme.onSurface.withValues(alpha: 0.1), width: 0.5),
                      ),
                    ),
                    child: LiquidButton(
                      isLoading: state.isSubmitting,
                      onPressed: () async {
                        final success = await controller.submitContract();
                        if (success && context.mounted) {
                          GlassToast.show(
                            context,
                            title: 'Thành công'.tr(),
                            subtitle: 'Đã gửi hợp đồng lên hệ thống thành công. Đang chờ Admin duyệt.'.tr(),
                            icon: CupertinoIcons.checkmark_seal_fill,
                            color: CupertinoColors.activeGreen,
                          );
                          Navigator.of(context).popUntil((route) => route.isFirst);
                        }
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Tạo Hợp Đồng'.tr(),
                            style: const TextStyle(fontWeight: FontWeight.w700, letterSpacing: -0.4),
                          ),
                          const SizedBox(width: 8),
                          const Icon(CupertinoIcons.checkmark_seal_fill, size: 18, color: Colors.white),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
