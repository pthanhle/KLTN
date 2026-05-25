import '../../models/tech_job_model.dart';
import '../../models/tech_summary_model.dart';
import '../../models/tech_assignment_model.dart';

class MockTechDashboardData {
  static final TechSummaryModel summary = TechSummaryModel(
    activeJobs: 3,
    completedJobs: 1,
    waitingPartsJobs: 2,
  );

  static final List<TechJobModel> activeJobs = [
    TechJobModel(
      id: 'RO-2026-001',
      plate: '51G-123.45',
      model: 'Toyota Camry 2.5Q',
      stage: 'Đang chẩn đoán',
      stageColorHex: 0xFFFF9500,
    ),
    TechJobModel(
      id: 'RO-2026-002',
      plate: '51F-678.90',
      model: 'Honda CR-V 1.5L',
      stage: 'Đang thi công',
      stageColorHex: 0xFF007AFF,
    ),
  ];

  static final TechAssignmentModel assignment = TechAssignmentModel(
    teamLeaderName: 'Nguyễn Văn An',
    shiftTime: '07:30 – 17:00',
    workingBay: 'Bay 3',
  );
}
