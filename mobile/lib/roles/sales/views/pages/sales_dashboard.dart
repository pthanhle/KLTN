import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../auth/controllers/auth_controller.dart';
import '../../controllers/sales_dashboard_controller.dart';
import '../components/dashboard/sections/quick_stats_section.dart';
import '../components/dashboard/sections/the_pool_section.dart';
import '../components/dashboard/cards/pool_item_skeleton.dart';
import '../../../../core/views/components/navigation/header/header_avatar_button.dart';
import '../../../../core/views/components/navigation/header/header_notification_button.dart';

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
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
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
                  backgroundColor: Colors.transparent,
                  elevation: 0,
                  pinned: true,
                  stretch: false,
                  flexibleSpace: FlexibleSpaceBar(
                    stretchModes: const [], 
                    titlePadding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    title: Text(
                      'Tổng quan'.tr(),
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
                      unreadCount: 1, // Mock data, should connect to a provider
                      onPressed: () {
                        // Show notifications
                      },
                    ),
                  ],
                  leading: HeaderAvatarButton(
                    onPressed: () {
                      // Open profile or settings
                    },
                  ),
                ),
                
                if (state.isLoading && state.poolBookings.isEmpty)
                  SliverPadding(
                    padding: const EdgeInsets.only(top: 16.0, bottom: 100.0, left: 16.0, right: 16.0),
                    sliver: SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) => const PoolItemSkeleton(),
                        childCount: 3,
                      ),
                    ),
                  )
                else
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 16.0, bottom: 100.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          QuickStatsSection(
                            todayCount: state.todayBookings.length,
                            waitingCount: state.poolBookings.length,
                          ),
                          const SizedBox(height: 24),
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
