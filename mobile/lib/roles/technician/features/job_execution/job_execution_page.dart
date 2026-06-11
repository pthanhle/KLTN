import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'models/job_task_model.dart';
import 'models/job_part_model.dart';
import 'controllers/job_execution_controller.dart';
import 'widgets/controls/job_segmented_control.dart';
import 'widgets/sections/job_tasks_section.dart';
import 'widgets/sections/job_parts_section.dart';
import '../../../../shared/widgets/toast/glass_toast.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import '../../../../shared/widgets/buttons/liquid_button.dart';
import 'widgets/buttons/job_danger_fab.dart';
import 'widgets/modals/supplement_modal/supplement_modal.dart';
import 'widgets/sheets/job_image_picker_sheet.dart';
import '../tasks/data/tech_api_repository.dart';
import '../dashboard/controllers/tech_dashboard_controller.dart';


class JobExecutionPage extends ConsumerStatefulWidget {
  final String plate;
  final String progressId;

  const JobExecutionPage({
    super.key,
    required this.plate,
    required this.progressId,
  });

  @override
  ConsumerState<JobExecutionPage> createState() => _JobExecutionPageState();
}

class _JobExecutionPageState extends ConsumerState<JobExecutionPage> {
  late PageController _pageController;
  int _currentTab = 0;
  bool _isMarkingDone = false;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    Future.microtask(() {
      ref.read(jobExecutionControllerProvider.notifier).init(widget.progressId);
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onTabChanged(int index) {
    HapticFeedback.selectionClick();
    setState(() {
      _currentTab = index;
    });
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOutCubic,
    );
  }

  void _handleTaskAction(String taskId, JobTaskStatus status) {
    final awaitingParts = ref.read(jobExecutionControllerProvider).value?.awaitingParts ?? false;
    if (status == JobTaskStatus.pending) {
      if (awaitingParts) {
        HapticFeedback.heavyImpact();
        GlassToast.show(
          context,
          title: 'Đang chờ kho xuất phụ tùng cho đơn này.'.tr(),
          icon: CupertinoIcons.cube_box,
        );
        return;
      }
      ref.read(jobExecutionControllerProvider.notifier).startTask(taskId);
    } else if (status == JobTaskStatus.inProgress) {
      _handleCameraTap(taskId);
    }
  }

  void _handleCameraTap(String taskId) {
    JobImagePickerSheet.show(context, taskId: taskId, ref: ref);
  }

  void _handleReportIssue() {
    SupplementModal.show(
      context,
      orderId: widget.progressId,
      taskId: widget.progressId,
    );
  }

  Future<void> _handleMarkJobDone() async {
    if (_isMarkingDone) return;

    // §20: 2-block Liquid Glass confirmation sheet — KHÔNG dùng CupertinoAlertDialog
    final confirmed = await showCupertinoModalPopup<bool>(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.40),
      builder: (ctx) {
        final theme = Theme.of(ctx);
        final isDark = theme.brightness == Brightness.dark;
        const appleGreen = Color(0xFF34C759);

        Widget glassBlock({required Widget child}) {
          return Container(
            width: double.infinity,
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.05)
                  : Colors.white.withValues(alpha: 0.72),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.80),
                  width: 0.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.30 : 0.06),
                  blurRadius: 20,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: child,
              ),
            ),
          );
        }

        return Material(
          type: MaterialType.transparency,
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Block 1: Title + destructive confirm action
                  glassBlock(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
                          child: Column(
                            children: [
                              // Icon badge
                              Container(
                                width: 52,
                                height: 52,
                                decoration: ShapeDecoration(
                                  color: appleGreen.withValues(alpha: isDark ? 0.15 : 0.10),
                                  shape: SmoothRectangleBorder(
                                    borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                                    side: BorderSide(
                                      color: appleGreen.withValues(alpha: isDark ? 0.35 : 0.25),
                                      width: 0.5,
                                    ),
                                  ),
                                ),
                                child: ClipSmoothRect(
                                  radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                                  child: BackdropFilter(
                                    filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                                    child: const Center(
                                      child: Icon(
                                        CupertinoIcons.checkmark_shield_fill,
                                        color: appleGreen,
                                        size: 26,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 14),
                              Text(
                                'Hoàn tất thi công?'.tr(),
                                style: theme.textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: -0.5,
                                  color: theme.colorScheme.onSurface,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 6),
                              Text(
                                'Xe sẽ được chuyển sang giai đoạn QC nghiệm thu.\nBạn không thể hoàn tác thao tác này.'.tr(),
                                style: TextStyle(
                                  color: theme.colorScheme.onSurfaceVariant,
                                  fontSize: 13,
                                  height: 1.5,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                        Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                        // Confirm action — màu xanh (positive, not destructive)
                        GestureDetector(
                          onTap: () {
                            HapticFeedback.mediumImpact();
                            Navigator.pop(ctx, true);
                          },
                          behavior: HitTestBehavior.opaque,
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 17),
                            color: Colors.transparent,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(CupertinoIcons.checkmark_circle_fill, size: 20, color: appleGreen),
                                const SizedBox(width: 8),
                                Text(
                                  'Xác nhận hoàn tất'.tr(),
                                  style: const TextStyle(
                                    color: appleGreen,
                                    fontSize: 17,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: -0.3,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 10),

                  // Block 2: Cancel — luôn tách riêng, fontWeight w700
                  glassBlock(
                    child: GestureDetector(
                      onTap: () {
                        HapticFeedback.lightImpact();
                        Navigator.pop(ctx, false);
                      },
                      behavior: HitTestBehavior.opaque,
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.symmetric(vertical: 17),
                        color: Colors.transparent,
                        child: Text(
                          'Hủy'.tr(),
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: theme.colorScheme.primary,
                            fontSize: 17,
                            fontWeight: FontWeight.w700,
                            letterSpacing: -0.3,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            ),
          ),
        );
      },
    );

    if (confirmed != true || !mounted) return;
    setState(() => _isMarkingDone = true);
    try {
      await techApiRepository.markJobDone(progressId: widget.progressId);
      if (mounted) {
        HapticFeedback.mediumImpact();

        final execState = ref.read(jobExecutionControllerProvider).value;
        if (execState != null) {
          final updatedParts = execState.parts.map((p) =>
            p.status == JobPartStatus.installing ? p.copyWith(status: JobPartStatus.completed) : p,
          ).toList();
          ref.read(jobExecutionControllerProvider.notifier).state =
            AsyncData(execState.copyWith(parts: updatedParts));
        }

        ref.read(techDashboardControllerProvider.notifier).refresh();

        GlassToast.show(context, title: 'Hoàn tất! Chờ SA nghiệm thu.'.tr(), icon: CupertinoIcons.check_mark_circled_solid);
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (mounted) {
        HapticFeedback.heavyImpact();
        GlassToast.show(context, title: e.toString().replaceFirst('Exception: ', ''), icon: CupertinoIcons.xmark_circle);
      }
    } finally {
      if (mounted) setState(() => _isMarkingDone = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final stateAsync = ref.watch(jobExecutionControllerProvider);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: Stack(
          children: [
          CustomScrollView(
            slivers: [
              SliverAppBar.medium(
                backgroundColor: Colors.transparent,
                surfaceTintColor: Colors.transparent,
                shadowColor: Colors.transparent,
                scrolledUnderElevation: 0,
                forceMaterialTransparency: true,
                elevation: 0,
                pinned: true,
                stretch: false,
                leading: Padding(
                  padding: const EdgeInsets.only(left: 8),
                  child: GlassNavBackButton(),
                ),
                flexibleSpace: FlexibleSpaceBar(
                  stretchModes: const [],
                  titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  title: Text(
                    widget.plate,
                    style: theme.textTheme.headlineLarge?.copyWith(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.8,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                  child: JobSegmentedControl(
                    selectedIndex: _currentTab,
                    onValueChanged: _onTabChanged,
                    isDark: isDark,
                  ),
                ),
              ),
              stateAsync.when(
                data: (state) {
                  return SliverFillRemaining(
                    hasScrollBody: false,
                    child: SizedBox(
                      height: MediaQuery.of(context).size.height - 250,
                      child: PageView(
                        controller: _pageController,
                        onPageChanged: (index) {
                          setState(() {
                            _currentTab = index;
                          });
                        },
                        physics: const BouncingScrollPhysics(),
                        children: [
                          SingleChildScrollView(
                            physics: const BouncingScrollPhysics(),
                            child: Padding(
                              padding: const EdgeInsets.only(bottom: 180),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  if (state.awaitingParts)
                                    _AwaitingPartsBanner(isDark: isDark),
                                  JobTasksSection(
                                    tasks: state.tasks,
                                    isDark: isDark,
                                    isLoading: state.isLoading,
                                    onToggleStatus: (id) {
                                      final task = state.tasks.firstWhere((t) => t.id == id);
                                      _handleTaskAction(id, task.status);
                                    },
                                    onCameraTap: _handleCameraTap,
                                  ),
                                ],
                              ),
                            ),
                          ),
                          SingleChildScrollView(
                            physics: const BouncingScrollPhysics(),
                            child: Padding(
                              padding: const EdgeInsets.only(bottom: 180),
                              child: JobPartsSection(
                                parts: state.parts,
                                isDark: isDark,
                                isLoading: state.isLoading,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
                loading: () => const SliverFillRemaining(
                  child: Center(child: CupertinoActivityIndicator()),
                ),
                error: (err, stack) => SliverFillRemaining(
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(CupertinoIcons.exclamationmark_circle, size: 40, color: Color(0xFFFF3B30)),
                          const SizedBox(height: 12),
                          Text(
                            err.toString().replaceFirst('Exception: ', ''),
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                          const SizedBox(height: 16),
                          CupertinoButton(
                            onPressed: () => ref.read(jobExecutionControllerProvider.notifier).init(widget.progressId),
                            child: const Text('Thử lại'),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              top: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    JobDangerFab(onTap: _handleReportIssue),
                    const SizedBox(height: 10),
                    // §10: LiquidButton bọc trong Island glass — không dùng FilledButton (Material)
                    ClipSmoothRect(
                      radius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
                        child: Container(
                          color: isDark
                              ? Colors.white.withValues(alpha: 0.04)
                              : Colors.white.withValues(alpha: 0.25),
                          padding: const EdgeInsets.all(10),
                          child: LiquidButton(
                            onPressed: _isMarkingDone ? null : _handleMarkJobDone,
                            isLoading: _isMarkingDone,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(CupertinoIcons.checkmark_shield_fill, size: 18, color: Colors.white),
                                const SizedBox(width: 8),
                                Text(
                                  'Hoàn tất thi công'.tr(),
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w700,
                                    letterSpacing: -0.4,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
        ),
      ),
    );
  }
}

/// Banner cảnh báo khi đơn đang ở trạng thái WAITING_PARTS — kỹ thuật viên
/// chưa thể bắt đầu thi công cho tới khi kho xuất đủ phụ tùng đã báo giá.
class _AwaitingPartsBanner extends StatelessWidget {
  final bool isDark;

  const _AwaitingPartsBanner({required this.isDark});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    const color = Color(0xFFFF9500);

    return Container(
      margin: const EdgeInsets.fromLTRB(16, 0, 16, 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: isDark ? 0.12 : 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withValues(alpha: 0.3), width: 1),
      ),
      child: Row(
        children: [
          const Icon(CupertinoIcons.cube_box_fill, color: color, size: 22),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Đang chờ kho xuất phụ tùng cho đơn này. Bạn chỉ có thể bắt đầu thi công sau khi phụ tùng được giao đầy đủ.'.tr(),
              style: theme.textTheme.bodyMedium?.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
