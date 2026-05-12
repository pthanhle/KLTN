import { mockServices } from '../../../Shared/Profile/pages/ServiceHistory/data/mockServiceData';
import { mockStaffData } from '../../Staff/data/mockStaffData';
import { MOCK_CUSTOMERS } from '../../Customers/data/customers.mock';

const mappedServices = mockServices.map((service, index) => {
    const status = service.booking_status || 'PENDING';

    let mappedAdvisorId = null;
    let bay_id = null;
    let primary_technician = null;

    const saList = mockStaffData.filter(staff => staff.role === 'SERVICE_ADVISOR' || staff.role === 'SALES_ADVISOR');
    const techList = mockStaffData.filter(staff => staff.role === 'TECHNICIAN' || staff.role === 'LEAD_TECHNICIAN');

    if (status === 'ASSIGNED_TO_SA' || status === 'RO_CREATED' || status === 'IN_PROGRESS') {
        mappedAdvisorId = saList.length > 0 ? saList[index % saList.length]._id : null;
    }

    if (status === 'IN_PROGRESS') {
        bay_id = (index % 2 === 0) ? 'bay_01' : 'bay_02';
        primary_technician = techList.length > 0 ? techList[index % techList.length]._id : null;
    }

    const customerName = MOCK_CUSTOMERS[index % MOCK_CUSTOMERS.length]?.full_name || `Khách hàng ${service.user_id.split('-')[1]}`;
    const customerPhone = MOCK_CUSTOMERS[index % MOCK_CUSTOMERS.length]?.phone_number || '0988123456';

    return {
        _id: service.booking_code,
        booking_code: service.booking_code,
        customer_name: customerName,
        customer_phone: customerPhone,
        vehicle_brand: service.vehicle_info.brand,
        vehicle_model: service.vehicle_info.model,
        license_plate: service.vehicle_info.license_plate,
        vehicle_condition: service.customer_note,
        selected_services: service.services?.map(s => s.service_name) || [],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: service.time_slot,
        status: status,
        created_at: new Date(Date.now() - (index + 1) * 45 * 60000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: mappedAdvisorId,
        bay_id: bay_id,
        primary_technician: primary_technician,
        assistant_technicians: [],
        is_vip: index % 2 === 0
    };
});

const EXTRA_BOOKINGS = [
    {
        _id: 'SRV-2026-X11A',
        booking_code: 'SRV-2026-X11A',
        license_plate: '30H-123.45',
        customer_name: 'Trần Văn A',
        customer_phone: '0988000111',
        vehicle_brand: 'Mazda',
        vehicle_model: 'CX-5',
        vehicle_condition: 'Khách yêu cầu sơn dặm và đánh bóng toàn xe',
        selected_services: ['Sơn dặm cản trước', 'Đánh bóng'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '08:00 - 10:00',
        status: 'PENDING',
        created_at: '2026-05-11T07:30:00Z',
        sms_status: 'SENT',
        zalo_status: 'PENDING',
        advisor_id: null,
        primary_technician: null,
        assistant_technicians: [],
        is_vip: false
    },
    {
        _id: 'SRV-2026-Y22B',
        booking_code: 'SRV-2026-Y22B',
        license_plate: '51K-999.99',
        customer_name: 'Lê Thị B',
        customer_phone: '0912333444',
        vehicle_brand: 'Toyota',
        vehicle_model: 'Camry',
        vehicle_condition: 'Bảo dưỡng định kỳ mốc 4 vạn km',
        selected_services: ['Bảo dưỡng mốc 40v', 'Thay dầu'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '13:00 - 15:30',
        status: 'PENDING',
        created_at: '2026-05-11T12:00:00Z',
        sms_status: 'FAILED',
        zalo_status: 'PENDING',
        advisor_id: null,
        primary_technician: null,
        assistant_technicians: [],
        is_vip: true,
        preferred_technician: '60d5ecb8b392d700153528a6'
    },
    {
        _id: 'SRV-2026-Z33C',
        booking_code: 'SRV-2026-Z33C',
        license_plate: '60A-456.78',
        customer_name: 'Phạm Văn C',
        customer_phone: '0909555666',
        vehicle_brand: 'Ford',
        vehicle_model: 'Ranger',
        vehicle_condition: 'Xe bị nhao lái, cần cân chỉnh lại thước lái và thay lốp',
        selected_services: ['Cân chỉnh thước lái', 'Thay 2 lốp trước'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '10:00 - 11:00',
        status: 'PENDING',
        created_at: '2026-05-11T09:15:00Z',
        sms_status: 'PENDING',
        zalo_status: 'PENDING',
        advisor_id: null,
        primary_technician: null,
        assistant_technicians: [],
        is_vip: false
    }
];

const EXTRA_RECEPTION_BOOKINGS = [
    {
        _id: 'SRV-2026-R11',
        booking_code: 'SRV-2026-R11',
        license_plate: '51G-123.99',
        customer_name: 'Hoàng Thái H',
        customer_phone: '0901234567',
        vehicle_brand: 'Honda',
        vehicle_model: 'CR-V',
        vehicle_condition: 'Tiếng kêu lạ ở gầm xe khi qua gờ giảm tốc',
        selected_services: ['Kiểm tra gầm', 'Bảo dưỡng gầm'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '08:30 - 10:30',
        status: 'CONFIRMED',
        created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: null,
        primary_technician: null,
        assistant_technicians: [],
        is_vip: false
    },
    {
        _id: 'SRV-2026-R22',
        booking_code: 'SRV-2026-R22',
        license_plate: '60C-555.55',
        customer_name: 'Nguyễn Văn Đạt',
        customer_phone: '0988777666',
        vehicle_brand: 'Ford',
        vehicle_model: 'Everest',
        vehicle_condition: 'Đến lịch bảo dưỡng 10,000km',
        selected_services: ['Bảo dưỡng 10v', 'Thay nhớt'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '09:00 - 11:00',
        status: 'ASSIGNED_TO_SA',
        created_at: new Date(Date.now() - 3 * 3600000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: 'sa_01', // Giả lập đã gán cho SA
        primary_technician: null,
        assistant_technicians: [],
        is_vip: true
    }
];

const EXTRA_WORKSHOP_BOOKINGS = [
    // --- Lệnh Sửa Chữa Đã Lập (Chờ phân khoang) - Xuất hiện ở Left Pane Tab 3 ---
    {
        _id: 'SRV-2026-W11',
        booking_code: 'SRV-2026-W11',
        license_plate: '51F-888.88',
        customer_name: 'Lý Nhã K',
        customer_phone: '0933444555',
        vehicle_brand: 'Mercedes-Benz',
        vehicle_model: 'GLC 300',
        vehicle_condition: 'Khách báo xe báo lỗi động cơ (Check engine)',
        selected_services: ['Scan lỗi máy', 'Thay bugi'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '08:00 - 11:00',
        status: 'RO_CREATED',
        created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: 'sa_02',
        bay_id: null,
        primary_technician: null,
        assistant_technicians: [],
        is_vip: true
    },
    {
        _id: 'SRV-2026-W22',
        booking_code: 'SRV-2026-W22',
        license_plate: '30A-999.99',
        customer_name: 'Bùi Anh T',
        customer_phone: '0911222333',
        vehicle_brand: 'BMW',
        vehicle_model: 'X5',
        vehicle_condition: 'Sơn lại dặm xước cản sau',
        selected_services: ['Sơn cản sau', 'Phủ Ceramic'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '09:30 - 14:00',
        status: 'RO_CREATED',
        created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: 'sa_01',
        bay_id: null,
        primary_technician: null,
        assistant_technicians: [],
        is_vip: false
    },
    // --- Đang Thi Công (Đã phân khoang) - Xuất hiện trên Gantt Chart Tab 3 ---
    {
        _id: 'SRV-2026-W33',
        booking_code: 'SRV-2026-W33',
        license_plate: '61A-123.45',
        customer_name: 'Vũ Minh C',
        customer_phone: '0944555666',
        vehicle_brand: 'Hyundai',
        vehicle_model: 'Santafe',
        vehicle_condition: 'Thay lốp và cân mâm',
        selected_services: ['Thay 4 lốp', 'Cân bằng động', 'Cân chỉnh thước lái'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '08:00 - 10:00',
        status: 'IN_PROGRESS',
        created_at: new Date(Date.now() - 6 * 3600000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: 'sa_03',
        bay_id: 'bay_01', // Nằm ở khoang số 1
        primary_technician: 'tech_01',
        assistant_technicians: [],
        is_vip: false
    },
    {
        _id: 'SRV-2026-W44',
        booking_code: 'SRV-2026-W44',
        license_plate: '51C-678.90',
        customer_name: 'Công ty TNHH Vận Tải',
        customer_phone: '0909999888',
        vehicle_brand: 'Toyota',
        vehicle_model: 'Fortuner',
        vehicle_condition: 'Bảo dưỡng lớn 8 vạn km',
        selected_services: ['Bảo dưỡng toàn diện', 'Thay nhớt hộp số', 'Thay cua roa'],
        booking_date: new Date().toISOString().split('T')[0],
        time_slot: '09:00 - 16:00', // Kéo dài nhiều giờ
        status: 'IN_PROGRESS',
        created_at: new Date(Date.now() - 7 * 3600000).toISOString(),
        sms_status: 'SENT',
        zalo_status: 'SENT',
        advisor_id: 'sa_02',
        bay_id: 'bay_03', // Nằm ở khoang số 3
        primary_technician: 'tech_02',
        assistant_technicians: ['tech_03'],
        is_vip: true
    }
];

const allBookings = [...mappedServices, ...EXTRA_BOOKINGS, ...EXTRA_RECEPTION_BOOKINGS, ...EXTRA_WORKSHOP_BOOKINGS];
export const MOCK_SERVICE_BOOKINGS = Array.from(new Map(allBookings.map(b => [b.booking_code, b])).values());
