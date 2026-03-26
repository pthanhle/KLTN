import { useTranslation } from 'react-i18next';
import AuthLayout from '../components/AuthLayout';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import BrandLogo from '@/assets/images/brand/logo.png';

const Login = () => {
    const { t } = useTranslation('auth');

    return (
        <AuthLayout
            title={t('login.title')}
            subtitle={t('login.subtitle')}
            icon={
                <div className="w-10 h-10 flex items-center justify-center">
                    <img src={BrandLogo} alt="Logo" className="w-full h-full object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
                </div>
            }
        >
            <LoginForm />
            <SocialLogin />
        </AuthLayout>
    );
};

export default Login;
