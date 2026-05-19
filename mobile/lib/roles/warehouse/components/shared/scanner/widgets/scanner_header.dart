import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class ScannerHeader extends StatelessWidget {
  const ScannerHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: 0,
      left: 0,
      right: 0,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Colors.black.withOpacity(0.7),
              Colors.transparent,
            ],
          ),
        ),
        child: Column(
          children: [
            Container(
              width: 40,
              height: 5,
              decoration: ShapeDecoration(
                color: Colors.white.withOpacity(0.3),
                shape: const StadiumBorder(),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Đưa mã vạch vào khung'.tr(),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.w600,
                letterSpacing: -0.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
