import { getMasterServiceSession } from '../utils/trackingDataUtils';

export const mockDiagnosticData = {
    'SRV-2026-B77P': {
        booking_code: 'SRV-2026-B77P',
        summary: { total_items: 40, normal: 36, warning: 2, critical: 2 },
        groups: [
            {
                id: 'suspension', title: 'Hệ Thống Phanh & Gầm', icon: 'Disc', totalCount: 12,
                technician_note: 'Phát hiện cao su càng chữ A rách nát gây vỡ mỡ, tiếng kêu phát ra từ đây. Má phanh trước đã mòn chạm cữ báo mòn.',
                items: [
                    { name: 'Má phanh trước', status: 'critical', action_required: 'Khuyến nghị thay mới lập tức để đảm bảo an toàn' },
                    { name: 'Cao su càng chữ A', status: 'critical', action_required: 'Vỡ nát, cần ép lại bạc đạn và cao su mới' },
                    { name: 'Giảm xóc', status: 'warning', action_required: 'Bắt đầu có vết chảy dầu nhẹ' },
                    { name: 'Rô tuyn lái', status: 'normal' },
                    { name: 'Cao su cân bằng', status: 'normal' },
                    { name: 'Đĩa phanh sau', status: 'normal' },
                    { name: 'Má phanh sau', status: 'normal' },
                    { name: 'Bơm trợ lực lái', status: 'normal' },
                    { name: 'Lốp trước trái', status: 'normal' },
                    { name: 'Lốp trước phải', status: 'normal' },
                    { name: 'Lốp sau trái', status: 'normal' },
                    { name: 'Lốp sau phải', status: 'normal' }
                ]
            },
            {
                id: 'engine', title: 'Động Cơ & Hộp Số', icon: 'Cpu', totalCount: 10, technician_note: null,
                items: [
                    { name: 'Dầu hộp số', status: 'warning', action_required: 'Đã đến hạn thay theo chu kỳ' },
                    { name: 'Dầu bôi trơn động cơ', status: 'normal' },
                    { name: 'Lọc dầu (lọc nhớt)', status: 'normal' },
                    { name: 'Bugie & Đánh lưả', status: 'normal' },
                    { name: 'Dây Curoa tổng', status: 'normal' },
                    { name: 'Nước làm mát', status: 'normal' },
                    { name: 'Rò rỉ block máy', status: 'normal' },
                    { name: 'Bạc đạn ốp trục', status: 'normal' },
                    { name: 'Bơm nhiên liệu', status: 'normal' },
                    { name: 'Cảm biến oxy', status: 'normal' }
                ]
            },
            {
                id: 'electrical', title: 'Hệ Thống Điện & Cảm Biến', icon: 'Zap', totalCount: 9, technician_note: null,
                items: [
                    { name: 'Ắc quy (Điện áp/Dòng)', status: 'normal' },
                    { name: 'Hệ thống chiếu sáng', status: 'normal' },
                    { name: 'Màn hình hiển thị Taplo', status: 'normal' },
                    { name: 'Camera 360/Lùi', status: 'normal' },
                    { name: 'Máy phát điện', status: 'normal' },
                    { name: 'Mô-tơ gạt mưa', status: 'normal' },
                    { name: 'Hệ thống âm thanh', status: 'normal' },
                    { name: 'Cảm biến góc khuất', status: 'normal' },
                    { name: 'Còi báo hiệu', status: 'normal' }
                ]
            },
            {
                id: 'body', title: 'Nội Ngoại Thất & Khung Vỏ', icon: 'Car', totalCount: 9, technician_note: null,
                items: [
                    { name: 'Bề mặt sơn ngoại thất', status: 'normal' },
                    { name: 'Gương chiếu hậu', status: 'normal' },
                    { name: 'Cơ cấu điện ghế lái', status: 'normal' },
                    { name: 'Dây đai an toàn', status: 'normal' },
                    { name: 'Kính chắn gió/Cửa', status: 'normal' },
                    { name: 'Ngoàm khóa tĩnh', status: 'normal' },
                    { name: 'Khớp nối cốp sau', status: 'normal' },
                    { name: 'Cửa sổ trời (Sunroof)', status: 'normal' },
                    { name: 'Taplo & Tappi cửa', status: 'normal' }
                ]
            }
        ],
        conclusion: 'Hệ thống Gầm và Phanh đang gặp vấn đề nghiêm trọng, nguy hiểm khi di chuyển tốc độ cao. Cần tiến hành thay thế khẩn cấp. Các hệ thống khác hoạt động ổn định.',
    }
};

export const getDiagnosticData = (code) => {
    if (['SRV-2026-X11A', 'SRV-2026-Y22B', 'SRV-2026-Z33C', 'SRV-2026-R11', 'SRV-2026-R22'].includes(code)) {
        return null;
    }

    const diagnostic = mockDiagnosticData['SRV-2026-B77P'];
    const serviceSession = getMasterServiceSession(code);
    return { ...diagnostic, booking_code: code, last_maintenance_date: '10/05/2025', technician: { name: serviceSession?.mechanic_info?.name || 'Nguyễn Văn A', role: serviceSession?.mechanic_info?.level || 'Kỹ thuật viên', avatar: serviceSession?.mechanic_info?.avatar || 'https://i.pravatar.cc/150', signature: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Steve_Jobs_signature.svg/512px-Steve_Jobs_signature.svg.png' } };
};
