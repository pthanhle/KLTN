import 'dart:async';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../../../../../shared/widgets/buttons/liquid_button.dart';

class PoolItemAction extends StatelessWidget {
  final bool isRequestedByMe;
  final FutureOr<void> Function() onRequestJob;

  const PoolItemAction({
    super.key,
    required this.isRequestedByMe,
    required this.onRequestJob,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      switchInCurve: Curves.easeOutCubic,
      switchOutCurve: Curves.easeInCubic,
      transitionBuilder: (child, animation) {
        return FadeTransition(
          opacity: animation,
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.95, end: 1.0).animate(animation),
            child: child,
          ),
        );
      },
      child: isRequestedByMe
          ? Container(
              key: const ValueKey('waiting'),
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 16),
              decoration: ShapeDecoration(
                color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.4),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(
                    cornerRadius: 32,
                    cornerSmoothing: 1.0,
                  ),
                  side: BorderSide(
                    color: theme.dividerColor.withValues(alpha: 0.1),
                  ),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.sync_rounded, size: 20, color: theme.colorScheme.primary)
                      .animate(onPlay: (controller) => controller.repeat())
                      .rotate(duration: 2.seconds, curve: Curves.linear),
                  const SizedBox(width: 8),
                  Text(
                    'Đang chờ Admin duyệt'.tr(),
                    style: TextStyle(
                      color: theme.colorScheme.primary,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.4,
                    ),
                  ),
                ],
              ),
            ).animate(onPlay: (controller) => controller.repeat(reverse: true))
             .fade(begin: 0.7, end: 1.0, duration: 1.seconds, curve: Curves.easeInOut)
          : LiquidButton(
              key: const ValueKey('request'),
              onPressed: onRequestJob,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Yêu cầu nhận việc'.tr(),
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.4,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(Icons.arrow_forward_rounded, size: 20, color: Colors.white),
                ],
              ),
            ),
    );
  }
}
