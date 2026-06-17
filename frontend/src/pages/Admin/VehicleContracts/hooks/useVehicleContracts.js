import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useVehicleContractsQuery } from '../../../../services/queries/vehicleContract.queries';
import { useSocketContractNotifications } from '../../../../hooks/useSocketContractNotifications';
import { AdminStaffAPI } from '../../../../services/api/adminStaff.api';
import { calculateContractStats } from '../utils/contract.utils';
import dayjs from 'dayjs';

export const useVehicleContracts = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('search') || '';
    const statusFilter = searchParams.get('status') || 'all';
    const salesId = searchParams.get('salesId') || 'all';
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('limit') || '10', 10);

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const dateRange = startDateParam && endDateParam
        ? [dayjs(startDateParam), dayjs(endDateParam)]
        : null;

    const updateSearchParams = (key, value) => {
        setSearchParams(prev => {
            if (!value || value === 'all' || value === '') {
                prev.delete(key);
            } else {
                prev.set(key, value);
            }
            if (key !== 'page') prev.set('page', '1');
            return prev;
        }, { replace: true });
    };

    const setSearchTerm = (value) => updateSearchParams('search', value);
    const setStatusFilter = (value) => updateSearchParams('status', value);
    const setSalesId = (value) => updateSearchParams('salesId', value);
    const setDateRange = (dates) => {
        setSearchParams(prev => {
            if (!dates || dates.length !== 2) {
                prev.delete('startDate');
                prev.delete('endDate');
            } else {
                prev.set('startDate', dates[0].toISOString());
                prev.set('endDate', dates[1].toISOString());
            }
            prev.set('page', '1');
            return prev;
        }, { replace: true });
    };

    useSocketContractNotifications();

    const { data: staffData, isLoading: isLoadingStaff } = useQuery({
        queryKey: ['admin-staff-sales'],
        queryFn: () => AdminStaffAPI.getStaff({ role: 'sale', limit: 100 }),
        staleTime: 5 * 60 * 1000,
    });

    const staffList = staffData?.data?.staff || staffData?.staff || [];

    const { data: contractsResponse, isLoading } = useVehicleContractsQuery({
        status: statusFilter === 'all' ? undefined : statusFilter,
        salesId: salesId === 'all' ? undefined : salesId,
        startDate: dateRange?.[0]?.toISOString(),
        endDate: dateRange?.[1]?.toISOString(),
        search: searchTerm,
        page: currentPage,
        limit: pageSize
    });

    const contracts = contractsResponse?.data || [];
    const total = contractsResponse?.pagination?.total || 0;
    const stats = contractsResponse?.stats || calculateContractStats(contracts);

    const handlePageChange = (page, size) => {
        setSearchParams(prev => {
            prev.set('page', page.toString());
            if (size !== pageSize) {
                prev.set('limit', size.toString());
            }
            return prev;
        });
    };

    const handleViewDetails = (contract) => {
        navigate(`/admin/vehicle-contracts/${contract._id}`);
    };

    const handleApproveClick = (contract) => {
        navigate(`/admin/vehicle-contracts/${contract._id}`);
    };

    return {
        state: {
            searchTerm,
            statusFilter,
            dateRange,
            salesId,
            currentPage,
            pageSize,
            total,
            contracts,
            stats,
            isLoading,
            staffList,
            isLoadingStaff
        },
        actions: {
            setSearchTerm,
            setStatusFilter,
            setDateRange,
            setSalesId,
            handlePageChange,
            handleViewDetails,
            handleApproveClick
        }
    };
};
