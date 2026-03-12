import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackButton = () => {
    const { t } = useTranslation('auth');

    return (
        <Link 
            to="/" 
            className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full !text-white text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
            <ArrowLeft size={16} /> 
            <span className="hidden sm:inline">{t('common.backToHome')}</span>
        </Link>
    );
};

export default BackButton;
