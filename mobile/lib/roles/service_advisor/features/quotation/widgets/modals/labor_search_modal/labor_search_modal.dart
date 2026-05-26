import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../controllers/labor_search_controller.dart';
import 'widgets/labor_search_header.dart';
import 'widgets/labor_item_card.dart';
import 'widgets/labor_action_island.dart';
import 'widgets/labor_item_skeleton.dart';

class LaborSearchModal extends ConsumerWidget {
  const LaborSearchModal({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(laborSearchControllerProvider);
    final notifier = ref.read(laborSearchControllerProvider.notifier);
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return DraggableScrollableSheet(
      initialChildSize: 0.9,
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
              child: Stack(
                children: [
                  Column(
                    children: [
                      Center(
                        child: Container(
                          margin: const EdgeInsets.only(top: 12, bottom: 8),
                          width: 36,
                          height: 4,
                          decoration: BoxDecoration(
                            color: theme.colorScheme.onSurface
                                .withValues(alpha: 0.20),
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ),
                      const LaborSearchHeader(),
                      Expanded(
                        child: state.isLoading
                            ? ListView.separated(
                                controller: scrollController,
                                padding: const EdgeInsets.fromLTRB(
                                    20, 8, 20, 120),
                                itemCount: 6,
                                separatorBuilder: (context, s) =>
                                    const SizedBox(height: 10),
                                itemBuilder: (context, i) =>
                                    const LaborItemSkeleton(),
                              )
                            : ListView.separated(
                                controller: scrollController,
                                padding: const EdgeInsets.fromLTRB(
                                    20, 8, 20, 120),
                                itemCount: state.items.length,
                                separatorBuilder: (context, s) =>
                                    const SizedBox(height: 10),
                                itemBuilder: (context, index) {
                                  final labor = state.items[index];
                                  final isSelected = state.selectedLaborIds
                                      .contains(labor.laborCode);
                                  return LaborItemCard(
                                    key: ValueKey(labor.laborCode),
                                    labor: labor,
                                    isSelected: isSelected,
                                    onTap: () =>
                                        notifier.toggleSelection(labor.laborCode),
                                  );
                                },
                              ),
                      ),
                    ],
                  ),
                  const LaborActionIsland(),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
