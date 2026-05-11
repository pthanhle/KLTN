import { useEffect } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';

const useAssignmentModal = ({ visible, assignmentData, onConfirm }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && assignmentData) {
            let timeRange = [];
            if (assignmentData.booking?.time_slot) {
                const parts = assignmentData.booking.time_slot.split(' - ');
                if (parts.length === 2) {
                    timeRange = [dayjs(parts[0], 'HH:mm'), dayjs(parts[1], 'HH:mm')];
                }
            }

            form.setFieldsValue({
                bay: assignmentData.targetBay?.bay_id,
                time_slot: timeRange,
                primary_technician: assignmentData.booking?.primary_technician || undefined,
                assistant_technicians: assignmentData.booking?.assistant_technicians || []
            });
        }
    }, [visible, assignmentData, form]);

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            let time_slot_string = '';
            if (values.time_slot && values.time_slot.length === 2) {
                time_slot_string = `${values.time_slot[0].format('HH:mm')} - ${values.time_slot[1].format('HH:mm')}`;
            }
            
            onConfirm({
                ...values,
                time_slot: time_slot_string
            });
        });
    };

    return {
        form,
        handleSubmit
    };
};

export default useAssignmentModal;
