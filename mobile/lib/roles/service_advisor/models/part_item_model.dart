class PartItemModel {
  final String id;
  final String sku;
  final String name;
  final double price;
  final int availableStock;
  final String imageUrl;
  final String category;

  const PartItemModel({
    required this.id,
    required this.sku,
    required this.name,
    required this.price,
    required this.availableStock,
    required this.imageUrl,
    this.category = '',
  });

  factory PartItemModel.fromJson(Map<String, dynamic> json) {
    final List<dynamic>? images = json['images'] as List<dynamic>?;
    final String firstImage = (images != null && images.isNotEmpty) ? images[0].toString() : '';

    final Map<String, dynamic>? inventory = json['inventory'] as Map<String, dynamic>?;
    final int stock = inventory?['available_stock'] as int? ?? 0;

    return PartItemModel(
      id: json['_id'] as String? ?? json['id'] as String? ?? '',
      sku: json['sku'] as String? ?? '',
      name: json['name'] as String? ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      availableStock: stock,
      imageUrl: firstImage,
      category: json['category'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'sku': sku,
      'name': name,
      'price': price,
      'category': category,
      'images': imageUrl.isNotEmpty ? [imageUrl] : [],
      'inventory': {
        'available_stock': availableStock,
      },
    };
  }

  PartItemModel copyWith({
    String? id,
    String? sku,
    String? name,
    double? price,
    int? availableStock,
    String? imageUrl,
    String? category,
  }) {
    return PartItemModel(
      id: id ?? this.id,
      sku: sku ?? this.sku,
      name: name ?? this.name,
      price: price ?? this.price,
      availableStock: availableStock ?? this.availableStock,
      imageUrl: imageUrl ?? this.imageUrl,
      category: category ?? this.category,
    );
  }
}
