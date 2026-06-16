import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/core/utils/theme_extension.dart';

class TaskContractSwipeAction extends StatelessWidget {
  final VoidCallback onPressed;

  const TaskContractSwipeAction({
    super.key,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return CustomSlidableAction(
      onPressed: (context) {
        HapticFeedback.mediumImpact();
        onPressed();
      },
      backgroundColor: Colors.transparent,
      padding: const EdgeInsets.only(left: 16, right: 8, top: 8, bottom: 8),
      child: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: ShapeDecoration(
          color: isDark
              ? Colors.white.withValues(alpha: 0.10)
              : theme.colorScheme.primary.withValues(alpha: 0.15),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(
              cornerRadius: 24,
              cornerSmoothing: 1.0,
            ),
            side: BorderSide(
              color: isDark
                  ? Colors.white.withValues(alpha: 0.20)
                  : theme.colorScheme.primary.withValues(alpha: 0.30),
              width: 0.5,
            ),
          ),
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    CupertinoIcons.doc_text_fill,
                    color: isDark ? Colors.white : theme.colorScheme.primary,
                    size: 28,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Lên HĐ',
                    style: TextStyle(
                      color: isDark ? Colors.white : theme.colorScheme.primary,
                      fontSize: 13,
                      fontWeight: FontWeight.w700,
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
