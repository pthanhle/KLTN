import '../../models/tech_task_model.dart';

class MockTechTasksData {
  static final List<TechTaskModel> tasks = [
    const TechTaskModel(
      id: 'TASK-001',
      plate: '30A - 123.45',
      model: 'Toyota Vios G',
      bay: 'BAY 01',
      startTime: '08:00',
      endTime: '09:30',
      role: 'Thợ chính',
      urgency: TechTaskUrgency.urgent,
      status: TechTaskStatus.diagnosing,
    ),
    const TechTaskModel(
      id: 'TASK-002',
      plate: '51G - 987.65',
      model: 'Mazda CX-5',
      bay: 'BAY 03',
      startTime: '10:00',
      endTime: '11:30',
      role: 'Thợ phụ',
      urgency: TechTaskUrgency.standard,
      status: TechTaskStatus.waitingParts,
    ),
    const TechTaskModel(
      id: 'TASK-003',
      plate: '29C - 456.78',
      model: 'Ford Ranger',
      bay: 'BAY 02',
      startTime: '13:30',
      endTime: '15:00',
      role: 'Thợ chính',
      urgency: TechTaskUrgency.completed,
      status: TechTaskStatus.completed,
    ),
    const TechTaskModel(
      id: 'TASK-004',
      plate: '60B - 111.22',
      model: 'Honda City',
      bay: 'BAY 04',
      startTime: '15:00',
      endTime: '17:00',
      role: 'Thợ chính',
      urgency: TechTaskUrgency.standard,
      status: TechTaskStatus.inProgress,
    ),
  ];
}
