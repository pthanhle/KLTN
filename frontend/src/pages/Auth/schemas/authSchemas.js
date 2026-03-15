import * as z from 'zod';

export const getLoginSchema = (t) => {
    return z.object({
        email: z.string()
            .email({ message: t('messages.invalidEmail') })
            .max(100, { message: 'Email quá dài' }),
        password: z.string()
            .min(6, { message: t('messages.invalidPassword') })
            .regex(/^\S*$/, { message: 'Mật khẩu không được chứa khoảng trắng' }),
    });
};

export const getRegisterSchema = (t) => {
    return z.object({
        full_name: z.string()
            .min(2, { message: t('messages.invalidName') })
            .regex(/^[\p{L} '\-\.]+$/u, { message: t('messages.invalidName') }),
        email: z.string()
            .email({ message: t('messages.invalidEmail') })
            .max(100, { message: "Email quá dài" }),
        phone: z.string()
            .regex(/^[0-9]{10,12}$/, { message: t('messages.invalidPhone') }),
        password: z.string()
            .min(6, { message: t('messages.invalidPassword') })
            .regex(/^\S*$/, { message: "Mật khẩu không được chứa khoảng trắng" }),
        confirmPassword: z.string()
            .min(6, { message: t('messages.invalidPassword') }),
        terms: z.boolean().refine(val => val === true, {
            message: "Bạn phải đồng ý với Điều khoản",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });
};

export const getForgotPasswordSchema = (t) => {
    return z.object({
        email: z.string()
            .email({ message: t('messages.invalidEmail') })
            .max(100, { message: "Email quá dài" }),
    });
};

export const getResetPasswordSchema = (t) => {
    return z.object({
        password: z.string()
            .min(6, { message: t('messages.invalidPassword') })
            .regex(/^\S*$/, { message: "Mật khẩu không được chứa khoảng trắng" }),
    });
};
