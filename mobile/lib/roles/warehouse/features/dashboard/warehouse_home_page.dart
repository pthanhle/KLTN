import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../auth/controllers/auth_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/controllers/warehouse_home_controller.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/widgets/cards/urgent_action_card.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/widgets/cards/daily_progress_ring_card/daily_progress_ring_card.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/models/daily_progress_model.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/widgets/banners/exception_alert_banner.dart';
import 'package:ttauto_staff/roles/warehouse/features/dashboard/widgets/cards/warehouse_home_skeleton.dart';
import '../../../../core/views/components/navigation/header/header_avatar_button.dart';
import '../../../../core/views/components/navigation/header/header_notification_button.dart';

class WarehouseHomePage extends ConsumerStatefulWidget {
  const WarehouseHomePage({super.key});

  @override
  ConsumerState<WarehouseHomePage> createState() => _WarehouseHomePageState();
}

class _WarehouseHomePageState extends ConsumerState<WarehouseHomePage> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final user = ref.watch(authControllerProvider).value;
    final state = ref.watch(warehouseDashboardProvider);

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
            onRefresh: () => ref.read(warehouseDashboardProvider.notifier).refresh(),
            child: CustomScrollView(
              physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
              slivers: [
                SliverAppBar.large(
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
                      unreadCount: 1, // Mock data
                      onPressed: () {},
                    ),
                  ],
                  leading: HeaderAvatarButton(
                    onPressed: () {},
                  ),
                ),
                
                if (state.isLoading)
                  const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.only(top: 16.0, bottom: 120.0, left: 16.0, right: 16.0),
                      child: WarehouseHomeSkeleton(),
                    ),
                  )
                else
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 16.0, bottom: 120.0, left: 16.0, right: 16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: UrgentActionCard(
                                  title: 'Đơn gấp'.tr(),
                                  count: '${state.urgentCount} Đơn',
                                  icon: CupertinoIcons.flame,
                                  baseColor: const Color(0xFFEF4444),
                                  onTap: () {},
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: UrgentActionCard(
                                  title: 'Chờ giao'.tr(),
                                  count: '${state.packedCount} Đơn',
                                  icon: CupertinoIcons.cube_box_fill,
                                  baseColor: const Color(0xFFEAB308),
                                  onTap: () {},
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),
                          
                          DailyProgressRingCard(
                            progressModel: DailyProgressModel(
                              completed: state.completed,
                              totalTarget: state.totalTarget,
                              date: DateTime.now().toIso8601String(),
                            ),
                          ),
                          const SizedBox(height: 24),

                          if (state.exceptions.isNotEmpty)
                            ...state.exceptions.map((exc) => ExceptionAlertBanner(
                              exceptionText: 'Thiếu hàng kệ {shelf}'.tr(namedArgs: {'shelf': exc}),
                            )),
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
