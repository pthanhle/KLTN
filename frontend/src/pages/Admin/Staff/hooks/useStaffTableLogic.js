import { useState, useMemo } from 'react';
import { mockStaffData } from '../data/mockStaffData';

export const useStaffTableLogic = (t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [isLoading, setIsLoading] = useState(false);

    // Filter logic based on mock data
    const filteredData = useMemo(() => {
        let result = [...mockStaffData];

        // 1. Role Filter
        if (filterRole !== 'ALL') {
            result = result.filter(staff => {
                if (filterRole === 'SALES') return staff.role.includes('SALES') || staff.role === 'SERVICE_ADVISOR';
                if (filterRole === 'TECHS') return staff.role.includes('TECHNICIAN') || staff.role === 'SHOP_FOREMAN';
                if (filterRole === 'INVENTORY') return staff.role.includes('INVENTORY') || staff.role === 'CASHIER';
                return true;
            });
        }

        // 2. Status Filter
        if (filterStatus !== 'ALL') {
            result = result.filter(staff => staff.status === filterStatus);
        }

        // 3. Search Filter
        if (searchTerm.trim()) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(staff => 
                staff.fullName.toLowerCase().includes(lowerSearch) ||
                staff.employeeId.toLowerCase().includes(lowerSearch) ||
                staff.department.toLowerCase().includes(lowerSearch)
            );
        }

        return result;
    }, [searchTerm, filterRole, filterStatus]);

    const breadcrumbItems = [
        { label: t('adminStaff:breadcrumb_staff', 'Nhân viên') }
    ];

    // Pagination state
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    const paginatedData = useMemo(() => {
        const startIndex = (pagination.current - 1) * pagination.pageSize;
        return filteredData.slice(startIndex, startIndex + pagination.pageSize);
    }, [filteredData, pagination]);

    // Update total when filtered data changes
    useMemo(() => {
        setPagination(prev => ({ ...prev, total: filteredData.length, current: 1 }));
    }, [filteredData.length]);

    const handleTableChange = (newPagination) => {
        setPagination({
            current: newPagination.current,
            pageSize: newPagination.pageSize,
            total: filteredData.length
        });
    };

    return {
        data: paginatedData,
        isLoading,
        searchTerm,
        setSearchTerm,
        filterRole,
        setFilterRole,
        filterStatus,
        setFilterStatus,
        breadcrumbItems,
        pagination,
        handleTableChange
    };
};
