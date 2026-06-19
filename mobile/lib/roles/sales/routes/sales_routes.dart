import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/routes/router_keys.dart';
import '../../../../core/views/pages/main_scaffold.dart';
import '../../../../core/views/pages/dynamic_dashboard.dart';
import '../../../../core/views/pages/dynamic_tasks.dart';
import '../features/contracts/views/contracts_page.dart';
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
      navigatorKey: RouterKeys.shellSalesCalendarKey, // Keep the key for now to avoid modifying core router_keys.dart unless needed
      routes: [
        GoRoute(
          path: '/contracts',
          name: 'sales_contracts',
          builder: (context, state) => const ContractsPage(),
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
