import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../../../../services/socket';

/**
 * Custom hook to manage WebSocket real-time synchronization for Dispatch Board
 * @returns {void}
 */
export const useDispatchSocket = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        // Automatically connect if not already connected
        if (!socket.connected) {
            socket.connect();
        }

        /**
         * Invalidate React Query cache when real-time updates occur.
         * This triggers a background refetch, instantly updating the UI for all connected managers.
         */
        const handleBookingUpdate = (payload) => {
            console.log('[Socket] Dispatch Board received update:', payload);
            
            // Invalidate pending bookings queue to fetch new list
            queryClient.invalidateQueries({ queryKey: ['adminBookings'] });
            
            // Invalidate staff workload/kanban data to reflect newly assigned tasks
            queryClient.invalidateQueries({ queryKey: ['adminSalesStaff'] });
        };

        // Listen for specific business events
        socket.on('booking_assigned', handleBookingUpdate);
        socket.on('booking_updated', handleBookingUpdate);
        socket.on('booking_cancelled', handleBookingUpdate);

        // Cleanup listeners on unmount
        return () => {
            socket.off('booking_assigned', handleBookingUpdate);
            socket.off('booking_updated', handleBookingUpdate);
            socket.off('booking_cancelled', handleBookingUpdate);
        };
    }, [queryClient]);
};
