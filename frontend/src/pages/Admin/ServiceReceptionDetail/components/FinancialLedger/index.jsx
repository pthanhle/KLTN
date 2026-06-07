import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Printer } from 'lucide-react';
import { Modal, Button } from 'antd';
import StatusBanner from './StatusBanner';
import LedgerTable from './LedgerTable';
import EmptyLedger from './EmptyLedger';

const FinancialLedger = ({ quotationData }) => {
    const { t } = useTranslation('adminRODetail');
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

    if (!quotationData || !quotationData.items) {
        return <EmptyLedger status={quotationData?.status || 'PENDING'} />;
    }

    const { status, items, summary, payment_terms } = quotationData;
    const enrichedSummary = {
        ...summary,
        deposit_amount: payment_terms?.deposit_amount || 0,
        remaining_amount: payment_terms?.remaining_amount || 0,
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <StatusBanner status={status} />

            {/* Ledger Table Container */}
            <div className="bg-white dark:bg-[#141416] rounded-xl border border-slate-200 dark:border-white/5 flex-1 flex flex-col overflow-hidden shadow-sm">
                <div className="p-4 md:p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-[#1a1a1c]">
                    <h2 className="text-xs font-bold text-slate-500 dark:text-[#d3c5ac] flex items-center gap-2 uppercase tracking-widest">
                        <FileText className="w-4 h-4" />
                        {t('panel_ledger_entries_title', 'Bảng kê chi tiết')}
                    </h2>
                    <button
                        onClick={() => setIsPdfModalOpen(true)}
                        className="text-[10px] font-bold text-amber-500 hover:text-amber-600 transition-colors uppercase tracking-widest flex items-center gap-1"
                    >
                        {t('btn_view_pdf', 'XEM PDF')} <FileText className="w-3 h-3" />
                    </button>
                </div>

                <LedgerTable items={items} summary={enrichedSummary} />
            </div>

            <Modal
                title={<div className="flex items-center gap-2"><FileText className="w-4 h-4 text-amber-500" /> {t('modal_pdf_title', 'BẢN XEM TRƯỚC PDF BÁO GIÁ')}</div>}
                open={isPdfModalOpen}
                onCancel={() => setIsPdfModalOpen(false)}
                footer={null}
                width={850}
                destroyOnHidden
            >
                <div className="p-4 md:p-8 bg-white dark:bg-[#1a1a1c] border border-slate-200 dark:border-white/10 rounded text-slate-900 dark:text-[#dce1fb] shadow-sm">
                    <div className="text-center border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
                        <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">{t('pdf_header', 'BÁO GIÁ SỬA CHỮA (QUOTATION)')}</h1>
                        <p className="text-sm text-slate-500 dark:text-[#d3c5ac]">{t('pdf_sub_header', 'Bản nháp chờ khách duyệt - Dữ liệu dùng để xuất PDF')}</p>
                    </div>

                    <div className="mb-8">
                        <LedgerTable items={items} summary={enrichedSummary} />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-white/10">
                        <Button
                            type="primary"
                            onClick={() => window.print()}
                            className="bg-amber-500 hover:!bg-amber-600 border-none flex items-center gap-2 h-10 px-5 font-bold rounded-lg"
                        >
                            <Printer className="w-4 h-4" /> {t('btn_print', 'IN BÁO GIÁ')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FinancialLedger;
