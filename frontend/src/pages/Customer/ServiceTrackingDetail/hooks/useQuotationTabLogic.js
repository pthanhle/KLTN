import { useState, useMemo, useCallback } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../utils/trackingDataUtils';
import { CheckoutAPI } from '../../../../services/api/checkout';

export const useQuotationTabLogic = (quotationData, setQuotationData) => {
    const { t } = useTranslation('tracking');
    const [isDepositRedirecting, setIsDepositRedirecting] = useState(false);

    const calculations = useMemo(() => {
        if (!quotationData) return null;

        const servicePackageTotal = quotationData.service_package_total || 0;
        const partsTotal = (quotationData.parts || []).reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
        const laborTotal = (quotationData.labors || []).reduce((sum, item) => sum + (item.total_price ?? item.quantity * item.unit_price ?? 0), 0);
        const subtotal = servicePackageTotal + partsTotal + laborTotal;
        const actualVatRate = quotationData.vat_rate ?? 0.1;
        const vatAmount = subtotal * actualVatRate;
        const grandTotal = subtotal + vatAmount;
        const depositAmount = quotationData.deposit_amount || Math.round(grandTotal * 0.5);

        return {
            servicePackageTotal,
            partsTotal,
            laborTotal,
            subtotal,
            vatAmount,
            grandTotal,
            depositAmount,
            vatFormatted: `${(actualVatRate * 100).toFixed(0)}%`
        };
    }, [quotationData]);

    const handleDepositVNPay = useCallback(async () => {
        if (!quotationData?.progress_id) {
            message.error('Không tìm thấy mã đơn dịch vụ');
            return;
        }
        setIsDepositRedirecting(true);
        try {
            const response = await CheckoutAPI.createServiceDepositPayment(quotationData.progress_id);
            if (response?.url) {
                window.location.href = response.url;
            } else {
                throw new Error(response?.message || 'Không thể tạo liên kết thanh toán');
            }
        } catch (err) {
            message.error(err?.response?.data?.message || err?.message || 'Có lỗi khi kết nối VNPay');
            setIsDepositRedirecting(false);
        }
    }, [quotationData?.progress_id]);

    const handleReject = () => {
        message.info(t('notify_reject_desc', 'Yêu cầu từ chối đã được ghi nhận. Cố vấn sẽ liên hệ lại.'));
    };

    return {
        calculations,
        formatCurrency,
        handleDepositVNPay,
        isDepositRedirecting,
        handleReject,
        t
    };
};
