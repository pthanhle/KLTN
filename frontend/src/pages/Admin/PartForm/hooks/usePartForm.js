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
            brand: '',
            category: null,
            condition: 'new',
            original_price: 0,
            price: 0,
            status: 'active',
            inventory: { stock_on_hand: 0, allocated: 0, available_stock: 0 },
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

            // Normalise choices: DB stores objects {label, price_modifier, image_url}.
            // Legacy records may have plain strings — upgrade them so the form always gets objects.
            const mappedOptions = (initialData.options || []).map(opt => ({
                ...opt,
                choices: (opt.choices || []).map(c =>
                    typeof c === 'string'
                        ? { label: c, price_modifier: 0, image_url: '' }
                        : c
                ),
            }));

            reset({
                ...initialData,
                inventory: initialData.inventory || { stock_on_hand: 0, allocated: 0, available_stock: 0 },
                specs: initialData.specs || [],
                options: mappedOptions
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

        if (action === 'draft') apiPayload.status = 'draft';
        if (action === 'publish') apiPayload.status = 'active';

        // The backend `partModel.js` and frontend `partSchema.js` natively expect Arrays of Objects
        apiPayload.specs = data.specs || [];
        apiPayload.options = data.options || [];

        // Truyền Payload kèm Action cho Data Layer
        savePart({ payload: apiPayload, action });
    };

    return {
        formMethods,
        onSubmit: handleSubmit(submitWithAction('save')),
        onApply: handleSubmit(submitWithAction('apply')),
        onDraft: handleSubmit(submitWithAction('draft')),
        onDuplicate: handleSubmit(submitWithAction('duplicate'))
    };
};
