import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:intl/intl.dart';

/// A frosted-glass chip that shows a date filter.
/// - Null selectedDate → shows "Tất cả"
/// - Non-null → shows formatted date + X to clear
/// Tapping the chip opens a Material date picker.
class DateFilterChip extends StatelessWidget {
  final DateTime? selectedDate;
  final ValueChanged<DateTime?> onDateChanged;
  final EdgeInsetsGeometry padding;

  const DateFilterChip({
    super.key,
    required this.selectedDate,
    required this.onDateChanged,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
  });

  Future<void> _pickDate(BuildContext context) async {
    final now = DateTime.now();
    final initial = selectedDate ?? now;
    final picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(now.year - 1),
      lastDate: DateTime(now.year + 1),
      locale: const Locale('vi', 'VN'),
      builder: (ctx, child) {
        return Theme(
          data: Theme.of(ctx).copyWith(
            colorScheme: Theme.of(ctx).colorScheme.copyWith(
              primary: Theme.of(ctx).colorScheme.primary,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) onDateChanged(picked);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final hasDate = selectedDate != null;
    final label = hasDate
        ? DateFormat('dd/MM/yyyy').format(selectedDate!)
        : 'Tất cả';
    final accentColor = Theme.of(context).colorScheme.primary;

    return Padding(
      padding: padding,
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Container(
            height: 44,
            decoration: ShapeDecoration(
              color: hasDate
                  ? accentColor.withValues(alpha: isDark ? 0.18 : 0.12)
                  : (isDark
                      ? Colors.white.withValues(alpha: 0.07)
                      : Colors.black.withValues(alpha: 0.05)),
              shape: SmoothRectangleBorder(
                borderRadius:
                    SmoothBorderRadius(cornerRadius: 14, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: hasDate
                      ? accentColor.withValues(alpha: 0.45)
                      : Colors.white.withValues(alpha: isDark ? 0.12 : 0.45),
                  width: 0.5,
                ),
              ),
            ),
            child: Row(
              children: [
                // Calendar icon — tap area to open picker
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () => _pickDate(context),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          CupertinoIcons.calendar,
                          size: 15,
                          color: hasDate
                              ? accentColor
                              : (isDark
                                  ? Colors.white.withValues(alpha: 0.45)
                                  : Colors.black.withValues(alpha: 0.35)),
                        ),
                        const SizedBox(width: 6),
                        Text(
                          label,
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight:
                                hasDate ? FontWeight.w600 : FontWeight.w500,
                            color: hasDate
                                ? accentColor
                                : (isDark
                                    ? Colors.white.withValues(alpha: 0.6)
                                    : Colors.black.withValues(alpha: 0.5)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Clear button — only when date is selected
                if (hasDate)
                  GestureDetector(
                    onTap: () => onDateChanged(null),
                    child: Padding(
                      padding: const EdgeInsets.only(right: 10),
                      child: Icon(
                        CupertinoIcons.xmark_circle_fill,
                        size: 15,
                        color: accentColor.withValues(alpha: 0.6),
                      ),
                    ),
                  )
                else
                  const SizedBox(width: 12),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
