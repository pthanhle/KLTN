import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: authApi.loginUser,
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: authApi.registerUser,
    });
};

export const useGoogleLoginMutation = () => {
    return useMutation({
        mutationFn: authApi.loginWithGoogle,
    });
};

export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: authApi.forgotPassword,
    });
};

export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: authApi.resetPassword,
    });
};

export const useVerifyResetTokenMutation = () => {
    return useMutation({
        mutationFn: authApi.verifyResetToken,
    });
};

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn: authApi.verifyEmailOTP,
    });
};

export const useResendEmailMutation = () => {
    return useMutation({
        mutationFn: authApi.resendEmailOTP,
    });
};
