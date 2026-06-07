
import 'dart:io';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../../core/config/api_config.dart';
import '../../models/mpi_item_model.dart';
import '../inputs/mpi_note_textfield.dart';
import '../inputs/mpi_image_picker_grid.dart';
import '../../../../../../shared/widgets/buttons/glass_close_button.dart';
import '../../../../../../shared/widgets/buttons/liquid_button.dart';

class MpiItemUpdateModal extends StatefulWidget {
  final MpiItemModel item;
  final Function(String, List<String>) onSave;
  final ScrollController scrollController;

  const MpiItemUpdateModal({
    super.key,
    required this.item,
    required this.onSave,
    required this.scrollController,
  });

  static Future<void> show(
    BuildContext context,
    MpiItemModel item,
    bool isDark,
    Function(String, List<String>) onSave,
  ) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      useRootNavigator: true,
      barrierColor: Colors.black.withValues(alpha: 0.4),
      elevation: 0,
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.85,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) => MpiItemUpdateModal(
          item: item,
          onSave: onSave,
          scrollController: scrollController,
        ),
      ),
    );
  }

  @override
  State<MpiItemUpdateModal> createState() => _MpiItemUpdateModalState();
}

class _MpiItemUpdateModalState extends State<MpiItemUpdateModal> {
  late TextEditingController _noteController;
  late List<String> _mediaUrls;
  String? _errorMessage;
  int _errorShakeKey = 0;
  bool _isUploading = false;

  @override
  void initState() {
    super.initState();
    _noteController = TextEditingController(text: widget.item.note);
    _mediaUrls = List.from(widget.item.mediaUrls);
  }

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  final ImagePicker _picker = ImagePicker();

  void _removeImage(int index) {
    setState(() => _mediaUrls.removeAt(index));
  }

