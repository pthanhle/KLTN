import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'models/job_task_model.dart';
import 'controllers/job_execution_controller.dart';
import 'widgets/controls/job_segmented_control.dart';
import 'widgets/sections/job_tasks_section.dart';
import 'widgets/sections/job_parts_section.dart';
import '../../../../shared/widgets/toast/glass_toast.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../shared/widgets/buttons/glass_nav_back_button.dart';
import 'widgets/buttons/job_danger_fab.dart';
import 'widgets/modals/supplement_modal/supplement_modal.dart';
import '../tasks/data/tech_api_repository.dart';

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
    HapticFeedback.heavyImpact();
    showCupertinoModalPopup(
      context: context,
      builder: (context) => CupertinoActionSheet(
        title: Text('Yêu cầu chụp ảnh minh chứng'.tr()),
        message: Text('Vui lòng chụp ảnh hoặc quay video kết quả sau khi thi công xong để hoàn tất hạng mục.'.tr()),
        actions: [
          CupertinoActionSheetAction(
            child: Text('Chụp ảnh mới'.tr()),
            onPressed: () {
              Navigator.pop(context);
              ref.read(jobExecutionControllerProvider.notifier).completeTask(taskId);
            },
          ),
          CupertinoActionSheetAction(
            child: Text('Chọn từ thư viện'.tr()),
            onPressed: () {
              Navigator.pop(context);
              ref.read(jobExecutionControllerProvider.notifier).completeTask(taskId);
            },
          ),
        ],
        cancelButton: CupertinoActionSheetAction(
          isDestructiveAction: true,
          child: Text('Hủy'.tr()),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
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
    final confirmed = await showCupertinoDialog<bool>(
      context: context,
      builder: (ctx) => CupertinoAlertDialog(
        title: Text('Hoàn tất thi công?'.tr()),
        content: Text('Xe sẽ được chuyển sang giai đoạn QC nghiệm thu. Bạn không thể hoàn tác.'.tr()),
        actions: [
          CupertinoDialogAction(
            isDestructiveAction: true,
            child: Text('Hủy'.tr()),
            onPressed: () => Navigator.of(ctx).pop(false),
          ),
          CupertinoDialogAction(
            isDefaultAction: true,
            child: Text('Xác nhận'.tr()),
            onPressed: () => Navigator.of(ctx).pop(true),
          ),
        ],
      ),
    );

    if (confirmed != true || !mounted) return;
    setState(() => _isMarkingDone = true);
    try {
      await techApiRepository.markJobDone(progressId: widget.progressId);
      if (mounted) {
        GlassToast.show(context, title: 'Hoàn tất! Chờ SA nghiệm thu.'.tr(), icon: CupertinoIcons.check_mark_circled_solid);
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (mounted) {
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
                              padding: const EdgeInsets.only(bottom: 120),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  if (state.awaitingParts)
                                    _AwaitingPartsBanner(isDark: isDark),
                                  JobTasksSection(
                                    tasks: state.tasks,
                                    isDark: isDark,
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
                              padding: const EdgeInsets.only(bottom: 120),
                              child: JobPartsSection(
                                parts: state.parts,
                                isDark: isDark,
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
                  child: Center(child: Text('Lỗi: $err')),
                ),
              ),
            ],
          ),
          JobDangerFab(
            onTap: _handleReportIssue,
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: SafeArea(
              top: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 12),
                child: FilledButton.icon(
                  onPressed: _isMarkingDone ? null : _handleMarkJobDone,
                  style: FilledButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                  ),
                  icon: _isMarkingDone
                      ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(CupertinoIcons.checkmark_shield_fill, size: 18),
                  label: Text(
                    _isMarkingDone ? 'Đang xử lý...'.tr() : 'Hoàn tất thi công'.tr(),
                    style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                  ),
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
