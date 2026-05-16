import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cancelModalSchema } from '../schemas/cancelModalSchema';

export const useCancelModalLogic = ({ onSubmit, onCancel }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        resolver: zodResolver(cancelModalSchema),
        defaultValues: {
            cancel_reason: ''
        }
    });

    const currentReason = watch('cancel_reason');

    const handleQuickReason = (reason) => {
        // Append reason if there's already some text, otherwise just set it
        const newReason = currentReason ? `${currentReason}. ${reason}` : reason;
        setValue('cancel_reason', newReason, { shouldValidate: true });
    };

    const handleFormSubmit = (data) => {
        if (onSubmit) {
            onSubmit(data);
            reset();
        }
    };

    const handleCancel = () => {
        reset();
        if (onCancel) {
            onCancel();
        }
    };

    return {
        control,
        handleSubmit: handleSubmit(handleFormSubmit),
        errors,
        handleCancel,
        handleQuickReason
    };
};
