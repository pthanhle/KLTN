import 'package:intl/intl.dart';

class QuotationUtils {
  static final _currencyFormat = NumberFormat.currency(
    locale: 'vi_VN',
    symbol: '₫',
    decimalDigits: 0,
  );

  static String formatCurrency(double amount) {
    if (amount < 0) {
      return '-${_currencyFormat.format(amount.abs())}';
    }
    return _currencyFormat.format(amount);
  }

  static String formatHours(double hours) {
    if (hours == hours.toInt()) {
      return '${hours.toInt()}h';
    }
    return '${hours}h';
  }
}
