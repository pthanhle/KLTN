import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/tech_task_model.dart';
import '../cards/tech_assignment_card.dart';
import '../skeletons/tech_assignment_card_skeleton.dart';

class TechTasksListSection extends StatelessWidget {
  final List<TechTaskModel>? tasks;
  final bool isLoading;

  const TechTasksListSection({
    super.key,
    required this.tasks,
    required this.isLoading,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (isLoading) {
      return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        sliver: SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) => const TechAssignmentCardSkeleton(),
            childCount: 3,
          ),
        ),
      );
    }

    if (tasks == null || tasks!.isEmpty) {
      return SliverFillRemaining(
        hasScrollBody: false,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                CupertinoIcons.tray,
                size: 64,
                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.35),
              ),
              const SizedBox(height: 16),
              Text(
                'Không có công việc nào'.tr(),
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.55),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (_, index) => TechAssignmentCard(task: tasks![index], index: index),
          childCount: tasks!.length,
        ),
      ),
    );
  }
}
