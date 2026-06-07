import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../models/job_part_model.dart';
import '../../../../utils/job_status_utils.dart';
import '../../../../constants/job_execution_constants.dart';
import 'job_part_icon_badge.dart';
import 'job_part_check_button.dart';

class JobPartCard extends StatelessWidget {
  final JobPartModel part;
  final bool isDark;

  const JobPartCard({
    super.key,
    required this.part,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: const EdgeInsets.only(bottom: JobExecutionUiConstants.cardMarginBottom),
      decoration: ShapeDecoration(
        color: JobPartStatusUtils.cardBgColor(part.status, isDark),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: JobExecutionUiConstants.cardCornerRadius,
            cornerSmoothing: JobExecutionUiConstants.cardCornerSmoothing,
          ),
          side: BorderSide(
            color: JobPartStatusUtils.cardBorderColor(part.status, isDark),
            width: JobExecutionUiConstants.cardBorderWidth,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 32,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: JobExecutionUiConstants.cardCornerRadius,
          cornerSmoothing: JobExecutionUiConstants.cardCornerSmoothing,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: JobExecutionUiConstants.cardBlurSigma,
            sigmaY: JobExecutionUiConstants.cardBlurSigma,
          ),
          child: Padding(
            padding: const EdgeInsets.all(JobExecutionUiConstants.cardPadding),
            child: Row(
              children: [
                JobPartIconBadge(iconType: part.icon),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        part.name,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.onSurface,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${'SL'.tr()}: ${part.quantity}',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                      if (part.etaTime != null && part.status != JobPartStatus.completed) ...[
                        const SizedBox(height: 2),
                        Text(
                          '${'Dự kiến'.tr()}: ${DateFormat('HH:mm dd/MM').format(part.etaTime!.toLocal())}',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                JobPartCheckButton(status: part.status),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
