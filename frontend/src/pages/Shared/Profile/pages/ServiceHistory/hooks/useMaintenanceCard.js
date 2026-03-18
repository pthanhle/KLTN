export const useMaintenanceCard = (service) => {
    const isCompleted = service.booking_status === 'COMPLETED';
    const isInProgress = service.booking_status === 'IN_PROGRESS';

    const renderPrice = (amount) => {
        if (!amount || amount <= 0) return 'Miễn phí';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formattedOdo = service.vehicle_info.current_odometer.toLocaleString();

    return {
        isCompleted,
        isInProgress,
        renderPrice,
        formattedOdo
    };
};
