import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';

class MpiConclusionCard extends StatelessWidget {
  final TextEditingController controller;
  final Function(String) onChanged;
  final bool readOnly;

  const MpiConclusionCard({
    super.key,
    required this.controller,
    required this.onChanged,
    this.readOnly = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 12),
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.30),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
        child: ClipRect(
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
                  child: Row(
                    children: [
                      Icon(
                        CupertinoIcons.doc_text_fill,
                        size: 16,
                        color: theme.colorScheme.primary,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Kết luận chuyên môn'.tr(),
                        style: theme.textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: theme.colorScheme.onSurface,
                        ),
                      ),
                    ],
                  ),
                ),
                Divider(
                  height: 1,
                  thickness: 0.5,
                  color: Colors.white.withValues(alpha: isDark ? 0.08 : 0.30),
                ),
                CupertinoTextField(
                  controller: controller,
                  onChanged: readOnly ? null : onChanged,
                  readOnly: readOnly,
                  maxLines: 5,
                  minLines: 3,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurface,
                    height: 1.5,
                  ),
                  placeholder: 'Nhập kết luận tổng quan về tình trạng xe...'.tr(),
                  placeholderStyle: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.45),
                    height: 1.5,
                  ),
                  decoration: null,
                  padding: const EdgeInsets.fromLTRB(20, 14, 20, 20),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
