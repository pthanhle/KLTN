export const getCategorySchema = (t) => ({
    name: [
        { required: true, message: t('adminCategories:valNameReq', 'Vui lòng nhập tên danh mục') }
    ],
    id: [
        { required: true, message: t('adminCategories:valIdReq', 'Vui lòng nhập mã danh mục') },
        { 
            pattern: /^[a-z0-9-]+$/, 
            message: t('adminCategories:valIdPattern', 'Mã chỉ được chứa chữ thường, số và dấu gạch ngang') 
        }
    ],
    description: [
        { required: true, message: t('adminCategories:valDescReq', 'Vui lòng nhập mô tả') },
        { min: 10, message: t('adminCategories:valDescMin', 'Mô tả phải dài ít nhất 10 ký tự') }
    ]
});
