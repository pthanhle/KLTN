export const getStatusOptions = (t) => [
    { label: t('adminParts:filterStatus', 'Tất Cả Trạng Thái'), value: 'all' },
    { label: t('adminParts:statusActive', 'Đang Bán'), value: 'active' },
    { label: t('adminParts:statusDraft', 'Bản Nháp'), value: 'draft' }
];

export const getCategoryOptions = (categories, t) => [
    { label: t('adminParts:filterCategory', 'Tất Cả Danh Mục'), value: 'all' },
    ...categories.map(c => ({ label: c?.name || c, value: c?.value || c }))
];

export const getBrandOptions = (brands, t) => [
    { label: t('adminParts:filterBrand', 'Mọi Thương Hiệu'), value: 'all' },
    ...brands.map(b => ({ label: b?.name || b, value: b?.name || b }))
];
