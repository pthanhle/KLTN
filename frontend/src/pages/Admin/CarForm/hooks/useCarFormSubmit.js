import { useState } from 'react';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createAdminProduct, updateAdminProduct } from '../../../../services/api/adminProduct.api';

export const useCarFormSubmit = (form) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const convertToFormData = (values) => {
        const formData = new FormData();
        
        Object.keys(values).forEach(key => {
            const value = values[key];
            
            // 1. Specific File handling for Hero Image
            if (key === 'image' && value instanceof File) {
                formData.append('image', value);
            } 
            // 2. Specific File handling for Gallery Photos (temporary field we'll use)
            else if (key === 'new_photos' && Array.isArray(value)) {
                value.forEach(file => {
                    if (file instanceof File) {
                        formData.append('photos', file);
                    }
                });
            }
            // 3. Handle complex objects/arrays (stringify for multipart)
            else if (value !== null && typeof value === 'object') {
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
            if (id) {
                await updateAdminProduct(id, payload);
            } else {
                await createAdminProduct(payload);
            }
            
            message.success('Đã lưu nháp phân phối xe thành công!');
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
            
            message.success('Xe mới đã được cập nhật lên Showroom!');
            navigate('/admin/cars');
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
