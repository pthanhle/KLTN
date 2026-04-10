import { useState, useEffect, useMemo } from 'react';
import { App } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { getMockCarDetail } from '../../CarDetail/data/carDetail.mock';
import { TIME_SLOTS, SHOWROOM_BRANCHES } from '../data/testDrive.mock';
import { getBookingSchema } from '../schemas/bookingSchema';
import { mapRescheduleDataToForm, mapFormToBookingPayload } from '../utils/bookingFormMapper';
import { useGetTestDriveById, useSubmitTestDrive } from '../../../../services/queries/bookingQueries';
import { useGetCheckoutProfile } from '../../../../services/queries/checkoutQueries';
import { useLocationCascade } from './useLocationCascade';

export const useTestDriveLogic = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation(['booking']);

    const rescheduleId = searchParams.get('reschedule_id');
    const isReschedule = !!rescheduleId;

    const { data: rescheduleData, error: fetchError } = useGetTestDriveById(rescheduleId);
    const { data: userProfile } = useGetCheckoutProfile();
    
    useEffect(() => {
        if (fetchError) {
            message.error(t('booking_notFound', 'Không tìm thấy lịch hẹn cần dời hoặc vé đã bị khóa.'));
            navigate('/profile/test-drives', { replace: true });
        }
    }, [fetchError, t, navigate]);

    const submitMutation = useSubmitTestDrive();
    const [car, setCar] = useState(null);

    const timeSlots = TIME_SLOTS;
    const branches = SHOWROOM_BRANCHES;

    const schema = useMemo(() => getBookingSchema(t, rescheduleData, car?.isDemoAvailable ?? true), [t, rescheduleData, car]);
    const defaultVals = useMemo(() => mapRescheduleDataToForm(rescheduleData, userProfile), [rescheduleData, userProfile]);

    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: defaultVals
    });

    useEffect(() => {
        methods.reset(defaultVals);
    }, [defaultVals, methods]);

    useEffect(() => {
        const mockCar = getMockCarDetail(id);
        setCar(mockCar);
        if (mockCar && !mockCar.isDemoAvailable) {
            methods.setValue('bookingType', 'waitlist');
        }
    }, [id, methods]);

    // Phân tách Logic Đổ dữ liệu cấp tỉnh huyện ra một Custom Hook độc lập
    const locationData = useLocationCascade(methods);

    const handleCancel = () => {
        navigate(-1);
    };

    const onSubmit = (data) => {
        const payload = mapFormToBookingPayload(data, car?.id, isReschedule, rescheduleData);
        submitMutation.mutate(payload, {
            onSuccess: () => {
                message.success(isReschedule 
                    ? t('reschedule_success', 'Dời lịch thành công! Quý khách sẽ nhận được liên hệ xác nhận.') 
                    : t('booking_success', 'Đăng ký lái thử thành công! Quý khách sẽ nhận được liên hệ sớm nhất.'));
                navigate(-1);
            },
            onError: (error) => {
                message.error(error.message || t('booking_fail', 'Đã xảy ra lỗi hệ thống.'));
            }
        });
    };

    return {
        car,
        isLoading: submitMutation.isPending,
        isReschedule,
        handleCancel,
        methods,
        onSubmit: methods.handleSubmit(onSubmit),
        timeSlots, branches, t,
        locationData
    };
};
