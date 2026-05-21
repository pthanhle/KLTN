import axiosClient from '../../utils/axiosClient';

const loyaltyApi = {

    getHistory: () => {
        return axiosClient.get('/client/loyalty/history');
    },

    getAvailableVouchers: () => {
        return axiosClient.get('/client/promotions?is_loyalty=true');
    },

    getMyVouchers: () => {
        return axiosClient.get('/client/loyalty/my-vouchers');
    },

    redeemVoucher: (promotionId) => {
        return axiosClient.post('/client/loyalty/redeem', { promotionId });
    },

    validateVoucherCode: (code) => {
        return axiosClient.post('/client/loyalty/validate-voucher', { code });
    }
};

export default loyaltyApi;
