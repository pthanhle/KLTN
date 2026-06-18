export const useCustomerBookings = (bookings) => {
    const activeBookings = bookings?.filter(b => {
        const status = b.booking_status || b.status;
        return !['COMPLETED', 'CANCELLED'].includes(status);
    }) || [];

    const serviceBookings = activeBookings.filter(b => b.booking_type === 'service' || b.booking_type === 'maintenance');
    const testDriveBookings = activeBookings.filter(b => b.booking_type === 'test_drive');

    const historyBookings = bookings?.filter(b => {
        const status = b.booking_status || b.status;
        return ['COMPLETED', 'CANCELLED'].includes(status);
    }) || [];

    const serviceHistory = historyBookings.filter(b => b.booking_type === 'service' || b.booking_type === 'maintenance');
    const testDriveHistory = historyBookings.filter(b => b.booking_type === 'test_drive');

    return {
        serviceBookings,
        testDriveBookings,
        serviceHistory,
        testDriveHistory
    };
};
