import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StaffHeader } from './components/StaffHeader';
import { StaffToolbar } from './components/StaffToolbar';
import { StaffTable } from './components/Table';
import { useStaffTableLogic } from './hooks/useStaffTableLogic';

const StaffManagement = () => {
    const { t } = useTranslation(['adminStaff', 'common']);
    const navigate = useNavigate();

    const {
        data,
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
    } = useStaffTableLogic(t);

    return (
        <div className="w-full flex justify-center pb-20 animate-in fade-in duration-500">
            <div className="w-full max-w-[1400px]">

                <StaffHeader
                    t={t}
                    breadcrumbItems={breadcrumbItems}
                    onAddStaff={() => console.log('Open Add Staff Modal/Drawer')}
                />

                <StaffToolbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterRole={filterRole}
                    setFilterRole={setFilterRole}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    t={t}
                />

                <StaffTable
                    data={data}
                    isLoading={isLoading}
                    t={t}
                    navigate={navigate}
                    paginationInfo={pagination}
                    onChange={handleTableChange}
                />

            </div>
        </div>
    );
};

export default StaffManagement;