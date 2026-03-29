// Tách biệt Validation Rules thành file Schema độc lập
export const getCustomerFormSchemas = (t) => ({
    fullName: [
        { required: true, message: t('adminCustomers:errNameReq', 'Vui lòng nhập họ tên') },
        { min: 2, message: 'Họ tên quá ngắn' }
    ],
    phone: [
        { required: true, message: t('adminCustomers:errPhoneReq', 'Vui lòng nhập số điện thoại') },
        { pattern: /^[0-9+\-\s()]+$/, message: 'Số điện thoại không đúng định dạng' }
    ],
    email: [
        { type: 'email', message: t('adminCustomers:errEmailInvalid', 'Email không đúng định dạng') }
    ],
    tier: [
        { required: true, message: 'Vui lòng chọn Hạng VIP' }
    ]
});
