import { getMasterServiceSession } from '../utils/trackingDataUtils';

const qcDatabase = {
    'SRV-2026-B77P': {
        booking_code: 'SRV-2026-B77P',
        estimated_delivery: '16:30 PM',
        kcs_tasks: [
            { id: 't1', title: 'Kiểm tra lực phanh Dyno', desc: 'Đã đo lực phanh 4 bánh và độ dính đĩa phanh mới. Hệ thống phanh khẩn cấp hoạt động tốt.', status: 'completed', icon: 'Cpu' },
            { id: 't2', title: 'Cân chỉnh góc đặt bánh xe 3D', desc: 'Hoàn tất thước lái. Thông số Camber, Caster, Toe đã đưa về chuẩn nhà máy.', status: 'completed', icon: 'Wind' },
            { id: 't3', title: 'Vệ sinh họng ga & Động cơ', desc: 'Sử dụng dung dịch cao cấp 3M, tiếng máy nổ mượt mà.', status: 'processing', icon: 'Sparkles' },
            { id: 't4', title: 'Kiểm tra đường hỗn hợp', desc: 'Sắp chạy thử 10km quanh khu vực để lắng nghe tiếng dội gầm chữ A.', status: 'pending', icon: 'Disc' }
        ],
        spec_hud: { pass_rate: '99.5%', time_elapsed: '2h45m', tech_count: '02', criticals: '00' },
        vehicle_visual: { image: 'https://images.unsplash.com/photo-1503376712341-df0713ccbc1a?w=800&q=80', warranty: 'Bảo hành hệ thống treo & phanh 24 tháng', color: 'Black Sapphire' },
        manager: { name: 'Nguyễn Hoàng Nam', role: 'Quản đốc xưởng - Workshop Manager', signature: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Steve_Jobs_signature.svg/512px-Steve_Jobs_signature.svg.png' }
    }
};

export const getQcData = (code) => {
    const data = qcDatabase['SRV-2026-B77P'];
    const serviceSession = getMasterServiceSession(code);
    const enrichedData = { ...data, vehicle_visual: { ...data.vehicle_visual, plate: serviceSession?.vehicle_info?.license_plate, model: serviceSession?.vehicle_info?.model, brand: serviceSession?.vehicle_info?.brand } };

    if (['SRV-2026-R22', 'SRV-2026-X11A', 'SRV-2026-Y22B', 'SRV-2026-Z33C', 'SRV-2026-R11'].includes(code)) {
        return null;
    }

    if (['SRV-2026-W33', 'SRV-2026-W44'].includes(code)) {
        return { ...enrichedData, status: 'IN_PROGRESS' };
    }

    if (['SRV-2026-X99R', 'SRV-2026-M01', 'SRV-2026-M02'].includes(code)) {
        return {
            ...enrichedData,
            status: 'COMPLETED',
            kcs_tasks: enrichedData.kcs_tasks.map(i => ({ ...i, status: 'completed' }))
        };
    }

    return { ...enrichedData, status: 'IN_PROGRESS' };
};
