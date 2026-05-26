import '../../models/job_task_model.dart';
import '../../models/job_part_model.dart';

abstract final class MockJobExecutionData {
  static List<Map<String, dynamic>> get tasks => [
        {
          'id': 'task_001',
          'labor_code': 'SVC-BRK-01',
          'name': 'Thay má phanh trước',
          'description': 'Bao gồm vệ sinh đĩa phanh và bôi trơn chốt.',
          'icon': 'build',
          'status': 'pending',
          'media_urls': <String>[],
          'started_at': null,
          'completed_at': null,
        },
        {
          'id': 'task_002',
          'labor_code': 'SVC-BRK-02',
          'name': 'Bảo dưỡng cụm phanh',
          'description': 'Kiểm tra dầu phanh, vệ sinh heo dầu.',
          'icon': 'cleaning_services',
          'status': 'pending',
          'media_urls': <String>[],
          'started_at': null,
          'completed_at': null,
        },
        {
          'id': 'task_003',
          'labor_code': 'SVC-TYR-01',
          'name': 'Kiểm tra áp suất lốp',
          'description': 'Bơm lốp đúng chuẩn nhà sản xuất.',
          'icon': 'check_circle',
          'status': 'in_progress',
          'media_urls': <String>[],
          'started_at': '2026-05-26T08:00:00.000Z',
          'completed_at': null,
        },
      ];

  static List<Map<String, dynamic>> get parts => [
        {
          'id': 'part_001',
          'sku': 'PT-BRK-01',
          'name': 'Má phanh trước (Cặp)',
          'quantity': 1,
          'icon': 'settings',
          'status': 'pending',
          'eta_time': null,
        },
        {
          'id': 'part_002',
          'sku': 'PT-CLN-3M',
          'name': 'Chai xịt vệ sinh phanh 3M',
          'quantity': 2,
          'icon': 'water_drop',
          'status': 'pending',
          'eta_time': null,
        },
      ];

  static List<JobTaskModel> parsedTasks() =>
      tasks.map((json) => JobTaskModel.fromJson(_normalizeTaskJson(json))).toList();

  static List<JobPartModel> parsedParts() =>
      parts.map((json) => JobPartModel.fromJson(_normalizePartJson(json))).toList();

  static Map<String, dynamic> _normalizeTaskJson(Map<String, dynamic> json) => {
        'id': json['id'],
        'labor_code': json['labor_code'],
        'name': json['name'],
        'description': json['description'],
        'icon': json['icon'],
        'status': json['status'],
        'mediaUrls': json['media_urls'] ?? [],
        'startedAt': json['started_at'],
        'completedAt': json['completed_at'],
      };

  static Map<String, dynamic> _normalizePartJson(Map<String, dynamic> json) => {
        'id': json['id'],
        'sku': json['sku'],
        'name': json['name'],
        'quantity': json['quantity'],
        'icon': json['icon'],
        'status': json['status'],
        'etaTime': json['eta_time'],
      };
}
