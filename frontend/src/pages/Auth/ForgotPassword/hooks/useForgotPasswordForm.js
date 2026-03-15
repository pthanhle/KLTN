import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getForgotPasswordSchema } from '../../schemas/authSchemas';
import { App as AntdApp } from 'antd';
import { useForgotPasswordMutation } from '../../../../services/queries/auth.queries';

export const useForgotPasswordForm = () => {
    const { t } = useTranslation('auth');
    const { message } = AntdApp.useApp();
    const [isSent, setIsSent] = useState(false);
    
    const { mutate: forgotPassword, isPending: isLoading } = useForgotPasswordMutation();

    const formSchema = useMemo(() => getForgotPasswordSchema(t), [t]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '' }
    });

    const onSubmit = form.handleSubmit((data) => {
        forgotPassword(data.email, {
            onSuccess: () => {
                setIsSent(true);
                message.success(t('messages.emailSent'));
            },
            onError: (error) => {
                message.error(error.response?.data?.message || t('messages.unauthorized'));
            }
        });
    });

    return {
        form,
        onSubmit,
        isLoading,
        isSent,
        t
    };
};
