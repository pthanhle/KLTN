import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContractHeader from './components/ContractHeader';
import ContractStats from './components/ContractStats';
import ContractToolbar from './components/ContractToolbar';
import ContractTable from './components/ContractTable';
import { ContractApprovalDrawer } from './components/ContractApprovalDrawer';
import { useVehicleContractsQuery } from '../../../services/queries/vehicleContract.queries';
import { useSocketContractNotifications } from '../../../hooks/useSocketContractNotifications';

const VehicleContractsPage = () => {
    const { t } = useTranslation('adminVehicleContracts');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedContract, setSelectedContract] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useSocketContractNotifications();

    const { data: contractsResponse, isLoading } = useVehicleContractsQuery({
        status: statusFilter === 'all' ? undefined : statusFilter,
        search: searchTerm,
        limit: 100
    });

    const contracts = contractsResponse?.data || [];
    
    const stats = contractsResponse?.stats || {
        total: contracts.length,
        pending: contracts.filter(c => c.status === 'pending_approval' || c.status === 'contract_pending').length,
        completed: contracts.filter(c => c.status === 'paid' || c.status === 'delivered').length,
        totalRevenue: contracts.filter(c => c.status === 'paid' || c.status === 'delivered').reduce((sum, c) => sum + (c.final_price || 0), 0)
    };

    const handleViewDetails = (contract) => {
        setSelectedContract(contract);
        setIsDrawerOpen(true);
    };

    const handleApproveClick = (contract) => {
        setSelectedContract(contract);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedContract(null), 300);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <ContractHeader />
            
            <ContractStats stats={stats} loading={isLoading} />
            
            <ContractToolbar 
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
            />

            <ContractTable 
                data={contracts} 
                isLoading={isLoading} 
                onViewDetails={handleViewDetails}
                onApprove={handleApproveClick}
            />

            <ContractApprovalDrawer
                open={isDrawerOpen}
                contract={selectedContract}
                onClose={handleDrawerClose}
            />
        </div>
    );
};

export default VehicleContractsPage;
