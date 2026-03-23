import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getPreorderSchema } from '../schemas/preorderSchema';
import { getMockPartDetail } from '@/pages/Customer/PartDetail/data/mockPartDetail';

export const usePreorderLogic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { message } = App.useApp();
    const { t } = useTranslation('parts');
    const { user } = useSelector((state) => state.auth);

    const [part, setPart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Read state from Product Detail page
    const { selectedOptions: initialSelectedOptions = {}, quantity: defaultQuantity = 1 } = location.state || {};

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: async (data, context, options) => {
            const schema = getPreorderSchema(t, part?.options || []);
            return zodResolver(schema)(data, context, options);
        },
        defaultValues: {
            fullName: user?.fullName || '',
            phoneNumber: user?.phoneNumber || user?.phone || '',
            email: user?.email || '',
            vehicleBrand: '',
            quantity: defaultQuantity,
            selectedOptions: initialSelectedOptions,
        }
    });

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const fetchedPart = getMockPartDetail(id);
            if (!fetchedPart) {
                navigate('/parts');
            } else {
                setPart(fetchedPart);
                // Try pre-filling brand if universal is false
                if (fetchedPart.compatible_brands && fetchedPart.compatible_brands.length === 1) {
                    setValue('vehicleBrand', fetchedPart.compatible_brands[0]);
                }
            }
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id, navigate, setValue]);

    const quantityValue = watch('quantity');
    const handleQuantityChange = (amount) => {
        const current = parseInt(quantityValue, 10) || 1;
        const nextValue = current + amount;
        if (nextValue >= 1 && nextValue <= 100) {
            setValue('quantity', nextValue, { shouldValidate: true });
        }
    };

    const handleOptionSelect = (optionName, value) => {
        const currentOptions = { ...watch('selectedOptions') };
        currentOptions[optionName] = value;
        setValue('selectedOptions', currentOptions, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success(t('preorder_success', 'Đã gửi yêu cầu, Cố vấn Dịch vụ sẽ liên hệ xác nhận báo giá trong 30 phút!'));
            navigate('/parts');
        } catch (error) {
            message.error(t('action_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        part,
        selectedOptions: watch('selectedOptions') || initialSelectedOptions,
        isLoading,
        isSubmitting,
        control,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        quantityValue,
        handleQuantityChange,
        handleOptionSelect,
        navigate,
        t
    };
};
