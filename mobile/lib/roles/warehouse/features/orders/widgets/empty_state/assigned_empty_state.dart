import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';

class AssignedEmptyState extends StatelessWidget {
  final OrderStatus currentTab;
  final bool hasAnyOrders;

  const AssignedEmptyState({
    super.key,
    required this.currentTab,
    required this.hasAnyOrders,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    String title = '';
    String subtitle = '';
    IconData iconData = CupertinoIcons.checkmark_seal_fill;

    if (!hasAnyOrders) {
      title = 'Tuyệt vời!';
      subtitle = 'Bạn đã hoàn thành tất cả đơn hàng được giao. Hãy nghỉ ngơi!';
    } else if (currentTab == OrderStatus.pendingPick) {
      title = 'Chưa có đơn cần nhặt';
      subtitle = 'Tuyệt vời! Tất cả đơn hàng đã được nhặt xong.';
    } else if (currentTab == OrderStatus.pendingDelivery) {
      title = 'Chưa có đơn chờ giao';
      subtitle = 'Hãy nhặt hàng để chuyển đơn sang trạng thái chờ giao.';
      iconData = CupertinoIcons.cube_box;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            iconData,
            size: 64,
            color: theme.colorScheme.primary.withValues(alpha: 0.5),
          ),
          const SizedBox(height: 16),
          Text(
            title.tr(),
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w800,
              color: theme.colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            subtitle.tr(),
            style: theme.textTheme.bodyMedium?.copyWith(
              fontWeight: FontWeight.w500,
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
