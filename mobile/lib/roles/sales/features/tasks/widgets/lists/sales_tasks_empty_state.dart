import 'package:flutter/material.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/utils/sales_tasks_status_utils.dart';

class SalesTasksEmptyState extends StatelessWidget {
  final TaskTab currentTab;
  final bool hasAnyTasks;
  final bool isSearchActive;

  const SalesTasksEmptyState({
    super.key,
    required this.currentTab,
    required this.hasAnyTasks,
    this.isSearchActive = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    final title = SalesTasksStatusUtils.emptyTitle(currentTab, hasAnyTasks, isSearchActive);
    final subtitle = SalesTasksStatusUtils.emptySubtitle(currentTab, hasAnyTasks, isSearchActive);
    final iconData = SalesTasksStatusUtils.emptyIcon(currentTab, hasAnyTasks, isSearchActive);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            iconData,
            size: 64,
            color: theme.colorScheme.primary.withValues(alpha: 0.5),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w800,
              color: theme.colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 8),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              subtitle,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w500,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
