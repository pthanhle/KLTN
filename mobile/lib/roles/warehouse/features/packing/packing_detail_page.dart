import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:go_router/go_router.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/controllers/packing_detail_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/widgets/cards/packing_item_card.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/widgets/cards/packing_item_skeleton.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/widgets/controls/packing_action_island/packing_action_island.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/widgets/modals/packing_report_modal/packing_report_modal.dart';

class PackingDetailPage extends ConsumerWidget {
  final String orderId;

  const PackingDetailPage({
    super.key,
    required this.orderId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(packingDetailProvider);
    final controller = ref.read(packingDetailProvider.notifier);
    
    controller.init(orderId);

    return Scaffold(
      body: MeshBackground(
        child: Stack(
          children: [
            CustomScrollView(
              physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
              slivers: [
                _buildAppBar(context, state),
                _buildHeader(context, state),
                _buildList(context, state, controller),
                const SliverToBoxAdapter(
                  child: SizedBox(height: 120),
                ),
              ],
            ),
            Positioned(
              left: 0,
              right: 0,
              bottom: 0,
              child: PackingActionIsland(
                isReadyToComplete: state.isAllPacked,
                onReport: () {
                  HapticFeedback.mediumImpact();
                  PackingReportModal.show(context, orderId);
                },
                onComplete: () async {
                  final success = await controller.completePacking();
                  if (success && context.mounted) {
                    context.pop();
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, PackingDetailState state) {
    final theme = Theme.of(context);
    final title = state.order?.code ?? '';

    return SliverAppBar(
      pinned: true,
      stretch: true,
      backgroundColor: Colors.transparent,
      elevation: 0,
      systemOverlayStyle: theme.brightness == Brightness.dark 
          ? null 
          : SystemUiOverlayStyle.dark,
      leading: IconButton(
        icon: const Icon(CupertinoIcons.back),
        onPressed: () => context.pop(),
      ),
      centerTitle: true,
      title: Text(
        title,
        style: theme.textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.w700,
          letterSpacing: -0.5,
        ),
      ),
      flexibleSpace: ClipRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
          child: Container(
            decoration: BoxDecoration(
              color: theme.colorScheme.surface.withValues(alpha: 0.6),
              border: Border(
                bottom: BorderSide(
                  color: Colors.white.withValues(alpha: 0.2),
                  width: 0.5,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, PackingDetailState state) {
    final theme = Theme.of(context);
    
    return SliverToBoxAdapter(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(24, 24, 24, 16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              'Danh sách hàng'.tr(),
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
                letterSpacing: -0.5,
              ),
            ),
            if (!state.isLoading && state.order != null)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: ShapeDecoration(
                  color: theme.colorScheme.surfaceContainerHighest,
                  shape: SmoothRectangleBorder(
                    borderRadius: SmoothBorderRadius(
                      cornerRadius: 12,
                      cornerSmoothing: 1.0,
                    ),
                  ),
                ),
                child: Text(
                  '${state.totalPackedUnits}/${state.order!.totalItems}',
                  style: theme.textTheme.labelMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildList(BuildContext context, PackingDetailState state, PackingDetailController controller) {
    if (state.isLoading) {
      return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        sliver: SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) => const PackingItemSkeleton(),
            childCount: 3,
          ),
        ),
      );
    }

    if (state.order == null || state.order!.items.isEmpty) {
      return SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: Text(
            'packing_detail_empty_list'.tr(),
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
          ),
        ),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            final item = state.order!.items[index];
            final packedQuantity = state.getPackedQuantity(item.partId);

            return PackingItemCard(
              item: item,
              packedQuantity: packedQuantity,
              onIncrement: () => controller.incrementItem(item.partId),
              onPackAll: () => controller.packAllItem(item.partId),
              onUndo: () => controller.undoItem(item.partId),
            );
          },
          childCount: state.order!.items.length,
        ),
      ),
    );
  }
}