import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { AdminRepairAPI } from '../../../../../../services/api/adminRepair.api';

const QUERY_KEY = ['settlement-progresses'];

const buildInvoiceItems = (quotation) => {
    const parts = (quotation?.parts || []).map((p, i) => ({
        id: `part_${i}`,
        name: p.name || p.sku || 'Phụ tùng',
        qty: p.quantity || 1,
        unitPrice: p.unit_price || 0,
        total: (p.unit_price || 0) * (p.quantity || 1),
        type: 'PART',
    }));

    const labors = (quotation?.labors || []).map((l, i) => ({
        id: `labor_${i}`,
        name: l.description || 'Tiền công',
        qty: l.hours || 1,
        unitPrice: l.rate || 0,
        total: (l.rate || 0) * (l.hours || 1),
        type: 'LABOR',
    }));

    return [...parts, ...labors];
};

const buildFinancials = (quotation, invoiceItems) => {
    const subtotal = invoiceItems.reduce((s, i) => s + i.total, 0);
    const vatRate = (quotation?.vat_rate || 0.1) * 100;
    const vat = subtotal * (quotation?.vat_rate || 0.1);
    const deposit = quotation?.deposit_amount || 0;
    const finalBalance = subtotal + vat - deposit;

    return { subtotal, vatRate, vat, deposit, finalBalance };
};

const mapProgressToQueueItem = (p) => {
    const booking = p.booking_id || {};
    const vehicle = booking.vehicle_info || {};
    const customer = booking.user_id || booking.customer_info || {};
    const invoiceLedger = p.delivery?.invoice_ledger || {};
    const isPaid = invoiceLedger.payment_status === 'PAID';

    return {
        id: p._id,
        progress_id: p._id,
        booking_code: booking.booking_code || p._id,
        plateText: vehicle.license_plate || 'Chưa có biển số',
        customerNameText: customer.full_name || customer.name || 'Khách hàng',
        customerPhoneText: customer.phone || customer.contact_phone || '',
        vehicleBrandModelText: [vehicle.brand, vehicle.model].filter(Boolean).join(' ') || vehicle.license_plate || '',
        isReadyForHandover: p.status === 'QC_TESTING' || p.status === 'COMPLETED',
        statusText: isPaid ? 'Đã thanh toán — chờ bàn giao' : p.status === 'QC_TESTING' ? 'Sẵn sàng bàn giao' : 'Chờ quyết toán',
        paymentBadgeText: isPaid ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN',
        isPaid,
        raw_status: p.status,
    };
};

export const useSettlementLogic = () => {
    const { t } = useTranslation('adminServiceReception');
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProgressId, setSelectedProgressId] = useState(null);
    const [closedIds, setClosedIds] = useState(new Set());

    const { data: progressData, isLoading } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            const [qcRes, completedRes] = await Promise.all([
                AdminRepairAPI.getRepairProgresses({ status: 'QC_TESTING', limit: 100 }),
                AdminRepairAPI.getRepairProgresses({ status: 'COMPLETED', limit: 100 }),
            ]);
            return [
                ...(qcRes?.repairProgresses || []),
                ...(completedRes?.repairProgresses || []),
            ];
        },
        staleTime: 30 * 1000,
    });

    const allProgresses = progressData || [];

    const queueVehicles = useMemo(() => {
        return allProgresses
            .filter(p => !closedIds.has(p._id))
            .map(mapProgressToQueueItem)
            .filter(item => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return item.plateText.toLowerCase().includes(q) ||
                    item.customerNameText.toLowerCase().includes(q) ||
                    item.booking_code.toLowerCase().includes(q);
            });
    }, [allProgresses, closedIds, searchQuery]);

    const selectedProgress = useMemo(() => {
        if (!selectedProgressId) return null;
        return allProgresses.find(p => p._id === selectedProgressId) || null;
    }, [selectedProgressId, allProgresses]);

    const activeTerminalData = useMemo(() => {
        if (!selectedProgress) return null;
        const p = selectedProgress;
        const booking = p.booking_id || {};
        const vehicle = booking.vehicle_info || {};
        const customer = p.booking_id?.user_id || booking.customer_info || {};
        const quotation = p.quotation || {};
        const invoiceLedger = p.delivery?.invoice_ledger || {};

        const invoiceItems = buildInvoiceItems(quotation);
        const financials = buildFinancials(quotation, invoiceItems);

        const isPaid = invoiceLedger.payment_status === 'PAID';

        const kcsTasks = (p.qc_checklist || []).map((task, i) => ({
            id: `qc_${i}`,
            name: task.task,
            isCompleted: task.status === 'passed',
        }));
        const isQCPassed = kcsTasks.length === 0 || kcsTasks.every(t => t.isCompleted);

        return {
            id: p._id,
            progress_id: p._id,
            booking_code: booking.booking_code || p._id,
            plateText: vehicle.license_plate || 'Chưa có biển số',
            customerNameText: customer.full_name || customer.name || 'Khách hàng',
            customerPhoneText: customer.phone || customer.contact_phone || '',
            vehicleBrandModelText: [vehicle.brand, vehicle.model].filter(Boolean).join(' ') || '',
            invoiceItems,
            financials,
            kcsTasks,
            isPaid,
            isQCPassed,
            canPrint: true,
            canCloseRO: isPaid,
            raw_status: p.status,
        };
    }, [selectedProgress]);

    const handoverMutation = useMutation({
        mutationFn: ({ progress_id, payment_method, total_amount }) =>
            AdminRepairAPI.processHandover({
                progress_id,
                payment_method,
                delivery: {
                    invoice_ledger: {
                        total_amount,
                        payment_status: 'PAID',
                        paid_amount: total_amount,
                        payment_method,
                    },
                    handover_brief: {},
                    handover_agreement: {},
                    handshake_protocol: {
                        actual_delivery_date: new Date().toISOString(),
                    },
                },
            }),
        onSuccess: () => {
            message.success(t('settlement_payment_success', 'Thanh toán và bàn giao thành công!'));
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
        onError: (err) => {
            message.error(err?.response?.data?.message || t('settlement_payment_error', 'Thanh toán thất bại'));
        },
    });

    const handleSelectVehicle = useCallback((progressId) => {
        setSelectedProgressId(progressId);
    }, []);

    const handleConfirmPayment = useCallback((paymentMethod = 'CASH') => {
        if (!activeTerminalData) return;
        handoverMutation.mutate({
            progress_id: activeTerminalData.progress_id,
            payment_method: paymentMethod,
            total_amount: activeTerminalData.financials.finalBalance,
        });
    }, [activeTerminalData, handoverMutation]);

    const handlePrintInvoice = useCallback(() => {
        window.print();
    }, []);

    const handleCloseRO = useCallback(() => {
        if (!selectedProgressId) return;
        setClosedIds(prev => new Set(prev).add(selectedProgressId));
        setSelectedProgressId(null);
        message.success(t('settlement_close_success', 'Đã đóng Lệnh Sửa Chữa. Xe đã bàn giao!'));
    }, [selectedProgressId, t]);

    return {
        searchQuery,
        setSearchQuery,
        queueVehicles,
        selectedBookingCode: selectedProgressId,
        handleSelectVehicle,
        activeTerminalData,
        isLoading,
        isLoadingTerminal: isLoading,
        isProcessingPayment: handoverMutation.isPending,
        isClosingRO: false,
        handleConfirmPayment,
        handlePrintInvoice,
        handleCloseRO,
    };
};
