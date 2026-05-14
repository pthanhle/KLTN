import { useEffect } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';

const useAssignmentModal = ({ visible, assignmentData, onConfirm }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && assignmentData) {
            let timeRange = [];
            const booking = assignmentData.booking;
            
            if (booking?.expected_start_datetime && booking?.expected_end_datetime) {
                timeRange = [dayjs(booking.expected_start_datetime), dayjs(booking.expected_end_datetime)];
            } else if (booking?.time_slot) {
                const parts = booking.time_slot.split(' - ');
                if (parts.length === 2) {
                    const baseDateStr = booking.booking_date || new Date().toISOString().split('T')[0];
                    timeRange = [
                        dayjs(`${baseDateStr} ${parts[0]}`, 'YYYY-MM-DD HH:mm'),
                        dayjs(`${baseDateStr} ${parts[1]}`, 'YYYY-MM-DD HH:mm')
                    ];
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
            let startDt = null;
            let endDt = null;

            if (values.time_slot && values.time_slot.length === 2) {
                time_slot_string = `${values.time_slot[0].format('HH:mm')} - ${values.time_slot[1].format('HH:mm')}`;
                startDt = values.time_slot[0].toISOString();
                endDt = values.time_slot[1].toISOString();
            }
            
            onConfirm({
                ...values,
                time_slot: time_slot_string,
                expected_start_datetime: startDt,
                expected_end_datetime: endDt
            });
        });
    };

    return {
        form,
        handleSubmit
    };
};

export default useAssignmentModal;
