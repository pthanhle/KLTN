export const MOCK_CUSTOMERS = [
    {
        id: '64a1b2c3d4e5f60017a1b2c3',
        customer_code: 'CUS-8392',
        username: 'alex_johnson',
        full_name: 'Nguyễn Thành Trung',
        email: 'trung.nt@luxury.vn',
        avatar: 'https://i.pravatar.cc/150?u=1',
        phone: '090 1234 567',
        address: '12 Hàm Nghi, Vĩnh Trung, Đà Nẵng',
        role: { role_name: 'Customer' },
        authProvider: 'local',
        status: 'active',
        createdAt: '2023-10-24T08:30:00.000Z',
        tier: 'platinum',
        total_spent: 125000000,
        debt: 0,
        loyalty: {
            current_points: 1250,
            next_tier: 'Titanium',
            points_to_next: 3750,
            active_vouchers: 4,
            bonus_rate: 20
        },
        source: 'MOBILE APP (DIRECT)',
        notes: 'Khách hàng VIP hay yêu cầu rửa xe bằng dung dịch chuyên dụng 3M. Tránh gọi nhắc lịch vào buổi sáng.',
        garage: [
            {
                id: 'car1',
                brand: 'Mercedes-Benz',
                model: 'GLC 300',
                license_plate: '30F-123.45',
                year: '2023',
                type: 'Luxury SUV',
                vin: 'W1K2234051A456XXX',
                odometer: 12000,
                insurance_exp: '15 DEC 2024',
                registration_status: 'HỢP LỆ'
            },
            {
                id: 'car2',
                brand: 'BMW',
                model: 'C200',
                license_plate: '30F-123.46',
                year: '2021',
                type: 'Luxury Sedan',
                vin: 'WBAXX1234567890XX',
                odometer: 45800,
                insurance_exp: 'EXPIRED',
                registration_status: 'HỢP LỆ'
            }
        ],
        last_visit: {
            id: 'sh1',
            date: '2024-03-12T09:30:00.000Z',
            service_type: 'Bảo dưỡng định kỳ',
            is_overdue: false
        },
        service_history: [
            {
                id: 'sh1', 
                invoice_code: 'INV-2024-0102',
                vehicle_info: { brand: 'Mercedes-Benz', model: 'GLC 300', license_plate: '30F-123.45', current_odometer: 10500 },
                date: '2024-03-12T09:30:00.000Z', 
                service_type: 'MAINTENANCE',
                services: [{ service_id: 'SRV-001', service_name: 'Bảo dưỡng định kỳ Cấp 2', price: 4250000 }],
                total_cost: 4250000, 
                status: 'PAID', 
                is_overdue: false,
                advisor_info: { id: 'ADV-001', name: 'Alex Dang' },
                location: 'TT Center Binh Duong'
            },
            {
                id: 'sh2', 
                invoice_code: 'INV-2023-0855',
                vehicle_info: { brand: 'Mercedes-Benz', model: 'GLC 300', license_plate: '30F-123.45', current_odometer: 5200 },
                date: '2023-08-15T10:00:00.000Z', 
                service_type: 'CAR_SPA',
                services: [{ service_id: 'SPA-002', service_name: 'Rửa xe chi tiết & Phủ Vệ Sinh Khoang Máy', price: 1500000 }],
                total_cost: 1500000, 
                status: 'PAID', 
                is_overdue: false,
                advisor_info: { id: 'ADV-002', name: 'Trần C' },
                location: 'TT Center Binh Duong'
            }
        ],
        upcoming_engagements: [
            {
                id: 'ue1',
                car_name: 'BMW X5 (43A-555.55)',
                vehicle_info: { brand: 'BMW', model: 'X5', license_plate: '43A-555.55', current_odometer: 10000 },
                milestone: 'Mốc 10,000 km',
                recommended_service: 'Bảo dưỡng định kỳ Cấp 1',
                expected_date: '2024-05-12T00:00:00.000Z',
                location: 'TT Center Binh Duong',
                advisor_info: { id: 'ADV-001', name: 'Alex Dang' },
                status: 'PENDING_CALL',
                is_overdue: false
            },
            {
                id: 'ue2',
                car_name: 'BMW X5 (43A-555.55)',
                vehicle_info: { brand: 'BMW', model: 'X5', license_plate: '43A-555.55', current_odometer: 10000 },
                milestone: 'Hạn Đăng Kiểm & Bảo Hiểm',
                recommended_service: 'Gia hạn gói dịch vụ 2024',
                expected_date: '2024-03-01T00:00:00.000Z',
                location: 'Hệ thống Dịch vụ TT Auto',
                advisor_info: { id: 'ADV-003', name: 'Nguyễn Thị Bích' },
                status: 'CONTACTED',
                is_overdue: true
            }
        ],
        bookings: [
            {
                booking_code: 'SRV-2026-B77P',
                service_type: 'MAINTENANCE',
                advisor_info: { id: 'ADV-001', name: 'Đỗ Tiến Đạt', phone: '0988.111.222', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
                mechanic_info: { id: 'MEC-005', name: 'Lê Văn Nam', level: 'Master Technician', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
                vehicle_info: {
                    brand: 'Mercedes-Benz',
                    model: 'GLC 300',
                    license_plate: '30F-123.45',
                    current_odometer: 12500
                },
                services: [
                    { service_id: 'SRV-001', service_name: 'Thay dầu động cơ & phanh', price: 4250000 }
                ],
                total_cost: 4250000,
                booking_date: '2026-05-20',
                time_slot: '09:00 - 11:30',
                booking_status: 'QUOTING',
                payment_status: 'UNPAID'
            },
            {
                booking_code: 'SRV-2026-X99R',
                service_type: 'CAR_SPA',
                advisor_info: { id: 'ADV-002', name: 'Nguyễn Thị Bích', phone: '0912.333.444', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
                vehicle_info: {
                    brand: 'BMW',
                    model: 'C200',
                    license_plate: '30F-123.46',
                    current_odometer: 45800
                },
                services: [
                    { service_id: 'SRV-P01', service_name: 'Phủ Ceramic Toàn Bộ', price: 15000000 }
                ],
                total_cost: 15000000,
                booking_date: '2026-06-15',
                time_slot: '14:00 - 16:00',
                booking_status: 'COMPLETED',
                payment_status: 'PAID'
            }
        ],
        loyalty_history: [
            {
                id: 'lh1',
                date: '2024-03-12T10:00:00.000Z',
                action: 'EARN',
                points: 425,
                description: 'Tích điểm từ Hóa đơn INV-2024-0102',
                balance: 1250
            },
            {
                id: 'lh2',
                date: '2024-01-05T15:20:00.000Z',
                action: 'REDEEM',
                points: -500,
                description: 'Đổi Voucher Giảm Giá Rửa Xe',
                balance: 825
            },
            {
                id: 'lh3',
                date: '2023-11-05T14:30:00.000Z',
                action: 'EARN',
                points: 1200,
                description: 'Tích điểm từ Hóa đơn INV-2023-9901',
                balance: 1325
            }
        ]
    },
    {
        id: '64a1b2c3d4e5f60017a1b2c4',
        customer_code: 'CUS-1025',
        username: 'sarah_w',
        full_name: 'Trần Thu Thủy',
        email: 'thuytran@web.com',
        avatar: 'https://i.pravatar.cc/150?u=2',
        phone: '091 555 9999',
        address: '45 Lê Duẩn, Hải Châu, Đà Nẵng',
        role: { role_name: 'Customer' },
        authProvider: 'google',
        status: 'active',
        createdAt: '2023-11-02T14:15:22.000Z',
        tier: 'gold',
        total_spent: 85000000,
        debt: 2000000,
        loyalty: {
            current_points: 850,
            next_tier: 'Platinum',
            points_to_next: 1150
        },
        garage: [
            { id: 3, brand: 'BMW', model: 'X5', license_plate: '43A-555.55' }
        ],
        last_visit: {
            date: '2023-03-12T00:00:00.000Z',
            service_type: 'Maintenance',
            is_overdue: true
        }
    },
    {
        id: '64a1b2c3d4e5f60017a1b2c5',
        customer_code: 'CUS-4921',
        username: 'mike_chen',
        full_name: 'Phạm Đức Anh',
        email: 'ducanh@service.io',
        avatar: 'https://i.pravatar.cc/150?u=3',
        phone: '098 855 5111',
        address: '100 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng',
        role: { role_name: 'Customer' },
        authProvider: 'local',
        status: 'suspended',
        createdAt: '2024-01-15T09:45:10.000Z',
        tier: 'silver',
        total_spent: 15500000,
        debt: 2500000,
        garage: [
            { id: 4, brand: 'Audi', model: 'Q7', license_plate: '30A-111.99' }
        ],
        last_visit: {
            date: '2024-02-15T00:00:00.000Z',
            service_type: 'Inspection',
            is_overdue: false
        }
    },
    {
        id: '64a1b2c3d4e5f60017a1b2c6',
        customer_code: 'CUS-1102',
        username: 'linhn',
        full_name: 'Lê Hoàng Linh',
        email: 'linh.n@gmail.com',
        avatar: 'https://i.pravatar.cc/150?u=4',
        phone: '091 234 5678',
        address: '99 Ngô Quyền, Sơn Trà, Đà Nẵng',
        role: { role_name: 'Customer' },
        authProvider: 'google',
        status: 'inactive',
        createdAt: '2024-02-10T16:20:05.000Z',
        tier: 'member',
        total_spent: 0,
        debt: 0,
        garage: [],
        last_visit: null
    }
];

export const MOCK_STATS = {
    total_customers: 24592,
    total_trend: 12.5,
    vip_customers: 1280,
    vip_trend: 4,
    retention_rate: 85,
    retention_trend: 0,
    new_this_week: 142,
    new_trend: -2
};

export const MOCK_PAGINATION = {
    total: 48,
    currentPage: 1,
    pageSize: 10,
};
