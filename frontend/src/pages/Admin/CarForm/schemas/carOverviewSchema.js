import i18n from '../../../../i18n/i18n';

export const getOverviewRules = () => {
    return {
        name: [
            { required: true, message: i18n.t('adminCarForm:reqName', 'Vui lòng nhập tên phân phối xe') },
            { max: 100, message: i18n.t('adminCarForm:maxName', 'Tên quá dài, tối đa 100 ký tự') }
        ],
        sku: [
            { pattern: /^[a-z0-9-]+$/, message: i18n.t('adminCarForm:invalidSku', 'SKU chỉ được chứa chữ thường, số và dấu gạch ngang') },
            { max: 50, message: i18n.t('adminCarForm:maxSku', 'SKU tối đa 50 ký tự') }
        ],
        tagline: [
            { max: 150, message: i18n.t('adminCarForm:maxTagline', 'Khẩu hiệu tối đa 150 ký tự') }
        ],
        description: [
            { max: 2000, message: i18n.t('adminCarForm:maxDesc', 'Mô tả tối đa 2000 ký tự') }
        ],
        brandId: [
            { required: true, message: i18n.t('adminCarForm:reqBrand', 'Vui lòng chọn thương hiệu') }
        ],
        bodyStyle: [
            { required: true, message: i18n.t('adminCarForm:reqBodyStyle', 'Vui lòng chọn kiểu dáng') }
        ]
    };
};
