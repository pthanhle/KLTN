import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/services.dart';

import 'components/layout/supplement_drag_handle.dart';
import 'components/layout/supplement_header.dart';
import 'components/media/supplement_media_picker.dart';
import 'components/inputs/supplement_text_area.dart';
import 'components/buttons/supplement_submit_button.dart';
import '../../../controllers/supplement_controller.dart';
import 'package:ttauto_staff/shared/widgets/toast/glass_toast.dart';
import 'package:ttauto_staff/core/config/api_config.dart';

class SupplementModal extends ConsumerStatefulWidget {
  final String orderId;
  final String taskId;

  const SupplementModal({
    super.key,
    required this.orderId,
    required this.taskId,
  });

  static Future<void> show(BuildContext context, {required String orderId, required String taskId}) {
    return showModalBottomSheet<void>(
      context: context,
      useRootNavigator: true,
      backgroundColor: Colors.transparent,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      elevation: 0,
      isScrollControlled: true,
      builder: (ctx) => SupplementModal(
        orderId: orderId,
        taskId: taskId,
      ),
    );
  }

  @override
  ConsumerState<SupplementModal> createState() => _SupplementModalState();
}

class _SupplementModalState extends ConsumerState<SupplementModal> {
  final _descriptionController = TextEditingController();
  final _solutionController = TextEditingController();
  final _picker = ImagePicker();
  final List<String> _mediaUrls = [];
  bool _isUploading = false;

  @override
  void dispose() {
    _descriptionController.dispose();
    _solutionController.dispose();
    super.dispose();
  }

