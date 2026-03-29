// Tách Logic mapping API Data Object ra thành helper util
export const normalizeCustomerForForm = (customer) => {
    if (!customer) return null;
    return {
        full_name: customer.full_name,
        phone: customer.phone,
        email: customer.email,
        tier: customer.tier,
        source: customer.source || 'OFFLINE (SHOWROOM)',
        address: customer.address,
        notes: customer.notes,
        status: customer.status === 'active' || customer.status === 'Đang hoạt động'
    };
};

export const normalizeFormForApi = (values) => {
    return {
        ...values,
        status: values.status ? 'active' : 'inactive'
    };
};
