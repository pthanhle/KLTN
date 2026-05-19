import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { promotionFormSchema } from '../schemas/promotionFormSchema';
import { PROMOTION_FORM_DEFAULT_VALUES } from '../constants/promotionForm.constants';
import { mockPromotionsData } from '../../Promotions/data/promotions.mock';

export const usePromotionFormLogic = () => {
    const { t } = useTranslation(['adminPromotionForm', 'adminPromotions']);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEditMode);

    const form = useForm({
        resolver: zodResolver(promotionFormSchema),
        defaultValues: PROMOTION_FORM_DEFAULT_VALUES,
        mode: 'onChange'
    });

    useEffect(() => {
        if (isEditMode) {
            // MOCK FETCH DATA
            const timer = setTimeout(() => {
                const mockData = mockPromotionsData.find(item => item._id === id);
                if (mockData) {
                    form.reset({
                        ...PROMOTION_FORM_DEFAULT_VALUES,
                        title: mockData.title,
                        description: mockData.description,
                        discount_type: mockData.discount_type,
                        discount_value: mockData.discount_value,
                        max_discount: mockData.max_discount,
                        is_loyalty: mockData.is_loyalty,
                        points_required: mockData.points_required || 0,
                        code: mockData.code || '',
                        min_order_value: mockData.min_order_value || 0,
                        date_range: mockData.start_date && mockData.end_date ? [dayjs(mockData.start_date), dayjs(mockData.end_date)] : null,
                        validity_days: mockData.validity_days || 0
                    });
                }
                setIsFetching(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isEditMode, form]);

    const onSubmit = async (data) => {
        setIsLoading(true);

        const submitData = { ...data };
        if (submitData.is_loyalty) {
            submitData.code = null;
            submitData.date_range = null;
        } else {
            submitData.points_required = 0;
            submitData.validity_days = 0;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("SUBMIT DATA:", submitData);
        message.success(t('msg_save_success'));
        setIsLoading(false);
        navigate('/admin/promotions');
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isLoading,
        isFetching,
        isEditMode,
        t,
        navigate
    };
};
