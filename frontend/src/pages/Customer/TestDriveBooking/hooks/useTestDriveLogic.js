import { useState, useEffect, useMemo } from 'react';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { getMockCarDetail, TIME_SLOTS, SHOWROOM_BRANCHES } from '../data/testDrive.mock';
import { getBookingSchema, defaultBookingValues } from '../schemas/bookingSchema';

export const useTestDriveLogic = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation(['booking']);
    
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const timeSlots = TIME_SLOTS;
    const branches = SHOWROOM_BRANCHES;

    const schema = useMemo(() => getBookingSchema(t), [t]);

    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: defaultBookingValues
    });

    useEffect(() => {
        // Mock fetch car details using ID
        setCar(getMockCarDetail(id));
    }, [id]);

    const handleCancel = () => {
        navigate(-1); // Back to previous page
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const payload = {
                product_id: car?.id,
                booking_type: 'vehicle',
                test_drive_type: data.bookingType,
                showroom_branch: data.bookingType === 'showroom' ? data.showroomBranch : null,
                delivery_address: data.bookingType === 'home' ? data.deliveryAddress : null,
                full_name: data.fullName,
                contact_phone: data.phoneNumber,
                booking_date: data.selectedDate.format('YYYY-MM-DD'),
                time_slot: data.selectedTimeSlot,
                has_driver_license: data.hasDriverLicense,
                note: data.note
            };

            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log('Submitted Payload:', payload);

            message.success(t('booking_success', 'Đăng ký lái thử thành công! Quý khách sẽ nhận được liên hệ sớm nhất.'));
            navigate(-1);
            
        } catch (error) {
            message.error(error.message || t('booking_fail', 'Đã xảy ra lỗi hệ thống.'));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        car,
        isLoading,
        handleCancel,
        methods,
        onSubmit: methods.handleSubmit(onSubmit),
        timeSlots, branches, t
    };
};
