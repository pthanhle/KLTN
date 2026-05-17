import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../auth/models/task_model.dart';
import 'widgets/bottom_sheet_header.dart';
import 'widgets/interest_level_selector.dart';
import 'widgets/feedback_input.dart';
import 'widgets/bottom_sheet_footer.dart';

class PostDriveBottomSheet extends ConsumerWidget {
  final TaskModel task;
  final VoidCallback onComplete;

  const PostDriveBottomSheet({
    super.key,
    required this.task,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final bottomPadding = MediaQuery.of(context).viewInsets.bottom;
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return ClipSmoothRect(
      radius: const SmoothBorderRadius.vertical(
        top: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
      ),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 24.0, sigmaY: 24.0),
        child: Container(
          decoration: ShapeDecoration(
            color: theme.colorScheme.surface.withOpacity(isDark ? 0.65 : 0.85),
            shape: SmoothRectangleBorder(
              borderRadius: const SmoothBorderRadius.vertical(
                top: SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0),
              ),
              side: BorderSide(
                color: Colors.white.withOpacity(isDark ? 0.15 : 0.5),
                width: 1.0,
              ),
            ),
          ),
          padding: EdgeInsets.only(
            left: 24, 
            right: 24, 
            top: 12, 
            bottom: bottomPadding > 0 ? bottomPadding + 24 : 32 + MediaQuery.of(context).padding.bottom,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const BottomSheetHeader(),
              const SizedBox(height: 32),
              const InterestLevelSelector(),
              const SizedBox(height: 24),
              const FeedbackInput(),
              const SizedBox(height: 32),
              BottomSheetFooter(
                task: task,
                onComplete: onComplete,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

