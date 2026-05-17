import 'package:flutter_riverpod/flutter_riverpod.dart';

class TaskCardController extends Notifier<void> {
  @override
  void build() {}

  void callCustomer(String phoneNumber) {
    // Logic to open dialer (e.g. using url_launcher 'tel:$phoneNumber')
    print('Calling customer: $phoneNumber');
  }

  void openChat(String taskId) {
    // Logic to open chat screen or bottom sheet
    print('Opening chat for task: $taskId');
  }

  void openTaskDetail(String taskId) {
    // Logic to navigate to task detail page
    print('Navigating to detail for task: $taskId');
  }
}

final taskCardControllerProvider = NotifierProvider<TaskCardController, void>(() {
  return TaskCardController();
});
