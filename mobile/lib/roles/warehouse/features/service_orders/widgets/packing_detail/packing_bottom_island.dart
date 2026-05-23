import 'dart:ui';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:ttauto_staff/shared/widgets/buttons/liquid_button.dart';

class PackingBottomIsland extends StatelessWidget {
  final String orderId;
  final int totalItems;
  final int pickedItems;
  final bool isSubmitting;
  final VoidCallback onHandover;

  const PackingBottomIsland({
    super.key,
    required this.orderId,
    required this.totalItems,
    required this.pickedItems,
    required this.isSubmitting,
    required this.onHandover,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isReady = pickedItems == totalItems && totalItems > 0;

    return Padding(
      padding: const EdgeInsets.only(left: 16, right: 16, bottom: 32),
      child: ClipSmoothRect(
        radius: SmoothBorderRadius(cornerRadius: 36, cornerSmoothing: 1.0),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 40, sigmaY: 40),
          child: Container(
            color: isDark
                ? Colors.white.withValues(alpha: 0.04)
                : Colors.white.withValues(alpha: 0.25),
            padding: const EdgeInsets.all(10),
            child: LiquidButton(
              onPressed: isReady && !isSubmitting ? onHandover : null,
              isLoading: isSubmitting,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Giao cho KTV'.tr(),
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      letterSpacing: -0.4,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(
                    CupertinoIcons.checkmark_seal_fill,
                    size: 18,
                    color: Colors.white,
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
