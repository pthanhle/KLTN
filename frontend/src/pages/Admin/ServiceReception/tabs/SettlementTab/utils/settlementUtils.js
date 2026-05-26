export const calculateSettlement = (quotationData) => {
    if (!quotationData) return { subtotal: 0, vatRate: 0, vat: 0, deposit: 0, finalBalance: 0 };

    const { parts = [], labors = [], vat_rate = 0.1, payment_terms = {} } = quotationData;

    const partsTotal = parts.reduce((sum, item) => sum + ((item.quantity || 0) * (item.unit_price || 0)), 0);
    const laborsTotal = labors.reduce((sum, item) => sum + ((item.quantity || 0) * (item.unit_price || 0)), 0);

    const subtotal = partsTotal + laborsTotal;

    const vatMultiplier = vat_rate > 1 ? vat_rate / 100 : vat_rate;
    const displayVatRate = vatMultiplier * 100;

    const vat = Math.round(subtotal * vatMultiplier);

    const deposit = payment_terms.deposit_status === 'PAID' ? (payment_terms.required_deposit || 0) : 0;

    const finalBalance = subtotal + vat - deposit;

    return {
        subtotal,
        vatRate: displayVatRate,
        vat,
        deposit,
        finalBalance
    };
};

export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
