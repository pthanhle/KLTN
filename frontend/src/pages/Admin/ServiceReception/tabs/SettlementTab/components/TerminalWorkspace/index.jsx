import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptySettlementState } from './components/EmptySettlementState';
import { FinancePane } from './components/FinancePane';
import { HandoverPane } from './components/HandoverPane';
import { ActionControls } from './components/ActionControls';

const TerminalWorkspace = ({
    selectedBookingCode,
    activeTerminalData,
    isLoadingTerminal,
    isProcessingPayment,
    isClosingRO,
    onConfirmPayment,
    onPrintInvoice,
    onCloseRO,
    onBack
}) => {
    const { t } = useTranslation('adminServiceReception');

    if (!selectedBookingCode || (!activeTerminalData && !isLoadingTerminal)) {
        return <EmptySettlementState />;
    }

    return (
        <section className="flex-1 bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/20">
            <header className="p-6 bg-slate-50 dark:bg-[#1d1d20] border-b border-slate-200 dark:border-white/10 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <div>
                        <h2 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">
                            {t('settlement_terminal_title', 'Thanh Toán & Bàn Giao')}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">
                            RO Code: <span className="text-slate-900 dark:text-yellow-500 font-mono ml-1 font-bold">{activeTerminalData.id}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-6 bg-white dark:bg-[#141416] px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-widest font-bold">
                            {t('settlement_plate', 'Biển số')}
                        </span>
                        <span className="font-mono text-slate-900 dark:text-yellow-500 font-black text-lg">
                            {isLoadingTerminal ? '...' : activeTerminalData?.plateText}
                        </span>
                    </div>
                    <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-widest font-bold">
                            {t('settlement_customer', 'Khách hàng')}
                        </span>
                        <span className="text-slate-800 dark:text-white font-bold">
                            {isLoadingTerminal ? 'Đang tải...' : activeTerminalData?.customerNameText}
                        </span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 dark:bg-transparent custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative max-w-7xl mx-auto">
                    <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
                        {isLoadingTerminal ? (
                            <div className="animate-pulse flex flex-col gap-6">
                                <div className="h-[300px] bg-slate-200 dark:bg-white/5 rounded-xl"></div>
                                <div className="h-[200px] bg-slate-200 dark:bg-white/5 rounded-xl"></div>
                            </div>
                        ) : (
                            <>
                                <FinancePane
                                    invoiceItems={activeTerminalData.invoiceItems}
                                    financials={activeTerminalData.financials}
                                />
                                <HandoverPane
                                    kcsTasks={activeTerminalData.kcsTasks}
                                />
                            </>
                        )}
                    </div>

                    {/* Right Column: Actions (Sticky) */}
                    <div className="lg:col-span-4 xl:col-span-3 sticky top-0 flex justify-end">
                        <div className="w-full max-w-sm">
                            {isLoadingTerminal ? (
                                <div className="animate-pulse h-[250px] bg-slate-200 dark:bg-white/5 rounded-xl"></div>
                            ) : (
                                <ActionControls
                                    isPaid={activeTerminalData.isPaid}
                                    canPrint={activeTerminalData.canPrint}
                                    canCloseRO={activeTerminalData.canCloseRO}
                                    isProcessingPayment={isProcessingPayment}
                                    isClosingRO={isClosingRO}
                                    onConfirmPayment={onConfirmPayment}
                                    onPrintInvoice={onPrintInvoice}
                                    onCloseRO={onCloseRO}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TerminalWorkspace;
