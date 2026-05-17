import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../roles/auth/controllers/auth_controller.dart';
import '../../../roles/sales/views/pages/sales_tasks_page.dart';

class DynamicTasks extends ConsumerWidget {
  const DynamicTasks({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;

    if (user == null) {
      return const Center(child: CircularProgressIndicator());
    }

    switch (user.role) {
      case 'SALES_EXECUTIVE':
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
