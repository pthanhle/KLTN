import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_report_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_packing_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';

class ServiceReportActions extends ConsumerWidget {
  final ServicePartItem item;

  const ServiceReportActions({
    super.key,
    required this.item,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(serviceReportProvider);
    final canSubmit = state.selectedReason != null;

    return Row(
      children: [
        Expanded(
          child: LiquidButton(
            onPressed: () {
              HapticFeedback.lightImpact();
              Navigator.of(context).pop();
            },
            variant: LiquidButtonVariant.neutral,
            child: Text(
              'Hủy'.tr(),
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                letterSpacing: -0.3,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: LiquidButton(
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
              'Xác nhận'.tr(),
              style: const TextStyle(
                fontWeight: FontWeight.w700,
                letterSpacing: -0.4,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
