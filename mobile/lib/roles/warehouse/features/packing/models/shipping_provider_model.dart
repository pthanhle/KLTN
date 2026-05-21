import 'package:flutter/material.dart';

class ShippingProviderModel {
  final String code;
  final String name;
  final String logoUrl;
  final Color brandColor;

  const ShippingProviderModel({
    required this.code,
    required this.name,
    required this.logoUrl,
    required this.brandColor,
  });

  static const List<ShippingProviderModel> defaultProviders = [
    ShippingProviderModel(
      code: 'VIETTEL_POST',
      name: 'Viettel Post',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Viettel-Post.png',
      brandColor: Color(0xFFEE0033),
    ),
    ShippingProviderModel(
      code: 'GHTK',
      name: 'Giao Hàng Tiết Kiệm',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHTK.png',
      brandColor: Color(0xFF069255),
    ),
    ShippingProviderModel(
      code: 'GHN',
      name: 'Giao Hàng Nhanh',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN.png',
      brandColor: Color(0xFFF26522),
    ),
    ShippingProviderModel(
      code: 'JT_EXPRESS',
      name: 'J&T Express',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-JT-Express.png',
      brandColor: Color(0xFFDF181F),
    ),
    ShippingProviderModel(
      code: 'NINJA_VAN',
      name: 'Ninja Van',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Ninja-Van.png',
      brandColor: Color(0xFFC00000),
    ),
    ShippingProviderModel(
      code: 'VNPOST',
      name: 'VNPost',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-VNPost.png',
      brandColor: Color(0xFFF3B81C),
    ),
    ShippingProviderModel(
      code: 'AHAMOVE',
      name: 'AhaMove',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Ahamove.png',
      brandColor: Color(0xFFF26522),
    ),
    ShippingProviderModel(
      code: 'SHOPEE_EXPRESS',
      name: 'Shopee Express',
      logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Shopee-Express.png',
      brandColor: Color(0xFFEE4D2D),
    ),
  ];
}
