import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../controllers/part_search_controller.dart';
import 'widgets/part_search_header.dart';
import 'widgets/part_item_card/part_item_card.dart';
import 'widgets/part_item_skeleton.dart';

class PartSearchModal extends ConsumerWidget {
  const PartSearchModal({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(partSearchControllerProvider);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return DraggableScrollableSheet(
      initialChildSize: 0.85,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      expand: false,
      builder: (context, scrollController) {
        return Container(
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.04)
                : Colors.white.withValues(alpha: 0.65),
            shape: SmoothRectangleBorder(
              borderRadius: const SmoothBorderRadius.vertical(
                top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
              ),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: const SmoothBorderRadius.vertical(
              top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
              child: Column(
                children: [
                  Center(
                    child: Container(
                      margin: const EdgeInsets.only(top: 12, bottom: 8),
                      width: 36,
                      height: 4,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.onSurface.withValues(alpha: 0.20),
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                  ),
                  const PartSearchHeader(),
                  Expanded(
                    child: state.isLoading
                        ? ListView.separated(
                            controller: scrollController,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 16),
                            itemCount: 5,
                            separatorBuilder: (context, s) =>
                                const SizedBox(height: 12),
                            itemBuilder: (context, i) => const PartItemSkeleton(),
                          )
                        : ListView.separated(
                            controller: scrollController,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 20, vertical: 16),
                            itemCount: state.items.length,
                            separatorBuilder: (context, s) =>
                                const SizedBox(height: 12),
                            itemBuilder: (context, index) {
                              final part = state.items[index];
                              return PartItemCard(
                                key: ValueKey(part.id),
                                part: part,
                              );
                            },
                          ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
