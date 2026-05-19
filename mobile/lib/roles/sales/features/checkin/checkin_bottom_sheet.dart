import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:image_picker/image_picker.dart';
import 'package:ttauto_staff/roles/auth/models/task_model.dart';
import 'models/checkin_state_model.dart';
import 'controllers/checkin_controller.dart';
import 'widgets/checkin_camera_box.dart';
import 'widgets/checkin_signature_box.dart';
import 'widgets/checkin_submit_button.dart';
import 'widgets/checkin_image_source_sheet.dart';
import 'package:ttauto_staff/shared/widgets/buttons/glass_close_button.dart';

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
                      child: GlassCloseButton(
                        onPressed: () => Navigator.of(context).pop(),
                      ),
                    ),
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
                            letterSpacing: -0.5,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 32),

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

                CheckInSignatureBox(
                  signatureBytes: state.signatureBytes,
                  onSign: controller.saveSignature,
                  onClear: controller.clearSignature,
                ),
                const SizedBox(height: 32),

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