import { useState, useMemo, useEffect } from 'react';
import { mockStaffData } from '../../../../../Staff/data/mockStaffData';

export const useReassignLogic = (isOpen, currentStaffId) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSearchQuery('');
            setSelectedStaffId(null);
        }
    }, [isOpen]);

    const warehouseStaffList = useMemo(() => {
        return mockStaffData
            .filter(staff => staff.department === 'Logistics' || staff.role === 'INVENTORY_MGR')
            .map(staff => {
                const todoCount = staff.performance?.kanban?.todo?.length || 0;
                const inProgressCount = staff.performance?.kanban?.inProgress?.length || 0;
                const workloadCount = todoCount + inProgressCount;
                return {
                    ...staff,
                    workloadCount
                };
            });
    }, []);

    const filteredStaffList = useMemo(() => {
        if (!searchQuery.trim()) return warehouseStaffList;
        const query = searchQuery.toLowerCase();
        return warehouseStaffList.filter(staff =>
            staff.fullName.toLowerCase().includes(query) ||
            staff.employeeId.toLowerCase().includes(query)
        );
    }, [searchQuery, warehouseStaffList]);

    return {
        searchQuery,
        setSearchQuery,
        selectedStaffId,
        setSelectedStaffId,
        filteredStaffList,
        loading
    };
};
