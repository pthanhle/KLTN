import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/constants/service_report_constants.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_report_controller.dart';

class ServiceReportDatePicker extends ConsumerWidget {
  const ServiceReportDatePicker({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final state = ref.watch(serviceReportProvider);
    final isBackorder =
        state.selectedReason == ServiceReportConstants.reasonBackorder;
    final controller = ref.read(serviceReportProvider.notifier);

    return AnimatedSize(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOutCubic,
      child: isBackorder
          ? Container(
              margin: const EdgeInsets.only(top: 16),
              decoration: ShapeDecoration(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.04)
                    : Colors.white.withValues(alpha: 0.4),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 20,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.5),
                    width: 0.5,
                  ),
                ),
              ),
              child: ClipSmoothRect(
                radius:
                    SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(
                              CupertinoIcons.calendar_today,
                              size: 15,
                              color: theme.colorScheme.primary,
                            ),
                            const SizedBox(width: 6),
                            Text(
                              'Ngày dự kiến hàng về'.tr().toUpperCase(),
                              style: theme.textTheme.labelSmall?.copyWith(
                                fontWeight: FontWeight.w700,
                                letterSpacing: 1.2,
                                color: theme.colorScheme.primary,
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
                                dateTimePickerTextStyle:
                                    theme.textTheme.bodyMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  color: theme.colorScheme.onSurface,
                                ),
                              ),
                            ),
                            child: CupertinoDatePicker(
                              mode: CupertinoDatePickerMode.date,
                              initialDateTime: state.expectedArrivalDate ??
                                  DateTime(
                                    DateTime.now().year,
                                    DateTime.now().month,
                                    DateTime.now().day,
                                  ).add(const Duration(days: 7)),
                              minimumDate: DateTime(
                                DateTime.now().year,
                                DateTime.now().month,
                                DateTime.now().day,
                              ),
                              onDateTimeChanged: controller.updateExpectedDate,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            )
          : const SizedBox.shrink(),
    );
  }
}
