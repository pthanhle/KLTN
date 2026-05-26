import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/job_task_model.dart';
import '../models/job_part_model.dart';
import '../data/mocks/mock_job_execution_data.dart';

class JobExecutionState {
  final List<JobTaskModel> tasks;
  final List<JobPartModel> parts;

  const JobExecutionState({required this.tasks, required this.parts});

  JobExecutionState copyWith({
    List<JobTaskModel>? tasks,
    List<JobPartModel>? parts,
  }) =>
      JobExecutionState(
        tasks: tasks ?? this.tasks,
        parts: parts ?? this.parts,
      );
}

class JobExecutionController extends AsyncNotifier<JobExecutionState> {
  @override
  FutureOr<JobExecutionState> build() async {
    await Future.delayed(const Duration(milliseconds: 600));
    return JobExecutionState(
      tasks: MockJobExecutionData.parsedTasks(),
      parts: MockJobExecutionData.parsedParts(),
    );
  }

  Future<void> startTask(String taskId) async {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(
      tasks: current.tasks.map((t) {
        if (t.id == taskId && t.status == JobTaskStatus.pending) {
          return t.copyWith(
            status: JobTaskStatus.inProgress,
            startedAt: DateTime.now(),
          );
        }
        return t;
      }).toList(),
    ));
  }

  Future<void> completeTask(String taskId) async {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(
      tasks: current.tasks.map((t) {
        if (t.id == taskId && t.status == JobTaskStatus.inProgress) {
          return t.copyWith(
            status: JobTaskStatus.completed,
            completedAt: DateTime.now(),
          );
        }
        return t;
      }).toList(),
    ));
  }

  Future<void> togglePartCheck(String partId) async {
    final current = state.value;
    if (current == null) return;
    state = AsyncData(current.copyWith(
      parts: current.parts.map((p) {
        if (p.id == partId) {
          return p.copyWith(
            status: p.status == JobPartStatus.completed
                ? JobPartStatus.pending
                : JobPartStatus.completed,
          );
        }
        return p;
      }).toList(),
    ));
  }
}

final jobExecutionControllerProvider =
    AsyncNotifierProvider<JobExecutionController, JobExecutionState>(
  JobExecutionController.new,
);
