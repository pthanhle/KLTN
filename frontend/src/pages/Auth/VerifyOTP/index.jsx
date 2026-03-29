import { CarFront } from 'lucide-react';
import { useVerifyOTPForm } from './hooks/useVerifyOTPForm';
import AuthLayout from '../../../layout/AuthLayout';
import VerifyOTPForm from './components/VerifyOTPForm';
import BrandLogo from '@/assets/images/brand/logo.png';

const VerifyOTP = () => {
    const {
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
    } = useVerifyOTPForm();

    const subtitleContent = (
        <p className="text-sm text-slate-400 mt-4 text-center px-4 leading-relaxed">
            {t('verifyOTP.subtitle')} <span className="font-semibold text-slate-300">{email}</span>
        </p>
    );

    return (
        <AuthLayout
            title={t('verifyOTP.title')}
            subtitle={subtitleContent}
            icon={
                <div className="flex items-center justify-center gap-3 text-yellow-500 hover:-translate-y-1 transition-all mb-6">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <img src={BrandLogo} alt="Logo" className="w-full h-full object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
                    </div>
                    <span className="font-bold text-xl tracking-widest uppercase text-white">TT AUTO</span>
                </div>
            }
            iconClass="bg-transparent shadow-none !w-auto !h-auto !mb-2"
            bgImage="https://images.unsplash.com/photo-1621252171092-be206f36ad7b?q=80&w=2000&auto=format&fit=crop"
            overlayClass="bg-slate-950/85"
            cardClass="bg-[#141416]/90 backdrop-blur-xl border border-yellow-900/30 shadow-[0_0_40px_rgba(234,179,8,0.1)] rounded-xl max-w-[480px]"
        >
            <VerifyOTPForm
                otp={otp}
                email={email}
                inputRefs={inputRefs}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                handlePaste={handlePaste}
                onSubmit={onSubmit}
                handleResendOTP={handleResendOTP}
                isVerifying={isVerifying}
                isResending={isResending}
                minutes={minutes}
                seconds={seconds}
                t={t}
                navigate={navigate}
            />
        </AuthLayout>
    );
};

export default VerifyOTP;
