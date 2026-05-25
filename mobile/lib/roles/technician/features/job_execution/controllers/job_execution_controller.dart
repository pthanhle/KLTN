import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/job_task_model.dart';
import '../models/job_part_model.dart';
import '../data/constants/job_execution_master_data.dart';

class JobExecutionState {
  final List<JobTaskModel> tasks;
  final List<JobPartModel> parts;

  JobExecutionState({required this.tasks, required this.parts});

  JobExecutionState copyWith({
    List<JobTaskModel>? tasks,
    List<JobPartModel>? parts,
  }) {
    return JobExecutionState(
      tasks: tasks ?? this.tasks,
      parts: parts ?? this.parts,
    );
  }
}

class JobExecutionController extends AsyncNotifier<JobExecutionState> {
  @override
  FutureOr<JobExecutionState> build() async {
    await Future.delayed(const Duration(milliseconds: 600));
    
    return JobExecutionState(
      tasks: JobExecutionMasterData.getTasks(),
      parts: JobExecutionMasterData.getParts(),
    );
  }

  Future<void> startTask(String taskId) async {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedTasks = currentState.tasks.map((task) {
      if (task.id == taskId && task.status == JobTaskStatus.pending) {
        return task.copyWith(status: JobTaskStatus.inProgress);
      }
      return task;
    }).toList();

    state = AsyncData(currentState.copyWith(tasks: updatedTasks));
  }

  Future<void> completeTask(String taskId) async {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedTasks = currentState.tasks.map((task) {
      if (task.id == taskId && task.status == JobTaskStatus.inProgress) {
        return task.copyWith(
          status: JobTaskStatus.completed,
          mediaUrls: [...task.mediaUrls, 'mock_image_url'], 
        );
      }
      return task;
    }).toList();

    state = AsyncData(currentState.copyWith(tasks: updatedTasks));
  }

  Future<void> togglePartCheck(String partId) async {
    final currentState = state.value;
    if (currentState == null) return;

    final updatedParts = currentState.parts.map((part) {
      if (part.id == partId) {
        final newStatus = part.status == JobPartStatus.completed
            ? JobPartStatus.pending
            : JobPartStatus.completed;
        return part.copyWith(status: newStatus);
      }
      return part;
    }).toList();

    state = AsyncData(currentState.copyWith(parts: updatedParts));
  }
}

final jobExecutionControllerProvider = AsyncNotifierProvider<JobExecutionController, JobExecutionState>(
  () => JobExecutionController(),
);
