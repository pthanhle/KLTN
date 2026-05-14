import React from 'react';
import { useRODetailLogic } from './hooks/useRODetailLogic';
import RODetailSkeleton from './components/RODetailSkeleton';
import HeaderPanel from './components/HeaderPanel';
import ExecutionRoadmap from './components/ExecutionRoadmap';
import DiagnosticSummary from './components/DiagnosticSummary';
import FinancialLedger from './components/FinancialLedger';
import LogisticsInventory from './components/LogisticsInventory';
import QCQualityGates from './components/QCQualityGates';

const AdminServiceReceptionDetailPage = () => {
    const { bookingCode, isLoading, roData } = useRODetailLogic();

    if (isLoading || !roData) {
        return <RODetailSkeleton />;
    }

    const { overview, diagnostic, quotation, progress, qc } = roData;

    return (
        <div className="flex flex-col gap-6 text-slate-900 dark:text-[#dce1fb] w-full min-h-screen pb-10">

            <HeaderPanel
                bookingCode={bookingCode}
                overviewData={overview}
                quotationData={quotation}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.85fr_1fr] gap-6 items-start">
                <div className="flex flex-col gap-6">
                    <ExecutionRoadmap progressData={progress} />
                </div>

                <div className="flex flex-col gap-6 h-full sticky top-6">
                    <QCQualityGates qcData={qc} />
                    <LogisticsInventory progressData={progress} />
                </div>
            </div>

            <div className="flex flex-col gap-6 w-full mt-2">
                <DiagnosticSummary diagnosticData={diagnostic} />
                <FinancialLedger quotationData={quotation} />
            </div>

        </div>
    );
};

export default AdminServiceReceptionDetailPage;
