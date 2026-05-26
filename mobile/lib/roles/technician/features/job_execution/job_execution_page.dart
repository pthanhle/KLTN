import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'controllers/job_execution_controller.dart';
import 'models/job_task_model.dart';
import 'widgets/controls/job_segmented_control.dart';
import 'widgets/sections/job_tasks_section.dart';
import 'widgets/sections/job_parts_section.dart';
import 'widgets/nav/job_execution_nav_bar.dart';
import 'widgets/fab/job_danger_fab.dart';
import 'widgets/sheets/job_image_picker_sheet.dart';
import 'widgets/modals/supplement_modal/supplement_modal.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';

class JobExecutionPage extends ConsumerStatefulWidget {
  final String plate;
  final String orderId;

  const JobExecutionPage({
    super.key,
    required this.plate,
    this.orderId = 'RO-12345',
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
    setState(() => _currentTab = index);
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOutCubic,
    );
  }

  void _handleTaskToggle(String taskId) {
    final state = ref.read(jobExecutionControllerProvider).value;
    if (state == null) return;
    final task = state.tasks.firstWhere((t) => t.id == taskId);
    if (task.status == JobTaskStatus.pending) {
      ref.read(jobExecutionControllerProvider.notifier).startTask(taskId);
    } else if (task.status == JobTaskStatus.inProgress) {
      JobImagePickerSheet.show(context, taskId: taskId, ref: ref);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final stateAsync = ref.watch(jobExecutionControllerProvider);

    return CupertinoPageScaffold(
      backgroundColor: Colors.transparent,
      child: Material(
        type: MaterialType.transparency,
        child: MeshBackground(
          child: Stack(
          children: [
            CustomScrollView(
              slivers: [
                JobExecutionNavBar(plate: widget.plate),
                SliverPersistentHeader(
                  pinned: true,
                  delegate: _SegmentedHeaderDelegate(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                      child: JobSegmentedControl(
                        selectedIndex: _currentTab,
                        onValueChanged: _onTabChanged,
                        isDark: isDark,
                      ),
                    ),
                  ),
                ),
                stateAsync.when(
                  data: (state) => SliverFillRemaining(
                    hasScrollBody: false,
                    child: SizedBox(
                      height: MediaQuery.of(context).size.height - 250,
                      child: PageView(
                        controller: _pageController,
                        onPageChanged: (i) => setState(() => _currentTab = i),
                        physics: const BouncingScrollPhysics(),
                        children: [
                          SingleChildScrollView(
                            physics: const BouncingScrollPhysics(),
                            child: Padding(
                              padding: const EdgeInsets.only(bottom: 120),
                              child: JobTasksSection(
                                tasks: state.tasks,
                                isDark: isDark,
                                onToggleStatus: _handleTaskToggle,
                                onCameraTap: (id) =>
                                    JobImagePickerSheet.show(context, taskId: id, ref: ref),
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
                  ),
                  loading: () => SliverFillRemaining(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          child: Column(
                            children: List.generate(
                              3,
                              (_) => const Padding(
                                padding: EdgeInsets.only(bottom: 12),
                                child: _JobLoadingCard(),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  error: (err, _) => SliverFillRemaining(
                    child: Center(
                      child: Text(
                        'Lỗi: $err',
                        style: TextStyle(color: theme.colorScheme.error),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            JobDangerFab(
              onTap: () => SupplementModal.show(
                context,
                orderId: widget.orderId,
                taskId: 'TASK-001',
              ),
            ),
          ],
        ),
        ),
      ),
    );
  }
}

class _JobLoadingCard extends StatelessWidget {
  const _JobLoadingCard();

  @override
  Widget build(BuildContext context) {
    return const CupertinoActivityIndicator();
  }
}

class _SegmentedHeaderDelegate extends SliverPersistentHeaderDelegate {
  final Widget child;

  const _SegmentedHeaderDelegate({required this.child});

  @override
  double get minExtent => 64.0;

  @override
  double get maxExtent => 64.0;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final opacity = (shrinkOffset / maxExtent).clamp(0.0, 1.0);
    return Stack(
      children: [
        if (opacity > 0)
          Positioned.fill(
            child: ClipRect(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 24 * opacity, sigmaY: 24 * opacity),
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.15 * opacity),
                    border: Border(
                      bottom: BorderSide(
                        color: Colors.white.withValues(alpha: 0.3 * opacity),
                        width: 0.5,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        Center(child: child),
      ],
    );
  }

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate old) => true;
}
