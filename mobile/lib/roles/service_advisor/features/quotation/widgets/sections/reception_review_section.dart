import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../constants/quotation_constants.dart';
import '../../models/quotation_model.dart';
import '../shared/glass_card.dart';

class ReceptionReviewSection extends StatelessWidget {
  final ReceptionSnapshot? snapshot;

  const ReceptionReviewSection({
    super.key,
    required this.snapshot,
  });

  @override
  Widget build(BuildContext context) {
    final data = snapshot;
    if (data == null) return const SizedBox.shrink();

    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: QuotationConstants.paddingHorizontal,
      ),
      child: GlassCard(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  CupertinoIcons.car_detailed,
                  size: 20,
                  color: theme.colorScheme.primary,
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Thông tin tiếp nhận xe',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),
            Row(
              children: [
                Expanded(
                  child: _MetricTile(
                    icon: CupertinoIcons.speedometer,
                    label: 'ODO',
                    value: '${data.odometer} km',
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _MetricTile(
                    icon: CupertinoIcons.drop_fill,
                    label: 'Nhiên liệu',
                    value: '${data.fuelLevel}%',
                  ),
                ),
              ],
            ),
            if (data.customerNotes.trim().isNotEmpty) ...[
              const SizedBox(height: 14),
              _NoteBlock(note: data.customerNotes),
            ],
            if (data.damageMap.isNotEmpty) ...[
              const SizedBox(height: 18),
              _DamagePreview(snapshot: data),
            ],
            if (data.belongings.isNotEmpty) ...[
              const SizedBox(height: 18),
              Text(
                'Tài sản kèm theo',
                style: theme.textTheme.labelLarge?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 10),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: data.belongings
                    .map((item) => _BelongingChip(item: item))
                    .toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _MetricTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _MetricTile({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.45),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.35),
        ),
      ),
      child: Row(
        children: [
          Icon(icon, size: 18, color: theme.colorScheme.primary),
          const SizedBox(width: 9),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  value,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _NoteBlock extends StatelessWidget {
  final String note;

  const _NoteBlock({required this.note});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: theme.colorScheme.primary.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            CupertinoIcons.quote_bubble,
            size: 18,
            color: theme.colorScheme.primary,
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              note,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DamagePreview extends StatelessWidget {
  final ReceptionSnapshot snapshot;

  const _DamagePreview({required this.snapshot});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Hotspot khi tiếp nhận',
          style: theme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 10),
        ClipRRect(
          borderRadius: BorderRadius.circular(18),
          child: SizedBox(
            height: 260,
            width: double.infinity,
            child: LayoutBuilder(
              builder: (context, constraints) {
                return Stack(
                  children: [
                    Positioned.fill(
                      child: snapshot.vehicleImageUrl != null &&
                              snapshot.vehicleImageUrl!.isNotEmpty
                          ? Image.network(
                              snapshot.vehicleImageUrl!,
                              fit: BoxFit.cover,
                              opacity: const AlwaysStoppedAnimation(0.42),
                              errorBuilder: (context, error, stackTrace) =>
                                  const _CarPlaceholder(),
                            )
                          : const _CarPlaceholder(),
                    ),
                    Positioned.fill(
                      child: Container(
                        color: theme.colorScheme.surfaceContainerHighest
                            .withValues(alpha: 0.18),
                      ),
                    ),
                    ...snapshot.damageMap.asMap().entries.map((entry) {
                      final index = entry.key;
                      final point = entry.value;
                      return Positioned(
                        left: point.x * constraints.maxWidth - 14,
                        top: point.y * constraints.maxHeight - 14,
                        child: _HotspotMarker(
                          index: index + 1,
                          label: point.description,
                        ),
                      );
                    }),
                  ],
                );
              },
            ),
          ),
        ),
      ],
    );
  }
}

class _CarPlaceholder extends StatelessWidget {
  const _CarPlaceholder();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      color: theme.colorScheme.surfaceContainerHighest,
      child: Center(
        child: Icon(
          CupertinoIcons.car_detailed,
          size: 56,
          color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.35),
        ),
      ),
    );
  }
}

class _HotspotMarker extends StatelessWidget {
  final int index;
  final String label;

  const _HotspotMarker({
    required this.index,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 28,
          height: 28,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: theme.colorScheme.error,
            shape: BoxShape.circle,
            border: Border.all(color: Colors.white, width: 2),
            boxShadow: [
              BoxShadow(
                color: theme.colorScheme.error.withValues(alpha: 0.35),
                blurRadius: 14,
              ),
            ],
          ),
          child: Text(
            '$index',
            style: theme.textTheme.labelSmall?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),
        const SizedBox(width: 6),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 130),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 5),
            decoration: BoxDecoration(
              color: theme.colorScheme.surface.withValues(alpha: 0.88),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.labelSmall?.copyWith(
                color: theme.colorScheme.error,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _BelongingChip extends StatelessWidget {
  final ReceptionBelonging item;

  const _BelongingChip({required this.item});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final color = item.status ? theme.colorScheme.primary : theme.colorScheme.error;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            item.status
                ? CupertinoIcons.checkmark_alt_circle
                : CupertinoIcons.exclamationmark_circle,
            size: 14,
            color: color,
          ),
          const SizedBox(width: 6),
          Text(
            item.item,
            style: theme.textTheme.labelMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
