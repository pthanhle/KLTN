class DiagnosticItem {
  final String title;
  final String description;
  final String imageUrl;

  const DiagnosticItem({
    required this.title,
    required this.description,
    required this.imageUrl,
  });

  factory DiagnosticItem.fromJson(Map<String, dynamic> json) {
    return DiagnosticItem(
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['image_url'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'title': title,
    'description': description,
    'image_url': imageUrl,
  };
}

class CartPartItem {
  final String id;
  final String name;
  final double price;
  final int quantity;
  final bool isBackorder;
  final String? expectedDate;

  const CartPartItem({
    required this.id,
    required this.name,
    required this.price,
    required this.quantity,
    this.isBackorder = false,
    this.expectedDate,
  });

  factory CartPartItem.fromJson(Map<String, dynamic> json) {
    return CartPartItem(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      price: (json['price'] ?? 0).toDouble(),
      quantity: json['quantity'] ?? 1,
      isBackorder: json['is_backorder'] ?? false,
      expectedDate: json['expected_date'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'price': price,
    'quantity': quantity,
    'is_backorder': isBackorder,
    'expected_date': expectedDate,
  };
}

class CartLaborItem {
  final String id;
  final String name;
  final double hours;
  final double rate;

  const CartLaborItem({
    required this.id,
    required this.name,
    required this.hours,
    required this.rate,
  });

  double get total => hours * rate;

  factory CartLaborItem.fromJson(Map<String, dynamic> json) {
    return CartLaborItem(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      hours: (json['hours'] ?? 0).toDouble(),
      rate: (json['rate'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'hours': hours,
    'rate': rate,
  };
}

class QuotationModel {
  final String orderId;
  final DiagnosticItem diagnosis;
  final String advisorNote;
  final List<CartPartItem> parts;
  final List<CartLaborItem> labor;
  final String promoCode;
  final double depositRequired;

  const QuotationModel({
    required this.orderId,
    required this.diagnosis,
    this.advisorNote = '',
    this.parts = const [],
    this.labor = const [],
    this.promoCode = '',
    this.depositRequired = 0.0,
  });

  double get partsTotal => parts.fold(0, (sum, part) => sum + (part.price * part.quantity));
  double get laborTotal => labor.fold(0, (sum, item) => sum + item.total);
  double get discountAmount => promoCode.isNotEmpty ? (partsTotal + laborTotal) * 0.1 : 0.0; // Mock 10% discount
  double get vatAmount => (partsTotal + laborTotal - discountAmount) * 0.1; // 10% VAT
  double get grandTotal => partsTotal + laborTotal - discountAmount + vatAmount;

  QuotationModel copyWith({
    String? orderId,
    DiagnosticItem? diagnosis,
    String? advisorNote,
    List<CartPartItem>? parts,
    List<CartLaborItem>? labor,
    String? promoCode,
    double? depositRequired,
  }) {
    return QuotationModel(
      orderId: orderId ?? this.orderId,
      diagnosis: diagnosis ?? this.diagnosis,
      advisorNote: advisorNote ?? this.advisorNote,
      parts: parts ?? this.parts,
      labor: labor ?? this.labor,
      promoCode: promoCode ?? this.promoCode,
      depositRequired: depositRequired ?? this.depositRequired,
    );
  }

  factory QuotationModel.fromJson(Map<String, dynamic> json) {
    return QuotationModel(
      orderId: json['order_id'] ?? '',
      diagnosis: DiagnosticItem.fromJson(json['diagnosis'] ?? {}),
      advisorNote: json['advisor_note'] ?? '',
      parts: (json['parts'] as List<dynamic>?)
              ?.map((e) => CartPartItem.fromJson(e))
              .toList() ??
          [],
      labor: (json['labor'] as List<dynamic>?)
              ?.map((e) => CartLaborItem.fromJson(e))
              .toList() ??
          [],
      promoCode: json['promo_code'] ?? '',
      depositRequired: (json['deposit_required'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() => {
    'order_id': orderId,
    'diagnosis': diagnosis.toJson(),
    'advisor_note': advisorNote,
    'parts': parts.map((e) => e.toJson()).toList(),
    'labor': labor.map((e) => e.toJson()).toList(),
    'promo_code': promoCode,
    'deposit_required': depositRequired,
  };
}
