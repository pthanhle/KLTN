import { useState } from 'react';
import { useVehicleContractsQuery } from '../../../../../../../services/queries/vehicleContract.queries';

export const useCustomerContracts = (customerId) => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [sortData, setSortData] = useState({ field: 'createdAt', order: 'desc' });

    const { data: response, isLoading } = useVehicleContractsQuery({
        customerId,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sortData.field || 'createdAt',
        order: sortData.order === 'ascend' ? 'asc' : 'desc'
    });

    const handleTableChange = (newPagination, filters, sorter) => {
        if (sorter && sorter.field) {
            setSortData(sorter);
        }
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });
    };

    return {
        data: response?.data || [],
        total: response?.total || 0,
        isLoading,
        pagination,
        handleTableChange
    };
};
