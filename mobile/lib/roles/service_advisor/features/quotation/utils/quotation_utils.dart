import 'package:intl/intl.dart';

class QuotationUtils {
  static final _currencyFormat = NumberFormat.currency(
    symbol: '\$',
    decimalDigits: 2,
    customPattern: '\$#,##0.00',
  );

  static String formatCurrency(double amount) {
    if (amount < 0) {
      return '-\${_currencyFormat.format(amount.abs()).replaceAll("\$", "")}';
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
