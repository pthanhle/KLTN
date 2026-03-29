import React from 'react';
import { COMPANY_INFO } from '../../../constants/companyInfoConstants';

const QuotationHeader = ({ quotation, t }) => (
    <header className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-100 dark:border-white/10 pb-8 mb-8 gap-6 sm:gap-0">
        <div className="space-y-2">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500 dark:bg-[#d4af37] flex items-center justify-center rounded shadow-sm">
                    <span className="text-white dark:text-[#0a0a0b] font-bold text-2xl">TT</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white uppercase">{COMPANY_INFO.BRAND_NAME}</h1>
            </div>
            <div className="text-sm text-slate-500 dark:text-[#a0a0a0] leading-relaxed">
                <p>{COMPANY_INFO.ADDRESS}</p>
                <p>Hotline: {COMPANY_INFO.HOTLINE}</p>
                <p>Email: {COMPANY_INFO.EMAIL}</p>
            </div>
        </div>
        <div className="sm:text-right w-full sm:w-auto">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-500 dark:text-[#d4af37] mb-2 uppercase">{t('quote_title_doc', 'PHIẾU BÁO GIÁ DỊCH VỤ')}</h2>
            <div className="space-y-1">
                <p className="text-sm font-medium"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_doc_number', 'Số phiếu')}:</span> <span className="font-semibold text-slate-800 dark:text-white">{quotation.booking_code}</span></p>
                <p className="text-sm font-medium"><span className="text-slate-500 dark:text-[#a0a0a0]">{t('quote_doc_date', 'Ngày lập')}:</span> <span className="font-semibold text-slate-800 dark:text-white">{quotation.creation_date}</span></p>
                <div className={`mt-3 inline-block px-3 py-1 rounded-md text-xs font-bold uppercase ${quotation.status === 'WAITING_FOR_APPROVAL' ? 'bg-yellow-50 text-yellow-600 dark:bg-[#d4af37]/10 dark:text-[#d4af37]' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500'}`}>
                    {quotation.status === 'WAITING_FOR_APPROVAL' ? t('quote_stt_waiting', 'CHỜ PHÊ DUYỆT') : t('quote_stt_approved', 'ĐÃ DUYỆT')}
                </div>
            </div>
        </div>
    </header>
);

export default QuotationHeader;
