export const formatVariantString = (selectedOptions) => {
    if (!selectedOptions || Object.keys(selectedOptions).length === 0) return null;
    return Object.entries(selectedOptions)
        .map(([k, v]) => `${k}: ${v}`)
        .join(' • ');
};

export const getInitials = (name, fallback = 'U') => {
    if (!name) return fallback;
    return name.charAt(0).toUpperCase();
};
