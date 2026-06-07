import { useState } from 'react';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { useAdminBookings, useAdminSalesStaff, useAssignBookingMutation } from '../../../../services/queries/testDriveBookingAdmin.queries';
import { useDispatchSocket } from './useDispatchSocket';
import { message } from 'antd';

export const useDispatchLogic = (t) => {
    const queryClient = useQueryClient();
    const [searchStaff, setSearchStaff] = useState('');
    const [filterDate, setFilterDate] = useState(null);
    const [activeBooking, setActiveBooking] = useState(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [pendingAssignmentData, setPendingAssignmentData] = useState(null);

    useDispatchSocket();

    const { data: bookingsResponse, isLoading: isLoadingBookings } = useAdminBookings({
        status: 'Pending',
        page: 1,
        pageSize: 100
    });

    const pendingBookings = bookingsResponse?.data || [];

    const { data: staffList = [], isLoading: isLoadingStaff } = useAdminSalesStaff();

    const filteredStaff = staffList.filter(staff =>
        staff.fullName.toLowerCase().includes(searchStaff.toLowerCase())
    );

    const { mutate: assignBooking, isPending: isAssigning } = useAssignBookingMutation();

    const handleDragStart = (event) => {
        const { active } = event;
        if (active.data.current?.type === 'Booking') {
            setActiveBooking(active.data.current.booking);
        }
    };

    const handleDragCancel = () => {
        setActiveBooking(null);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        setActiveBooking(null);

        if (!over) return;

        if (active.data.current?.type === 'Booking' && over.data.current?.type === 'StaffColumn') {
            const booking = active.data.current.booking;
            const staffId = over.id;
            const staff = staffList.find(s => s._id === staffId);

            if (booking && staff) {
                setPendingAssignmentData({ booking, staff });
                setIsAssignModalOpen(true);
            }
        }
    };

    const confirmAssignment = (values) => {
        if (!pendingAssignmentData) return;

        const booking = pendingAssignmentData.booking;

        const targetStaffId = pendingAssignmentData.staff._id;

        assignBooking({
            bookingId: booking._id,
            staffId: targetStaffId,
            priority: values.priority,
            note: values.note
        }, {
            onSuccess: () => {
                message.success(t('adminTestDriveBookings:assign_success', 'Đã phân công lịch lái thử thành công!'));
                setIsAssignModalOpen(false);
                setPendingAssignmentData(null);

                // Sync filter date → card becomes visible after refetch
                if (booking.selectedDate) {
                    const bookingDay = dayjs(booking.selectedDate, 'DD/MM/YYYY');
                    if (bookingDay.isValid()) setFilterDate(bookingDay);
                }

                // Optimistic update: add task to staff column immediately (before refetch)
                queryClient.setQueriesData({ queryKey: ['adminSalesStaff'] }, (oldData) => {
                    if (!Array.isArray(oldData)) return oldData;
                    return oldData.map((staff) => {
                        if (String(staff._id) !== String(targetStaffId)) return staff;
                        const newTask = {
                            id: String(booking._id),
                            sequence_number: booking.sequence_number,
                            title: `Lịch lái thử xe ${booking.targetCar?.name || booking.targetCarSku || ''}`,
                            priority: values.priority || 'MEDIUM',
                            vehicleModel: booking.targetCar?.name || booking.targetCarSku || '',
                            customerName: booking.fullName,
                            customerPhone: booking.phoneNumber,
                            appointmentDate: booking.selectedDate,
                            appointmentTime: booking.selectedTimeSlot,
                            locationType: booking.bookingType === 'home' ? 'HOME' : 'SHOWROOM',
                            status: 'confirmed',
                        };
                        const existingTodo = staff.performance?.kanban?.todo || [];
                        const alreadyAdded = existingTodo.some((t) => String(t.id) === String(booking._id));
                        if (alreadyAdded) return staff;
                        return {
                            ...staff,
                            workload: (staff.workload || 0) + 1,
                            performance: {
                                ...staff.performance,
                                kanban: {
                                    ...staff.performance?.kanban,
                                    todo: [...existingTodo, newTask],
                                },
                            },
                        };
                    });
                });
            },
            onError: () => {
                message.error(t('adminTestDriveBookings:assign_error', 'Phân công thất bại. Vui lòng thử lại.'));
            }
        });
    };

    const closeAssignModal = () => {
        setIsAssignModalOpen(false);
        setPendingAssignmentData(null);
    };

    const handleAssignFromRequest = (booking, staff) => {
        setPendingAssignmentData({ booking, staff });
        setIsAssignModalOpen(true);
    };

    return {
        pendingBookings,
        staffList: filteredStaff,
        isLoading: isLoadingBookings || isLoadingStaff,
        isAssigning,
        searchStaff,
        setSearchStaff,
        filterDate,
        setFilterDate,
        activeBooking,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
        isAssignModalOpen,
        pendingAssignmentData,
        confirmAssignment,
        closeAssignModal,
        handleAssignFromRequest
    };
};
