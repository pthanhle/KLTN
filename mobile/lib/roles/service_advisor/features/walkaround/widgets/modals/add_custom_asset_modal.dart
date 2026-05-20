import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';

class AddCustomAssetModal extends StatefulWidget {
  const AddCustomAssetModal({super.key});

  static Future<String?> show(BuildContext context) {
    return showGeneralDialog<String>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.45),
      transitionDuration: const Duration(milliseconds: 320),
      pageBuilder: (context, animation, secondaryAnimation) => const AddCustomAssetModal(),
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: CurvedAnimation(parent: animation, curve: Curves.easeOut),
          child: SlideTransition(
            position: Tween<Offset>(begin: const Offset(0, 0.08), end: Offset.zero)
                .animate(CurvedAnimation(parent: animation, curve: Curves.easeOutCubic)),
            child: child,
          ),
        );
      },
    );
  }

  @override
  State<AddCustomAssetModal> createState() => _AddCustomAssetModalState();
}

class _AddCustomAssetModalState extends State<AddCustomAssetModal> {
  final TextEditingController _controller = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 120), () {
      if (mounted) _focusNode.requestFocus();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _submit() {
    final name = _controller.text.trim();
    Navigator.of(context).pop(name.isNotEmpty ? name : null);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Center(
      child: Material(
        color: Colors.transparent,
        child: Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
            left: 24,
            right: 24,
          ),
          child: Container(
            width: double.infinity,
            decoration: ShapeDecoration(
              color: isDark
                  ? Colors.black.withValues(alpha: 0.55)
                  : Colors.white.withValues(alpha: 0.72),
              shape: SmoothRectangleBorder(
                borderRadius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
                side: BorderSide(
                  color: Colors.white.withValues(alpha: isDark ? 0.20 : 0.80),
                  width: 0.5,
                ),
              ),
              shadows: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.18),
                  blurRadius: 40,
                  offset: const Offset(0, 12),
                ),
              ],
            ),
            child: ClipSmoothRect(
              radius: SmoothBorderRadius(cornerRadius: 28, cornerSmoothing: 1.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 36,
                        height: 4,
                        margin: const EdgeInsets.only(bottom: 20),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: isDark ? 0.25 : 0.40),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                      Text(
                        'Thêm tài sản'.tr(),
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Nhập tên tài sản, đồ đạc có giá trị mà khách hàng để lại trên xe.'.tr(),
                        textAlign: TextAlign.center,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.75),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Container(
                        decoration: ShapeDecoration(
                          color: isDark
                              ? Colors.white.withValues(alpha: 0.07)
                              : Colors.white.withValues(alpha: 0.55),
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                            side: BorderSide(
                              color: Colors.white.withValues(alpha: isDark ? 0.18 : 0.70),
                              width: 0.5,
                            ),
                          ),
                        ),
                        child: ClipSmoothRect(
                          radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                          child: BackdropFilter(
                            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
                            child: CupertinoTextField(
                              controller: _controller,
                              focusNode: _focusNode,
                              maxLines: 1,
                              textInputAction: TextInputAction.done,
                              onSubmitted: (_) => _submit(),
                              style: theme.textTheme.bodyLarge?.copyWith(height: 1.4),
                              placeholder: 'VD: Laptop Macbook Pro...'.tr(),
                              placeholderStyle: theme.textTheme.bodyLarge?.copyWith(
                                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.45),
                                height: 1.4,
                              ),
                              padding: const EdgeInsets.all(16),
                              decoration: null,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Expanded(
                            child: LiquidButton(
                              onPressed: () => Navigator.of(context).pop(),
                              variant: LiquidButtonVariant.neutral,
                              child: Text('Hủy'.tr()),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: LiquidButton(
                              onPressed: _submit,
                              child: Text('Thêm'.tr()),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
