import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings2 } from 'lucide-react';

const FooterConfig = ({ lighting, environment, onAdvancedConfig }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="mt-6 px-4 pb-4 flex justify-between items-center bg-transparent relative z-10">
            <div className="flex gap-8">
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                        {t('previewSetupLight', 'Cảm Biến Ánh Sáng')}
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-[#dce1fb]">
                        {lighting}
                    </span>
                </div>
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
                        {t('previewSetupEnv', 'Môi Trường')}
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-[#dce1fb]">
                        {environment}
                    </span>
                </div>
            </div>
            
            <button 
                type="button"
                onClick={onAdvancedConfig}
                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
            >
                <span className="text-[10px] uppercase tracking-widest font-black">
                    {t('previewSetupConfigBtn', 'Cấu Hình Nâng Cao')}
                </span>
                <Settings2 className="w-4 h-4" />
            </button>
        </div>
    );
};

export default FooterConfig;
