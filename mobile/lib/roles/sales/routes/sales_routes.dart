import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/routes/router_keys.dart';
import '../../../../core/views/pages/main_scaffold.dart';
import '../../../../core/views/pages/dynamic_dashboard.dart';
import '../../../../core/views/pages/dynamic_tasks.dart';
import '../../auth/views/pages/profile_page.dart';

final StatefulShellRoute salesRoutes = StatefulShellRoute.indexedStack(
  builder: (context, state, navigationShell) {
    return MainScaffold(navigationShell: navigationShell);
  },
  branches: [
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellSalesDashboardKey,
      routes: [
        GoRoute(
          path: '/dashboard',
          name: 'sales_dashboard',
          builder: (context, state) => const DynamicDashboard(),
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellSalesTasksKey,
      routes: [
        GoRoute(
          path: '/tasks',
          name: 'sales_tasks',
          builder: (context, state) => const DynamicTasks(),
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellSalesCalendarKey,
      routes: [
        GoRoute(
          path: '/calendar',
          name: 'sales_calendar',
          builder: (context, state) => const Scaffold(
            body: Center(child: Text('Trang Lịch Trình (Đang phát triển)')),
          ),
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellSalesProfileKey,
      routes: [
        GoRoute(
          path: '/profile',
          name: 'sales_profile',
          builder: (context, state) => const ProfilePage(),
        ),
      ],
    ),
  ],
);
