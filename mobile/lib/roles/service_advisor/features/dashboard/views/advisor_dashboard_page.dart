import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import '../controllers/dashboard_controller.dart';
import '../models/repair_order_model.dart';
import '../widgets/advisor_empty_state.dart';
import '../widgets/sections/advisor_kanban_tabs.dart';
import '../widgets/cards/repair_order_card/repair_order_card.dart';
import '../widgets/cards/repair_order_skeleton.dart';
import '../../../../../core/views/components/navigation/header/header_avatar_button.dart';
import '../../../../../core/views/components/navigation/header/header_notification_button.dart';
import '../../../../../shared/widgets/backgrounds/mesh_background.dart';
import 'dart:ui';

class AdvisorDashboardPage extends ConsumerWidget {
  const AdvisorDashboardPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(advisorDashboardProvider);
    final controller = ref.read(advisorDashboardProvider.notifier);
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: RefreshIndicator(
          onRefresh: () => controller.refresh(),
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
                    unreadCount: 2,
                    onPressed: () {},
                  ),
                ],
                leading: HeaderAvatarButton(
                  onPressed: () {},
                ),
              ),

              SliverPersistentHeader(
                pinned: true,
                delegate: _KanbanTabsDelegate(
                  child: Container(
                    color: Colors.transparent,
                    padding: const EdgeInsets.only(bottom: 16, top: 8),
                    child: AdvisorKanbanTabs(
                      selectedStage: state.selectedStage,
                      onStageSelected: controller.selectStage,
                    ),
                  ),
                ),
              ),
              
              // List of Orders
              if (state.isLoading)
                SliverPadding(
                  padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 100.0),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) => const RepairOrderSkeleton(),
                      childCount: 3,
                    ),
                  ),
                )
              else if (state.filteredOrders.isEmpty)
                const SliverFillRemaining(
                  hasScrollBody: false,
                  child: Padding(
                    padding: EdgeInsets.only(bottom: 100),
                    child: AdvisorEmptyState(),
                  ),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 100.0),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final order = state.filteredOrders[index];
                        return RepairOrderCard(
                          order: order,
                          index: index,
                          onTap: () {
                            if (order.stage == ROStage.quotation) {
                              context.go('/advisor/quotation/${order.id}');
                            } else if (order.stage == ROStage.inProgress) {
                              context.go('/advisor/supplement/${order.id}');
                            } else {
                              // Mặc định các xe chờ đón sẽ vào Walkaround
                              context.go('/advisor/walkaround/${order.id}');
                            }
                          },
                        );
                      },
                      childCount: state.filteredOrders.length,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _KanbanTabsDelegate extends SliverPersistentHeaderDelegate {
  final Widget child;

  _KanbanTabsDelegate({required this.child});

  @override
  double get minExtent => 60.0;
  @override
  double get maxExtent => 60.0;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return child;
  }

  @override
  bool shouldRebuild(covariant _KanbanTabsDelegate oldDelegate) {
    return true; // Always rebuild to reflect state changes in tabs
  }
}
