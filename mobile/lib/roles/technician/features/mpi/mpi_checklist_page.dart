import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../shared/widgets/buttons/liquid_button.dart';
import 'controllers/tech_mpi_controller.dart';
import 'models/mpi_item_model.dart';
import 'widgets/sections/mpi_category_section.dart';
import 'widgets/cards/mpi_conclusion_card.dart';
import 'widgets/modals/mpi_item_update_modal.dart';
import 'widgets/skeletons/mpi_checklist_skeleton.dart';

class MpiChecklistPage extends ConsumerStatefulWidget {
  final String plate;
  const MpiChecklistPage({super.key, required this.plate});

  @override
  ConsumerState<MpiChecklistPage> createState() => _MpiChecklistPageState();
}

class _MpiChecklistPageState extends ConsumerState<MpiChecklistPage> {
  late TextEditingController _conclusionController;

  @override
  void initState() {
    super.initState();
    _conclusionController = TextEditingController();
  }

  @override
  void dispose() {
    _conclusionController.dispose();
    super.dispose();
  }

  void _handleStatusChange(String categoryId, MpiItemModel item, MpiItemStatus status) {
    ref.read(techMpiControllerProvider.notifier).changeItemStatus(categoryId, item.id, status);
    if (status == MpiItemStatus.fail || status == MpiItemStatus.monitor) {
      MpiItemUpdateModal.show(
        context,
        item.copyWith(status: status),
        Theme.of(context).brightness == Brightness.dark,
        (note, mediaUrls) {
          ref
              .read(techMpiControllerProvider.notifier)
              .updateItemNoteAndMedia(categoryId, item.id, note, mediaUrls);
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final stateAsync = ref.watch(techMpiControllerProvider);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
          slivers: [
            SliverAppBar(
              pinned: true,
              backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.6),
              surfaceTintColor: Colors.transparent,
              shadowColor: Colors.transparent,
              scrolledUnderElevation: 0,
              elevation: 0,
              flexibleSpace: ClipRect(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
                  child: Container(color: Colors.transparent),
                ),
              ),
              leading: Padding(
                padding: const EdgeInsets.only(left: 8),
                child: GlassNavBackButton(),
              ),
              centerTitle: false,
              title: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Khám xe'.tr(),
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  Text(
                    widget.plate,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.70),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
            stateAsync.when(
              data: (state) => SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final category = state.categories[index];
                    return MpiCategorySection(
                      category: category,
                      onPassAll: () => ref
                          .read(techMpiControllerProvider.notifier)
                          .togglePassAllCategory(category.id),
                      onStatusChanged: (itemId, status) {
                        final item = category.items.firstWhere((e) => e.id == itemId);
                        _handleStatusChange(category.id, item, status);
                      },
                    );
                  },
                  childCount: state.categories.length,
                ),
              ),
              loading: () => const SliverToBoxAdapter(child: MpiChecklistSkeleton()),
              error: (err, _) => SliverToBoxAdapter(
                child: Center(
                  child: Text(
                    '${'Lỗi xảy ra'.tr()}: $err',
                    style: theme.textTheme.bodyMedium?.copyWith(color: theme.colorScheme.error),
                  ),
                ),
              ),
            ),
            if (stateAsync.hasValue)
              SliverToBoxAdapter(
                child: MpiConclusionCard(
                  controller: _conclusionController,
                  onChanged: (text) => ref
                      .read(techMpiControllerProvider.notifier)
                      .updateGeneralConclusion(text),
                ),
              ),
            if (stateAsync.hasValue)
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
                sliver: SliverToBoxAdapter(
                  child: LiquidButton(
                    onPressed: () {},
                    child: Text('Hoàn tất chẩn đoán'.tr()),
                  ),
                ),
              ),
            const SliverToBoxAdapter(
              child: SafeArea(
                top: false,
                child: SizedBox(height: 24),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
