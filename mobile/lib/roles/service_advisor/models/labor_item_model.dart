class LaborItemModel {
  final String id;
  final String category;
  final String name;
  final double price;
  final double estimatedHours;

  const LaborItemModel({
    required this.id,
    required this.category,
    required this.name,
    required this.price,
    required this.estimatedHours,
  });

  factory LaborItemModel.fromJson(Map<String, dynamic> json) {
    return LaborItemModel(
      id: json['id'] as String,
      category: json['category'] as String,
      name: json['name'] as String,
      price: (json['price'] as num).toDouble(),
      estimatedHours: (json['estimated_hours'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'category': category,
      'name': name,
      'price': price,
      'estimated_hours': estimatedHours,
    };
  }
}
