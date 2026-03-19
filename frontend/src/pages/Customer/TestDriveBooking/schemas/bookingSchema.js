import { z } from 'zod';

export const getBookingSchema = (t, rescheduleData) => {
    return z.object({
        fullName: z.string().min(2, t('booking_errorName', 'Vui lòng nhập họ và tên')),
        phoneNumber: z.string()
            .transform((val) => val.replace(/\s+/g, '')) // Remove spaces automatically
            .pipe(z.string().regex(/^(0|\+84)[0-9]{8,9}$/, t('booking_errorPhone', 'Vui lòng nhập số điện thoại hợp lệ'))),
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
        note: z.string().optional(),
        rescheduleReason: rescheduleData
            ? z.string().min(5, t('booking_errorReason', 'Vui lòng cung cấp lý do dời lịch (ít nhất 5 ký tự)'))
            : z.string().optional()
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
        
        // Custom Rule for Rescheduling: Must change Date OR Time
        if (rescheduleData) {
            const newDateStr = data.selectedDate?.format('DD/MM/YYYY');
            if (newDateStr === rescheduleData.date && data.selectedTimeSlot === rescheduleData.timeSlot) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t('booking_errorSameTime', 'Bạn đang chọn trùng với lịch hẹn cũ. Vui lòng dời sang giờ/ngày khác!'),
                    path: ['selectedTimeSlot'] // Highlight lỗi ở Khung giờ
                });
            }
        }
    });
};

export const defaultBookingValues = {
    fullName: '',
    phoneNumber: '',
    bookingType: 'showroom',
    showroomBranch: '1',
    deliveryAddress: '',
    selectedDate: null,
    selectedTimeSlot: '',
    hasDriverLicense: false,
    note: ''
};
