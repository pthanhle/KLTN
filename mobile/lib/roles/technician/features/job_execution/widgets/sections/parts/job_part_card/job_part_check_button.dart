import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:figma_squircle/figma_squircle.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../models/job_part_model.dart';

/// Huy hiệu trạng thái phụ tùng — chỉ hiển thị (read-only), vì trạng thái
/// nhặt hàng do kho cập nhật từ backend, kỹ thuật viên không được tự đánh dấu.
class JobPartCheckButton extends StatelessWidget {
  final JobPartStatus status;

  const JobPartCheckButton({super.key, required this.status});

  ({Color color, IconData icon, String label}) _config() {
    switch (status) {
      case JobPartStatus.completed:
        return (color: const Color(0xFF34C759), icon: CupertinoIcons.checkmark_alt, label: 'Đã lắp');
      case JobPartStatus.installing:
        return (color: const Color(0xFF007AFF), icon: CupertinoIcons.arrow_2_circlepath, label: 'Đang chuyển');
      case JobPartStatus.backorder:
        return (color: const Color(0xFFFF9500), icon: CupertinoIcons.exclamationmark_triangle_fill, label: 'Đặt thêm');
      case JobPartStatus.pending:
        return (color: const Color(0xFF8E8E93), icon: CupertinoIcons.clock, label: 'Chờ kho');
    }
  }

  @override
  Widget build(BuildContext context) {
    final cfg = _config();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: ShapeDecoration(
        color: cfg.color.withValues(alpha: 0.12),
        shape: SmoothRectangleBorder(
          borderRadius: SmoothBorderRadius(cornerRadius: 10, cornerSmoothing: 1.0),
          side: BorderSide(color: cfg.color.withValues(alpha: 0.3), width: 1.0),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(cfg.icon, color: cfg.color, size: 14),
          const SizedBox(width: 6),
          Text(
            cfg.label.tr(),
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: cfg.color,
                  fontWeight: FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}
