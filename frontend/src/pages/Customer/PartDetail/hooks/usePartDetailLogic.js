import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useClientSinglePartData, useSubmitPartReviewMutation } from '../../../../services/queries/clientPart.queries';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToCart } from '@/services/queries/clientCart.queries';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

export const usePartDetailLogic = (id) => {
    const { t } = useTranslation('partDetail');
    const navigate = useNavigate();
    const { message } = App.useApp();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const { data, isLoading } = useClientSinglePartData(id);
    const part = data?.data || null;

    const [selectedOptions, setSelectedOptions] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        // Reset selection when the part changes (e.g. navigating between parts)
        setSelectedOptions({});
    }, [part?._id]);

    const handleOptionSelect = (optionName, choice) => {
        setSelectedOptions(prev => {
            if (prev[optionName] === choice) {
                // Second click on same choice → deselect, return to default price/image
                const next = { ...prev };
                delete next[optionName];
                return next;
            }
            return { ...prev, [optionName]: choice };
        });
    };

    // Derive the selected choice object for a given option type
    const getSelectedChoice = (optType) => {
        if (!part?.options) return null;
        const opt = part.options.find(o => o.type === optType);
        if (!opt?.choices) return null;
        const selectedLabel = selectedOptions[optType];
        return opt.choices.find(c => (typeof c === 'string' ? c : c.label) === selectedLabel) || null;
    };

    const displayPrice = useMemo(() => {
        if (!part) return 0;
        let price = part.price || 0;
        if (part.options) {
            part.options.forEach(opt => {
                const choice = getSelectedChoice(opt.type);
                if (choice && typeof choice === 'object' && choice.price_modifier) {
                    price += choice.price_modifier;
                }
            });
        }
        return price;
    }, [part, selectedOptions]);

    const variantImageUrl = useMemo(() => {
        if (!part?.options) return null;
        for (const opt of part.options) {
            const choice = getSelectedChoice(opt.type);
            if (choice && typeof choice === 'object' && choice.image_url) {
                return choice.image_url;
            }
        }
        return null;
    }, [part, selectedOptions]);

    const handleQuantityChange = (type) => {
        const availableStock = part?.inventory?.available_stock ?? part?.stock ?? 0;
        if (type === 'increment' && quantity < availableStock) setQuantity(q => q + 1);
        if (type === 'decrement' && quantity > 1) setQuantity(q => q - 1);
    };

    // API hooks
    const { mutate: addToCartApi, isPending: isAdding } = useAddToCart();

    const handleAddToCart = () => {
        if (!part) return;

        if (part.options && part.options.length > 0) {
            const missingOptions = part.options.filter(opt => !selectedOptions[opt.type]);
            if (missingOptions.length > 0) {
                message.warning(t('missing_options_warning', `Vui lòng chọn ${missingOptions[0].type} trước khi thêm vào giỏ!`));
                return;
            }
        }

        const availableStock = part.inventory?.available_stock ?? part.stock ?? 0;
        const existingCartItem = cartItems.find(item => 
            item.part_id === part.id && 
            JSON.stringify(item.selected_options || {}) === JSON.stringify(selectedOptions)
        );
        const existingQuantity = existingCartItem ? existingCartItem.quantity : 0;

        if (quantity + existingQuantity > availableStock) {
            message.warning(t('exceeds_stock_warning', {
                defaultValue: `Sản phẩm này không đủ số lượng tồn kho để đáp ứng yêu cầu của bạn.`
            }));
            return;
        }

        addToCartApi({
            part_id: part.id,
            quantity: quantity,
            selected_options: selectedOptions
        }, {
            onSuccess: () => {
                message.success(t('add_to_cart_success', 'Đã thêm sản phẩm vào Giỏ Hàng!'));
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
            }
        });
    };

    const handleBuyNow = () => {
        if (!part) return;

        if (part.options && part.options.length > 0) {
            const missingOptions = part.options.filter(opt => !selectedOptions[opt.type]);
            if (missingOptions.length > 0) {
                message.warning(t('missing_options_warning', `Vui lòng chọn ${missingOptions[0].type} để Mua Nhanh!`));
                return;
            }
        }

        const availableStock = part.inventory?.available_stock ?? part.stock ?? 0;
        const existingCartItem = cartItems.find(item => 
            item.part_id === part.id && 
            JSON.stringify(item.selected_options || {}) === JSON.stringify(selectedOptions)
        );
        const existingQuantity = existingCartItem ? existingCartItem.quantity : 0;

        if (quantity + existingQuantity > availableStock) {
            message.warning(t('exceeds_stock_warning', {
                defaultValue: `Sản phẩm này không đủ số lượng tồn kho để đáp ứng yêu cầu của bạn.`
            }));
            return;
        }

        addToCartApi({
            part_id: part.id,
            quantity: quantity,
            selected_options: selectedOptions
        }, {
            onSuccess: () => {
                import('@/store/slices/cartSlice').then(({ isolateCheckedItem }) => {
                    dispatch(isolateCheckedItem(part.id));
                    message.success(t('add_to_cart_success', 'Đã thêm sản phẩm vào Giỏ Hàng!'));
                    navigate('/cart');
                });
            },
            onError: (err) => {
                message.error(err.response?.data?.message || t('action_error', 'Có lỗi xảy ra, vui lòng thử lại!'));
            }
        });
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
        isSubmittingAction: isAdding,
        displayPrice,
        variantImageUrl
    };
};
