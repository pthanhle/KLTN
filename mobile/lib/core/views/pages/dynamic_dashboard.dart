import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../roles/auth/controllers/auth_controller.dart';
import '../../../roles/sales/views/pages/sales_dashboard.dart';
import '../../../roles/service_advisor/views/pages/advisor_dashboard.dart';
import '../../../roles/technician/views/pages/tech_dashboard.dart';
import '../../../roles/warehouse/views/pages/warehouse_dashboard.dart';

class DynamicDashboard extends ConsumerWidget {
  const DynamicDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;

    if (user == null) {
      return const Center(child: CircularProgressIndicator());
    }

    switch (user.role) {
      case 'SALES_EXECUTIVE':
        return const SalesDashboardPage();
      case 'SERVICE_ADVISOR':
        return const AdvisorDashboardPage();
      case 'LEAD_TECHNICIAN':
      case 'TECHNICIAN':
        return const TechDashboardPage();
      case 'INVENTORY_MGR':
      case 'WAREHOUSE_MANAGER':
        return const WarehouseDashboardPage();
      default:
        return Center(
          child: Text('Chưa hỗ trợ Dashboard cho role: ${user.role}'),
        );
    }
  }
}
