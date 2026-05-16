import { GLOBAL_TEST_DRIVES } from '../mock/globalTestDrive.mock';

export const BookingAPI = {
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

    submitTestDrive: async (payload) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('[API Global Service] => Đã gửi Request:', payload);

        return {
            status: 200,
            success: true,
            data: payload
        };
    },

    cancelTestDrive: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log('[API Global Service] => Đã gửi lệnh Hủy vé ID:', id);
        return {
            status: 200,
            success: true
        };
    }
};
