import 'dart:convert';
import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:flutter/services.dart';
import 'package:signature/signature.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';

class SignaturePadModal extends StatefulWidget {
  const SignaturePadModal({super.key});

  static Future<String?> show(BuildContext context) {
    return showGeneralDialog<String>(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.45),
      transitionDuration: const Duration(milliseconds: 320),
      pageBuilder: (context, animation, secondaryAnimation) => const SignaturePadModal(),
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
  State<SignaturePadModal> createState() => _SignaturePadModalState();
}

class _SignaturePadModalState extends State<SignaturePadModal> {
  late final SignatureController _sigCtrl;

  @override
  void initState() {
    super.initState();
    _sigCtrl = SignatureController(
      penStrokeWidth: 3,
      penColor: Colors.black87,
      exportBackgroundColor: Colors.transparent,
      exportPenColor: Colors.black,
    );
  }

  @override
  void dispose() {
    _sigCtrl.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_sigCtrl.isEmpty) { Navigator.of(context).pop(); return; }
    final bytes = await _sigCtrl.toPngBytes();
    if (bytes != null) Navigator.of(context).pop(base64Encode(bytes));
    else Navigator.of(context).pop();
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
            left: 20, right: 20,
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
                        width: 36, height: 4,
                        margin: const EdgeInsets.only(bottom: 20),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: isDark ? 0.25 : 0.40),
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                      Text('Chữ ký khách hàng'.tr(),
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w700, letterSpacing: -0.5)),
                      const SizedBox(height: 6),
                      Text('Khách hàng vui lòng ký vào ô bên dưới để xác nhận thông tin.'.tr(),
                        textAlign: TextAlign.center,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.75))),
                      const SizedBox(height: 20),

                      Container(
                        decoration: ShapeDecoration(
                          color: Colors.white.withValues(alpha: 0.90),
                          shape: SmoothRectangleBorder(
                            borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                            side: BorderSide(
                              color: Colors.white.withValues(alpha: isDark ? 0.30 : 0.80),
                              width: 0.5,
                            ),
                          ),
                        ),
                        child: ClipSmoothRect(
                          radius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                          child: Signature(
                            controller: _sigCtrl,
                            height: 220,
                            backgroundColor: Colors.transparent,
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      Align(
                        alignment: Alignment.centerRight,
                        child: GestureDetector(
                          onTap: () { HapticFeedback.lightImpact(); _sigCtrl.clear(); },
                          child: Text('Xóa chữ ký'.tr(),
                            style: theme.textTheme.labelLarge?.copyWith(
                              color: theme.colorScheme.error, fontWeight: FontWeight.w600)),
                        ),
                      ),
                      const SizedBox(height: 20),

                      Row(children: [
                        Expanded(
                          child: LiquidButton(
                            onPressed: () { HapticFeedback.lightImpact(); Navigator.of(context).pop(); },
                            variant: LiquidButtonVariant.neutral,
                            child: Text('Hủy'.tr()),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: LiquidButton(
                            onPressed: _submit,
                            child: Text('Xác nhận'.tr()),
                          ),
                        ),
                      ]),
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
