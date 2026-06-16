import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:ttauto_staff/roles/sales/features/tasks/controllers/sales_tasks_controller.dart';
import 'package:easy_localization/easy_localization.dart';

abstract final class SalesTasksStatusUtils {
  static String emptyTitle(TaskTab tab, bool hasAnyTasks, bool isSearchActive) {
    if (isSearchActive) return 'Không tìm thấy kết quả'.tr();
    if (!hasAnyTasks) return 'Tuyệt vời!'.tr();
    return switch (tab) {
      TaskTab.todo => 'Không có việc mới'.tr(),
      TaskTab.inProgress => 'Chưa có ai đang lái thử'.tr(),
      TaskTab.done => 'Chưa có lịch sử'.tr(),
    };
  }

  static String emptySubtitle(TaskTab tab, bool hasAnyTasks, bool isSearchActive) {
    if (isSearchActive) return 'Vui lòng thử từ khóa khác hoặc xóa bộ lọc ngày.'.tr();
    if (!hasAnyTasks) return 'Bạn đã xử lý xong mọi lịch hẹn. Hãy tận hưởng khoảng thời gian nghỉ ngơi!'.tr();
    return switch (tab) {
      TaskTab.todo => 'Tuyệt vời! Bạn không còn lịch hẹn nào đang chờ xác nhận.'.tr(),
      TaskTab.inProgress => 'Khách hàng đang lái thử sẽ hiển thị tại đây.'.tr(),
      TaskTab.done => 'Những lịch hẹn đã hoàn tất sẽ xuất hiện tại danh sách này.'.tr(),
    };
  }

  static IconData emptyIcon(TaskTab tab, bool hasAnyTasks, bool isSearchActive) {
    if (isSearchActive) return CupertinoIcons.search;
    if (!hasAnyTasks) return CupertinoIcons.checkmark_seal_fill;
    return switch (tab) {
      TaskTab.todo => CupertinoIcons.checkmark_seal_fill,
      TaskTab.inProgress => CupertinoIcons.car,
      TaskTab.done => CupertinoIcons.clock,
    };
  }

  static Color cardBgColor(String? status, bool isDark) {
    if (status == 'post_drive' || status == 'done') {
      return Colors.green.shade600.withValues(alpha: isDark ? 0.10 : 0.05);
    }
    if (status == 'customer_arrived' || status == 'in_progress') {
      return Colors.orange.shade600.withValues(alpha: isDark ? 0.10 : 0.05);
    }
    return isDark
        ? Colors.white.withValues(alpha: 0.04)
        : Colors.white.withValues(alpha: 0.65);
  }

  static Color cardBorderColor(String? status, bool isDark) {
    if (status == 'post_drive' || status == 'done') {
      return Colors.green.shade600.withValues(alpha: isDark ? 0.2 : 0.4);
    }
    if (status == 'customer_arrived' || status == 'in_progress') {
      return Colors.orange.shade600.withValues(alpha: isDark ? 0.2 : 0.4);
    }
    return isDark 
        ? Colors.white.withValues(alpha: 0.15) 
        : Colors.white.withValues(alpha: 0.7);
  }
}
