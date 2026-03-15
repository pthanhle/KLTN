import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getLoginSchema } from '../../schemas/authSchemas';
import { useNavigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { useLoginMutation } from '../../../../services/queries/auth.queries';

export const useLoginForm = () => {
    const { t } = useTranslation('auth');
    const [showPassword, setShowPassword] = useState(false);
    const { message } = AntdApp.useApp();
    const navigate = useNavigate();

    const { mutate: loginUser, isPending: isLoading } = useLoginMutation();

    const formSchema = useMemo(() => getLoginSchema(t), [t]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = form.handleSubmit((data) => {
        loginUser(data, {
            onSuccess: (res) => {
                message.success(t('messages.success'));
                navigate(res.isAdmin ? '/admin/dashboard' : '/');
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
