import { useState } from 'react';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createAdminProduct, updateAdminProduct } from '../../../../services/api/adminProduct.api';

export const useCarFormSubmit = (form) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    // Helper to extract real File/Blob from various wrappers (AntD, raw browser, etc.)
    const getRealFile = (val) => {
        if (!val) return null;
        // Check if it's already a File or Blob
        if (val instanceof File || val instanceof Blob) return val;
        // Check if it's an AntD Upload File object
        if (val.originFileObj instanceof File || val.originFileObj instanceof Blob) return val.originFileObj;
        // Check if it's a wrapped object with a 'file' property (sometimes happens in custom setups)
        if (val.file instanceof File || val.file instanceof Blob) return val.file;
        return null;
    };

    const convertToFormData = (values) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const value = values[key];

            // 1. Specific File handling for Hero Image (the 'image' field)
            if (key === 'image') {
                const heroFile = getRealFile(value);
                if (heroFile) {
                    formData.append('image', heroFile);
                } else if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/'))) {
                    // Only send as string if it looks like a real URL/Path
                    formData.append('image', value);
                }
                return; // Move to next key
            }

            // 2. Specific File handling for Gallery Photos (new_photos)
            if (key === 'new_photos' && Array.isArray(value)) {
                value.forEach(item => {
                    const photoFile = getRealFile(item);
                    if (photoFile) {
                        formData.append('photos', photoFile);
                    }
                });
                return; // Move to next key
            }

            // 3. Handle complex objects/arrays (stringify for multipart)
            if (value !== null && typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob)) {
                formData.append(key, JSON.stringify(value));
            }
            // 4. Regular primitives
            else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        return formData;
    };

    const handleSaveDraft = async () => {
        try {
            setIsSubmitting(true);
            const values = await form.validateFields();

            const payload = convertToFormData({ ...values, status: 'Draft' });
            let response;
            if (id) {
                response = await updateAdminProduct(id, payload);
            } else {
                response = await createAdminProduct(payload);
            }

            // Refresh form with latest data from server
            if (response && response.data) {
                form.setFieldsValue({
                    ...response.data,
                    new_photos: [] 
                });
                await queryClient.invalidateQueries(['admin-products']);
                message.success('Đã lưu nháp phân bổ xe thành công!');
            }
        } catch (error) {
            console.error("Form submit error:", error);
            message.error('Vui lòng kiểm tra lại các trường bắt buộc');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePublish = async () => {
        try {
            setIsSubmitting(true);
            const values = await form.validateFields();

            const payload = convertToFormData({ ...values, status: 'Published' });
            if (id) {
                await updateAdminProduct(id, payload);
            } else {
                await createAdminProduct(payload);
            }

            // Invalidate and show message
            await queryClient.invalidateQueries(['admin-products']);
            message.success('Xe mới đã được cập nhật lên Showroom!');

            // Navigate immediately but after the current promise chain
            // Use replace: true to ensure history is clean
            navigate('/admin/cars', { replace: true });

        } catch (error) {
            console.error("Form submit error:", error);
            message.error('Biểu mẫu còn thiếu thông tin hoặc có lỗi xảy ra!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        handleSaveDraft,
        handlePublish
    };
};
