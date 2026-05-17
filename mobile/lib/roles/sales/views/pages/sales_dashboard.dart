import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../auth/controllers/auth_controller.dart';
import '../../controllers/sales_dashboard_controller.dart';
import '../components/dashboard/sections/quick_stats_section.dart';
import '../components/dashboard/sections/the_pool_section.dart';

class SalesDashboardPage extends ConsumerStatefulWidget {
  const SalesDashboardPage({super.key});

  @override
  ConsumerState<SalesDashboardPage> createState() => _SalesDashboardPageState();
}

class _SalesDashboardPageState extends ConsumerState<SalesDashboardPage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final user = ref.watch(authControllerProvider).value;
    final state = ref.watch(salesDashboardProvider);

    return Scaffold(
      backgroundColor: Colors.transparent, // Nền gradient được set ở cấp cao hơn (Main Layout) hoặc tự handle tại đây
      body: Stack(
        children: [
          // Fixed background
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: theme.brightness == Brightness.dark
                      ? [
                          const Color(0xFF0F172A),
                          const Color(0xFF1E293B),
                        ]
                      : [
                          const Color(0xFFF7F9FB),
                          const Color(0xFFE0E3E5),
                        ],
                ),
              ),
            ),
          ),
          
          RefreshIndicator(
            onRefresh: () => ref.read(salesDashboardProvider.notifier).refresh(),
            child: CustomScrollView(
              physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
              slivers: [
                SliverAppBar.large(
                  backgroundColor: Colors.transparent, // Sẽ blend vào background
                  elevation: 0,
                  pinned: true,
                  floating: true,
                  flexibleSpace: FlexibleSpaceBar(
                    title: Text(
                      'Tổng quan'.tr(),
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  ),
                  actions: [
                    Padding(
                      padding: const EdgeInsets.only(right: 16.0),
                      child: GestureDetector(
                        onTap: () {
                          // Handle notifications
                        },
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: theme.colorScheme.surfaceContainerHighest.withOpacity(0.5),
                          ),
                          child: Stack(
                            children: [
                              Icon(
                                Icons.notifications_none,
                                color: theme.colorScheme.onSurface,
                              ),
                              Positioned(
                                right: 2,
                                top: 2,
                                child: Container(
                                  width: 8,
                                  height: 8,
                                  decoration: const BoxDecoration(
                                    color: Colors.red,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                  leading: Padding(
                    padding: const EdgeInsets.only(left: 24.0, top: 8, bottom: 8),
                    child: CircleAvatar(
                      backgroundImage: user?.avatarUrl != null 
                          ? NetworkImage(user!.avatarUrl!)
                          : null,
                      backgroundColor: theme.colorScheme.primary.withOpacity(0.2),
                      child: user?.avatarUrl == null
                          ? Icon(Icons.person, color: theme.colorScheme.primary)
                          : null,
                    ),
                  ),
                ),
                
                // Loading Skeleton (Simplistic wrapper) or Data
                if (state.isLoading && state.poolBookings.isEmpty)
                  const SliverFillRemaining(
                    child: Center(child: CircularProgressIndicator()),
                  )
                else
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 16.0, bottom: 100.0), // Padding bottom for nav bar
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          QuickStatsSection(
                            todayCount: state.todayBookings.length,
                            waitingCount: state.poolBookings.length,
                          ),
                          const SizedBox(height: 32),
                          const ThePoolSection(),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
