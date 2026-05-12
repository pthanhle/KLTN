import { useState, useEffect } from 'react';
import { MOCK_SERVICE_BOOKINGS } from '../../data/mockServiceBookings';
import { mockStaffData } from '../../../Staff/data/mockStaffData';
export const useReceptionLogic = (selectedDate) => {
    const [bookings, setBookings] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeId, setActiveId] = useState(null);
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState(null);
    const [bookingToMarkNoShow, setBookingToMarkNoShow] = useState(null);

    const dateStr = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            const bookingsForDate = MOCK_SERVICE_BOOKINGS.filter(b => b.booking_date === dateStr && (b.status === 'CONFIRMED' || b.status === 'ASSIGNED_TO_SA'));
            setBookings(bookingsForDate);

            const saList = mockStaffData.filter(staff => staff.role === 'SERVICE_ADVISOR' || staff.role === 'SALES_ADVISOR');
            setAdvisors(saList.length > 0 ? saList : mockStaffData.slice(0, 3));
            setIsLoading(false);
        };
        loadData();
    }, [dateStr]);

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const bookingId = active.id;
        const targetId = over.id;

        setBookings((prevBookings) => {
            return prevBookings.map((booking) => {
                if (booking._id === bookingId) {
                    if (targetId === 'unassigned') {
                        return { ...booking, advisor_id: null, status: 'CONFIRMED' };
                    } else {
                        return { ...booking, advisor_id: targetId, status: 'ASSIGNED_TO_SA' };
                    }
                }
                return booking;
            });
        });
    };

    const unassignedBookings = bookings.filter(b => b.status === 'CONFIRMED');
    const activeBooking = activeId ? bookings.find(b => b._id === activeId) : null;

    const confirmNoShow = (bookingId) => {
        setBookingToMarkNoShow(bookingId);
    };

    const handleNoShowConfirm = async () => {
        if (!bookingToMarkNoShow) return;

        try {
            // TODO: API Integration Point for No-Show
            // await axios.patch(`/api/v1/bookings/${bookingToMarkNoShow}/status`, {
            //     status: 'NO_SHOW',
            //     updated_at: new Date().toISOString()
            // });
            
            setBookings(prev => prev.map(b => b._id === bookingToMarkNoShow ? { ...b, status: 'NO_SHOW' } : b).filter(b => b.status !== 'NO_SHOW'));
            setBookingToMarkNoShow(null);
        } catch (error) {
            console.error('Failed to mark booking as no-show:', error);
            // message.error(t('error_update_failed'));
        }
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
            const [hours, minutes] = newTime.split(':');
            const endHours = parseInt(hours, 10) + 2; // Assuming default service duration is 2 hours
            const endTime = `${endHours.toString().padStart(2, '0')}:${minutes}`;
            const newTimeSlot = `${newTime} - ${endTime}`;

            // TODO: API Integration Point for Reschedule
            // await axios.patch(`/api/v1/bookings/${bookingId}/reschedule`, {
            //     booking_date: newDate,
            //     time_slot: newTimeSlot,
            //     // status: 'PENDING' // Optional: reset status if business rules require re-confirmation
            // });

            setBookings(prev => prev.map(b => {
                if (b._id === bookingId) {
                    if (newDate && newDate !== dateStr) {
                        return { ...b, time_slot: newTimeSlot, booking_date: newDate, is_hidden: true };
                    }
                    return { ...b, time_slot: newTimeSlot };
                }
                return b;
            }).filter(b => !b.is_hidden));
            
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
