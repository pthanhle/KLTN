import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:go_router/go_router.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../../shared/widgets/toast/glass_toast.dart';
import 'package:ttauto_staff/roles/warehouse/features/packing/models/report_reason_model.dart';

class ReportOptionItem extends StatelessWidget {
  final ReportReasonModel reason;

  const ReportOptionItem({
    super.key,
    required this.reason,
  });

  IconData _mapIcon(String? iconName) {
    switch (iconName) {
      case 'cube_box':
        return CupertinoIcons.cube_box;
      case 'barcode':
        return CupertinoIcons.barcode;
      case 'question_circle':
        return CupertinoIcons.question_circle;
      default:
        return CupertinoIcons.info_circle;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    final localizedTitle = reason.titleKey.tr();
    final localizedSubtitle = reason.subtitleKey.tr();
    final iconData = _mapIcon(reason.iconName);
    
    return GestureDetector(
      onTap: () {
        context.pop();
        GlassToast.show(
          context,
          title: 'Đã ghi nhận sự cố: {title}'.tr(namedArgs: {'title': localizedTitle}),
          icon: CupertinoIcons.info_circle_fill,
          color: theme.colorScheme.error,
        );
      },
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: ShapeDecoration(
          color: theme.colorScheme.surface.withValues(alpha: 0.4),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 20,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: theme.colorScheme.outlineVariant.withValues(alpha: 0.3),
              width: 0.5,
            ),
          ),
        ),
        child: Row(
          children: [
            Icon(iconData, color: theme.colorScheme.primary),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    localizedTitle,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    localizedSubtitle,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              CupertinoIcons.chevron_right,
              size: 16,
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ],
        ),
      ),
    );
  }
}
