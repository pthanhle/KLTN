import axiosClient from '../../utils/axiosClient';

const loyaltyApi = {

    getHistory: () => {
        return axiosClient.get('/client/loyalty/history');
    },

    getAvailableVouchers: () => {
        return axiosClient.get('/client/vouchers/available');
    },

    getMyVouchers: () => {
        return axiosClient.get('/client/loyalty/my-vouchers');
    },

    redeemVoucher: (voucherId) => {
        return axiosClient.post('/client/loyalty/redeem', { voucherId });
    }
};

export default loyaltyApi;
