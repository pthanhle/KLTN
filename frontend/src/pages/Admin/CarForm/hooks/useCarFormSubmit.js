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
    // Tightened to ONLY return real binary data to ensure FormData works correctly.
    const getRealFile = (val) => {
        if (!val) return null;
        if (val instanceof File || val instanceof Blob) return val;
        if (val.originFileObj instanceof File || val.originFileObj instanceof Blob) return val.originFileObj;
        if (val.file instanceof File || val.file instanceof Blob) return val.file;
        // DO NOT return metadata objects {uid, name, etc} as they break FormData binary uploads
        return null;
    };

    const convertToFormData = (values) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const value = values[key];

            if (key === 'image') {
                const heroFile = getRealFile(value);
                if (heroFile) {
                    formData.append('image', heroFile);
                } else if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('blob:'))) {
                    formData.append('image', value);
                }
                return;
            }

            if (key === 'new_photos' && Array.isArray(value)) {
                value.forEach(item => {
                    const photoFile = getRealFile(item);
                    if (photoFile) {
                        formData.append('photos', photoFile);
                    }
                });
                return;
            }

            if (value !== null && typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob)) {
                formData.append(key, JSON.stringify(value));
            }
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

            await queryClient.invalidateQueries(['admin-products']);
            message.success('Xe mới đã được cập nhật lên Showroom!');

            // Use replace to avoid sticky history entries that cause back-button loops
            window.location.replace('/admin/cars');

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
