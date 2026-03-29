import { getMasterServiceSession } from '../utils/trackingDataUtils';

export const mockOverviewData = {
    'SRV-2026-B77P': {
        booking_code: 'SRV-2026-B77P',
        customer_note: 'Bảo dưỡng cấp lớn 40.000km. Xe đi qua chỗ xóc có tiếng kêu lục cục dưới gầm, phanh có tiếng rít.',
        status: 'IN_PROGRESS',
        reception_notes: 'Cản trước bên phải xước nhẹ, la-zăng sau xước xát.',
        health_hud: { odometer: 40150, fuel_level: 45 },
        vehicle_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop',
        hotspots: [{ id: 1, top: '85px', right: '25px', label: 'Phát hiện vết xước cản' }, { id: 2, top: '150px', left: '20px', label: 'Xước la-zăng' }],
        checklist: [{ id: 1, name: 'Sổ bảo hành', checked: true }, { id: 2, name: 'Lốp dự phòng', checked: true }, { id: 3, name: 'Camera hành trình', checked: true }, { id: 4, name: 'Thảm sàn', checked: true }],
        signatures: {
            advisor: { name: 'TRẦN VĂN CV', svgPath: 'M20,60 Q40,30 60,60 T100,60 T140,40' },
            customer: { name: 'NGUYỄN VĂN KHÁCH', svgPath: 'M30,30 C50,30 50,70 70,70 C90,70 110,30 130,30 S170,70 190,50' }
        }
    }
};

export const getOverviewData = (code) => {
    const defaultData = mockOverviewData['SRV-2026-B77P'];
    const serviceSession = getMasterServiceSession(code);
    return { ...defaultData, vehicle_info: serviceSession?.vehicle_info || {} };
};
