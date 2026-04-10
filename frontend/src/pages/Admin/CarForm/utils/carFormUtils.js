/**
 * Generates an automatic SKU from the product name if one is not provided.
 * @param {string} name 
 * @returns {string} 
 */
export const generateSlugFromName = (name) => {
    if (!name) return '';
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

/**
 * Validates file type and size for image uploads in Car Form
 */
export const validateImageUpload = (file) => {
    const isValidType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    const isValidSize = file.size / 1024 / 1024 < 2; // under 2MB

    return { isValidType, isValidSize };
};
