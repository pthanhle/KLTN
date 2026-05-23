import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../controllers/part_search_controller.dart';
import 'widgets/part_search_header.dart';
import 'widgets/part_item_card.dart';
import 'widgets/part_item_skeleton.dart';

class PartSearchModal extends ConsumerWidget {
  const PartSearchModal({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(partSearchControllerProvider);
    final theme = Theme.of(context);

    return DraggableScrollableSheet(
      initialChildSize: 0.85,
      minChildSize: 0.5,
      maxChildSize: 0.95,
      expand: false,
      builder: (context, scrollController) {
        return ClipSmoothRect(
          radius: const SmoothBorderRadius.vertical(
            top: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
            child: Container(
              decoration: BoxDecoration(
                color: theme.colorScheme.surface.withValues(alpha: 0.6),
                border: Border(
                  top: BorderSide(
                    color: Colors.white.withValues(alpha: 0.2),
                    width: 1,
                  ),
                ),
              ),
              child: Column(
                children: [
                  Center(
                    child: Container(
                      margin: const EdgeInsets.only(top: 12, bottom: 8),
                      width: 48,
                      height: 6,
                      decoration: BoxDecoration(
                        color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(3),
                      ),
                    ),
                  ),

                  const PartSearchHeader(),

                  Expanded(
                    child: state.isLoading
                        ? ListView.separated(
                            controller: scrollController,
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                            itemCount: 5,
                            separatorBuilder: (context, index) => const SizedBox(height: 16),
                            itemBuilder: (context, index) => const PartItemSkeleton(),
                          )
                        : ListView.separated(
                            controller: scrollController,
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                            itemCount: state.items.length,
                            separatorBuilder: (context, index) => const SizedBox(height: 16),
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
