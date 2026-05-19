import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:easy_localization/easy_localization.dart';

class PackingItemActions {
  static List<Widget> buildStartActions(BuildContext context, VoidCallback onPackAll) {
    final theme = Theme.of(context);
    return [
      CustomSlidableAction(
        onPressed: (_) {
          HapticFeedback.heavyImpact();
          onPackAll();
        },
        backgroundColor: Colors.transparent,
        padding: const EdgeInsets.only(right: 8),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Container(
              width: double.infinity,
              height: double.infinity,
              decoration: ShapeDecoration(
                color: CupertinoColors.activeGreen.withValues(alpha: 0.25),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 16,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 0.5),
                ),
              ),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final showText = constraints.maxWidth >= 70;
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(CupertinoIcons.check_mark_circled_solid, color: CupertinoColors.activeGreen, size: 28),
                      if (showText) ...[
                        const SizedBox(height: 4),
                        Text(
                          'Nhặt đủ'.tr(),
                          maxLines: 1,
                          overflow: TextOverflow.fade,
                          softWrap: false,
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: CupertinoColors.activeGreen,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      ),
    ];
  }

  static List<Widget> buildEndActions(BuildContext context, VoidCallback onUndo) {
    final theme = Theme.of(context);
    return [
      CustomSlidableAction(
        onPressed: (_) {
          HapticFeedback.mediumImpact();
          onUndo();
        },
        backgroundColor: Colors.transparent,
        padding: const EdgeInsets.only(left: 8),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 16,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Container(
              width: double.infinity,
              height: double.infinity,
              decoration: ShapeDecoration(
                color: CupertinoColors.destructiveRed.withValues(alpha: 0.25),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 16,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 0.5),
                ),
              ),
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final showText = constraints.maxWidth >= 70;
                  return Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(CupertinoIcons.arrow_counterclockwise, color: CupertinoColors.destructiveRed, size: 28),
                      if (showText) ...[
                        const SizedBox(height: 4),
                        Text(
                          'Hoàn tác'.tr(),
                          maxLines: 1,
                          overflow: TextOverflow.fade,
                          softWrap: false,
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: CupertinoColors.destructiveRed,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ],
                  );
                },
              ),
            ),
          ),
        ),
      ),
    ];
  }
}
