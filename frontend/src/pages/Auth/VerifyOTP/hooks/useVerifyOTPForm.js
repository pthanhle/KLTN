import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { useVerifyEmailMutation, useResendEmailMutation } from '../../../../services/queries/auth.queries';

export const useVerifyOTPForm = () => {
    const { t } = useTranslation('auth');
    const { message } = AntdApp.useApp();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const email = searchParams.get('email');

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const inputRefs = useRef([]);

    const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmailMutation();
    const { mutate: resendEmail, isPending: isResending } = useResendEmailMutation();

    useEffect(() => {
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '' && index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.some(isNaN)) return;
        
        const newOtp = [...otp];
        pastedData.forEach((val, idx) => {
            if (idx < 6) newOtp[idx] = val;
        });
        setOtp(newOtp);
        
        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[focusIndex].focus();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            message.error("Vui lòng nhập đầy đủ mã OTP.");
            return;
        }

        verifyEmail({ email, otp: otpCode }, {
            onSuccess: (res) => {
                message.success(res.message || "Xác thực thành công!");
                navigate('/login');
            },
            onError: (error) => {
                message.error(error.response?.data?.message || "Mã OTP không hợp lệ hoặc đã hết hạn.");
            }
        });
    };

    const handleResendOTP = () => {
        if (isResending) return;
        
        resendEmail({ email }, {
            onSuccess: (res) => {
                message.success(res.message || "Đã gửi lại mã OTP.");
                setTimeLeft(600); // Reset timer to 10 minutes
                setOtp(['', '', '', '', '', '']); // Clear form
                inputRefs.current[0].focus();
            },
            onError: (error) => {
                message.error(error.response?.data?.message || "Không thể gửi lại mã OTP. Vui lòng thử lại sau.");
            }
        });
    };

    // Format time: MM:SS
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    return {
        otp,
        email,
        inputRefs,
        handleChange,
        handleKeyDown,
        handlePaste,
        onSubmit,
        handleResendOTP,
        isVerifying,
        isResending,
        minutes,
        seconds,
        t,
        navigate
    };
};
