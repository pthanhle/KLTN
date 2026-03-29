export const getContactSchemas = (t) => ({
    email: [
        { required: true, message: t('adminCustomers:errEmailRequired', 'Vui lòng nhập Email') },
        { type: 'email', message: t('adminCustomers:errEmailInvalid', 'Email không hợp lệ') }
    ],
    phone: [
        { required: true, message: t('adminCustomers:errPhoneRequired', 'Vui lòng nhập số điện thoại') },
        { pattern: /^[0-9]{10,11}$/, message: t('adminCustomers:errPhoneInvalid', 'SĐT phải gồm 10-11 chữ số') }
    ],
    tax_id: [
        { pattern: /^[A-Z0-9-]{9,14}$/, message: t('adminCustomers:errTaxInvalid', 'Mã số thuê / CCCD phải từ 9-14 ký tự hợp lệ') }
    ],
    address: [
        { required: true, message: t('adminCustomers:errAddressRequired', 'Vui lòng nhập địa chỉ') },
        { min: 5, message: t('adminCustomers:errAddressShort', 'Địa chỉ quá ngắn') }
    ]
});
