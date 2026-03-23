import { useTranslation } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { useGoogleLoginMutation } from '../../../../services/queries/auth.queries';
import { Google } from '@thesvg/react';

const SocialRegister = () => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();
    const { message } = AntdApp.useApp();
    const { mutate: googleLoginUser } = useGoogleLoginMutation();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            googleLoginUser(tokenResponse.access_token, {
                onSuccess: (res) => {
                    message.success('Đăng nhập Google thành công!');
                    navigate(res.isAdmin ? '/admin/dashboard' : '/');
                },
                onError: (error) => {
                    message.error(error.response?.data?.message || 'Lỗi đăng nhập Google');
                }
            });
        },
        onError: () => {
            message.error('Đăng nhập Google thất bại');
        }
    });

    return (
        <div className="mt-8 flex flex-col gap-6">
            <div className="relative flex items-center justify-center">
                <span className="w-full border-t border-slate-800"></span>
                <span className="absolute px-3 text-[10px] uppercase text-slate-500 bg-[#161a23] font-medium tracking-wider">
                    {t('registerPage.orSignUpWith')}
                </span>
            </div>

            <div>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    <Google width={16} height={16} />
                    {t('registerPage.googleBtn')}
                </button>
            </div>

            <div className="text-center text-sm text-slate-400">
                {t('registerPage.alreadyHaveAccount')}{' '}
                <Link to="/login" className="!text-yellow-500 hover:!text-yellow-400 font-bold transition">
                    {t('registerPage.loginHere')}
                </Link>
            </div>
        </div>
    );
};

export default SocialRegister;
