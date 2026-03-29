import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { getMockPartDetail } from '../data/mockPartDetail';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

export const usePartDetailLogic = (id) => {
    const { t } = useTranslation('parts');
    const navigate = useNavigate();
    const { message } = App.useApp();
    const dispatch = useDispatch();

    const [part, setPart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittingAction, setIsSubmittingAction] = useState(false);

    // State Options variants
    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // Simulate API fetch
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setPart(getMockPartDetail(id));
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    const handleOptionSelect = (optionName, choice) => {
        setSelectedOptions(prev => ({ ...prev, [optionName]: choice }));
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') setQuantity(q => q + 1);
        if (type === 'decrement' && quantity > 1) setQuantity(q => q - 1);
    };

    const handleAddToCart = async () => {
        if (!part) return;

        // Validation for missing options
        if (part.options && part.options.length > 0) {
            const missingOptions = part.options.filter(opt => !selectedOptions[opt.name]);
            if (missingOptions.length > 0) {
                message.warning(t('missing_options_warning', `Vui lòng chọn ${missingOptions[0].name} trước khi thêm vào giỏ!`));
                return;
            }
        }

        setIsSubmittingAction(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // Delay xử lý mạng

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

        // Validation for missing options
        if (part.options && part.options.length > 0) {
            const missingOptions = part.options.filter(opt => !selectedOptions[opt.name]);
            if (missingOptions.length > 0) {
                message.warning(t('missing_options_warning', `Vui lòng chọn ${missingOptions[0].name} để Mua Nhanh!`));
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

    const submitReview = (rating, comment) => {
        console.log('User submitted review:', rating, comment);
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
        submitReview,
        isSubmittingAction
    };
};
