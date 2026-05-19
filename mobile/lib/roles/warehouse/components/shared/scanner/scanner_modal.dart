import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'constants/scanner_constants.dart';
import 'controllers/scanner_controller.dart';
import 'widgets/scanner_camera_view.dart';
import 'widgets/scanner_overlay.dart';
import 'widgets/scanner_reticle.dart';
import 'widgets/scanner_header.dart';
import 'widgets/scanner_controls.dart';

class ScannerModal extends StatefulWidget {
  final Function(String) onDetect;

  const ScannerModal({super.key, required this.onDetect});

  @override
  State<ScannerModal> createState() => _ScannerModalState();
}

class _ScannerModalState extends State<ScannerModal> {
  late final ScannerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = ScannerController(
      context: context,
      onDetect: widget.onDetect,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height * ScannerConstants.modalHeightRatio;

    return ClipRRect(
      borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 30, sigmaY: 30),
        child: Container(
          height: height,
          decoration: ShapeDecoration(
            color: CupertinoColors.black.withOpacity(0.2),
            shape: SmoothRectangleBorder(
              borderRadius: SmoothBorderRadius(
                cornerRadius: ScannerConstants.cornerRadius,
                cornerSmoothing: 1.0,
              ),
              side: BorderSide(
                color: Colors.white.withOpacity(0.15),
                width: 0.5,
              ),
            ),
          ),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            children: [
              ScannerCameraView(controller: _controller),
              const ScannerOverlay(),
              const ScannerReticle(),
              const ScannerHeader(),
              ScannerControls(controller: _controller),
            ],
          ),
        ),
      ),
    );
  }
}

Future<void> showScannerModal(BuildContext context, {required Function(String) onDetect}) {
  return showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    useRootNavigator: true,
    barrierColor: Colors.black.withOpacity(0.4),
    backgroundColor: Colors.transparent,
    builder: (context) => ScannerModal(onDetect: onDetect),
  );
}
