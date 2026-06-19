import 'dart:ui';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../core/utils/theme_extension.dart';
import '../../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../../shared/widgets/images/glass_image_viewer.dart';
import '../models/vehicle_contract_list_model.dart';
import '../utils/contract_formatters.dart';
import '../widgets/atoms/contract_status_badge.dart';

class ContractDetailPage extends StatelessWidget {
  final VehicleContractListModel contract;

  const ContractDetailPage({super.key, required this.contract});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          // Background: same mesh style
          Stack(
            children: [
              Container(
                color: isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
              ),
              Positioned(
                top: -80,
                right: -60,
                child: Container(
                  width: 300,
                  height: 300,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.secondary
                        .withValues(alpha: isDark ? 0.12 : 0.08),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
              Positioned(
                bottom: -80,
                left: -60,
                child: Container(
                  width: 350,
                  height: 350,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary
                        .withValues(alpha: isDark ? 0.10 : 0.07),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
              Positioned.fill(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
                  child: Container(color: Colors.transparent),
                ),
              ),
            ],
          ),

          // Content
          CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              // NavBar
              CupertinoSliverNavigationBar(
                largeTitle: Text(
                  'Chi tiết Hợp đồng'.tr(),
                  style: TextStyle(
                    fontFamily: theme.textTheme.headlineLarge?.fontFamily,
                    fontWeight: FontWeight.w800,
                    letterSpacing: -0.5,
                    color: context.colors.onSurface,
                  ),
                ),
                backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.6),
                border: null,
                leading: GlassNavBackButton(),
              ),

              SliverPadding(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 120),
                sliver: SliverList(
                  delegate: SliverChildListDelegate([
                    // Status section
                    _SectionLabel(label: 'Trạng thái'),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        ContractStatusBadge(status: contract.status),
                      ],
                    ),
                    if (contract.status == 'cancelled' && contract.note != null) ...[
                      const SizedBox(height: 10),
                      _GlassCard(
                        isDark: isDark,
                        child: Row(
                          children: [
                            Icon(CupertinoIcons.info_circle,
                                size: 16,
                                color: Colors.red.shade400),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                'Lý do: ${contract.note}',
                                style: TextStyle(
                                  fontSize: 13,
                                  color: Colors.red.shade400,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                    const SizedBox(height: 24),

                    // Customer
                    _SectionLabel(label: 'Khách hàng'),
                    const SizedBox(height: 8),
                    _GlassCard(
                      isDark: isDark,
                      child: Column(
                        children: [
                          _InfoRow(
                            label: 'Họ tên',
                            value: contract.customerSnapshot?.fullName ?? '—',
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Số điện thoại',
                            value: contract.customerSnapshot?.phone ?? '—',
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Email',
                            value: contract.customerSnapshot?.email ?? '—',
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Địa chỉ',
                            value: contract.customerSnapshot?.address ?? '—',
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Vehicle
                    _SectionLabel(label: 'Thông tin xe'),
                    const SizedBox(height: 8),
                    _GlassCard(
                      isDark: isDark,
                      child: Column(
                        children: [
                          _InfoRow(
                            label: 'Mẫu xe',
                            value: contract.vehicleSnapshot?.name ?? '—',
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Màu sắc',
                            value: contract.vehicleSnapshot?.color ?? '—',
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Số VIN',
                            value: contract.vehicleSnapshot?.vin ?? '—',
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Số máy',
                            value: contract.vehicleSnapshot?.engineNumber ?? '—',
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Pricing
                    _SectionLabel(label: 'Chiết tính giá (VNĐ)'),
                    const SizedBox(height: 8),
                    _GlassCard(
                      isDark: isDark,
                      child: Column(
                        children: [
                          _InfoRow(
                            label: 'Giá niêm yết',
                            value: ContractFormatters.formatCurrency(
                                contract.pricingSnapshot?.listPrice ?? 0),
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Giảm giá',
                            value: ContractFormatters.formatCurrency(
                                contract.pricingSnapshot?.discount ?? 0),
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Thuế VAT',
                            value: ContractFormatters.formatCurrency(
                                contract.pricingSnapshot?.vat ?? 0),
                          ),
                          _Separator(),
                          _InfoRow(
                            label: 'Tổng lăn bánh',
                            value: ContractFormatters.formatCurrency(
                                contract.pricingSnapshot?.grandTotal ?? 0),
                            isBold: true,
                            valueColor: theme.colorScheme.primary,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Attachments
                    _SectionLabel(label: 'Chứng từ'),
                    const SizedBox(height: 8),
                    if (contract.attachments == null ||
                        contract.attachments!.isEmpty)
                      _GlassCard(
                        isDark: isDark,
                        child: Row(
                          children: [
                            Icon(
                              CupertinoIcons.doc_text,
                              size: 16,
                              color: context.colors.onSurface
                                  .withValues(alpha: 0.35),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                'Chưa có chứng từ. Kế toán/Admin sẽ upload sau khi khách ký.',
                                style: TextStyle(
                                  fontSize: 13,
                                  color: context.colors.onSurface
                                      .withValues(alpha: 0.45),
                                ),
                              ),
                            ),
                          ],
                        ),
                      )
                    else
                      _GlassCard(
                        isDark: isDark,
                        child: Wrap(
                          spacing: 12,
                          runSpacing: 12,
                          children: contract.attachments!.map((att) {
                            return GestureDetector(
                              onTap: () {
                                showGlassImageViewer(context, att);
                              },
                              onLongPress: () {
                                showGlassImageContextMenu(context, att);
                              },
                              child: Hero(
                                tag: att,
                                child: Container(
                                  width: 80,
                                  height: 80,
                                  decoration: ShapeDecoration(
                                    shape: SmoothRectangleBorder(
                                      borderRadius: SmoothBorderRadius(
                                        cornerRadius: 16,
                                        cornerSmoothing: 1.0,
                                      ),
                                      side: BorderSide(
                                        color: context.colors.outlineVariant
                                            .withValues(alpha: 0.3),
                                        width: 0.5,
                                      ),
                                    ),
                                  ),
                                  child: ClipSmoothRect(
                                    radius: SmoothBorderRadius(
                                      cornerRadius: 16,
                                      cornerSmoothing: 1.0,
                                    ),
                                    child: Image.network(
                                      att,
                                      fit: BoxFit.cover,
                                      errorBuilder: (_, __, ___) => Icon(
                                        CupertinoIcons.doc_text,
                                        color: context.colors.onSurface
                                            .withValues(alpha: 0.3),
                                      ),
                                      loadingBuilder: (context, child, loadingProgress) {
                                        if (loadingProgress == null) return child;
                                        return const Center(
                                          child: CupertinoActivityIndicator(
                                            radius: 10,
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                      ),
                  ]),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}


class _SectionLabel extends StatelessWidget {
  final String label;
  const _SectionLabel({required this.label});

  @override
  Widget build(BuildContext context) {
    return Text(
      label.toUpperCase(),
      style: TextStyle(
        fontSize: 11,
        fontWeight: FontWeight.w700,
        letterSpacing: 0.9,
        color: context.colors.onSurface.withValues(alpha: 0.45),
      ),
    );
  }
}

class _Separator extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Container(
        height: 0.5,
        color: context.colors.outlineVariant.withValues(alpha: 0.3),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;
  final bool isBold;
  final Color? valueColor;

  const _InfoRow({
    required this.label,
    required this.value,
    this.isBold = false,
    this.valueColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 14,
            color: context.colors.onSurface.withValues(alpha: 0.50),
            fontWeight: FontWeight.w400,
          ),
        ),
        const SizedBox(width: 16),
        Flexible(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: TextStyle(
              fontSize: 14,
              fontWeight: isBold ? FontWeight.w700 : FontWeight.w500,
              color: valueColor ?? context.colors.onSurface,
            ),
          ),
        ),
      ],
    );
  }
}

class _GlassCard extends StatelessWidget {
  final Widget child;
  final bool isDark;

  const _GlassCard({required this.child, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.3 : 0.5),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 30,
              offset: const Offset(0, 10)),
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.02),
              blurRadius: 10,
              offset: const Offset(0, 4)),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: child,
          ),
        ),
      ),
    );
  }
}
