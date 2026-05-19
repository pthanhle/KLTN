import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../roles/auth/views/pages/login/login_page.dart';
import '../../roles/auth/views/pages/profile_page.dart';
import '../views/pages/dynamic_dashboard.dart';
import '../views/pages/dynamic_tasks.dart';
import '../views/pages/main_scaffold.dart';
import '../../roles/warehouse/warehouse_shell.dart';
import '../../roles/warehouse/features/dashboard/warehouse_home_page.dart';
import '../../roles/warehouse/features/orders/warehouse_orders_page.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();
final GlobalKey<NavigatorState> _shellNavigatorDashboardKey = GlobalKey<NavigatorState>(debugLabel: 'shellDashboard');
final GlobalKey<NavigatorState> _shellNavigatorTasksKey = GlobalKey<NavigatorState>(debugLabel: 'shellTasks');
final GlobalKey<NavigatorState> _shellNavigatorCalendarKey = GlobalKey<NavigatorState>(debugLabel: 'shellCalendar');
final GlobalKey<NavigatorState> _shellNavigatorProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellProfile');

final GlobalKey<NavigatorState> _shellNavigatorWarehouseHomeKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseHome');
final GlobalKey<NavigatorState> _shellNavigatorWarehouseOrdersKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseOrders');
final GlobalKey<NavigatorState> _shellNavigatorWarehouseProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseProfile');

final GoRouter appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/login',
  routes: [
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginPage(),
    ),
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return MainScaffold(navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          navigatorKey: _shellNavigatorDashboardKey,
          routes: [
            GoRoute(
              path: '/dashboard',
              name: 'dashboard',
              builder: (context, state) => const DynamicDashboard(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorTasksKey,
          routes: [
            GoRoute(
              path: '/tasks',
              name: 'tasks',
              builder: (context, state) => const DynamicTasks(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorCalendarKey,
          routes: [
            GoRoute(
              path: '/calendar',
              name: 'calendar',
              builder: (context, state) => const Scaffold(
                body: Center(child: Text('Trang Lịch Trình (Đang phát triển)')),
              ),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorProfileKey,
          routes: [
            GoRoute(
              path: '/profile',
              name: 'profile',
              builder: (context, state) => const ProfilePage(),
            ),
          ],
        ),
      ],
    ),
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return WarehouseShell(navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          navigatorKey: _shellNavigatorWarehouseHomeKey,
          routes: [
            GoRoute(
              path: '/warehouse',
              name: 'warehouse_home',
              builder: (context, state) => const WarehouseHomePage(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorWarehouseOrdersKey,
          routes: [
            GoRoute(
              path: '/warehouse/orders',
              name: 'warehouse_orders',
              builder: (context, state) => const WarehouseOrdersPage(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorWarehouseProfileKey,
          routes: [
            GoRoute(
              path: '/warehouse/profile',
              name: 'warehouse_profile',
              builder: (context, state) => const ProfilePage(), // Reusing profile page
            ),
          ],
        ),
      ],
    ),
  ],
);
