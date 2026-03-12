import { CheckCircle2 } from 'lucide-react';
import { useResetPasswordForm } from './hooks/useResetPasswordForm';
import AuthLayout from '../../../layout/AuthLayout';
import ResetPasswordForm from './components/ResetPasswordForm';

const ResetPassword = () => {
    const { 
        form, 
        onSubmit, 
        isLoading, 
        verifying, 
        isTokenValid, 
        showPassword, 
        setShowPassword, 
        t 
    } = useResetPasswordForm();

    if (verifying) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Đang kiểm tra bảo mật...</div>;

    return (
        <AuthLayout 
            title={t('reset.title')}
            subtitle={t('reset.subtitle')}
            icon={<CheckCircle2 className="w-7 h-7 text-slate-900" />}
            iconClass="bg-yellow-500 shadow-yellow-500/30"
        >
            {isTokenValid && (
                <ResetPasswordForm 
                    form={form} 
                    onSubmit={onSubmit} 
                    isLoading={isLoading} 
                    showPassword={showPassword} 
                    setShowPassword={setShowPassword} 
                    t={t} 
                />
            )}
        </AuthLayout>
    );
};

export default ResetPassword;
