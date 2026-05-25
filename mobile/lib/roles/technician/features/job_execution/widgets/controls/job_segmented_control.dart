import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class JobSegmentedControl extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onValueChanged;
  final bool isDark;

  const JobSegmentedControl({
    super.key,
    required this.selectedIndex,
    required this.onValueChanged,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SizedBox(
      width: double.infinity,
      child: CupertinoSlidingSegmentedControl<int>(
        groupValue: selectedIndex,
        onValueChanged: (value) {
          if (value != null) onValueChanged(value);
        },
        backgroundColor: isDark 
            ? Colors.white.withValues(alpha: 0.1) 
            : CupertinoColors.tertiarySystemFill,
        thumbColor: isDark 
            ? theme.colorScheme.surface
            : CupertinoColors.systemBackground,
        children: {
          0: Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Text(
              'Hạng Mục Thi Công'.tr(),
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: selectedIndex == 0 ? FontWeight.w600 : FontWeight.w500,
                color: selectedIndex == 0
                    ? theme.colorScheme.onSurface
                    : theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
          1: Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Text(
              'Phụ Tùng'.tr(),
              style: TextStyle(
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: selectedIndex == 1 ? FontWeight.w600 : FontWeight.w500,
                color: selectedIndex == 1
                    ? theme.colorScheme.onSurface
                    : theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        },
      ),
    );
  }
}
