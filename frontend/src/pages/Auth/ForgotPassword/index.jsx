import { Mail } from 'lucide-react';
import { useForgotPasswordForm } from './hooks/useForgotPasswordForm';
import AuthLayout from '../../../layout/AuthLayout';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const ForgotPassword = () => {
    const { 
        form, 
        onSubmit, 
        isLoading, 
        isSent, 
        t 
    } = useForgotPasswordForm();

    return (
        <AuthLayout 
            title={t('forgot.title')}
            subtitle={isSent ? t('messages.emailSent') : t('forgot.subtitle')}
            icon={<Mail className="w-7 h-7 text-slate-900" />}
            iconClass="bg-yellow-500 shadow-yellow-500/30"
        >
            <ForgotPasswordForm 
                form={form} 
                onSubmit={onSubmit} 
                isLoading={isLoading} 
                isSent={isSent} 
            />
        </AuthLayout>
    );
};

export default ForgotPassword;
