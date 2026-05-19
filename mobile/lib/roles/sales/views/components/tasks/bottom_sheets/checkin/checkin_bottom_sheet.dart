import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:image_picker/image_picker.dart';
import '../../../../../../auth/models/task_model.dart';
import 'models/checkin_state_model.dart';
import 'controllers/checkin_controller.dart';
import 'widgets/checkin_camera_box.dart';
import 'widgets/checkin_signature_box.dart';
import 'widgets/checkin_submit_button.dart';
import 'widgets/checkin_image_source_sheet.dart';

class CheckInBottomSheet extends ConsumerWidget {
  final TaskModel task;
  final VoidCallback onComplete;

  const CheckInBottomSheet({
    super.key,
    required this.task,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(checkInControllerProvider);
    final controller = ref.read(checkInControllerProvider.notifier);
    final theme = Theme.of(context);

    // Watch for success state to close bottom sheet
    ref.listen<CheckInStateModel>(
      checkInControllerProvider,
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

                // Header (Apple 2026 Style)
                Stack(
                  alignment: Alignment.topCenter,
                  children: [
                    // Nút Close góc phải (Nổi mờ)
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
                    // Nội dung Căn giữa
                    Column(
                      children: [
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primary.withValues(alpha: 0.15),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.how_to_reg_rounded,
                            color: theme.colorScheme.primary,
                            size: 28,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          tr('Thủ tục Lái thử'),
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w700,
                            color: theme.colorScheme.onSurface,
                            letterSpacing: -0.5, // Chữ khít nhẹ đặc trưng iOS
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 32),

                // Driver License Upload Box
                CheckInCameraBox(
                  imagePath: state.driverLicensePath,
                  onTap: () {
                    showModalBottomSheet(
                      context: context,
                      backgroundColor: Colors.transparent,
                      barrierColor: Colors.black.withOpacity(0.4),
                      useRootNavigator: true,
                      builder: (context) => CheckInImageSourceSheet(controller: controller),
                    );
                  },
                ),
                const SizedBox(height: 24),

                // E-Signature Box
                CheckInSignatureBox(
                  signatureBytes: state.signatureBytes,
                  onSign: controller.saveSignature,
                  onClear: controller.clearSignature,
                ),
                const SizedBox(height: 32),

                // Submit Button
                CheckInSubmitButton(
                  isEnabled: controller.isValid,
                  isLoading: state.isSubmitting,
                  onPressed: () => controller.submitCheckin(task.id),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}