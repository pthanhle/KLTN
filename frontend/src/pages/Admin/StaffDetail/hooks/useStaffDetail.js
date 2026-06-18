import { useState } from 'react';
import { App } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';

export const useStaffDetail = (id) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const { message, modal } = App.useApp();

    const { data: staff, isLoading } = useQuery({
        queryKey: ['admin-staff-detail', id],
        queryFn: async () => {
            const res = await AdminStaffAPI.getStaffById(id);
            return res;
        },
        enabled: !!id,
        retry: 1,
    });

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
    };

    const getKpiDisplay = () => {
        if (!staff) return 'N/A';
        if (staff.kpiType === 'SALARY_ONLY') return 'Không có hoa hồng';
        if (staff.kpiType === 'COMMISSION') return `${staff.kpiValue}% Hoa hồng`;
        if (staff.kpiType === 'FLAT_RATE') return `${formatCurrency(staff.kpiValue)} / Giờ Công`;
        return 'N/A';
    };

    const handleEditProfile = () => setIsEditModalOpen(true);

    const handleDeactivateAccount = () => {
        modal.confirm({
            title: 'Xác nhận vô hiệu hoá',
            content: `Bạn có chắc muốn vô hiệu hoá tài khoản của ${staff?.fullName}?`,
            okText: 'Vô hiệu hoá',
            okType: 'danger',
            cancelText: 'Huỷ',
            className: 'custom-admin-modal',
            wrapClassName: 'custom-admin-modal-wrap',
            onOk: async () => {
                setIsDeactivating(true);
                try {
                    await AdminStaffAPI.deleteStaff(id);
                    message.success('Đã vô hiệu hoá tài khoản');
                    queryClient.invalidateQueries({ queryKey: ['admin-staff-detail', id] });
                    queryClient.invalidateQueries({ queryKey: ['admin-staff'] });
                } catch (err) {
                    message.error(err?.response?.data?.message || 'Có lỗi xảy ra');
                } finally {
                    setIsDeactivating(false);
                }
            }
        });
    };

    return {
        staff,
        isLoading,
        isUpdating,
        isDeactivating,
        isEditModalOpen,
        setIsEditModalOpen,
        formatCurrency,
        getKpiDisplay,
        handleEditProfile,
        handleDeactivateAccount
    };
};
