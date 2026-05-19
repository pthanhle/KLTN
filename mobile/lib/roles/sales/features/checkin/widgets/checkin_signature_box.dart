import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:signature/signature.dart';

class CheckInSignatureBox extends StatefulWidget {
  final Uint8List? signatureBytes;
  final ValueChanged<Uint8List> onSign;
  final VoidCallback onClear;

  const CheckInSignatureBox({
    super.key,
    required this.signatureBytes,
    required this.onSign,
    required this.onClear,
  });

  @override
  State<CheckInSignatureBox> createState() => _CheckInSignatureBoxState();
}

class _CheckInSignatureBoxState extends State<CheckInSignatureBox> {
  late SignatureController _signatureController;
  bool _isDrawing = false;

  @override
  void initState() {
    super.initState();
    _signatureController = SignatureController(
      penStrokeWidth: 3,
      penColor: Colors.black, // Apple Notes signature ink is usually black or dark blue
      exportBackgroundColor: Colors.transparent,
    );

    _signatureController.onDrawStart = () {
      if (!_isDrawing) {
        setState(() => _isDrawing = true);
        HapticFeedback.lightImpact();
      }
    };

    _signatureController.onDrawEnd = () async {
      setState(() => _isDrawing = false);
      final bytes = await _signatureController.toPngBytes();
      if (bytes != null) {
        widget.onSign(bytes);
      }
    };
  }

  @override
  void didUpdateWidget(covariant CheckInSignatureBox oldWidget) {
    super.didUpdateWidget(oldWidget);
    // If it was cleared externally
    if (widget.signatureBytes == null && _signatureController.isNotEmpty) {
      _signatureController.clear();
    }
  }

  @override
  void dispose() {
    _signatureController.dispose();
    super.dispose();
  }

  void _handleClear() {
    HapticFeedback.selectionClick();
    _signatureController.clear();
    widget.onClear();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              tr('CHỮ KÝ ĐIỆN TỬ'),
              style: theme.textTheme.labelSmall?.copyWith(
                fontWeight: FontWeight.w600,
                letterSpacing: 0.5,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            if (widget.signatureBytes != null || _signatureController.isNotEmpty)
              GestureDetector(
                onTap: _handleClear,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                  child: Text(
                    tr('Xóa ký lại'),
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.error,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(height: 8),
        Container(
          height: 160,
          width: double.infinity,
          decoration: ShapeDecoration(
            color: const Color(0xFFF2F2F7),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
              side: BorderSide(
                color: theme.colorScheme.outline.withValues(alpha: 0.2),
                width: 1,
              ),
            ),
          ),
          alignment: Alignment.center,
          child: ClipSmoothRect(
            radius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
            child: Stack(
              children: [
                Signature(
                  controller: _signatureController,
                  width: double.infinity,
                  height: double.infinity,
                  backgroundColor: Colors.transparent,
                ),
                if (widget.signatureBytes == null && _signatureController.isEmpty)
                  Center(
                    child: IgnorePointer(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.draw_rounded,
                            color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                            size: 32,
                          ),
                          const SizedBox(height: 12),
                          Text(
                            tr('Chạm để ký tên'),
                            style: theme.textTheme.bodyLarge?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.7),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
