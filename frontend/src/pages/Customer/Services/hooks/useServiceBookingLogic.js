import { useState, useMemo, useEffect } from 'react';
import { App } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getServiceBookingSchema } from '../schemas/servicesSchema';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { VEHICLE_BRANDS, SERVICE_CATEGORIES, TIME_SLOTS } from '../constants/bookingConstants';
import { MOCK_SERVICES_DATA } from '../data/services.mock';
import { useClientServiceItemsQuery } from '../../../../services/queries/serviceItemQueries';
import { useClientServiceCategoriesQuery } from '../../../../services/queries/serviceCategoryQueries';

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

    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || '');

    const { data: serviceItemsData, isLoading: isServicesLoading } = useClientServiceItemsQuery();
    const { data: categoriesData } = useClientServiceCategoriesQuery();

    const servicesFromApi = serviceItemsData?.services || [];

    const dynamicCategories = useMemo(() => {
        if (!categoriesData || categoriesData.length === 0) return SERVICE_CATEGORIES;

        return categoriesData.map(cat => {
            return {
                id: cat._id,
                labelKey: cat.name,
                iconName: cat.icon || 'Wrench'
            };
        });
    }, [categoriesData]);

    useEffect(() => {
        if (!selectedCategory && dynamicCategories.length > 0) {
            setSelectedCategory(dynamicCategories[0].id);
        } else if (selectedCategory && categoriesData && categoriesData.length > 0) {
            const isObjectId = selectedCategory.length === 24;
            if (!isObjectId) {
                const match = categoriesData.find(c => c.name === selectedCategory);
                if (match) {
                    setSelectedCategory(match._id);
                }
            }
        }
    }, [dynamicCategories, categoriesData, selectedCategory]);

    const filteredServices = servicesFromApi.filter(s => s.category?._id === selectedCategory);

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
            newServices = [...currentServices, { _id: srv._id, serviceName: srv.serviceName, basePrice: srv.basePrice, priceType: srv.priceType }];
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
        services: servicesFromApi,
        categories: dynamicCategories,
        vehicleBrands: VEHICLE_BRANDS,
        timeSlots: TIME_SLOTS,
        filteredServices,
        selectedCategory,
        setSelectedCategory,
        bookingData,
        isSubmitting,
        isStep1Valid,
        isStep2Valid,
        isServicesLoading,
        updateBookingData,
        handleServiceToggle,
        handleNextStep,
        handlePrevStep,
        handleSubmitBooking
    };
};
