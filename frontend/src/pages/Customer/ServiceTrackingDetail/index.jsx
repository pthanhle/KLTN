import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import SideNavBar from './components/Layout/SideNavBar';
import BottomNavBar from './components/Layout/BottomNavBar';
import DiagnosticTab from './components/Diagnostics/DiagnosticTab';
import QcTab from './components/QC_Testing/QcTab';
import OverviewTab from './components/Overview_Reception/OverviewTab';
import QuotationTab from './components/Quotations_Approval/QuotationTab';
import ProgressTab from './components/Progress_Tracking/ProgressTab';
import DeliveryTab from './components/Delivery_Invoices/DeliveryTab';
import { Skeleton } from 'antd';
import { useTrackingDetailLogic } from './hooks/useTrackingDetailLogic';

const ErrorState = ({ message, t }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center py-32 px-6 text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400 mb-2">
                    {t('error_title', 'Không thể tải dữ liệu')}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm leading-relaxed">
                    {message}
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                    <RefreshCw className="w-4 h-4" />
                    {t('error_retry', 'Thử lại')}
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 rounded-full bg-yellow-500 dark:bg-[#eab308] text-white dark:text-[#0A0A0B] text-sm font-bold hover:bg-yellow-600 dark:hover:bg-yellow-400 transition-colors"
                >
                    {t('error_back', 'Quay lại')}
                </button>
            </div>
        </div>
    );
};

const ServiceTrackingDetail = () => {
    const {
        isLoading,
        error,
        activeTab,
        setActiveTab,
        overviewData,
        diagnosticData,
        qcData,
        quotationData,
        setQuotationData,
        repairStatus,
        t,
    } = useTrackingDetailLogic();

    return (
        <div className="bg-slate-50 dark:bg-[#0A0A0B] text-slate-900 dark:text-[#dce1fb] min-h-screen flex flex-col lg:flex-row selection:bg-yellow-500 selection:text-[#0A0A0B] font-sans antialiased">
            <Helmet>
                <title>{t('page_tracking_detail', 'Tracking Dashboard | TT AUTO')}</title>
            </Helmet>

            <SideNavBar
                technician={diagnosticData?.technician}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                repairStatus={repairStatus}
            />

            <div className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-18rem)]">
                <main className="p-4 md:p-10 lg:p-16 w-full mx-auto max-w-7xl">
                    {isLoading ? (
                        <div className="space-y-10">
                            <Skeleton active paragraph={{ rows: 2 }} className="dark:opacity-20" />
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <Skeleton.Input active block style={{ height: '100px' }} />
                                <Skeleton.Input active block style={{ height: '100px' }} />
                                <Skeleton.Input active block style={{ height: '100px' }} />
                                <Skeleton.Input active block style={{ height: '100px' }} />
                            </div>
                            <Skeleton active paragraph={{ rows: 6 }} className="dark:opacity-20" />
                        </div>
                    ) : error ? (
                        <ErrorState message={error} t={t} />
                    ) : (
                        <>
                            {activeTab === 'overview' && <OverviewTab overviewData={overviewData} />}
                            {activeTab === 'diagnostics' && <DiagnosticTab diagnosticData={diagnosticData} />}
                            {activeTab === 'qc' && <QcTab qcData={qcData} />}
                            {activeTab === 'quotations' && (
                                <QuotationTab quotationData={quotationData} setQuotationData={setQuotationData} />
                            )}
                            {activeTab === 'progress' && <ProgressTab />}
                            {activeTab === 'delivery' && <DeliveryTab />}

                            {!['overview', 'diagnostics', 'qc', 'quotations', 'progress', 'delivery'].includes(activeTab) && (
                                <div className="flex items-center justify-center py-20 opacity-50 text-slate-500 uppercase font-bold tracking-widest text-sm">
                                    Feature coming soon: {activeTab}
                                </div>
                            )}
                        </>
                    )}
                </main>

                <div className="h-24 lg:hidden" />
                <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} repairStatus={repairStatus} />
            </div>
        </div>
    );
};

export default ServiceTrackingDetail;
