import { useState, useEffect } from 'react';
import { vietnamAddressApi } from '../services/api/vietnamAddress.api';

export const useProvinces = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    useEffect(() => {
        const fetchProvinces = async () => {
            setLoadingProvinces(true);
            try {
                const data = await vietnamAddressApi.getProvinces();
                setProvinces(data);
            } catch (error) {
                console.error("Failed to fetch provinces", error);
            } finally {
                setLoadingProvinces(false);
            }
        };
        fetchProvinces();
    }, []);

    const fetchDistricts = async (provinceCode) => {
        if (!provinceCode) {
            setDistricts([]);
            setWards([]);
            return;
        }
        setLoadingDistricts(true);
        try {
            const data = await vietnamAddressApi.getDistrictsByProvince(provinceCode);
            setDistricts(data);
            setWards([]);
        } catch (error) {
            console.error("Failed to fetch districts", error);
        } finally {
            setLoadingDistricts(false);
        }
    };

    const fetchWards = async (districtCode) => {
        if (!districtCode) {
            setWards([]);
            return;
        }
        setLoadingWards(true);
        try {
            const data = await vietnamAddressApi.getWardsByDistrict(districtCode);
            setWards(data);
        } catch (error) {
            console.error("Failed to fetch wards", error);
        } finally {
            setLoadingWards(false);
        }
    };

    return {
        provinces,
        districts,
        wards,
        fetchDistricts,
        fetchWards,
        loadingProvinces,
        loadingDistricts,
        loadingWards
    };
};
