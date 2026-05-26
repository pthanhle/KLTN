import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../models/job_task_model.dart';
import '../models/job_part_model.dart';

abstract final class JobTaskStatusUtils {
  static Color accentColor(JobTaskStatus status, ThemeData theme) =>
      switch (status) {
        JobTaskStatus.completed => const Color(0xFF34C759),
        JobTaskStatus.inProgress => const Color(0xFFFF9500),
        JobTaskStatus.pending => theme.colorScheme.primary,
      };

  static Color cardBgColor(JobTaskStatus status, bool isDark) =>
      switch (status) {
        JobTaskStatus.completed =>
          Colors.green.shade600.withValues(alpha: isDark ? 0.10 : 0.05),
        JobTaskStatus.inProgress =>
          Colors.orange.shade600.withValues(alpha: isDark ? 0.10 : 0.05),
        JobTaskStatus.pending => isDark
            ? Colors.white.withValues(alpha: 0.04)
            : Colors.white.withValues(alpha: 0.65),
      };

  static Color cardBorderColor(JobTaskStatus status, bool isDark) =>
      switch (status) {
        JobTaskStatus.completed =>
          Colors.green.shade600.withValues(alpha: 0.20),
        JobTaskStatus.inProgress =>
          Colors.orange.shade600.withValues(alpha: 0.20),
        JobTaskStatus.pending =>
          Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
      };

  static String actionLabel(JobTaskStatus status) => switch (status) {
        JobTaskStatus.completed => 'Đã hoàn thành'.tr(),
        JobTaskStatus.inProgress => 'Hoàn thành'.tr(),
        JobTaskStatus.pending => 'Bắt đầu'.tr(),
      };
}

abstract final class JobTaskIconUtils {
  static IconData fromModel(JobTaskIcon iconType) => switch (iconType) {
        JobTaskIcon.build => CupertinoIcons.wrench_fill,
        JobTaskIcon.cleaningServices => CupertinoIcons.sparkles,
        JobTaskIcon.checkCircle => CupertinoIcons.checkmark_circle_fill,
      };
}

abstract final class JobPartStatusUtils {
  static Color cardBgColor(JobPartStatus status, bool isDark) =>
      switch (status) {
        JobPartStatus.completed =>
          Colors.green.shade600.withValues(alpha: isDark ? 0.10 : 0.05),
        _ => isDark
            ? Colors.white.withValues(alpha: 0.04)
            : Colors.white.withValues(alpha: 0.65),
      };

  static Color cardBorderColor(JobPartStatus status, bool isDark) =>
      switch (status) {
        JobPartStatus.completed =>
          Colors.green.shade600.withValues(alpha: 0.20),
        _ => Colors.white.withValues(alpha: isDark ? 0.12 : 0.80),
      };
}

abstract final class JobPartIconUtils {
  static IconData fromModel(JobPartIcon iconType) => switch (iconType) {
        JobPartIcon.settings => CupertinoIcons.gear_alt_fill,
        JobPartIcon.waterDrop => CupertinoIcons.drop_fill,
      };
}
