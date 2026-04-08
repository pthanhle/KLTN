import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCheckoutProfile } from '../../../../services/queries/checkoutQueries';
import { getCheckoutSchema } from '../schemas/checkoutSchema';
import { mockShippingMethods, mockPaymentMethods } from '../data/checkout.mock';
import { useProvinces } from '../../../../hooks/useProvinces';

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
            ward: null,
            address: ''
        }
    });

    const { provinces, districts, wards, fetchDistricts, fetchWards } = useProvinces();
    const { data: userProfile } = useGetCheckoutProfile();

    useEffect(() => {
        if (userProfile) {
            const defaultAddr = userProfile.addresses?.[0] || {};
            methods.reset({
                full_name: userProfile.full_name || '',
                phone: userProfile.phone || '',
                email: userProfile.email || '',
                city: defaultAddr.city || null,
                district: defaultAddr.district || null,
                ward: defaultAddr.ward || null,
                address: defaultAddr.street || userProfile.address || ''
            });
        }
    }, [userProfile, methods]);

    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === 'city') {
                methods.setValue('district', null);
                methods.setValue('ward', null);
                if (value.city) {
                    const selectedCity = provinces.find(p => p.name === value.city);
                    if (selectedCity) fetchDistricts(selectedCity.code);
                } else {
                    fetchDistricts(null);
                }
            }
            if (name === 'district') {
                methods.setValue('ward', null);
                if (value.district) {
                    const selectedDist = districts.find(d => d.name === value.district);
                    if (selectedDist) fetchWards(selectedDist.code);
                } else {
                    fetchWards(null);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [methods, fetchDistricts, fetchWards, provinces, districts, wards]);

    useEffect(() => {
        const city = methods.getValues('city');
        if (city && provinces.length > 0) {
            const selectedCity = provinces.find(p => p.name === city);
            if (selectedCity) fetchDistricts(selectedCity.code);
        }
    }, [provinces, methods]);

    useEffect(() => {
        const district = methods.getValues('district');
        if (district && districts.length > 0) {
            const selectedDist = districts.find(d => d.name === district);
            if (selectedDist) fetchWards(selectedDist.code);
        }
    }, [districts, methods]);

    const [shippingMethod, setShippingMethod] = useState('economy');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    return {
        methods,
        shippingMethod, setShippingMethod,
        paymentMethod, setPaymentMethod,
        provinces, districts, wards,
        mockShippingMethods, mockPaymentMethods
    };
};
