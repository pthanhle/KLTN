import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_report_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_packing_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';
import 'package:flutter/services.dart';

class ServiceReportActions extends ConsumerWidget {
  final ServicePartItem item;

  const ServiceReportActions({
    super.key,
    required this.item,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final state = ref.watch(serviceReportProvider);

    final canSubmit = state.selectedReason != null;

    return Row(
      children: [
        Expanded(
          child: CupertinoButton(
            padding: const EdgeInsets.symmetric(vertical: 14),
            color: theme.colorScheme.surfaceContainerHighest,
            borderRadius: BorderRadius.circular(24),
            onPressed: () {
              HapticFeedback.lightImpact();
              Navigator.of(context).pop();
            },
            child: Text(
              'Hủy'.tr(),
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.onSurface,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: CupertinoButton(
            padding: const EdgeInsets.symmetric(vertical: 14),
            color: canSubmit ? CupertinoColors.activeBlue : theme.colorScheme.surfaceContainerHighest,
            borderRadius: BorderRadius.circular(24),
            onPressed: canSubmit
                ? () {
                    HapticFeedback.mediumImpact();
                    ref.read(servicePackingProvider.notifier).reportPartException(
                          item.partId,
                          state.selectedReason!,
                          state.expectedArrivalDate,
                        );
                    Navigator.of(context).pop();
                  }
                : null,
            child: Text(
              'Xác nhận báo cáo'.tr(),
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: canSubmit ? Colors.white : theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
