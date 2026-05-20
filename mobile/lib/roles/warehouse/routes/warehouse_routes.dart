import 'package:go_router/go_router.dart';
import '../../../../core/routes/router_keys.dart';
import '../warehouse_shell.dart';
import '../features/dashboard/warehouse_home_page.dart';
import '../features/orders/warehouse_orders_page.dart';
import '../../auth/views/pages/profile_page.dart';

final StatefulShellRoute warehouseRoutes = StatefulShellRoute.indexedStack(
  builder: (context, state, navigationShell) {
    return WarehouseShell(navigationShell: navigationShell);
  },
  branches: [
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellWarehouseHomeKey,
      routes: [
        GoRoute(
          path: '/warehouse',
          name: 'warehouse_home',
          builder: (context, state) => const WarehouseHomePage(),
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellWarehouseOrdersKey,
      routes: [
        GoRoute(
          path: '/warehouse/orders',
          name: 'warehouse_orders',
          builder: (context, state) => const WarehouseOrdersPage(),
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellWarehouseProfileKey,
      routes: [
        GoRoute(
          path: '/warehouse/profile',
          name: 'warehouse_profile',
          builder: (context, state) => const ProfilePage(),
        ),
      ],
    ),
  ],
);
