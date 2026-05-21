import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../constants/quotation_constants.dart';

class GlassTextField extends StatelessWidget {
  final String hintText;
  final ValueChanged<String>? onChanged;
  final int maxLines;
  final String? initialValue;
  final bool readOnly;

  const GlassTextField({
    super.key,
    required this.hintText,
    this.onChanged,
    this.maxLines = 1,
    this.initialValue,
    this.readOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    // We use a local controller just for initialValue if needed, but since it's simple, 
    // we let the parent handle state if they pass a controller. Or just use initialValue.
    // Given the previous code, we just used onChanged and hintText/initialValue in hint.
    
    return Container(
      decoration: ShapeDecoration(
        color: isDark 
            ? Colors.white.withValues(alpha: 0.05)
            : theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.3),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: QuotationConstants.radiusSmall,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
      ),
      child: TextFormField(
        maxLines: maxLines,
        onChanged: onChanged,
        initialValue: initialValue,
        readOnly: readOnly,
        style: theme.textTheme.bodyMedium,
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.outline,
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          border: InputBorder.none,
        ),
      ),
    );
  }
}
