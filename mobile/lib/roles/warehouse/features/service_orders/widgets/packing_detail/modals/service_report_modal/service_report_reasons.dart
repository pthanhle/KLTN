import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/constants/service_report_constants.dart';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/controllers/service_report_controller.dart';

class ServiceReportReasons extends ConsumerWidget {
  const ServiceReportReasons({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final state = ref.watch(serviceReportProvider);
    final controller = ref.read(serviceReportProvider.notifier);
    final reasons = ServiceReportConstants.exceptionReasons;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 10),
          child: Text(
            'Lý do ngoại lệ'.tr().toUpperCase(),
            style: theme.textTheme.labelSmall?.copyWith(
              fontWeight: FontWeight.w700,
              letterSpacing: 1.2,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
        Container(
          width: double.infinity,
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.white.withValues(alpha: 0.60),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: 20,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.7),
                width: 0.5,
              ),
            ),
            shadows: [
              BoxShadow(
                color: Colors.black.withValues(alpha: isDark ? 0.2 : 0.04),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
              child: Column(
                children: List.generate(reasons.length, (index) {
                  final reason = reasons[index];
                  final isSelected = state.selectedReason == reason;
                  final isLast = index == reasons.length - 1;

                  return Column(
                    children: [
                      GestureDetector(
                        onTap: () {
                          HapticFeedback.selectionClick();
                          controller.selectReason(reason);
                        },
                        behavior: HitTestBehavior.opaque,
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          curve: Curves.easeOutCubic,
                          color: isSelected
                              ? theme.colorScheme.primary
                                  .withValues(alpha: isDark ? 0.18 : 0.08)
                              : Colors.transparent,
                          padding: const EdgeInsets.symmetric(
                            horizontal: 18,
                            vertical: 15,
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Text(
                                  reason.tr(),
                                  style: theme.textTheme.bodyLarge?.copyWith(
                                    fontWeight: isSelected
                                        ? FontWeight.w600
                                        : FontWeight.w400,
                                    color: isSelected
                                        ? theme.colorScheme.primary
                                        : theme.colorScheme.onSurface,
                                    letterSpacing: -0.2,
                                  ),
                                ),
                              ),
                              AnimatedSwitcher(
                                duration: const Duration(milliseconds: 200),
                                child: isSelected
                                    ? Icon(
                                        CupertinoIcons.checkmark_alt,
                                        key: const ValueKey('check'),
                                        size: 18,
                                        color: theme.colorScheme.primary,
                                      )
                                    : const SizedBox(
                                        key: ValueKey('empty'),
                                        width: 18,
                                      ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      if (!isLast)
                        Container(
                          height: 0.5,
                          margin: const EdgeInsets.only(left: 18),
                          color: theme.dividerColor.withValues(alpha: 0.15),
                        ),
                    ],
                  );
                }),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
