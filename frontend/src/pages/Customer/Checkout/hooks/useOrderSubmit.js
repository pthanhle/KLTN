import { useState } from 'react';
import { App } from 'antd';
import { useSubmitOrder } from '../../../../services/queries/checkoutQueries';
import { maskEmailAddress, generateOrderId } from '../utils/stringFormatter';
import { CHECKOUT_STEPS } from '../constants/checkoutConfig';

export const useOrderSubmit = (t, setCurrentStep, mockCities, currentDistricts, mockPaymentMethods, mockShippingMethods) => {
    const [orderSuccessData, setOrderSuccessData] = useState(null);
    const submitMutation = useSubmitOrder();
    const { message } = App.useApp();

    const handleCheckoutSubmit = (data, paymentMethod, shippingMethod, checkedItems, finalTotal) => {
        const cityLabel = mockCities.find(c => c.value === data.city)?.label || data.city;
        const districtLabel = currentDistricts.find(d => d.value === data.district)?.label || data.district;

        const payloadInfo = {
            order_code: generateOrderId(),
            financials: {
                grand_total: finalTotal
            },
            payment: {
                method: paymentMethod, // ID phương thức: credit_card, vnpay
                method_name: mockPaymentMethods.find(m => m.id === paymentMethod)?.label || 'Tiền mặt',
                card_tail: paymentMethod === 'credit_card' ? '8899' : null,
                status: 'PAID'
            },
            shipping: {
                provider: mockShippingMethods.find(m => m.id === shippingMethod)?.label || 'Tiêu chuẩn',
                estimated_delivery: '15/11 - 18/11'
            },
            delivery: {
                receiver_name: data.full_name,
                phone: data.phone,
                email: data.email,
                masked_email: maskEmailAddress(data.email),
                address: `${data.address}, ${districtLabel}, ${cityLabel}`
            },
            items: checkedItems.map(item => ({
                id: item.id,
                product_id: item.id,
                sku: item.sku,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.price * item.quantity,
                selected_options: item.selected_options || {}
            }))
        };

        submitMutation.mutate(payloadInfo, {
            onSuccess: (result) => {
                setOrderSuccessData(result.data);
                setCurrentStep(CHECKOUT_STEPS.SUCCESS);
                window.scrollTo(0, 0);
            },
            onError: () => {
                message.error(t('checkout_err', "Thanh toán thất bại, vui lòng thử lại."));
            }
        });
    };



    const handleCopyOrderId = (id) => {
        navigator.clipboard.writeText(id || '');
        message.success(t('success_copied', 'Đã copy mã đơn hàng'));
    };

    return {
        isLoading: submitMutation.isPending,
        orderSuccessData,
        handleCheckoutSubmit,
        handleCopyOrderId
    };
};
