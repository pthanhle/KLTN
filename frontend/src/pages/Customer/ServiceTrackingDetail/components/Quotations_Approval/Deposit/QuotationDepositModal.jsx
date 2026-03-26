import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useDepositModalLogic } from '../../../hooks/useDepositModalLogic';
import DepositPaymentView from './DepositPaymentView';
import DepositSuccessView from './DepositSuccessView';

const QuotationDepositModal = ({ isOpen, paymentTerms, onComplete, onClose }) => {
    const { t } = useTranslation('tracking');
    const {
        view,
        isProcessing,
        transactionId,
        transactionTime,
        handleConfirmTransfer,
        handleClose,
        handleCancel
    } = useDepositModalLogic(paymentTerms, onComplete);

    if (!isOpen || !paymentTerms) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-900/50 dark:bg-black/80 backdrop-blur-md overflow-y-auto w-full h-full" onClick={(e) => e.stopPropagation()}>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 animate-in fade-in duration-300">

            <div className="w-full max-w-lg relative z-[10000]" onClick={(e) => e.stopPropagation()}>
                {view === 'PAYMENT' ? (
                    <DepositPaymentView 
                        paymentTerms={paymentTerms} 
                        isProcessing={isProcessing} 
                        onConfirm={handleConfirmTransfer} 
                        onCancel={() => handleCancel(onClose)} 
                    />
                ) : (
                    <DepositSuccessView 
                        transactionId={transactionId}
                        transactionTime={transactionTime}
                        onClose={handleClose} 
                    />
                )}
            </div>
            </div>
        </div>,
        document.body
    );
};

export default QuotationDepositModal;