import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../models/hotspot_model.dart';
import 'hotspot_pin.dart';

class HotspotImageBoard extends StatelessWidget {
  final String? imageUrl;
  final List<HotspotModel> hotspots;
  final Function(double dx, double dy) onTapDown;
  final Function(String id) onRemoveHotspot;

  const HotspotImageBoard({
    super.key,
    required this.hotspots,
    required this.onTapDown,
    required this.onRemoveHotspot,
    this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return ClipSmoothRect(
      radius: SmoothBorderRadius(
        cornerRadius: 16,
        cornerSmoothing: 1.0,
      ),
      child: Container(
        height: 350,
        width: double.infinity,
        decoration: BoxDecoration(
          color: isDark ? theme.colorScheme.surfaceContainerHighest : theme.colorScheme.surfaceContainerLow,
          border: Border.all(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
            width: 1,
          ),
        ),
        child: LayoutBuilder(
          builder: (context, constraints) {
            return Stack(
              children: [
                Positioned.fill(
                  child: Opacity(
                    opacity: isDark ? 0.5 : 0.3,
                    child: imageUrl != null && imageUrl!.isNotEmpty
                      ? Image.network(
                          imageUrl!,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) => const Center(child: Icon(CupertinoIcons.car_detailed, size: 60)),
                        )
                      : const Center(child: Icon(CupertinoIcons.car_detailed, size: 60)),
                  ),
                ),

                Positioned.fill(
                  child: GestureDetector(
                    onTapDown: (details) {
                      final dx = details.localPosition.dx / constraints.maxWidth;
                      final dy = details.localPosition.dy / constraints.maxHeight;
                      onTapDown(dx, dy);
                    },
                  ),
                ),

                ...hotspots.asMap().entries.map((entry) {
                  final idx = entry.key;
                  final hotspot = entry.value;
                  return Positioned(
                    left: hotspot.x * constraints.maxWidth - 14,
                    top: hotspot.y * constraints.maxHeight - 14,
                    child: HotspotPin(
                      index: idx + 1,
                      onTap: () => onRemoveHotspot(hotspot.id),
                    ),
                  );
                }),


              ],
            );
          }
        ),
      ),
    );
  }
}
