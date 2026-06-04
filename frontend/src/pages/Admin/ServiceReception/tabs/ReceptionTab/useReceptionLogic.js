import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminAppointmentAPI } from '../../../../../services/api/adminAppointment.api';
import { AdminStaffAPI } from '../../../../../services/api/adminStaff.api';
import { message } from 'antd';

export const useReceptionLogic = (selectedDate) => {
    const queryClient = useQueryClient();
    const [activeId, setActiveId] = useState(null);
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState(null);
    const [bookingToMarkNoShow, setBookingToMarkNoShow] = useState(null);

    const dateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;

    const { data, isLoading } = useQuery({
        queryKey: ['admin-appointments', { status: 'CONFIRMED,RECEIVED' }],
        queryFn: () => AdminAppointmentAPI.getAppointments({
            status: 'CONFIRMED,RECEIVED',
            limit: 50,
        }),
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
            selected_services: (b.services || []).map(s => ({ name: s.service_name })),
            status: b.booking_status,
            // Normalize advisor_id to string whether it's a populated object or raw ID
            advisor_id: b.advisor_id ? (b.advisor_id._id || b.advisor_id).toString() : null,
        }));
    }, [data]);

    const { data: staffData } = useQuery({
        queryKey: ['admin-staff-advisors'],
        queryFn: () => AdminStaffAPI.getStaff({ limit: 100 }),
        staleTime: 60 * 1000,
    });

    const advisors = useMemo(() => {
        const allStaff = staffData?.staff || [];
        return allStaff
            .filter(s => s.role_id?.role_name === 'advisor' && s.status === 'active')
            .map(s => ({
                _id: s._id.toString(),
                // Use fullName & avatarUrl to match what AdvisorColumn expects
                fullName: s.full_name,
                avatarUrl: s.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.full_name)}&background=random`,
                role: 'advisor',
                status: 'Sẵn sàng',
                workload: 0,
            }));
    }, [staffData]);

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);
    };

    const QUERY_KEY = ['admin-appointments', { status: 'CONFIRMED,RECEIVED' }];

    const handleDragEnd = useCallback(async (event) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;

        const bookingId = active.id;
        const advisorId = over.id.toString();

        const booking = bookings.find(b => b._id === bookingId);
        if (!booking || booking.advisor_id === advisorId) return;

        queryClient.setQueryData(QUERY_KEY, (old) => {
            if (!old) return old;
            const updated = (old.appointments || []).map(b =>
                b._id === bookingId ? { ...b, advisor_id: advisorId } : b
            );
            return { ...old, appointments: updated };
        });

        try {
            await AdminAppointmentAPI.updateAppointment(bookingId, {
                advisor_id: advisorId,
                status: 'RECEIVED'
            });
            message.success('Đã điều phối đơn thành công!');
            queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
        } catch (error) {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            message.error('Lỗi khi điều phối đơn: ' + (error.response?.data?.message || error.message));
        }
    }, [bookings, queryClient]);

    const unassignedBookings = bookings.filter(b => !b.advisor_id);
    const activeBooking = activeId ? bookings.find(b => b._id === activeId) : null;

    const noShowMutation = useMutation({
        mutationFn: (id) => AdminAppointmentAPI.updateAppointment(id, { status: 'cancelled', note: 'Khách không đến' }),
        onSuccess: () => {
            message.success('Đã đánh dấu khách vắng mặt!');
            queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
            setBookingToMarkNoShow(null);
        },
        onError: () => message.error('Cập nhật thất bại.'),
    });

    const confirmNoShow = (bookingId) => {
        setBookingToMarkNoShow(bookingId);
    };

    const handleNoShowConfirm = () => {
        if (!bookingToMarkNoShow) return;
        noShowMutation.mutate(bookingToMarkNoShow);
    };

    const handleNoShowCancel = () => {
        setBookingToMarkNoShow(null);
    };

    const handleRescheduleClick = (booking) => {
        setSelectedBookingForReschedule(booking);
        setIsRescheduleModalOpen(true);
    };

    const rescheduleBooking = async (bookingId, newTime, newDate) => {
        try {
            setIsRescheduleModalOpen(false);
            setSelectedBookingForReschedule(null);
        } catch (error) {
            console.error('Failed to reschedule booking:', error);
        }
    };

    return {
        bookings,
        advisors,
        isLoading,
        handleDragStart,
        handleDragEnd,
        unassignedBookings,
        activeBooking,
        confirmNoShow,
        handleNoShowConfirm,
        handleNoShowCancel,
        bookingToMarkNoShow,
        rescheduleBooking,
        handleRescheduleClick,
        isRescheduleModalOpen,
        setIsRescheduleModalOpen,
        selectedBookingForReschedule
    };
};
