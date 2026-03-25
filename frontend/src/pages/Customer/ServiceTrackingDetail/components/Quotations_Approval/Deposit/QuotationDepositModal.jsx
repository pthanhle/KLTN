import React from 'react';
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

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-[radial-gradient(circle_at_50%_50%,rgba(25,31,49,0.95)_0%,rgba(12,19,36,0.98)_100%)] animate-in fade-in duration-300">
            
            {/* Header Text Overlay */}
            <div className="text-center mb-12 max-w-2xl">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-yellow-500 font-bold">Transaction Flow</span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-2 italic text-white uppercase">
                    {t('quo_deposit_title', 'QUOTATION DEPOSIT LOCK-IN')}
                </h1>
            </div>

            <div className="w-full max-w-lg">
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
    );
};

export default QuotationDepositModal;
