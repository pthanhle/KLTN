import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useCarFormSubmit = (form) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSaveDraft = async () => {
        try {
            setIsSubmitting(true);
            const values = await form.validateFields();
            // Payload logic would go here
            console.log('Draft payload:', { ...values, status: 'Draft' });
            message.success('Đã lưu nháp phân phối xe thành công!');
        } catch (error) {
            message.error('Vui lòng kiểm tra lại các trường bắt buộc');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePublish = async () => {
        try {
            setIsSubmitting(true);
            const values = await form.validateFields();
            // Payload logic would go here
            console.log('Publish payload:', { ...values, status: 'Published' });
            message.success('Xe mới đã được cập nhật lên Showroom!');
            navigate('/admin/cars');
        } catch (error) {
            message.error('Biểu mẫu còn thiếu thông tin trước khi xuất bản!');
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
