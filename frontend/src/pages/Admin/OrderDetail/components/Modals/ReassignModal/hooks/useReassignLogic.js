import { useState, useMemo, useEffect } from 'react';
import { adminOrderApi } from '@/services/api/adminOrder.api';

export const useReassignLogic = (isOpen, currentStaffId) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        if (!isOpen) return;
        setSearchQuery('');
        setSelectedStaffId(null);
        setLoading(true);
        adminOrderApi.getInventoryStaff()
            .then(data => setStaffList(Array.isArray(data) ? data : []))
            .catch(() => setStaffList([]))
            .finally(() => setLoading(false));
    }, [isOpen]);

    const filteredStaffList = useMemo(() => {
        if (!searchQuery.trim()) return staffList;
        const query = searchQuery.toLowerCase();
        return staffList.filter(staff =>
            (staff.fullName || '').toLowerCase().includes(query) ||
            (staff.employeeId || '').toLowerCase().includes(query)
        );
    }, [searchQuery, staffList]);

    return {
        searchQuery,
        setSearchQuery,
        selectedStaffId,
        setSelectedStaffId,
        filteredStaffList,
        loading
    };
};
