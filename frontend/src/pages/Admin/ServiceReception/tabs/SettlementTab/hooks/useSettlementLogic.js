import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { MOCK_SERVICE_BOOKINGS } from '../../../data/mockServiceBookings';
import { fetchInvoiceData, fetchQcData } from '../../../data/mockSettlementData';

export const useSettlementLogic = () => {
    const { t } = useTranslation('adminServiceReception');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBookingCode, setSelectedBookingCode] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [isClosingRO, setIsClosingRO] = useState(false);
    const [localPaymentStatus, setLocalPaymentStatus] = useState({});
    const [closedROs, setClosedROs] = useState(new Set());

    const mappedQueueVehicles = useMemo(() => {
        return MOCK_SERVICE_BOOKINGS
            .filter(booking => {
                const isReady = booking.status === 'COMPLETED' || booking.status === 'READY_FOR_HANDOVER';
                const isNotClosed = !closedROs.has(booking.booking_code);
                return isReady && isNotClosed;
            })
            .map(booking => {
                const isReadyForHandover = booking.status === 'COMPLETED' || booking.status === 'READY_FOR_HANDOVER';
                const invoice = fetchInvoiceData(booking.booking_code);
                const isPaid = localPaymentStatus[booking.booking_code] || (invoice?.status === 'COMPLETED');

                return {
                    id: booking.booking_code,
                    plateText: booking.license_plate || 'Chưa cập nhật biển số',
                    customerNameText: booking.customer_name || 'Khách vãng lai',
                    isReadyForHandover,
                    statusText: isReadyForHandover ? t('settlement_ready', 'Sẵn sàng bàn giao') : t('settlement_pending_kcs', 'Chờ KCS cuối'),
                    paymentBadgeText: isPaid ? t('settlement_paid', 'ĐÃ THANH TOÁN') : t('settlement_unpaid', 'CHƯA THANH TOÁN'),
                    isPaid
                };
            })
            .filter(mapped => {
                const q = searchQuery.toLowerCase();
                return mapped.plateText.toLowerCase().includes(q) ||
                    mapped.id.toLowerCase().includes(q) ||
                    mapped.customerNameText.toLowerCase().includes(q);
            });
    }, [searchQuery, closedROs, localPaymentStatus, t]);

    const activeTerminalData = useMemo(() => {
        if (!selectedBookingCode) return null;

        const selectedBooking = MOCK_SERVICE_BOOKINGS.find(s => s.booking_code === selectedBookingCode) || {};
        const invoice = fetchInvoiceData(selectedBookingCode);
        const qc = fetchQcData(selectedBookingCode);

        const mappedInvoiceItems = invoice?.line_items?.map(i => ({
            id: i.id || Math.random().toString(),
            name: i.name,
            quantity: i.quantity || 1,
            unit_price: i.unit_price || 0,
            total_price: i.total_price || 0
        })) || (selectedBooking.selected_services || []).map((s, i) => ({
            id: s.service_id || `item_${i + 1}`,
            name: s.name,
            quantity: 1,
            unit_price: s.price || 0,
            total_price: s.price || 0
        }));

        const financials = invoice?.financials || {
            subtotal: mappedInvoiceItems.reduce((acc, curr) => acc + curr.total_price, 0),
            vatRate: 10,
            vat: mappedInvoiceItems.reduce((acc, curr) => acc + curr.total_price, 0) * 0.1,
            deposit: 0,
            finalBalance: mappedInvoiceItems.reduce((acc, curr) => acc + curr.total_price, 0) * 1.1
        };

        const isPaid = localPaymentStatus[selectedBookingCode] || (invoice?.status === 'COMPLETED');
        const isQCPassed = qc?.kcs_tasks?.every(task => task.status === 'completed') ?? false;

        const mappedKcsTasks = (qc?.kcs_tasks || []).map(t => ({
            id: t.id || Math.random().toString(),
            name: t.title,
            isCompleted: t.status === 'completed'
        }));

        return {
            id: selectedBookingCode,
            plateText: selectedBooking.license_plate || 'Chưa cập nhật biển số',
            customerNameText: selectedBooking.customer_name || 'Khách vãng lai',
            customerPhoneText: selectedBooking.customer_phone || 'Chưa cập nhật số ĐT',
            vehicleBrandModelText: `${selectedBooking.vehicle_brand || ''} ${selectedBooking.vehicle_model || ''}`.trim() || 'Chưa cập nhật loại xe',
            invoiceItems: mappedInvoiceItems,
            financials,
            kcsTasks: mappedKcsTasks,
            isPaid,
            canPrint: true,
            canCloseRO: isPaid && isQCPassed
        };
    }, [selectedBookingCode, localPaymentStatus]);

    const handleSelectVehicle = (bookingCode) => {
        setSelectedBookingCode(bookingCode);
    };

    const handleConfirmPayment = () => {
        if (!selectedBookingCode) return;

        setIsProcessingPayment(true);
        setTimeout(() => {
            setLocalPaymentStatus(prev => ({ ...prev, [selectedBookingCode]: true }));
            setIsProcessingPayment(false);
            message.success(t('settlement_payment_success', 'Thanh toán thành công!'));
        }, 800);
    };

    const handlePrintInvoice = () => {
        if (!activeTerminalData?.canPrint) return;
        window.print();
    };

    const handleCloseRO = () => {
        if (!activeTerminalData?.canCloseRO || !selectedBookingCode) return;

        setIsClosingRO(true);
        setTimeout(() => {
            setClosedROs(prev => new Set(prev).add(selectedBookingCode));
            setSelectedBookingCode(null);
            setIsClosingRO(false);
            message.success(t('settlement_close_success', 'Đóng Lệnh Sửa Chữa thành công. Xe đã được bàn giao!'));
        }, 1000);
    };

    return {
        searchQuery,
        setSearchQuery,
        queueVehicles: mappedQueueVehicles,
        selectedBookingCode,
        handleSelectVehicle,
        activeTerminalData,
        isProcessingPayment,
        isClosingRO,
        handleConfirmPayment,
        handlePrintInvoice,
        handleCloseRO
    };
};
