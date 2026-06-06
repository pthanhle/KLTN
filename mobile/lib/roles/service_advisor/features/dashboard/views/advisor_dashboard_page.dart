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
import '../../../../../roles/auth/controllers/auth_controller.dart';

class AdvisorDashboardPage extends ConsumerStatefulWidget {
  const AdvisorDashboardPage({super.key});

  @override
  ConsumerState<AdvisorDashboardPage> createState() =>
      _AdvisorDashboardPageState();
}

class _AdvisorDashboardPageState extends ConsumerState<AdvisorDashboardPage> {
  @override
  Widget build(BuildContext context) {
    final state = ref.watch(advisorDashboardProvider);
    final controller = ref.read(advisorDashboardProvider.notifier);
    final theme = Theme.of(context);

    // Listen for session expiry and auto-logout
    ref.listen<AdvisorDashboardState>(advisorDashboardProvider, (prev, next) {
      if (next.sessionExpired && !(prev?.sessionExpired ?? false)) {
        ref.read(authControllerProvider.notifier).logout();
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (context.mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text(
                    'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'),
                backgroundColor: Colors.red,
              ),
            );
            context.go('/login');
          }
        });
      }
    });

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: MeshBackground(
        child: RefreshIndicator(
          onRefresh: () => controller.refresh(),
          child: CustomScrollView(
            physics:
                const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
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
                  titlePadding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
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
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.only(top: 8, bottom: 16),
                  child: AdvisorKanbanTabs(
                    selectedStage: state.selectedStage,
                    onStageSelected: controller.selectStage,
                  ),
                ),
              ),
              if (state.isLoading)
                SliverPadding(
                  padding: const EdgeInsets.only(
                      top: 4, left: 16.0, right: 16.0, bottom: 100.0),
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
                  padding: const EdgeInsets.only(
                      top: 4, left: 16.0, right: 16.0, bottom: 100.0),
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
                              if (order.pendingSupplementId != null) {
                                context.go('/advisor/supplement/${order.id}');
                              } else {
                                context.go('/advisor/qc/${order.id}');
                              }
                            } else {
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
