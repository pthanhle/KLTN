import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '../api/testDriveBookingAdmin.api';

export const useAdminBookings = (filters) => {
    return useQuery({
        queryKey: ['adminBookings', filters],
        queryFn: () => bookingApi.fetchBookings(filters)
    });
};

export const useAdminSalesStaff = () => {
    return useQuery({
        queryKey: ['adminSalesStaff'],
        queryFn: () => bookingApi.fetchSalesStaff()
    });
};

export const useAssignBookingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ bookingId, staffId, priority, note }) => bookingApi.assignBookingToStaff(bookingId, staffId, priority, note),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminBookings']);
            queryClient.invalidateQueries(['adminSalesStaff']);
        }
    });
};

export const useCreateTestDriveBookingMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => bookingApi.createBooking(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminBookings'] });
            queryClient.invalidateQueries({ queryKey: ['adminSalesStaff'] });
        },
    });
};
