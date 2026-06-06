import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/tech_summary_model.dart';
import '../models/tech_job_model.dart';
import '../models/tech_assignment_model.dart';
import '../../tasks/data/tech_api_repository.dart';
import '../../tasks/models/tech_task_model.dart';

class TechDashboardState {
  final TechSummaryModel summary;
  final List<TechJobModel> activeJobs;
  final TechAssignmentModel assignment;

  const TechDashboardState({
    required this.summary,
    required this.activeJobs,
    required this.assignment,
  });
}

final techDashboardControllerProvider =
    AsyncNotifierProvider<TechDashboardController, TechDashboardState>(
  () => TechDashboardController(),
);

class TechDashboardController extends AsyncNotifier<TechDashboardState> {
  @override
  Future<TechDashboardState> build() async {
    return _fetchDashboardData();
  }

  Future<TechDashboardState> _fetchDashboardData() async {
    final tasks = await techApiRepository.getTasks();

    final activeCount = tasks.where((t) =>
      t.status == TechTaskStatus.diagnosing || t.status == TechTaskStatus.inProgress
    ).length;
    final completedCount = tasks.where((t) => t.status == TechTaskStatus.completed).length;
    final waitingCount = tasks.where((t) => t.status == TechTaskStatus.waitingParts).length;

    final activeJobs = tasks
        .where((t) => t.status == TechTaskStatus.diagnosing || t.status == TechTaskStatus.inProgress)
        .map((t) => TechJobModel(
              id: t.id,
              plate: t.plate,
              model: t.model,
              stage: t.status == TechTaskStatus.diagnosing ? 'Đang chẩn đoán' : 'Đang thi công',
              stageColorHex: t.status == TechTaskStatus.diagnosing ? 0xFFFF9500 : 0xFF007AFF,
            ))
        .toList();

    TechTaskModel? firstActive;
    try {
      firstActive = tasks.firstWhere(
        (t) => t.status == TechTaskStatus.diagnosing || t.status == TechTaskStatus.inProgress,
      );
    } catch (_) {
      firstActive = tasks.isNotEmpty ? tasks.first : null;
    }

    final assignment = TechAssignmentModel(
      teamLeaderName: 'Trưởng ca',
      shiftTime: firstActive != null ? '${firstActive.startTime} – ${firstActive.endTime}' : '07:30 – 17:00',
      workingBay: firstActive?.bay ?? '-',
    );

    return TechDashboardState(
      summary: TechSummaryModel(
        activeJobs: activeCount,
        completedJobs: completedCount,
        waitingPartsJobs: waitingCount,
      ),
      activeJobs: activeJobs,
      assignment: assignment,
    );
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    try {
      final data = await _fetchDashboardData();
      state = AsyncValue.data(data);
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }
}
