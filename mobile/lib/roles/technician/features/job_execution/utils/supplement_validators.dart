import 'package:easy_localization/easy_localization.dart';
import '../constants/supplement_constants.dart';

class SupplementValidators {
  static String? validateDescription(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Vui lòng nhập mô tả lỗi'.tr();
    }
    if (value.length > SupplementConstants.maxDescriptionLength) {
      return '${'Mô tả không được vượt quá'.tr()} ${SupplementConstants.maxDescriptionLength} ${'ký tự'.tr()}';
    }
    return null;
  }

  static String? validateSolution(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Vui lòng nhập giải pháp đề xuất'.tr();
    }
    if (value.length > SupplementConstants.maxSolutionLength) {
      return '${'Giải pháp không được vượt quá'.tr()} ${SupplementConstants.maxSolutionLength} ${'ký tự'.tr()}';
    }
    return null;
  }

  static String? validateMedia(List<String> urls) {
    if (urls.length < SupplementConstants.minImageCount) {
      return 'Vui lòng chụp ít nhất 1 ảnh/video làm chứng cứ'.tr();
    }
    return null;
  }
}
