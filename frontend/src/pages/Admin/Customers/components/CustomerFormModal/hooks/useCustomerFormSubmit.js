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
            // Convert values to FormData for file upload support
            const formData = new FormData();
            
            // Append all values to FormData
            Object.entries(values).forEach(([key, value]) => {
                if (value === undefined || value === null) return;
                
                if (key === 'avatar') {
                    if (value instanceof File || value instanceof Blob) {
                        formData.append('avatar', value);
                    } else if (typeof value === 'string') {
                        formData.append('avatar', value);
                    }
                } else if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            if (isEditMode && customerId) {
                await adminCustomerApi.updateCustomer(customerId, formData);
                if (messageApi) messageApi.success('Cập nhật hồ sơ khách hàng thành công');
                if (onSuccess) onSuccess();
                if (onClose) onClose();
            } else {
                const response = await adminCustomerApi.createCustomer(formData);
                setPendingEmail(values.email);
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
