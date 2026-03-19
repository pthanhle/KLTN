import { DUMMY_CARS } from '@/pages/Customer/Cars/data/cars.mock';

export const mockServices = [
    {
        booking_code: 'SRV-2026-B77P',
        user_id: 'USR-08912',
        service_type: 'MAINTENANCE', // 'MAINTENANCE', 'REPAIR', 'CAR_SPA'
        advisor_info: { id: 'ADV-001', name: 'Đỗ Tiến Đạt' },
        mechanic_info: { id: 'MEC-005', name: 'Lê Văn Nam' },
        vehicle_info: {
            brand: DUMMY_CARS[0].brandName,
            model: DUMMY_CARS[0].name,
            license_plate: '30A-888.88',
            vin_number: 'WDD2221831A12345',
            current_odometer: 12450
        },
        services: [
            { service_id: 'SRV-001', service_name: 'Thay dầu nhớt động cơ & lọc dầu', price: 3500000 },
            { service_id: 'SRV-015', service_name: 'Kiểm tra hệ thống phanh ABS', price: 800000 },
            { service_id: 'SRV-042', service_name: 'Car Spa & Phủ Ceramic bề mặt', price: 15000000 }
        ],
        total_cost: 19300000,
        customer_note: 'Xe có tiếng rít khi phanh gấp ở tốc độ cao.',
        advisor_note: 'Má phanh vẫn còn 60%, đã vệ sinh hệ thống ABS. Bề mặt sơn xước dăm nhiều, đã phủ 3 lớp Ceramic. Lốp xe mòn không đều, đánh lái hơi lệch, đã cân chỉnh chụm.',
        attachments: {
            before: [
                'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop'
            ],
            after: [
                'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop'
            ]
        },
        rating: 5,
        booking_date: '2026-05-20',
        time_slot: '09:00 - 11:30',
        check_in_time: '2026-05-20T08:50:00Z',
        check_out_time: '2026-05-20T14:15:00Z',
        booking_status: 'COMPLETED',
        next_maintenance_date: '20/11/2026',
    },
    {
        booking_code: 'SRV-2026-X99R',
        user_id: 'USR-08912',
        service_type: 'CAR_SPA',
        advisor_info: { id: 'ADV-002', name: 'Nguyễn Thị Bích' },
        mechanic_info: { id: 'MEC-012', name: 'Trần Mạnh Hùng' },
        vehicle_info: {
            brand: DUMMY_CARS[8].brandName,
            model: DUMMY_CARS[8].name,
            license_plate: '30G-999.99',
            vin_number: 'WP0ZZZ99ZLS12345',
            current_odometer: 2100
        },
        services: [
            { service_id: 'SRV-P01', service_name: 'Kiểm tra định kỳ 2,000km đầu tiên', price: 0 },
            { service_id: 'SRV-P08', service_name: 'Cập nhật phần mềm hệ thống PCM', price: 0 }
        ],
        total_cost: 0,
        customer_note: 'Bảo dưỡng lần đầu, hệ thống giải trí PCM thỉnh thoảng mất kết nối Carplay.',
        advisor_note: 'Đã hoàn thành kiểm tra 2,000km, xe vận hành hoàn hảo các thông số. Đã flash lại firmware PCM mới nhất từ Porsche AG.',
        attachments: {
            before: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop'],
            after: []
        },
        rating: null,
        booking_date: '2026-06-15',
        time_slot: '14:00 - 16:00',
        check_in_time: '2026-06-15T13:45:00Z',
        check_out_time: null,
        booking_status: 'IN_PROGRESS',
        next_maintenance_date: '15/12/2026',
    }
];
