import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';

import { CHECKOUT_STEPS, getTimelineSteps } from '../constants/checkoutConfig';
import { useCart } from './useCart';
import { useDeliveryForm } from './useDeliveryForm';
import { useOrderSubmit } from './useOrderSubmit';
import { calculateFinalTotal } from '../utils/calculator';

export const useCheckoutLogic = () => {
    const { t } = useTranslation(['checkout']);
    const { message } = App.useApp();
    const [searchParams] = useSearchParams();

    const [currentStep, setCurrentStep] = useState(() => {
        const stepParam = searchParams.get('step');
        if (stepParam === 'payment' || stepParam === 'delivery') return CHECKOUT_STEPS.PAYMENT;
        return CHECKOUT_STEPS.CART;
    });

    const cart = useCart(t);

    const formContext = useDeliveryForm(t);

    const orderSubmit = useOrderSubmit(
        t,
        setCurrentStep,
        formContext.mockPaymentMethods,
        formContext.mockShippingMethods
    );

    const timelineSteps = useMemo(() => getTimelineSteps(t), [t]);

    const proceedToPayment = () => {
        if (!cart.hasCheckedItems) {
            message.warning(t('cart_empty_warning', "Vui lòng chọn ít nhất 1 sản phẩm để thanh toán"));
            return;
        }
        setCurrentStep(CHECKOUT_STEPS.PAYMENT);
        window.scrollTo(0, 0);
    };

    const handleCheckoutSubmitWrapper = (formData) => {
        const finalTotal = calculateFinalTotal(cart.subtotal, 0, 0);

        orderSubmit.handleCheckoutSubmit(
            formData,
            formContext.paymentMethod,
            formContext.shippingMethod,
            cart.checkedItems,
            finalTotal
        );
    };

    return {
        t,
        currentStep, setCurrentStep,
        timelineSteps,
        ...cart,
        ...formContext,
        ...orderSubmit,
        proceedToPayment,
        handleCheckoutSubmit: handleCheckoutSubmitWrapper
    };
};
