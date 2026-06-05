import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { AdminRepairAPI } from '../../../../../../services/api/adminRepair.api';
import { mockBays } from '../../../data/mockBays';
import { mockStaffData } from '../../../../Staff/data/mockStaffData';

const mapProgressToBooking = (p) => {
    const booking = p.booking_id || {};
    const vehicle = booking.vehicle_info || {};
    const customer = booking.user_id || {};
    const mechanic = p.mechanic_id;

    const selectedServices = (booking.services || []).length > 0
        ? booking.services.map(s => ({ _id: s.service_id || 'svc', name: s.service_name || 'Dịch vụ' }))
        : [{ _id: 'svc', name: booking.service_type || 'Dịch vụ' }];

    let timeSlot = '';
    if (p.expected_start_datetime && p.expected_end_datetime) {
        const start = new Date(p.expected_start_datetime);
        const end = new Date(p.expected_end_datetime);
        timeSlot = `${start.toTimeString().slice(0, 5)} - ${end.toTimeString().slice(0, 5)}`;
    }

    return {
        _id: p._id,
        progress_id: p._id,
        booking_code: booking.booking_code || '',
        customer_name: customer.full_name || booking.customer_info?.full_name || '',
        customer_phone: customer.phone || booking.customer_info?.contact_phone || '',
        vehicle_brand: vehicle.brand || '',
        vehicle_model: vehicle.model || vehicle.brand || '',
        license_plate: vehicle.license_plate || '',
        vehicle_condition: booking.customer_note || '',
        selected_services: selectedServices,
        booking_date: booking.booking_date
            ? new Date(booking.booking_date).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
        bay_id: p.bay_id || null,
        expected_start_datetime: p.expected_start_datetime || null,
        expected_end_datetime: p.expected_end_datetime || null,
        time_slot: timeSlot,
        primary_technician: mechanic?._id || mechanic || null,
        assistant_technicians: [],
        // RECEIVED → waiting for assignment, DIAGNOSING → assigned/in-progress
        status: p.status === 'RECEIVED' ? 'RO_CREATED' : 'IN_PROGRESS',
    };
};

export const useWorkshopLogic = (selectedDate) => {
    const { t } = useTranslation('adminServiceReception');
    const [allBookings, setAllBookings] = useState([]);
    const [bays, setBays] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeBooking, setActiveBooking] = useState(null);
    const [pendingAssignment, setPendingAssignment] = useState(null);

    const dateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [receivedRes, diagnosingRes] = await Promise.all([
                AdminRepairAPI.getRepairProgresses({ status: 'RECEIVED', limit: 100 }),
                AdminRepairAPI.getRepairProgresses({ status: 'DIAGNOSING', limit: 100 }),
            ]);

            const received = (receivedRes?.repairProgresses || []).map(mapProgressToBooking);
            const diagnosing = (diagnosingRes?.repairProgresses || []).map(mapProgressToBooking);

            setAllBookings([...received, ...diagnosing]);
        } catch (err) {
            console.error('WorkshopTab: failed to load repair progresses', err);
            message.error(t('toast_load_error', 'Không thể tải dữ liệu xưởng'));
        } finally {
            setIsLoading(false);
        }

        const techs = mockStaffData.filter(
            s => s.role === 'TECHNICIAN' || s.role === 'LEAD_TECHNICIAN'
        );
        setTechnicians(techs);
        setBays(mockBays);
    }, [t]);

    useEffect(() => {
        fetchData();
    }, [fetchData, dateStr]);

    const handleDragStart = (event) => {
        const draggedBooking = allBookings.find(b => b._id === event.active.id);
        setActiveBooking(draggedBooking || null);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveBooking(null);
        if (!over) return;

        const bookingId = active.id;
        const draggedBooking = allBookings.find(b => b._id === bookingId);
        if (!draggedBooking) return;

        if (over.id === 'unassigned_pool') {
            if (draggedBooking.status === 'IN_PROGRESS') {
                message.error(t('toast_cannot_unassign', 'Không thể gỡ phân công Lệnh sửa chữa đang thi công.'));
                return;
            }
            setAllBookings(prev =>
                prev.map(b => b._id === bookingId
                    ? { ...b, bay_id: null, primary_technician: null, assistant_technicians: [], status: 'RO_CREATED' }
                    : b
                )
            );
            return;
        }

        const targetBay = bays.find(b => b.id === over.id);
        if (targetBay) {
            setPendingAssignment({ booking: draggedBooking, targetBay });
        }
    };

    const confirmAssignment = async (values) => {
        if (!pendingAssignment) return;

        const { booking, targetBay } = pendingAssignment;
        try {
            await AdminRepairAPI.assignMechanic({
                progress_id: booking.progress_id,
                mechanic_id: values.primary_technician,
                bay_id: targetBay.id,
                start_time: values.expected_start_datetime,
                end_time: values.expected_end_datetime,
            });

            message.success(t('toast_assigned', 'Phân công KTV thành công!'));

            setAllBookings(prev =>
                prev.map(b => b._id === booking._id
                    ? {
                        ...b,
                        bay_id: targetBay.id,
                        time_slot: values.time_slot,
                        expected_start_datetime: values.expected_start_datetime,
                        expected_end_datetime: values.expected_end_datetime,
                        primary_technician: values.primary_technician,
                        assistant_technicians: values.assistant_technicians || [],
                        status: 'IN_PROGRESS',
                    }
                    : b
                )
            );
        } catch (err) {
            console.error('confirmAssignment error', err);
            message.error(err?.response?.data?.message || t('toast_assign_error', 'Phân công thất bại'));
        } finally {
            setPendingAssignment(null);
        }
    };

    const cancelAssignment = () => setPendingAssignment(null);

    const adjustDuration = (bookingId, minutesToAdd) => {
        setAllBookings(prev => prev.map(b => {
            if (b._id !== bookingId || !b.time_slot) return b;
            const parts = b.time_slot.split(' - ');
            if (parts.length !== 2) return b;
            const startStr = parts[0];
            const [sH, sM] = startStr.split(':').map(Number);
            const [endH, endM] = parts[1].split(':').map(Number);
            let totalEndMins = Math.max(endH * 60 + endM + minutesToAdd, sH * 60 + sM + 30);
            if (totalEndMins > 19 * 60) totalEndMins = 19 * 60;
            const newEnd = `${Math.floor(totalEndMins / 60).toString().padStart(2, '0')}:${(totalEndMins % 60).toString().padStart(2, '0')}`;
            return { ...b, time_slot: `${startStr} - ${newEnd}` };
        }));
    };

    const getTechniciansWithWorkload = () =>
        technicians.map(tech => {
            const count = allBookings.filter(
                b => b.primary_technician === tech._id || b.assistant_technicians?.includes(tech._id)
            ).length;
            return { ...tech, calculatedWorkload: Math.min(count * 25, 100) };
        });

    const filtered = allBookings.filter(b =>
        !searchTerm || b.license_plate?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        bookings: filtered.filter(b => b.status === 'IN_PROGRESS'),
        unassignedBookings: filtered.filter(b => b.status === 'RO_CREATED'),
        bays,
        technicians: getTechniciansWithWorkload(),
        isLoading,
        searchTerm,
        setSearchTerm,
        activeBooking,
        handleDragStart,
        handleDragEnd,
        adjustDuration,
        pendingAssignment,
        confirmAssignment,
        cancelAssignment,
        selectedDateStr: dateStr,
        refresh: fetchData,
    };
};
