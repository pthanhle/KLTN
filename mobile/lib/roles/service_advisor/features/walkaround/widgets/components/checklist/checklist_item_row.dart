import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
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

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        border: isLast ? null : Border(
          bottom: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2),
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
              style: theme.textTheme.bodyLarge,
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
                const SizedBox(width: 12),
                GestureDetector(
                  onTap: onRemove,
                  child: Icon(
                    CupertinoIcons.trash,
                    size: 20,
                    color: theme.colorScheme.error.withValues(alpha: 0.7),
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
