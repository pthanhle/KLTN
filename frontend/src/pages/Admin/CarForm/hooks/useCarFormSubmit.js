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

    const getRealFile = (val) => {
        if (!val) return null;

        const isBinary = (obj) => {
            const s = Object.prototype.toString.call(obj);
            return s === '[object File]' || s === '[object Blob]';
        };

        if (isBinary(val)) return val;

        if (val.originFileObj) {
            if (isBinary(val.originFileObj)) return val.originFileObj;
            if (typeof val.originFileObj.size === 'number') return val.originFileObj;
        }

        if (val.file) {
            if (isBinary(val.file)) return val.file;
            if (typeof val.file.size === 'number') return val.file;
        }

        if (typeof val.size === 'number' && typeof val.type === 'string' && (val.name || val.lastModified)) {
            return val;
        }

        return null;
    };

    const convertToFormData = (values) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const value = values[key];

            if (key === 'image') {
                const heroFile = getRealFile(value);
                if (heroFile) {
                    const fileName = heroFile.name || 'hero-image.png';
                    formData.append('image', heroFile, fileName);
                } else if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('/') || value.startsWith('blob:'))) {
                    formData.append('image', value);
                }
                return;
            }

            if (key === 'new_photos' && Array.isArray(value)) {
                value.forEach((item, index) => {
                    const photoFile = getRealFile(item);
                    if (photoFile) {
                        const fileName = photoFile.name || `photo-${index}.png`;
                        formData.append('photos', photoFile, fileName);
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
