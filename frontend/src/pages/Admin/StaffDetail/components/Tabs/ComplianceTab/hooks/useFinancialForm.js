import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { financialSchema } from '../schemas/editComplianceSchema';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';
import { message } from 'antd';

export const useFinancialForm = (staffId, data, t, onUpdateSuccess) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const methods = useForm({
        resolver: zodResolver(financialSchema),
        defaultValues: {
            bankAccount: data?.bankAccount || '',
            bankName: data?.bankName || '',
            bankBranch: data?.bankBranch || '',
            taxCode: data?.taxCode || '',
            insuranceCode: data?.insuranceCode || '',
        }
    });

    const { reset, handleSubmit } = methods;

    const handleEditClick = () => {
        reset({
            bankAccount: data?.bankAccount || '',
            bankName: data?.bankName || '',
            bankBranch: data?.bankBranch || '',
            taxCode: data?.taxCode || '',
            insuranceCode: data?.insuranceCode || '',
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const submitForm = async (values) => {
        setIsSubmitting(true);
        try {
            await AdminStaffAPI.updateCompliance(staffId, { financial: values });
            message.success({ content: t('adminStaffCompliance:msg_update_success', 'Cập nhật thông tin thành công!'), duration: 2 });
            queryClient.invalidateQueries({ queryKey: ['admin-staff-compliance', staffId] });
            setIsEditing(false);
        } catch (error) {
            message.error(error?.response?.data?.message || t('adminStaffCompliance:msg_update_error', 'Lỗi khi cập nhật dữ liệu.'));
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
