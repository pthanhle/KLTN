import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { defaultBookingValues } from '../schemas/bookingSchema';

dayjs.extend(customParseFormat);

export const mapRescheduleDataToForm = (rescheduleData, userProfile) => {
    if (!rescheduleData) {
        return {
            ...defaultBookingValues,
            fullName: userProfile?.full_name || '',
            phoneNumber: userProfile?.phone || ''
        };
    }

    return {
        ...defaultBookingValues,
        bookingType: rescheduleData.test_drive_type === 'home' ? 'home' : 'showroom',
        showroomBranch: rescheduleData.test_drive_type === 'showroom' ? '1' : undefined,
        deliveryAddress: rescheduleData.test_drive_type === 'home' ? rescheduleData.delivery_address : '',
        selectedDate: dayjs(rescheduleData.booking_date, 'YYYY-MM-DD'),
        selectedTimeSlot: rescheduleData.time_slot,
        note: rescheduleData.customer_note || '',
        fullName: rescheduleData.customer_info?.full_name || userProfile?.full_name || '',
        phoneNumber: rescheduleData.customer_info?.contact_phone || userProfile?.phone || '',
        hasDriverLicense: true,
        rescheduleReason: '',
    };
};

export const mapFormToBookingPayload = (data, carId, isReschedule, rescheduleData) => {
    return {
        product_id: carId,
        booking_type: 'vehicle',
        test_drive_type: data.bookingType,
        showroom_branch: data.bookingType === 'showroom' ? data.showroomBranch : null,
        delivery_address: data.bookingType === 'home' ? data.deliveryAddress : null,
        full_name: data.fullName,
        contact_phone: data.phoneNumber,
        booking_date: data.selectedDate.format('YYYY-MM-DD'),
        time_slot: data.selectedTimeSlot,
        has_driver_license: data.hasDriverLicense,
        note: data.note,

        is_reschedule: isReschedule,
        reschedule_reason: data.rescheduleReason || null,
        original_booking_id: rescheduleData?.booking_code || null,
    };
};
