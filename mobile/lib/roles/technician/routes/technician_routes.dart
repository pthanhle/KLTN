import 'package:go_router/go_router.dart';
import '../../../../core/routes/router_keys.dart';
import '../technician_shell.dart';
import '../features/dashboard/tech_dashboard.dart';
import '../features/tasks/tech_tasks_page.dart';
import '../../auth/views/pages/profile_page.dart';

final StatefulShellRoute technicianRoutes = StatefulShellRoute.indexedStack(
  builder: (context, state, navigationShell) {
    return TechnicianShell(navigationShell: navigationShell);
  },
  branches: [
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellTechnicianDashboardKey,
      routes: [
        GoRoute(
          path: '/technician',
          name: 'technician_home',
          builder: (context, state) => const TechDashboardPage(),
        ),
      ],
    ),

    StatefulShellBranch(
      navigatorKey: RouterKeys.shellTechnicianTasksKey,
      routes: [
        GoRoute(
          path: '/technician/tasks',
          name: 'technician_tasks',
          builder: (context, state) => const TechTasksPage(),
        ),
      ],
    ),

    StatefulShellBranch(
      navigatorKey: RouterKeys.shellTechnicianProfileKey,
      routes: [
        GoRoute(
          path: '/technician/profile',
          name: 'technician_profile',
          builder: (context, state) => const ProfilePage(),
        ),
      ],
    ),
  ],
);
