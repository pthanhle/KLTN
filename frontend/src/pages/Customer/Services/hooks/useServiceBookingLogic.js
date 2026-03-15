import { useState, useMemo } from 'react';
import { App } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getServiceBookingSchema } from '../schemas/servicesSchema';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const useServiceBookingLogic = () => {
    const { message } = App.useApp();
    const { t } = useTranslation(['services']);
    const location = useLocation();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'Bảo dưỡng');

    const vehicleBrands = [
        { value: 'Mercedes', label: 'Mercedes-Benz' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Audi', label: 'Audi' },
        { value: 'Porsche', label: 'Porsche' },
        { value: 'Lexus', label: 'Lexus' },
        { value: 'Other', label: 'Khác (Other)' },
    ];

    const categories = [
        { id: 'Bảo dưỡng', labelKey: 'maintenance', iconName: 'Settings' },
        { id: 'Sửa chữa', labelKey: 'repair', iconName: 'Wrench' },
        { id: 'Chăm sóc xe', labelKey: 'spa', iconName: 'Sparkles' },
        { id: 'Gầm bệ - Lốp', labelKey: 'tires', iconName: 'CircleDashed' },
    ];

    const services = [
        {
            _id: 'srv_1',
            service_name: 'Bảo dưỡng định kỳ (B-Service) Mercedes',
            description: 'Bao gồm thay dầu động cơ, thay lọc dầu, kiểm tra hệ thống phanh, kiểm tra nước làm mát, vệ sinh lọc gió, quét lỗi phần mềm chẩn đoán chuyên sâu (Xentry). Khuyến cáo sau mỗi 10,000 km.',
            price: 4500000,
            duration: '120 phút',
            category: 'Bảo dưỡng',
            image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: 'srv_2',
            service_name: 'Kiểm tra tổng quát 160 điểm (Pre-Purchase)',
            description: 'Dành cho xe mới hoặc trước khi mua bán. Đội ngũ chuyên gia sẽ lên cầu kẹp thiết bị đo nội soi gầm, động cơ, khung gầm và hệ thống điện mạch.',
            price: 2800000,
            duration: '90 phút',
            category: 'Kiểm tra đo đạc',
            image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: 'srv_3',
            service_name: 'Phủ Ceramic Siêu Bóng (Gói Diamond)',
            description: 'Đánh bóng hiệu chỉnh bề mặt sơn 3 bước. Phủ 3 lớp Ceramic chuẩn 9H+ từ Đức (Kisho/CarPro). Bảo hành độ bóng 5 năm.',
            price: 18500000,
            duration: '2 ngày',
            category: 'Chăm sóc xe',
            image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: 'srv_4',
            service_name: 'Thay mâm vỏ và Cân bằng động Road Force',
            description: 'Hệ thống Hunter cân bằng động và kẹp chì. Miễn phí hệ thống bơm khí Nitơ tinh khiết cho 4 lốp.',
            price: 1200000,
            duration: '60 phút',
            category: 'Gầm bệ - Lốp',
            image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800'
        }
    ];

    const timeSlots = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00'];

    const filteredServices = services.filter(s => s.category === selectedCategory || s.category === 'Kiểm tra đo đạc');

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

    const handleSubmitBooking = async (t) => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Dữ liệu gửi lên BE: ", bookingData);
        setIsSubmitting(false);
        message.success({
            content: t ? t('services:booking_success', 'Booking successful! We will contact you soon.') : 'Booking successful!',
            style: {
                marginTop: '10vh',
            },
        });
    };

    return {
        methods,
        currentStep,
        services,
        categories,
        vehicleBrands,
        filteredServices,
        selectedCategory,
        setSelectedCategory,
        timeSlots,
        bookingData,
        isSubmitting,
        isStep1Valid,
        isStep2Valid,
        updateBookingData,
        handleServiceToggle,
        handleNextStep,
        handlePrevStep,
        handleSubmitBooking
    }
}
