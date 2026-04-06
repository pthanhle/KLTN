import { useFormContext, useWatch } from 'react-hook-form';

export const useSeoBuilder = () => {
    const { control, setValue } = useFormContext();
    
    const partName = useWatch({ control, name: 'name' });
    const slug = useWatch({ control, name: 'slug' });
    const seoTitle = useWatch({ control, name: 'seo_title' }) || '';
    const seoDesc = useWatch({ control, name: 'seo_description' }) || '';

    const generateSlug = () => {
        if (!partName) return;
        const generatedSlug = partName
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, 'd')
            .replace(/([^a-z0-9\s])/g, '')
            .replace(/\s+/g, '-');
        setValue('slug', generatedSlug, { shouldDirty: true });
    };

    return {
        control,
        slug,
        seoTitle,
        seoDesc,
        generateSlug
    };
};
