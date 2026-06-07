import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'dart:ui';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../shared/widgets/inputs/list_search_bar.dart';
import '../../../../shared/widgets/inputs/date_filter_chip.dart';
import '../../../../core/views/components/navigation/header/header_avatar_button.dart';
import 'controllers/tech_tasks_controller.dart';
import 'widgets/sections/tech_tasks_list_section.dart';
import 'widgets/controls/tech_kanban_tabs.dart';

class TechTasksPage extends ConsumerWidget {
  const TechTasksPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tasksState = ref.watch(techTasksControllerProvider);
    final theme = Theme.of(context);

    final isLoading = tasksState.isLoading;
    final filteredTasks = tasksState.value?.filteredTasks;
    final currentTabIndex = tasksState.value?.currentTabIndex ?? 0;

    final selectedTab = TechTaskTab.values[currentTabIndex];

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: RefreshIndicator(
          onRefresh: () => ref.read(techTasksControllerProvider.notifier).refresh(),
          child: CustomScrollView(
            physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
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
                flexibleSpace: FlexibleSpaceBar(
                  stretchModes: const [],
                  titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  title: Text(
                    'Công việc'.tr(),
                    style: theme.textTheme.headlineLarge?.copyWith(
                      fontSize: 34,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -1.2,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ),
                actions: [const _FilterButton()],
                leading: HeaderAvatarButton(onPressed: () {}),
              ),
              SliverToBoxAdapter(
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(top: 4, bottom: 4),
                      child: TechKanbanTabs(
                        selectedTab: selectedTab,
                        onTabSelected: (tab) {
                          final index = TechTaskTab.values.indexOf(tab);
                          ref.read(techTasksControllerProvider.notifier).changeTab(index);
                        },
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                      child: Row(
                        children: [
                          Expanded(
                            child: ListSearchBar(
                              hintText: 'Tìm biển số, dòng xe, khoang...',
                              onChanged: (q) => ref.read(techTasksControllerProvider.notifier).updateSearch(q),
                              padding: EdgeInsets.zero,
                            ),
                          ),
                          const SizedBox(width: 8),
                          DateFilterChip(
                            selectedDate: tasksState.value?.filterDate,
                            onDateChanged: (date) => ref.read(techTasksControllerProvider.notifier).setFilterDate(date),
                            padding: EdgeInsets.zero,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.only(top: 4, bottom: 120),
                sliver: TechTasksListSection(
                  tasks: filteredTasks,
                  isLoading: isLoading,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FilterButton extends StatelessWidget {
  const _FilterButton();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(right: 12),
      child: GestureDetector(
        onTap: () => HapticFeedback.selectionClick(),
        child: Container(
          width: 36,
          height: 36,
          decoration: ShapeDecoration(
            color: isDark
                ? Colors.white.withValues(alpha: 0.08)
                : Colors.black.withValues(alpha: 0.05),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 11, cornerSmoothing: 1.0),
              side: BorderSide(
                color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.50),
                width: 0.5,
              ),
            ),
          ),
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 11, cornerSmoothing: 1.0),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
              child: Center(
                child: Icon(
                  CupertinoIcons.slider_horizontal_3,
                  size: 18,
                  color: theme.colorScheme.onSurface.withValues(alpha: 0.70),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
