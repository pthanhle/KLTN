import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../models/warehouse_order_model.dart';
import '../cards/order_item_row.dart';

class OrderItemsModal extends StatelessWidget {
  final WarehouseOrderModel order;

  const OrderItemsModal({super.key, required this.order});

  static void show(BuildContext context, WarehouseOrderModel order) {
    showModalBottomSheet(
      context: context,
      useRootNavigator: true,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => OrderItemsModal(order: order),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Container(
      constraints: BoxConstraints(
        maxHeight: size.height * 0.8,
      ),
      margin: const EdgeInsets.only(top: 60),
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.85),
        shape: SmoothRectangleBorder(
          borderRadius: const SmoothBorderRadius.only(
            topLeft: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            topRight: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 40,
            offset: const Offset(0, -10),
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
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 12),
                Container(
                  width: 40,
                  height: 5,
                  decoration: ShapeDecoration(
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.2),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 4,
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Chi tiết sản phẩm'.tr(),
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: theme.colorScheme.onSurface,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: ShapeDecoration(
                          color: theme.colorScheme.secondaryContainer,
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(
                              cornerRadius: 12,
                              cornerSmoothing: 1.0,
                            ),
                          ),
                        ),
                        child: Text(
                          '${order.items.length} món',
                          style: theme.textTheme.labelMedium?.copyWith(
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.onSecondaryContainer,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                Divider(height: 1, color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3)),
                Flexible(
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
                    itemCount: order.items.length,
                    separatorBuilder: (context, index) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8.0),
                      child: Divider(
                        height: 1, 
                        color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2)
                      ),
                    ),
                    itemBuilder: (context, index) {
                      return OrderItemRow(item: order.items[index]);
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
