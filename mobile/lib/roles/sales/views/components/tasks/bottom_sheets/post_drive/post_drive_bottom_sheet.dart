import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import '../../../../../../auth/models/task_model.dart';
import 'models/post_drive_state_model.dart';
import 'controllers/post_drive_controller.dart';
import 'widgets/post_drive_header.dart';
import 'widgets/interest_level_selector.dart';
import 'widgets/feedback_input.dart';
import 'widgets/post_drive_submit_button.dart';

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
    final state = ref.watch(postDriveControllerProvider);
    final controller = ref.read(postDriveControllerProvider.notifier);
    final bottomPadding = MediaQuery.of(context).viewInsets.bottom;
    final theme = Theme.of(context);

    // Watch for success state to close bottom sheet
    ref.listen<PostDriveStateModel>(
      postDriveControllerProvider,
      (previous, next) {
        if (next.isSuccess) {
          Navigator.of(context).pop();
          onComplete();
        }
      },
    );

    return Container(
      decoration: ShapeDecoration(
        // Rất trong suốt để ăn vào nền màu đằng sau (Deep Vibrancy)
        color: theme.colorScheme.surface.withValues(alpha: 0.65),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
          // Specular Highlight
          side: BorderSide(
            color: theme.colorScheme.surface.withValues(alpha: 0.2),
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 32,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
          child: Padding(
            padding: EdgeInsets.only(
              top: 16,
              left: 24,
              right: 24,
              bottom: bottomPadding > 0 ? bottomPadding + 24 : 32 + MediaQuery.of(context).padding.bottom,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Drag handle
                Center(
                  child: Container(
                    width: 48,
                    height: 6,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.6), // Sáng rõ
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                const PostDriveHeader(),
                const SizedBox(height: 32),

                const InterestLevelSelector(),
                const SizedBox(height: 24),

                const FeedbackInput(),
                const SizedBox(height: 32),

                PostDriveSubmitButton(
                  isEnabled: controller.isValid,
                  isLoading: state.isSubmitting,
                  onPressed: () => controller.submitPostDriveData(task.id),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
