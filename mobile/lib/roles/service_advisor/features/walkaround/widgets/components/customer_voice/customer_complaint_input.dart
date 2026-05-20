import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class CustomerComplaintInput extends StatelessWidget {
  final String initialValue;
  final ValueChanged<String> onChanged;

  const CustomerComplaintInput({
    super.key,
    required this.initialValue,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.06)
            : Colors.white.withValues(alpha: 0.55),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 18,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.18 : 0.70),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 18, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: CupertinoTextField(
            controller: TextEditingController(text: initialValue)
              ..selection = TextSelection.collapsed(offset: initialValue.length),
            maxLines: 4,
            onChanged: onChanged,
            style: theme.textTheme.bodyLarge?.copyWith(
              height: 1.5,
            ),
            placeholder: 'Xe bị tiếng kêu cạch cạch...'.tr(),
            placeholderStyle: theme.textTheme.bodyLarge?.copyWith(
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.45),
              height: 1.5,
            ),
            padding: const EdgeInsets.all(16),
            decoration: null,
          ),
        ),
      ),
    );
  }
}
