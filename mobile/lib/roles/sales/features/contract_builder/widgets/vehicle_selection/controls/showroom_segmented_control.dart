import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/core/utils/theme_extension.dart';

class ShowroomSegmentedControl extends StatelessWidget {
  final List<String> items;
  final String? selectedItem;
  final ValueChanged<String> onSelected;

  const ShowroomSegmentedControl({
    super.key,
    required this.items,
    this.selectedItem,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(4),
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.black.withValues(alpha: 0.2)
            : Colors.black.withValues(alpha: 0.05),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: Row(
        children: items.map((item) {
          final isSelected = item == selectedItem;
          return Expanded(
            child: GestureDetector(
              onTap: () => onSelected(item),
              behavior: HitTestBehavior.opaque,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                curve: Curves.easeOutCubic,
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: ShapeDecoration(
                  color: isSelected
                      ? (isDark
                          ? Colors.white.withValues(alpha: 0.15)
                          : Colors.white.withValues(alpha: 0.8))
                      : Colors.transparent,
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 12,
                      cornerSmoothing: 1.0,
                    ),
                    side: isSelected
                        ? BorderSide(
                            color: Colors.white.withValues(alpha: isDark ? 0.2 : 0.6),
                            width: 0.5,
                          )
                        : BorderSide.none,
                  ),
                  shadows: isSelected
                      ? [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.05),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ]
                      : [],
                ),
                child: Center(
                  child: Text(
                    item,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                      color: isSelected
                          ? theme.colorScheme.onSurface
                          : theme.colorScheme.onSurface.withValues(alpha: 0.6),
                    ),
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
