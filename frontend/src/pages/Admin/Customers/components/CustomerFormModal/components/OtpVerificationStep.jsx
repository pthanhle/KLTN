import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { ShieldCheck, Mail, ArrowRight, RotateCcw } from 'lucide-react';

export const OtpVerificationStep = ({ email, onVerify, onResend, isSubmitting, t }) => {
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleVerify = () => {
        if (otp.length !== 6) {
            message.warning(t('adminCustomers:otpRequired', 'Vui lòng nhập đầy đủ 6 chữ số OTP'));
            return;
        }
        onVerify(otp);
    };

    const handleResend = () => {
        if (countdown > 0) return;
        setCountdown(60);
        onResend();
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-yellow-500/5">
                <ShieldCheck size={40} className="text-yellow-500" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
                {t('adminCustomers:verifyTitle', 'XÁC THỰC TÀI KHOẢN')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
                {t('adminCustomers:verifySubtitle', 'Chúng tôi đã gửi mã OTP gồm 6 chữ số đến email:')}
                <br />
                <span className="font-bold text-slate-900 dark:text-white mt-1 inline-block">{email}</span>
            </p>

            <div className="w-full max-w-xs space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                        {t('adminCustomers:labelOtp', 'MÃ XÁC THỰC (6 CHỮ SỐ)')}
                    </label>
                    <Input.OTP 
                        length={6} 
                        value={otp} 
                        onChange={setOtp} 
                        size="large"
                        className="custom-otp-input"
                    />
                </div>

                <button
                    onClick={handleVerify}
                    disabled={isSubmitting || otp.length !== 6}
                    className="w-full h-[56px] bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-black rounded-2xl shadow-xl shadow-yellow-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase text-sm tracking-widest"
                >
                    {isSubmitting ? (
                        <RotateCcw className="animate-spin" size={20} />
                    ) : (
                        <>
                            {t('adminCustomers:btnVerify', 'KÍCH HOẠT TÀI KHOẢN')}
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

                <div className="text-center mt-6">
                    <button
                        onClick={handleResend}
                        disabled={countdown > 0}
                        className={`text-sm font-bold transition-colors flex items-center justify-center gap-2 mx-auto ${
                            countdown > 0 
                            ? 'text-slate-400 cursor-not-allowed' 
                            : 'text-yellow-600 hover:text-yellow-700'
                        }`}
                    >
                        {countdown > 0 
                            ? `${t('adminCustomers:resendIn', 'Gửi lại mã sau')} ${countdown}s` 
                            : t('adminCustomers:resendNow', 'Gửi lại mã OTP')}
                    </button>
                </div>
            </div>

            <style>{`
                .custom-otp-input .ant-otp-input {
                    width: 48px !important;
                    height: 56px !important;
                    border-radius: 12px !important;
                    border: 2px solid transparent !important;
                    background: rgba(248, 250, 252, 1) !important;
                    font-size: 20px !important;
                    font-weight: 800 !important;
                    transition: all 0.2s !important;
                }
                :global(.dark) .custom-otp-input .ant-otp-input {
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: white !important;
                }
                .custom-otp-input .ant-otp-input:focus {
                    border-color: #eab308 !important;
                    background: white !important;
                    box-shadow: 0 0 0 4px rgba(234, 179, 8, 0.1) !important;
                }
                :global(.dark) .custom-otp-input .ant-otp-input:focus {
                    background: #1c1c1e !important;
                }
            `}</style>
        </div>
    );
};
