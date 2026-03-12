import { AlertCircle, Lock, ServerCrash, Frown } from 'lucide-react';
import { useErrorPage } from './hooks/useErrorPage';

const ErrorPage = ({ status = '404' }) => {
    const { t, isDarkMode, errorStatus, handleAction } = useErrorPage(status);

    const renderIcon = () => {
        const iconClasses = "w-24 h-24 sm:w-32 sm:h-32 mb-6 transition-all duration-300 transform group-hover:scale-110";
        switch (errorStatus) {
            case '401':
                return <Lock className={`${iconClasses} text-yellow-500 dark:text-premium-gold`} />;
            case '403':
                return <AlertCircle className={`${iconClasses} text-red-500 dark:text-red-400`} />;
            case '500':
                return <ServerCrash className={`${iconClasses} text-rose-500 dark:text-rose-400`} />;
            case '404':
            default:
                return <Frown className={`${iconClasses} text-slate-400 dark:text-slate-500`} />;
        }
    };

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-[#0a0a0b] text-white' : 'bg-slate-50 text-slate-900'}`}>

            <div className="relative flex flex-col items-center text-center max-w-2xl mx-auto z-10 group">

                <div className="relative">
                    <div className="absolute inset-0 bg-yellow-400/20 dark:bg-premium-gold/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
                    <div className="relative z-10">
                        {renderIcon()}
                    </div>
                </div>

                <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-4 drop-shadow-md">
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-700 dark:from-premium-gold dark:to-yellow-600">
                        {t(`${errorStatus}.title`)}
                    </span>
                </h1>

                <p className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 mb-10 max-w-md mx-auto leading-relaxed">
                    {t(`${errorStatus}.subTitle`)}
                </p>

                <button
                    onClick={handleAction}
                    className="relative inline-flex items-center justify-center px-10 py-4 font-bold text-white bg-yellow-500 hover:bg-yellow-600 dark:bg-premium-gold dark:text-slate-900 dark:hover:bg-yellow-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-500/30 dark:shadow-premium-gold/20 hover:shadow-yellow-500/50 dark:hover:shadow-premium-gold/40"
                >
                    <span className="relative z-10 text-[15px] uppercase tracking-wider">{t(`${errorStatus}.action`)}</span>
                </button>
            </div>

            <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/50 dark:bg-premium-gold/5 rounded-full blur-[100px] opacity-60"></div>
            </div>
        </div>
    );
};

export default ErrorPage;
