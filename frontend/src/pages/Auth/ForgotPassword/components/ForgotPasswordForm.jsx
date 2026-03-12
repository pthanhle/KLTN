import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const ForgotPasswordForm = ({ 
    form: { register, formState: { errors } }, 
    onSubmit, 
    isLoading, 
    isSent 
}) => {
    const { t } = useTranslation('auth');

    if (isSent) {
        return (
            <>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-300">
                    {t('messages.emailSentDescription', 'Vui lòng kiểm tra hộp thư đến thư mục Spam của bạn, nhấp vào liên kết chúng tôi vừa gửi để đặt lại mật khẩu.')}
                </div>
                <div className="mt-8 text-center">
                    <Link to="/login" className="text-sm !text-yellow-500 hover:!text-yellow-400 font-bold transition flex items-center justify-center gap-2">
                        <ArrowLeft size={16} />
                        {t('forgot.backToLogin')}
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300">{t('login.emailLabel')}</label>
                    <input 
                        {...register('email')}
                        type="email" 
                        placeholder={t('login.emailPlaceholder')}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition"
                    />
                    {errors?.email && <p className="text-xs text-red-500 pt-1">{errors.email.message}</p>}
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-slate-900 font-bold py-2.5 rounded-lg transition-colors mt-6 uppercase tracking-wide text-sm disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/60 border-t-slate-900"></div>
                            {t('forgot.submittingBtn')}
                        </>
                    ) : (
                        t('forgot.submitBtn')
                    )}
                </button>
            </form>
            <div className="mt-8 text-center">
                <Link to="/login" className="text-sm !text-yellow-500 hover:!text-yellow-400 font-bold transition flex items-center justify-center gap-2">
                    <ArrowLeft size={16} />
                    {t('forgot.backToLogin')}
                </Link>
            </div>
        </>
    );
};

export default ForgotPasswordForm;
