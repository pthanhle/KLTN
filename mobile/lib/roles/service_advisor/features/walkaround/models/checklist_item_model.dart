import 'package:uuid/uuid.dart';

class ChecklistItemModel {
  final String id;
  final String name;
  final bool checked;

  const ChecklistItemModel({
    required this.id,
    required this.name,
    required this.checked,
  });

  factory ChecklistItemModel.fromJson(Map<String, dynamic> json) {
    return ChecklistItemModel(
      id: json['id'].toString(),
      name: json['name'] ?? '',
      checked: json['checked'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'checked': checked,
    };
  }

  ChecklistItemModel copyWith({
    String? id,
    String? name,
    bool? checked,
  }) {
    return ChecklistItemModel(
      id: id ?? this.id,
      name: name ?? this.name,
      checked: checked ?? this.checked,
    );
  }
}
