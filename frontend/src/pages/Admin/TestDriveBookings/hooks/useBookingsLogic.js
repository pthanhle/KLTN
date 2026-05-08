import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { useAdminBookings } from '../../../../services/queries/testDriveBookingAdmin.queries';

export const useBookingsLogic = () => {
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        type: 'all',
        date: dayjs().format('DD/MM/YYYY'),
        page: 1,
        pageSize: 10
    });

    const { data: response, isLoading, error } = useAdminBookings(filters);

    const bookings = response?.data || [];
    const stats = response?.stats || { total: 0, pending: 0, home: 0, showroom: 0 };
    const pagination = response?.pagination || { current: 1, pageSize: 10, total: 0 };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ 
            ...prev, 
            [key]: value,
            ...(key !== 'page' ? { page: 1 } : {}) // Reset to page 1 on filter change
        }));
    };

    return {
        bookings,
        isLoading,
        error,
        filters,
        stats,
        pagination,
        handleFilterChange
    };
};
