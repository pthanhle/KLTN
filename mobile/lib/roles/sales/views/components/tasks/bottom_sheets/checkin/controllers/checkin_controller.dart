import 'dart:typed_data';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import '../models/checkin_state_model.dart';

class CheckInController extends Notifier<CheckInStateModel> {
  final ImagePicker _picker = ImagePicker();

  @override
  CheckInStateModel build() {
    return const CheckInStateModel();
  }

  Future<void> pickDriverLicenseImage(ImageSource source) async {
    try {
      final XFile? image = await _picker.pickImage(source: source, imageQuality: 80);
      if (image != null) {
        state = state.copyWith(driverLicensePath: image.path);
      }
    } catch (e) {
      // Handle camera permission or other errors
      state = state.copyWith(error: 'Lỗi khi chụp ảnh: $e');
    }
  }

  void saveSignature(Uint8List bytes) {
    state = state.copyWith(signatureBytes: bytes);
  }

  void clearSignature() {
    state = state.copyWith(clearSignature: true);
  }

  bool get isValid => state.driverLicensePath != null && state.signatureBytes != null;

  Future<void> submitCheckin(String taskId) async {
    if (!isValid) return;

    state = state.copyWith(isSubmitting: true, error: null);

    try {
      // print payload to verify BE integration readiness
      print('Submitting checkin for $taskId with payload: ${state.toJson()}');
      
      // Mock API delay
      await Future.delayed(const Duration(milliseconds: 1200));

      state = state.copyWith(isSubmitting: false, isSuccess: true);
    } catch (e) {
      state = state.copyWith(isSubmitting: false, error: e.toString());
    }
  }
}

final checkInControllerProvider = NotifierProvider<CheckInController, CheckInStateModel>(() {
  return CheckInController();
});
