class CarFormatter {
  /// Translates a generic internal SKU (e.g., M3-2.0-LUX, CX5-2.5-SIG) 
  /// into a readable customer-facing car name.
  static String formatSkuToName(String? sku) {
    if (sku == null || sku.isEmpty) return 'Unknown Car';

    final upperSku = sku.toUpperCase();

    // Mapping prefixes to car models
    String modelName = '';
    if (upperSku.startsWith('M3')) modelName = 'Mazda 3';
    else if (upperSku.startsWith('M6')) modelName = 'Mazda 6';
    else if (upperSku.startsWith('CX30')) modelName = 'Mazda CX-30';
    else if (upperSku.startsWith('CX3')) modelName = 'Mazda CX-3';
    else if (upperSku.startsWith('CX5')) modelName = 'Mazda CX-5';
    else if (upperSku.startsWith('CX8')) modelName = 'Mazda CX-8';
    else if (upperSku.startsWith('BT50')) modelName = 'Mazda BT-50';
    else modelName = sku.split('-').first; // Fallback to prefix

    // Mapping suffixes to trim levels
    String trimLevel = '';
    if (upperSku.contains('DELUXE') || upperSku.contains('DEL')) trimLevel = 'Deluxe';
    else if (upperSku.contains('LUXURY') || upperSku.contains('LUX')) trimLevel = 'Luxury';
    else if (upperSku.contains('PREMIUM') || upperSku.contains('PRE')) trimLevel = 'Premium';
    else if (upperSku.contains('SIGNATURE') || upperSku.contains('SIG')) trimLevel = 'Signature';

    // Extracting engine size if present (e.g., 2.0, 2.5, 1.5)
    final RegExp engineRegex = RegExp(r'(\d\.\d)');
    final match = engineRegex.firstMatch(upperSku);
    String engineSize = match != null ? match.group(0)! : '';

    List<String> parts = [modelName];
    if (engineSize.isNotEmpty) parts.add(engineSize);
    if (trimLevel.isNotEmpty) parts.add(trimLevel);

    if (parts.length == 1 && parts.first == sku.split('-').first) {
      return sku; // Could not parse meaningfully, return original
    }

    return parts.join(' ');
  }
}