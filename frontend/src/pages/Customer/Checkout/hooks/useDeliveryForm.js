import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCheckoutProfile } from '../../../../services/queries/checkoutQueries';
import { getCheckoutSchema } from '../schemas/checkoutSchema';
import { mockCities, mockDistricts, mockShippingMethods, mockPaymentMethods } from '../data/checkout.mock';

export const useDeliveryForm = (t) => {
    const schema = useMemo(() => getCheckoutSchema(t), [t]);
    
    const methods = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            full_name: '',
            phone: '',
            email: '',
            city: null,
            district: null,
            address: ''
        }
    });

    // Gọi API BE kéo Profile User
    const { data: userProfile } = useGetCheckoutProfile();

    // Reset điền Form ngay khi lấy được thông tin User
    useEffect(() => {
        if (userProfile) {
            methods.reset(userProfile);
        }
    }, [userProfile, methods]);

    const watchedCity = methods.watch('city');
    const currentDistricts = watchedCity ? mockDistricts[watchedCity] || [] : [];

    // Reset quận/huyện nếu thành phố thay đổi
    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === 'city') {
                methods.setValue('district', null);
            }
        });
        return () => subscription.unsubscribe();
    }, [methods]);

    const [shippingMethod, setShippingMethod] = useState('economy');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    return {
        methods,
        shippingMethod, setShippingMethod,
        paymentMethod, setPaymentMethod,
        mockCities, currentDistricts, mockShippingMethods, mockPaymentMethods
    };
};
