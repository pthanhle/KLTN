import { useEffect } from 'react';
import { Form } from 'antd';

export const useBrandFormState = (isOpen, editingData) => {
    const [form] = Form.useForm();
    const isEditing = !!editingData;

    useEffect(() => {
        if (isOpen) {
            if (editingData) {
                form.setFieldsValue({
                    name: editingData.name,
                    id: editingData.id,
                    image: editingData.image || null
                });
            } else {
                form.resetFields();
            }
        }
    }, [isOpen, editingData, form]);

    const handleValuesChange = (changedValues) => {
        if (!isEditing && changedValues.name) {
            const slug = changedValues.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') 
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-');
            form.setFieldValue('id', slug);
        }
    };

    return {
        form,
        isEditing,
        handleValuesChange
    };
};
