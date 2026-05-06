import { useState, useEffect } from 'react';
import { mockStaffData } from '../../Staff/data/mockStaffData';

export const useStaffDetail = (id) => {
    const [staff, setStaff] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        const fetchStaffDetail = async () => {
            try {
                // Tương lai thay bằng: const response = await axios.get(`/api/staff/${id}`);
                await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency

                const found = mockStaffData.find(s => s._id === id);
                if (isMounted) {
                    if (found) {
                        setStaff(found);
                    } else {
                        setError('Staff not found');
                        setStaff(null);
                    }
                }
            } catch (err) {
                if (isMounted) setError('Failed to fetch data');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchStaffDetail();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const getKpiDisplay = () => {
        if (!staff) return 'N/A';
        if (staff.kpiType === 'SALARY_ONLY') return 'N/A';
        if (staff.kpiType === 'COMMISSION') return `${staff.kpiValue}% Hoa hồng`;
        if (staff.kpiType === 'FLAT_RATE') return `${formatCurrency(staff.kpiValue)} / Giờ Công`;
        return 'N/A';
    };

    const handleEditProfile = async () => {
        setIsUpdating(true);
        try {
            // Tương lai thay bằng: await axios.put(`/api/staff/${id}`, formData);
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
            import('antd').then(({ message }) => {
                message.success('Đã lưu hồ sơ (Mô phỏng API)');
            });
        } catch (err) {
            import('antd').then(({ message }) => message.error('Có lỗi xảy ra'));
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeactivateAccount = async () => {
        setIsDeactivating(true);
        try {
            // Tương lai thay bằng: await axios.patch(`/api/staff/${id}/deactivate`);
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
            import('antd').then(({ message }) => {
                message.warning('Tính năng vô hiệu hoá tài khoản cần quyền Quản Trị Cấp Cao (Mô phỏng API)');
            });
        } catch (err) {
            import('antd').then(({ message }) => message.error('Có lỗi xảy ra'));
        } finally {
            setIsDeactivating(false);
        }
    };

    return {
        staff,
        isLoading,
        error,
        isUpdating,
        isDeactivating,
        formatCurrency,
        getKpiDisplay,
        handleEditProfile,
        handleDeactivateAccount
    };
};