  Future<void> _pickImage() async {
    HapticFeedback.selectionClick();
    // Show camera / gallery picker
    final source = await showCupertinoModalPopup<ImageSource>(
      context: context,
      builder: (ctx) {
        final theme = Theme.of(ctx);
        final isDark = theme.brightness == Brightness.dark;

        Widget glassBlock({required Widget child}) => Container(
              width: double.infinity,
              decoration: ShapeDecoration(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.05)
                    : Colors.white.withValues(alpha: 0.72),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.80),
                    width: 0.5,
                  ),
                ),
              ),
              child: ClipSmoothRect(
                radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                child: ClipRect(
                  child: BackdropFilter(
                    filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                    child: child,
                  ),
                ),
              ),
            );

        Widget row({required IconData icon, required String label, required ImageSource src}) =>
            GestureDetector(
              onTap: () => Navigator.pop(ctx, src),
              behavior: HitTestBehavior.opaque,
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 16),
                color: Colors.transparent,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(icon, size: 20, color: theme.colorScheme.primary),
                    const SizedBox(width: 8),
                    Text(label,
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontSize: 17,
                          fontWeight: FontWeight.w600,
                        )),
                  ],
                ),
              ),
            );

        return Material(
          type: MaterialType.transparency,
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  glassBlock(
                    child: Column(children: [
                      row(icon: CupertinoIcons.camera, label: 'Chụp ảnh mới'.tr(), src: ImageSource.camera),
                      Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                      row(icon: CupertinoIcons.photo_on_rectangle, label: 'Chọn từ thư viện'.tr(), src: ImageSource.gallery),
                    ]),
                  ),
                  const SizedBox(height: 10),
                  glassBlock(
                    child: GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      behavior: HitTestBehavior.opaque,
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        color: Colors.transparent,
                        child: Text('Hủy'.tr(),
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: theme.colorScheme.primary,
                              fontSize: 17,
                              fontWeight: FontWeight.w700,
                            )),
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                ],
              ),
            ),
          ),
        );
      },
    );

    if (source == null || !mounted) return;
    await _doUpload(source);
  }

  Future<void> _doUpload(ImageSource source) async {
    try {
      final file = await _picker.pickImage(source: source, imageQuality: 80, maxWidth: 1920);
      if (file == null || !mounted) return;

      setState(() => _isUploading = true);

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
      if (url != null && mounted) {
        setState(() {
          _mediaUrls.add(url);
          _isUploading = false;
        });
      }
    } on DioException catch (e) {
      if (!mounted) return;
      setState(() => _isUploading = false);
      GlassToast.show(
        context,
        title: e.response?.statusCode == 401
            ? 'Phiên đăng nhập hết hạn.'
            : 'Không thể tải ảnh lên. Vui lòng thử lại.',
      );
    } catch (_) {
      if (!mounted) return;
      setState(() => _isUploading = false);
      GlassToast.show(context, title: 'Không thể tải ảnh lên. Vui lòng thử lại.');
    }
  }

  Future<void> _handleSubmit() async {
    final controller = ref.read(supplementControllerProvider.notifier);
    try {
      await controller.submitRequest(
        orderId: widget.orderId,
        taskId: widget.taskId,
        description: _descriptionController.text,
        proposedSolution: _solutionController.text,
        evidenceUrls: _mediaUrls,
      );

      if (mounted) {
        Navigator.of(context).pop();
        GlassToast.show(context, title: 'Đã gửi báo cáo thành công'.tr());
      }
    } catch (e) {
      if (mounted) {
        showCupertinoDialog(
          context: context,
          builder: (ctx) => CupertinoAlertDialog(
            title: const Text('Lỗi'),
            content: Text(e.toString().replaceAll('Exception: ', '')),
            actions: [
              CupertinoDialogAction(
                child: const Text('Đóng'),
                onPressed: () => Navigator.of(ctx).pop(),
              )
            ],
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final viewInsets = MediaQuery.of(context).viewInsets;
    final state = ref.watch(supplementControllerProvider);

    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        bottom: viewInsets.bottom > 0
            ? viewInsets.bottom + 16
            : MediaQuery.of(context).padding.bottom + 16,
      ),
      child: Container(
        decoration: ShapeDecoration(
          color: isDark ? Colors.white.withValues(alpha: 0.05) : Colors.white.withValues(alpha: 0.65),
          shape: SmoothRectangleBorder(
            borderRadius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
            side: BorderSide(color: Colors.white.withValues(alpha: isDark ? 0.15 : 0.8), width: 0.5),
          ),
          shadows: [
            BoxShadow(
              color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.06),
              blurRadius: 20,
              offset: const Offset(0, 6),
            )
          ],
        ),
        child: ClipSmoothRect(
          radius: SmoothBorderRadius(cornerRadius: 32, cornerSmoothing: 1.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SupplementDragHandle(),
                  const SupplementHeader(),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        SupplementMediaPicker(
                          mediaUrls: _mediaUrls,
                          onPickImage: _pickImage,
                          onRemoveImage: (i) => setState(() => _mediaUrls.removeAt(i)),
                          isUploading: _isUploading,
                        ),
                        const SizedBox(height: 24),
                        SupplementTextArea(
                          label: 'Mô tả tình trạng lỗi'.tr(),
                          placeholder: 'Nhập chi tiết bộ phận hỏng hóc, âm thanh bất thường...'.tr(),
                          controller: _descriptionController,
                          maxLines: 4,
                        ),
                        const SizedBox(height: 16),
                        SupplementTextArea(
                          label: 'Giải pháp đề xuất (vd: Cần rã máy)'.tr(),
                          placeholder: 'Đề xuất hướng xử lý kỹ thuật...'.tr(),
                          controller: _solutionController,
                          maxLines: 3,
                        ),
                        const SizedBox(height: 32),
                        SupplementSubmitButton(
                          onPressed: _isUploading ? null : _handleSubmit,
                          isLoading: state.isLoading,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(CupertinoIcons.clear_thick_circled, size: 20, color: Colors.white),
                              const SizedBox(width: 8),
                              Text('Gửi Báo Cáo & Tạm Dừng Công Việc'.tr()),
                            ],
                          ),
                        ),
                        const SizedBox(height: 8),
                      ],
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
