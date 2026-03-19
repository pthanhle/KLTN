import { DUMMY_CARS } from '../../../../../Customer/Cars/data/cars.mock';
import { MOCK_PROFILE_CUSTOMER } from '../../../data/profile.mock';

export const getMockQuotation = (id) => {
    return {
        booking_code: id || 'SRV-2026-B77P',
        created_date: '24/05/2026',
        status: 'WAITING_FOR_APPROVAL',
        customer_info: {
            full_name: MOCK_PROFILE_CUSTOMER.full_name,
            phone: MOCK_PROFILE_CUSTOMER.phone,
            address: MOCK_PROFILE_CUSTOMER.address,
        },
        vehicle_info: {
            brand: DUMMY_CARS[0].brandName,
            model: DUMMY_CARS[0].name,
            license_plate: '30A-888.88',
            vin_number: 'WDD222158...',
            current_odometer: '12,450',
        },
        parts: [
            { id: 'MB-FIL-992', name: 'Lọc dầu động cơ chính hãng MB', quantity: 1, unit_price: 850000 },
            { id: 'MB-OIL-OW40', name: 'Dầu nhớt Mobile 1 Gold (Lít)', quantity: 8, unit_price: 320000 },
            { id: 'MB-BRK-FNT', name: 'Bộ má phanh trước (Ceramic)', quantity: 1, unit_price: 4200000 }
        ],
        labors: [
            { id: 'LB-01', description: 'Công thay dầu & Lọc dầu', hours: 0.5, rate: 400000 },
            { id: 'LB-02', description: 'Kiểm tra tổng quát hệ thống phanh & Gầm', hours: 1.0, rate: 400000 },
            { id: 'LB-03', description: 'Thay bộ má phanh trước', hours: 1.5, rate: 400000 }
        ],
        advisor_name: 'Lê Văn Tùng',
        vat_rate: 0.10
    };
};
