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

class JobExecutionPage extends ConsumerStatefulWidget {
  final String plate;

  const JobExecutionPage({
    super.key,
    required this.plate,
  });

  @override
  ConsumerState<JobExecutionPage> createState() => _JobExecutionPageState();
}

class _JobExecutionPageState extends ConsumerState<JobExecutionPage> {
  late PageController _pageController;
  int _currentTab = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
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
    if (status == JobTaskStatus.pending) {
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
      orderId: 'RO-12345', // Giả lập dữ liệu
      taskId: 'TASK-001',
    );
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
                              child: JobTasksSection(
                                tasks: state.tasks,
                                isDark: isDark,
                                onToggleStatus: (id) {
                                  final task = state.tasks.firstWhere((t) => t.id == id);
                                  _handleTaskAction(id, task.status);
                                },
                                onCameraTap: _handleCameraTap,
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
                                onToggleCheck: (id) => ref
                                    .read(jobExecutionControllerProvider.notifier)
                                    .togglePartCheck(id),
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
        ],
        ),
      ),
    );
  }
}
