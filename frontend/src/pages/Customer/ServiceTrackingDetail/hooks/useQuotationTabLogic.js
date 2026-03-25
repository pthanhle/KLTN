import { useState, useMemo, useEffect } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { formatCurrency, updateMasterServiceStatus } from '../utils/trackingDataUtils';

export const useQuotationTabLogic = (quotationData, setQuotationData) => {
    const { t } = useTranslation('tracking');
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

    // Deposit Auto-trigger
    useEffect(() => {
        const isApprovedStatus = quotationData?.status === 'APPROVED';
        const hasPendingDeposit = quotationData?.payment_terms?.deposit_status === 'PENDING' && quotationData?.payment_terms?.required_deposit > 0;
        if (isApprovedStatus && hasPendingDeposit) {
            setIsDepositModalOpen(true);
        }
    }, [quotationData?.status, quotationData?.payment_terms?.deposit_status, quotationData?.payment_terms?.required_deposit]);

    // Tính toán lại hoàn toàn Hóa Đơn (Tuyệt đối không hardcode trên mảng tĩnh)
    const calculations = useMemo(() => {
        if (!quotationData) return null;

        const partsTotal = quotationData.parts.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
        const laborTotal = quotationData.labors.reduce((sum, item) => sum + (item.hours * item.rate), 0);
        const subtotal = partsTotal + laborTotal;
        const actualVatRate = quotationData.vat_rate ?? 0.1;
        const vatAmount = subtotal * actualVatRate;
        const grandTotal = subtotal + vatAmount;

        return {
            partsTotal,
            laborTotal,
            subtotal,
            vatAmount,
            grandTotal,
            vatFormatted: `${(actualVatRate * 100).toFixed(0)}%`
        };
    }, [quotationData]);

    const handleOpenSignature = () => setIsSignatureModalOpen(true);
    const handleCloseSignature = () => setIsSignatureModalOpen(false);

    const handleConfirmSignature = (signatureDataUrl) => {
        setIsSignatureModalOpen(false);
        
        // Optimistic State Update for UI Reactivity
        setQuotationData(prev => ({
            ...prev,
            status: 'APPROVED',
            customer_signature: signatureDataUrl
        }));

        // Ghi xuống DB Mock chung để các trang khác (Profile) đều nhận ra Đã duyệt
        updateMasterServiceStatus(quotationData.booking_code, 'IN_PROGRESS');

        message.success(t('notify_approved_desc', 'Chữ ký điện tử đã mã hoá. Lệnh sửa chữa đã gửi xuống Xưởng.'));
    };

    const handleReject = () => {
        message.error(t('notify_reject_desc', 'Yêu cầu Từ chối Báo giá đã được ghi nhận. Cố vấn sẽ liên hệ lại.'));
    };

    const closeDepositModal = () => setIsDepositModalOpen(false);

    const handleDepositPaymentComplete = () => {
        setIsDepositModalOpen(false);
        setQuotationData(prev => ({
            ...prev,
            payment_terms: {
                ...prev.payment_terms,
                deposit_status: 'PAID'
            }
        }));
        message.success(t('quo_deposit_success', 'Xác Nhận Đã Nhận Chuyển Khoản Cọc'));
    };

    return {
        isSignatureModalOpen,
        calculations,
        formatCurrency,
        handleOpenSignature,
        handleCloseSignature,
        handleConfirmSignature,
        handleReject,
        isDepositModalOpen,
        closeDepositModal,
        handleDepositPaymentComplete,
        t
    };
};
