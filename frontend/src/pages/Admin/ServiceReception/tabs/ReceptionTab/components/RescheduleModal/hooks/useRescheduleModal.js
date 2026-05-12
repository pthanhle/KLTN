import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rescheduleSchema } from '../schemas/rescheduleSchema';
import dayjs from 'dayjs';

export const useRescheduleModal = (booking, isOpen, onSave) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(rescheduleSchema),
        defaultValues: {
            newDate: null,
            newTime: null,
        }
    });

    useEffect(() => {
        if (booking && isOpen) {
            const timeStart = booking.time_slot?.split(' - ')[0] || '08:00';
            const dateStr = booking.booking_date || dayjs().format('YYYY-MM-DD');
            
            reset({
                newDate: dayjs(dateStr, 'YYYY-MM-DD'),
                newTime: dayjs(timeStart, 'HH:mm'),
            });
        } else if (!isOpen) {
            reset();
        }
    }, [booking, isOpen, reset]);

    const onSubmit = (values) => {
        const newDateStr = dayjs(values.newDate).format('YYYY-MM-DD');
        const newTimeStr = dayjs(values.newTime).format('HH:mm');
        onSave(booking._id, newTimeStr, newDateStr);
    };

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        errors
    };
};
