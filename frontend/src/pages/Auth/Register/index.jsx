import { useTranslation } from 'react-i18next';
import { CarFront } from 'lucide-react';
import RegisterForm from './components/RegisterForm';
import SocialRegister from './components/SocialRegister';
import { useNavigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import AuthLayout from '../../../layout/AuthLayout';

const Register = () => {
    const { t } = useTranslation('auth');
    const { message } = AntdApp.useApp();
    const navigate = useNavigate();

    // Logic to handle phase 2 (OTP) -> We will temporarily just redirect with a message since OTP UI is not provided yet.
    const handleRegisterSuccess = (email) => {
        message.info(`Vui lòng kiểm tra email ${email} để nhận mã OTP và nhập vào màn hình tiếp theo. (Chức năng OTP sẽ được cung cấp Layout sau)`, 8);
        navigate('/login'); // Temporarily returning to login 
    };

    return (
        <AuthLayout
            title={t('registerPage.title')}
            subtitle={t('registerPage.subtitle')}
            icon={<CarFront size={24} className="text-slate-900" />}
            iconClass="bg-yellow-500 shadow-yellow-500/30"
            bgImage="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop"
            cardClass="bg-[#161a23]/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl max-w-[450px]"
        >
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            <SocialRegister />
        </AuthLayout>
    );
};

export default Register;
