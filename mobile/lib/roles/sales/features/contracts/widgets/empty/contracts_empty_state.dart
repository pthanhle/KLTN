import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../../../../core/utils/theme_extension.dart';

class ContractsEmptyState extends StatelessWidget {
  final bool isError;

  const ContractsEmptyState({super.key, this.isError = false});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            isError
                ? CupertinoIcons.exclamationmark_triangle
                : CupertinoIcons.doc_text_search,
            size: 56,
            color: context.colors.onSurface.withValues(alpha: 0.2),
          ),
          const SizedBox(height: 16),
          Text(
            isError ? 'Đã có lỗi xảy ra' : 'Không tìm thấy hợp đồng',
            style: context.textTheme.titleMedium?.copyWith(
              color: context.colors.onSurface.withValues(alpha: 0.5),
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            isError
                ? 'Kéo xuống để thử lại'
                : 'Chưa có hợp đồng nào phù hợp bộ lọc',
            style: context.textTheme.bodySmall?.copyWith(
              color: context.colors.onSurface.withValues(alpha: 0.35),
            ),
          ),
        ],
      ),
    );
  }
}
