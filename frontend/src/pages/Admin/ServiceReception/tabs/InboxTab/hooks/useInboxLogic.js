import { useState, useEffect } from 'react';
import { MOCK_SERVICE_BOOKINGS } from '../../../data/mockServiceBookings';
import dayjs from 'dayjs';

export const useInboxLogic = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInboxData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));

            const inboxBookings = MOCK_SERVICE_BOOKINGS
                .filter(b => b.status === 'PENDING')
                .sort((a, b) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf());

            setBookings(inboxBookings);
            setIsLoading(false);
        };

        fetchInboxData();
    }, []);

    const confirmBooking = async (bookingId) => {
        await new Promise(resolve => setTimeout(resolve, 300));

        setBookings(prev => prev.filter(b => b._id !== bookingId));
    };

    return {
        bookings,
        isLoading,
        confirmBooking
    };
};
