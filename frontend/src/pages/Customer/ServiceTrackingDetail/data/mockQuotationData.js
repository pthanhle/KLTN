import { getMasterServiceSession } from '../utils/trackingDataUtils';

const quotationDatabase = {
    'SRV-2026-B77P': {
        booking_code: 'SRV-2026-B77P',
        parts: [
            { id: 'PT-BRK-01', sku: 'BRK-01', name: 'Bộ má phanh gốm cường độ cao (Trước)', quantity: 1, unit_price: 11000000, total_price: 11000000 },
            { id: 'PT-BUSH-A', sku: 'BUSH-A', name: 'Bộ bọc cao su càng A', quantity: 2, unit_price: 4500000, total_price: 9000000 },
            { id: 'PT-OIL-0W40', sku: 'OIL-0W40', name: 'Dầu hộp số tổng hợp cao cấp', quantity: 1, unit_price: 2500000, total_price: 2500000 }
        ],
        labors: [
            { id: 'LB-01', labor_code: 'SVC-01', name: 'Công ép cao su càng A và cân chỉnh thước lái 3D', quantity: 2, unit_price: 800000, total_price: 1600000 },
            { id: 'LB-02', labor_code: 'SVC-02', name: 'Công thay má phanh và chạy phần mềm Reset', quantity: 1, unit_price: 900000, total_price: 900000 }
        ],
        vat_rate: 0.10,
        currency: 'VNĐ',
        payment_terms: { required_deposit: 10000000, deposit_status: 'PENDING', deposit_qr_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg' }
    }
};

export const getQuotationData = (code) => {
    if (['SRV-2026-R22', 'SRV-2026-X11A', 'SRV-2026-Y22B', 'SRV-2026-Z33C', 'SRV-2026-R11'].includes(code)) {
        return null;
    }

    const data = quotationDatabase['SRV-2026-B77P'];
    const serviceSession = getMasterServiceSession(code);

    let status = 'WAITING_FOR_APPROVAL';
    if (['SRV-2026-B77P'].includes(code)) {
        status = 'PENDING';
    } else if (['SRV-2026-W11', 'SRV-2026-W22', 'SRV-2026-W33', 'SRV-2026-W44', 'SRV-2026-X99R', 'SRV-2026-M01', 'SRV-2026-M02'].includes(code)) {
        status = 'APPROVED';
    }

    return { ...data, booking_code: code, status, creation_date: serviceSession?.booking_date, advisor_name: serviceSession?.advisor_info?.name || 'Trần Hoàng', customer_info: { full_name: 'Nguyễn Văn Khách', phone: '0901.234.567', address: 'Số 12, Phạm Văn Đồng, Hà Nội' }, vehicle_info: { ...serviceSession?.vehicle_info }, payment_terms: { ...data.payment_terms, deposit_status: 'PENDING' }, customer_signature: null };
};
