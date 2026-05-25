import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'components/layout/supplement_drag_handle.dart';
import 'components/layout/supplement_header.dart';
import 'components/media/supplement_media_picker.dart';
import 'components/inputs/supplement_text_area.dart';
import 'components/buttons/supplement_submit_button.dart';
import '../../../controllers/supplement_controller.dart';
import 'package:ttauto_staff/shared/widgets/toast/glass_toast.dart';

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

  @override
  void dispose() {
    _descriptionController.dispose();
    _solutionController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    final controller = ref.read(supplementControllerProvider.notifier);
    try {
      await controller.submitRequest(
        orderId: widget.orderId,
        taskId: widget.taskId,
        description: _descriptionController.text,
        proposedSolution: _solutionController.text,
        evidenceUrls: ['dummy_url'],
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
        bottom: viewInsets.bottom > 0 ? viewInsets.bottom + 16 : MediaQuery.of(context).padding.bottom + 16,
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
                        const SupplementMediaPicker(),
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
                          onPressed: _handleSubmit,
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
