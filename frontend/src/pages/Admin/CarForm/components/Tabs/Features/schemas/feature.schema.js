export const getFeatureRules = (t) => ({
    title: [
        { required: true, message: t('val_featureItemTitleRequired', 'Vui lòng nhập tiêu đề') }
    ],
    image: [],
    desc: [
        { required: true, message: t('val_featureItemDescRequired', 'Vui lòng nhập mô tả') }
    ]
});
