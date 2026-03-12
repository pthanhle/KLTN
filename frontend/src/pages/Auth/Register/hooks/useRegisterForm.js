import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { useRegisterMutation } from '../../../../services/queries/auth.queries';

export const useRegisterForm = (onRegisterSuccess) => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { message } = AntdApp.useApp();

    const { mutate: registerUser, isPending: isLoading } = useRegisterMutation();

    const formSchema = z.object({
        full_name: z.string()
            .min(2, { message: t('messages.invalidName') })
            .regex(/^[\p{L} '\-\.]+$/u, { message: t('messages.invalidName') }), // Chỉ cho phép chữ (kể cả Unicode), khoảng trắng, dấu phẩy, dấu gạch nối
        email: z.string()
            .email({ message: t('messages.invalidEmail') })
            .max(100, { message: "Email quá dài" }),
        phone: z.string()
            .regex(/^[0-9]{10,12}$/, { message: t('messages.invalidPhone') }),
        password: z.string()
            .min(6, { message: t('messages.invalidPassword') })
            .regex(/^\S*$/, { message: "Mật khẩu không được chứa khoảng trắng" }), // Chống XSS khoảng trắng
        confirmPassword: z.string()
            .min(6, { message: t('messages.invalidPassword') }),
        terms: z.boolean().refine(val => val === true, {
            message: "Bạn phải đồng ý với Điều khoản",
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { full_name: '', email: '', phone: '', password: '', confirmPassword: '', terms: false }
    });

    const onSubmit = form.handleSubmit((data) => {
        const username = data.email.split('@')[0] + Math.floor(Math.random() * 1000);
        
        const payload = {
            email: data.email,
            username: username,
            password: data.password,
            full_name: data.full_name,
            phone: data.phone
        };

        registerUser(payload, {
            onSuccess: (res) => {
                message.success(res.message || "Đăng ký thành công!");
                navigate(`/verify-otp?email=${data.email}`);
            },
            onError: (error) => {
                const errorMsg = error.response?.data?.message || "Đăng ký thất bại";
                message.error(errorMsg);
            }
        });
    });

    return {
        form,
        onSubmit,
        isLoading,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        t
    };
};
