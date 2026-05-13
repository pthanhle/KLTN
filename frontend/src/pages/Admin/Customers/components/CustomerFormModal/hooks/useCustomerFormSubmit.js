import { useState } from 'react';
import { adminCustomerApi } from '@/services/api/adminCustomer.api';
import { normalizeFormForApi } from '../utils/customerFormUtils';

export const useCustomerFormSubmit = (onClose, messageApi, onSuccess) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [pendingEmail, setPendingEmail] = useState('');

    const handleSave = async (values, isEditMode, customerId) => {
        setIsSubmitting(true);
        try {
            const payload = normalizeFormForApi(values);

            if (isEditMode && customerId) {
                await adminCustomerApi.updateCustomer(customerId, payload);
                if (messageApi) messageApi.success('Cập nhật hồ sơ khách hàng thành công');
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            } else {
                const response = await adminCustomerApi.createCustomer(payload);
                setPendingEmail(payload.email);
                setIsOtpSent(true);
                if (messageApi) messageApi.success(response?.message || 'Đã gửi mã OTP đến email khách hàng');
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || 'Lỗi không xác định';
            if (messageApi) messageApi.error('Lỗi: ' + msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (otp) => {
        setIsSubmitting(true);
        try {
            await adminCustomerApi.verifyCustomerOTP(pendingEmail, otp);
            if (messageApi) messageApi.success('Xác thực và tạo khách hàng thành công');
            if (onSuccess) onSuccess();
            if (onClose) onClose();
            setIsOtpSent(false);
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || 'OTP không hợp lệ';
            if (messageApi) messageApi.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await adminCustomerApi.createCustomer({ email: pendingEmail });
            if (messageApi) messageApi.success('Mã OTP mới đã được gửi');
        } catch (error) {
            if (messageApi) messageApi.error('Gửi lại OTP thất bại');
        }
    };

    const resetOtpState = () => {
        setIsOtpSent(false);
        setPendingEmail('');
    };

    return { 
        isSubmitting, 
        isOtpSent,
        pendingEmail,
        handleSave,
        handleVerifyOtp,
        handleResendOtp,
        resetOtpState
    };
};
