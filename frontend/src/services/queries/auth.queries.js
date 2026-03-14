import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '@/store/slices/authSlice';
import { queryClient } from '@/config/queryClient';

export const useLoginMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: authApi.loginUser,
        onSuccess: (data) => {
            const { accessToken, ...user } = data;
            dispatch(loginSuccess({ user, accessToken }));
        },
    });
};

export const useGoogleLoginMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: authApi.loginWithGoogle,
        onSuccess: (data) => {
            const { accessToken, ...user } = data;
            dispatch(loginSuccess({ user, accessToken }));
        },
    });
};

export const useLogoutMutation = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: authApi.logoutUser,
        onSuccess: () => {
            dispatch(logout());
            queryClient.clear();
        },
        onError: () => {
            dispatch(logout());
            queryClient.clear();
        },
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: authApi.registerUser,
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
