import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../roles/auth/controllers/auth_controller.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/sales_tasks_page.dart';

class DynamicTasks extends ConsumerWidget {
  const DynamicTasks({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;

    if (user == null) {
      return const Center(child: CupertinoActivityIndicator());
    }

    switch (user.role.toLowerCase()) {
      case 'sales_executive':
      case 'sale':
        return const SalesTasksPage();
      default:
        return Scaffold(
          body: Center(
            child: Text('Chưa hỗ trợ Tasks cho role: ${user.role}'),
          ),
        );
    }
  }
}
