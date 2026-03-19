import { useState, useMemo } from 'react';
import { App } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getServiceBookingSchema } from '../schemas/servicesSchema';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Import Constants & Mocks đã được xé lẻ ra
import { VEHICLE_BRANDS, SERVICE_CATEGORIES, TIME_SLOTS } from '../constants/bookingConstants';
import { MOCK_SERVICES_DATA } from '../data/services.mock';

export const useServiceBookingLogic = () => {
    const { message } = App.useApp();
    const { t } = useTranslation(['services']);
    const location = useLocation();

    // 1. Quản lý Step và State vòng chờ API
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Tái cấu trúc Zod Schema & React Hook Form
    const schema = useMemo(() => getServiceBookingSchema(t), [t]);
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            selected_services: [],
            vehicle_brand: null,
            vehicle_model: '',
            license_plate: '',
            vehicle_condition: '',
            booking_date: '',
            time_slot: ''
        }
    });

    const bookingData = methods.watch();
    
    // 3. Logic chọn Dịch vụ
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'Bảo dưỡng');
    // Phép lọc dữ liệu với Data Tĩnh được nhét vào Hook
    const filteredServices = MOCK_SERVICES_DATA.filter(s => s.category === selectedCategory || s.category === 'Kiểm tra đo đạc');

    // 4. Các Hàm Handler Điều hướng & Chọn lựa
    const handleNextStep = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const updateBookingData = (data) => {
        Object.entries(data).forEach(([key, value]) => {
            methods.setValue(key, value, { shouldValidate: true, shouldDirty: true });
        });
    };

    const handleServiceToggle = (srv) => {
        const currentServices = methods.getValues('selected_services');
        const isExists = currentServices.some(s => s._id === srv._id);
        let newServices;
        if (isExists) {
            newServices = currentServices.filter(s => s._id !== srv._id);
        } else {
            newServices = [...currentServices, { _id: srv._id, service_name: srv.service_name, price: srv.price }];
        }
        methods.setValue('selected_services', newServices, { shouldValidate: true });
    };

    const isStep1Valid = Boolean(
        bookingData.vehicle_brand &&
        bookingData.vehicle_model &&
        bookingData.license_plate &&
        bookingData.selected_services.length > 0
    );
    const isStep2Valid = Boolean(bookingData.booking_date && bookingData.time_slot);

    // 5. Logic Core - Fake API
    const handleSubmitBooking = async (t) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Dữ liệu gửi lên BE: ", bookingData);
            
            message.success({
                content: t ? t('services:booking_success', 'Booking successful! We will contact you soon.') : 'Booking successful!',
                style: { marginTop: '10vh' },
            });
            // Tương lai: redirect sang trang OrderSuccess báo thành công
        } catch (error) {
            message.error("Lỗi hệ thống");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        methods,
        currentStep,
        
        // Trả ra các Constants & Mock Data cho View sử dụng
        services: MOCK_SERVICES_DATA,
        categories: SERVICE_CATEGORIES,
        vehicleBrands: VEHICLE_BRANDS,
        timeSlots: TIME_SLOTS,
        
        filteredServices,
        selectedCategory,
        setSelectedCategory,
        bookingData,
        isSubmitting,
        isStep1Valid,
        isStep2Valid,
        updateBookingData,
        handleServiceToggle,
        handleNextStep,
        handlePrevStep,
        handleSubmitBooking
    };
};
