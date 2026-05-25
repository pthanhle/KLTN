import 'package:go_router/go_router.dart';
import 'router_keys.dart';
import '../../roles/auth/views/pages/login/login_page.dart';

import '../../roles/sales/routes/sales_routes.dart';
import '../../roles/warehouse/routes/warehouse_routes.dart';
import '../../roles/service_advisor/routes/advisor_routes.dart';
import '../../roles/technician/routes/technician_routes.dart';

final GoRouter appRouter = GoRouter(
  navigatorKey: RouterKeys.rootNavigatorKey,
  initialLocation: '/login',
  routes: [
    GoRoute(
      path: '/login',
      name: 'login',
      builder: (context, state) => const LoginPage(),
    ),
    salesRoutes,
    warehouseRoutes,
    advisorRoutes,
    technicianRoutes,
  ],
);

