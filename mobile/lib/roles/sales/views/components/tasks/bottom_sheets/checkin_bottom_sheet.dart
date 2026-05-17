import 'package:flutter/material.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../auth/models/task_model.dart';

class CheckInBottomSheet extends StatelessWidget {
  final TaskModel task;
  final VoidCallback onComplete;

  const CheckInBottomSheet({
    super.key,
    required this.task,
    required this.onComplete,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: ShapeDecoration(
        color: Theme.of(context).colorScheme.surface,
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius.vertical(top: const SmoothRadius(cornerRadius: 32, cornerSmoothing: 1.0)),
        ),
      ),
      padding: EdgeInsets.only(left: 24, right: 24, top: 12, bottom: 32 + MediaQuery.of(context).padding.bottom),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Drag handle
          Center(
            child: Container(
              width: 48,
              height: 4,
              decoration: ShapeDecoration(
                color: Theme.of(context).colorScheme.onSurfaceVariant.withOpacity(0.4),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 2, cornerSmoothing: 1.0),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),
          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                tr('Thủ tục Lái thử'),
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              GestureDetector(
                onTap: () => Navigator.of(context).pop(),
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: ShapeDecoration(
                    color: Theme.of(context).colorScheme.surfaceContainerHigh,
                    shape: SmoothRectangleBorder(
                      borderRadius: SmoothBorderRadius(cornerRadius: 20, cornerSmoothing: 1.0),
                    ),
                  ),
                  child: Icon(Icons.close, color: Theme.of(context).colorScheme.onSurfaceVariant, size: 20),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),

          Text(
            tr('BẰNG LÁI XE'),
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
              fontWeight: FontWeight.w600,
              letterSpacing: 0.05,
            ),
          ),
          const SizedBox(height: 8),
          GestureDetector(
            onTap: () {},
            child: Container(
              height: 128,
              alignment: Alignment.center,
              decoration: ShapeDecoration(
                color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.5),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.5),
                    width: 1.5,
                  ),
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.camera_alt, color: Theme.of(context).colorScheme.primary),
                  const SizedBox(height: 8),
                  Text(
                    tr('Chụp/Tải lên mặt trước Bằng Lái'),
                    style: TextStyle(color: Theme.of(context).colorScheme.onSurfaceVariant, fontSize: 15),
                  )
                ],
              ),
            ),
          ),
          
          const SizedBox(height: 24),

          // E-Signature placeholder
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                tr('CHỮ KÝ ĐIỆN TỬ'),
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.05,
                ),
              ),
              GestureDetector(
                onTap: () {},
                child: Text(
                  tr('Xóa ký lại'),
                  style: TextStyle(
                    fontSize: 15,
                    color: Theme.of(context).colorScheme.secondary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            height: 160,
            decoration: ShapeDecoration(
              color: Theme.of(context).colorScheme.surfaceContainerHigh.withValues(alpha: 0.5),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 24, cornerSmoothing: 1.0),
                  side: BorderSide(
                    color: Colors.white.withValues(alpha: 0.1),
                  ),
                ),
            ),
            alignment: Alignment.center,
            child: Text(
              tr('Ký vào đây'),
              style: TextStyle(
                color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.5),
                fontSize: 17,
              ),
            ),
          ),

          const SizedBox(height: 32),

          ElevatedButton(
            onPressed: onComplete,
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.surfaceContainerHigh,
              foregroundColor: Theme.of(context).colorScheme.outline,
              disabledBackgroundColor: Theme.of(context).colorScheme.surfaceContainerHigh.withValues(alpha: 0.6),
              disabledForegroundColor: Theme.of(context).colorScheme.outline,
              padding: const EdgeInsets.symmetric(vertical: 16),
                shape: SmoothRectangleBorder(
                  borderRadius: SmoothBorderRadius(cornerRadius: 16, cornerSmoothing: 1.0),
                ),
            ),
            child: Text(
              tr('[ Hoàn tất Check-in ]'), 
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600, 
              ),
            ),
          )
        ],
      ),
    );
  }
}