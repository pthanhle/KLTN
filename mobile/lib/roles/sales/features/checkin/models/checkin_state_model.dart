import 'dart:typed_data';

class CheckInStateModel {
  final Uint8List? licenseImageBytes;
  final Uint8List? signatureBytes;
  final bool isSubmitting;
  final bool isSuccess;
  final String? error;

  const CheckInStateModel({
    this.licenseImageBytes,
    this.signatureBytes,
    this.isSubmitting = false,
    this.isSuccess = false,
    this.error,
  });

  CheckInStateModel copyWith({
    Uint8List? licenseImageBytes,
    Uint8List? signatureBytes,
    bool? isSubmitting,
    bool? isSuccess,
    String? error,
    bool clearSignature = false,
    bool clearLicense = false,
  }) {
    return CheckInStateModel(
      licenseImageBytes: clearLicense ? null : (licenseImageBytes ?? this.licenseImageBytes),
      signatureBytes: clearSignature ? null : (signatureBytes ?? this.signatureBytes),
      isSubmitting: isSubmitting ?? this.isSubmitting,
      isSuccess: isSuccess ?? this.isSuccess,
      error: error ?? this.error,
    );
  }
}
