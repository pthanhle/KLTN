import { z } from 'zod';

export const getBookingSchema = (t) => {
    return z.object({
        phoneNumber: z.string()
            .regex(/^(0|\+84)[0-9]{8,9}$/, t('booking_errorPhone', 'Vui lòng nhập số điện thoại hợp lệ')),
        bookingType: z.enum(['showroom', 'home']),
        showroomBranch: z.string().optional(),
        deliveryAddress: z.string().optional(),
        selectedDate: z.any().refine((val) => val !== null, {
            message: t('booking_errorDate', 'Vui lòng chọn ngày lái thử')
        }),
        selectedTimeSlot: z.string().min(1, t('booking_errorTime', 'Vui lòng chọn khung giờ')),
        hasDriverLicense: z.boolean().refine((val) => val === true, {
            message: t('booking_errorLicense', 'Bạn cần có bằng lái để đăng ký')
        }),
        note: z.string().optional()
    }).superRefine((data, ctx) => {
        if (data.bookingType === 'showroom' && !data.showroomBranch) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t('booking_errorBranch', 'Vui lòng chọn chi nhánh'),
                path: ['showroomBranch']
            });
        }
        if (data.bookingType === 'home' && (!data.deliveryAddress || data.deliveryAddress.trim().length === 0)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t('booking_errorAddress', 'Vui lòng nhập địa chỉ nhận xe'),
                path: ['deliveryAddress']
            });
        }
    });
};
