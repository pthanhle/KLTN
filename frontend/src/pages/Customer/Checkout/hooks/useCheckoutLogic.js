import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCheckoutSchema } from '../schemas/checkoutSchema';
import { mockCartItems, mockCities, mockDistricts, mockShippingMethods, mockPaymentMethods } from '../data/checkout.mock';
import { message } from 'antd';

export const useCheckoutLogic = () => {
    const { t } = useTranslation(['checkout']);
    
    // Core states
    const [currentStep, setCurrentStep] = useState(1); // 1: Cart, 2: Payment, 3: Success
    const [cartItems, setCartItems] = useState(mockCartItems);
    const [isLoading, setIsLoading] = useState(false);
    const [orderSuccessData, setOrderSuccessData] = useState(null);

    // Hook Form Setup for Step 2
    const schema = useMemo(() => getCheckoutSchema(t), [t]);
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            city: null,
            district: null,
            address: ''
        }
    });

    // Watch values to power dependent fields
    const watchedCity = methods.watch('city');
    const currentDistricts = watchedCity ? mockDistricts[watchedCity] || [] : [];

    // Reset district if city changes
    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === 'city') {
                methods.setValue('district', null);
            }
        });
        return () => subscription.unsubscribe();
    }, [methods]);

    // Other Method states
    const [shippingMethod, setShippingMethod] = useState('economy');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    // Derived states
    const checkedItems = useMemo(() => cartItems.filter(item => item.checked), [cartItems]);
    const subtotal = useMemo(() => {
        return checkedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [checkedItems]);
    
    const hasItems = cartItems.length > 0;
    const hasCheckedItems = checkedItems.length > 0;

    // Handlers
    const toggleItemCheck = (id) => {
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const toggleAllChecks = (selectAll) => {
        setCartItems(prev => prev.map(item => ({ ...item, checked: selectAll })));
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id !== id) return item;
            const newQuantity = item.quantity + delta;
            if (newQuantity < 1 || newQuantity > item.stock) return item;
            return { ...item, quantity: newQuantity };
        }));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        message.success(t('remove_success', "Đã xóa sản phẩm"));
    };

    const applyPromoCode = (code) => {
        if (!code) return;
        message.info(`Đã áp dụng mã: ${code}`);
    };

    // Navigation Handlers
    const proceedToPayment = () => {
        if (!hasCheckedItems) {
            message.warning("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán");
            return;
        }
        setCurrentStep(2);
        window.scrollTo(0, 0);
    };

    const handleCheckoutSubmit = async (data) => {
        // Here, data comes from handleSubmit of react-hook-form
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Parse for Step 3
            const cityLabel = mockCities.find(c => c.value === data.city)?.label || data.city;
            const districtLabel = currentDistricts.find(d => d.value === data.district)?.label || data.district;

            setOrderSuccessData({
                orderId: "HDTT-" + Math.floor(Math.random() * 1000000),
                orderDate: new Date().toLocaleDateString('vi-VN'),
                deliveryEst: "Giao trong 2-3 ngày",
                total: data.finalTotal,
                paymentMethod: mockPaymentMethods.find(m => m.id === paymentMethod)?.label || 'Tiền mặt',
                shippingMethod: mockShippingMethods.find(m => m.id === shippingMethod)?.label || 'Tiêu chuẩn',
                address: `${data.address}, ${districtLabel}, ${cityLabel}`,
                customerName: data.fullName,
                customerPhone: data.phone,
                customerEmail: data.email
            });
            setCurrentStep(3);
            window.scrollTo(0, 0);
        } catch (error) {
            message.error(t('checkout_err', "Thanh toán thất bại, vui lòng thử lại."));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        t,
        currentStep, setCurrentStep,
        cartItems, checkedItems,
        subtotal, hasItems, hasCheckedItems,
        isLoading, orderSuccessData,
        methods,
        shippingMethod, setShippingMethod,
        paymentMethod, setPaymentMethod,
        mockCities, currentDistricts, mockShippingMethods, mockPaymentMethods,
        toggleItemCheck, toggleAllChecks, updateQuantity, removeItem, applyPromoCode,
        proceedToPayment, handleCheckoutSubmit
    };
};
