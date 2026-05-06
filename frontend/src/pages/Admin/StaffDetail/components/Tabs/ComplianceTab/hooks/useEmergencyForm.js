import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emergencySchema } from '../schemas/editComplianceSchema';
import { updateMockCompliance } from '../data/mockComplianceData';
import { message } from 'antd';

export const useEmergencyForm = (staffId, data, t, onUpdateSuccess) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm({
        resolver: zodResolver(emergencySchema),
        defaultValues: {
            contactName: data?.contactName || '',
            relation: data?.relation || '',
            phone: data?.phone || '',
            address: data?.address || ''
        }
    });

    const { reset, handleSubmit } = methods;

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const handleEditClick = () => setIsEditing(true);

    const submitForm = async (values) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            const updatedData = updateMockCompliance(staffId, { emergency: values });
            message.success({
                content: t('adminStaffCompliance:msg_update_success', 'Cập nhật thông tin thành công!'),
                duration: 2
            });
            if(onUpdateSuccess) onUpdateSuccess(updatedData);
            setIsEditing(false);
        } catch (error) {
            message.error(t('adminStaffCompliance:msg_update_error', 'Lỗi khi cập nhật dữ liệu.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        methods,
        isEditing,
        isSubmitting,
        handleEditClick,
        handleCancel,
        handleEditSubmit: handleSubmit(submitForm)
    };
};
