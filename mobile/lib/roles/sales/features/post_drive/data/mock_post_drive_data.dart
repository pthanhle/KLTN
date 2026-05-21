import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class InterestLevelModel {
  final int id;
  final IconData icon;
  final String labelKey;
  final Color baseColor;

  const InterestLevelModel({
    required this.id,
    required this.icon,
    required this.labelKey,
    required this.baseColor,
  });

  String get localizedLabel => tr(labelKey);
}

class MockPostDriveData {
  static const List<InterestLevelModel> interestLevels = [
    InterestLevelModel(
      id: 0,
      icon: Icons.trending_down_rounded,
      labelKey: 'Tiềm năng thấp',
      baseColor: Colors.blue, // Apple System Blue
    ),
    InterestLevelModel(
      id: 1,
      icon: Icons.trending_flat_rounded,
      labelKey: 'Đang cân nhắc',
      baseColor: Colors.orange, // Apple System Orange
    ),
    InterestLevelModel(
      id: 2,
      icon: Icons.trending_up_rounded,
      labelKey: 'Tiềm năng cao',
      baseColor: Colors.red, // Apple System Red
    ),
  ];
}
