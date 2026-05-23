import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:intl/intl.dart';
import 'package:figma_squircle/figma_squircle.dart';

class PartItemBackorderSection extends StatelessWidget {
  final DateTime? expectedDate;
  final ValueChanged<DateTime> onDateChanged;
  final VoidCallback? onConfirm;

  const PartItemBackorderSection({
    super.key,
    required this.expectedDate,
    required this.onDateChanged,
    required this.onConfirm,
  });

  Future<void> _showDatePicker(BuildContext context) async {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final now = DateTime.now();
    DateTime picked = expectedDate ?? now.add(const Duration(days: 3));

    await showModalBottomSheet<void>(
      context: context,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.35),
      elevation: 0,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setPickerState) => Container(
          height: 300,
          margin: const EdgeInsets.fromLTRB(16, 0, 16, 24),
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.04)
                : Colors.white.withValues(alpha: 0.70),
            shape: SmoothRectangleBorder(
              borderRadius:
                  SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
              side: BorderSide(
                color:
                    Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius:
                SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
              child: Column(
                children: [
                  Expanded(
                    child: CupertinoDatePicker(
                      initialDateTime: picked,
                      minimumDate: now,
                      maximumDate: now.add(const Duration(days: 90)),
                      mode: CupertinoDatePickerMode.date,
                      use24hFormat: true,
                      onDateTimeChanged: (d) {
                        setPickerState(() => picked = d);
                        onDateChanged(d);
                      },
                    ),
                  ),
                  GestureDetector(
                    onTap: () => Navigator.of(ctx).pop(),
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: Text(
                        'Xong'.tr(),
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.3,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );

    if (expectedDate == null) {
      onDateChanged(now.add(const Duration(days: 3)));
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final canConfirm = onConfirm != null;

    return Container(
      padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.40),
            width: 0.5,
          ),
        ),
        color: isDark
            ? Colors.white.withValues(alpha: 0.03)
            : Colors.black.withValues(alpha: 0.02),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Ngày dự kiến về'.tr().toUpperCase(),
            style: theme.textTheme.labelSmall?.copyWith(
              letterSpacing: 1.0,
              color: theme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: GestureDetector(
                  onTap: () => _showDatePicker(context),
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 14, vertical: 11),
                    decoration: ShapeDecoration(
                      color: isDark
                          ? Colors.white.withValues(alpha: 0.06)
                          : Colors.black.withValues(alpha: 0.04),
                      shape: SmoothRectangleBorder(
                        borderRadius: SmoothBorderRadius(
                            cornerRadius: 12, cornerSmoothing: 1.0),
                        side: BorderSide(
                          color: Colors.white
                              .withValues(alpha: isDark ? 0.10 : 0.40),
                          width: 0.5,
                        ),
                      ),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          CupertinoIcons.calendar,
                          size: 15,
                          color: theme.colorScheme.primary,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          expectedDate != null
                              ? DateFormat('dd/MM/yyyy')
                                  .format(expectedDate!)
                              : 'Chọn ngày...'.tr(),
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: expectedDate != null
                                ? theme.colorScheme.onSurface
                                : theme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 10),
              GestureDetector(
                onTap: onConfirm,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16, vertical: 11),
                  decoration: ShapeDecoration(
                    color: canConfirm
                        ? theme.colorScheme.primary.withValues(alpha: 0.12)
                        : theme.colorScheme.onSurface.withValues(alpha: 0.04),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                          cornerRadius: 12, cornerSmoothing: 1.0),
                      side: BorderSide(
                        color: canConfirm
                            ? theme.colorScheme.primary.withValues(alpha: 0.30)
                            : Colors.transparent,
                        width: 0.5,
                      ),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        CupertinoIcons.checkmark_alt,
                        color: canConfirm
                            ? theme.colorScheme.primary
                            : theme.colorScheme.onSurface
                                .withValues(alpha: 0.25),
                        size: 16,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Xác nhận'.tr(),
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: canConfirm
                              ? theme.colorScheme.primary
                              : theme.colorScheme.onSurface
                                  .withValues(alpha: 0.25),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
