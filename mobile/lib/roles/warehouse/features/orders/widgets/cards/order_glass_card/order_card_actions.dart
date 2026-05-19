import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_enums.dart';
import 'package:ttauto_staff/roles/warehouse/features/shared/models/warehouse_order_model.dart';

class OrderCardActions {
  static List<Widget> buildActions({
    required BuildContext context,
    required WarehouseOrderModel order,
    required VoidCallback onQuickPack,
    required VoidCallback onDispatch,
  }) {
    final theme = Theme.of(context);
    final actions = <Widget>[];

    if (order.status == OrderStatus.pendingPick) {
      actions.add(
        CustomSlidableAction(
          onPressed: (_) {
            HapticFeedback.heavyImpact();
            onQuickPack();
          },
          backgroundColor: Colors.transparent,
          padding: const EdgeInsets.only(left: 8),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 22,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
              child: Container(
                width: double.infinity,
                height: double.infinity,
                decoration: ShapeDecoration(
                  color: CupertinoColors.activeBlue.withValues(alpha: 0.15),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 22,
                      cornerSmoothing: 1.0,
                    ),
                    side: BorderSide(color: Colors.white.withValues(alpha: 0.5), width: 1.0),
                  ),
                  shadows: [
                    BoxShadow(
                      color: CupertinoColors.activeBlue.withValues(alpha: 0.4),
                      blurRadius: 20,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final showText = constraints.maxWidth >= 75;
                    return Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(CupertinoIcons.checkmark_seal_fill, color: Colors.white, size: 26),
                        if (showText) ...[
                          const SizedBox(height: 4),
                          Text(
                            'Đóng gói nhanh'.tr(),
                            textAlign: TextAlign.center,
                            maxLines: 1,
                            overflow: TextOverflow.fade,
                            softWrap: false,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ],
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      );
    }

    if (order.status == OrderStatus.pendingDelivery) {
      actions.add(
        CustomSlidableAction(
          onPressed: (_) {
            HapticFeedback.heavyImpact();
            onDispatch();
          },
          backgroundColor: Colors.transparent,
          padding: const EdgeInsets.only(left: 8),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(
              cornerRadius: 22,
              cornerSmoothing: 1.0,
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
              child: Container(
                width: double.infinity,
                height: double.infinity,
                decoration: ShapeDecoration(
                  color: CupertinoColors.systemIndigo.withValues(alpha: 0.15),
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 22,
                      cornerSmoothing: 1.0,
                    ),
                    side: BorderSide(color: Colors.white.withValues(alpha: 0.5), width: 1.0),
                  ),
                  shadows: [
                    BoxShadow(
                      color: CupertinoColors.systemIndigo.withValues(alpha: 0.4),
                      blurRadius: 20,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final showText = constraints.maxWidth >= 75;
                    return Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(CupertinoIcons.car_detailed, color: Colors.white, size: 26),
                        if (showText) ...[
                          const SizedBox(height: 4),
                          Text(
                            'Bàn giao ĐVVC'.tr(),
                            textAlign: TextAlign.center,
                            maxLines: 1,
                            overflow: TextOverflow.fade,
                            softWrap: false,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ],
                    );
                  },
                ),
              ),
            ),
          ),
        ),
      );
    }

    return actions;
  }
}