  Future<void> _pickImage() async {
    HapticFeedback.selectionClick();
    await showCupertinoModalPopup<void>(
      context: context,
      builder: (ctx) {
        final theme = Theme.of(ctx);
        final isDark = theme.brightness == Brightness.dark;

        Widget glassBlock({required Widget child}) {
          return Container(
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
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: isDark ? 0.30 : 0.06),
                  blurRadius: 20,
                  offset: const Offset(0, 6),
                ),
              ],
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
        }

        return Material(
          type: MaterialType.transparency,
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                mainAxisSize: MainAxisSize.min,
              children: [
                glassBlock(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
                        child: Text(
                          'Thêm ảnh minh chứng'.tr(),
                          style: theme.textTheme.titleSmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                            fontWeight: FontWeight.w500,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                      GestureDetector(
                        onTap: () async {
                          Navigator.pop(ctx);
                          await _doPickImage(ImageSource.camera);
                        },
                        behavior: HitTestBehavior.opaque,
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 17),
                          color: Colors.transparent,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(CupertinoIcons.camera, size: 20, color: theme.colorScheme.primary),
                              const SizedBox(width: 8),
                              Text(
                                'Chụp ảnh mới'.tr(),
                                style: TextStyle(
                                  color: theme.colorScheme.primary,
                                  fontSize: 17,
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: -0.3,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Container(height: 0.5, color: theme.dividerColor.withValues(alpha: 0.15)),
                      GestureDetector(
                        onTap: () async {
                          Navigator.pop(ctx);
                          await _doPickImage(ImageSource.gallery);
                        },
                        behavior: HitTestBehavior.opaque,
                        child: Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 17),
                          color: Colors.transparent,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(CupertinoIcons.photo_on_rectangle, size: 20, color: theme.colorScheme.primary),
                              const SizedBox(width: 8),
                              Text(
                                'Chọn từ thư viện'.tr(),
                                style: TextStyle(
                                  color: theme.colorScheme.primary,
                                  fontSize: 17,
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: -0.3,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                glassBlock(
                  child: GestureDetector(
                    onTap: () => Navigator.pop(ctx),
                    behavior: HitTestBehavior.opaque,
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 17),
                      color: Colors.transparent,
                      child: Text(
                        'Hủy'.tr(),
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: theme.colorScheme.primary,
                          fontSize: 17,
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
      },
    );
  }

  Future<void> _doPickImage(ImageSource source) async {
    try {
      final XFile? file = await _picker.pickImage(
        source: source,
        imageQuality: 80,
        maxWidth: 1920,
      );
      if (file == null || !mounted) return;

      setState(() {
        _isUploading = true;
        _errorMessage = null;
      });

      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('access_token');
      if (token == null) throw Exception('SESSION_EXPIRED');

      final dio = Dio(BaseOptions(
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
      ));
      // Use readAsBytes() for cross-platform (web + mobile) compatibility.
      // MultipartFile.fromFile() relies on dart:io which is unavailable on web.
      final bytes = await file.readAsBytes();
      final filename = file.name.isNotEmpty ? file.name : 'image.jpg';
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
      final statusCode = e.response?.statusCode;
      print('[MPI Upload] DioException: $statusCode ${e.message}');
      print('[MPI Upload] Response: ${e.response?.data}');
      String msg;
      if (statusCode == 401) {
        msg = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
      } else if (statusCode != null && statusCode >= 500) {
        msg = 'Lỗi máy chủ ($statusCode). Vui lòng thử lại.';
      } else {
        msg = 'Không thể tải ảnh lên. Vui lòng thử lại.';
      }
      if (mounted) {
        HapticFeedback.heavyImpact();
        setState(() {
          _isUploading = false;
          _errorMessage = msg;
          _errorShakeKey++;
        });
      }
    } catch (e) {
      print('[MPI Upload] Unexpected error: $e');
      if (mounted) {
        HapticFeedback.heavyImpact();
        setState(() {
          _isUploading = false;
          _errorMessage = 'Không thể tải ảnh lên. Vui lòng thử lại.';
          _errorShakeKey++;
        });
      }
    }
  }

  void _handleSave() {
    final note = _noteController.text.trim();
    final hasMedia = _mediaUrls.isNotEmpty;
    final isFailOrMonitor = widget.item.status == MpiItemStatus.fail ||
        widget.item.status == MpiItemStatus.monitor;

    if (isFailOrMonitor && note.isEmpty && !hasMedia) {
      HapticFeedback.heavyImpact();
      setState(() {
        _errorMessage = 'Vui lòng nhập ghi chú hoặc thêm ảnh minh chứng.'.tr();
        _errorShakeKey++;
      });
      return;
    }

    widget.onSave(note, _mediaUrls);
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final bottomInset = MediaQuery.of(context).viewInsets.bottom;

    return Container(
      decoration: ShapeDecoration(
        color: isDark
            ? Colors.white.withValues(alpha: 0.04)
            : Colors.white.withValues(alpha: 0.65),
        shape: const SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius.vertical(
            top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
          ),
          side: BorderSide(
            color: Colors.white54,
            width: 0.5,
          ),
        ),
      ),
      child: ClipSmoothRect(
        radius: const SmoothBorderRadius.vertical(
          top: SmoothRadius(cornerRadius: 40, cornerSmoothing: 1.0),
        ),
        child: ClipRect(
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 12, bottom: 4),
                  width: 36,
                  height: 4,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.18),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                _MpiModalHeader(
                  title: widget.item.name,
                  onClose: () => Navigator.of(context).pop(),
                ),
                Expanded(
                  child: ListView(
                    controller: widget.scrollController,
                    padding: EdgeInsets.fromLTRB(20, 4, 20, 16 + bottomInset),
                    physics: const BouncingScrollPhysics(),
                    children: [
                      _SectionLabel(label: 'Ghi chú (bắt buộc nếu lỗi)'.tr()),
                      const SizedBox(height: 8),
                      MpiNoteTextfield(controller: _noteController),
                      const SizedBox(height: 20),
                      _SectionLabel(label: 'Ảnh minh chứng (bắt buộc nếu lỗi)'.tr()),
                      const SizedBox(height: 8),
                      Stack(
                        children: [
                          MpiImagePickerGrid(
                            mediaUrls: _mediaUrls,
                            onAddImage: _isUploading ? () async {} : _pickImage,
                            onRemoveImage: _isUploading ? (_) {} : _removeImage,
                          ),
                          if (_isUploading)
                            Positioned.fill(
                              child: Container(
                                color: Colors.black.withValues(alpha: 0.25),
                                child: const Center(
                                  child: SizedBox(
                                    width: 24,
                                    height: 24,
                                    child: CircularProgressIndicator(strokeWidth: 2.5),
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                ),
                SafeArea(
                  top: false,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 8, 20, 20),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (_errorMessage != null) ...[
                          Text(
                            _errorMessage!,
                            style: TextStyle(
                              color: theme.colorScheme.error,
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                            ),
                            textAlign: TextAlign.center,
                          )
                              .animate(key: ValueKey(_errorShakeKey))
                              .shake(hz: 4, duration: 400.ms, curve: Curves.easeInOut),
                          const SizedBox(height: 10),
                        ],
                        LiquidButton(
                          onPressed: _isUploading ? null : _handleSave,
                          child: _isUploading
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                                )
                              : Text('Lưu thông tin'.tr()),
                        ),
                      ],
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

class _MpiModalHeader extends StatelessWidget {
  final String title;
  final VoidCallback onClose;

  const _MpiModalHeader({required this.title, required this.onClose});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 16, 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Cập nhật chi tiết'.tr(),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.70),
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  title,
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                    color: theme.colorScheme.onSurface,
                    letterSpacing: -0.4,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          GlassCloseButton(onPressed: onClose),
        ],
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  final String label;

  const _SectionLabel({required this.label});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Text(
      label,
      style: theme.textTheme.labelLarge?.copyWith(
        fontWeight: FontWeight.w600,
        color: theme.colorScheme.onSurfaceVariant,
      ),
    );
  }
}
