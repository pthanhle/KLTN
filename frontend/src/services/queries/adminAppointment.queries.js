import { useQuery, useMutation } from '@tanstack/react-query';
import { AdminAppointmentAPI } from '../api/adminAppointment.api';

export const useGetAppointmentsQuery = (params) => {
    return useQuery({
        queryKey: ['admin-appointments', params],
        queryFn: () => AdminAppointmentAPI.getAppointments(params),
        keepPreviousData: true
    });
};

export const useUpdateAppointmentMutation = () => {
    return useMutation({
        mutationFn: ({ id, payload }) => AdminAppointmentAPI.updateAppointment(id, payload)
    });
};
