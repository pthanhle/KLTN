import { useState, useCallback } from 'react';

export const useDepositModalLogic = (paymentTerms, onComplete) => {
    const [view, setView] = useState('PAYMENT');
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Dynamic generation avoiding hardcoded UI
    const [transactionId] = useState(`TXN-${Math.floor(10000 + Math.random() * 90000)}-PT`);
    const [transactionTime] = useState(new Date().toLocaleTimeString('vi-VN'));

    const handleConfirmTransfer = useCallback(async () => {
        setIsProcessing(true);
        // Mô phỏng call API chờ Gateway Ngân hàng
        await new Promise(res => setTimeout(res, 800));
        setIsProcessing(false);
        setView('SUCCESS');
    }, []);

    const handleClose = useCallback(() => {
        setView('PAYMENT');
        if (onComplete) onComplete();
    }, [onComplete]);

    const handleCancel = useCallback((onCloseProp) => {
        if (onCloseProp) onCloseProp();
    }, []);

    return {
        view,
        isProcessing,
        transactionId,
        transactionTime,
        handleConfirmTransfer,
        handleClose,
        handleCancel
    };
};
