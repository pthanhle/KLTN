import { useState } from 'react';
import { Form } from 'antd';

export const useContactForm = (customer, t, messageApi) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const startEditing = () => {
        form.setFieldsValue({
            email: customer.email,
            phone: customer.phone,
            tax_id: customer.tax_id,
            address: customer.address,
            source: customer.source || 'OFFLINE (SHOWROOM)'
        });
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const saveChanges = async () => {
        try {
            const values = await form.validateFields();
            // Typically call API here: await updateCustomerContact(customer.id, values);
            if (messageApi) messageApi.success(t('adminCustomers:msgUpdateSuccess', 'Cập nhật thông tin liên hệ thành công!'));
            setIsEditing(false);
        } catch (error) {
            // Form validation failed
            console.error(error);
        }
    };

    return {
        form,
        isEditing,
        startEditing,
        cancelEditing,
        saveChanges
    };
};
