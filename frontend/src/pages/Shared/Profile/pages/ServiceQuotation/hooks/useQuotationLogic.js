import { useState, useMemo } from 'react';
import { getMockQuotation } from '../data/mockQuotationData';

export const useQuotationLogic = (bookingCode) => {
    // In real app, fetch from API using bookingCode
    const [quotation, setQuotation] = useState(getMockQuotation(bookingCode));

    const calculations = useMemo(() => {
        if (!quotation) return null;

        const partsTotal = quotation.parts.reduce((sum, part) => sum + (part.quantity * part.unit_price), 0);
        const laborTotal = quotation.labors.reduce((sum, labor) => sum + (labor.quantity * labor.unit_price), 0);
        const subtotal = partsTotal + laborTotal;
        const vatAmount = subtotal * quotation.vat_rate;
        const totalAmount = subtotal + vatAmount;

        return {
            partsTotal,
            laborTotal,
            vatAmount,
            totalAmount
        };
    }, [quotation]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
    };

    const handleApprove = () => {
        // Mock API call to approve
        console.log('Approved ' + quotation.booking_code);
    };

    const handleReject = () => {
        // Mock API call to reject
        console.log('Rejected ' + quotation.booking_code);
    };

    return {
        quotation,
        calculations,
        formatCurrency,
        handleApprove,
        handleReject
    };
};
