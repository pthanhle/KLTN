import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../controllers/walkaround_controller.dart';
import '../../models/hotspot_model.dart';
import '../modals/add_hotspot_note_modal.dart';
import '../components/hotspots/hotspot_image_board.dart';
import '../components/hotspots/hotspot_list_item.dart';

class HotspotsSection extends ConsumerWidget {
  const HotspotsSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(walkaroundControllerProvider);
    final controller = ref.read(walkaroundControllerProvider.notifier);
    final theme = Theme.of(context);

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Ngoại quan'.tr(),
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Chạm vào vị trí xước xát để ghi nhận.'.tr(),
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 16),
          
          HotspotImageBoard(
            imageUrl: state.data.imageUrl,
            hotspots: state.data.hotspots,
            onTapDown: (dx, dy) async {
              final note = await AddHotspotNoteModal.show(context);
              if (note != null && note.isNotEmpty) {
                final newHotspot = HotspotModel.create(
                  x: dx,
                  y: dy,
                  note: note,
                );
                controller.addHotspot(newHotspot);
              }
            },
            onRemoveHotspot: controller.removeHotspot,
          ),
          
          if (state.data.hotspots.isNotEmpty) ...[
            const SizedBox(height: 24),
            Text(
              'Danh sách điểm ghi nhận'.tr(),
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 12),
            ...state.data.hotspots.map((hotspot) {
              return HotspotListItem(
                key: ValueKey(hotspot.id),
                hotspot: hotspot,
                onRemove: () => controller.removeHotspot(hotspot.id),
              );
            }),
          ]
        ],
      ),
    );
  }
}
