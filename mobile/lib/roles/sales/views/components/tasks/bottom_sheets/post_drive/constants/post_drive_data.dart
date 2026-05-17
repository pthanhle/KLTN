import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';

class InterestLevelData {
  final int id;
  final String emoji;
  final String labelKey;
  final Color baseColor;

  const InterestLevelData({
    required this.id,
    required this.emoji,
    required this.labelKey,
    required this.baseColor,
  });

  String get localizedLabel => tr(labelKey);
}

class PostDriveConstants {
  static const List<InterestLevelData> interestLevels = [
    InterestLevelData(
      id: 0,
      emoji: '❄️',
      labelKey: 'Tiềm năng thấp',
      baseColor: Colors.blue,
    ),
    InterestLevelData(
      id: 1,
      emoji: '☀️',
      labelKey: 'Đang cân nhắc',
      baseColor: Colors.orange,
    ),
    InterestLevelData(
      id: 2,
      emoji: '🔥',
      labelKey: 'Tiềm năng cao',
      baseColor: Colors.red,
    ),
  ];
}
