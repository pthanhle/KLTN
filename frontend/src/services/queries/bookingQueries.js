import { useQuery, useMutation } from '@tanstack/react-query';
import { BookingAPI } from '../api/booking';
export const useGetTestDriveList = (options = {}) => {
    return useQuery({
        queryKey: ['testDriveList'],
        queryFn: () => BookingAPI.getTestDriveList(),
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

export const useGetTestDriveById = (id, options = {}) => {
    return useQuery({
        queryKey: ['testDrive', id],
        queryFn: () => BookingAPI.getTestDriveById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        ...options
    });
};

export const useSubmitTestDrive = () => {
    return useMutation({
        mutationFn: (payload) => BookingAPI.submitTestDrive(payload),
        onError: (error) => {
            console.error('[Mutation Error]:', error);
        }
    });
};

export const useCancelTestDrive = () => {
    return useMutation({
        mutationFn: (id) => BookingAPI.cancelTestDrive(id),
        onError: (error) => {
            console.error('[Mutation Cancel Error]:', error);
        }
    });
};

export const useSubmitServiceBooking = () => {
    return useMutation({
        mutationFn: (payload) => BookingAPI.submitServiceBooking(payload),
        onError: (error) => {
            console.error('[Mutation Submit Service Booking Error]:', error);
        }
    });
};
