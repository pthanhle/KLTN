import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../dashboard/models/repair_order_model.dart';

class MpiDiagnosisDetailModal extends StatelessWidget {
  final List<MpiCategory> categories;
  final String conclusion;

  const MpiDiagnosisDetailModal({
    super.key,
    required this.categories,
    required this.conclusion,
  });

  static Future<void> show(BuildContext context, List<MpiCategory> categories, String conclusion) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => MpiDiagnosisDetailModal(categories: categories, conclusion: conclusion),
    );
  }

  Color _statusColor(String status) {
    switch (status) {
      case 'critical':
        return Colors.red;
      case 'warning':
        return Colors.orange;
      default:
        return Colors.green;
    }
  }

  String _statusLabel(String status) {
    switch (status) {
      case 'critical':
        return 'Lỗi'.tr();
      case 'warning':
        return 'Cần theo dõi'.tr();
      default:
        return 'Bình thường'.tr();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF191F31) : Colors.white,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border(
          top: BorderSide(
            color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
          ),
        ),
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: theme.colorScheme.outlineVariant.withValues(alpha: 0.2),
                ),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Chi tiết chẩn đoán từ KTV'.tr(),
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: const Icon(CupertinoIcons.xmark),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
          Expanded(
            child: categories.isEmpty
                ? Center(
                    child: Text(
                      'Chưa có hạng mục kiểm tra'.tr(),
                      style: theme.textTheme.bodyMedium?.copyWith(color: theme.colorScheme.onSurfaceVariant),
                    ),
                  )
                : SingleChildScrollView(
                    padding: const EdgeInsets.all(24),
                    physics: const BouncingScrollPhysics(),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (conclusion.isNotEmpty) ...[
                          Container(
                            padding: const EdgeInsets.all(16),
                            width: double.infinity,
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primaryContainer.withValues(alpha: 0.4),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Kết luận chung của KTV'.tr(),
                                  style: theme.textTheme.labelMedium?.copyWith(
                                    fontWeight: FontWeight.w700,
                                    color: theme.colorScheme.onPrimaryContainer,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  conclusion,
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    color: theme.colorScheme.onPrimaryContainer,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 20),
                        ],
                        ...categories.map((category) => Container(
                              margin: const EdgeInsets.only(bottom: 16),
                              decoration: BoxDecoration(
                                color: theme.colorScheme.surfaceContainerLow,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: theme.colorScheme.outlineVariant.withValues(alpha: 0.4),
                                ),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.fromLTRB(16, 14, 16, 8),
                                    child: Text(
                                      category.title,
                                      style: theme.textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
                                    ),
                                  ),
                                  ...category.items.map((item) {
                                    final status = item['status']?.toString() ?? 'normal';
                                    final actionRequired = item['action_required']?.toString() ?? '';
                                    final mediaUrls = ((item['media_urls'] as List<dynamic>?) ?? const [])
                                        .map((e) => e.toString())
                                        .where((url) => url.isNotEmpty)
                                        .toList();
                                    return Padding(
                                      padding: const EdgeInsets.fromLTRB(16, 6, 16, 6),
                                      child: Row(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Container(
                                            margin: const EdgeInsets.only(top: 4),
                                            width: 8,
                                            height: 8,
                                            decoration: BoxDecoration(
                                              color: _statusColor(status),
                                              shape: BoxShape.circle,
                                            ),
                                          ),
                                          const SizedBox(width: 10),
                                          Expanded(
                                            child: Column(
                                              crossAxisAlignment: CrossAxisAlignment.start,
                                              children: [
                                                Row(
                                                  children: [
                                                    Expanded(
                                                      child: Text(
                                                        item['name']?.toString() ?? '',
                                                        style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w600),
                                                      ),
                                                    ),
                                                    Container(
                                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                                      decoration: BoxDecoration(
                                                        color: _statusColor(status).withValues(alpha: 0.15),
                                                        borderRadius: BorderRadius.circular(8),
                                                      ),
                                                      child: Text(
                                                        _statusLabel(status),
                                                        style: theme.textTheme.labelSmall?.copyWith(
                                                          color: _statusColor(status),
                                                          fontWeight: FontWeight.w700,
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                                if (actionRequired.isNotEmpty) ...[
                                                  const SizedBox(height: 4),
                                                  Text(
                                                    actionRequired,
                                                    style: theme.textTheme.bodySmall?.copyWith(
                                                      color: theme.colorScheme.onSurfaceVariant,
                                                    ),
                                                  ),
                                                ],
                                                if (mediaUrls.isNotEmpty) ...[
                                                  const SizedBox(height: 8),
                                                  Wrap(
                                                    spacing: 8,
                                                    runSpacing: 8,
                                                    children: mediaUrls.map((url) {
                                                      return GestureDetector(
                                                        onTap: () => _showFullScreenImage(context, url),
                                                        child: ClipRRect(
                                                          borderRadius: BorderRadius.circular(10),
                                                          child: Image.network(
                                                            url,
                                                            width: 64,
                                                            height: 64,
                                                            fit: BoxFit.cover,
                                                            errorBuilder: (context, error, stackTrace) => Container(
                                                              width: 64,
                                                              height: 64,
                                                              color: theme.colorScheme.surfaceContainerHighest,
                                                              child: Icon(
                                                                CupertinoIcons.photo,
                                                                size: 20,
                                                                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      );
                                                    }).toList(),
                                                  ),
                                                ],
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                    );
                                  }),
                                  const SizedBox(height: 8),
                                ],
                              ),
                            )),
                      ],
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  void _showFullScreenImage(BuildContext context, String url) {
    showDialog(
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.9),
      builder: (context) => GestureDetector(
        onTap: () => Navigator.pop(context),
        child: Stack(
          children: [
            Positioned.fill(
              child: InteractiveViewer(
                minScale: 0.5,
                maxScale: 4.0,
                child: Center(
                  child: Image.network(
                    url,
                    errorBuilder: (context, error, stackTrace) => Icon(
                      CupertinoIcons.exclamationmark_triangle,
                      size: 40,
                      color: Colors.white.withValues(alpha: 0.7),
                    ),
                  ),
                ),
              ),
            ),
            Positioned(
              top: 16,
              right: 16,
              child: SafeArea(
                child: IconButton(
                  icon: const Icon(CupertinoIcons.xmark_circle_fill, color: Colors.white, size: 32),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
