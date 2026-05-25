import 'package:flutter/material.dart';
import '../../models/job_part_model.dart';
import '../cards/job_part_card.dart';

class JobPartsSection extends StatelessWidget {
  final List<JobPartModel> parts;
  final bool isDark;
  final Function(String) onToggleCheck;

  const JobPartsSection({
    super.key,
    required this.parts,
    required this.isDark,
    required this.onToggleCheck,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      itemCount: parts.length,
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      itemBuilder: (context, index) {
        final part = parts[index];
        return JobPartCard(
          part: part,
          isDark: isDark,
          onToggleCheck: () => onToggleCheck(part.id),
        );
      },
    );
  }
}
