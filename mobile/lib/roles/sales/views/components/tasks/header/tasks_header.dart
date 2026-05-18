import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../controls/tasks_segmented_control.dart';
import '../../../../../../core/utils/theme_extension.dart';

class TasksHeader extends StatelessWidget {
  const TasksHeader({super.key});

  @override
  Widget build(BuildContext context) {
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
        ],
      ),
    );
  }
}