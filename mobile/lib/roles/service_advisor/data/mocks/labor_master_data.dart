import '../../models/labor_item_model.dart';

/// Master Data (Danh mục Tiền công) chuẩn Enterprise Auto Service 2026
/// Bao quát toàn diện các hệ thống trên xe ICE, Hybrid, EV và ADAS.
const List<LaborItemModel> mockLaborMasterData = [
  // ==========================================
  // 1. BẢO DƯỠNG ĐỊNH KỲ (PREVENTIVE MAINTENANCE)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-PM-001', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 1 (5,000 km) - Kiểm tra, vệ sinh, thay nhớt', basePrice: 250000, estimatedHours: 0.5),
  LaborItemModel(laborCode: 'LBR-PM-002', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 2 (10,000 km) - Thêm đảo lốp, vệ sinh phanh', basePrice: 450000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-PM-003', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 3 (20,000 km) - Bảo dưỡng bướm ga, thay lọc gió', basePrice: 850000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-PM-004', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 4 (40,000 km/80,000 km) - Thay dầu hộp số, nước mát, bugi', basePrice: 1500000, estimatedHours: 3.0),
  LaborItemModel(laborCode: 'LBR-PM-EV1', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng xe điện EV (12,000 km) - Đo kiểm điện áp, update phần mềm', basePrice: 400000, estimatedHours: 0.8),
  LaborItemModel(laborCode: 'LBR-PM-EV2', category: 'Bảo dưỡng định kỳ', name: 'Thay nước mát hệ thống Pin Cao Áp (EV Thermal Management)', basePrice: 850000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-PM-HYB', category: 'Bảo dưỡng định kỳ', name: 'Vệ sinh lưới lọc gió làm mát Pin Hybrid', basePrice: 300000, estimatedHours: 0.5),
  LaborItemModel(laborCode: 'LBR-PM-005', category: 'Bảo dưỡng định kỳ', name: 'Thay lọc gió động cơ & Lọc gió điều hòa', basePrice: 100000, estimatedHours: 0.2),
  LaborItemModel(laborCode: 'LBR-PM-006', category: 'Bảo dưỡng định kỳ', name: 'Thay chổi gạt mưa (1 cặp)', basePrice: 50000, estimatedHours: 0.1),

  // ==========================================
  // 2. HỆ THỐNG ĐỘNG CƠ (ENGINE & EXHAUST)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-EN-001', category: 'Động cơ & Khí xả', name: 'Vệ sinh buồng đốt bằng dung dịch (Carbon Cleaning)', basePrice: 650000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-EN-002', category: 'Động cơ & Khí xả', name: 'Vệ sinh kim phun điện tử (Xúc rửa siêu âm)', basePrice: 800000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-EN-003', category: 'Động cơ & Khí xả', name: 'Vệ sinh họng hút, bướm ga & Cài đặt lại vị trí bướm ga', basePrice: 450000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-EN-004', category: 'Động cơ & Khí xả', name: 'Thay ron nắp cò (Khắc phục xì nhớt mặt máy)', basePrice: 750000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-EN-005', category: 'Động cơ & Khí xả', name: 'Thay chân máy (1 cái) - Chống rung giật', basePrice: 400000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-EN-006', category: 'Động cơ & Khí xả', name: 'Súc rửa két nước mát (Radiator Flush)', basePrice: 550000, estimatedHours: 1.2),
  LaborItemModel(laborCode: 'LBR-EN-007', category: 'Động cơ & Khí xả', name: 'Thay bơm nước làm mát (Máy xăng)', basePrice: 1200000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-EN-008', category: 'Động cơ & Khí xả', name: 'Thay dây curoa tổng & cụm tăng tổng', basePrice: 500000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-EN-009', category: 'Động cơ & Khí xả', name: 'Đại tu động cơ - Rớt máy, bung lốc (Engine Overhaul)', basePrice: 18000000, estimatedHours: 32.0),
  LaborItemModel(laborCode: 'LBR-EN-010', category: 'Động cơ & Khí xả', name: 'Vệ sinh bầu lọc khí thải (DPF - Động cơ Dầu)', basePrice: 1500000, estimatedHours: 2.0),

  // ==========================================
  // 3. HỆ THỐNG TRUYỀN ĐỘNG (DRIVETRAIN & TRANSMISSION)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-DT-001', category: 'Truyền động & Hộp số', name: 'Thay dầu hộp số tự động (Tuần hoàn máy)', basePrice: 850000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-DT-002', category: 'Truyền động & Hộp số', name: 'Thay lá côn, mâm ép, bi T (Hộp số sàn)', basePrice: 2500000, estimatedHours: 4.5),
  LaborItemModel(laborCode: 'LBR-DT-003', category: 'Truyền động & Hộp số', name: 'Sửa chữa phục hồi rò rỉ chảy dầu hộp số (Hạ hộp số)', basePrice: 4500000, estimatedHours: 8.0),
  LaborItemModel(laborCode: 'LBR-DT-004', category: 'Truyền động & Hộp số', name: 'Thay láp ngang (Bán trục) - 1 bên', basePrice: 600000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-DT-005', category: 'Truyền động & Hộp số', name: 'Thay cao su chụp bụi láp', basePrice: 400000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-DT-EV1', category: 'Truyền động & Hộp số', name: 'Thay dầu hộp số giảm tốc (EV Reduction Gear)', basePrice: 350000, estimatedHours: 0.8),

  // ==========================================
  // 4. HỆ THỐNG GẦM LÁI & PHANH (CHASSIS, STEERING & BRAKES)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-CH-001', category: 'Gầm lái & Phanh', name: 'Thay má phanh trước (1 cặp)', basePrice: 300000, estimatedHours: 0.8),
  LaborItemModel(laborCode: 'LBR-CH-002', category: 'Gầm lái & Phanh', name: 'Thay má phanh sau (Có cơ cấu phanh tay điện tử EPB)', basePrice: 450000, estimatedHours: 1.2),
  LaborItemModel(laborCode: 'LBR-CH-003', category: 'Gầm lái & Phanh', name: 'Vớt đĩa phanh trực tiếp trên xe bằng máy mài (1 cặp)', basePrice: 800000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-CH-004', category: 'Gầm lái & Phanh', name: 'Thay dầu phanh bằng máy (Xả e / Bleeding)', basePrice: 450000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-CH-005', category: 'Gầm lái & Phanh', name: 'Thay cụm phanh ABS (ABS Module)', basePrice: 1500000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-CH-006', category: 'Gầm lái & Phanh', name: 'Thay phuộc giảm xóc (1 bên)', basePrice: 550000, estimatedHours: 1.2),
  LaborItemModel(laborCode: 'LBR-CH-007', category: 'Gầm lái & Phanh', name: 'Thay bạc đạn moay ơ (Wheel Bearing) - 1 bên', basePrice: 650000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-CH-008', category: 'Gầm lái & Phanh', name: 'Ép thay cao su càng A (Bushing) - 1 bên', basePrice: 400000, estimatedHours: 1.2),
  LaborItemModel(laborCode: 'LBR-CH-009', category: 'Gầm lái & Phanh', name: 'Thay rotuyn lái trong / lái ngoài (1 bên)', basePrice: 300000, estimatedHours: 0.8),
  LaborItemModel(laborCode: 'LBR-CH-010', category: 'Gầm lái & Phanh', name: 'Phục hồi thước lái (Chảy dầu thước lái)', basePrice: 3500000, estimatedHours: 6.0),
  LaborItemModel(laborCode: 'LBR-CH-011', category: 'Gầm lái & Phanh', name: 'Cân bằng động lốp (Wheel Balancing) - 4 bánh', basePrice: 400000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-CH-012', category: 'Gầm lái & Phanh', name: 'Cân chỉnh góc đặt bánh xe 3D (Wheel Alignment)', basePrice: 700000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-CH-013', category: 'Gầm lái & Phanh', name: 'Vá lốp (Vá nấm/Vá rút)', basePrice: 150000, estimatedHours: 0.5),

  // ==========================================
  // 5. HỆ THỐNG ĐIỆN & LẠNH (ELECTRICAL & HVAC)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-EL-001', category: 'Điện & Lạnh', name: 'Chẩn đoán lỗi hệ thống bằng máy quét (Scanner/OBD2)', basePrice: 350000, estimatedHours: 0.5),
  LaborItemModel(laborCode: 'LBR-EL-002', category: 'Điện & Lạnh', name: 'Thay ắc quy 12V & Khai báo lại bình ắc quy trên ECU', basePrice: 250000, estimatedHours: 0.5),
  LaborItemModel(laborCode: 'LBR-EL-003', category: 'Điện & Lạnh', name: 'Thay máy phát điện (Alternator)', basePrice: 800000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-EL-004', category: 'Điện & Lạnh', name: 'Thay củ đề động cơ (Starter)', basePrice: 750000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-EL-005', category: 'Điện & Lạnh', name: 'Vệ sinh nội soi dàn lạnh điều hòa (Không tháo taplo)', basePrice: 850000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-EL-006', category: 'Điện & Lạnh', name: 'Nạp ga điều hòa & Hút chân không', basePrice: 550000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-EL-007', category: 'Điện & Lạnh', name: 'Thay lốc điều hòa (Compressor) & Súc rửa đường ống', basePrice: 1800000, estimatedHours: 3.5),
  LaborItemModel(laborCode: 'LBR-EL-008', category: 'Điện & Lạnh', name: 'Xử lý lỗi rò rỉ điện (Hao bình ắc quy qua đêm)', basePrice: 1500000, estimatedHours: 3.0),
  LaborItemModel(laborCode: 'LBR-EL-EV1', category: 'Điện & Lạnh', name: 'Hạ & Kiểm tra cụm Pin Cao Áp (High Voltage Battery Pack)', basePrice: 5500000, estimatedHours: 8.0),
  LaborItemModel(laborCode: 'LBR-EL-EV2', category: 'Điện & Lạnh', name: 'Thay Cell/Module Pin Cao Áp (High Voltage Module)', basePrice: 8500000, estimatedHours: 12.0),

  // ==========================================
  // 6. CÔNG NGHỆ & TỰ LÁI (SOFTWARE & ADAS CALIBRATION)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-AD-001', category: 'Phần mềm & ADAS', name: 'Cập nhật Firmware / Hệ điều hành điều khiển (FOTA)', basePrice: 500000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-AD-002', category: 'Phần mềm & ADAS', name: 'Cân chỉnh Camera kính chắn gió (Lane Keep Assist / LKA)', basePrice: 2000000, estimatedHours: 2.0),
  LaborItemModel(laborCode: 'LBR-AD-003', category: 'Phần mềm & ADAS', name: 'Cân chỉnh Radar cản trước (Adaptive Cruise Control / ACC)', basePrice: 2500000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-AD-004', category: 'Phần mềm & ADAS', name: 'Cân chỉnh Camera 360 độ (Surround View Calibration)', basePrice: 1800000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-AD-005', category: 'Phần mềm & ADAS', name: 'Coding / Lập trình chìa khóa mới (Thêm chìa thứ 2)', basePrice: 800000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-AD-006', category: 'Phần mềm & ADAS', name: 'Kích hoạt tính năng ẩn (Apple CarPlay/Android Auto/Cảnh báo mệt mỏi)', basePrice: 1000000, estimatedHours: 1.0),

  // ==========================================
  // 7. ĐỒNG SƠN & CHĂM SÓC XE (BODY, PAINT & DETAILING)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-BD-003', category: 'Đồng sơn & Làm đẹp', name: 'Gò phục hồi móp méo bằng phương pháp kéo/đẩy (PDR)', basePrice: 850000, estimatedHours: 2.0),
  LaborItemModel(laborCode: 'LBR-BD-004', category: 'Đồng sơn & Làm đẹp', name: 'Đánh bóng toàn bộ xe (3 bước)', basePrice: 2500000, estimatedHours: 5.0),
  LaborItemModel(laborCode: 'LBR-BD-005', category: 'Đồng sơn & Làm đẹp', name: 'Phủ Ceramic toàn bộ xe (Gói Tiêu chuẩn 2 lớp - Bảo hành 2 năm)', basePrice: 6500000, estimatedHours: 10.0),
  LaborItemModel(laborCode: 'LBR-BD-006', category: 'Đồng sơn & Làm đẹp', name: 'Vệ sinh nội thất chuyên sâu (Giặt thảm, da, khử mùi Ozone)', basePrice: 1800000, estimatedHours: 4.0),
  LaborItemModel(laborCode: 'LBR-BD-007', category: 'Đồng sơn & Làm đẹp', name: 'Phủ gầm chống ỉ sét và giảm ồn (Gói tiêu chuẩn 5 chai)', basePrice: 3500000, estimatedHours: 4.0),
  LaborItemModel(laborCode: 'LBR-BD-008', category: 'Đồng sơn & Làm đẹp', name: 'Đánh bóng phục hồi chóa đèn pha bị ố vàng', basePrice: 850000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-BD-009', category: 'Đồng sơn & Làm đẹp', name: 'Dán phim cách nhiệt (Gói tiêu chuẩn toàn bộ xe)', basePrice: 4500000, estimatedHours: 3.5),

  // ==========================================
  // 8. HỆ THỐNG XẢ (EXHAUST & EMISSION)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-EX-001', category: 'Hệ thống xả', name: 'Hàn phục hồi ống xả bị thủng', basePrice: 400000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-EX-002', category: 'Hệ thống xả', name: 'Thay bầu xúc tác khí thải (Catalytic Converter)', basePrice: 1200000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-EX-003', category: 'Hệ thống xả', name: 'Thay cảm biến oxy (O2 Sensor)', basePrice: 300000, estimatedHours: 0.8),
  LaborItemModel(laborCode: 'LBR-EX-004', category: 'Hệ thống xả', name: 'Vệ sinh cụm van luân hồi khí thải (EGR Valve)', basePrice: 550000, estimatedHours: 1.5),

  // ==========================================
  // 9. NỘI THẤT & TIỆN NGHI (INTERIOR & ACCESSORIES)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-IN-001', category: 'Nội thất & Tiện nghi', name: 'Tháo lắp, xử lý kẹt cơ cấu compa lên kính cửa', basePrice: 600000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-IN-002', category: 'Nội thất & Tiện nghi', name: 'Kiểm tra, khắc phục tiếng kêu lạch cạch táp-pi cửa', basePrice: 450000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-IN-003', category: 'Nội thất & Tiện nghi', name: 'Sửa chữa cơ cấu trượt/ngả ghế chỉnh điện', basePrice: 850000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-IN-004', category: 'Nội thất & Tiện nghi', name: 'Bọc lại nỉ trần xe bị võng/rớt nỉ', basePrice: 1800000, estimatedHours: 4.0),
  LaborItemModel(laborCode: 'LBR-IN-005', category: 'Nội thất & Tiện nghi', name: 'Khâu bọc lại da vô lăng (Da thật/Nappa)', basePrice: 1200000, estimatedHours: 3.0),
  LaborItemModel(laborCode: 'LBR-IN-006', category: 'Nội thất & Tiện nghi', name: 'Lắp đặt Camera hành trình trước & sau (Đi dây âm trần)', basePrice: 500000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-IN-007', category: 'Nội thất & Tiện nghi', name: 'Lắp đặt màn hình Android tích hợp dưỡng taplo', basePrice: 800000, estimatedHours: 2.0),

  // ==========================================
  // 10. HỆ THỐNG LÀM MÁT (COOLING SYSTEM)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-CL-001', category: 'Hệ thống làm mát', name: 'Súc rửa két nước mát bằng hóa chất chuyên dụng', basePrice: 550000, estimatedHours: 1.2),
  LaborItemModel(laborCode: 'LBR-CL-002', category: 'Hệ thống làm mát', name: 'Thay van hằng nhiệt (Thermostat)', basePrice: 450000, estimatedHours: 1.0),
  LaborItemModel(laborCode: 'LBR-CL-003', category: 'Hệ thống làm mát', name: 'Thay quạt tản nhiệt động cơ (Cooling Fan)', basePrice: 650000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-CO-004', category: 'Hệ thống làm mát', name: 'Súc rửa hệ thống sưởi khoang lái (Heater Core)', basePrice: 1500000, estimatedHours: 3.5),

  // ==========================================
  // 11. HỆ THỐNG TREO BỔ SUNG (ADVANCED SUSPENSION)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-CH-015', category: 'Gầm lái & Phanh', name: 'Thay rotuyn thanh cân bằng (1 bên)', basePrice: 250000, estimatedHours: 0.5),
  LaborItemModel(laborCode: 'LBR-CH-016', category: 'Gầm lái & Phanh', name: 'Thay càng A trên / dưới (Bao gồm ép cao su)', basePrice: 750000, estimatedHours: 1.5),
  LaborItemModel(laborCode: 'LBR-CH-017', category: 'Gầm lái & Phanh', name: 'Thay bơm hơi phuộc khí nén (Air Suspension Pump)', basePrice: 1200000, estimatedHours: 2.5),
  LaborItemModel(laborCode: 'LBR-CH-018', category: 'Gầm lái & Phanh', name: 'Bơm mỡ bò các khớp các-đăng (Khớp nối trục)', basePrice: 150000, estimatedHours: 0.5),

  // ==========================================
  // 12. DỊCH VỤ DUNG DỊCH ĐẶC THÙ (SPECIAL FLUIDS)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-FL-001', category: 'Dầu & Dung dịch', name: 'Thay dầu trợ lực lái thủy lực', basePrice: 250000, estimatedHours: 0.8),
  LaborItemModel(laborCode: 'LBR-FL-002', category: 'Dầu & Dung dịch', name: 'Thay dầu cầu trước / cầu sau (Vi sai)', basePrice: 300000, estimatedHours: 0.8),
  LaborItemModel(laborCode: 'LBR-FL-003', category: 'Dầu & Dung dịch', name: 'Thay dầu hộp số phụ (Transfer Case - Xe 2 cầu 4x4)', basePrice: 350000, estimatedHours: 0.8),

  // ==========================================
  // 13. HỆ THỐNG CHIẾU SÁNG (LIGHTING)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-LI-001', category: 'Điện & Lạnh', name: 'Thay bóng đèn pha / cos / xi-nhan (Cơ bản)', basePrice: 100000, estimatedHours: 0.3),
  LaborItemModel(laborCode: 'LBR-LI-002', category: 'Điện & Lạnh', name: 'Độ mí LED / Lắp bóng Bi-LED / Bi-Laser (1 cặp)', basePrice: 1500000, estimatedHours: 3.5),
  LaborItemModel(laborCode: 'LBR-LI-003', category: 'Điện & Lạnh', name: 'Khắc phục đèn sương mù bị vào nước (Vào keo mika)', basePrice: 650000, estimatedHours: 2.0),

  // ==========================================
  // 14. BẢO DƯỠNG CẤP LỚN NÂNG CAO (ADVANCED PM PACKAGES)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-PM-007', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 60,000 km (Kiểm tra toàn diện)', basePrice: 2000000, estimatedHours: 4.0),
  LaborItemModel(laborCode: 'LBR-PM-008', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 80,000 km (Bao gồm thay dây curoa cam)', basePrice: 4500000, estimatedHours: 8.0),
  LaborItemModel(laborCode: 'LBR-PM-009', category: 'Bảo dưỡng định kỳ', name: 'Bảo dưỡng cấp 100,000 km (Overhaul cơ bản)', basePrice: 3500000, estimatedHours: 6.0),

  // ==========================================
  // 15. DỊCH VỤ GIA TĂNG & TÙY CHỈNH (VAS & CUSTOM)
  // ==========================================
  LaborItemModel(laborCode: 'LBR-VAS-001', category: 'Khác', name: 'Đưa đi đăng kiểm hộ (Bao gồm phí cầu đường)', basePrice: 500000, estimatedHours: 4.0),
  LaborItemModel(laborCode: 'LBR-VAS-002', category: 'Khác', name: 'Phí cứu hộ xe về xưởng (Dưới 10km)', basePrice: 800000, estimatedHours: 2.0),
  LaborItemModel(laborCode: 'LBR-VAS-003', category: 'Khác', name: 'Phí lưu kho qua đêm (Áp dụng xe sửa xong không lấy)', basePrice: 150000, estimatedHours: 24.0),
  LaborItemModel(laborCode: 'LBR-VAS-004', category: 'Khác', name: 'Rửa xe bọt tuyết siêu cấp VIP', basePrice: 150000, estimatedHours: 0.5),
  LaborItemModel(laborCode: 'LBR-CUS-001', category: 'Khác', name: 'Công tác phát sinh (Nhập tay mô tả trong hóa đơn)', basePrice: 0, estimatedHours: 1.0),
];
