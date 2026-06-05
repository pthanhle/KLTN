import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../dashboard/models/repair_order_model.dart';
import '../../walkaround/widgets/components/hotspots/hotspot_image_board.dart';
import '../../walkaround/models/hotspot_model.dart';

class ReceptionSummaryModal extends StatelessWidget {
  final RepairOrderModel order;

  const ReceptionSummaryModal({super.key, required this.order});

  static Future<void> show(BuildContext context, RepairOrderModel order) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => ReceptionSummaryModal(order: order),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final info = order.receptionInfo;

    if (info == null) {
      return Container(
        height: 200,
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Center(
          child: Text(
            'Không có dữ liệu tiếp nhận',
            style: theme.textTheme.titleMedium,
          ),
        ),
      );
    }

    final List<HotspotModel> hotspots = info.damageMap.map((h) {
      return HotspotModel(
        id: h['label'] ?? '',
        x: (h['x'] ?? 0.5).toDouble(),
        y: (h['y'] ?? 0.5).toDouble(),
        note: h['description'] ?? '',
      );
    }).toList();

    return Container(
      height: MediaQuery.of(context).size.height * 0.9,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF191F31) : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border(
          top: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
          ),
        ),
      ),
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2),
                ),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Thông tin tiếp nhận xe'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                IconButton(
                  icon: const Icon(CupertinoIcons.xmark),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          // Content
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              physics: const BouncingScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Health HUD (Odometer & Fuel)
                  Row(
                    children: [
                      Expanded(
                        child: _buildInfoCard(
                          context,
                          title: 'Odometer',
                          value: '${NumberFormat('#,###').format(info.odometer)} km',
                          icon: CupertinoIcons.speedometer,
                          color: Colors.blue,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _buildInfoCard(
                          context,
                          title: 'Mức nhiên liệu',
                          value: '${(info.fuelLevel * 100).toInt()}%',
                          icon: CupertinoIcons.drop_fill,
                          color: Colors.orange,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Customer Note
                  if (info.customerNotes.isNotEmpty) ...[
                    _buildSectionTitle(context, 'Ghi chú của khách hàng'),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.all(16),
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
                        ),
                      ),
                      child: Text(
                        info.customerNotes,
                        style: theme.textTheme.bodyMedium,
                      ),
                    ),
                    const SizedBox(height: 24),
                  ],

                  // Hotspots
                  _buildSectionTitle(context, 'Bản đồ hư hỏng'),
                  const SizedBox(height: 12),
                  HotspotImageBoard(
                    imageUrl: order.vehicleInfo.imageUrl,
                    hotspots: hotspots,
                    onTapDown: (_, __) {}, // Read-only
                    onRemoveHotspot: (_) {}, // Read-only
                  ),
                  if (hotspots.isNotEmpty) ...[
                    const SizedBox(height: 12),
                    ...hotspots.asMap().entries.map((e) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 12,
                            backgroundColor: Colors.red,
                            child: Text(
                              '${e.key + 1}',
                              style: const TextStyle(fontSize: 10, color: Colors.white, fontWeight: FontWeight.bold),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              e.value.note,
                              style: theme.textTheme.bodyMedium,
                            ),
                          ),
                        ],
                      ),
                    )),
                  ],
                  const SizedBox(height: 24),

                  // Checklist
                  if (info.belongings.isNotEmpty) ...[
                    _buildSectionTitle(context, 'Tài sản & Checklist'),
                    const SizedBox(height: 12),
                    ...info.belongings.map((b) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        children: [
                          Icon(
                            b['status'] == true ? CupertinoIcons.checkmark_alt_circle : CupertinoIcons.xmark_circle,
                            color: b['status'] == true ? Colors.green : Colors.red,
                            size: 20,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              b['item'] ?? '',
                              style: theme.textTheme.bodyMedium,
                            ),
                          ),
                        ],
                      ),
                    )),
                    const SizedBox(height: 24),
                  ],

                  // Signatures
                  _buildSectionTitle(context, 'Chữ ký xác nhận'),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: _buildSignatureCard(
                          context,
                          title: 'CỐ VẤN DỊCH VỤ',
                          url: info.advisorSignatureUrl,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _buildSignatureCard(
                          context,
                          title: 'KHÁCH HÀNG',
                          url: info.customerSignatureUrl,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 32),

                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: () => Navigator.pop(context),
                      label: Text('Đóng'.tr()),
                      icon: const Icon(CupertinoIcons.check_mark),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        backgroundColor: theme.colorScheme.primary,
                        foregroundColor: theme.colorScheme.onPrimary,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Text(
      title.tr(),
      style: Theme.of(context).textTheme.titleMedium?.copyWith(
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildInfoCard(BuildContext context, {required String title, required String value, required IconData icon, required Color color}) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 16, color: color),
              const SizedBox(width: 8),
              Text(
                title.tr(),
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSignatureCard(BuildContext context, {required String title, String? url}) {
    final theme = Theme.of(context);
    return Container(
      height: 120,
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
        ),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (url != null && url.isNotEmpty)
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Image.network(url, fit: BoxFit.contain),
              ),
            )
          else
            const Expanded(
              child: Center(
                child: Text('Chưa có chữ ký', style: TextStyle(color: Colors.grey, fontSize: 12)),
              ),
            ),
          Padding(
            padding: const EdgeInsets.only(bottom: 8.0),
            child: Text(
              title,
              style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey),
            ),
          ),
        ],
      ),
    );
  }
}
