import React from 'react';
import { Helmet } from 'react-helmet-async';
import SideNavBar from './components/Layout/SideNavBar';
import TopAppBar from './components/Layout/TopAppBar';
import BottomNavBar from './components/Layout/BottomNavBar';
import DiagnosticTab from './components/Diagnostics/DiagnosticTab';
import QcTab from './components/QC_Testing/QcTab';
import OverviewTab from './components/Overview_Reception/OverviewTab';
import QuotationTab from './components/Quotations_Approval/QuotationTab';
import ProgressTab from './components/Progress_Tracking/ProgressTab';
import DeliveryTab from './components/Delivery_Invoices/DeliveryTab';
import { Skeleton } from 'antd';
import { useTrackingDetailLogic } from './hooks/useTrackingDetailLogic';

const ServiceTrackingDetail = () => {
    const { isLoading, activeTab, setActiveTab, overviewData, diagnosticData, qcData, quotationData, setQuotationData, t } = useTrackingDetailLogic();

    return (
        <div className="bg-slate-50 dark:bg-[#0A0A0B] text-slate-900 dark:text-[#dce1fb] min-h-screen flex flex-col lg:flex-row selection:bg-yellow-500 selection:text-[#0A0A0B] font-sans antialiased">
            <Helmet>
                <title>{t('page_tracking_detail', 'Tracking Dashboard | TT AUTO')}</title>
            </Helmet>

            {/* Desktop Side Navigation */}
            <SideNavBar technician={diagnosticData?.technician} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col relative w-full lg:w-[calc(100%-18rem)]">
                {/* Main Content Area */}
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
                    ) : (
                        <>
                            {activeTab === 'overview' && <OverviewTab overviewData={overviewData} />}
                            {activeTab === 'diagnostics' && <DiagnosticTab diagnosticData={diagnosticData} />}
                            {activeTab === 'qc' && <QcTab qcData={qcData} />}
                            {activeTab === 'quotations' && <QuotationTab quotationData={quotationData} setQuotationData={setQuotationData} />}
                            {activeTab === 'progress' && <ProgressTab />}
                            {activeTab === 'delivery' && <DeliveryTab />}
                            
                            {/* Placeholders for future tabs */}
                            {!['overview', 'diagnostics', 'qc', 'quotations', 'progress', 'delivery'].includes(activeTab) && (
                                <div className="flex items-center justify-center py-20 opacity-50 text-slate-500 uppercase font-bold tracking-widest text-sm">
                                    Feature coming soon: {activeTab}
                                </div>
                            )}
                        </>
                    )}
                </main>

                <div className="h-24 lg:hidden"></div>
                <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
    );
};

export default ServiceTrackingDetail;
