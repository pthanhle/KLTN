import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/widgets/controls/tasks_segmented_control.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';
import '../../../../../../core/utils/theme_extension.dart';
import '../../../../../../shared/widgets/inputs/list_search_bar.dart';
import '../../../../../../shared/widgets/inputs/date_filter_chip.dart';

class TasksHeader extends ConsumerWidget {
  const TasksHeader({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = ref.read(salesTasksControllerProvider.notifier);
    final filterDate = ref.watch(salesTasksControllerProvider).filterDate;

    return Padding(
      padding: const EdgeInsets.only(top: 16, left: 24, right: 24, bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            tr('Danh sách Lái Thử', context: context),
            style: context.textTheme.headlineLarge?.copyWith(
              color: context.colors.onSurface,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.8,
            ),
          ),
          const SizedBox(height: 16),
          const TasksSegmentedControl(),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: ListSearchBar(
                  hintText: 'Tìm biển số, khách hàng...',
                  onChanged: controller.updateSearch,
                  padding: EdgeInsets.zero,
                ),
              ),
              const SizedBox(width: 8),
              DateFilterChip(
                selectedDate: filterDate,
                onDateChanged: controller.setFilterDate,
                padding: EdgeInsets.zero,
              ),
            ],
          ),
        ],
      ),
    );
  }
}