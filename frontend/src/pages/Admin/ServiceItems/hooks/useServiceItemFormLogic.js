import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceItemSchema } from '../schemas/serviceItems.schema';

export const useServiceItemFormLogic = (isOpen, editingItem, onSave) => {
    const isEditing = !!editingItem;

    const form = useForm({
        resolver: zodResolver(serviceItemSchema),
        defaultValues: {
            sku: '',
            serviceName: '',
            category: '',
            priceType: 'FIXED',
            basePrice: 0,
            estimatedDuration: null,
            isActive: true,
            isPackage: false,
            description: ''
        }
    });

    const { reset, watch, setValue, handleSubmit } = form;

    const priceType = watch('priceType');

    useEffect(() => {
        if (isOpen) {
            if (editingItem) {
                reset({
                    sku: editingItem.sku || '',
                    serviceName: editingItem.serviceName || '',
                    category: editingItem.category?._id || editingItem.category || '',
                    priceType: editingItem.priceType || 'FIXED',
                    basePrice: editingItem.basePrice || 0,
                    estimatedDuration: editingItem.estimatedDuration || null,
                    isActive: editingItem.isActive ?? true,
                    isPackage: editingItem.isPackage ?? false,
                    description: editingItem.description || ''
                });
            } else {
                reset({
                    sku: '',
                    serviceName: '',
                    category: '',
                    priceType: 'FIXED',
                    basePrice: 0,
                    estimatedDuration: null,
                    isActive: true,
                    isPackage: false,
                    description: ''
                });
            }
        }
    }, [isOpen, editingItem, reset]);

    useEffect(() => {
        if (priceType === 'CONTACT') {
            setValue('basePrice', 0);
            form.clearErrors('basePrice');
        }
    }, [priceType, setValue, form]);

    const onSubmit = (data) => {
        onSave(data);
    };

    return {
        form,
        isEditing,
        onSubmit: handleSubmit(onSubmit)
    };
};
