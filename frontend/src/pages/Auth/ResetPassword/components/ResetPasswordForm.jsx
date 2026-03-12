import { Eye, EyeOff } from 'lucide-react';

const ResetPasswordForm = ({ 
    form: { register, formState: { errors } }, 
    onSubmit, 
    isLoading, 
    showPassword, 
    setShowPassword, 
    t 
}) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">{t('reset.newPasswordLabel')}</label>
                <div className="relative">
                    <input 
                        {...register('password')}
                        type={showPassword ? "text" : "password"} 
                        placeholder={t('reset.newPasswordPlaceholder')}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition pr-10"
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors?.password && <p className="text-xs text-red-500 pt-1">{errors.password.message}</p>}
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-slate-900 font-bold py-2.5 rounded-lg transition-colors mt-6 uppercase tracking-wide text-sm disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
            >
                {isLoading ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/60 border-t-slate-900"></div>
                        {t('reset.submittingBtn')}
                    </>
                ) : (
                    t('reset.submitBtn')
                )}
            </button>
        </form>
    );
};

export default ResetPasswordForm;
