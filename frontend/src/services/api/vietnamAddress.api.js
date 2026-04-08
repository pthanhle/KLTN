import axios from 'axios';

const BASE_URL = 'https://provinces.open-api.vn/api';

export const vietnamAddressApi = {
    getProvinces: async () => {
        const res = await axios.get(`${BASE_URL}/p/`);
        return res.data;
    },
    
    getDistrictsByProvince: async (provinceCode) => {
        const res = await axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
        return res.data.districts || [];
    },

    getWardsByDistrict: async (districtCode) => {
        const res = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
        return res.data.wards || [];
    }
};
