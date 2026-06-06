export const ROLE_OPTIONS = [
    { value: 'advisor', label: 'Cố vấn Dịch vụ (Advisor)' },
    { value: 'service', label: 'Kỹ thuật viên (Technician)' },
    { value: 'sale', label: 'Nhân viên Kinh doanh (Sales)' },
    { value: 'inventory', label: 'Kho phụ tùng (Inventory)' },
];

export const DEPARTMENT_OPTIONS = [
    { value: 'Showroom', label: 'Showroom Bán hàng' },
    { value: 'Service Center', label: 'Xưởng Dịch vụ' },
    { value: 'Back Office', label: 'Văn phòng / Kế toán' }
];

export const getFormRules = (t) => ({
    fullName: [
        { required: true, message: t('adminStaffCreate:error_fullname_req', 'Vui lòng nhập họ tên') },
        { min: 2, message: 'Tên phải dài hơn 2 ký tự' }
    ],
    email: [
        { required: true, message: t('adminStaffCreate:error_email_req', 'Vui lòng nhập email') },
        { type: 'email', message: t('adminStaffCreate:error_email_format', 'Email không hợp lệ') }
    ],
    phone: [
        { required: true, message: t('adminStaffCreate:error_phone_req', 'Vui lòng nhập số điện thoại') },
        { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
    ],
    role: [
        { required: true, message: t('adminStaffCreate:error_role_req', 'Vui lòng chọn vai trò') }
    ],
    department: [
        { required: true, message: t('adminStaffCreate:error_department_req', 'Vui lòng chọn phòng ban') }
    ]
});
