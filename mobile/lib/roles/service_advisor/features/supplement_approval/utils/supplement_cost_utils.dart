import 'package:intl/intl.dart';

abstract final class SupplementCostUtils {
  static final NumberFormat _currencyFormatter = NumberFormat.currency(
    locale: 'vi_VN',
    symbol: 'đ',
    decimalDigits: 0,
  );

  static String formatCurrency(double amount) {
    return _currencyFormatter.format(amount);
  }

  static double calculateTax(double amount, {double taxRate = 0.1}) {
    return amount * taxRate;
  }

  static double calculateTotalWithTax(double amount, {double taxRate = 0.1}) {
    return amount + calculateTax(amount, taxRate: taxRate);
  }
}
