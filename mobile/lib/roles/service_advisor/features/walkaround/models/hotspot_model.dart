import 'package:uuid/uuid.dart';

class HotspotModel {
  final String id;
  final double x;
  final double y;
  final String note;

  const HotspotModel({
    required this.id,
    required this.x,
    required this.y,
    required this.note,
  });

  factory HotspotModel.create({
    required double x,
    required double y,
    required String note,
  }) {
    return HotspotModel(
      id: const Uuid().v4(),
      x: x,
      y: y,
      note: note,
    );
  }

  factory HotspotModel.fromJson(Map<String, dynamic> json) {
    // Parser for Web format: top and left are percentages or px, but we prefer %
    // Example: { "id": "...", "label": "...", "top": "25%", "left": "10%" }
    double parseCssValue(String? value) {
      if (value == null) return 0.0;
      if (value.endsWith('%')) {
        return double.tryParse(value.replaceAll('%', '')) ?? 0.0 / 100.0;
      }
      return 0.0; // Fallback if Web sends px (we shouldn't support px on mobile, but if needed we can handle later)
    }

    return HotspotModel(
      id: json['id'].toString(),
      x: parseCssValue(json['left']) / 100.0,
      y: parseCssValue(json['top']) / 100.0,
      note: json['label'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'label': note,
      'top': '${(y * 100).toStringAsFixed(1)}%',
      'left': '${(x * 100).toStringAsFixed(1)}%',
    };
  }

  HotspotModel copyWith({
    String? id,
    double? x,
    double? y,
    String? note,
  }) {
    return HotspotModel(
      id: id ?? this.id,
      x: x ?? this.x,
      y: y ?? this.y,
      note: note ?? this.note,
    );
  }
}
