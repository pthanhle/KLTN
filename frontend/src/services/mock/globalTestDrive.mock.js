import { MOCK_PROFILE_CUSTOMER } from '../../pages/Shared/Profile/data/profile.mock';
import dayjs from 'dayjs';
import { mockStaffData as MOCK_STAFF_DATA } from '../../pages/Admin/Staff/data/mockStaffData';
import { MOCK_CUSTOMERS } from '../../pages/Admin/Customers/data/customers.mock';

export const GLOBAL_TEST_DRIVES = [
    // ------------------------------------------
    // USER CURRENT LOGGED IN (MOCK_PROFILE_CUSTOMER)
    // ------------------------------------------
    {
        _id: "TD-987654",
        fullName: MOCK_PROFILE_CUSTOMER.full_name,
        phoneNumber: MOCK_PROFILE_CUSTOMER.phone,
        bookingType: "showroom",
        showroomBranch: "1", // Map với id của SHOWROOM_BRANCHES
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: dayjs().format("DD/MM/YYYY"),
        selectedTimeSlot: "14:00 - 15:00",
        hasDriverLicense: true,
        note: "Vui lòng chuẩn bị xe rửa sạch. Tôi muốn test kỹ hệ thống MBUX.",
        status: "Confirmed",
        targetCarSku: "CAR-001",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[3]._id,
            name: MOCK_STAFF_DATA[3].fullName,
            avatar: MOCK_STAFF_DATA[3].avatarUrl
        },
        createdAt: "2026-10-20T10:00:00Z"
    },
    {
        _id: "TD-987702",
        fullName: MOCK_PROFILE_CUSTOMER.full_name,
        phoneNumber: MOCK_PROFILE_CUSTOMER.phone,
        bookingType: "home",
        showroomBranch: "",
        city: "Thành phố Hồ Chí Minh",
        district: "Quận 3",
        ward: "Phường Võ Thị Sáu",
        addressDetail: "123 Đường Nam Kỳ Khởi Nghĩa",
        selectedDate: "28/10/2026",
        selectedTimeSlot: "10:00 - 11:30",
        hasDriverLicense: true,
        note: "Trời mưa nên nhớ mang theo ô (dù) xe giúp em nhé.",
        status: "Pending",
        targetCarSku: "CAR-008",
        assignedStaff: null,
        requestedStaff: [
            {
                _id: MOCK_STAFF_DATA[3]._id,
                fullName: MOCK_STAFF_DATA[3].fullName,
                avatarUrl: MOCK_STAFF_DATA[3].avatarUrl
            },
            {
                _id: MOCK_STAFF_DATA[4]._id,
                fullName: MOCK_STAFF_DATA[4].fullName,
                avatarUrl: MOCK_STAFF_DATA[4].avatarUrl
            }
        ],
        createdAt: "2026-10-22T09:30:00Z"
    },
    {
        _id: "TD-987711",
        fullName: MOCK_PROFILE_CUSTOMER.full_name,
        phoneNumber: MOCK_PROFILE_CUSTOMER.phone,
        bookingType: "showroom",
        showroomBranch: "1",
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: "15/09/2026",
        selectedTimeSlot: "08:00 - 09:00",
        hasDriverLicense: true,
        note: "",
        status: "Completed",
        targetCarSku: "CAR-002",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[4]._id,
            name: MOCK_STAFF_DATA[4].fullName,
            avatar: MOCK_STAFF_DATA[4].avatarUrl
        },
        createdAt: "2026-09-10T14:20:00Z"
    },

    // ------------------------------------------
    // OTHER CUSTOMERS (For Admin Dashboard & Dispatch)
    // ------------------------------------------
    {
        _id: "TD-987703",
        fullName: MOCK_CUSTOMERS[0].full_name,
        phoneNumber: MOCK_CUSTOMERS[0].phone,
        bookingType: "waitlist",
        showroomBranch: "2", // Cầu Giấy, Hà Nội
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: "05/11/2026",
        selectedTimeSlot: "16:00 - 17:30",
        hasDriverLicense: true,
        note: "Chờ mẫu Macan mới nhất ra mắt. Khi nào có xe gọi liền.",
        status: "Pending",
        targetCarSku: "CAR-003",
        assignedStaff: null,
        requestedStaff: [
            {
                _id: MOCK_STAFF_DATA[3]._id,
                fullName: MOCK_STAFF_DATA[3].fullName,
                avatarUrl: MOCK_STAFF_DATA[3].avatarUrl
            }
        ],
        createdAt: "2026-10-25T14:20:00Z"
    },
    {
        _id: "TD-987704",
        fullName: MOCK_CUSTOMERS[1].full_name,
        phoneNumber: MOCK_CUSTOMERS[1].phone,
        bookingType: "showroom",
        showroomBranch: "1",
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: "24/10/2026",
        selectedTimeSlot: "08:00 - 09:00",
        hasDriverLicense: true,
        note: "Tôi đi cùng gia đình, cần xem xe 7 chỗ.",
        status: "InProgress",
        targetCarSku: "CAR-005",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[3]._id,
            name: MOCK_STAFF_DATA[3].fullName,
            avatar: MOCK_STAFF_DATA[3].avatarUrl
        },
        createdAt: "2026-10-24T07:45:00Z"
    },
    {
        _id: "TD-987705",
        fullName: MOCK_CUSTOMERS[2].full_name,
        phoneNumber: MOCK_CUSTOMERS[2].phone,
        bookingType: "home",
        showroomBranch: "",
        city: "Thành phố Hồ Chí Minh",
        district: "Quận 7",
        ward: "Phường Tân Phong",
        addressDetail: "Khu biệt thự Phú Mỹ Hưng, Đường số N",
        selectedDate: "02/11/2026",
        selectedTimeSlot: "14:00 - 15:00",
        hasDriverLicense: true,
        note: "Vui lòng gọi trước khi tới 30 phút. Bảo vệ khu vực hơi khó tính.",
        status: "Pending",
        targetCarSku: "CAR-006",
        assignedStaff: null,
        createdAt: "2026-10-28T08:15:00Z"
    },
    {
        _id: "TD-987706",
        fullName: MOCK_CUSTOMERS[3].full_name,
        phoneNumber: MOCK_CUSTOMERS[3].phone,
        bookingType: "showroom",
        showroomBranch: "3",
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: "26/10/2026",
        selectedTimeSlot: "10:00 - 11:30",
        hasDriverLicense: true,
        note: "Muốn lái thử đường cao tốc để test khả năng cách âm.",
        status: "Confirmed",
        targetCarSku: "CAR-009",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[3]._id,
            name: MOCK_STAFF_DATA[3].fullName,
            avatar: MOCK_STAFF_DATA[3].avatarUrl
        },
        createdAt: "2026-10-21T11:20:00Z"
    },
    {
        _id: "TD-987707",
        fullName: MOCK_CUSTOMERS[0].full_name,
        phoneNumber: MOCK_CUSTOMERS[0].phone,
        bookingType: "home",
        showroomBranch: "",
        city: "Hà Nội",
        district: "Quận Hoàn Kiếm",
        ward: "Phường Tràng Tiền",
        addressDetail: "Tòa nhà Sentinel Place",
        selectedDate: "27/10/2026",
        selectedTimeSlot: "16:00 - 17:30",
        hasDriverLicense: false,
        note: "Tài xế của tôi sẽ lái thử, tôi ngồi ghế phụ trải nghiệm.",
        status: "Cancelled",
        targetCarSku: "CAR-007",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[4]._id,
            name: MOCK_STAFF_DATA[4].fullName,
            avatar: MOCK_STAFF_DATA[4].avatarUrl
        },
        createdAt: "2026-10-20T15:00:00Z"
    },
    {
        _id: "TD-987708",
        fullName: MOCK_CUSTOMERS[1].full_name,
        phoneNumber: MOCK_CUSTOMERS[1].phone,
        bookingType: "showroom",
        showroomBranch: "1",
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: "28/10/2026",
        selectedTimeSlot: "08:00 - 09:00",
        hasDriverLicense: true,
        note: "Cần tư vấn thêm về gói bảo hiểm và vay trả góp ngân hàng VIB.",
        status: "Confirmed",
        targetCarSku: "CAR-004",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[4]._id,
            name: MOCK_STAFF_DATA[4].fullName,
            avatar: MOCK_STAFF_DATA[4].avatarUrl
        },
        createdAt: "2026-10-23T09:10:00Z"
    },
    {
        _id: "TD-987709",
        fullName: MOCK_CUSTOMERS[2].full_name,
        phoneNumber: MOCK_CUSTOMERS[2].phone,
        bookingType: "home",
        showroomBranch: "",
        city: "Thành phố Hồ Chí Minh",
        district: "Thành phố Thủ Đức",
        ward: "Phường Thảo Điền",
        addressDetail: "Khu dân cư cao cấp Thảo Điền Pearl",
        selectedDate: "25/10/2026",
        selectedTimeSlot: "14:00 - 15:00",
        hasDriverLicense: true,
        note: "Mang theo hợp đồng mẫu để tôi xem trước.",
        status: "Completed",
        targetCarSku: "CAR-002",
        assignedStaff: {
            _id: MOCK_STAFF_DATA[3]._id,
            name: MOCK_STAFF_DATA[3].fullName,
            avatar: MOCK_STAFF_DATA[3].avatarUrl
        },
        createdAt: "2026-10-24T14:00:00Z"
    },
    {
        _id: "TD-987710",
        fullName: MOCK_CUSTOMERS[3].full_name,
        phoneNumber: MOCK_CUSTOMERS[3].phone,
        bookingType: "waitlist",
        showroomBranch: "1",
        city: undefined,
        district: undefined,
        ward: undefined,
        addressDetail: "",
        selectedDate: "10/11/2026",
        selectedTimeSlot: "10:00 - 11:30",
        hasDriverLicense: true,
        note: "Mong muốn lái bản màu Đỏ, nội thất Be. Nếu không có thì bản Đen cũng được.",
        status: "Pending",
        targetCarSku: "CAR-008",
        assignedStaff: null,
        requestedStaff: [
            {
                _id: MOCK_STAFF_DATA[3]._id,
                fullName: MOCK_STAFF_DATA[3].fullName,
                avatarUrl: MOCK_STAFF_DATA[3].avatarUrl
            },
            {
                _id: MOCK_STAFF_DATA[4]._id,
                fullName: MOCK_STAFF_DATA[4].fullName,
                avatarUrl: MOCK_STAFF_DATA[4].avatarUrl
            }
        ],
        createdAt: "2026-10-26T10:30:00Z"
    }
];
