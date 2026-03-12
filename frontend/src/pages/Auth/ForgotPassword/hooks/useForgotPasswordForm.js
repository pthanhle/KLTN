import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { App as AntdApp } from 'antd';
import { useForgotPasswordMutation } from '../../../../services/queries/auth.queries';

export const useForgotPasswordForm = () => {
    const { t } = useTranslation('auth');
    const { message } = AntdApp.useApp();
    const [isSent, setIsSent] = useState(false);
    
    const { mutate: forgotPassword, isPending: isLoading } = useForgotPasswordMutation();

    const formSchema = z.object({
        email: z.string()
            .email({ message: t('messages.invalidEmail') })
            .max(100, { message: "Email quá dài" }),
    });

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
