import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerContracts } from './hooks/useCustomerContracts';
import { useContractStats } from './hooks/useContractStats';
import { ContractOverviewCard } from './components/ContractOverviewCard';
import ContractTable from '../../../../VehicleContracts/components/ContractTable';
import { ContractApprovalDrawer } from '../../../../VehicleContracts/components/ContractApprovalDrawer';

export const CustomerContractsTab = ({ customerId }) => {
    const { t } = useTranslation('adminCustomerDetail');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    const { 
        data, 
        total, 
        isLoading, 
        pagination, 
        handleTableChange 
    } = useCustomerContracts(customerId);

    const { stats: contractStats, isLoading: isStatsLoading } = useContractStats(customerId);

    return (
        <div className="space-y-6">
            <ContractOverviewCard stats={contractStats} isLoading={isStatsLoading} t={t} />

            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-slate-200 dark:border-white/5 p-6">
                <ContractTable
                    data={data}
                    isLoading={isLoading}
                    pagination={{ ...pagination, total }}
                    onChange={handleTableChange}
                    onViewDetails={(record) => {
                        setEditData(record);
                        setIsModalVisible(true);
                    }}
                />
                <ContractApprovalDrawer
                    open={isModalVisible}
                    contract={editData}
                    onClose={() => {
                        setIsModalVisible(false);
                        setEditData(null);
                    }}
                />
            </div>
        </div>
    );
};
