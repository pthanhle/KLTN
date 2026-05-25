import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/tech_summary_model.dart';
import '../models/tech_job_model.dart';
import '../models/tech_assignment_model.dart';
import '../data/mocks/mock_tech_dashboard_data.dart';

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
    await Future.delayed(const Duration(milliseconds: 1500));
    return TechDashboardState(
      summary: MockTechDashboardData.summary,
      activeJobs: MockTechDashboardData.activeJobs,
      assignment: MockTechDashboardData.assignment,
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
