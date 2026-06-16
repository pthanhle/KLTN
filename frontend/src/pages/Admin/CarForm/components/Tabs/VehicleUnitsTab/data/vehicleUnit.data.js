export const getConditionOptions = (t) => [
    { value: 'new', label: t('Mới (Brand New)') },
    { value: 'demo', label: t('Xe Demo') },
    { value: 'used', label: t('Xe Cũ / Lướt') },
    { value: 'certified_pre_owned', label: t('CPO (Đã kiểm định)') }
];

export const getLocationOptions = (t) => [
    { value: 'warehouse', label: t('Kho Tổng') },
    { value: 'showroom', label: t('Showroom Trưng Bày') },
    { value: 'service', label: t('Xưởng Dịch Vụ') },
    { value: 'customer', label: t('Nhà Khách Hàng') },
    { value: 'in_transit', label: t('Đang Di Chuyển') },
    { value: 'other', label: t('Khác') }
];
