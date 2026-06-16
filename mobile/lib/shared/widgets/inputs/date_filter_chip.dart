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
    DateTime tempDate = selectedDate ?? now;
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    Widget glassBlock({required Widget child}) {
      return Container(
        width: double.infinity,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.05)
              : Colors.white.withValues(alpha: 0.72),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            side: BorderSide(
              color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.80),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.30 : 0.06),
              blurRadius: 20,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: child,
          ),
        ),
      );
    }

    final picked = await showCupertinoModalPopup<DateTime>(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.40),
      builder: (ctx) {
        return Material(
          type: MaterialType.transparency,
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  glassBlock(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(20, 20, 20, 6),
                          child: Text(
                            'Chọn ngày',
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                              letterSpacing: -0.5,
                              color: theme.colorScheme.onSurface,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                        SizedBox(
                          height: 200,
                          child: CupertinoDatePicker(
                            mode: CupertinoDatePickerMode.date,
                            initialDateTime: tempDate,
                            minimumDate: DateTime(now.year - 1),
                            maximumDate: DateTime(now.year + 1),
                            onDateTimeChanged: (DateTime newDate) {
                              tempDate = newDate;
                            },
                          ),
                        ),
                        Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                        GestureDetector(
                          onTap: () {
                            Navigator.pop(ctx, tempDate);
                          },
                          behavior: HitTestBehavior.opaque,
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 17),
                            color: Colors.transparent,
                            child: Text(
                              'Xác nhận',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: theme.colorScheme.primary,
                                fontSize: 17,
                                fontWeight: FontWeight.w600,
                                letterSpacing: -0.3,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 10),
                  glassBlock(
                    child: GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      behavior: HitTestBehavior.opaque,
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.symmetric(vertical: 17),
                        color: Colors.transparent,
                        child: Text(
                          'Hủy',
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            color: Color(0xFF007AFF),
                            fontSize: 17,
                            fontWeight: FontWeight.w700,
                            letterSpacing: -0.3,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            ),
          ),
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
