class LaborItemModel {
  final String laborCode;
  final String category;
  final String name;
  final double basePrice;
  final double estimatedHours;

  const LaborItemModel({
    required this.laborCode,
    required this.category,
    required this.name,
    required this.basePrice,
    required this.estimatedHours,
  });

  factory LaborItemModel.fromJson(Map<String, dynamic> json) {
    return LaborItemModel(
      laborCode: json['labor_code'] as String? ?? json['id'] as String,
      category: json['category'] as String,
      name: json['name'] as String,
      basePrice: (json['base_price'] ?? json['price'] as num).toDouble(),
      estimatedHours: (json['estimated_hours'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'labor_code': laborCode,
      'category': category,
      'name': name,
      'base_price': basePrice,
      'estimated_hours': estimatedHours,
    };
  }
}
