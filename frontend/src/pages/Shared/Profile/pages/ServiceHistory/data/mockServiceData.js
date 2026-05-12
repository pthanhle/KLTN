import { DUMMY_CARS } from '@/pages/Customer/Cars/data/cars.mock';

export const mockServices = [
    {
        booking_code: 'SRV-2026-B77P', // Test case: QUOTING
        user_id: 'USR-08912',
        service_type: 'MAINTENANCE',
        advisor_info: { id: 'ADV-001', name: 'Đỗ Tiến Đạt', phone: '0988.111.222', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
        mechanic_info: { id: 'MEC-005', name: 'Lê Văn Nam', level: 'Master Technician', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
        vehicle_info: {
            brand: 'Mercedes-Benz',
            model: 'S-Class S450 Luxury',
            license_plate: '30A-888.88',
            vin_number: 'WDD2221831A12345',
            current_odometer: 40150
        },
        services: [
            { service_id: 'SRV-001', service_name: 'Thay dầu động cơ & phanh', price: 0 }
        ],
        total_cost: 0,
        customer_note: 'Bảo dưỡng định kỳ.',
        attachments: {
            before: [
                'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop'
            ],
            after: []
        },
        rating: null,
        booking_date: '2026-05-20',
        time_slot: '09:00 - 11:30',
        booking_status: 'QUOTING', // <--- Trạng thái mấu chốt
        timeline: [
            { step: 'RECEIVED', key: 'step_received', status: 'COMPLETED', time: '2026-05-20T08:15:00Z', note: 'Tiếp nhận xe an toàn. Đã rửa vỏ ngoài.', images: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&q=80'] },
            { step: 'DIAGNOSING', key: 'step_diagnosing', status: 'COMPLETED', time: '2026-05-20T09:30:00Z', note: 'Phát hiện mòn má phanh gốm cường độ cao, mức nhớt thấp hơn tiêu chuẩn.', images: [] },
            { step: 'QUOTING', key: 'step_quoting', status: 'IN_PROGRESS', time: '2026-05-20T10:00:00Z', note: 'Đã lập báo giá. Đang đợi Khách hàng phê duyệt.', images: [] },
            { step: 'IN_PROGRESS', key: 'step_in_progress', status: 'PENDING', time: null, note: '', images: [] },
            { step: 'QC_TESTING', key: 'step_qc', status: 'PENDING', time: null, note: '', images: [] },
            { step: 'COMPLETED', key: 'step_completed', status: 'PENDING', time: null, note: '', images: [] }
        ]
    },
    {
        booking_code: 'SRV-2026-X99R', // Test case: COMPLETED
        user_id: 'USR-08912',
        service_type: 'CAR_SPA',
        advisor_info: { id: 'ADV-002', name: 'Nguyễn Thị Bích', phone: '0912.333.444', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
        mechanic_info: { id: 'MEC-012', name: 'Trần Mạnh Hùng', level: 'Senior Detailer', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
        vehicle_info: {
            brand: DUMMY_CARS[8].brandName,
            model: DUMMY_CARS[8].name,
            license_plate: '30G-999.99',
            vin_number: 'WP0ZZZ99ZLS12345',
            current_odometer: 2100
        },
        services: [
            { service_id: 'SRV-P01', service_name: 'Phủ Ceramic toàn xe', price: 15000000 }
        ],
        total_cost: 15000000,
        customer_note: 'Phủ bóng cao cấp',
        attachments: {
            before: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop'],
            after: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop']
        },
        rating: 5,
        booking_date: '2026-06-15',
        time_slot: '14:00 - 16:00',
        booking_status: 'COMPLETED', // <--- Trạng thái mấu chốt
        timeline: [
            { step: 'RECEIVED', key: 'step_received', status: 'COMPLETED', time: '2026-06-15T13:45:00Z', note: 'Tiếp nhận xe', images: [] },
            { step: 'DIAGNOSING', key: 'step_diagnosing', status: 'COMPLETED', time: '2026-06-15T14:00:00Z', note: 'Đo độ dày sơn. Phù hợp phủ 2 lớp Ceramic.', images: [] },
            { step: 'QUOTING', key: 'step_quoting', status: 'COMPLETED', time: '2026-06-15T14:15:00Z', note: 'Khách hàng chốt gói Diamond.', images: [] },
            { step: 'IN_PROGRESS', key: 'step_in_progress', status: 'COMPLETED', time: '2026-06-15T15:00:00Z', note: 'Đang đánh bóng và phủ màng bảo vệ', images: ['https://images.unsplash.com/photo-1620883395726-10b27e4368dd?w=400&q=80'] },
            { step: 'QC_TESTING', key: 'step_qc', status: 'COMPLETED', time: '2026-06-15T17:00:00Z', note: 'Test bề mặt bằng công nghệ hồng ngoại. Đạt chuẩn 9H.', images: [] },
            { step: 'COMPLETED', key: 'step_completed', status: 'COMPLETED', time: '2026-06-15T17:30:00Z', note: 'Rửa vệ sinh khoang máy và Bàn giao khách.', images: [] }
        ]
    },
    {
        booking_code: 'SRV-2026-W33', // Đã duyệt, Đang thi công
        user_id: 'USR-08913',
        service_type: 'REPAIR',
        advisor_info: { id: 'ADV-001', name: 'Đỗ Tiến Đạt', phone: '0988.111.222', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
        mechanic_info: { id: 'MEC-005', name: 'Lê Văn Nam', level: 'Master Technician', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
        vehicle_info: { brand: 'Hyundai', model: 'Santafe', license_plate: '61A-123.45', current_odometer: 60000 },
        booking_status: 'IN_PROGRESS'
    },
    {
        booking_code: 'SRV-2026-W11', // Chờ khách duyệt
        user_id: 'USR-08914',
        service_type: 'REPAIR',
        advisor_info: { id: 'ADV-002', name: 'Nguyễn Thị Bích', phone: '0912.333.444', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
        mechanic_info: { id: 'MEC-012', name: 'Trần Mạnh Hùng', level: 'Senior Detailer', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d' },
        vehicle_info: { brand: 'Mercedes-Benz', model: 'GLC 300', license_plate: '51F-888.88', current_odometer: 32000 },
        booking_status: 'QUOTING'
    },
    {
        booking_code: 'SRV-2026-R22', // Cố vấn đang kiểm tra
        user_id: 'USR-08915',
        service_type: 'MAINTENANCE',
        advisor_info: { id: 'ADV-003', name: 'Trần Văn C', phone: '0912.444.555', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026703d' },
        mechanic_info: { id: 'MEC-013', name: 'Võ Minh D', level: 'Technician', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026702d' },
        vehicle_info: { brand: 'Ford', model: 'Everest', license_plate: '60C-555.55', current_odometer: 15000 },
        booking_status: 'DIAGNOSING'
    },
    {
        booking_code: 'SRV-2026-X11A',
        user_id: 'USR-08916',
        service_type: 'REPAIR',
        advisor_info: null,
        mechanic_info: null,
        vehicle_info: { brand: 'Mazda', model: 'CX-5', license_plate: '30H-123.45', current_odometer: 45000 },
        booking_status: 'PENDING'
    },
    {
        booking_code: 'SRV-2026-Y22B',
        user_id: 'USR-08917',
        service_type: 'MAINTENANCE',
        advisor_info: null,
        mechanic_info: null,
        vehicle_info: { brand: 'Toyota', model: 'Camry', license_plate: '51K-999.99', current_odometer: 20000 },
        booking_status: 'PENDING'
    },
    {
        booking_code: 'SRV-2026-Z33C',
        user_id: 'USR-08918',
        service_type: 'REPAIR',
        advisor_info: null,
        mechanic_info: null,
        vehicle_info: { brand: 'Ford', model: 'Ranger', license_plate: '60A-456.78', current_odometer: 85000 },
        booking_status: 'PENDING'
    },
    {
        booking_code: 'SRV-2026-R11',
        user_id: 'USR-08919',
        service_type: 'REPAIR',
        advisor_info: null,
        mechanic_info: null,
        vehicle_info: { brand: 'Honda', model: 'CR-V', license_plate: '51G-123.99', current_odometer: 120000 },
        booking_status: 'PENDING'
    },
    {
        booking_code: 'SRV-2026-W22',
        user_id: 'USR-08920',
        service_type: 'REPAIR',
        advisor_info: { id: 'ADV-001', name: 'Đỗ Tiến Đạt', phone: '0988.111.222', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
        mechanic_info: null,
        vehicle_info: { brand: 'BMW', model: 'X5', license_plate: '30A-999.99', current_odometer: 70000 },
        booking_status: 'RO_CREATED'
    }
];
