import { getBookingStatusConfig } from '../constants/bookingStatus';

export const mapBookingData = (booking, t) => {
    const statusConfig = getBookingStatusConfig(booking.booking_status || booking.status);
    
    const isTestDrive = booking.booking_type === 'test_drive';

    const serviceName = isTestDrive
        ? t('Lái thử xe')
        : (booking.services?.[0]?.service_name || booking.service || t('Dịch vụ Tiêu Chuẩn'));
        
    const carName = isTestDrive
        ? (booking.product_id?.name || booking.product_id?.product_name || booking.product_id?.car_name || t('Xe Nội Bộ'))
        : (booking.vehicle_info ? `${booking.vehicle_info.brand} ${booking.vehicle_info.model}` : booking.car_name || t('Xe Nội Bộ'));
        
    const date = booking.booking_date || booking.date;
    const timeSlot = booking.time_slot || t('Thời gian chưa xác định');
    const bookingCode = booking.booking_code || booking.id;
    
    // Calculate progress ratio based on status
    const statusValue = booking.booking_status || booking.status;
    let progressRatio = 'w-1/3';
    if (statusValue === 'COMPLETED') progressRatio = 'w-full';
    else if (['IN_PROGRESS', 'QUOTING'].includes(statusValue)) progressRatio = 'w-2/3';

    // Timeline highlighted states
    const isStep1 = !!statusValue;
    const isStep2 = ['IN_PROGRESS', 'QUOTING', 'COMPLETED'].includes(statusValue);
    const isStep3 = statusValue === 'COMPLETED';

    return {
        statusConfig,
        serviceName,
        carName,
        date,
        timeSlot,
        bookingCode,
        progressRatio,
        isStep1,
        isStep2,
        isStep3
    };
};
