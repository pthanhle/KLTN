export const getPricingRules = (t) => ({
    price: [
        { required: true, message: t('requireBasePrice', 'Vui lòng nhập giá niêm yết') },
        { type: 'number', min: 1000000, message: t('minBasePrice', 'Giá niêm yết phải lớn hơn 1 triệu') }
    ],
    salePrice: [
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (value === undefined || value === null || value === '') {
                    return Promise.resolve();
                }
                if (value < 0) {
                    return Promise.reject(new Error(t('minSalePrice', 'Giá khuyến mãi không được âm')));
                }
                if (value >= getFieldValue('price')) {
                    return Promise.reject(new Error(t('salePriceError', 'Giá khuyến mãi phải nhỏ hơn giá niêm yết')));
                }
                return Promise.resolve();
            },
        }),
    ],
    stock: [
        { required: true, message: t('requireStock', 'Vui lòng nhập số lượng tồn kho') },
        { type: 'number', min: 0, message: t('minStock', 'Tồn kho không được âm') }
    ]
});
