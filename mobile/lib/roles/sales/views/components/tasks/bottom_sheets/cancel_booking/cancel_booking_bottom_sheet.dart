import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import '../../../../../../auth/models/task_model.dart';
import '../../../../../constants/cancel_reasons_data.dart';
import 'controllers/cancel_booking_controller.dart';
import 'widgets/cancel_reason_item.dart';
import 'widgets/cancel_note_input.dart';

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

    // Watch for success state to close bottom sheet
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
        color: theme.colorScheme.surface.withOpacity(0.9),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 32,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
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
                // Drag handle
                Center(
                  child: Container(
                    width: 48,
                    height: 6,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.outlineVariant.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.warning_amber_rounded,
                          color: theme.colorScheme.error,
                          size: 20,
                        ),
                        const SizedBox(width: 8),
                        Text(
                          tr('BÁO HỦY LỊCH'),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: theme.colorScheme.error,
                            letterSpacing: 1.5,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.close),
                      style: IconButton.styleFrom(
                        backgroundColor: theme.colorScheme.surfaceContainerHigh,
                        foregroundColor: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 24),

                // Reasons List
                Text(
                  tr('Vui lòng chọn lý do hủy:'),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 12),
                
                Flexible(
                  child: SingleChildScrollView(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        ...CancelReasons.allReasons.map((reason) {
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
                          isRequired: state.selectedReasonId == 4, // ID 4 is "Lý do khác"
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Submit Button
                FilledButton(
                  onPressed: controller.isValid
                      ? () => controller.submitCancelBooking(task.id)
                      : null,
                  style: FilledButton.styleFrom(
                    backgroundColor: theme.colorScheme.error,
                    foregroundColor: theme.colorScheme.onError,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(
                        cornerRadius: 9999, // Pill shape
                        cornerSmoothing: 1.0,
                      ),
                    ),
                  ),
                  child: state.isSubmitting
                      ? SizedBox(
                          height: 24,
                          width: 24,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: theme.colorScheme.onError,
                          ),
                        )
                      : Text(
                          tr('Xác nhận Hủy'),
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
