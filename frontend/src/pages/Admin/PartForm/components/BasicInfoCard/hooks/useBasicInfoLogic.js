import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useFormContext } from 'react-hook-form';

export const useBasicInfoLogic = (categories, conditions, createConditionAsync, t) => {
    const { control, setValue } = useFormContext();
    const [localCategories, setLocalCategories] = useState(categories || []);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    
    const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

    useEffect(() => {
        setLocalCategories(categories || []);
    }, [categories]);

    const handleAddCategory = (newCat) => {
        // Basic placeholder for categories, this is usually expanded matching the condition logic
        if (!localCategories.some(c => c.value === newCat)) {
            setLocalCategories([...localCategories, { name: newCat, value: newCat }]);
            message.success(t('adminPartForm:msgAddSuccess', { name: newCat }));
        }
        setIsCategoryModalOpen(false);
    };

    const handleAddCondition = async (newConditionName) => {
        if (!createConditionAsync) {
            message.error("Lỗi: Không thể gọi hàm tạo Tình trạng!");
            return;
        }

        try {
            const res = await createConditionAsync(newConditionName);
            if (res.data?.success) {
                message.success(`Đã thêm tình trạng: ${newConditionName}`);
                // Select the precise new master data condition value
                setValue('condition', res.data.data.value, { shouldValidate: true });
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Không thể tạo mới tình trạng');
        } finally {
            setIsConditionModalOpen(false);
        }
    };

    return {
        control,
        localCategories,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
        handleAddCategory,
        isConditionModalOpen,
        setIsConditionModalOpen,
        handleAddCondition
    };
};
