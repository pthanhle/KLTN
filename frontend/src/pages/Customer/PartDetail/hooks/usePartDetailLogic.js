import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useClientSinglePartData, useSubmitPartReviewMutation } from '../../../../services/queries/clientPart.queries';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

export const usePartDetailLogic = (id) => {
    const { t } = useTranslation('partDetail');
    const navigate = useNavigate();
    const { message } = App.useApp();
    const dispatch = useDispatch();

    const { data, isLoading } = useClientSinglePartData(id);
    const part = data?.data || null;

    const [isSubmittingAction, setIsSubmittingAction] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (part && part.options && part.options.length > 0) {
            const defaults = {};
            part.options.forEach(opt => {
                const optIdentifier = opt.type;
                if (opt.choices && opt.choices.length > 0) {
                    const firstChoice = opt.choices[0];
                    defaults[optIdentifier] = typeof firstChoice === 'string' ? firstChoice : firstChoice.label;
                }
            });
            setSelectedOptions(defaults);
        }
    }, [part]);

    const handleOptionSelect = (optionName, choice) => {
        setSelectedOptions(prev => ({ ...prev, [optionName]: choice }));
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') setQuantity(q => q + 1);
        if (type === 'decrement' && quantity > 1) setQuantity(q => q - 1);
    };

    const handleAddToCart = async () => {
        if (!part) return;

        if (part.options && part.options.length > 0) {
            const missingOptions = part.options.filter(opt => !selectedOptions[opt.type]);
            if (missingOptions.length > 0) {
                message.warning(t('missing_options_warning', `Vui lòng chọn ${missingOptions[0].type} trước khi thêm vào giỏ!`));
                return;
            }
        }

        setIsSubmittingAction(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            dispatch(addToCart({
                ...part,
                id: Date.now().toString(),
                product_id: part.id,
                quantity: quantity,
                condition: 'New',
                selected_options: selectedOptions
            }));

            message.success(t('add_to_cart_success', 'Đã thêm sản phẩm vào Giỏ Hàng!'));
        } catch (error) {
            message.error(t('action_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        } finally {
            setIsSubmittingAction(false);
        }
    };

    const handleBuyNow = async () => {
        if (!part) return;

        if (part.options && part.options.length > 0) {
            const missingOptions = part.options.filter(opt => !selectedOptions[opt.type]);
            if (missingOptions.length > 0) {
                message.warning(t('missing_options_warning', `Vui lòng chọn ${missingOptions[0].type} để Mua Nhanh!`));
                return;
            }
        }

        setIsSubmittingAction(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            dispatch(addToCart({
                ...part,
                id: Date.now().toString(),
                product_id: part.id,
                quantity: quantity,
                condition: 'New',
                selected_options: selectedOptions,
                isBuyNow: true
            }));

            message.success(t('buy_now_processing', 'Đã thêm vào giỏ. Đang chuyển hướng...'));

            navigate('/cart');
        } catch (error) {
            message.error(t('action_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        } finally {
            setIsSubmittingAction(false);
        }
    };

    return {
        t,
        part,
        isLoading,
        selectedOptions,
        quantity,
        activeTab,
        setActiveTab,
        handleOptionSelect,
        handleQuantityChange,
        formatCurrency: formatVND,
        handleAddToCart,
        handleBuyNow,
        isSubmittingAction
    };
};
