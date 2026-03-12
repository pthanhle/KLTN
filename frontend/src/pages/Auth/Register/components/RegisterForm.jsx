import { Eye, EyeOff, User, Mail, Phone, Lock, ShieldCheck } from 'lucide-react';
import { useRegisterForm } from '../hooks/useRegisterForm';

const RegisterForm = ({ onRegisterSuccess }) => {
    const { 
        form: { register, watch, formState: { errors } }, 
        onSubmit, 
        isLoading, 
        showPassword, 
        setShowPassword, 
        showConfirmPassword, 
        setShowConfirmPassword, 
        t 
    } = useRegisterForm(onRegisterSuccess);

    const isTermsAccepted = watch('terms');

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            
            {/* Tên */}
            <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">{t('registerPage.fullNameLabel')}</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <User size={16} />
                    </div>
                    <input 
                        {...register('full_name')}
                        type="text" 
                        placeholder={t('registerPage.fullNamePlaceholder')}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition text-sm"
                    />
                </div>
                {errors.full_name && <p className="text-xs text-red-500 pt-1">{errors.full_name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">{t('registerPage.emailLabel')}</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={16} />
                    </div>
                    <input 
                        {...register('email')}
                        type="email" 
                        placeholder={t('registerPage.emailPlaceholder')}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition text-sm"
                    />
                </div>
                {errors.email && <p className="text-xs text-red-500 pt-1">{errors.email.message}</p>}
            </div>

            {/* SDT */}
            <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">{t('registerPage.phoneLabel')}</label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Phone size={16} />
                    </div>
                    <input 
                        {...register('phone')}
                        type="text" 
                        placeholder={t('registerPage.phonePlaceholder')}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition text-sm"
                    />
                </div>
                {errors.phone && <p className="text-xs text-red-500 pt-1">{errors.phone.message}</p>}
            </div>

            {/* Mật khẩu ngang hàng */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">{t('registerPage.passwordLabel')}</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock size={16} />
                        </div>
                        <input 
                            {...register('password')}
                            type={showPassword ? "text" : "password"} 
                            placeholder={t('registerPage.passwordPlaceholder')}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition text-sm"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 pt-1 line-clamp-1 truncate" title={errors.password.message}>{errors.password.message}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">{t('registerPage.confirmLabel')}</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <ShieldCheck size={16} />
                        </div>
                        <input 
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder={t('registerPage.confirmPlaceholder')}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition text-sm"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 pt-1 line-clamp-1 truncate" title={errors.confirmPassword.message}>{errors.confirmPassword.message}</p>}
                </div>
            </div>

            {/* Improved Custom Checkbox UI */}
            <div className="flex items-start gap-3 pt-4">
                <div className="relative flex items-center justify-center mt-0.5 group">
                    <input 
                        type="checkbox" 
                        {...register('terms')}
                        id="terms" 
                        className="peer relative appearance-none w-5 h-5 border-2 border-slate-600 rounded drop-shadow-md bg-slate-900/50 checked:bg-yellow-500 checked:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all cursor-pointer hover:border-yellow-400"
                    />
                    <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                        <svg className="w-3.5 h-3.5 text-slate-900" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <label htmlFor="terms" className="text-[13px] font-medium text-slate-400 cursor-pointer select-none leading-relaxed group-hover:text-slate-300 transition-colors pt-[1px]">
                    {t('registerPage.termsAgree')} <a href="#terms" className="!text-yellow-500 hover:!text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)] hover:underline decoration-yellow-500/50 underline-offset-4 transition-all ml-1">{t('registerPage.termsOfService')}</a>
                </label>
            </div>
            {errors.terms && <p className="text-xs text-red-500 pl-8">{errors.terms.message}</p>}

            <button 
                type="submit" 
                disabled={isLoading || !isTermsAccepted}
                className={`w-full font-bold py-3 rounded-lg transition-all duration-300 mt-6 text-sm flex items-center justify-center gap-2 shadow-lg ${
                    isLoading || !isTermsAccepted 
                    ? 'bg-yellow-500/40 text-slate-900/50 opacity-50 cursor-default shadow-none hover:bg-yellow-500/40' 
                    : 'bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-slate-900 shadow-yellow-500/20 hover:shadow-yellow-500/30'
                } disabled:cursor-default`}
            >
                {isLoading ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900/60 border-t-slate-900"></div>
                        <span>{t('registerPage.creatingBtn')}</span>
                    </>
                ) : (
                    <span>{t('registerPage.createAccountBtn')}</span>
                )}
            </button>
        </form>
    );
};

export default RegisterForm;
