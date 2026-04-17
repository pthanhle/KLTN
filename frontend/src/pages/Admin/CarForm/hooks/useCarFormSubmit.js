import { useState } from 'react';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createAdminProduct, updateAdminProduct } from '../../../../services/api/adminProduct.api';

export const useCarFormSubmit = (form) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSaveDraft = async () => {
        try {
            setIsSubmitting(true);
            const values = await form.validateFields();
            
            const payload = { ...values, status: 'Draft' };
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
            
            const payload = { ...values, status: 'Published' };
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
