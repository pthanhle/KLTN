import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getResetPasswordSchema } from '../../schemas/authSchemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { useResetPasswordMutation, useVerifyResetTokenMutation } from '../../../../services/queries/auth.queries';

export const useResetPasswordForm = () => {
    const { t } = useTranslation('auth');
    const { message } = AntdApp.useApp();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const token = searchParams.get('token');

    const [showPassword, setShowPassword] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [verifying, setVerifying] = useState(true);
    
    const { mutate: verifyToken } = useVerifyResetTokenMutation();
    const { mutate: resetPassword, isPending: isLoading } = useResetPasswordMutation();

    useEffect(() => {
        if (!token) {
            message.error("Link không hợp lệ!");
            navigate('/login');
            return;
        }

        verifyToken(token, {
            onSuccess: () => {
                setIsTokenValid(true);
                setVerifying(false);
            },
            onError: () => {
                message.error("Link hết hạn hoặc không hợp lệ!");
                navigate('/login');
            }
        });
    }, [token, verifyToken, navigate, message]);

    const formSchema = useMemo(() => getResetPasswordSchema(t), [t]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { password: '' }
    });

    const onSubmit = form.handleSubmit((data) => {
        resetPassword({ token, newPassword: data.password }, {
            onSuccess: () => {
                message.success(t('reset.success'));
                navigate('/login');
            },
            onError: (error) => {
                message.error(error.response?.data?.message || "Có lỗi xảy ra");
            }
        });
    });

    return {
        form,
        onSubmit,
        isLoading,
        verifying,
        isTokenValid,
        showPassword,
        setShowPassword,
        t
    };
};
