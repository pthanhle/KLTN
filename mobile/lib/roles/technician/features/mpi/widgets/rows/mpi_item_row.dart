import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../../models/mpi_item_model.dart';
import '../buttons/mpi_ghost_button.dart';
import '../badges/mpi_media_badge.dart';

class MpiItemRow extends StatelessWidget {
  final MpiItemModel item;
  final Function(MpiItemStatus)? onStatusChanged;

  const MpiItemRow({
    super.key,
    required this.item,
    this.onStatusChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasNote = item.note != null && item.note!.isNotEmpty;
    final hasMedia = item.mediaUrls.isNotEmpty;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  item.name,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                if (hasNote || hasMedia) ...[
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      if (hasNote)
                        MpiMediaBadge(
                          count: 1,
                          icon: CupertinoIcons.pencil_outline,
                          labelKey: 'ghi chú',
                          color: theme.colorScheme.primary,
                        ),
                      if (hasMedia)
                        MpiMediaBadge(
                          count: item.mediaUrls.length,
                          icon: CupertinoIcons.camera,
                          labelKey: 'ảnh',
                          color: theme.colorScheme.tertiary,
                        ),
                    ],
                  ),
                ],
              ],
            ),
          ),
          const SizedBox(width: 12),
          _MpiStatusButtonGroup(
            currentStatus: item.status,
            onStatusChanged: onStatusChanged,
            readOnly: onStatusChanged == null,
          ),
        ],
      ),
    );
  }
}

class _MpiStatusButtonGroup extends StatelessWidget {
  final MpiItemStatus currentStatus;
  final Function(MpiItemStatus)? onStatusChanged;
  final bool readOnly;

  const _MpiStatusButtonGroup({
    required this.currentStatus,
    this.onStatusChanged,
    this.readOnly = false,
  });

  void _handleTap(MpiItemStatus tapped) {
    onStatusChanged?.call(currentStatus == tapped ? MpiItemStatus.unchecked : tapped);
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        MpiGhostButton(
          type: MpiItemStatus.pass,
          isSelected: currentStatus == MpiItemStatus.pass,
          onTap: readOnly ? null : () => _handleTap(MpiItemStatus.pass),
        ),
        const SizedBox(width: 6),
        MpiGhostButton(
          type: MpiItemStatus.monitor,
          isSelected: currentStatus == MpiItemStatus.monitor,
          onTap: readOnly ? null : () => _handleTap(MpiItemStatus.monitor),
        ),
        const SizedBox(width: 6),
        MpiGhostButton(
          type: MpiItemStatus.fail,
          isSelected: currentStatus == MpiItemStatus.fail,
          onTap: readOnly ? null : () => _handleTap(MpiItemStatus.fail),
        ),
      ],
    );
  }
}
