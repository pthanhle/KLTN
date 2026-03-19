export const calculateSubtotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculateTax = (subtotal) => {
    return subtotal * 0.1; // VAT 10%
};

export const calculateFinalTotal = (subtotal, shippingFee = 0, discount = 0) => {
    const tax = calculateTax(subtotal);
    return subtotal + shippingFee - discount + tax;
};
