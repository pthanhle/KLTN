import { GLOBAL_TEST_DRIVES } from '../mock/globalTestDrive.mock';

/**
 * Thư mục API Tập trung (Centralized Services Architect)
 * Nơi chứa toàn bộ khai báo Endpoint và Call Server cho phần Booking
 */
export const BookingAPI = {
    // API GET - Lấy danh sách lịch hẹn của User hiện tại (Mock)
    getTestDriveList: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return GLOBAL_TEST_DRIVES;
    },

    getTestDriveById: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const drive = GLOBAL_TEST_DRIVES.find(d => d._id === id);
        if (!drive) throw new Error('Booking not found');
        return drive;
    },

    // API POST - Gửi đơn đăng ký / Cập nhật
    submitTestDrive: async (payload) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('[API Global Service] => Đã gửi Request:', payload);

        return {
            status: 200,
            success: true,
            data: payload
        };
    },

    // API PUT/DELETE - Hủy đơn đặt lái thử
    cancelTestDrive: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log('[API Global Service] => Đã gửi lệnh Hủy vé ID:', id);
        return {
            status: 200,
            success: true
        };
    }
};
