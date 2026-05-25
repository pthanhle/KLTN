import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/tech_job_model.dart';
import '../cards/tech_job_card.dart';
import '../skeletons/tech_job_card_skeleton.dart';

class TechActiveJobsSection extends StatelessWidget {
  final List<TechJobModel>? activeJobs;
  final bool isLoading;

  const TechActiveJobsSection({
    super.key,
    required this.activeJobs,
    required this.isLoading,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Xe đang giao'.tr(),
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w700,
            letterSpacing: -0.3,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        if (isLoading)
          Column(
            children: const [
              TechJobCardSkeleton(),
              SizedBox(height: 12),
              TechJobCardSkeleton(),
            ],
          )
        else if (activeJobs != null && activeJobs!.isNotEmpty)
          Column(
            children: activeJobs!.map((job) {
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: TechJobCard(job: job),
              );
            }).toList(),
          )
        else
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 20),
            child: Center(
              child: Text(
                'Không có xe nào đang giao'.tr(),
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.7),
                ),
              ),
            ),
          ),
      ],
    );
  }
}
