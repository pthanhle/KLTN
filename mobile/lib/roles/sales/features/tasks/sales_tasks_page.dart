import 'dart:ui';
import 'package:flutter/material.dart';
import '../../../../core/utils/theme_extension.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/widgets/header/tasks_header.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/widgets/lists/tasks_list_view.dart';

class SalesTasksPage extends StatelessWidget {
  const SalesTasksPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          Stack(
            children: [
              Container(
                color: theme.brightness == Brightness.dark 
                  ? const Color(0xFF0F172A) 
                  : const Color(0xFFF1F5F9)
              ),
              Positioned(
                top: -100,
                left: -100,
                child: Container(
                  width: 400,
                  height: 400,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: theme.brightness == Brightness.dark ? 0.15 : 0.1),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
              Positioned(
                bottom: -50,
                right: -100,
                child: Container(
                  width: 500,
                  height: 500,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.tertiary.withValues(alpha: theme.brightness == Brightness.dark ? 0.1 : 0.08),
                    shape: BoxShape.circle,
                  ),
                ),
              ),
              Positioned.fill(
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
                  child: Container(color: Colors.transparent),
                ),
              ),
            ],
          ),
          Stack(
            children: [
              Positioned.fill(
                child: TasksListView(
                  topPadding: MediaQuery.of(context).padding.top + 130,
                ),
              ),
              
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: Container(
                  padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
                  child: const TasksHeader(),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}