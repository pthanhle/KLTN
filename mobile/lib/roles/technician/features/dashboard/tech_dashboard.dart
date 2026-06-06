import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../core/views/components/navigation/header/header_avatar_button.dart';
import '../../../../core/views/components/navigation/header/header_notification_button.dart';
import 'controllers/tech_dashboard_controller.dart';
import 'widgets/sections/tech_today_summary_section.dart';
import 'widgets/sections/tech_active_jobs_section.dart';
import 'widgets/sections/tech_assignment_section.dart';

class TechDashboardPage extends ConsumerStatefulWidget {
  const TechDashboardPage({super.key});

  @override
  ConsumerState<TechDashboardPage> createState() => _TechDashboardPageState();
}

class _TechDashboardPageState extends ConsumerState<TechDashboardPage>
    with WidgetsBindingObserver {

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    // Refresh data every time the page is mounted (navigation to this tab)
    Future.microtask(() =>
      ref.read(techDashboardControllerProvider.notifier).refresh(),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      ref.read(techDashboardControllerProvider.notifier).refresh();
    }
  }

  @override
  Widget build(BuildContext context) {
    final dashboardState = ref.watch(techDashboardControllerProvider);
    final theme = Theme.of(context);

    final isLoading = dashboardState.isLoading;
    final summary = dashboardState.value?.summary;
    final activeJobs = dashboardState.value?.activeJobs;
    final assignment = dashboardState.value?.assignment;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: RefreshIndicator(
          onRefresh: () => ref.read(techDashboardControllerProvider.notifier).refresh(),
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
                    'Trang chủ'.tr(),
                    style: theme.textTheme.headlineLarge?.copyWith(
                      fontSize: 34,
                      fontWeight: FontWeight.w700,
                      letterSpacing: -1.2,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ),
                actions: [
                  HeaderNotificationButton(
                    unreadCount: 0,
                    onPressed: () {},
                  ),
                ],
                leading: HeaderAvatarButton(
                  onPressed: () {},
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 120),
                sliver: SliverList(
                  delegate: SliverChildListDelegate([
                    TechTodaySummarySection(
                      summary: summary,
                      isLoading: isLoading,
                    ),
                    const SizedBox(height: 28),
                    TechActiveJobsSection(
                      activeJobs: activeJobs,
                      isLoading: isLoading,
                    ),
                    const SizedBox(height: 28),
                    TechAssignmentSection(
                      assignment: assignment,
                      isLoading: isLoading,
                    ),
                  ]),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
