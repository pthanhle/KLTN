import { ShieldCheck, Lock } from 'lucide-react';

const VerifyOTPForm = ({
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
}) => {
    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
            {/* OTP Inputs */}
            <div className="flex gap-2 sm:gap-4 my-6" onPaste={handlePaste}>
                {otp.map((data, index) => (
                    <input
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900/50 border border-slate-700 text-slate-200 text-center text-xl font-semibold rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition shadow-inner"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                        ref={ref => inputRefs.current[index] = ref}
                    />
                ))}
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex flex-col items-center">
                    <div className="bg-yellow-900/20 text-yellow-500 font-bold text-xl px-4 py-2 rounded-lg border border-yellow-800/40 min-w-[60px] text-center">
                        {minutes}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-2 font-bold tracking-widest">{t('verifyOTP.min')}</span>
                </div>
                <span className="text-yellow-500 font-bold text-xl -mt-6">:</span>
                <div className="flex flex-col items-center">
                    <div className="bg-yellow-900/20 text-yellow-500 font-bold text-xl px-4 py-2 rounded-lg border border-yellow-800/40 min-w-[60px] text-center">
                        {seconds}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-2 font-bold tracking-widest">{t('verifyOTP.sec')}</span>
                </div>
            </div>

            {/* Verify Button */}
            <button 
                type="submit" 
                disabled={isVerifying}
                className="w-full bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-slate-900 font-bold py-3.5 rounded-lg transition-colors text-sm disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 uppercase tracking-wide"
            >
                {isVerifying ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></div>
                ) : (
                    <ShieldCheck size={18} />
                )}
                {isVerifying ? t('verifyOTP.verifyingBtn') : t('verifyOTP.verifyBtn')}
            </button>

            {/* Meta actions */}
            <div className="w-full flex justify-between items-center mt-6 text-xs text-slate-400 font-medium px-1">
                <button 
                    type="button" 
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="flex items-center gap-1.5 hover:text-white transition disabled:opacity-50"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {isResending ? "..." : t('verifyOTP.resendCode')}
                </button>
                
                <button 
                    type="button" 
                    onClick={() => navigate('/register')}
                    className="hover:text-white transition"
                >
                    {t('verifyOTP.changeEmail')}
                </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-800 my-6"></div>

            {/* Support Link */}
            <div className="text-xs text-slate-500 mb-10">
                {t('verifyOTP.havingTrouble')} <a href="#" className="!text-yellow-500 hover:!text-yellow-400 font-bold transition ml-1">{t('verifyOTP.contactSupport')}</a>
            </div>

            {/* Bottom Security Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-slate-500 font-bold tracking-widest uppercase opacity-70">
                <Lock size={12} />
                {t('verifyOTP.encryptionActive')}
            </div>
        </form>
    );
};

export default VerifyOTPForm;
