import 'package:intl/intl.dart';

class ContractFormatters {
  static String formatCurrency(num value) {
    final formatter = NumberFormat('#,###', 'vi_VN');
    return '${formatter.format(value)} ₫';
  }

  static String formatDate(DateTime date) {
    return DateFormat('dd/MM/yyyy', 'vi_VN').format(date);
  }

  static String formatDateTime(DateTime date) {
    return DateFormat('HH:mm · dd/MM/yyyy', 'vi_VN').format(date);
  }
}
