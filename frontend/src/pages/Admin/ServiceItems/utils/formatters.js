export const formatCurrency = (value) => {
    if (value === null || value === undefined) return '0';
    return value.toLocaleString('vi-VN');
};
