import 'package:go_router/go_router.dart';
import '../../../../core/routes/router_keys.dart';
import '../advisor_shell.dart';
import '../features/dashboard/views/advisor_dashboard_page.dart';
import '../features/appointments/views/advisor_appointments_page.dart';
import '../features/walkaround/views/walkaround_page.dart';
import '../features/quotation/views/quotation_page.dart';
import '../features/supplement_approval/views/supplement_approval_page.dart';
import '../../auth/views/pages/profile_page.dart';

final StatefulShellRoute advisorRoutes = StatefulShellRoute.indexedStack(
  builder: (context, state, navigationShell) {
    return AdvisorShell(navigationShell: navigationShell);
  },
  branches: [
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellAdvisorDashboardKey,
      routes: [
        GoRoute(
          path: '/advisor',
          name: 'advisor_dashboard',
          builder: (context, state) => const AdvisorDashboardPage(),
          routes: [
            GoRoute(
              path: 'walkaround/:id',
              name: 'advisor_walkaround',
              parentNavigatorKey: RouterKeys.rootNavigatorKey,
              builder: (context, state) => WalkaroundPage(
                orderId: state.pathParameters['id'] ?? '',
              ),
            ),
            GoRoute(
              path: 'quotation/:id',
              name: 'advisor_quotation',
              parentNavigatorKey: RouterKeys.rootNavigatorKey,
              builder: (context, state) => QuotationPage(
                orderId: state.pathParameters['id'] ?? '',
              ),
            ),
            GoRoute(
              path: 'supplement/:id',
              name: 'advisor_supplement',
              parentNavigatorKey: RouterKeys.rootNavigatorKey,
              builder: (context, state) => SupplementApprovalPage(
                supplementId: state.pathParameters['id'] ?? '',
              ),
            ),
          ],
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellAdvisorAppointmentsKey,
      routes: [
        GoRoute(
          path: '/advisor/appointments',
          name: 'advisor_appointments',
          builder: (context, state) => const AdvisorAppointmentsPage(),
        ),
      ],
    ),
    StatefulShellBranch(
      navigatorKey: RouterKeys.shellAdvisorProfileKey,
      routes: [
        GoRoute(
          path: '/advisor/profile',
          name: 'advisor_profile',
          builder: (context, state) => const ProfilePage(),
        ),
      ],
    ),
  ],
);
