export const getFeatureRules = (t) => ({
    title: [
        { required: true, message: t('val_featureItemTitleRequired', 'Vui lòng nhập tiêu đề') }
    ],
    image: [
        { type: 'url', message: t('val_urlInvalid', 'Vui lòng nhập đường dẫn URL hợp lệ') }
    ],
    desc: [
        { required: true, message: t('val_featureItemDescRequired', 'Vui lòng nhập mô tả') }
    ]
});
