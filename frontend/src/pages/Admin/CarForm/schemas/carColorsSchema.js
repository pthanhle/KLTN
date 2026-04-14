export const getCarColorRules = (t) => ({
    name: [
        { required: true, message: t('colorNameRequired', 'Vui lòng nhập tên màu sắc') }
    ],
    value: [
        { required: true, message: t('colorHexRequired', 'Vui lòng nhập mã HEX') },
        { pattern: /^#([0-9A-F]{3}){1,2}$/i, message: t('colorHexInvalid', 'Mã HEX không hợp lệ (VD: #ffffff)') }
    ]
});
