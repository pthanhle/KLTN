import { useEffect } from 'react';
import { useProvinces } from '../../../../hooks/useProvinces';

export const useLocationCascade = (methods) => {
    const { provinces, districts, wards, fetchDistricts, fetchWards, loadingDistricts, loadingWards } = useProvinces();

    // Lắng nghe sự thay đổi của các trường City / District để cascade
    useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === 'city') {
                methods.setValue('district', undefined);
                methods.setValue('ward', undefined);
                if (value.city) {
                    const selectedCity = provinces.find(p => p.name === value.city);
                    if (selectedCity) fetchDistricts(selectedCity.code);
                } else {
                    fetchDistricts(null);
                }
            }
            if (name === 'district') {
                methods.setValue('ward', undefined);
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

    // Pre-fill / Hydration khi form có sẵn data ban đầu
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

    return {
        provinces,
        districts,
        wards,
        loadingDistricts,
        loadingWards
    };
};
