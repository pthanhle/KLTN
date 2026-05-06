import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCreateStaffSchema } from '../schemas/createStaffSchema';
import { addMockStaff } from '../data/mockStaffData';

export const useCreateStaff = (onClose, t) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const schema = getCreateStaffSchema(t);
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            role: undefined,
            department: undefined
        }
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const newStaff = addMockStaff(values);

            message.success({
                content: t('adminStaffCreate:msg_success_desc', 'Đang chuyển hướng đến trang Hồ sơ chi tiết...'),
                duration: 2
            });

            reset();
            if (onClose) onClose();

            navigate(`/admin/staff/${newStaff._id}`);

        } catch (error) {
            message.error("Failed to create staff.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        methods,
        isSubmitting,
        handleCreateSubmit: handleSubmit(onSubmit),
        resetForm: reset
    };
};
