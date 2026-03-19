import { useQuery, useMutation } from '@tanstack/react-query';
import { BookingAPI } from '../api/booking';
// Query: Lấy toàn bộ danh sách Lái thử của người dùng
export const useGetTestDriveList = (options = {}) => {
    return useQuery({
        queryKey: ['testDriveList'],
        queryFn: () => BookingAPI.getTestDriveList(),
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

// Query: Fetch Data Lịch sử cho Dời lịch
export const useGetTestDriveById = (id, options = {}) => {
    return useQuery({
        queryKey: ['testDrive', id],
        queryFn: () => BookingAPI.getTestDriveById(id),
        enabled: !!id, // Chỉ đánh request API khi có param reschedule_id
        staleTime: 5 * 60 * 1000, 
        ...options
    });
};

// Mutation: Xử lý Gửi Form Data
export const useSubmitTestDrive = () => {
    return useMutation({
        mutationFn: (payload) => BookingAPI.submitTestDrive(payload),
        onError: (error) => {
            console.error('[Mutation Error]:', error);
        }
    });
};

// Mutation: Xử lý Lệnh Hủy Vé
export const useCancelTestDrive = () => {
    return useMutation({
        mutationFn: (id) => BookingAPI.cancelTestDrive(id),
        onError: (error) => {
            console.error('[Mutation Cancel Error]:', error);
        }
    });
};
