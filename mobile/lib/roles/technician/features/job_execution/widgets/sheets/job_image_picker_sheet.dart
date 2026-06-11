import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../controllers/job_execution_controller.dart';
import '../../constants/job_execution_constants.dart';
import '../../../../../../core/config/api_config.dart';

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

class _JobImagePickerSheetContent extends StatefulWidget {
  final String taskId;
  final WidgetRef ref;

  const _JobImagePickerSheetContent({required this.taskId, required this.ref});

  @override
  State<_JobImagePickerSheetContent> createState() => _JobImagePickerSheetContentState();
}

class _JobImagePickerSheetContentState extends State<_JobImagePickerSheetContent> {
  final _picker = ImagePicker();
  bool _isUploading = false;
  String? _errorMessage;

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
    required IconData icon,
    required String label,
    required VoidCallback? onTap,
  }) {
    final isDisabled = _isUploading || onTap == null;
    return GestureDetector(
      onTap: isDisabled ? null : onTap,
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
            Icon(icon, size: 20,
                color: isDisabled
                    ? theme.colorScheme.primary.withValues(alpha: 0.35)
                    : theme.colorScheme.primary),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                color: isDisabled
                    ? theme.colorScheme.primary.withValues(alpha: 0.35)
                    : theme.colorScheme.primary,
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

  Future<void> _pickAndUpload(ImageSource source) async {
    try {
      final file = await _picker.pickImage(source: source, imageQuality: 80, maxWidth: 1920);
      if (file == null || !mounted) return;

      setState(() {
        _isUploading = true;
        _errorMessage = null;
      });

      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('access_token');
      if (token == null) throw Exception('SESSION_EXPIRED');

      final bytes = await file.readAsBytes();
      final filename = file.name.isNotEmpty ? file.name : 'image.jpg';
      final dio = Dio(BaseOptions(
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
      ));
      final formData = FormData.fromMap({
        'image': MultipartFile.fromBytes(bytes, filename: filename),
      });
      final response = await dio.post(
        '${ApiConfig.baseUrl}/upload/image',
        data: formData,
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      final url = response.data['url'] as String?;
      if (!mounted) return;

      widget.ref
          .read(jobExecutionControllerProvider.notifier)
          .completeTask(widget.taskId, photoUrl: url);

      Navigator.pop(context);
    } on DioException catch (e) {
      if (!mounted) return;
      setState(() {
        _isUploading = false;
        _errorMessage = e.response?.statusCode == 401
            ? 'Phiên đăng nhập hết hạn.'
            : 'Không thể tải ảnh lên. Vui lòng thử lại.';
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _isUploading = false;
        _errorMessage = 'Không thể tải ảnh lên. Vui lòng thử lại.';
      });
    }
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
                            'Vui lòng chụp ảnh hoặc chọn ảnh minh chứng sau khi thi công xong để hoàn tất hạng mục.'.tr(),
                            style: TextStyle(
                              color: theme.colorScheme.onSurfaceVariant,
                              fontSize: 13,
                              height: 1.4,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          if (_errorMessage != null) ...[
                            const SizedBox(height: 8),
                            Text(
                              _errorMessage!,
                              style: TextStyle(
                                color: theme.colorScheme.error,
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                          if (_isUploading) ...[
                             const SizedBox(height: 12),
                             const CupertinoActivityIndicator(radius: 11),
                           ],
                        ],
                      ),
                    ),
                    Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                    _actionRow(
                      theme: theme,
                      icon: CupertinoIcons.camera,
                      label: 'Chụp ảnh mới'.tr(),
                      onTap: _isUploading ? null : () {
                        HapticFeedback.lightImpact();
                        _pickAndUpload(ImageSource.camera);
                      },
                    ),
                    Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                    _actionRow(
                      theme: theme,
                      icon: CupertinoIcons.photo_on_rectangle,
                      label: 'Chọn từ thư viện'.tr(),
                      onTap: _isUploading ? null : () {
                        HapticFeedback.lightImpact();
                        _pickAndUpload(ImageSource.gallery);
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
                  onTap: _isUploading ? null : () => Navigator.pop(context),
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
                        color: _isUploading
                            ? theme.colorScheme.primary.withValues(alpha: 0.35)
                            : theme.colorScheme.primary,
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
