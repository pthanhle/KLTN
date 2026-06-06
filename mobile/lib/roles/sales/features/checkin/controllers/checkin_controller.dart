import 'dart:typed_data';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:ttauto_staff/roles/sales/features/checkin/models/checkin_state_model.dart';
import 'package:ttauto_staff/roles/sales/features/shared/data/test_drive_api_service.dart';

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
        // Read bytes immediately — XFile.readAsBytes() works on all platforms (including web)
        final bytes = await image.readAsBytes();
        state = state.copyWith(licenseImageBytes: bytes);
      }
    } catch (e) {
      state = state.copyWith(error: 'Lỗi khi chụp ảnh: $e');
    }
  }

  void saveSignature(Uint8List bytes) {
    state = state.copyWith(signatureBytes: bytes);
  }

  void clearSignature() {
    state = state.copyWith(clearSignature: true);
  }

  bool get isValid => state.licenseImageBytes != null && state.signatureBytes != null;

  Future<void> submitCheckin(String taskId) async {
    if (!isValid) return;
    state = state.copyWith(isSubmitting: true, error: null);
    try {
      await testDriveApiService.submitCheckin(
        taskId,
        state.licenseImageBytes,
        state.signatureBytes,
      );
      state = state.copyWith(isSubmitting: false, isSuccess: true);
    } catch (e) {
      state = state.copyWith(isSubmitting: false, error: e.toString());
    }
  }
}

final checkInControllerProvider = NotifierProvider<CheckInController, CheckInStateModel>(() {
  return CheckInController();
});
