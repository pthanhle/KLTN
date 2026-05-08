import { useEffect } from 'react';
import { Form } from 'antd';
import { calculateInitialPriority } from '../../../../utils/dispatch.utils';

export const useAssignModalForm = (isOpen, pendingData, onConfirm) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen && pendingData) {
            const booking = pendingData.booking;
            const calculatedPriority = calculateInitialPriority(booking);

            form.setFieldsValue({
                priority: calculatedPriority,
                note: booking?.note || ''
            });
        }
    }, [isOpen, pendingData, form]);

    const handleConfirmSubmit = () => {
        form.validateFields().then(values => {
            onConfirm(values);
        });
    };

    return {
        form,
        handleConfirmSubmit
    };
};
