import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { defaultBookingValues } from '../schemas/bookingSchema';

dayjs.extend(customParseFormat);

export const mapRescheduleDataToForm = (rescheduleData, userProfile) => {
    // Attempt to extract default address from User Profile
    const defaultAddr = userProfile?.addresses?.find(a => a.is_default) || userProfile?.addresses?.[0];

    if (!rescheduleData) {
        return {
            ...defaultBookingValues,
            fullName: userProfile?.full_name || '',
            phoneNumber: userProfile?.phone || '',
            city: defaultAddr?.city || undefined,
            district: defaultAddr?.district || undefined,
            ward: defaultAddr?.ward || undefined,
            addressDetail: defaultAddr?.street || userProfile?.address || '',
        };
    }

    // Map Reschedule Data using structured object directly if it exists
    let rescheduleCity, rescheduleDistrict, rescheduleWard, rescheduleDetail = '';
    
    if (rescheduleData.test_drive_type === 'home' && rescheduleData.delivery_address) {
        if (typeof rescheduleData.delivery_address === 'object') {
            const addr = rescheduleData.delivery_address;
            rescheduleCity = addr.city;
            rescheduleDistrict = addr.district;
            rescheduleWard = addr.ward;
            rescheduleDetail = addr.street;
        } else {
            // Fallback for old legacy string-based format
            const parts = rescheduleData.delivery_address.split(', ');
            if (parts.length >= 4) {
                rescheduleCity = parts[parts.length - 1];
                rescheduleDistrict = parts[parts.length - 2];
                rescheduleWard = parts[parts.length - 3];
                rescheduleDetail = parts.slice(0, parts.length - 3).join(', ');
            } else {
                rescheduleDetail = rescheduleData.delivery_address;
            }
        }
    }

    return {
        ...defaultBookingValues,
        bookingType: rescheduleData.test_drive_type === 'home' ? 'home' : 'showroom',
        showroomBranch: rescheduleData.test_drive_type === 'showroom' ? '1' : undefined,
        city: rescheduleCity || defaultAddr?.city || undefined,
        district: rescheduleDistrict || defaultAddr?.district || undefined,
        ward: rescheduleWard || defaultAddr?.ward || undefined,
        addressDetail: rescheduleDetail || defaultAddr?.street || userProfile?.address || '',
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
    // Send standard object payload instead of temporary string
    const deliveryAddressObj = data.bookingType === 'home' 
        ? {
            street: data.addressDetail,
            ward: data.ward,
            district: data.district,
            city: data.city
        } : null;

    return {
        product_id: carId,
        booking_type: 'test_drive',
        test_drive_type: data.bookingType,
        showroom_branch: data.bookingType === 'showroom' ? data.showroomBranch : null,
        delivery_address: deliveryAddressObj,
        contact_phone: data.phoneNumber,
        booking_date: data.selectedDate.format('YYYY-MM-DD'),
        time_slot: data.selectedTimeSlot,
        customer_note: data.note,

        is_reschedule: isReschedule,
        reschedule_reason: data.rescheduleReason || null,
        original_booking_id: rescheduleData?.booking_code || null,
    };
};
