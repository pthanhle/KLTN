import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getRegisterSchema } from '../../schemas/authSchemas';
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

    const formSchema = useMemo(() => getRegisterSchema(t), [t]);

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
