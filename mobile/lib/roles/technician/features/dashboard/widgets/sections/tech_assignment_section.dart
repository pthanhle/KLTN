import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../models/tech_assignment_model.dart';
import '../cards/tech_assignment_card.dart';

class TechAssignmentSection extends StatelessWidget {
  final TechAssignmentModel? assignment;
  final bool isLoading;

  const TechAssignmentSection({
    super.key,
    required this.assignment,
    required this.isLoading,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Phân công hôm nay'.tr(),
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w700,
            letterSpacing: -0.3,
            color: theme.colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 12),
        if (assignment != null)
          TechAssignmentCard(assignment: assignment!),
      ],
    );
  }
}
