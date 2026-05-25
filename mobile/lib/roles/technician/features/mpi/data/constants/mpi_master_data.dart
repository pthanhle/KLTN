import '../../models/mpi_category_model.dart';
import '../../models/mpi_item_model.dart';

class MpiMasterData {
  MpiMasterData._();

  static const List<MpiCategoryModel> categories = [
    MpiCategoryModel(
      id: 'cat_phanh_gam',
      name: 'Phanh & Gầm',
      items: [
        MpiItemModel(id: 'pg_01', name: 'Má phanh trước'),
        MpiItemModel(id: 'pg_02', name: 'Đĩa phanh trước'),
        MpiItemModel(id: 'pg_03', name: 'Má phanh sau'),
        MpiItemModel(id: 'pg_04', name: 'Đĩa phanh/Tang trống sau'),
        MpiItemModel(id: 'pg_05', name: 'Đường ống phanh'),
        MpiItemModel(id: 'pg_06', name: 'Cao su càng chữ A'),
        MpiItemModel(id: 'pg_07', name: 'Giảm xóc (Phuộc) trước'),
        MpiItemModel(id: 'pg_08', name: 'Giảm xóc (Phuộc) sau'),
        MpiItemModel(id: 'pg_09', name: 'Rô tuyn lái'),
        MpiItemModel(id: 'pg_10', name: 'Rô tuyn trụ'),
        MpiItemModel(id: 'pg_11', name: 'Cao su cân bằng'),
        MpiItemModel(id: 'pg_12', name: 'Áp suất & Độ mòn lốp'),
      ],
    ),
    MpiCategoryModel(
      id: 'cat_dong_co',
      name: 'Động Cơ & Hộp Số',
      items: [
        MpiItemModel(id: 'dc_01', name: 'Dầu động cơ'),
        MpiItemModel(id: 'dc_02', name: 'Lọc dầu động cơ'),
        MpiItemModel(id: 'dc_03', name: 'Dầu hộp số'),
        MpiItemModel(id: 'dc_04', name: 'Lọc gió động cơ'),
        MpiItemModel(id: 'dc_05', name: 'Nước làm mát'),
        MpiItemModel(id: 'dc_06', name: 'Dây Curoa tổng'),
        MpiItemModel(id: 'dc_07', name: 'Bugi (Tình trạng đánh lửa)'),
        MpiItemModel(id: 'dc_08', name: 'Bơm nước làm mát'),
        MpiItemModel(id: 'dc_09', name: 'Chân máy & Chân hộp số'),
        MpiItemModel(id: 'dc_10', name: 'Két nước (Rò rỉ/Tắc nghẽn)'),
      ],
    ),
    MpiCategoryModel(
      id: 'cat_dien',
      name: 'Điện & Cảm Biến',
      items: [
        MpiItemModel(id: 'di_01', name: 'Bình Ắc quy'),
        MpiItemModel(id: 'di_02', name: 'Máy phát điện (Dynamo)'),
        MpiItemModel(id: 'di_03', name: 'Hệ thống đèn pha/cốt'),
        MpiItemModel(id: 'di_04', name: 'Hệ thống đèn xi nhan'),
        MpiItemModel(id: 'di_05', name: 'Hệ thống đèn phanh/lùi'),
        MpiItemModel(id: 'di_06', name: 'Còi tín hiệu'),
        MpiItemModel(id: 'di_07', name: 'Gạt mưa trước/sau'),
        MpiItemModel(id: 'di_08', name: 'Mô tơ bơm nước rửa kính'),
        MpiItemModel(id: 'di_09', name: 'Hệ thống điều hoà (A/C)'),
        MpiItemModel(id: 'di_10', name: 'Lọc gió máy lạnh'),
      ],
    ),
    MpiCategoryModel(
      id: 'cat_noi_ngoai_that',
      name: 'Nội Ngoại Thất',
      items: [
        MpiItemModel(id: 'nt_01', name: 'Bản lề & Khóa cửa'),
        MpiItemModel(id: 'nt_02', name: 'Gioăng cửa kính & Gioăng nắp capo'),
        MpiItemModel(id: 'nt_03', name: 'Gương chiếu hậu chỉnh điện'),
        MpiItemModel(id: 'nt_04', name: 'Cửa sổ trời (Ron cao su/Kẹt ray)'),
        MpiItemModel(id: 'nt_05', name: 'Cơ cấu ghế & Dây đai an toàn'),
        MpiItemModel(id: 'nt_06', name: 'Hệ thống màn hình & Cụm đồng hồ'),
        MpiItemModel(id: 'nt_07', name: 'Thảm trải sàn (Kẹt chân ga)'),
        MpiItemModel(id: 'nt_08', name: 'Lốp dự phòng & Đồ nghề đi kèm'),
      ],
    ),
  ];
}
