import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../controllers/job_execution_controller.dart';
import '../../constants/job_execution_constants.dart';

abstract final class JobImagePickerSheet {
  static void show(BuildContext context, {required String taskId, required WidgetRef ref}) {
    HapticFeedback.heavyImpact();
    showCupertinoModalPopup<void>(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.40),
      builder: (ctx) => _JobImagePickerSheetContent(taskId: taskId, ref: ref),
    );
  }
}

class _JobImagePickerSheetContent extends StatelessWidget {
  final String taskId;
  final WidgetRef ref;

  const _JobImagePickerSheetContent({required this.taskId, required this.ref});

  Widget _glassBlock({required ThemeData theme, required bool isDark, required Widget child}) {
    return Container(
      width: double.infinity,
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.05)
            : Colors.white.withValues(alpha: 0.72),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(
            cornerRadius: JobExecutionUiConstants.sheetCornerRadius,
            cornerSmoothing: 1.0,
          ),
          side: BorderSide(
            color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.80),
            width: 0.5,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.30 : 0.06),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: JobExecutionUiConstants.sheetCornerRadius,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: JobExecutionUiConstants.sheetBlurSigma,
            sigmaY: JobExecutionUiConstants.sheetBlurSigma,
          ),
          child: child,
        ),
      ),
    );
  }

  Widget _actionRow({
    required ThemeData theme,
    required BuildContext ctx,
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(
          vertical: JobExecutionUiConstants.sheetActionVerticalPadding,
        ),
        color: Colors.transparent,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 20, color: theme.colorScheme.primary),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                color: theme.colorScheme.primary,
                fontSize: JobExecutionUiConstants.sheetActionFontSize,
                fontWeight: FontWeight.w600,
                letterSpacing: -0.3,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Material(
      type: MaterialType.transparency,
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _glassBlock(
                theme: theme,
                isDark: isDark,
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 20, 20, 6),
                      child: Column(
                        children: [
                          Text(
                            'Cập nhật hình ảnh'.tr(),
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                              letterSpacing: -0.5,
                              color: theme.colorScheme.onSurface,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Vui lòng chụp ảnh hoặc quay video kết quả sau khi thi công xong để hoàn tất hạng mục.'.tr(),
                            style: TextStyle(
                              color: theme.colorScheme.onSurfaceVariant,
                              fontSize: 13,
                              height: 1.4,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                    Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                    _actionRow(
                      theme: theme,
                      ctx: context,
                      icon: CupertinoIcons.camera,
                      label: 'Chụp ảnh mới'.tr(),
                      onTap: () {
                        HapticFeedback.lightImpact();
                        Navigator.pop(context);
                        ref.read(jobExecutionControllerProvider.notifier).completeTask(taskId);
                      },
                    ),
                    Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                    _actionRow(
                      theme: theme,
                      ctx: context,
                      icon: CupertinoIcons.photo_on_rectangle,
                      label: 'Chọn từ thư viện'.tr(),
                      onTap: () {
                        HapticFeedback.lightImpact();
                        Navigator.pop(context);
                        ref.read(jobExecutionControllerProvider.notifier).completeTask(taskId);
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: JobExecutionUiConstants.sheetSpacingBetweenBlocks),
              _glassBlock(
                theme: theme,
                isDark: isDark,
                child: GestureDetector(
                  onTap: () => Navigator.pop(context),
                  behavior: HitTestBehavior.opaque,
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(
                      vertical: JobExecutionUiConstants.sheetActionVerticalPadding,
                    ),
                    color: Colors.transparent,
                    child: Text(
                      'Hủy'.tr(),
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: theme.colorScheme.primary,
                        fontSize: JobExecutionUiConstants.sheetActionFontSize,
                        fontWeight: FontWeight.w700,
                        letterSpacing: -0.3,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }
}
