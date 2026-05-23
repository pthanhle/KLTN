import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/constants/service_report_constants.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_report_controller.dart';

class ServiceReportDatePicker extends ConsumerWidget {
  const ServiceReportDatePicker({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final state = ref.watch(serviceReportProvider);
    final isBackorder = state.selectedReason == ServiceReportConstants.reasonBackorder;
    final controller = ref.read(serviceReportProvider.notifier);

    return AnimatedSize(
      duration: const Duration(milliseconds: 300),
      curve: Curves.fastOutSlowIn,
      child: isBackorder
          ? Container(
              margin: const EdgeInsets.only(top: 16),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: theme.colorScheme.surfaceContainerLowest.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white.withValues(alpha: 0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(CupertinoIcons.calendar_today, size: 16, color: theme.colorScheme.onSurfaceVariant),
                      const SizedBox(width: 6),
                      Text(
                        'Ngày dự kiến hàng về'.tr().toUpperCase(),
                        style: theme.textTheme.labelSmall?.copyWith(
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.2,
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 180,
                    child: CupertinoTheme(
                      data: CupertinoThemeData(
                        textTheme: CupertinoTextThemeData(
                          dateTimePickerTextStyle: theme.textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: theme.colorScheme.onSurface,
                          ),
                        ),
                      ),
                      child: CupertinoDatePicker(
                        mode: CupertinoDatePickerMode.date,
                        initialDateTime: state.expectedArrivalDate ?? DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day).add(const Duration(days: 7)),
                        minimumDate: DateTime(DateTime.now().year, DateTime.now().month, DateTime.now().day),
                        onDateTimeChanged: (DateTime newDate) {
                          controller.updateExpectedDate(newDate);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            )
          : const SizedBox.shrink(),
    );
  }
}
