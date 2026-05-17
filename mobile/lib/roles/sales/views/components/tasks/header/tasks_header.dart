import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../controls/tasks_segmented_control.dart';
import '../../../../../../core/utils/theme_extension.dart';

class TasksHeader extends StatelessWidget {
  const TasksHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
        child: Container(
          color: context.colors.surface.withValues(alpha: 0.65),
          padding: const EdgeInsets.only(top: 16, left: 24, right: 24, bottom: 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                tr('Danh sách Lái Thử', context: context),
                style: context.textTheme.headlineLarge?.copyWith(
                  color: context.colors.onSurface,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              const TasksSegmentedControl(),
            ],
          ),
        ),
      ),
    );
  }
}