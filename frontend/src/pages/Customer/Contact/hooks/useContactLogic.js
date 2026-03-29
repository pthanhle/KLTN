import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { createContactSchema } from '../schemas/contactSchema';
import { useGetSystemSettings, useSubmitContact } from '../../../../services/queries/contactQueries';

export const useContactLogic = () => {
    const { t } = useTranslation('contact');
    const { message: antdMessage } = App.useApp();
    const contactSchema = createContactSchema(t);

    const { data: contactData, isLoading: isLoadingData } = useGetSystemSettings({
        onError: () => antdMessage.error(t('messages_error'))
    });

    const submitMutation = useSubmitContact();

    // Form logic
    const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            subject: 'new_car',
            message: ''
        }
    });

    const onSubmit = (data) => {
        submitMutation.mutate(data, {
            onSuccess: () => {
                antdMessage.success(t('messages_success'));
                reset();
            },
            onError: () => {
                antdMessage.error(t('messages_error'));
            }
        });
    };

    return {
        t,
        isLoadingData,
        contactData,
        form: {
            control,
            errors,
            isSubmitting: submitMutation.isPending,
            handleSubmit: handleSubmit(onSubmit),
        }
    };
};
