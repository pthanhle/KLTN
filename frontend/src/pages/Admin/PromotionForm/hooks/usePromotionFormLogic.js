import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { promotionFormSchema } from '../schemas/promotionFormSchema';
import { PROMOTION_FORM_DEFAULT_VALUES } from '../constants/promotionForm.constants';
import {
    useAdminPromotionDetailQuery,
    useAdminPromotionMutations,
} from '../../../../services/queries/promotion.queries';

export const usePromotionFormLogic = () => {
    const { t } = useTranslation(['adminPromotionForm', 'adminPromotions']);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(promotionFormSchema),
        defaultValues: PROMOTION_FORM_DEFAULT_VALUES,
        mode: 'onChange',
    });

    const { data: promotionData, isLoading: isFetching } = useAdminPromotionDetailQuery(
        isEditMode ? id : null
    );

    useEffect(() => {
        if (isEditMode && promotionData) {
            form.reset({
                ...PROMOTION_FORM_DEFAULT_VALUES,
                title: promotionData.title,
                description: promotionData.description,
                discount_type: promotionData.discount_type,
                discount_value: promotionData.discount_value,
                max_discount: promotionData.max_discount,
                is_loyalty: promotionData.is_loyalty,
                points_required: promotionData.points_required || 0,
                code: promotionData.code || '',
                min_order_value: promotionData.min_order_value || 0,
                date_range:
                    promotionData.start_date && promotionData.end_date
                        ? [dayjs(promotionData.start_date), dayjs(promotionData.end_date)]
                        : null,
                validity_days: promotionData.validity_days || 0,
            });
        }
    }, [isEditMode, promotionData, form]);

    const { createPromotion, updatePromotion } = useAdminPromotionMutations();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const submitData = { ...data };

            if (submitData.is_loyalty) {
                submitData.code = null;
                submitData.start_date = null;
                submitData.end_date = null;
            } else {
                submitData.points_required = 0;
                submitData.validity_days = 0;
                if (submitData.date_range?.length === 2) {
                    submitData.start_date = submitData.date_range[0].toISOString();
                    submitData.end_date = submitData.date_range[1].toISOString();
                }
            }
            delete submitData.date_range;

            if (isEditMode) {
                await updatePromotion({ id, data: submitData });
            } else {
                await createPromotion(submitData);
            }

            message.success(t('msg_save_success'));
            navigate('/admin/promotions');
        } catch (err) {
            const errMsg = err?.response?.data?.message || t('msg_error') || 'Có lỗi xảy ra';
            message.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        isLoading,
        isFetching,
        isEditMode,
        t,
        navigate,
    };
};
