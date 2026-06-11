import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../roles/auth/controllers/auth_controller.dart';
import 'package:ttauto_staff/roles/sales/features/dashboard/sales_dashboard.dart';
import 'package:ttauto_staff/roles/service_advisor/features/dashboard/advisor_dashboard.dart';
import 'package:ttauto_staff/roles/technician/features/dashboard/tech_dashboard.dart';
import '../../../roles/warehouse/features/dashboard/warehouse_dashboard.dart';

class DynamicDashboard extends ConsumerWidget {
  const DynamicDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;

    if (user == null) {
      return const Center(child: CupertinoActivityIndicator());
    }

    switch (user.role.toLowerCase()) {
      case 'sales_executive':
      case 'sale':
        return const SalesDashboardPage();
      case 'service_advisor':
      case 'advisor':
        return const AdvisorDashboardPage();
      case 'lead_technician':
      case 'technician':
      case 'service':
        return const TechDashboardPage();
      case 'inventory_mgr':
      case 'warehouse_manager':
      case 'inventory':
        return const WarehouseDashboardPage();
      default:
        return Center(
          child: Text('Chưa hỗ trợ Dashboard cho role: ${user.role}'),
        );
    }
  }
}
