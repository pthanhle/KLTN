import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminAppointmentAPI } from '../../../../../../services/api/adminAppointment.api';
import dayjs from 'dayjs';
import { message } from 'antd';

export const useInboxLogic = () => {
    const queryClient = useQueryClient();
    const [bookingToReject, setBookingToReject] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ['admin-appointments', { status: 'PENDING' }],
        queryFn: () => AdminAppointmentAPI.getAppointments({ status: 'PENDING' }),
        staleTime: 30 * 1000,
    });

    const bookings = useMemo(() => {
        const raw = data?.appointments || [];
        return raw.map(b => ({
            _id: b._id,
            booking_code: b.booking_code,
            created_at: b.createdAt,
            booking_date: b.booking_date,
            time_slot: b.time_slot,
            customer_name: b.user_id?.full_name || b.customer_info?.full_name || 'Khách hàng',
            customer_phone: b.customer_info?.contact_phone || b.user_id?.phone || '',
            is_vip: false,
            vehicle_brand: b.vehicle_info?.brand || '',
            vehicle_model: b.vehicle_info?.model || '',
            license_plate: b.vehicle_info?.license_plate || '',
            vehicle_condition: b.customer_note || '',
            service_type: b.service_type || null,
            selected_services: (b.services || []).map(s => ({ name: s.service_name })),
        }));
    }, [data]);

    const confirmMutation = useMutation({
        mutationFn: (id) => AdminAppointmentAPI.updateAppointment(id, { status: 'confirmed' }),
        onSuccess: () => {
            message.success('Đã xác nhận lịch hẹn!');
            queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
        },
        onError: () => message.error('Xác nhận thất bại. Vui lòng thử lại.'),
    });

    const rejectMutation = useMutation({
        mutationFn: (id) => AdminAppointmentAPI.updateAppointment(id, { status: 'cancelled' }),
        onSuccess: () => {
            message.success('Đã từ chối lịch hẹn!');
            queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
            setBookingToReject(null);
        },
        onError: () => message.error('Từ chối thất bại. Vui lòng thử lại.'),
    });

    const confirmBooking = (bookingId) => {
        confirmMutation.mutate(bookingId);
    };

    const confirmReject = (bookingId) => {
        setBookingToReject(bookingId);
    };

    const handleRejectConfirm = () => {
        if (!bookingToReject) return;
        rejectMutation.mutate(bookingToReject);
    };

    const handleRejectCancel = () => {
        setBookingToReject(null);
    };

    return {
        bookings,
        isLoading,
        confirmBooking,
        confirmReject,
        handleRejectConfirm,
        handleRejectCancel,
        bookingToReject
    };
};
