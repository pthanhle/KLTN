import { useState, useEffect } from 'react';
import { MOCK_SERVICE_BOOKINGS } from '../../data/mockServiceBookings';
import { mockStaffData } from '../../../Staff/data/mockStaffData';
export const useReceptionLogic = (selectedDate) => {
    const [bookings, setBookings] = useState([]);
    const [advisors, setAdvisors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeId, setActiveId] = useState(null);

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
        const targetId = over.id; // Có thể là 'unassigned' hoặc advisor_id

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

    return {
        bookings,
        advisors,
        isLoading,
        handleDragStart,
        handleDragEnd,
        unassignedBookings,
        activeBooking
    };
};
