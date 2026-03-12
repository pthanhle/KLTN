import { useTranslation } from 'react-i18next';
import { CarFront } from 'lucide-react';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import AuthLayout from '../../../layout/AuthLayout';

const Login = () => {
    const { t } = useTranslation('auth');

    return (
        <AuthLayout
            title={t('login.title')}
            subtitle={t('login.subtitle')}
            icon={<CarFront size={28} className="text-slate-900" />}
            iconClass="bg-yellow-500 shadow-yellow-500/30"
        >
            <LoginForm />
            <SocialLogin />
        </AuthLayout>
    );
};

export default Login;
