import { z } from 'zod';

export const getProfileSchema = (t) => {
    return z.object({
        full_name: z.string().min(1, t('form_errorRequired', 'Vui lòng nhập họ và tên')),
        phone: z.string().regex(/^(0|\+84)[0-9]{8,9}$/, t('form_errorPhone', 'Vui lòng nhập số điện thoại hợp lệ')),
        address: z.string().min(1, t('form_errorRequired', 'Vui lòng nhập địa chỉ'))
    });
};

export const getPasswordSchema = (t) => {
    return z.object({
        currentPassword: z.string().min(1, t('password_required', 'Vui lòng nhập mật khẩu!')),
        newPassword: z.string().min(6, t('password_minLength', 'Ít nhất 6 ký tự!')),
        confirmPassword: z.string().min(1, t('password_required', 'Vui lòng nhập mật khẩu!'))
    }).superRefine((data, ctx) => {
        if (data.newPassword !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t('password_notMatch', 'Mật khẩu xác nhận không khớp!'),
                path: ['confirmPassword']
            });
        }
    });
};
