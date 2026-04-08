import { useState } from 'react';
import { App } from 'antd';

export const useQuickAddLogic = ({ onAdd, onCancel, t }) => {
    const [value, setValue] = useState('');
    const { message } = App.useApp();

    const handleOk = () => {
        if (!value.trim()) {
            message.error(t('adminPartForm:reqName', 'Vui lòng nhập tên'));
            return;
        }
        onAdd(value.trim());
        setValue('');
    };

    const handleCancel = () => {
        setValue('');
        onCancel();
    };

    const handleChange = (e) => setValue(e.target.value);

    return {
        value,
        handleChange,
        handleOk,
        handleCancel
    };
};
