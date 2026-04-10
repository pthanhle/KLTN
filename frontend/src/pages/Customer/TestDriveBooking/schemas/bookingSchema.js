import { z } from 'zod';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const getBookingSchema = (t, rescheduleData, isDemoAvailable = true) => {
    return z.object({
        fullName: z.string().min(2, t('booking_errorName', 'Vui lòng nhập họ và tên')),
        phoneNumber: z.string()
            .transform((val) => val.replace(/\s+/g, '')) // Remove spaces automatically
            .pipe(z.string().regex(/^(0|\+84)[0-9]{8,9}$/, t('booking_errorPhone', 'Vui lòng nhập số điện thoại hợp lệ'))),
        bookingType: z.enum(['showroom', 'home', 'waitlist']),
        showroomBranch: z.string().optional(),
        city: z.string().optional(),
        district: z.string().optional(),
        ward: z.string().optional(),
        addressDetail: z.string().optional(),
        selectedDate: isDemoAvailable ? z.any().refine((val) => val !== null, {
            message: t('booking_errorDate', 'Vui lòng chọn ngày lái thử')
        }) : z.any().optional(),
        selectedTimeSlot: isDemoAvailable ? z.string().min(1, t('booking_errorTime', 'Vui lòng chọn khung giờ')) : z.string().optional(),
        hasDriverLicense: z.boolean().refine((val) => val === true, {
            message: t('booking_errorLicense', 'Bạn cần có bằng lái để đăng ký')
        }),
        note: z.string().optional(),
        rescheduleReason: rescheduleData
            ? z.string().min(5, t('booking_errorReason', 'Vui lòng cung cấp lý do dời lịch (ít nhất 5 ký tự)'))
            : z.string().optional()
    }).superRefine((data, ctx) => {
        // Only require branch for waitlists or showroom visits
        if ((data.bookingType === 'showroom' || data.bookingType === 'waitlist') && !data.showroomBranch) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t('booking_errorBranch', 'Vui lòng chọn chi nhánh'),
                path: ['showroomBranch']
            });
        }
        if (data.bookingType === 'home' && isDemoAvailable) {
            if (!data.city) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('booking_errorCity', 'Vui lòng chọn Thành phố'), path: ['city'] });
            }
            if (!data.district) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('booking_errorDistrict', 'Vui lòng chọn Quận/Huyện'), path: ['district'] });
            }
            if (!data.ward) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('booking_errorWard', 'Vui lòng chọn Phường/Xã'), path: ['ward'] });
            }
            if (!data.addressDetail || data.addressDetail.trim().length === 0) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('booking_errorAddress', 'Vui lòng nhập địa chỉ nhận xe cụ thể'), path: ['addressDetail'] });
            }
        }

        // Custom Rule for Rescheduling: Must change Date OR Time
        if (rescheduleData && isDemoAvailable) {
            const isSameDate = data.selectedDate && dayjs(data.selectedDate).isSame(dayjs(rescheduleData.date, 'DD/MM/YYYY'), 'day');

            if (isSameDate && data.selectedTimeSlot === rescheduleData.timeSlot) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t('booking_errorSameTime', 'Bạn đang chọn trùng với lịch hẹn cũ. Vui lòng dời sang giờ/ngày khác!'),
                    path: ['selectedTimeSlot'] // Highlight lỗi ở Khung giờ
                });

                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t('booking_errorSameDate', 'Bạn chưa thay đổi ngày giờ. Vui lòng điều chỉnh lại!'),
                    path: ['selectedDate']
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
    city: undefined,
    district: undefined,
    ward: undefined,
    addressDetail: '',
    selectedDate: null,
    selectedTimeSlot: '',
    hasDriverLicense: false,
    note: ''
};
