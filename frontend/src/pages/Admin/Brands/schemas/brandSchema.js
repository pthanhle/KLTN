export const getBrandSchema = (t) => ({
    name: [
        { required: true, message: t('adminBrands:errNameRequired', 'Vui lòng nhập tên thương hiệu') },
        { min: 2, message: t('adminBrands:errNameShort', 'Tên thương hiệu quá ngắn') }
    ],
    id: [
        { required: true, message: t('adminBrands:errIdRequired', 'Vui lòng nhập mã định danh') },
        { pattern: /^[a-z0-9-]+$/, message: t('adminBrands:errIdFormat', 'Mã chỉ được chứa ký tự thường, số và dấu gạch ngang') }
    ]
});
