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

export const useTestDriveLogic = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation(['booking']);

    // Tách Param từ URL Thanh điều hướng
    const rescheduleId = searchParams.get('reschedule_id');
    const isReschedule = !!rescheduleId;

    // [REACT QUERY] Gọi API GET vé cũ
    const { data: rescheduleData, error: fetchError } = useGetTestDriveById(rescheduleId);
    const { data: userProfile } = useGetCheckoutProfile();
    
    // Xử lý Lỗi ném ra từ API GET
    useEffect(() => {
        if (fetchError) {
            message.error(t('booking_notFound', 'Không tìm thấy lịch hẹn cần dời hoặc vé đã bị khóa.'));
            navigate('/profile/test-drives', { replace: true });
        }
    }, [fetchError, t, navigate]);

    // [REACT QUERY] Gọi API POST gửi vé
    const submitMutation = useSubmitTestDrive();

    const [car, setCar] = useState(null);

    const timeSlots = TIME_SLOTS;
    const branches = SHOWROOM_BRANCHES;

    const schema = useMemo(() => getBookingSchema(t, rescheduleData, car?.isDemoAvailable ?? true), [t, rescheduleData, car]);

    // Sử dụng Utils để ánh xạ (Map) Data Lịch sử thành Default Form Values
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
        // Mock fetch car details using ID
        const mockCar = getMockCarDetail(id);
        setCar(mockCar);
        
        // Auto-switch to 'waitlist' booking tracking if no Demo car is available
        if (mockCar && !mockCar.isDemoAvailable) {
            methods.setValue('bookingType', 'waitlist');
        }
    }, [id, methods]);

    const handleCancel = () => {
        navigate(-1); // Back to previous page
    };

    const onSubmit = (data) => {
        // Sử dụng Utils để phân giải Data thô từ Form thành Payload chuẩn API
        const payload = mapFormToBookingPayload(data, car?.id, isReschedule, rescheduleData);

        // Bắn Lệnh Đột Biến (Mutation) của React Query
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
        isLoading: submitMutation.isPending, // Chuyển state loading thủ công qua tự động
        isReschedule,
        handleCancel,
        methods,
        onSubmit: methods.handleSubmit(onSubmit),
        timeSlots, branches, t
    };
};
