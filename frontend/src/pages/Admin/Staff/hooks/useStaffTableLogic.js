import { useState, useCallback, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { AdminStaffAPI } from '@/services/api/adminStaff.api';
import { message } from 'antd';

export const useStaffTableLogic = (t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterDepartment, setFilterDepartment] = useState('ALL');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const { data: apiData, isLoading, isError } = useQuery({
        queryKey: ['admin-staff', searchTerm, filterRole, filterStatus, filterDepartment, pagination.current, pagination.pageSize],
        queryFn: async () => {
            const params = {
                page: pagination.current,
                limit: pagination.pageSize,
                search: searchTerm,
            };
            if (filterRole !== 'ALL') params.role = filterRole;
            if (filterStatus !== 'ALL') params.status = filterStatus;
            if (filterDepartment !== 'ALL') params.department = filterDepartment;
            const res = await AdminStaffAPI.getStaff(params);
            return res;
        },
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (isError) message.error('Không thể tải danh sách nhân viên');
    }, [isError]);

    const staffList = apiData?.staff || [];
    const paginationInfo = {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: apiData?.pagination?.total || 0,
    };

    const handleTableChange = useCallback((newPagination) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        }));
    }, []);

    const breadcrumbItems = [
        { label: t('adminStaff:breadcrumb_staff', 'Nhân viên') }
    ];

    return {
        data: staffList,
        isLoading,
        searchTerm,
        setSearchTerm: (val) => { setSearchTerm(val); setPagination(p => ({ ...p, current: 1 })); },
        filterRole,
        setFilterRole: (val) => { setFilterRole(val); setPagination(p => ({ ...p, current: 1 })); },
        filterStatus,
        setFilterStatus: (val) => { setFilterStatus(val); setPagination(p => ({ ...p, current: 1 })); },
        filterDepartment,
        setFilterDepartment: (val) => { setFilterDepartment(val); setPagination(p => ({ ...p, current: 1 })); },
        breadcrumbItems,
        pagination: paginationInfo,
        handleTableChange
    };
};
