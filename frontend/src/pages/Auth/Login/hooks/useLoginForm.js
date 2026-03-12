import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { App as AntdApp } from 'antd';
import { useLoginMutation } from '../../../../services/queries/auth.queries';
import { loginSuccess } from '../../../../store/slices/authSlice';

export const useLoginForm = () => {
    const { t } = useTranslation('auth');
    const [showPassword, setShowPassword] = useState(false);
    const { message } = AntdApp.useApp();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { mutate: loginUser, isPending: isLoading } = useLoginMutation();

    const formSchema = z.object({
        email: z.string()
            .email({ message: t('messages.invalidEmail') })
            .max(100, { message: "Email quá dài" }),
        password: z.string()
            .min(6, { message: t('messages.invalidPassword') })
            .regex(/^\S*$/, { message: "Mật khẩu không được chứa khoảng trắng" }), // Chống XSS hoặc lỗi Injection cơ bản
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = form.handleSubmit((data) => {
        loginUser(data, {
            onSuccess: (res) => {
                dispatch(loginSuccess({
                    user: res,
                    token: res.token
                }));
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res)); // Lưu User object vào Storage để F5 không mất state Role
                message.success(t('messages.success'));
                
                if (res.isAdmin) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            },
            onError: (error) => {
                const errorMsg = error.response?.data?.message || t('messages.unauthorized');
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
        t
    };
};
