import 'package:flutter/material.dart';
import '../../../../core/utils/theme_extension.dart';
import '../components/tasks/header/tasks_header.dart';
import '../components/tasks/lists/tasks_list_view.dart';

class SalesTasksPage extends StatelessWidget {
  const SalesTasksPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: theme.brightness == Brightness.dark
                      ? [
                          const Color(0xFF0F172A),
                          const Color(0xFF1E293B),
                        ]
                      : [
                          const Color(0xFFF7F9FB),
                          const Color(0xFFE0E3E5),
                        ],
                ),
              ),
            ),
          ),
          SafeArea(
            bottom: false,
            child: Column(
              children: [
                const TasksHeader(),
                const Expanded(
                  child: TasksListView(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}