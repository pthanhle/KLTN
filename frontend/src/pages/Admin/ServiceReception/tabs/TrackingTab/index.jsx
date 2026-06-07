import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrackingTab } from './hooks/useTrackingTab';
import TrackingFilterBar from './components/TrackingFilterBar';
import TrackingTable from './components/TrackingTable';

const TrackingTab = () => {
    const {
        t,
        isLoading,
        searchTerm,
        setSearchTerm,
        stageFilter,
        setStageFilter,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        paginatedData,
        totalResults,
        stageOptions,
        statusOptions
    } = useTrackingTab();

    const navigate = useNavigate();

    const handleCustomerClick = (progressId) => {
        navigate(`/admin/services/reception/${progressId}`);
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden mx-6 mb-6 gap-6 animate-in fade-in duration-500">
            <TrackingFilterBar
                t={t}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                stageFilter={stageFilter}
                setStageFilter={setStageFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                stageOptions={stageOptions}
                statusOptions={statusOptions}
            />

            <TrackingTable
                t={t}
                isLoading={isLoading}
                paginatedData={paginatedData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalResults={totalResults}
                onCustomerClick={handleCustomerClick}
            />
        </div>
    );
};

export default TrackingTab;
