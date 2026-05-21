import 'package:intl/intl.dart';
import 'package:easy_localization/easy_localization.dart';

class Formatters {
  static String formatCurrency(double? amount) {
    if (amount == null) return "0 ₫";
    final format = NumberFormat.currency(locale: 'vi_VN', symbol: '₫');
    return format.format(amount);
  }

  static String formatDate(String? dateStr) {
    if (dateStr == null || dateStr.isEmpty) return "N/A";
    try {
      final date = DateTime.parse(dateStr);
      return DateFormat('dd/MM/yyyy').format(date);
    } catch (e) {
      return dateStr;
    }
  }

  static String getInitials(String name) {
    if (name.isEmpty) return 'NA';
    final parts = name.trim().split(' ');
    if (parts.length > 1) {
      return '${parts[0][0]}${parts[parts.length - 1][0]}'.toUpperCase();
    }
    return name.substring(0, name.length > 1 ? 2 : 1).toUpperCase();
  }

  static String getTimeElapsed(DateTime createdAt) {
    final diff = DateTime.now().difference(createdAt);
    if (diff.inHours > 0) {
      return 'Chờ {} giờ'.tr(args: [diff.inHours.toString()]);
    } else if (diff.inMinutes > 0) {
      return 'Chờ {} phút'.tr(args: [diff.inMinutes.toString()]);
    }
    return 'Vừa xong'.tr();
  }
}