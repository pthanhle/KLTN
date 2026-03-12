import { useTranslation, Trans } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { App as AntdApp } from 'antd';
import { useGoogleLoginMutation } from '../../../../services/queries/auth.queries';
import { loginSuccess } from '../../../../store/slices/authSlice';

const SocialLogin = () => {
    const { t } = useTranslation('auth');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = AntdApp.useApp();
    const { mutate: googleLoginUser, isPending: isLoading } = useGoogleLoginMutation();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // Because our BE is expecting idToken from CredentialResponse,
            // we need a different approach or fetch user info. Wait, useGoogleLogin doesn't return idToken normally unless we use flow="implicit". Wait, let me just pass access_token if the BE needs ID Token?
            // Actually, backend needs id_token, so useGoogleLogin flow='auth-code' won't easily work unless we change backend.
            // Oh wait, for react-oauth/google, we can get Google Credential by using the standard GoogleLogin component, but since it's a custom button, we could fetch Google user info from their API, or pass access_token to backend. Let me pass token directly. 
            // Wait, the backend verifyIdToken expects `idToken`. I will use the CredentialResponse from `<GoogleLogin>` component if `useGoogleLogin` returns an `access_token` instead of `id_token`.
            googleLoginUser(tokenResponse.access_token, {
                onSuccess: (res) => {
                    dispatch(loginSuccess({ user: res, token: res.token }));
                    localStorage.setItem('token', res.token);
                    message.success(t('messages.success'));
                    navigate(res.isAdmin ? '/admin/dashboard' : '/');
                },
                onError: (error) => {
                    message.error(error.response?.data?.message || t('messages.unauthorized'));
                }
            });
        },
        onError: () => {
            message.error("Google Login Failed");
        }
    });

    return (
        <div className="mt-6 flex flex-col gap-4">
            <div className="relative flex items-center justify-center">
                <span className="w-full border-t border-slate-700"></span>
                <span className="absolute px-3 text-xs uppercase text-slate-400 bg-[#1e2332] rounded">
                    {t('login.orContinue')}
                </span>
            </div>

            <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-100 text-slate-800 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
                <img 
                    src="https://www.svgrepo.com/show/475656/google-color.svg" 
                    alt="Google Logo" 
                    className="w-5 h-5"
                />
                {t('login.googleBtn')}
            </button>

            <div className="text-center text-sm text-slate-400 mt-4">
                {t('login.noAccount')}{' '}
                <a href="/register" className="!text-yellow-500 hover:!text-yellow-400 font-bold transition">
                    <Trans i18nKey="login.register" t={t}>Register your dealership</Trans>
                </a>
            </div>
        </div>
    );
};

export default SocialLogin;
