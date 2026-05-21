import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/checklist_item_model.dart';

class ChecklistItemRow extends StatelessWidget {
  final ChecklistItemModel item;
  final ValueChanged<bool> onChanged;
  final VoidCallback? onRemove;
  final bool isLast;

  const ChecklistItemRow({
    super.key,
    required this.item,
    required this.onChanged,
    this.onRemove,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: isLast
            ? null
            : Border(
                bottom: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.35),
                  width: 0.5,
                ),
              ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(
              item.name.tr(),
              style: theme.textTheme.bodyLarge?.copyWith(
                fontWeight: item.checked ? FontWeight.w600 : FontWeight.w400,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          const SizedBox(width: 16),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              CupertinoSwitch(
                value: item.checked,
                activeColor: theme.colorScheme.primary,
                onChanged: onChanged,
              ),
              if (onRemove != null) ...[
                const SizedBox(width: 10),
                GestureDetector(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    onRemove?.call();
                  },
                  child: ClipOval(
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                      child: Container(
                        width: 30,
                        height: 30,
                        decoration: BoxDecoration(
                          color: theme.colorScheme.error.withValues(alpha: isDark ? 0.15 : 0.09),
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: Colors.white.withValues(alpha: isDark ? 0.18 : 0.55),
                            width: 0.5,
                          ),
                        ),
                        child: Icon(
                          CupertinoIcons.trash,
                          size: 14,
                          color: theme.colorScheme.error,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}
