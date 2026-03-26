import { useTranslation } from 'react-i18next';
import { CarFront } from 'lucide-react';
import BrandLogo from '@/assets/images/brand/logo.png';
import RegisterForm from './components/RegisterForm';
import SocialRegister from './components/SocialRegister';
import { useNavigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import AuthLayout from '../../../layout/AuthLayout';

const Register = () => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();

    // Logic to handle phase 2 (OTP) -> We will temporarily just redirect with a message since OTP UI is not provided yet.
    const handleRegisterSuccess = (email) => {
        // message.info(`Vui lòng kiểm tra email ${email} để nhận mã OTP và nhập vào màn hình tiếp theo. (Chức năng OTP sẽ được cung cấp Layout sau)`, 8); // Removed AntdApp message
        navigate('/login'); // Temporarily returning to login 
    };

    return (
        <AuthLayout
            title={t('registerPage.title')}
            subtitle={t('registerPage.subtitle')}
            iconClass="bg-transparent shadow-none"
            icon={
                <div className="w-10 h-10 flex items-center justify-center">
                    <img src={BrandLogo} alt="Logo" className="w-full h-full object-contain [filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.08))] dark:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.6))_drop-shadow(0_0_12px_rgba(255,255,255,0.15))]" />
                </div>
            }
            bgImage="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop"
            cardClass="bg-[#161a23]/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl max-w-[450px]"
            containerClass="bg-gradient-to-br from-[#0b0f19] to-[#151b2b]"
        >
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            <SocialRegister />
        </AuthLayout>
    );
};

export default Register;
