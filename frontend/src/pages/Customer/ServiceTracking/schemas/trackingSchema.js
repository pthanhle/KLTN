export const getTrackingSearchRules = (t) => {
    return {
        bookingCode: [
            { required: true, message: t('error_booking_code_invalid', 'Mã đơn hàng không hợp lệ (Tối thiểu 5 ký tự)') },
            { min: 5, message: t('error_booking_code_invalid', 'Mã đơn hàng không hợp lệ (Tối thiểu 5 ký tự)') },
            { max: 50, message: t('error_booking_code_long', 'Mã quá dài (Tối đa 50 ký tự)') }
        ],
        licensePlate: [
            { required: true, message: t('error_license_plate_invalid', 'Biển số xe không hợp lệ (VD: 30A-123.45)') },
            { min: 6, message: t('error_license_plate_invalid', 'Biển số xe không hợp lệ (VD: 30A-123.45)') }
        ]
    };
};
