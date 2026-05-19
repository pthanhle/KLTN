import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'island_button.dart';

class PackingActionIsland extends StatelessWidget {
  final bool isReadyToComplete;
  final VoidCallback onReport;
  final VoidCallback onComplete;

  const PackingActionIsland({
    super.key,
    required this.isReadyToComplete,
    required this.onReport,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      child: Container(
        decoration: ShapeDecoration(
          color: Colors.white.withValues(alpha: 0.25),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 36,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: Colors.white.withValues(alpha: 0.3),
              width: 0.5,
            ),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.2),
              blurRadius: 40,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(
            cornerRadius: 36,
            cornerSmoothing: 1.0,
          ),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Container(
              padding: const EdgeInsets.all(8),
              child: Row(
                children: [
                  IslandButton(
                    icon: CupertinoIcons.exclamationmark_triangle_fill,
                    color: theme.colorScheme.error,
                    iconColor: theme.colorScheme.error,
                    isCircle: true,
                    isGlowing: true,
                    onTap: onReport,
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: IslandButton(
                      icon: CupertinoIcons.checkmark_seal_fill,
                      label: 'Hoàn Tất Đóng Gói'.tr(),
                      color: isReadyToComplete ? theme.colorScheme.primary : Colors.transparent,
                      iconColor: isReadyToComplete ? Colors.white : theme.colorScheme.onSurfaceVariant,
                      textColor: isReadyToComplete ? Colors.white : theme.colorScheme.onSurfaceVariant,
                      isGlowing: isReadyToComplete,
                      onTap: isReadyToComplete ? onComplete : null,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
