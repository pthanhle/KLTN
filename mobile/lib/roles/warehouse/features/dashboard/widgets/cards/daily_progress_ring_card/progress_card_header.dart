import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class ProgressCardHeader extends StatelessWidget {
  const ProgressCardHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final primaryColor = theme.colorScheme.primary;
    final isDark = theme.brightness == Brightness.dark;

    return Stack(
      clipBehavior: Clip.none,
      children: [

        Text(
          'Tiến độ ca trực'.tr(),
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.w600,
            color: isDark ? Colors.white : Colors.black87,
          ),
        ),
      ],
    );
  }
}
