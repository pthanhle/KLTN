import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useRODetailLogic } from './hooks/useRODetailLogic';
import RODetailSkeleton from './components/RODetailSkeleton';
import HeaderPanel from './components/HeaderPanel';
import ExecutionRoadmap from './components/ExecutionRoadmap';
import DiagnosticSummary from './components/DiagnosticSummary';
import FinancialLedger from './components/FinancialLedger';
import LogisticsInventory from './components/LogisticsInventory';
import QCQualityGates from './components/QCQualityGates';

const AdminServiceReceptionDetailPage = () => {
    const navigate = useNavigate();
    const { bookingCode, sequenceNumber, isLoading, error, roData } = useRODetailLogic();

    if (isLoading) return <RODetailSkeleton />;

    if (error || !roData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">Không thể tải dữ liệu</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm">{error || 'Không tìm thấy đơn RO'}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" /> Thử lại
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2.5 rounded-full bg-yellow-500 text-white text-sm font-bold hover:bg-yellow-600 transition-colors"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    const { overview, diagnostic, quotation, progress, qc } = roData;

    return (
        <div className="flex flex-col gap-6 text-slate-900 dark:text-[#dce1fb] w-full min-h-screen pb-10">

            <HeaderPanel
                bookingCode={bookingCode}
                sequenceNumber={sequenceNumber}
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
