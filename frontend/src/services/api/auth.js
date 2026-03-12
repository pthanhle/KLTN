import axiosClient from '../../utils/axiosClient';

export const authApi = {
    loginUser: async (credentials) => {
        return axiosClient.post('/client/auth/login', credentials);
    },
    loginWithGoogle: async (idToken) => {
        return axiosClient.post('/client/auth/google-login', { idToken });
    },
    registerUser: async (data) => {
        return axiosClient.post('/client/auth/register', data);
    },
    forgotPassword: async (email) => {
        return axiosClient.post('/client/auth/forgot-password', { email });
    },
    resetPassword: async (data) => {
        return axiosClient.post('/client/auth/reset-password', data);
    },
    verifyResetToken: async (token) => {
        return axiosClient.post('/client/auth/verify-reset-token', { token });
    },
    verifyEmailOTP: async (data) => {
        return axiosClient.post('/client/auth/verify-email-otp', data);
    },
    resendEmailOTP: async (email) => {
        return axiosClient.post('/client/auth/resend-email-otp', { email });
    }
};
