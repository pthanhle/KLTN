import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'data/mock_cancel_reasons.dart';
import 'controllers/cancel_booking_controller.dart';
import 'widgets/cancel_reason_item.dart';
import 'widgets/cancel_note_input.dart';
import 'widgets/cancel_action_button.dart';

class CancelBookingBottomSheet extends ConsumerWidget {
  final TaskModel task;
  final VoidCallback onComplete;

  const CancelBookingBottomSheet({
    super.key,
    required this.task,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(cancelBookingControllerProvider);
    final controller = ref.read(cancelBookingControllerProvider.notifier);
    final theme = Theme.of(context);

    ref.listen<CancelBookingState>(
      cancelBookingControllerProvider,
      (previous, next) {
        if (next.isSuccess) {
          Navigator.of(context).pop();
          onComplete();
        }
      },
    );

    return Container(
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.65),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
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
            padding: const EdgeInsets.only(
              top: 16,
              left: 24,
              right: 24,
              bottom: 32,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Container(
                    width: 48,
                    height: 6,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.6),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                Stack(
                  alignment: Alignment.topCenter,
                  children: [
                    Align(
                      alignment: Alignment.topRight,
                      child: IconButton(
                        onPressed: () => Navigator.of(context).pop(),
                        icon: const Icon(Icons.close, size: 20),
                        style: IconButton.styleFrom(
                          backgroundColor: theme.colorScheme.surface.withValues(alpha: 0.5),
                          foregroundColor: theme.colorScheme.onSurface.withValues(alpha: 0.8),
                          padding: const EdgeInsets.all(8),
                          minimumSize: const Size(36, 36),
                        ),
                      ),
                    ),
                    Column(
                      children: [
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.error.withValues(alpha: 0.15),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.event_busy_rounded,
                            color: theme.colorScheme.error,
                            size: 28,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          tr('Hủy lịch lái thử'),
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.onSurface,
                            letterSpacing: -0.5,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 32),

                Text(
                  tr('Vui lòng chọn lý do hủy:'),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: 12),
                
                Flexible(
                  child: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        ...MockCancelReasonsData.allReasons.map((reason) {
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: CancelReasonItem(
                              title: reason.translationKey,
                              isSelected: state.selectedReasonId == reason.id,
                              onTap: () => controller.selectReason(reason.id),
                            ),
                          );
                        }),
                        const SizedBox(height: 8),
                        CancelNoteInput(
                          onChanged: controller.updateNote,
                          isRequired: state.selectedReasonId == 4,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Submit Button
                CancelActionButton(
                  isEnabled: controller.isValid,
                  isLoading: state.isSubmitting,
                  onPressed: () => controller.submitCancelBooking(task.id),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
