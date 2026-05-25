class TechJobModel {
  final String id;
  final String plate;
  final String model;
  final String stage;
  final int stageColorHex;

  TechJobModel({
    required this.id,
    required this.plate,
    required this.model,
    required this.stage,
    required this.stageColorHex,
  });

  factory TechJobModel.fromJson(Map<String, dynamic> json) {
    return TechJobModel(
      id: json['id'] as String,
      plate: json['plate'] as String,
      model: json['model'] as String,
      stage: json['stage'] as String,
      stageColorHex: json['stageColorHex'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'plate': plate,
      'model': model,
      'stage': stage,
      'stageColorHex': stageColorHex,
    };
  }
}
