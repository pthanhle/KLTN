import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'dart:ui';
import 'package:ttauto_staff/roles/warehouse/features/service_orders/models/service_order_model.dart';
import 'service_report_header.dart';
import 'service_report_reasons.dart';
import 'service_report_date_picker.dart';
import 'service_report_actions.dart';

class ServiceReportModal extends StatelessWidget {
  final ServicePartItem item;

  const ServiceReportModal({
    super.key,
    required this.item,
  });

  static void show(BuildContext context, ServicePartItem item) {
    showGeneralDialog(
      context: context,
      barrierDismissible: true,
      barrierLabel: 'Dismiss',
      barrierColor: Colors.black.withValues(alpha: 0.2),
      transitionDuration: const Duration(milliseconds: 300),
      pageBuilder: (context, animation, secondaryAnimation) {
        return Scaffold(
          backgroundColor: Colors.transparent,
          body: Center(
            child: ServiceReportModal(item: item),
          ),
        );
      },
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: CurvedAnimation(parent: animation, curve: Curves.easeOut),
          child: ScaleTransition(
            scale: Tween<double>(begin: 0.9, end: 1.0).animate(
              CurvedAnimation(parent: animation, curve: Curves.easeOutBack),
            ),
            child: child,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Container(
      width: double.infinity,
      constraints: BoxConstraints(
        maxWidth: 400,
        maxHeight: size.height * 0.8,
      ),
      margin: EdgeInsets.only(
        left: 20,
        right: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom, // Avoid keyboard if any
      ),
      decoration: ShapeDecoration(
        color: theme.colorScheme.surface.withValues(alpha: 0.7), // More transparent for better glass
        shape: SmoothRectangleBorder(
          side: BorderSide(color: Colors.white.withValues(alpha: 0.4), width: 1.0),
          borderRadius: SmoothBorderRadius(
            cornerRadius: 32,
            cornerSmoothing: 1.0,
          ),
        ),
        shadows: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 40,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(
          cornerRadius: 32,
          cornerSmoothing: 1.0,
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ServiceReportHeader(item: item),
                const SizedBox(height: 24),
                const ServiceReportReasons(),
                const ServiceReportDatePicker(),
                const SizedBox(height: 32),
                ServiceReportActions(item: item),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
