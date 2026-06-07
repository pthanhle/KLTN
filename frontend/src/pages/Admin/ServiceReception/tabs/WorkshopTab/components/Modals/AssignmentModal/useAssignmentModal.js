import { useEffect } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';

const useAssignmentModal = ({ visible, assignmentData, onConfirm, selectedDate }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && assignmentData) {
            let timeRange = [];
            const booking = assignmentData.booking;
            // The canonical date to anchor times to: prefer selectedDate filter, fall back to booking date
            const anchorDateStr = selectedDate
                ? selectedDate.format('YYYY-MM-DD')
                : (booking?.booking_date || new Date().toISOString().split('T')[0]);

            if (booking?.expected_start_datetime && booking?.expected_end_datetime) {
                // Re-anchor existing datetimes to the selected date (only time part carries over)
                const existStart = dayjs(booking.expected_start_datetime);
                const existEnd = dayjs(booking.expected_end_datetime);
                timeRange = [
                    dayjs(anchorDateStr).hour(existStart.hour()).minute(existStart.minute()).second(0),
                    dayjs(anchorDateStr).hour(existEnd.hour()).minute(existEnd.minute()).second(0),
                ];
            } else if (booking?.time_slot) {
                const parts = booking.time_slot.split(' - ');
                if (parts.length === 2) {
                    timeRange = [
                        dayjs(`${anchorDateStr} ${parts[0]}`, 'YYYY-MM-DD HH:mm'),
                        dayjs(`${anchorDateStr} ${parts[1]}`, 'YYYY-MM-DD HH:mm')
                    ];
                }
            } else {
                // Default: 08:00 – 10:00 on the selected date
                timeRange = [
                    dayjs(anchorDateStr).hour(8).minute(0).second(0),
                    dayjs(anchorDateStr).hour(10).minute(0).second(0),
                ];
            }

            form.setFieldsValue({
                bay: assignmentData.targetBay?.name,
                time_slot: timeRange,
                primary_technician: assignmentData.booking?.primary_technician || undefined,
                assistant_technicians: assignmentData.booking?.assistant_technicians || []
            });
        }
    }, [visible, assignmentData, selectedDate, form]);

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
