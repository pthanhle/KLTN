import { useState } from 'react';
import { adminCustomerApi } from '../../../../../services/api/adminCustomer.api';
import { normalizeFormForApi } from '../utils/customerFormUtils';

export const useCustomerFormSubmit = (onClose, messageApi, onSuccess) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async (values, isEditMode, customerId) => {
        setIsSubmitting(true);
        try {
            const payload = normalizeFormForApi(values);

            if (isEditMode && customerId) {
                await adminCustomerApi.updateCustomer(customerId, payload);
                if (messageApi) messageApi.success('Cập nhật hồ sơ khách hàng thành công');
            } else {

                if (messageApi) messageApi.info('Chức năng tạo mới khách hàng đang được phát triển');
                console.log('Create payload:', payload);
            }

            if (onSuccess) onSuccess();
            if (onClose) onClose();
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || 'Lỗi không xác định';
            if (messageApi) messageApi.error('Lỗi lưu dữ liệu: ' + msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { 
        isSubmitting, 
        handleSave 
    };
};
