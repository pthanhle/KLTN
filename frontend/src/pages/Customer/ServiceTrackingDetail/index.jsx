import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, CreditCard } from 'lucide-react';

const STATUS_META = {
    RECEIVED:      { label: 'Đã tiếp nhận', color: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-400' },
    DIAGNOSING:    { label: 'Đang chẩn đoán', color: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-400' },
    QUOTING:       { label: 'Đang lập báo giá', color: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-400 animate-pulse' },
    WAITING_PARTS: { label: 'Đang chuẩn bị phụ tùng', color: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-400 animate-pulse' },
    IN_PROGRESS:   { label: 'Đang thi công', color: 'text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500 animate-pulse' },
    QC_TESTING:    { label: 'Đang kiểm định chất lượng', color: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500 animate-pulse' },
    COMPLETED:     { label: 'Hoàn thành — Sẵn sàng nhận xe', color: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
    CANCELLED:     { label: 'Đã huỷ', color: 'text-red-600 dark:text-red-400', dot: 'bg-red-400' },
};
import SideNavBar from './components/Layout/SideNavBar';
import BottomNavBar from './components/Layout/BottomNavBar';
import DiagnosticTab from './components/Diagnostics/DiagnosticTab';
import QcTab from './components/QC_Testing/QcTab';
import OverviewTab from './components/Overview_Reception/OverviewTab';
import QuotationTab from './components/Quotations_Approval/QuotationTab';
import ProgressTab from './components/Progress_Tracking/ProgressTab';
import DeliveryTab from './components/Delivery_Invoices/DeliveryTab';
import { Skeleton, message } from 'antd';
import { useTrackingDetailLogic } from './hooks/useTrackingDetailLogic';
import { CheckoutAPI } from '../../../services/api/checkout';

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
        progressData,
        setProgressData,
        repairStatus,
        progressId,
        t,
    } = useTrackingDetailLogic();

    const [isFinalPaymentRedirecting, setIsFinalPaymentRedirecting] = useState(false);
    const handleFinalPayment = useCallback(async () => {
        if (!progressId || isFinalPaymentRedirecting) return;
        setIsFinalPaymentRedirecting(true);
        try {
            const response = await CheckoutAPI.createServiceFinalPayment(progressId);
            if (response?.url) {
                window.location.href = response.url;
            } else {
                throw new Error(response?.message || 'Không thể tạo liên kết thanh toán');
            }
        } catch (err) {
            message.error(err?.response?.data?.message || err?.message || 'Có lỗi khi kết nối VNPay');
            setIsFinalPaymentRedirecting(false);
        }
    }, [progressId, isFinalPaymentRedirecting]);

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
                    {!isLoading && !error && repairStatus && (() => {
                        const meta = STATUS_META[repairStatus];
                        if (!meta) return null;
                        return (
                            <div className="flex items-center gap-2 mb-6 animate-in fade-in duration-500">
                                <span className={`inline-block w-2 h-2 rounded-full ${meta.dot}`} />
                                <span className={`text-xs font-bold uppercase tracking-[0.15em] ${meta.color}`}>
                                    {meta.label}
                                </span>
                            </div>
                        );
                    })()}
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
                            {activeTab === 'progress' && <ProgressTab progressData={progressData} setProgressData={setProgressData} />}
                            {activeTab === 'delivery' && <DeliveryTab />}

                            {!['overview', 'diagnostics', 'qc', 'quotations', 'progress', 'delivery'].includes(activeTab) && (
                                <div className="flex items-center justify-center py-20 opacity-50 text-slate-500 uppercase font-bold tracking-widest text-sm">
                                    Feature coming soon: {activeTab}
                                </div>
                            )}
                        </>
                    )}
                </main>

                {/* Final payment bar — shown when QC done */}
                {repairStatus === 'QC_TESTING' && activeTab === 'qc' && progressId && !isLoading && (
                    <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 shadow-2xl z-30 lg:hidden">
                        <button
                            onClick={handleFinalPayment}
                            disabled={isFinalPaymentRedirecting}
                            className="w-full py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            <CreditCard size={18} />
                            {isFinalPaymentRedirecting ? 'Đang chuyển hướng...' : 'Thanh toán phần còn lại qua VNPay'}
                        </button>
                    </div>
                )}

                {/* Desktop final payment bar */}
                {repairStatus === 'QC_TESTING' && activeTab === 'qc' && progressId && !isLoading && (
                    <div className="hidden lg:block mx-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-7xl mx-auto bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-yellow-700 dark:text-yellow-400 mb-1">
                                    Xe đã hoàn thành kiểm định QC
                                </p>
                                <p className="text-sm text-slate-600 dark:text-[#a0a0a0]">
                                    Vui lòng thanh toán phần còn lại để nhận xe.
                                </p>
                            </div>
                            <button
                                onClick={handleFinalPayment}
                                disabled={isFinalPaymentRedirecting}
                                className="flex-shrink-0 px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-70 text-slate-900 font-bold text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                            >
                                <CreditCard size={18} />
                                {isFinalPaymentRedirecting ? 'Đang chuyển hướng...' : 'Thanh toán qua VNPay'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="h-24 lg:hidden" />
                <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} repairStatus={repairStatus} />
            </div>
        </div>
    );
};

export default ServiceTrackingDetail;
