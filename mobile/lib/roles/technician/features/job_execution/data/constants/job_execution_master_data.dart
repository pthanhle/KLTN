import '../../models/job_task_model.dart';
import '../../models/job_part_model.dart';

class JobExecutionMasterData {
  static const List<Map<String, dynamic>> initialTasks = [
    {
      'id': 'task_001',
      'name': 'Thay má phanh trước',
      'description': 'Bao gồm vệ sinh đĩa phanh và bôi trơn chốt.',
      'icon': 'build',
      'status': 'pending',
      'mediaUrls': [],
    },
    {
      'id': 'task_002',
      'name': 'Bảo dưỡng cụm phanh',
      'description': 'Kiểm tra dầu phanh, vệ sinh heo dầu.',
      'icon': 'cleaning_services',
      'status': 'pending',
      'mediaUrls': [],
    },
    {
      'id': 'task_003',
      'name': 'Kiểm tra áp suất lốp',
      'description': 'Bơm lốp đúng chuẩn nhà sản xuất.',
      'icon': 'check_circle',
      'status': 'completed',
      'mediaUrls': [],
    },
  ];

  static const List<Map<String, dynamic>> initialParts = [
    {
      'id': 'part_001',
      'name': 'Má phanh trước (Cặp)',
      'quantity': 1,
      'icon': 'settings',
      'status': 'pending',
    },
    {
      'id': 'part_002',
      'name': 'Chai xịt vệ sinh phanh 3M',
      'quantity': 2,
      'icon': 'water_drop',
      'status': 'pending',
    },
  ];

  static List<JobTaskModel> getTasks() {
    return initialTasks.map((json) => JobTaskModel.fromJson(json)).toList();
  }

  static List<JobPartModel> getParts() {
    return initialParts.map((json) => JobPartModel.fromJson(json)).toList();
  }
}
