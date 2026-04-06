import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPartFormSchema } from '../schemas/partSchema';

export const usePartForm = (initialData, isEditMode, savePart, t) => {
    const PartFormSchema = getPartFormSchema(t);

    const formMethods = useForm({
        resolver: zodResolver(PartFormSchema),
        defaultValues: {
            name: '',
            sku: '',
            category: null,
            original_price: 0,
            price: 0,
            status: 'active',
            inventory: { warehouse: 0, showroom: 0 },
            images: [],
            compatible_brands: [],
            fitment_data: [],
            specs: [],
            options: [],
            slug: '',
            seo_title: '',
            seo_description: '',
            landing_blocks: []
        }
    });

    const { reset, handleSubmit } = formMethods;

    useEffect(() => {
        if (isEditMode && initialData) {
            reset({
                ...initialData,
                inventory: initialData.inventory || { warehouse: 0, showroom: 0 },
                specs: initialData.specs || []
            });
        }
    }, [initialData, isEditMode, reset]);

    // 1. Map Specs Mảng -> Specs Object
    // ... Cảnh báo khi Rời Trang (Unsaved Changes Blocker) ...
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (formMethods.formState.isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [formMethods.formState.isDirty]);

    // Thực thi Submit với Action
    const submitWithAction = (action) => (data) => {
        const apiPayload = { ...data };
        
        // Ghi đè Status tuỳ theo nút được bấm
        if (action === 'draft') apiPayload.status = 'draft';
        if (action === 'save' || action === 'duplicate') apiPayload.status = 'active';

        // 1. Map Specs
        if (data.specs && data.specs.length > 0) {
            apiPayload.specs = data.specs.reduce((acc, curr) => {
                if (curr.label && curr.value) acc[curr.label] = curr.value;
                return acc;
            }, {});
        } else {
            apiPayload.specs = {};
        }

        // 2. Map Options
        if (data.options && data.options.length > 0) {
            apiPayload.options = data.options.reduce((acc, curr) => {
                if (curr.type && curr.choices?.length > 0) {
                    acc[curr.type.toLowerCase()] = curr.choices;
                }
                return acc;
            }, {});
        } else {
            apiPayload.options = {};
        }

        // Truyền Payload kèm Action cho Data Layer
        savePart({ payload: apiPayload, action });
    };

    return {
        formMethods,
        onSubmit: handleSubmit(submitWithAction('save')),
        onDraft: handleSubmit(submitWithAction('draft')),
        onDuplicate: handleSubmit(submitWithAction('duplicate'))
    };
};
