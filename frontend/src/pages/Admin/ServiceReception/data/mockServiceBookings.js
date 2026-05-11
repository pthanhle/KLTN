import { mockServices } from '../../../Shared/Profile/pages/ServiceHistory/data/mockServiceData';
import { mockStaffData } from '../../Staff/data/mockStaffData';
import { MOCK_CUSTOMERS } from '../../Customers/data/customers.mock';

const mappedServices = mockServices.map((service, index) => {
    const statuses = ['PENDING', 'CONFIRMED', 'ASSIGNED_TO_SA', 'RO_CREATED', 'IN_PROGRESS'];
    const status = statuses[index % statuses.length];

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
        selected_services: service.services.map(s => s.service_name),
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

export const MOCK_SERVICE_BOOKINGS = [...mappedServices, ...EXTRA_BOOKINGS];
