import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingModalSchema } from '../schemas/shippingModalSchema';

export const useShippingModalLogic = ({ order, onSubmit, onCancel }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(shippingModalSchema),
        defaultValues: {
            provider: order?.shipping?.provider || '',
            tracking_code: order?.shipping?.tracking_code || '',
            estimated_delivery: order?.shipping?.estimated_delivery || ''
        }
    });

    const handleFormSubmit = (data) => {
        if (onSubmit) {
            onSubmit(data);
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
        handleCancel
    };
};
