import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../models/tech_assignment_model.dart';
import 'assignment_card/tech_assignment_row.dart';

class TechAssignmentCard extends StatelessWidget {
  final TechAssignmentModel assignment;

  const TechAssignmentCard({
    super.key,
    required this.assignment,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.02)
            : Colors.white.withValues(alpha: 0.15),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.12 : 0.30),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 18, sigmaY: 18),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                TechAssignmentRow(
                  icon: CupertinoIcons.person_fill,
                  label: 'Tổ trưởng phụ trách'.tr(),
                  value: assignment.teamLeaderName,
                ),
                Divider(
                  height: 20,
                  thickness: 0.5,
                  color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.15),
                ),
                TechAssignmentRow(
                  icon: CupertinoIcons.time,
                  label: 'Ca làm việc'.tr(),
                  value: assignment.shiftTime,
                ),
                Divider(
                  height: 20,
                  thickness: 0.5,
                  color: Colors.white.withValues(alpha: isDark ? 0.10 : 0.15),
                ),
                TechAssignmentRow(
                  icon: CupertinoIcons.gauge,
                  label: 'Khoang làm việc'.tr(),
                  value: assignment.workingBay,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
