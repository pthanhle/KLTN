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
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                        letterSpacing: -0.8,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                  ),
                  actions: [
                    Padding(
                      padding: const EdgeInsets.only(right: 12.0),
                      child: CupertinoButton(
                        padding: EdgeInsets.zero,
                        onPressed: () {
                          HapticFeedback.selectionClick();
                          // Handle notifications
                        },
                        child: ClipOval(
                          child: BackdropFilter(
                            filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
                                border: Border.all(
                                  color: theme.colorScheme.onSurface.withValues(alpha: 0.05),
                                ),
                              ),
                              child: Stack(
                                clipBehavior: Clip.none,
                                children: [
                                  Icon(
                                    CupertinoIcons.bell_fill,
                                    size: 22,
                                    color: theme.colorScheme.onSurface.withValues(alpha: 0.8),
                                  ),
                                  Positioned(
                                    right: -2,
                                    top: -2,
                                    child: Container(
                                      width: 10,
                                      height: 10,
                                      decoration: BoxDecoration(
                                        color: CupertinoColors.systemRed,
                                        shape: BoxShape.circle,
                                        border: Border.all(
                                          // Đục lỗ (Punch hole) chuẩn Apple cho Notification Badge
                                          color: theme.scaffoldBackgroundColor, 
                                          width: 2,
                                        ),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                  leading: Padding(
                    padding: const EdgeInsets.only(left: 16.0),
                    child: CupertinoButton(
                      padding: EdgeInsets.zero,
                      onPressed: () {
                        HapticFeedback.selectionClick();
                        // Handle profile tap
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: theme.colorScheme.onSurface.withValues(alpha: 0.1),
                            width: 1,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.05),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: CircleAvatar(
                          radius: 18,
                          backgroundImage: user?.avatarUrl != null 
                              ? NetworkImage(user!.avatarUrl!)
                              : null,
                          backgroundColor: theme.colorScheme.surfaceContainerHighest,
                          child: user?.avatarUrl == null
                              ? Icon(CupertinoIcons.person_fill, color: theme.colorScheme.primary, size: 20)
                              : null,
                        ),
                      ),
                    ),
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
