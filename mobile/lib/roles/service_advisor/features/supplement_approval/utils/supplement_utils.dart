import 'package:intl/intl.dart';

class SupplementUtils {
  static final _currencyFormat = NumberFormat('#,###', 'vi_VN');

  static String formatCurrency(double amount) {
    if (amount < 0) {
      return '-${_currencyFormat.format(amount.abs())}đ';
    }
    return '${_currencyFormat.format(amount)}đ';
  }

  static String formatTime(DateTime time) {
    return DateFormat('HH:mm').format(time);
  }

  static String formatFullDateTime(DateTime time) {
    return DateFormat('HH:mm - dd/MM').format(time);
  }
}
