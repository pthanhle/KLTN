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
            ? Colors.white.withValues(alpha: 0.05)
            : theme.colorScheme.surfaceContainerLowest.withValues(alpha: 0.8),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
            width: 1,
          ),
        ),
      ),
      child: CupertinoTextField(
        controller: TextEditingController(text: initialValue)..selection = TextSelection.collapsed(offset: initialValue.length),
        maxLines: 4,
        onChanged: onChanged,
        style: theme.textTheme.bodyLarge,
        placeholder: 'Xe bị tiếng kêu cạch cạch...'.tr(),
        placeholderStyle: theme.textTheme.bodyLarge?.copyWith(
          color: theme.colorScheme.outline,
        ),
        padding: const EdgeInsets.all(16),
        decoration: null,
      ),
    );
  }
}
