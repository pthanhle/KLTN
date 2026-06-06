import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, notification } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCreateStaffSchema } from '../schemas/createStaffSchema';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateStaff = (onClose, t) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const schema = getCreateStaffSchema(t);
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            role: undefined,
            department: undefined,
        }
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const res = await AdminStaffAPI.createStaff({
                full_name: values.fullName,
                email: values.email,
                phone: values.phone,
                role_name: values.role,
                department: values.department || undefined,
            });

            const newStaff = res?.staff;
            const initialPassword = newStaff?.initialPassword;

            reset();
            if (onClose) onClose();

            queryClient.invalidateQueries({ queryKey: ['admin-staff'] });

            if (initialPassword) {
                notification.success({
                    message: 'Tạo tài khoản thành công',
                    description: 'Mật khẩu: ' + initialPassword + ' — Hãy lưu lại mật khẩu này!',
                    duration: 0,
                    placement: 'topRight',
                });
            } else {
                message.success('Tạo nhân viên thành công!');
            }

            if (newStaff?._id) navigate('/admin/staff/' + newStaff._id);

        } catch (error) {
            const msg = error?.response?.data?.message || 'Tạo nhân viên thất bại';
            message.error(msg);
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
