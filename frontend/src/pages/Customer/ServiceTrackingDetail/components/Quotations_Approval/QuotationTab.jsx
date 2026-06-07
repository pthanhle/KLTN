import React from 'react';
import QuotationA4Document from './QuotationA4Document';
import { Skeleton, Button } from 'antd';
import { CreditCard, CheckCircle, FileDown, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuotationTabLogic } from '../../hooks/useQuotationTabLogic';
import { formatCurrency } from '../../utils/trackingDataUtils';

const QuotationTab = ({ quotationData, setQuotationData, isFullWidthBar = false }) => {
    const { t } = useTranslation('tracking');
    const {
        calculations,
        handleDepositVNPay,
        isDepositRedirecting,
        handleReject,
    } = useQuotationTabLogic(quotationData, setQuotationData);

    if (!quotationData || !calculations) {
        return (
            <div className="w-full flex justify-center pb-32 animate-in fade-in duration-500">
                <article className="a4-container bg-white dark:bg-[#141416] p-8 md:p-12 min-h-[800px] border border-slate-200 dark:border-white/5 shadow-md rounded-sm xl:mx-auto mt-2 w-full max-w-[900px]">
                    <div className="flex justify-between items-start mb-10 border-b pb-8 dark:border-white/10">
                        <Skeleton active avatar={{ size: 56, shape: 'square' }} paragraph={{ rows: 2, width: ['100%', '80%'] }} className="w-[40%]" />
                        <Skeleton active title={false} paragraph={{ rows: 4, width: ['60%', '80%', '100%', '70%'] }} className="w-[30%] flex justify-end" />
                    </div>
                    <Skeleton active title paragraph={{ rows: 6 }} className="mb-10" />
                </article>
            </div>
        );
    }

    const isPending = quotationData.status === 'PENDING';
    const isApproved = quotationData.status === 'APPROVED';

    return (
        <div className="pb-32 w-full flex flex-col items-center">
            <div className="w-full flex justify-center sticky-a4-wrapper animate-in fade-in slide-in-from-bottom-8 duration-700">
                <QuotationA4Document quotation={quotationData} calculations={calculations} />
            </div>

            {/* Action bar */}
            <div className="w-full max-w-[900px] mx-auto mt-6 animate-in fade-in duration-500 delay-300">
                {isApproved ? (
                    <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-[#141416] p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm gap-4">
                        <div className="flex items-center gap-4">
                            <CheckCircle className="text-emerald-500 w-6 h-6 flex-shrink-0" />
                            <p className="text-[13px] md:text-sm text-emerald-600 dark:text-[#4edea3] font-black uppercase tracking-[0.2em]">
                                {t('quote_bar_approved_msg', 'ĐÃ THANH TOÁN CỌC — ĐANG CHUẨN BỊ PHỤ TÙNG')}
                            </p>
                        </div>
                        <button className="w-full md:w-auto px-8 py-3 rounded-xl border border-slate-200 dark:border-[#1e1e20] text-slate-600 dark:text-white bg-slate-50 dark:bg-[#1a1a1c] hover:bg-slate-100 dark:hover:bg-[#222224] transition-colors font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            <FileDown size={14} />
                            {t('quote_bar_pdf', 'Lưu trữ PDF')}
                        </button>
                    </div>
                ) : isPending && calculations.depositAmount > 0 ? (
                    <div className="flex flex-col items-center gap-4 bg-white dark:bg-[#141416] p-6 rounded-2xl border border-yellow-200 dark:border-yellow-500/20 shadow-sm">
                        <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-[#a0a0a0] mb-1">
                                {t('quo_deposit_amount', 'Tiền cọc yêu cầu (50%)')}:
                            </p>
                            <p className="text-3xl font-black text-yellow-500 tracking-tighter">
                                {formatCurrency(calculations.depositAmount)} <span className="text-base font-medium opacity-70">₫</span>
                            </p>
                        </div>

                        <div className="flex w-full max-w-md flex-col md:flex-row gap-3">
                            <button
                                onClick={handleReject}
                                className="flex-1 px-5 py-2.5 rounded-md border border-red-100 dark:border-[#ffb4ab]/30 text-red-500 dark:text-[#ffb4ab] bg-white dark:bg-[#141416] hover:bg-red-50 dark:hover:bg-[#ffb4ab]/10 transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                            >
                                <XCircle size={16} />
                                {t('quote_bar_reject', 'Từ chối')}
                            </button>

                            <button
                                onClick={handleDepositVNPay}
                                disabled={isDepositRedirecting}
                                className="flex-[2] px-8 py-2.5 rounded-md bg-yellow-500 hover:bg-yellow-400 disabled:opacity-70 !text-slate-900 border border-transparent shadow-[0_4px_12px_rgba(234,179,8,0.3)] transition-all font-bold text-sm transform active:scale-95 flex items-center justify-center gap-2 hover:scale-[1.02]"
                            >
                                <CreditCard size={16} />
                                {isDepositRedirecting
                                    ? t('btn_processing', 'Đang chuyển hướng...')
                                    : t('quo_deposit_vnpay', 'Thanh toán cọc qua VNPay')}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default QuotationTab;
