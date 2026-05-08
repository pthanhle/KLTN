import { useState } from 'react';
import dayjs from 'dayjs';
import { useAdminBookings, useAdminSalesStaff, useAssignBookingMutation } from '../../../../services/queries/testDriveBookingAdmin.queries';
import { message } from 'antd';

export const useDispatchLogic = (t) => {
    const [searchStaff, setSearchStaff] = useState('');
    const [filterDate, setFilterDate] = useState(dayjs());
    const [activeBooking, setActiveBooking] = useState(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [pendingAssignmentData, setPendingAssignmentData] = useState(null);

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

        assignBooking({ 
            bookingId: pendingAssignmentData.booking._id, 
            staffId: pendingAssignmentData.staff._id,
            priority: values.priority,
            note: values.note
        }, {
            onSuccess: () => {
                message.success(t('adminTestDriveBookings:assign_success', 'Đã phân công lịch lái thử thành công!'));
                setIsAssignModalOpen(false);
                setPendingAssignmentData(null);
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
        closeAssignModal
    };
};
