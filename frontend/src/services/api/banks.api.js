import axios from 'axios';

export const fetchBanks = async () => {
    try {
        const response = await axios.get('https://api.vietqr.io/v2/banks');
        if (response.data && response.data.code === '00') {
            return response.data.data;
        }
        throw new Error('Failed to fetch banks from VietQR API');
    } catch (error) {
        console.error('Error fetching banks:', error);
        throw error;
    }
};
