import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
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
import '../tasks/data/tech_api_repository.dart';
import '../../../../shared/widgets/toast/glass_toast.dart';

class MpiChecklistPage extends ConsumerStatefulWidget {
  final String plate;
  final String progressId;
  const MpiChecklistPage({super.key, required this.plate, required this.progressId});

  @override
  ConsumerState<MpiChecklistPage> createState() => _MpiChecklistPageState();
}

class _MpiChecklistPageState extends ConsumerState<MpiChecklistPage> {
  late TextEditingController _conclusionController;
  bool _isSubmitting = false;
  bool _conclusionSynced = false;

  @override
  void initState() {
    super.initState();
    _conclusionController = TextEditingController();
    Future.microtask(() {
      ref.read(techMpiControllerProvider.notifier).init(widget.progressId);
    });
  }

  @override
  void dispose() {
    _conclusionController.dispose();
    super.dispose();
  }

  Future<void> _submitDiagnostics(TechMpiState mpiState) async {
    if (_isSubmitting) return;
    setState(() => _isSubmitting = true);

    final diagnostics = mpiState.categories.map((cat) {
      return {
        'id': cat.id,
        'title': cat.name,
        'items': cat.items.map((item) {
          String backendStatus;
          switch (item.status) {
            case MpiItemStatus.fail:
              backendStatus = 'critical';
            case MpiItemStatus.monitor:
              backendStatus = 'warning';
            default:
              backendStatus = 'normal';
          }
          return {
            'name': item.name,
            'status': backendStatus,
            if (item.note != null && item.note!.isNotEmpty) 'action_required': item.note,
            if (item.mediaUrls.isNotEmpty) 'media_urls': item.mediaUrls,
          };
        }).toList(),
      };
    }).toList();

    try {
      await techApiRepository.submitDiagnostics(
        progressId: widget.progressId,
        diagnostics: diagnostics,
        conclusion: mpiState.generalConclusion,
      );
      if (mounted) {
        GlassToast.show(
          context,
          title: 'Đã gửi kết quả chẩn đoán thành công!'.tr(),
          icon: CupertinoIcons.check_mark_circled_solid,
        );
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (mounted) {
        GlassToast.show(
          context,
          title: 'Lỗi: $e',
          icon: CupertinoIcons.xmark_circle,
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
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

    // Sync conclusion text from state into the TextEditingController once after load
    if (stateAsync.hasValue && !_conclusionSynced) {
      final conclusion = stateAsync.value!.generalConclusion;
      if (conclusion.isNotEmpty) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted) {
            _conclusionController.text = conclusion;
            _conclusionController.selection = TextSelection.collapsed(
              offset: conclusion.length,
            );
          }
        });
      }
      _conclusionSynced = true;
    }

    final isLocked = stateAsync.value?.isLocked ?? false;

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
            if (isLocked)
              SliverToBoxAdapter(
                child: _LockedBanner(theme: theme),
              ),
            stateAsync.when(
              data: (state) => SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final category = state.categories[index];
                    return MpiCategorySection(
                      category: category,
                      readOnly: state.isLocked,
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
                  readOnly: isLocked,
                  onChanged: (text) => ref
                      .read(techMpiControllerProvider.notifier)
                      .updateGeneralConclusion(text),
                ),
              ),
            if (stateAsync.hasValue && !isLocked)
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
                sliver: SliverToBoxAdapter(
                    child: LiquidButton(
                      onPressed: _isSubmitting
                          ? null
                          : () => _submitDiagnostics(stateAsync.value!),
                      child: _isSubmitting
                          ? const CupertinoActivityIndicator(color: Colors.white, radius: 10)
                          : Text('Hoàn tất chẩn đoán'.tr()),
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

class _LockedBanner extends StatelessWidget {
  final ThemeData theme;
  const _LockedBanner({required this.theme});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 12, 16, 4),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: theme.colorScheme.primary.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Icon(CupertinoIcons.lock_fill, size: 16, color: theme.colorScheme.primary),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              'Kết quả chẩn đoán đã được gửi và không thể thay đổi.'.tr(),
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
