import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useSelector } from 'react-redux';

export const useErrorPage = (status) => {
    const { t } = useTranslation('error');
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const { user } = useSelector((state) => state.auth);

    const errorStatus = ['401', '403', '404', '500'].includes(status?.toString()) ? status.toString() : '404';

    const handleAction = () => {
        if (errorStatus === '401') {
            navigate('/login', { replace: true });
        } else {
            if (user?.isAdmin) {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    };

    return {
        t,
        isDarkMode,
        errorStatus,
        handleAction
    };
};
