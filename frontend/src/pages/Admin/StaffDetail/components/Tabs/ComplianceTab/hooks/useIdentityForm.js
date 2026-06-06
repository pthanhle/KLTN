import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { identitySchema } from '../schemas/editComplianceSchema';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';
import { message } from 'antd';

export const useIdentityForm = (staffId, data, t, onUpdateSuccess) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const methods = useForm({
        resolver: zodResolver(identitySchema),
        defaultValues: {
            idNumber: data?.idNumber || '',
            issueDate: data?.issueDate || '',
            issuePlace: data?.issuePlace || '',
            dob: data?.dob || '',
            pob: data?.pob || '',
            permanentAddress: data?.permanentAddress || '',
            currentAddress: data?.currentAddress || '',
        }
    });

    const { reset, handleSubmit } = methods;

    const handleEditClick = () => {
        reset({
            idNumber: data?.idNumber || '',
            issueDate: data?.issueDate || '',
            issuePlace: data?.issuePlace || '',
            dob: data?.dob || '',
            pob: data?.pob || '',
            permanentAddress: data?.permanentAddress || '',
            currentAddress: data?.currentAddress || '',
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
            await AdminStaffAPI.updateCompliance(staffId, { identity: values });
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
