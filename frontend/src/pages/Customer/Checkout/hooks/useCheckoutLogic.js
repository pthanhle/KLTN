import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';

import { CHECKOUT_STEPS, getTimelineSteps } from '../constants/checkoutConfig';
import { useCart } from './useCart';
import { useDeliveryForm } from './useDeliveryForm';
import { useOrderSubmit } from './useOrderSubmit';
import { calculateFinalTotal } from '../utils/calculator';
import loyaltyApi from '../../../../services/api/loyalty.api';

export const useCheckoutLogic = () => {
    const { t } = useTranslation(['checkout']);
    const { message } = App.useApp();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Redirect service deposit payments to the service tracking page
    useEffect(() => {
        const type = searchParams.get('type');
        const orderId = searchParams.get('order_id');
        const pathname = window.location.pathname;
        if ((pathname.includes('/payment/success') || pathname.includes('/payment/failed')) && type === 'quotation' && orderId) {
            if (pathname.includes('/payment/success')) {
                navigate(`/tracking/${orderId}?tab=quotations`, { replace: true });
            } else {
                navigate(`/tracking/${orderId}?deposit_failed=1`, { replace: true });
            }
        }
    }, [searchParams, navigate]);

    const [currentStep, setCurrentStep] = useState(() => {
        const pathname = window.location.pathname;
        if (pathname.includes('/payment/success') || pathname.includes('/payment/failed')) {
            return CHECKOUT_STEPS.SUCCESS;
        }
        const stepParam = searchParams.get('step');
        if (stepParam === 'payment' || stepParam === 'delivery') return CHECKOUT_STEPS.PAYMENT;
        return CHECKOUT_STEPS.CART;
    });

    const [appliedVoucher, setAppliedVoucher] = useState(null);
    const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);

    const cart = useCart(t);
    const formContext = useDeliveryForm(t);
    const orderSubmit = useOrderSubmit(
        t,
        setCurrentStep,
        formContext.mockPaymentMethods,
        formContext.mockShippingMethods
    );

    const timelineSteps = useMemo(() => getTimelineSteps(t), [t]);

    const discount = useMemo(() => {
        if (!appliedVoucher) return 0;

        const { discount_type, discount_value, max_discount, min_order_value } = appliedVoucher;

        if (cart.subtotal < min_order_value) {
            return 0;
        }

        if (discount_type === 'PERCENT') {
            const percentDiscount = (cart.subtotal * discount_value) / 100;
            return max_discount ? Math.min(percentDiscount, max_discount) : percentDiscount;
        }

        if (discount_type === 'FIXED') {
            return Math.min(discount_value, cart.subtotal);
        }

        return 0;
    }, [appliedVoucher, cart.subtotal]);

    const applyPromoCode = async (code) => {
        if (!code || !code.trim()) {
            message.warning('Vui lòng nhập mã voucher');
            return;
        }

        setIsValidatingVoucher(true);
        try {
            const response = await loyaltyApi.validateVoucherCode(code.trim().toUpperCase());
            const voucher = response.voucher || response;

            if (voucher.min_order_value > cart.subtotal) {
                message.warning(
                    `Đơn hàng tối thiểu ${(voucher.min_order_value / 1000).toLocaleString()}k để sử dụng voucher này`
                );
                return;
            }

            setAppliedVoucher(voucher);
            message.success(`Đã áp dụng voucher: ${voucher.title}`);
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error?.message || 'Mã voucher không hợp lệ';
            message.error(errorMsg);
        } finally {
            setIsValidatingVoucher(false);
        }
    };

    const removeVoucher = () => {
        setAppliedVoucher(null);
        message.info('Đã gỡ voucher');
    };

    const proceedToPayment = () => {
        if (!cart.hasCheckedItems) {
            message.warning(t('cart_empty_warning', "Vui lòng chọn ít nhất 1 sản phẩm để thanh toán"));
            return;
        }

        const invalidItems = cart.checkedItems.filter(item => {
            const availableStock = item.inventory?.available_stock ?? item.stock ?? 0;
            return item.quantity > availableStock;
        });

        if (invalidItems.length > 0) {
            const item = invalidItems[0];
            message.error(t('cart_invalid_stock', {
                defaultValue: `Số lượng sản phẩm "${item.name}" vượt quá tồn kho cho phép. Vui lòng giảm số lượng!`,
                name: item.name
            }));
            return;
        }

        setCurrentStep(CHECKOUT_STEPS.PAYMENT);
        window.scrollTo(0, 0);
    };

    const shippingFee = useMemo(() => {
        const method = formContext.mockShippingMethods.find(m => m.id === formContext.shippingMethod);
        return method ? method.price : 0;
    }, [formContext.shippingMethod, formContext.mockShippingMethods]);

    const handleCheckoutSubmitWrapper = (formData) => {
        const finalTotal = calculateFinalTotal(cart.subtotal, shippingFee, discount);

        orderSubmit.handleCheckoutSubmit(
            formData,
            formContext.paymentMethod,
            formContext.shippingMethod,
            cart.checkedItems,
            finalTotal,
            appliedVoucher,
            shippingFee,
            discount
        );
    };

    return {
        t,
        currentStep,
        setCurrentStep,
        timelineSteps,
        ...cart,
        ...formContext,
        ...orderSubmit,
        proceedToPayment,
        handleCheckoutSubmit: handleCheckoutSubmitWrapper,
        appliedVoucher,
        discount,
        applyPromoCode,
        removeVoucher,
        isValidatingVoucher,
        shippingFee,
    };
};
