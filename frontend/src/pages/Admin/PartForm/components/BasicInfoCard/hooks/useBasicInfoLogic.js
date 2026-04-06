import { useState } from 'react';
import { message } from 'antd';
import { useFormContext } from 'react-hook-form';

export const useBasicInfoLogic = (categories, t) => {
    const { control } = useFormContext();
    const [localCategories, setLocalCategories] = useState(categories || []);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const handleAddCategory = (newCat) => {
        if (!localCategories.includes(newCat)) {
            setLocalCategories([...localCategories, newCat]);
            message.success(t('adminPartForm:msgAddSuccess', { name: newCat }));
        }
        setIsCategoryModalOpen(false);
    };

    return {
        control,
        localCategories,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
        handleAddCategory
    };
};
