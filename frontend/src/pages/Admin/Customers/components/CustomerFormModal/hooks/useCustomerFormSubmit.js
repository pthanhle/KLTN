import { useState } from 'react';
import { normalizeFormForApi } from '../utils/customerFormUtils';

export const useCustomerFormSubmit = (onClose, messageApi) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async (values, isEditMode) => {
        setIsSubmitting(true);
        try {
            // Fake API Transport Delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const payload = normalizeFormForApi(values);

            if (messageApi) messageApi.success(`Đã lưu hồ sơ (Dạng API Modal) - Edit Mode: ${isEditMode}`);
            console.log('Final Payload DTO:', payload);

            if (onClose) onClose();
        } catch (error) {
            if (messageApi) messageApi.error('Lỗi lưu dữ liệu: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { 
        isSubmitting, 
        handleSave 
    };
};
