import 'package:flutter/material.dart';

class QuotationConstants {
  // Spacing
  static const double paddingHorizontal = 20.0;
  static const double cardPadding = 24.0;
  static const double itemPadding = 16.0;
  
  // Radius
  static const double radiusGlass = 28.0;
  static const double radiusButton = 999.0;
  static const double radiusSmall = 12.0;

  // Effects
  static const double blurSigma = 24.0;
  static const double blurSigmaHeavy = 30.0;

  // Mock
  static const int mockLoadingMs = 1500;
  
  // UI Shadows
  static List<BoxShadow> get glassShadows => [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.02),
      blurRadius: 10,
      offset: const Offset(0, 4),
    )
  ];
  
  static List<BoxShadow> get bottomSheetShadows => [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.05),
      blurRadius: 20,
      offset: const Offset(0, -10),
    )
  ];
}
