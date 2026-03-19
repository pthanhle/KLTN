import { DUMMY_CARS } from '../../../../../Customer/Cars/data/cars.mock';
import { MOCK_PROFILE_CUSTOMER } from '../../../data/profile.mock';

export const mockTestDrives = [
    {
        booking_code: "TD-987654",
        vehicle_info: {
            name: DUMMY_CARS[0].name,
            image: DUMMY_CARS[0].image
        },
        booking_status: 2, // 1: Waiting, 2: Confirmed, 3: In Progress, 4: Completed, 5: Cancelled
        status_text: "Đã chốt lịch",
        booking_date: "2026-10-24",
        time_slot: "14:00 - 15:00",
        test_drive_type: "showroom",
        delivery_address: "Showroom Elite Quận 7",
        customer_note: "Vui lòng chuẩn bị xe rửa sạch. Tôi muốn test kỹ hệ thống MBUX.",
        advisor_name: "Alex Tran",
        customer_info: {
            full_name: MOCK_PROFILE_CUSTOMER.full_name,
            contact_phone: MOCK_PROFILE_CUSTOMER.phone
        }
    },
    {
        booking_code: "TD-987702",
        vehicle_info: {
            name: DUMMY_CARS[7].name, // Audi Q8
            image: DUMMY_CARS[7].image
        },
        booking_status: 1, 
        status_text: "Chờ xác nhận",
        booking_date: "2026-10-28",
        time_slot: "10:00 - 11:30",
        test_drive_type: "home",
        delivery_address: "123 Đường Nam Kỳ Khởi Nghĩa, Quận 3",
        customer_note: "Trời mưa nên nhớ mang theo ô (dù) xe giúp em nhé.",
        advisor_name: null,
        customer_info: {
            full_name: MOCK_PROFILE_CUSTOMER.full_name,
            contact_phone: MOCK_PROFILE_CUSTOMER.phone
        }
    }
];
