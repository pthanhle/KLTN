import { useState, useEffect } from 'react';
import { MOCK_SERVICE_BOOKINGS } from '../../../data/mockServiceBookings';
import dayjs from 'dayjs';

export const useInboxLogic = () => {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingToReject, setBookingToReject] = useState(null);

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
        try {
            // TODO: API Integration Point for Confirming Booking
            // await axios.patch(`/api/v1/bookings/${bookingId}/status`, {
            //     status: 'CONFIRMED'
            // });
            setBookings(prev => prev.filter(b => b._id !== bookingId));
        } catch (error) {
            console.error('Failed to confirm booking:', error);
        }
    };

    const confirmReject = (bookingId) => {
        setBookingToReject(bookingId);
    };

    const handleRejectConfirm = async () => {
        if (!bookingToReject) return;
        
        try {
            // TODO: API Integration Point for Rejecting Booking
            // await axios.patch(`/api/v1/bookings/${bookingToReject}/status`, {
            //     status: 'REJECTED'
            // });
            
            setBookings(prev => prev.filter(b => b._id !== bookingToReject));
            setBookingToReject(null);
        } catch (error) {
            console.error('Failed to reject booking:', error);
        }
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
