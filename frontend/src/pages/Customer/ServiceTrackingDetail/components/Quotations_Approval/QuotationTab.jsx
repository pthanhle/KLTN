import React, { useState } from 'react';
import QuotationA4Document from './QuotationA4Document';
import QuotationActionBar from './QuotationActionBar';
import SignatureModal from './SignatureModal';
import QuotationDepositModal from './Deposit/QuotationDepositModal';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

import { useQuotationTabLogic } from '../../hooks/useQuotationTabLogic';

const QuotationTab = ({ quotationData, setQuotationData, isFullWidthBar = false }) => {
    const {
        isSignatureModalOpen,
        calculations,
        handleOpenSignature,
        handleCloseSignature,
        handleConfirmSignature,
        handleReject,
        isDepositModalOpen,
        closeDepositModal,
        handleDepositPaymentComplete
    } = useQuotationTabLogic(quotationData, setQuotationData);

    if (!quotationData || !calculations) {
        return (
            <div className="w-full flex justify-center pb-32 animate-in fade-in duration-500">
                <article className="a4-container bg-white dark:bg-[#141416] p-8 md:p-12 min-h-[800px] border border-slate-200 dark:border-white/5 shadow-md rounded-sm xl:mx-auto mt-2 w-full max-w-[900px]">
                    <div className="flex justify-between items-start mb-10 border-b pb-8 dark:border-white/10">
                        <Skeleton active avatar={{ size: 56, shape: 'square' }} paragraph={{ rows: 2, width: ['100%', '80%'] }} className="w-[40%]" />
                        <Skeleton active title={false} paragraph={{ rows: 4, width: ['60%', '80%', '100%', '70%'] }} className="w-[30%] flex justify-end" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                        <Skeleton active title paragraph={{ rows: 4 }} className="bg-slate-50 dark:bg-[#1e1e20] p-6 rounded-xl border border-slate-100 dark:border-white/5" />
                        <Skeleton active title paragraph={{ rows: 4 }} className="bg-slate-50 dark:bg-[#1e1e20] p-6 rounded-xl border border-slate-100 dark:border-white/5" />
                    </div>
                    <Skeleton active title paragraph={{ rows: 6 }} className="mb-10" />
                    <div className="flex justify-end mb-16">
                        <Skeleton active title={false} paragraph={{ rows: 4, width: ['80%', '90%', '70%', '100%'] }} className="w-[340px] bg-slate-50 dark:bg-[#1e1e20] p-6 rounded-xl border border-slate-100 dark:border-white/5" />
                    </div>
                    <div className="grid grid-cols-2 gap-10 text-center">
                        <Skeleton active paragraph={{ rows: 2 }} />
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="pb-32">
            {/* The Document View (Đưa Animation vào cục bộ) */}
            <div className="w-full flex justify-center sticky-a4-wrapper animate-in fade-in slide-in-from-bottom-8 duration-700">
                <QuotationA4Document quotation={quotationData} calculations={calculations} />
            </div>

            {/* The Floating Action Bar - Thoát khỏi Stacking Context của Animation để neo Fixed đúng chuẩn */}
            <QuotationActionBar
                status={quotationData.status}
                onOpenSignature={handleOpenSignature}
                onReject={handleReject}
                isFullWidthBar={isFullWidthBar}
            />

            {/* Hidden Modal Portal for Signature Canvas */}
            <SignatureModal
                isOpen={isSignatureModalOpen}
                onClose={handleCloseSignature}
                onConfirm={handleConfirmSignature}
                calculations={calculations}
            />

            {/* Deposit Payment Lock-in Modal (Edge Case 2) */}
            <QuotationDepositModal 
                isOpen={isDepositModalOpen}
                paymentTerms={quotationData.payment_terms}
                onClose={closeDepositModal}
                onComplete={handleDepositPaymentComplete}
            />
        </div>
    );
};

export default QuotationTab;
