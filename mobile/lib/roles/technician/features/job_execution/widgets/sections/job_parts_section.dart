import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/job_part_model.dart';
import '../../constants/job_execution_constants.dart';
import 'parts/job_part_card/job_part_card.dart';
import 'parts/skeletons/job_part_card_skeleton.dart';

class JobPartsSection extends StatelessWidget {
  final List<JobPartModel> parts;
  final bool isDark;
  final bool isLoading;

  const JobPartsSection({
    super.key,
    required this.parts,
    required this.isDark,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return ListView.builder(
        padding: const EdgeInsets.symmetric(
          horizontal: JobExecutionUiConstants.sectionHorizontalPadding,
          vertical: JobExecutionUiConstants.sectionVerticalPadding,
        ),
        itemCount: 3,
        physics: const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemBuilder: (context, _) => const JobPartCardSkeleton(),
      );
    }

    if (parts.isEmpty) {
      return Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: JobExecutionUiConstants.sectionHorizontalPadding,
          vertical: 48,
        ),
        child: Center(
          child: Text(
            'Không có phụ tùng nào'.tr(),
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(
        horizontal: JobExecutionUiConstants.sectionHorizontalPadding,
        vertical: JobExecutionUiConstants.sectionVerticalPadding,
      ),
      itemCount: parts.length,
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemBuilder: (context, index) {
        final part = parts[index];
        return JobPartCard(
          key: ValueKey(part.id),
          part: part,
          isDark: isDark,
        );
      },
    );
  }
}
