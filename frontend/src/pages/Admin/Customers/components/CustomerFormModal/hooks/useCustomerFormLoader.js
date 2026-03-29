import { useState, useEffect } from 'react';
import { Form } from 'antd';
import { MOCK_TIER_CONFIG } from '../../../data/tierConfig.mock';
import { normalizeCustomerForForm } from '../utils/customerFormUtils';
import { CUSTOMER_FORM_DEFAULTS } from '../data/customerDefaults';

export const useCustomerFormLoader = (customer, isOpen) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const isEditMode = !!customer;

    const tiersList = MOCK_TIER_CONFIG.map(tier => ({
        id: tier.id,
        name: tier.name
    }));

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);

            const timer = setTimeout(() => {
                if (isEditMode) {
                    const normalizedValues = normalizeCustomerForForm(customer);
                    form.setFieldsValue(normalizedValues);
                } else {
                    form.resetFields();
                    form.setFieldsValue(CUSTOMER_FORM_DEFAULTS);
                }
                setIsLoading(false);
            }, 400);

            return () => clearTimeout(timer);
        }
    }, [customer, isEditMode, form, isOpen]);

    return {
        form,
        isEditMode,
        isLoading,
        tiersList
    };
};
