import { z } from 'zod';

export const getCreateStaffSchema = (t) => z.object({
    fullName: z.string()
        .min(1, { message: t('adminStaffCreate:error_fullname_req', 'Vui lòng nhập họ tên') })
        .min(2, { message: 'Tên phải dài hơn 2 ký tự' }),
    email: z.string()
        .min(1, { message: t('adminStaffCreate:error_email_req', 'Vui lòng nhập email') })
        .email({ message: t('adminStaffCreate:error_email_format', 'Email không hợp lệ') }),
    phone: z.string()
        .min(1, { message: t('adminStaffCreate:error_phone_req', 'Vui lòng nhập số điện thoại') })
        .regex(/^[0-9]{10,11}$/, { message: 'Số điện thoại không hợp lệ' }),
    role: z.string({
        required_error: t('adminStaffCreate:error_role_req', 'Vui lòng chọn vai trò'),
    }).min(1, { message: t('adminStaffCreate:error_role_req', 'Vui lòng chọn vai trò') }),
    department: z.string().optional(),
});
