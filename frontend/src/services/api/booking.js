import { mockTestDrives } from '../../pages/Shared/Profile/pages/TestDriveHistory/data/testDriveHistory.mock';

/**
 * Thư mục API Tập trung (Centralized Services Architect)
 * Nơi chứa toàn bộ khai báo Endpoint và Call Server cho phần Booking
 */
export const BookingAPI = {
    // API GET - Lấy danh sách lịch hẹn của User hiện tại (Mock)
    getTestDriveList: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return mockTestDrives;
    },

    // API GET - Lấy thông tin lịch sử từ ID URL
    getTestDriveById: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 800)); // Giả lập ping mạng
        const drive = mockTestDrives.find(d => d.booking_code === id);
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
