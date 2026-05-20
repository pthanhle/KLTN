class ServicePackageModel {
  final String id;
  final String sku;
  final String name;
  final String description;
  final String priceType;
  final double basePrice;
  final int? estimatedDuration;
  final String category;
  final bool isActive;
  final bool isPackage;
  final String image;

  const ServicePackageModel({
    required this.id,
    this.sku = '',
    required this.name,
    this.description = '',
    this.priceType = 'FIXED',
    this.basePrice = 0.0,
    this.estimatedDuration,
    this.category = '',
    this.isActive = true,
    this.isPackage = false,
    this.image = '',
  });

  factory ServicePackageModel.fromJson(Map<String, dynamic> json) {
    return ServicePackageModel(
      id: json['_id'] ?? json['id'] ?? '',
      sku: json['sku'] ?? '',
      name: json['serviceName'] ?? json['name'] ?? '',
      description: json['description'] ?? '',
      priceType: json['priceType'] ?? 'FIXED',
      basePrice: (json['basePrice'] ?? json['price'] ?? 0).toDouble(),
      estimatedDuration: json['estimatedDuration'],
      category: json['category'] ?? '',
      isActive: json['isActive'] ?? true,
      isPackage: json['isPackage'] ?? false,
      image: json['image'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'sku': sku,
      'serviceName': name,
      'description': description,
      'priceType': priceType,
      'basePrice': basePrice,
      'estimatedDuration': estimatedDuration,
      'category': category,
      'isActive': isActive,
      'isPackage': isPackage,
      'image': image,
    };
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ServicePackageModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;
}
