export const maskEmailAddress = (email) => {
    if (!email) return '';
    return email.replace(/(.{3})(.*)(?=@)/, (match, prefix, tail) => prefix + '*'.repeat(tail.length));
};

export const generateOrderId = () => {
    return "HDTT-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};
