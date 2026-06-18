import React from 'react';
import ContractHeader from './components/ContractHeader';
import ContractStats from './components/ContractStats';
import ContractToolbar from './components/ContractToolbar';
import ContractTable from './components/ContractTable';
import { useVehicleContracts } from './hooks/useVehicleContracts';

const VehicleContractsPage = () => {
    const { state, actions } = useVehicleContracts();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            <ContractHeader />
            
            <ContractStats stats={state.stats} loading={state.isLoading} />
            
            <ContractToolbar 
                searchTerm={state.searchTerm}
                onSearch={actions.setSearchTerm}
                statusFilter={state.statusFilter}
                onStatusFilter={actions.setStatusFilter}
                dateRange={state.dateRange}
                onDateRange={actions.setDateRange}
                salesId={state.salesId}
                onSalesId={actions.setSalesId}
                staffList={state.staffList}
                isLoadingStaff={state.isLoadingStaff}
            />

            <ContractTable 
                data={state.contracts} 
                isLoading={state.isLoading} 
                total={state.total}
                currentPage={state.currentPage}
                pageSize={state.pageSize}
                onPageChange={actions.handlePageChange}
                onViewDetails={actions.handleViewDetails}
                onApprove={actions.handleApproveClick}
            />
        </div>
    );
};

export default VehicleContractsPage;
